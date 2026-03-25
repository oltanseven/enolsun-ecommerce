import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tüm Ürünler | enolsun.com — EN Geniş Ürün Yelpazesi',
  description: 'enolsun.com EN geniş ürün yelpazesiyle karşınızda. EN doğal, EN sürdürülebilir ürünleri EN uygun fiyatlarla keşfedin. Hızlı kargo, güvenli ödeme.',
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
