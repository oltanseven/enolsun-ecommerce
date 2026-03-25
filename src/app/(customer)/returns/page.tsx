import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "İade & Değişim | enolsun.com — EN Kolay İade",
  description:
    "enolsun.com iade ve değişim politikası. 14 gün içinde EN kolay iade süreci. Adım adım iade rehberi ve değişim prosedürü.",
  keywords: "iade, değişim, iade politikası, ürün iade, enolsun, kolay iade",
  openGraph: {
    title: "İade & Değişim | enolsun.com — EN Kolay İade",
    description: "14 gün içinde EN kolay iade. enolsun.com iade ve değişim politikası.",
    type: "website",
  },
};

const steps = [
  {
    step: "1",
    title: "İade Talebi Oluşturun",
    description:
      "Hesabım > Siparişlerim bölümünden ilgili siparişi seçin ve 'İade Talebi' butonuna tıklayın. İade nedeninizi belirtin.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    step: "2",
    title: "Onay Bekleyin",
    description:
      "İade talebiniz 1 iş günü içinde değerlendirilecektir. Onay ve kargo kodu e-posta ve SMS ile gönderilir.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    step: "3",
    title: "Ürünü Kargoya Verin",
    description:
      "Ürünü orijinal ambalajında paketleyin ve anlaşmalı kargo firmasına teslim edin. Kargo kodu ile ücretsiz gönderim.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    step: "4",
    title: "İadeniz Tamamlandı",
    description:
      "Ürün tarafımıza ulaşıp incelendikten sonra ödemeniz 5-7 iş günü içinde iade edilir.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
];

const conditions = [
  "Ürün, teslim tarihinden itibaren 14 gün içinde iade edilmelidir.",
  "Ürün kullanılmamış, yıkanmamış ve orijinal etiketleri üzerinde olmalıdır.",
  "Orijinal ambalajı hasarsız olmalıdır.",
  "Fatura veya e-fatura kopyası ile birlikte gönderilmelidir.",
  "Kişisel bakım ürünleri (kozmetik, cilt bakımı vb.) hijyen nedeniyle açılmamış olmalıdır.",
  "İndirimli ürünlerde iade koşulları ürün sayfasında belirtilir.",
];

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 via-primary-25 to-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4">
            İade & <span className="text-primary-500">Değişim</span>
          </h1>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            14 gün içinde EN kolay iade süreci. Memnuniyetiniz bizim için EN önemli değer.
          </p>
        </div>
      </section>

      {/* 14 Day Policy Banner */}
      <section className="py-12 bg-primary-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-white">14</span>
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-bold text-white">Gün İade Hakkı</h2>
              <p className="text-primary-100">Koşulsuz memnuniyet garantisi</p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-10 text-center">
            EN Kolay İade Süreci — Adım Adım
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.step} className="relative">
                <div className="bg-white border border-neutral-100 rounded-2xl p-6 hover:shadow-align-md transition-shadow h-full">
                  <div className="w-12 h-12 bg-primary-500 text-white rounded-xl flex items-center justify-center mb-4">
                    {step.icon}
                  </div>
                  <div className="text-xs text-primary-500 font-bold mb-1">ADIM {step.step}</div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-2">{step.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{step.description}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <svg className="w-6 h-6 text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions */}
      <section className="py-16 bg-neutral-25">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-8 text-center">
            İade Koşulları
          </h2>
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-align-sm">
            <ul className="space-y-4">
              {conditions.map((condition, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-neutral-600 leading-relaxed">{condition}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Exchange */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-6 text-center">
            Değişim Prosedürü
          </h2>
          <div className="bg-white border border-neutral-100 rounded-2xl p-6 md:p-8">
            <div className="space-y-4 text-neutral-600 leading-relaxed">
              <p>
                Beden, renk veya model değişimi için önce mevcut ürün için iade talebi oluşturun.
                İade onaylandıktan sonra yeni siparişi verebilirsiniz.
              </p>
              <p>
                Fiyat farkı olan değişim işlemlerinde, fark müşteriye yansıtılır veya iade edilir.
                Değişim işlemleri EN hızlı şekilde öncelikli olarak işlenecektir.
              </p>
              <p>
                Değişim ürünleri stok durumuna bağlı olarak gönderilir. Stokta bulunmayan ürünler
                için tam iade yapılır.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-primary-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            İade veya değişim ile ilgili yardıma mı ihtiyacınız var?
          </h2>
          <p className="text-primary-100 mb-8">
            Müşteri hizmetlerimiz EN kısa sürede size yardımcı olacaktır.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-medium rounded-xl hover:bg-primary-25 transition-colors"
            >
              İletişime Geç
            </Link>
            <a
              href="tel:+902125550123"
              className="inline-flex items-center px-6 py-3 bg-white/10 text-white border border-white/20 font-medium rounded-xl hover:bg-white/20 transition-colors"
            >
              +90 (212) 555 0123
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
