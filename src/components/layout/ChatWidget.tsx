'use client'

import { useState, useRef, useEffect } from 'react'

interface ChatMessage {
  id: number
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const INITIAL_MESSAGES: ChatMessage[] = [
  { id: 1, text: 'Merhaba! Size nasil yardimci olabilirim?', sender: 'bot', timestamp: new Date() },
  { id: 2, text: 'Siparis takibi, urun onerileri veya kampanya bilgileri icin bana yazabilirsiniz.', sender: 'bot', timestamp: new Date() },
]

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)
  const [inputText, setInputText] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleSend() {
    const text = inputText.trim()
    if (!text) return

    const userMsg: ChatMessage = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInputText('')

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: Date.now() + 1,
        text: 'Teşekkürler! Ekibimiz en kısa sürede size dönüş yapacak.',
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMsg])
    }, 800)
  }

  return (
    <>
      {/* Chat Panel */}
      <div
        className={`chat-panel fixed bottom-20 sm:bottom-24 right-0 sm:right-6 z-40 w-full sm:w-80 h-[70vh] sm:h-96 flex-col sm:rounded-2xl rounded-t-2xl border border-neutral-100 shadow-align-xl overflow-hidden ${isOpen ? 'flex' : 'hidden'}`}
        style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', background: 'rgba(255,255,255,0.92)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-primary-500 text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/></svg>
            </div>
            <div>
              <p className="text-sm font-semibold">enolsun Asistan</p>
              <p className="text-xs text-primary-100">Cevrimici</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) =>
            msg.sender === 'bot' ? (
              <div key={msg.id} className="flex items-start gap-2.5">
                <div className="w-7 h-7 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/></svg>
                </div>
                <div className="bg-neutral-50 rounded-2xl rounded-tl-md px-4 py-2.5 max-w-[85%]">
                  <p className="text-sm text-neutral-700">{msg.text}</p>
                </div>
              </div>
            ) : (
              <div key={msg.id} className="flex items-start gap-2.5 justify-end">
                <div className="bg-primary-500 text-white rounded-2xl rounded-tr-md px-4 py-2.5 max-w-[85%]">
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            )
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="shrink-0 p-3 border-t border-neutral-100 bg-white">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Mesajinizi yazin..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSend() }}
              className="flex-1 px-3.5 py-2.5 bg-neutral-50 border border-neutral-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all min-h-[44px]"
            />
            <button aria-label="Canli destek" onClick={handleSend} className="p-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-colors shrink-0 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-[4.5rem] sm:bottom-6 right-4 sm:right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-align-lg hover:shadow-align-xl flex items-center justify-center transition-all group cursor-pointer"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/></svg>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-error-base rounded-full border-2 border-white flex items-center justify-center">
          <span className="text-[9px] font-bold text-white">1</span>
        </span>
      </button>
    </>
  )
}
