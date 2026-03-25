'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('order')

  return (
    <div className="pt-20 pb-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          {/* Green checkmark */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
            Siparissiniz Basariyla Olusturuldu!
          </h1>

          {orderNumber && (
            <p className="text-sm text-neutral-500 mb-2">
              Siparis numaraniz: <span className="font-semibold text-neutral-700">#{orderNumber}</span>
            </p>
          )}

          <p className="text-sm text-neutral-500 mb-8 max-w-md">
            Siparissiniz alindi ve en kisa surede hazirlayip kargoya verecegiz. Siparis durumunuzu siparislerim sayfasindan takip edebilirsiniz.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/orders"
              className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-xl transition-colors min-h-[44px] flex items-center justify-center"
            >
              Siparislerimi Goruntule
            </Link>
            <Link
              href="/"
              className="px-6 py-3 border border-neutral-200 text-neutral-700 text-sm font-semibold rounded-xl hover:bg-neutral-50 transition-colors min-h-[44px] flex items-center justify-center"
            >
              Ana Sayfaya Don
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="pt-20 pb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-20 h-20 bg-neutral-100 rounded-full animate-pulse mb-6" />
            <div className="h-8 w-64 bg-neutral-100 rounded animate-pulse mb-3" />
            <div className="h-4 w-48 bg-neutral-100 rounded animate-pulse" />
          </div>
        </div>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  )
}
