import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Güvenli Ödeme | enolsun.com — EN Güvenli Alışveriş',
  description: 'enolsun.com EN güvenli ödeme sayfası. SSL şifreleme, 3D Secure ve EN güvenilir ödeme altyapısıyla alışverişinizi güvenle tamamlayın.',
}

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
