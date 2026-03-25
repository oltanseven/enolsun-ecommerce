"use client"

import { useState, useEffect } from "react"

const conversations = [
  { id: 1, name: "Ayşe Yılmaz", initials: "AY", color: "bg-blue-100 text-blue-600", lastMsg: "Makrome duvar süsü ne zaman kargoya verilir?", time: "2 dk", unread: 2, online: true },
  { id: 2, name: "Mehmet Kaya", initials: "MK", color: "bg-green-100 text-green-600", lastMsg: "Bambu lamba için farklı renk seçeneği var mı?", time: "15 dk", unread: 1, online: true },
  { id: 3, name: "Zeynep Demir", initials: "ZD", color: "bg-purple-100 text-purple-600", lastMsg: "Sipariş numaram #ENS-10244, kargo takip no?", time: "1 sa", unread: 0, online: false },
  { id: 4, name: "Emre Can", initials: "EC", color: "bg-orange-100 text-orange-600", lastMsg: "Teşekkür ederim, harika bir ürün!", time: "3 sa", unread: 0, online: false },
  { id: 5, name: "Selin Aksoy", initials: "SA", color: "bg-pink-100 text-pink-600", lastMsg: "İade işlemi ne kadar sürüyor?", time: "1 gün", unread: 0, online: false },
]

const messages = [
  { id: 1, sender: "customer", text: "Merhaba, makrome duvar süsü ne zaman kargoya verilecek?", time: "14:22" },
  { id: 2, sender: "customer", text: "Sipariş numaram #ENS-10247", time: "14:22" },
  { id: 3, sender: "seller", text: "Merhaba Ayşe Hanım, siparişiniz bugün hazırlanacak ve yarın kargoya verilecektir.", time: "14:25" },
  { id: 4, sender: "customer", text: "Teşekkür ederim, hangi kargo firması ile gönderiyorsunuz?", time: "14:30" },
  { id: 5, sender: "seller", text: "Yurtiçi Kargo ile gönderiyoruz. Kargo takip numarası SMS ile bildirilecektir.", time: "14:32" },
]

const quickReplies = [
  "Siparişiniz hazırlanıyor, EN kısa sürede kargoya verilecektir.",
  "Kargo takip numaranız SMS ile bildirilecektir.",
  "İade işlemi için lütfen sipariş detay sayfasından başvuru yapın.",
  "Sorununuz EN kısa sürede çözülecektir. Memnuniyetiniz bizim için EN önemli!",
]

export default function SellerMessagesPage() {
  const [activeConv, setActiveConv] = useState(1)
  const [newMsg, setNewMsg] = useState("")
  const [msgList, setMsgList] = useState(messages)
  const [showMobileChat, setShowMobileChat] = useState(false)

  useEffect(() => { document.title = "Mesajlar | enolsun.com Satıcı Merkezi" }, [])

  function sendMessage() {
    if (!newMsg.trim()) return
    setMsgList([...msgList, { id: Date.now(), sender: "seller", text: newMsg, time: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }) }])
    setNewMsg("")
  }

  const activeContact = conversations.find(c => c.id === activeConv)

  return (
    <div className="h-[calc(100vh-9rem)]">
      <div className="flex h-full bg-white rounded-2xl border border-neutral-100 shadow-align-xs overflow-hidden">
        {/* Conversations List */}
        <div className={`w-full md:w-80 lg:w-96 border-r border-neutral-100 flex flex-col ${showMobileChat ? "hidden md:flex" : "flex"}`}>
          <div className="p-4 border-b border-neutral-100">
            <h2 className="text-lg font-bold text-neutral-900 mb-3">EN hızlı yanıt veren satıcılar EN çok satıyor!</h2>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <input type="text" placeholder="Konuşma ara..." className="w-full pl-9 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm placeholder-neutral-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map(conv => (
              <button key={conv.id} onClick={() => { setActiveConv(conv.id); setShowMobileChat(true) }} className={`w-full flex items-center gap-3 p-4 hover:bg-neutral-25 transition-colors text-left ${activeConv === conv.id ? "bg-primary-25 border-r-2 border-primary-500" : ""}`}>
                <div className="relative flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full ${conv.color} flex items-center justify-center text-xs font-semibold`}>{conv.initials}</div>
                  {conv.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-success-base rounded-full border-2 border-white"></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-neutral-900">{conv.name}</span>
                    <span className="text-xs text-neutral-400">{conv.time}</span>
                  </div>
                  <p className="text-xs text-neutral-500 truncate mt-0.5">{conv.lastMsg}</p>
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
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/></svg>
              </button>
              <div className={`w-9 h-9 rounded-full ${activeContact?.color || "bg-neutral-100 text-neutral-400"} flex items-center justify-center text-xs font-semibold`}>{activeContact?.initials}</div>
              <div>
                <p className="text-sm font-semibold text-neutral-900">{activeContact?.name}</p>
                <p className="text-xs text-success-base">{activeContact?.online ? "Çevrimiçi" : "Çevrimdışı"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-neutral-50 text-neutral-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              </button>
              <button className="p-2 rounded-lg hover:bg-neutral-50 text-neutral-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01"/></svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-25">
            <div className="text-center"><span className="text-xs text-neutral-400 bg-white px-3 py-1 rounded-full">Bugün</span></div>
            {msgList.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === "seller" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl ${msg.sender === "seller" ? "bg-primary-500 text-white rounded-br-md" : "bg-white text-neutral-800 border border-neutral-100 rounded-bl-md"}`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-[11px] mt-1 ${msg.sender === "seller" ? "text-primary-200" : "text-neutral-400"}`}>{msg.time}</p>
                </div>
              </div>
            ))}
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
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/></svg>
              </button>
              <input type="text" value={newMsg} onChange={(e) => setNewMsg(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="Mesajınızı yazın..." className="flex-1 py-2.5 px-4 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-700 placeholder-neutral-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100" />
              <button onClick={sendMessage} className="p-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
