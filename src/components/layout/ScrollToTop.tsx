'use client'

import { useState, useEffect } from 'react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`scroll-top-btn fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-40 w-10 h-10 bg-white border border-neutral-200 rounded-full shadow-align-sm flex items-center justify-center hover:bg-neutral-50 hover:shadow-align-md transition-all cursor-pointer min-w-[44px] min-h-[44px] ${visible ? 'visible' : ''}`}
      aria-label="Yukari git"
    >
      <svg className="w-5 h-5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"/></svg>
    </button>
  )
}
