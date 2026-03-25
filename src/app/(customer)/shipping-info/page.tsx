import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kargo Bilgileri | enolsun.com — EN Hızlı Teslimat",
  description:
    "enolsun.com kargo ve teslimat bilgileri. EN hızlı kargo, EN güvenli teslimat. Kargo ücretleri ve sipariş takibi.",
  keywords: "kargo bilgileri, teslimat, kargo takip, ücretsiz kargo, enolsun, hızlı teslimat",
  openGraph: {
    title: "Kargo Bilgileri | enolsun.com — EN Hızlı Teslimat",
    description: "EN hızlı kargo, EN güvenli teslimat. enolsun.com kargo bilgileri.",
    type: "website",
  },
};

const shippingMethods = [
  {
    name: "Standart Kargo",
    duration: "3-5 İş Günü",
    price: "Ücretsiz (150 TL+)",
    priceBelow: "19,90 TL",
    description: "150 TL ve üzeri siparişlerde ücretsiz. EN ekonomik seçenek.",
    highlight: true,
  },
  {
    name: "Hızlı Kargo",
    duration: "1-2 İş Günü",
    price: "29,90 TL",
    priceBelow: null,
    description: "Acil ihtiyaçlarınız için EN hızlı teslimat seçeneği.",
    highlight: false,
  },
  {
    name: "Aynı Gün Teslimat",
    duration: "Aynı Gün",
    price: "49,90 TL",
    priceBelow: null,
    description: "İstanbul içi siparişler için aynı gün teslimat. 14:00'a kadar verilen siparişler geçerlidir.",
    highlight: false,
  },
];

const carriers = [
  { name: "Yurtiçi Kargo", coverage: "Türkiye Geneli" },
  { name: "Aras Kargo", coverage: "Türkiye Geneli" },
  { name: "MNG Kargo", coverage: "Türkiye Geneli" },
  { name: "Sürat Kargo", coverage: "İstanbul & Büyükşehirler" },
];

const trackingSteps = [
  {
    step: "1",
    title: "Sipariş Onaylandı",
    description: "Siparişiniz alındı ve EN özenli şekilde hazırlanıyor.",
  },
  {
    step: "2",
    title: "Kargoya Verildi",
    description: "Paketiniz kargo firmasına teslim edildi. Takip numaranız SMS ve e-posta ile gönderildi.",
  },
  {
    step: "3",
    title: "Dağıtımda",
    description: "Paketiniz dağıtım sürecinde. Kurye yolda!",
  },
  {
    step: "4",
    title: "Teslim Edildi",
    description: "Paketiniz başarıyla teslim edildi. İyi alışverişler!",
  },
];

export default function ShippingInfoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 via-primary-25 to-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4">
            Kargo <span className="text-primary-500">Bilgileri</span>
          </h1>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            EN hızlı kargo, EN güvenli teslimat. Siparişiniz EN kısa sürede kapınızda.
          </p>
        </div>
      </section>

      {/* Shipping Methods Table */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-8 text-center">
            Kargo Seçenekleri
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {shippingMethods.map((method) => (
              <div
                key={method.name}
                className={`rounded-2xl p-6 md:p-8 ${
                  method.highlight
                    ? "bg-primary-500 text-white ring-2 ring-primary-500 ring-offset-2"
                    : "bg-white border border-neutral-100"
                }`}
              >
                {method.highlight && (
                  <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full mb-4">
                    EN Popüler
                  </span>
                )}
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    method.highlight ? "text-white" : "text-neutral-800"
                  }`}
                >
                  {method.name}
                </h3>
                <div
                  className={`text-3xl font-bold mb-1 ${
                    method.highlight ? "text-white" : "text-primary-500"
                  }`}
                >
                  {method.price}
                </div>
                {method.priceBelow && (
                  <div className={`text-sm mb-3 ${method.highlight ? "text-primary-100" : "text-neutral-400"}`}>
                    150 TL altı: {method.priceBelow}
                  </div>
                )}
                <div
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                    method.highlight
                      ? "bg-white/20 text-white"
                      : "bg-primary-50 text-primary-600"
                  }`}
                >
                  {method.duration}
                </div>
                <p className={`text-sm leading-relaxed ${method.highlight ? "text-primary-100" : "text-neutral-500"}`}>
                  {method.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Shipping Banner */}
      <section className="py-12 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <svg className="w-8 h-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
            <h2 className="text-2xl font-bold text-primary-700">Ücretsiz Kargo</h2>
          </div>
          <p className="text-primary-600 text-lg mb-2">
            <span className="font-bold">150 TL</span> ve üzeri tüm siparişlerinizde kargo ücretsiz!
          </p>
          <p className="text-primary-500 text-sm">
            Türkiye&apos;nin her yerine, EN hızlı şekilde.
          </p>
        </div>
      </section>

      {/* Tracking Steps */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-8 text-center">
            Sipariş Takibi
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trackingSteps.map((step, i) => (
              <div key={step.step} className="relative text-center">
                <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  {step.step}
                </div>
                {i < trackingSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-0.5 bg-primary-200" />
                )}
                <h3 className="font-semibold text-neutral-800 mb-2">{step.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-neutral-25 rounded-2xl p-6 text-center">
            <p className="text-neutral-600 mb-2">
              Kargo takip numaranızı siparişleriniz sayfasından veya e-posta bildiriminden bulabilirsiniz.
            </p>
            <p className="text-neutral-500 text-sm">
              Herhangi bir sorun için{" "}
              <Link href="/contact" className="text-primary-500 font-medium hover:text-primary-600">
                müşteri hizmetlerimizle
              </Link>{" "}
              iletişime geçebilirsiniz.
            </p>
          </div>
        </div>
      </section>

      {/* Carrier Partners */}
      <section className="py-16 bg-neutral-25">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-8 text-center">
            Kargo İş Ortaklarımız
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {carriers.map((carrier) => (
              <div
                key={carrier.name}
                className="bg-white rounded-xl p-5 text-center border border-neutral-100"
              >
                <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                </div>
                <h3 className="font-semibold text-neutral-800 text-sm mb-1">{carrier.name}</h3>
                <p className="text-neutral-400 text-xs">{carrier.coverage}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Regions */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-4">
            Teslimat Bölgeleri
          </h2>
          <p className="text-neutral-500 mb-8">
            Türkiye&apos;nin 81 iline teslimat yapıyoruz. Aynı gün teslimat şu an İstanbul için geçerlidir.
          </p>
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-12 flex items-center justify-center min-h-[200px]">
            <div>
              <svg className="w-16 h-16 text-primary-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
              </svg>
              <p className="text-primary-600 font-medium">Türkiye Geneli Teslimat Haritası</p>
              <p className="text-primary-500 text-sm mt-1">81 il, 957 ilçe</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
