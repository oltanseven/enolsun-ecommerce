"use client";

import { useState } from "react";
import Link from "next/link";

const faqs = [
  { q: "Siparis takibi nasil yapilir?", a: "Hesabim > Siparislerim bolumunden siparisinizin durumunu ve kargo takip numarasini gorebilirsiniz." },
  { q: "Iade ve degisim sureci nasil isliyor?", a: "Urunu teslim aldiginiz tarihten itibaren 14 gun icinde iade edebilirsiniz. Iade talebi olusturmak icin Hesabim > Siparislerim bolumune gidin." },
  { q: "Odeme secenekleri nelerdir?", a: "Kredi karti, banka karti, havale/EFT ve kapida odeme secenekleriyle odeme yapabilirsiniz. Kredi kartina taksit imkani sunuyoruz." },
  { q: "Kargo ucreti ne kadar?", a: "200 TL ve uzerindeki siparislerinizde kargo ucretsizdir. 200 TL altindaki siparisler icin 29,90 TL kargo ucreti uygulanir." },
  { q: "Urunler organik mi?", a: "Evet, tum urunlerimiz organik ve dogal iceriklerden uretilmektedir. Urun detay sayfalarinda icerik bilgilerine ulasabilirsiniz." },
];

export default function ContactClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="pt-8 pb-12 bg-gradient-to-b from-primary-25 to-neutral-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-50 border border-primary-100 rounded-full mb-6">
            <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
            <span className="text-xs font-medium text-primary-700">7/24 Destek</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-neutral-900 mb-4">Bize Ulasin</h1>
          <p className="text-sm sm:text-lg text-neutral-400 max-w-lg mx-auto">Size yardimci olmaktan mutluluk duyariz. Sorulariniz icin bizimle iletisime gecebilirsiniz.</p>
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
              <p className="text-sm text-neutral-400 leading-relaxed">Levent Mah. Buyukdere Cad.<br />No:185 K:12, Sisli<br />Istanbul 34394, Turkiye</p>
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
              <p className="text-sm text-neutral-400 leading-relaxed">info@enolsun.com<br />destek@enolsun.com<br />7/24 cevaplanir</p>
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
              <h2 className="text-xl font-bold text-neutral-900 mb-6">Bize Yazin</h2>
              {formSubmitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 mx-auto mb-4 bg-success-light rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-success-base" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">Mesajiniz Gonderildi!</h3>
                  <p className="text-sm text-neutral-400">En kisa surede size donus yapacagiz.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-500 mb-1.5">Adiniz</label>
                      <input type="text" required placeholder="Emre" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-500 mb-1.5">Soyadiniz</label>
                      <input type="text" required placeholder="Yilmaz" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-500 mb-1.5">E-posta</label>
                    <input type="email" required placeholder="emre@ornek.com" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-500 mb-1.5">Konu</label>
                    <select className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all bg-white">
                      <option>Genel Bilgi</option>
                      <option>Siparis Hakkinda</option>
                      <option>Iade/Degisim</option>
                      <option>Isbirligi</option>
                      <option>Diger</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-500 mb-1.5">Mesajiniz</label>
                    <textarea rows={5} required placeholder="Mesajinizi buraya yazin..." className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all resize-none"></textarea>
                  </div>
                  <button type="submit" className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors min-h-[48px]">Gonder</button>
                </form>
              )}
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-xl font-bold text-neutral-900 mb-6">Sik Sorulan Sorular</h2>
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
