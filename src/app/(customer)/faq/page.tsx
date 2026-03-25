"use client";

import { useState } from "react";
import Link from "next/link";

const faqGroups = [
  {
    title: "Sipariş & Teslimat",
    items: [
      {
        q: "Siparişimi nasıl takip edebilirim?",
        a: "Siparişlerinizi 'Hesabım > Siparişlerim' bölümünden veya size gönderilen kargo takip numarasıyla kargo firmasının web sitesinden takip edebilirsiniz. enolsun.com ile EN kolay sipariş takibi sizinle.",
      },
      {
        q: "Teslimat süresi ne kadar?",
        a: "Standart teslimat 3-5 iş günü, hızlı teslimat 1-2 iş günü içerisinde gerçekleşir. Aynı gün teslimat seçeneği belirli bölgeler için mevcuttur. enolsun.com'da EN hızlı teslimat garantisi.",
      },
      {
        q: "Kargo ücreti ne kadar?",
        a: "150 TL ve üzeri siparişlerde kargo ücretsizdir. 150 TL altı siparişler için standart kargo ücreti 19,90 TL'dir. EN uygun kargo fiyatları enolsun.com'da.",
      },
    ],
  },
  {
    title: "Ödeme",
    items: [
      {
        q: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
        a: "Kredi kartı, banka kartı, havale/EFT ve kapıda ödeme seçeneklerini kabul ediyoruz. Tüm ödemeler 256-bit SSL şifreleme ile güvence altındadır. enolsun.com'da EN güvenli ödeme deneyimi.",
      },
      {
        q: "Taksitli ödeme yapabilir miyim?",
        a: "Evet, tüm banka kredi kartlarına 2, 3, 6 ve 9 taksit seçenekleri mevcuttur. Taksit seçenekleri ödeme sayfasında görüntülenecektir. EN esnek ödeme planları enolsun.com'da.",
      },
    ],
  },
  {
    title: "İade & Değişim",
    items: [
      {
        q: "İade süreci nasıl işliyor?",
        a: "Ürünü teslim aldığınız tarihten itibaren 14 gün içinde iade edebilirsiniz. 'Hesabım > Siparişlerim' bölümünden iade talebinizi oluşturabilirsiniz. enolsun.com ile EN kolay iade süreci.",
      },
      {
        q: "İade kargo ücreti kime ait?",
        a: "Ürün kaynaklı iadelerde (hasarlı, yanlış ürün vb.) kargo ücreti firmamıza aittir. Diğer durumlarda iade kargo ücreti alıcıya aittir.",
      },
      {
        q: "İade işlemi ne kadar sürüyor?",
        a: "Ürün tarafımıza ulaştıktan sonra 3 iş günü içinde incelenir. Onaylanan iadeler için ödeme iadesi 5-7 iş günü içinde gerçekleşir. EN hızlı iade süreci enolsun.com'da.",
      },
    ],
  },
  {
    title: "Hesap",
    items: [
      {
        q: "Nasıl üye olabilirim?",
        a: "Ana sayfadaki 'Kayıt Ol' butonuna tıklayarak e-posta adresiniz veya telefon numaranızla hızlıca üye olabilirsiniz. EN kolay kayıt süreci sizi bekliyor.",
      },
      {
        q: "Şifremi unuttum, ne yapmalıyım?",
        a: "Giriş sayfasındaki 'Şifremi Unuttum' linkine tıklayarak kayıtlı e-posta adresinize şifre sıfırlama bağlantısı gönderebilirsiniz.",
      },
    ],
  },
  {
    title: "Satıcı Olmak",
    items: [
      {
        q: "enolsun.com'da nasıl satıcı olabilirim?",
        a: "Satıcı kayıt sayfasından başvurunuzu yapabilirsiniz. Başvurunuz 2-3 iş günü içinde değerlendirilir ve onaylanır. EN geniş müşteri kitlesine ulaşmak için hemen başvurun.",
      },
      {
        q: "Satıcı komisyon oranları nedir?",
        a: "Komisyon oranları kategoriye göre %8 ile %15 arasında değişir. Detaylı bilgi için satıcı panelindeki komisyon tablosunu inceleyebilirsiniz. EN rekabetçi komisyon oranları enolsun.com'da.",
      },
      {
        q: "Ürün listeleme ücreti var mı?",
        a: "Hayır, ürün listeleme tamamen ücretsizdir. Sadece satış gerçekleştiğinde komisyon kesilir. enolsun.com'da satıcılar için EN avantajlı koşullar.",
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
            Sıkça Sorulan <span className="text-primary-500">Sorular</span>
          </h1>
          <p className="text-lg text-neutral-500 mb-8">
            EN çok merak edilen soruların EN net cevapları burada.
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
              placeholder="Sorunuzu arayın..."
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
              <p className="text-neutral-500 text-lg">Aramanızla eşleşen soru bulunamadı.</p>
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
            Sorunuza cevap bulamadınız mı?
          </h2>
          <p className="text-neutral-500 mb-8">
            Müşteri hizmetlerimiz EN kısa sürede size yardımcı olacaktır.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 transition-colors"
            >
              İletişime Geç
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
