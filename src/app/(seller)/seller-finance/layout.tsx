import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Finans | enolsun.com — EN Şeffaf Ödeme Sistemi",
  description:
    "enolsun.com satıcı finans paneli. Kazançlarınızı, komisyonlarınızı ve ödemelerinizi EN şeffaf şekilde takip edin.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
