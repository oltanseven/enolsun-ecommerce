'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWishlist } from '@/hooks/useWishlist'
import { showToast } from '@/components/ui/Toast'

interface FavoriteButtonProps {
  productId: string
  className?: string
  size?: 'sm' | 'md'
}

export default function FavoriteButton({ productId, className, size = 'sm' }: FavoriteButtonProps) {
  const [toggling, setToggling] = useState(false)
  const { isInWishlist, toggleWishlist } = useWishlist()
  const router = useRouter()
  const favorited = isInWishlist(productId)

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setToggling(true)
    const result = await toggleWishlist(productId)
    setToggling(false)

    if (result.error) {
      showToast(result.error, 'error')
      router.push('/login')
      return
    }

    showToast(result.added ? 'Favorilere eklendi!' : 'Favorilerden cikarildi', result.added ? 'success' : 'info')
  }

  const iconSize = size === 'md' ? 'w-5 h-5' : 'w-4 h-4'

  return (
    <button
      onClick={handleClick}
      disabled={toggling}
      aria-label={favorited ? 'Favorilerden cikar' : 'Favorilere ekle'}
      className={className || `w-7 h-7 md:w-8 md:h-8 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white cursor-pointer disabled:opacity-50`}
    >
      {favorited ? (
        <svg className={`${iconSize} text-red-500`} fill="currentColor" viewBox="0 0 24 24"><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/></svg>
      ) : (
        <svg className={`${iconSize} text-neutral-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
      )}
    </button>
  )
}
