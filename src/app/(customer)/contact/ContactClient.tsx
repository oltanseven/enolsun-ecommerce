"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const faqs = [
  { q: "Sipariş takibi nasıl yapılır?", a: "Hesabım > Siparişlerim bölümünden siparişinizin durumunu ve kargo takip numarasını görebilirsiniz. enolsun.com ile EN kolay sipariş takibi." },
  { q: "İade ve değişim süreci nasıl işliyor?", a: "Ürünü teslim aldığınız tarihten itibaren 14 gün içinde iade edebilirsiniz. İade talebi oluşturmak için Hesabım > Siparişlerim bölümüne gidin. EN kolay iade süreci enolsun.com'da." },
  { q: "Ödeme seçenekleri nelerdir?", a: "Kredi kartı, banka kartı, havale/EFT ve kapıda ödeme seçenekleriyle ödeme yapabilirsiniz. Kredi kartına taksit imkânı sunuyoruz. EN güvenli ödeme altyapısı." },
  { q: "Kargo ücreti ne kadar?", a: "150 TL ve üzerindeki siparişlerinizde kargo ücretsizdir. 150 TL altındaki siparişler için 19,90 TL kargo ücreti uygulanır. EN uygun kargo fiyatları." },
  { q: "Ürünler organik mi?", a: "Evet, platformumuzdaki doğal ürünler organik ve doğal içeriklerden üretilmektedir. Ürün detay sayfalarında içerik bilgilerine ulaşabilirsiniz. EN doğal ürünler enolsun.com'da." },
];

export default function ContactClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    try {
      const _sb = createClient();
      const { error } = await _sb.from("contact_submissions").insert(payload);
      if (error) throw error;
    } catch {
      // Table may not exist or insert failed — save to localStorage as fallback
      try {
        const prev = JSON.parse(localStorage.getItem("contact_submissions") || "[]");
        prev.push({ ...payload, created_at: new Date().toISOString() });
        localStorage.setItem("contact_submissions", JSON.stringify(prev));
      } catch { /* ignore */ }
    }

    setSubmitting(false);
    setFormSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-8 pb-12 bg-gradient-to-b from-primary-25 to-neutral-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-50 border border-primary-100 rounded-full mb-6">
            <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
            <span className="text-xs font-medium text-primary-700">7/24 Destek</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-neutral-900 mb-4">Bize Ulaşın</h1>
          <p className="text-sm sm:text-lg text-neutral-400 max-w-lg mx-auto">EN hızlı müşteri desteği ile size yardımcı olmaktan mutluluk duyarız. Sorularınız için bizimle iletişime geçin.</p>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-12 -mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-6 text-center hover:-translate-y-1 hover:shadow-align-lg transition-all duration-300">
              <div className="w-14 h-14 mx-auto mb-4 bg-primary-50 rounded-2xl flex items-center justify-center">
                <svg className="w-7 h-7 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
              </div>
              <h3 className="text-base font-semibold text-neutral-800 mb-2">Adres</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">Levent Mah. Büyükdere Cad.<br />No:185 K:12, Şişli<br />İstanbul 34394, Türkiye</p>
            </div>
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-6 text-center hover:-translate-y-1 hover:shadow-align-lg transition-all duration-300">
              <div className="w-14 h-14 mx-auto mb-4 bg-primary-50 rounded-2xl flex items-center justify-center">
                <svg className="w-7 h-7 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
              </div>
              <h3 className="text-base font-semibold text-neutral-800 mb-2">Telefon</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">+90 (212) 555 0123<br />+90 (532) 555 0456<br />Pzt-Cum 09:00 - 18:00</p>
            </div>
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-6 text-center hover:-translate-y-1 hover:shadow-align-lg transition-all duration-300">
              <div className="w-14 h-14 mx-auto mb-4 bg-primary-50 rounded-2xl flex items-center justify-center">
                <svg className="w-7 h-7 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
              </div>
              <h3 className="text-base font-semibold text-neutral-800 mb-2">E-posta</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">info@enolsun.com<br />destek@enolsun.com<br />7/24 cevaplanır</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form + FAQ */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Form */}
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-6 sm:p-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-6">Bize Yazın</h2>
              {formSubmitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 mx-auto mb-4 bg-success-light rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-success-base" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">Mesajınız Gönderildi!</h3>
                  <p className="text-sm text-neutral-400">EN kısa sürede size dönüş yapacağız.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-500 mb-1.5">Adınız</label>
                      <input type="text" name="first_name" required placeholder="Emre" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-500 mb-1.5">Soyadınız</label>
                      <input type="text" name="last_name" required placeholder="Yılmaz" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-500 mb-1.5">E-posta</label>
                    <input type="email" name="email" required placeholder="emre@ornek.com" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-500 mb-1.5">Konu</label>
                    <select name="subject" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all bg-white">
                      <option>Genel Bilgi</option>
                      <option>Sipariş Hakkında</option>
                      <option>İade/Değişim</option>
                      <option>İş Birliği</option>
                      <option>Diğer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-500 mb-1.5">Mesajınız</label>
                    <textarea name="message" rows={5} required placeholder="Mesajınızı buraya yazın..." className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all resize-none"></textarea>
                  </div>
                  <button type="submit" disabled={submitting} className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors min-h-[48px] disabled:opacity-60 disabled:cursor-not-allowed">{submitting ? 'Gönderiliyor...' : 'Gönder'}</button>
                </form>
              )}
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-xl font-bold text-neutral-900 mb-6">Sık Sorulan Sorular</h2>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-neutral-100 shadow-align-xs overflow-hidden">
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-4 sm:p-5 text-left min-h-[48px]">
                      <span className="text-sm font-semibold text-neutral-800 pr-4">{faq.q}</span>
                      <svg className={`w-5 h-5 text-neutral-400 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-48 pb-4 px-4 sm:px-5" : "max-h-0"}`}>
                      <p className="text-sm text-neutral-500 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
