import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "İstatistikler | enolsun.com — EN Detaylı Analiz",
  description:
    "enolsun.com satıcı istatistikleri. Satış performansınızı, müşteri davranışlarını ve trendleri EN detaylı şekilde analiz edin.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
