import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mağaza Ayarları | enolsun.com — EN Kolay Mağaza Yönetimi",
  description:
    "enolsun.com mağaza ayarları. Mağaza bilgilerinizi, kargo ayarlarınızı ve bildirim tercihlerinizi EN kolay şekilde yönetin.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
