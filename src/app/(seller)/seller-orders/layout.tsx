import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Siparişler | enolsun.com — EN Hızlı Sipariş Yönetimi",
  description:
    "enolsun.com satıcı sipariş yönetimi. Siparişlerinizi EN hızlı şekilde takip edin, onaylayın ve kargolayın.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
