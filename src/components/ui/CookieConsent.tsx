'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9998] p-4 md:p-6 pointer-events-none">
      <div className="max-w-4xl mx-auto bg-white border border-neutral-200 rounded-2xl shadow-align-lg p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 pointer-events-auto">
        <div className="flex-1">
          <p className="text-sm text-neutral-600">
            Bu site, deneyiminizi iyilestirmek icin cerezleri kullaniyor.
            Siteyi kullanmaya devam ederek cerez kullanimini kabul etmis olursunuz.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            href="/privacy"
            className="text-sm text-primary-500 hover:text-primary-600 font-medium transition-colors whitespace-nowrap"
          >
            Daha Fazla Bilgi
          </Link>
          <button
            onClick={handleAccept}
            className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap min-h-[40px]"
          >
            Kabul Et
          </button>
        </div>
      </div>
    </div>
  )
}
