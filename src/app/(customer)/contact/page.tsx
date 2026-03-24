import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Iletisim - enolsun.com | Doganin Ilhamiyla Tasarlanan Yasam",
  description: "enolsun.com iletisim sayfasi. Sorulariniz, onerileriniz veya isbirlikleriniz icin bizimle iletisime gecin. 7/24 musteri destegi.",
  keywords: "iletisim, enolsun iletisim, musteri hizmetleri, destek",
  openGraph: {
    title: "Iletisim - enolsun.com",
    description: "enolsun.com iletisim sayfasi. Sorulariniz icin bizimle iletisime gecin.",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
