import { createClient } from '@/lib/supabase/server'

export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  discount_price: number | null
  category_id: string | null
  store_id: string | null
  stock: number
  rating: number | null
  review_count: number
  is_featured: boolean
  is_active: boolean
  created_at: string
  category?: Category | null
  product_images?: ProductImage[]
  product_variants?: ProductVariant[]
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  parent_id: string | null
  created_at: string
}

export interface ProductImage {
  id: string
  product_id: string
  url: string
  alt: string | null
  is_primary: boolean
  sort_order: number
}

export interface ProductVariant {
  id: string
  product_id: string
  name: string
  value: string
  price_diff: number
  stock: number
}

export async function getProducts(options?: {
  limit?: number
  offset?: number
  categoryId?: string
  search?: string
  sortBy?: string
  featured?: boolean
}) {
  const _sb = await createClient()
  let query = _sb
    .from('products')
    .select('*, category:categories(*), product_images(*)', { count: 'exact' })
    .eq('is_active', true)

  if (options?.categoryId) {
    query = query.eq('category_id', options.categoryId)
  }
  if (options?.search) {
    query = query.ilike('name', `%${options.search}%`)
  }
  if (options?.featured) {
    query = query.eq('is_featured', true)
  }

  switch (options?.sortBy) {
    case 'price_asc':
      query = query.order('price', { ascending: true })
      break
    case 'price_desc':
      query = query.order('price', { ascending: false })
      break
    case 'newest':
      query = query.order('created_at', { ascending: false })
      break
    case 'rating':
      query = query.order('rating', { ascending: false, nullsFirst: false })
      break
    default:
      query = query.order('review_count', { ascending: false })
  }

  if (options?.limit) {
    const offset = options.offset || 0
    query = query.range(offset, offset + options.limit - 1)
  }

  const { data, error, count } = await query
  return { products: (data || []) as Product[], error, count }
}

export async function getProductBySlug(slug: string) {
  const _sb = await createClient()
  const { data, error } = await _sb
    .from('products')
    .select('*, category:categories(*), product_images(*), product_variants(*)')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  return { product: data as Product | null, error }
}

export async function getCategories() {
  const _sb = await createClient()
  const { data, error } = await _sb
    .from('categories')
    .select('*, products:products(count)')
    .order('name')

  return { categories: (data || []) as (Category & { products: { count: number }[] })[], error }
}

export async function getSimilarProducts(categoryId: string, excludeProductId: string, limit = 4) {
  const _sb = await createClient()
  const { data } = await _sb
    .from('products')
    .select('*, product_images(*)')
    .eq('is_active', true)
    .eq('category_id', categoryId)
    .neq('id', excludeProductId)
    .limit(limit)

  return (data || []) as Product[]
}

export async function searchProducts(query: string, limit = 8) {
  const _sb = await createClient()
  const { data } = await _sb
    .from('products')
    .select('id, name, slug, price, discount_price, product_images(url, is_primary)')
    .eq('is_active', true)
    .ilike('name', `%${query}%`)
    .limit(limit)

  return (data || []) as Product[]
}
