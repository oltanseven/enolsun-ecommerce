import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://enolsun.com'),
  title: {
    template: '%s | enolsun.com',
    default: 'enolsun.com — Doganin Ilhamiyla Tasarlanan Yasam',
  },
  description: 'enolsun.com ile dogadan ilham alan urunleri kesfedin. Organik, surdurulebilir ve sik tasarimlarla yasam alaninizi donusturun. Hizli teslimat, guvenli odeme.',
  keywords: ['enolsun', 'online alisveris', 'organik urunler', 'surdurulebilir yasam', 'dogal urunler', 'ev dekorasyon', 'hizli teslimat'],
  authors: [{ name: 'enolsun.com' }],
  alternates: { canonical: './' },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://enolsun.com/',
    siteName: 'enolsun.com',
    title: 'enolsun.com — Doganin Ilhamiyla Tasarlanan Yasam',
    description: 'enolsun.com ile dogadan ilham alan urunleri kesfedin. Organik, surdurulebilir ve sik tasarimlarla yasam alaninizi donusturun.',
    images: [{ url: 'https://picsum.photos/seed/enolsun-og/1200/630', width: 1200, height: 630, alt: 'enolsun.com — EN\'lerin Dunyasina Hos Geldiniz!' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'enolsun.com — Doganin Ilhamiyla Tasarlanan Yasam',
    description: 'enolsun.com ile dogadan ilham alan urunleri kesfedin. Organik, surdurulebilir ve sik tasarimlarla yasam alaninizi donusturun.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className={inter.className}>
      <body className="bg-neutral-25 text-neutral-800 antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}
