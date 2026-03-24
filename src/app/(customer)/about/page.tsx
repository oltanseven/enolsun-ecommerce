import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hakkimizda - enolsun.com | EN'lerin Dunyasina Hos Geldiniz!",
  description:
    "enolsun.com hakkinda her sey. Turkiye'nin en surdurulebilir e-ticaret platformunun hikayesi, misyonu ve degerleri.",
  keywords: "enolsun hakkinda, hakkimizda, surdurulebilir e-ticaret, dogal urunler",
  openGraph: {
    title: "Hakkimizda - enolsun.com",
    description: "enolsun.com hakkinda her sey. EN'lerin hikayesini kesfet.",
    type: "website",
  },
};

const stats = [
  { value: "50.000+", label: "Satici" },
  { value: "2M+", label: "Musteri" },
  { value: "500M+", label: "Ciro (TL)" },
  { value: "8", label: "Kategori" },
];

const values = [
  {
    title: "En Surdurulebilir",
    description:
      "Cevre dostu urunleri ve surdurulebilir is modellerini onceliklendiriyoruz. Her satis, daha yesil bir gelecege katki saglar.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    title: "En Guvenilir",
    description:
      "100% orijinal urun garantisi, guvenli odeme altyapisi ve seffaf satici degerlendirme sistemiyle guvende alisveris yapin.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "En Yenilikci",
    description:
      "Yapay zeka destekli oneri sistemi, akilli arama ve kisisellestirilmis alisveris deneyimiyle sektore yon veriyoruz.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
];

const team = [
  { name: "Emre Yilmaz", role: "Kurucu & CEO", initials: "EY" },
  { name: "Ayse Demir", role: "CTO", initials: "AD" },
  { name: "Mehmet Kaya", role: "CPO", initials: "MK" },
  { name: "Zeynep Arslan", role: "CMO", initials: "ZA" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-50 via-primary-25 to-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
            EN&apos;lerin Dunyasina Hos Geldiniz!
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 mb-6">
            enolsun.com <span className="text-primary-500">Hakkinda</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-500 max-w-3xl mx-auto leading-relaxed">
            Turkiye&apos;nin en surdurulebilir e-ticaret platformu olarak, dogal ve cevre dostu urunleri
            en genis kitlelere ulastiriyoruz. Her &quot;en&quot; bizim icin bir sorumluluk.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">
                EN&apos;lerin Hikayesi
              </h2>
              <p className="text-neutral-500 mb-4 leading-relaxed">
                2020 yilinda Istanbul&apos;da, dogal ve surdurulebilir urunlere ulasmanin neden bu kadar
                zor oldugu sorusuyla yola ciktik. Amacimiz basitti: insanlarin en kaliteli, en dogal
                ve en uygun fiyatli urunlere kolayca ulasmalarini saglamak.
              </p>
              <p className="text-neutral-500 mb-4 leading-relaxed">
                Bugün 50.000&apos;den fazla saticiyla Turkiye&apos;nin dort bir yanindan en ozel urunleri
                bir araya getiriyoruz. Her urun, surdurulebilirlik kriterlerimizden gecerek
                platformumuza kabul ediliyor.
              </p>
              <p className="text-neutral-500 leading-relaxed">
                Misyonumuz: Herkesin en dogal, en kaliteli ve en surdurulebilir urunlere ulasmalarini
                saglamak. Cunku en iyisi dogada!
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl p-12 flex items-center justify-center min-h-[320px]">
              <div className="text-center">
                <div className="text-6xl mb-4">🌿</div>
                <p className="text-primary-700 font-semibold text-lg">Dogan&apos;in Ilhamiyla</p>
                <p className="text-primary-600 text-sm mt-1">2020&apos;den beri</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary-500">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-primary-100 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-neutral-25">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">Degerlerimiz</h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">
              Her adimimizda &quot;en&quot; olmak icin calisiyoruz. Bu degerler, bizi biz yapan temel taslar.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-8 shadow-align-sm hover:shadow-align-md transition-shadow"
              >
                <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center text-primary-500 mb-5">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-3">{value.title}</h3>
                <p className="text-neutral-500 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">Ekibimiz</h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">
              En tutkulu ekip, en buyuk fikirleri hayata gecirir.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-200 to-primary-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl font-bold">{member.initials}</span>
                </div>
                <h3 className="font-semibold text-neutral-800">{member.name}</h3>
                <p className="text-neutral-400 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-primary-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Sen de EN&apos;lerden biri ol!
          </h2>
          <p className="text-primary-100 mb-8 text-lg">
            enolsun.com&apos;da satici olarak binlerce musteriye ulasin.
          </p>
          <Link
            href="/seller-register"
            className="inline-flex items-center px-8 py-3.5 bg-white text-primary-600 font-semibold rounded-xl hover:bg-primary-25 transition-colors"
          >
            Satici Ol
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
