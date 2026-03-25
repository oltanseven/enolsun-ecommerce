import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Yeni Ürün Ekle | enolsun.com — EN Kolay Ürün Ekleme",
  description:
    "enolsun.com yeni ürün ekleme. EN kolay arayüz ile ürünlerinizi hızlıca listeleyin ve satışa başlayın.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
