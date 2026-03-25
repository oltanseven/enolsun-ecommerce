import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sepetim | enolsun.com',
  description: 'enolsun.com alışveriş sepetiniz. EN güvenli ödeme, EN hızlı kargo ve EN kolay iade garantisiyle alışverişinizi tamamlayın.',
}

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
