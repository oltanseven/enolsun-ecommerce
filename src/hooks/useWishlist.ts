'use client'
import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

interface WishlistItem {
  id: string
  product_id: string
  product: {
    id: string
    name: string
    slug: string
    price: number
    discount_price: number | null
    rating: number | null
    review_count: number
    product_images: { url: string; is_primary: boolean }[]
  }
}

export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [productIds, setProductIds] = useState<Set<string>>(new Set())

  const fetchWishlist = useCallback(async () => {
    const _sb = createClient()
    const { data: { user } } = await _sb.auth.getUser()
    if (!user) { setItems([]); setProductIds(new Set()); setLoading(false); return }

    const { data } = await _sb
      .from('wishlists')
      .select('*, product:products(id, name, slug, price, discount_price, rating, review_count, product_images(url, is_primary))')
      .eq('user_id', user.id)

    const wishlistItems = (data || []) as WishlistItem[]
    setItems(wishlistItems)
    setProductIds(new Set(wishlistItems.map(item => item.product_id)))
    setLoading(false)
  }, [])

  const toggleWishlist = async (productId: string) => {
    const _sb = createClient()
    const { data: { user } } = await _sb.auth.getUser()
    if (!user) return { error: 'Giris yapmaniz gerekiyor' }

    const isInWishlist = productIds.has(productId)

    if (isInWishlist) {
      await _sb
        .from('wishlists')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId)
    } else {
      await _sb
        .from('wishlists')
        .insert({ user_id: user.id, product_id: productId })
    }

    await fetchWishlist()
    return { error: null, added: !isInWishlist }
  }

  const isInWishlist = (productId: string) => productIds.has(productId)

  useEffect(() => { fetchWishlist() }, [fetchWishlist])

  return { items, loading, toggleWishlist, isInWishlist, refresh: fetchWishlist, count: items.length }
}
