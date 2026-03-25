import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/profile', '/orders', '/wishlist', '/coupons', '/reviews', '/cards', '/notifications', '/checkout', '/seller-dashboard', '/seller-orders', '/seller-products', '/seller-add-product', '/seller-edit-product', '/seller-messages', '/seller-finance', '/seller-stats', '/seller-settings', '/admin-dashboard', '/admin-users', '/admin-products', '/admin-categories', '/admin-coupons'],
    },
    sitemap: 'https://enolsun-nextjs.vercel.app/sitemap.xml',
  }
}
