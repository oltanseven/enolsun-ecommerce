import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://enolsun.com'

  // Static pages
  const staticPages = [
    '', '/products', '/bestsellers', '/flash-sales', '/blog',
    '/about', '/contact', '/faq', '/careers', '/sustainability',
    '/shipping-info', '/returns', '/privacy', '/terms', '/cookies',
    '/login', '/register', '/seller-login', '/seller-register',
  ]

  const staticEntries = staticPages.map(page => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page === '' ? 'daily' as const : 'weekly' as const,
    priority: page === '' ? 1 : 0.8,
  }))

  // Dynamic product pages - fetch slugs from Supabase
  const { createClient } = require('@/lib/supabase/server')
  try {
    const _sb = await createClient()
    const { data: products } = await _sb.from('products').select('slug, created_at').eq('is_active', true)
    const productEntries = (products || []).map((p: any) => ({
      url: `${baseUrl}/product/${p.slug}`,
      lastModified: new Date(p.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
    return [...staticEntries, ...productEntries]
  } catch {
    return staticEntries
  }
}
