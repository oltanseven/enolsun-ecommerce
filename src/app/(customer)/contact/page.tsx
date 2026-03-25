import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "İletişim | enolsun.com — EN Hızlı Destek",
  description: "enolsun.com iletişim sayfası. EN hızlı müşteri desteği ile sorularınıza anında yanıt. 7/24 destek hattı.",
  keywords: "iletişim, enolsun iletişim, müşteri hizmetleri, destek, 7/24 destek",
  openGraph: {
    title: "İletişim | enolsun.com — EN Hızlı Destek",
    description: "EN hızlı müşteri desteği. Sorularınız için bizimle iletişime geçin.",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
