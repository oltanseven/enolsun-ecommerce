import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mesajlar | enolsun.com — EN Hızlı Müşteri İletişimi",
  description:
    "enolsun.com satıcı mesajları. Müşterilerinizle EN hızlı şekilde iletişim kurun, sorularını yanıtlayın.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
