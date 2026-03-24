"use client";

import { useState } from "react";
import Link from "next/link";

const faqGroups = [
  {
    title: "Siparis & Teslimat",
    items: [
      {
        q: "Siparisimi nasil takip edebilirim?",
        a: "Siparislerinizi 'Hesabim > Siparislerim' bolumunden veya size gonderilen kargo takip numarasiyla kargo firmasinin web sitesinden takip edebilirsiniz.",
      },
      {
        q: "Teslimat suresi ne kadar?",
        a: "Standart teslimat 3-5 is gunu, hizli teslimat 1-2 is gunu icerisinde gerceklesir. Ayni gun teslimat secenegi belirli bolgeler icin mevcuttur.",
      },
      {
        q: "Kargo ucreti ne kadar?",
        a: "150 TL ve uzeri siparislerde kargo ucretsizdir. 150 TL alti siparisler icin standart kargo ucreti 19.90 TL'dir.",
      },
    ],
  },
  {
    title: "Odeme",
    items: [
      {
        q: "Hangi odeme yontemlerini kabul ediyorsunuz?",
        a: "Kredi karti, banka karti, havale/EFT ve kapida odeme seceneklerini kabul ediyoruz. Tum odemeler 256-bit SSL sifreleme ile guvence altindadir.",
      },
      {
        q: "Taksitli odeme yapabilir miyim?",
        a: "Evet, tum banka kredi kartlarina 2, 3, 6 ve 9 taksit secenekleri mevcuttur. Taksit secenekleri odeme sayfasinda goruntulenecektir.",
      },
    ],
  },
  {
    title: "Iade & Degisim",
    items: [
      {
        q: "Iade sureci nasil isliyor?",
        a: "Urunu teslim aldiginiz tarihten itibaren 14 gun icinde iade edebilirsiniz. 'Hesabim > Siparislerim' bolumunden iade talebinizi olusturabilirsiniz.",
      },
      {
        q: "Iade kargo ucreti kime ait?",
        a: "Urun kaynakli iadelerde (hasarli, yanlis urun vb.) kargo ucreti firmamiza aittir. Diger durumlarda iade kargo ucreti aliciya aittir.",
      },
      {
        q: "Iade islemi ne kadar suruyor?",
        a: "Urun tarafimiza ulastiktan sonra 3 is gunu icinde incelenir. Onaylanan iadeler icin odeme iadesi 5-7 is gunu icinde gerceklesir.",
      },
    ],
  },
  {
    title: "Hesap",
    items: [
      {
        q: "Nasil uye olabilirim?",
        a: "Ana sayfadaki 'Kayit Ol' butonuna tiklayarak e-posta adresiniz veya telefon numaranizla hizlica uye olabilirsiniz.",
      },
      {
        q: "Sifremi unuttum, ne yapmaliyim?",
        a: "Giris sayfasindaki 'Sifremi Unuttum' linkine tiklayarak kayitli e-posta adresinize sifre sifirlama baglantisi gonderebilirsiniz.",
      },
    ],
  },
  {
    title: "Satici Olmak",
    items: [
      {
        q: "enolsun.com'da nasil satici olabilirim?",
        a: "Satici kayit sayfasindan basvurunuzu yapabilirsiniz. Basvurunuz 2-3 is gunu icinde degerlendirilir ve onaylanir.",
      },
      {
        q: "Satici komisyon oranlari nedir?",
        a: "Komisyon oranlari kategoriye gore %8 ile %15 arasinda degisir. Detayli bilgi icin satici panelindeki komisyon tablosunu inceleyebilirsiniz.",
      },
      {
        q: "Urun listeleme ucreti var mi?",
        a: "Hayir, urun listeleme tamamen ucretsizdir. Sadece satis gerceklestiginde komisyon kesilir.",
      },
    ],
  },
];

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-neutral-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-neutral-25 transition-colors"
      >
        <span className="font-medium text-neutral-800 pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-neutral-400 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <p className="text-neutral-500 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGroups = faqGroups
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.a.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 via-primary-25 to-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4">
            Sikca Sorulan <span className="text-primary-500">Sorular</span>
          </h1>
          <p className="text-lg text-neutral-500 mb-8">
            En cok merak edilen sorularin en net cevaplari.
          </p>
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder="Sorunuzu arayin..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 border border-neutral-200 rounded-xl text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          {filteredGroups.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-500 text-lg">Aramanizla eslesen soru bulunamadi.</p>
            </div>
          ) : (
            <div className="space-y-10">
              {filteredGroups.map((group) => (
                <div key={group.title}>
                  <h2 className="text-xl font-semibold text-neutral-800 mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-primary-500 rounded-full" />
                    {group.title}
                  </h2>
                  <div className="space-y-3">
                    {group.items.map((item) => (
                      <AccordionItem key={item.q} question={item.q} answer={item.a} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-neutral-25">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-4">
            Sorunuza cevap bulamadiniz mi?
          </h2>
          <p className="text-neutral-500 mb-8">
            Musteri hizmetlerimiz en hizli sekilde yardimci olacaktir.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 transition-colors"
            >
              Iletisime Gec
            </Link>
            <a
              href="mailto:destek@enolsun.com"
              className="inline-flex items-center px-6 py-3 bg-white border border-neutral-200 text-neutral-700 font-medium rounded-xl hover:bg-neutral-50 transition-colors"
            >
              destek@enolsun.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
