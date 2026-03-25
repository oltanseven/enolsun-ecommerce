import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Flaş Fırsatlar | enolsun.com — EN Büyük İndirimler',
  description: 'enolsun.com flaş fırsatlarıyla EN büyük indirimleri yakalayın. Sınırlı süreli kampanyalar, EN düşük fiyatlar ve EN hızlı kargo avantajlarıyla alışveriş yapın.',
}

export default function FlashSalesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
