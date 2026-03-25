"use client"

import { useState, useEffect, useRef } from "react"
import { createClient } from "@/lib/supabase/client"

const _sb = createClient()

interface Conversation {
  user_id: string
  user_name: string
  last_message: string
  last_time: string
  unread: number
}

interface Message {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  created_at: string
  is_read: boolean
}

const avatarColors = [
  "bg-blue-100 text-blue-600",
  "bg-green-100 text-green-600",
  "bg-purple-100 text-purple-600",
  "bg-orange-100 text-orange-600",
  "bg-pink-100 text-pink-600",
  "bg-rose-100 text-rose-600",
  "bg-amber-100 text-amber-600",
  "bg-cyan-100 text-cyan-600",
]

const quickReplies = [
  "Siparissiniz hazirlaniyor, EN kisa surede kargoya verilecektir.",
  "Kargo takip numaraniz SMS ile bildirilecektir.",
  "Iade islemi icin lutfen siparis detay sayfasindan basvuru yapin.",
  "Sorununuz EN kisa surede cozulecektir. Memnuniyetiniz bizim icin EN onemli!",
]

function getInitials(name: string) {
  return name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
}

function getColor(id: string) {
  let hash = 0
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash)
  return avatarColors[Math.abs(hash) % avatarColors.length]
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return "Az once"
  if (minutes < 60) return `${minutes} dk`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} sa`
  const days = Math.floor(hours / 24)
  return `${days} gun`
}

export default function SellerMessagesPage() {
  const [loading, setLoading] = useState(true)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [activeUserId, setActiveUserId] = useState<string | null>(null)
  const [newMsg, setNewMsg] = useState("")
  const [showMobileChat, setShowMobileChat] = useState(false)
  const [sending, setSending] = useState(false)
  const [storeOwnerId, setStoreOwnerId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => { document.title = "Mesajlar | enolsun.com Satici Merkezi" }, [])

  useEffect(() => {
    loadConversations()
  }, [])

  useEffect(() => {
    if (activeUserId && storeOwnerId) {
      loadMessages(activeUserId)
    }
  }, [activeUserId, storeOwnerId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  async function loadConversations() {
    const { data: { user } } = await _sb.auth.getUser()
    if (!user) { setLoading(false); return }
    setStoreOwnerId(user.id)

    // Get all messages where this user is sender or receiver
    const { data: allMessages } = await _sb
      .from("messages")
      .select("id, sender_id, receiver_id, content, created_at, is_read")
      .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
      .order("created_at", { ascending: false })

    if (!allMessages || allMessages.length === 0) {
      setLoading(false)
      return
    }

    // Group by the other user
    const convMap: Record<string, { last_message: string; last_time: string; unread: number }> = {}
    allMessages.forEach((m: any) => {
      const otherId = m.sender_id === user.id ? m.receiver_id : m.sender_id
      if (!convMap[otherId]) {
        convMap[otherId] = {
          last_message: m.content,
          last_time: m.created_at,
          unread: 0,
        }
      }
      // Count unread messages sent TO this user
      if (m.receiver_id === user.id && !m.is_read) {
        convMap[otherId].unread++
      }
    })

    // Get profile names for all other users
    const userIds = Object.keys(convMap)
    const { data: profiles } = await _sb
      .from("profiles")
      .select("id, full_name")
      .in("id", userIds)

    const profileMap: Record<string, string> = {}
    ;(profiles ?? []).forEach((p: any) => { profileMap[p.id] = p.full_name ?? "Musteri" })

    const convList: Conversation[] = userIds.map(uid => ({
      user_id: uid,
      user_name: profileMap[uid] ?? "Musteri",
      last_message: convMap[uid].last_message,
      last_time: convMap[uid].last_time,
      unread: convMap[uid].unread,
    }))

    // Sort by last_time descending
    convList.sort((a, b) => new Date(b.last_time).getTime() - new Date(a.last_time).getTime())

    setConversations(convList)
    if (convList.length > 0 && !activeUserId) {
      setActiveUserId(convList[0].user_id)
    }
    setLoading(false)
  }

  async function loadMessages(otherUserId: string) {
    if (!storeOwnerId) return

    const { data } = await _sb
      .from("messages")
      .select("id, sender_id, receiver_id, content, created_at, is_read")
      .or(`and(sender_id.eq.${storeOwnerId},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${storeOwnerId})`)
      .order("created_at", { ascending: true })

    setMessages(data ?? [])

    // Mark unread messages as read
    await _sb
      .from("messages")
      .update({ is_read: true })
      .eq("sender_id", otherUserId)
      .eq("receiver_id", storeOwnerId)
      .eq("is_read", false)

    // Update unread count in conversation list
    setConversations(prev => prev.map(c =>
      c.user_id === otherUserId ? { ...c, unread: 0 } : c
    ))
  }

  async function sendMessage() {
    if (!newMsg.trim() || !activeUserId || !storeOwnerId || sending) return
    setSending(true)

    const { data, error } = await _sb
      .from("messages")
      .insert({
        sender_id: storeOwnerId,
        receiver_id: activeUserId,
        content: newMsg.trim(),
      })
      .select()
      .single()

    if (!error && data) {
      setMessages(prev => [...prev, data])
      setNewMsg("")
      // Update conversation list
      setConversations(prev => {
        const updated = prev.map(c =>
          c.user_id === activeUserId
            ? { ...c, last_message: data.content, last_time: data.created_at }
            : c
        )
        updated.sort((a, b) => new Date(b.last_time).getTime() - new Date(a.last_time).getTime())
        return updated
      })
    }

    setSending(false)
  }

  const activeContact = conversations.find(c => c.user_id === activeUserId)

  if (loading) {
    return (
      <div className="h-[calc(100vh-9rem)]">
        <div className="flex h-full bg-white rounded-2xl border border-neutral-100 shadow-align-xs overflow-hidden animate-pulse">
          <div className="w-full md:w-80 lg:w-96 border-r border-neutral-100 flex flex-col">
            <div className="p-4 border-b border-neutral-100">
              <div className="h-6 bg-neutral-100 rounded w-3/4 mb-3" />
              <div className="h-10 bg-neutral-100 rounded-xl" />
            </div>
            <div className="flex-1 p-2 space-y-2">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex items-center gap-3 p-3">
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="h-4 bg-neutral-100 rounded w-24 mb-2" />
                    <div className="h-3 bg-neutral-100 rounded w-40" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 hidden md:flex flex-col">
            <div className="p-4 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-neutral-100" />
                <div className="h-4 bg-neutral-100 rounded w-32" />
              </div>
            </div>
            <div className="flex-1 p-4 space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}>
                  <div className="h-12 bg-neutral-100 rounded-2xl w-48" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (conversations.length === 0) {
    return (
      <div className="h-[calc(100vh-9rem)]">
        <div className="flex h-full bg-white rounded-2xl border border-neutral-100 shadow-align-xs overflow-hidden items-center justify-center">
          <div className="text-center p-8">
            <div className="w-20 h-20 bg-neutral-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-neutral-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
            </div>
            <h2 className="text-lg font-semibold text-neutral-900 mb-1">Henuz mesajiniz yok</h2>
            <p className="text-sm text-neutral-500">Musterileriniz size mesaj gonderdiginde burada gorunecektir.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-9rem)]">
      <div className="flex h-full bg-white rounded-2xl border border-neutral-100 shadow-align-xs overflow-hidden">
        {/* Conversations List */}
        <div className={`w-full md:w-80 lg:w-96 border-r border-neutral-100 flex flex-col ${showMobileChat ? "hidden md:flex" : "flex"}`}>
          <div className="p-4 border-b border-neutral-100">
            <h2 className="text-lg font-bold text-neutral-900 mb-3">EN hizli yanit veren saticilar EN cok satiyor!</h2>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
              <input type="text" placeholder="Konusma ara..." className="w-full pl-9 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm placeholder-neutral-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map(conv => (
              <button key={conv.user_id} onClick={() => { setActiveUserId(conv.user_id); setShowMobileChat(true) }} className={`w-full flex items-center gap-3 p-4 hover:bg-neutral-25 transition-colors text-left ${activeUserId === conv.user_id ? "bg-primary-25 border-r-2 border-primary-500" : ""}`}>
                <div className="relative flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full ${getColor(conv.user_id)} flex items-center justify-center text-xs font-semibold`}>{getInitials(conv.user_name)}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-neutral-900">{conv.user_name}</span>
                    <span className="text-xs text-neutral-400">{timeAgo(conv.last_time)}</span>
                  </div>
                  <p className="text-xs text-neutral-500 truncate mt-0.5">{conv.last_message}</p>
                </div>
                {conv.unread > 0 && (
                  <span className="w-5 h-5 bg-primary-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center flex-shrink-0">{conv.unread}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Active Chat */}
        <div className={`flex-1 flex flex-col ${!showMobileChat ? "hidden md:flex" : "flex"}`}>
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-100">
            <div className="flex items-center gap-3">
              <button onClick={() => setShowMobileChat(false)} className="md:hidden p-1 rounded-lg hover:bg-neutral-100 text-neutral-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
              </button>
              <div className={`w-9 h-9 rounded-full ${activeContact ? getColor(activeContact.user_id) : "bg-neutral-100 text-neutral-400"} flex items-center justify-center text-xs font-semibold`}>{activeContact ? getInitials(activeContact.user_name) : ""}</div>
              <div>
                <p className="text-sm font-semibold text-neutral-900">{activeContact?.user_name ?? ""}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-neutral-50 text-neutral-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </button>
              <button className="p-2 rounded-lg hover:bg-neutral-50 text-neutral-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01" /></svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-25">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <p className="text-sm text-neutral-400">Henuz mesaj yok. Bir mesaj gondererek baslayin.</p>
              </div>
            )}
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender_id === storeOwnerId ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl ${msg.sender_id === storeOwnerId ? "bg-primary-500 text-white rounded-br-md" : "bg-white text-neutral-800 border border-neutral-100 rounded-bl-md"}`}>
                  <p className="text-sm">{msg.content}</p>
                  <p className={`text-[11px] mt-1 ${msg.sender_id === storeOwnerId ? "text-primary-200" : "text-neutral-400"}`}>
                    {new Date(msg.created_at).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-4 pt-2 flex gap-2 overflow-x-auto scrollbar-hide">
            {quickReplies.map((reply, i) => (
              <button key={i} onClick={() => setNewMsg(reply)} className="flex-shrink-0 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-xs font-medium hover:bg-primary-100 transition-colors whitespace-nowrap">{reply.length > 40 ? reply.substring(0, 40) + "..." : reply}</button>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-neutral-100">
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg hover:bg-neutral-50 text-neutral-400 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
              </button>
              <input type="text" value={newMsg} onChange={(e) => setNewMsg(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="Mesajinizi yazin..." className="flex-1 py-2.5 px-4 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-700 placeholder-neutral-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100" />
              <button onClick={sendMessage} disabled={sending} className="p-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors shadow-sm disabled:opacity-50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
