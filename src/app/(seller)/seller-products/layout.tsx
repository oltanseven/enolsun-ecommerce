import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ürünlerim | enolsun.com — EN Çok Satan Ürünler",
  description:
    "enolsun.com ürün yönetimi. Ürünlerinizi EN etkili şekilde listeleyin, düzenleyin ve satışlarınızı artırın.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
