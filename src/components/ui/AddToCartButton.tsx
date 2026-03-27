'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/useCart'
import { showToast } from '@/components/ui/Toast'

interface AddToCartButtonProps {
  productId: string
  variantId?: string
  className?: string
  children?: React.ReactNode
}

export default function AddToCartButton({ productId, variantId, className, children }: AddToCartButtonProps) {
  const [adding, setAdding] = useState(false)
  const { addToCart } = useCart()
  const router = useRouter()

  const handleClick = async () => {
    setAdding(true)
    const result = await addToCart(productId, variantId)
    setAdding(false)

    if (result.error) {
      showToast(result.error, 'error')
      router.push('/login')
      return
    }

    showToast('Urun sepete eklendi!', 'success')
  }

  return (
    <button
      onClick={handleClick}
      disabled={adding}
      aria-label="Sepete ekle"
      className={className || 'w-full px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2'}
    >
      {adding ? (
        <>
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Ekleniyor...
        </>
      ) : (
        children || 'Sepete Ekle'
      )}
    </button>
  )
}
