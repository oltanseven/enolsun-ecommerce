'use client'

import { useState } from 'react'
import { showToast } from '@/components/ui/Toast'

const LS_KEY = 'enolsun_newsletter_emails'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      showToast('Lutfen gecerli bir e-posta adresi girin.', 'error')
      return
    }

    setSubmitting(true)

    try {
      const stored: string[] = JSON.parse(localStorage.getItem(LS_KEY) || '[]')

      if (stored.includes(email)) {
        showToast('Bu e-posta adresi zaten kayitli.', 'info')
        setSubmitting(false)
        return
      }

      stored.push(email)
      localStorage.setItem(LS_KEY, JSON.stringify(stored))
    } catch {
      // localStorage unavailable — silently continue
    }

    showToast('Basariyla abone oldunuz!', 'success')
    setEmail('')
    setSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-posta adresiniz"
        className="flex-1 px-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all min-h-[44px]"
      />
      <button
        type="submit"
        disabled={submitting}
        className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-xl shadow-align-sm transition-all whitespace-nowrap cursor-pointer min-h-[44px] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? 'Gonderiliyor...' : 'Abone Ol'}
      </button>
    </form>
  )
}
