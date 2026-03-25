'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 pt-20">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-error-light flex items-center justify-center">
          <svg className="w-10 h-10 text-error-base" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Bir Hata Olustu</h1>
        <p className="text-neutral-500 mb-6">Beklenmedik bir hata meydana geldi. Lutfen tekrar deneyin.</p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={unstable_retry}
            className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            Tekrar Dene
          </button>
          <Link href="/" className="px-5 py-2.5 border border-neutral-200 text-neutral-700 text-sm font-semibold rounded-xl hover:bg-neutral-50 transition-colors">
            Ana Sayfaya Don
          </Link>
        </div>
      </div>
    </div>
  )
}
