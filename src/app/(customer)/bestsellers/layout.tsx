import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Çok Satanlar | enolsun.com',
  description: 'enolsun.com EN çok satan ürünleri keşfedin. EN çok beğenilen, EN çok tercih edilen doğal ve sürdürülebilir ürünler. Güvenilir alışveriş deneyimi.',
}

export default function BestsellersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
