import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kariyer | enolsun.com — EN İyi Ekibe Katıl",
  description:
    "enolsun.com kariyer fırsatları. EN yetenekli insanlarla EN büyük hedeflere ulaşın. Açık pozisyonları keşfedin!",
  keywords: "enolsun kariyer, iş ilanları, yazılım geliştirici, ux tasarımcı, e-ticaret kariyer",
  openGraph: {
    title: "Kariyer | enolsun.com — EN İyi Ekibe Katıl",
    description: "EN yetenekli insanlarla EN büyük hedeflere. enolsun ekibine katıl!",
    type: "website",
  },
};

const benefits = [
  {
    title: "Esnek Çalışma",
    description: "Hibrit çalışma modeli ile ofis veya uzaktan çalışma imkânı. EN rahat çalışma ortamı senin için.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    title: "Gelişim Fırsatları",
    description: "Eğitim bütçesi, konferans katılımları ve mentorluk programları. EN iyi gelişim fırsatları burada.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    title: "Sosyal Haklar",
    description: "Özel sağlık sigortası, yemek kartı, ulaşım desteği ve daha fazlası. EN kapsamlı yan haklar.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    title: "Takım Ruhu",
    description: "Düzenli takım etkinlikleri, hackathon&apos;lar ve sosyal aktiviteler. EN eğlenceli çalışma kültürü.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
];

const positions = [
  {
    title: "Senior Frontend Developer",
    department: "Mühendislik",
    location: "İstanbul / Uzaktan",
    type: "Tam Zamanlı",
    description:
      "React, Next.js ve TypeScript ile EN modern e-ticaret deneyimlerini geliştirecek bir frontend geliştirici arıyoruz.",
  },
  {
    title: "UX Designer",
    department: "Tasarım",
    location: "İstanbul",
    type: "Tam Zamanlı",
    description:
      "Kullanıcı odaklı tasarım yaklaşımıyla EN iyi alışveriş deneyimini oluşturacak bir UX tasarımcı arıyoruz.",
  },
  {
    title: "Müşteri Deneyimi Uzmanı",
    department: "Müşteri Hizmetleri",
    location: "İstanbul / Uzaktan",
    type: "Tam Zamanlı",
    description:
      "Müşterilerimize EN hızlı ve EN etkili çözümler sunacak, çözüm odaklı bir müşteri deneyimi uzmanı arıyoruz.",
  },
  {
    title: "Veri Analisti",
    department: "Veri & Analitik",
    location: "İstanbul",
    type: "Tam Zamanlı",
    description:
      "Büyük veri setlerinden EN anlamlı içgörüleri çıkaracak, veri odaklı kararlar almamıza yardımcı olacak bir analist arıyoruz.",
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-50 via-primary-25 to-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
            Kariyer Fırsatları
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 mb-6">
            enolsun Ekibine <span className="text-primary-500">Katıl!</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-500 max-w-3xl mx-auto leading-relaxed">
            EN yetenekli insanlarla EN büyük hedeflere. Türkiye&apos;nin EN hızlı büyüyen sürdürülebilir
            e-ticaret platformunda yerini al.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
              Neden enolsun?
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">
              EN mutlu çalışanlar, EN başarılı sonuçları üretir. İşte enolsun&apos;da seni bekleyen avantajlar.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white border border-neutral-100 rounded-2xl p-6 hover:shadow-align-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-500 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">{benefit.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 md:py-24 bg-neutral-25">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">Açık Pozisyonlar</h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">
              Sana EN uygun pozisyonu bul ve hemen başvur. EN iyi kariyer fırsatları burada.
            </p>
          </div>
          <div className="space-y-4">
            {positions.map((position) => (
              <div
                key={position.title}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-align-sm hover:shadow-align-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-neutral-800 mb-2">{position.title}</h3>
                    <p className="text-neutral-500 text-sm mb-3">{position.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded-full">
                        {position.department}
                      </span>
                      <span className="px-3 py-1 bg-neutral-50 text-neutral-500 text-xs font-medium rounded-full">
                        {position.location}
                      </span>
                      <span className="px-3 py-1 bg-neutral-50 text-neutral-500 text-xs font-medium rounded-full">
                        {position.type}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`mailto:kariyer@enolsun.com?subject=Başvuru: ${position.title}`}
                    className="inline-flex items-center justify-center px-6 py-2.5 bg-primary-500 text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-colors whitespace-nowrap"
                  >
                    Başvur
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-primary-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Aradığın pozisyonu bulamadın mı?
          </h2>
          <p className="text-primary-100 mb-8 text-lg">
            Açık başvurunu gönder, sana EN uygun fırsat çıktığında iletişime geçelim.
          </p>
          <Link
            href="mailto:kariyer@enolsun.com?subject=Açık Başvuru"
            className="inline-flex items-center px-8 py-3.5 bg-white text-primary-600 font-semibold rounded-xl hover:bg-primary-25 transition-colors"
          >
            Açık Başvuru Gönder
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
