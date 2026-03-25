import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hakkımızda | enolsun.com — EN'lerin Hikayesi",
  description:
    "enolsun.com'un kuruluş hikayesi, misyonu ve vizyonu. EN güvenilir, EN sürdürülebilir e-ticaret platformunun değerleri.",
  keywords: "enolsun hakkında, hakkımızda, sürdürülebilir e-ticaret, doğal ürünler, güvenilir alışveriş",
  openGraph: {
    title: "Hakkımızda | enolsun.com — EN'lerin Hikayesi",
    description: "enolsun.com'un kuruluş hikayesi ve EN'lerin dünyasını keşfedin.",
    type: "website",
  },
};

const stats = [
  { value: "50.000+", label: "Satıcı" },
  { value: "2M+", label: "Mutlu Müşteri" },
  { value: "500M+", label: "Ciro (TL)" },
  { value: "8", label: "Ana Kategori" },
];

const values = [
  {
    title: "EN Sürdürülebilir",
    description:
      "Çevre dostu ürünleri ve sürdürülebilir iş modellerini önceliklendiriyoruz. Her satış, daha yeşil bir geleceğe katkı sağlar.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    title: "EN Güvenilir",
    description:
      "%100 orijinal ürün garantisi, güvenli ödeme altyapısı ve şeffaf satıcı değerlendirme sistemiyle EN güvende alışveriş deneyimi.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "EN Yenilikçi",
    description:
      "Yapay zekâ destekli öneri sistemi, akıllı arama ve kişiselleştirilmiş alışveriş deneyimiyle sektöre EN yenilikçi çözümleri sunuyoruz.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
];

const team = [
  { name: "Emre Yılmaz", role: "Kurucu & CEO", initials: "EY" },
  { name: "Ayşe Demir", role: "CTO", initials: "AD" },
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
            EN&apos;lerin Dünyasına Hoş Geldiniz!
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 mb-6">
            enolsun.com <span className="text-primary-500">Hakkımızda</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-500 max-w-3xl mx-auto leading-relaxed">
            Türkiye&apos;nin EN sürdürülebilir e-ticaret platformu olarak, doğal ve çevre dostu ürünleri
            EN geniş kitlelere ulaştırıyoruz. Her &quot;EN&quot; bizim için bir sorumluluk, her ürün bir güvence.
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
                2020 yılında İstanbul&apos;da, doğal ve sürdürülebilir ürünlere ulaşmanın neden bu kadar
                zor olduğu sorusuyla yola çıktık. Amacımız basitti: insanların EN kaliteli, EN doğal
                ve EN uygun fiyatlı ürünlere kolayca ulaşmasını sağlamak.
              </p>
              <p className="text-neutral-500 mb-4 leading-relaxed">
                Bugün 50.000&apos;den fazla satıcıyla Türkiye&apos;nin dört bir yanından EN özel ürünleri
                bir araya getiriyoruz. Her ürün, sürdürülebilirlik kriterlerimizden geçerek
                platformumuza kabul ediliyor.
              </p>
              <p className="text-neutral-500 leading-relaxed">
                Misyonumuz: Herkesin EN doğal, EN kaliteli ve EN sürdürülebilir ürünlere ulaşmasını
                sağlamak. Çünkü EN iyisi doğada, EN güzeli enolsun.com&apos;da!
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl p-12 flex items-center justify-center min-h-[320px]">
              <div className="text-center">
                <div className="text-6xl mb-4">🌿</div>
                <p className="text-primary-700 font-semibold text-lg">Doğanın İlhamıyla</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">Değerlerimiz</h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">
              Her adımımızda &quot;EN&quot; olmak için çalışıyoruz. Bu değerler, bizi biz yapan temel taşlar.
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
              EN tutkulu ekip, EN büyük fikirleri hayata geçirir.
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
            enolsun.com&apos;da satıcı olarak binlerce müşteriye ulaşın. EN büyük fırsatlar burada!
          </p>
          <Link
            href="/seller-register"
            className="inline-flex items-center px-8 py-3.5 bg-white text-primary-600 font-semibold rounded-xl hover:bg-primary-25 transition-colors"
          >
            Satıcı Ol
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
