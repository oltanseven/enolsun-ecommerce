import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Satıcı Paneli | enolsun.com — EN Kapsamlı Satıcı Merkezi",
  description:
    "enolsun.com satıcı paneli. Siparişlerinizi, ürünlerinizi ve mağaza performansınızı EN kolay şekilde yönetin.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
