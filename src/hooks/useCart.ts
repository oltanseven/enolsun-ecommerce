'use client'
import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

interface CartItem {
  id: string
  product_id: string
  variant_id: string | null
  quantity: number
  product: {
    name: string
    price: number
    discount_price: number | null
    slug: string
    product_images: { url: string; is_primary: boolean }[]
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(0)

  const fetchCart = useCallback(async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setItems([]); setCount(0); setLoading(false); return }

    const { data } = await supabase
      .from('cart_items')
      .select('*, product:products(name, price, discount_price, slug, product_images(url, is_primary))')
      .eq('user_id', user.id)

    setItems(data || [])
    setCount(data?.reduce((sum: number, item: CartItem) => sum + item.quantity, 0) || 0)
    setLoading(false)
  }, [])

  const addToCart = async (productId: string, variantId?: string) => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Giris yapmaniz gerekiyor' }

    // Check if already in cart
    const { data: existing } = await supabase
      .from('cart_items')
      .select('id, quantity')
      .eq('user_id', user.id)
      .eq('product_id', productId)
      .maybeSingle()

    if (existing) {
      await supabase.from('cart_items').update({ quantity: existing.quantity + 1 }).eq('id', existing.id)
    } else {
      await supabase.from('cart_items').insert({ user_id: user.id, product_id: productId, variant_id: variantId || null, quantity: 1 })
    }

    await fetchCart()
    return { error: null }
  }

  const removeFromCart = async (itemId: string) => {
    const supabase = createClient()
    await supabase.from('cart_items').delete().eq('id', itemId)
    await fetchCart()
  }

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) return removeFromCart(itemId)
    const supabase = createClient()
    await supabase.from('cart_items').update({ quantity }).eq('id', itemId)
    await fetchCart()
  }

  const clearCart = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('cart_items').delete().eq('user_id', user.id)
    setItems([])
    setCount(0)
  }

  useEffect(() => { fetchCart() }, [fetchCart])

  const total = items.reduce((sum, item) => {
    const price = item.product?.discount_price || item.product?.price || 0
    return sum + price * item.quantity
  }, 0)

  return { items, count, total, loading, addToCart, removeFromCart, updateQuantity, clearCart, refresh: fetchCart }
}
