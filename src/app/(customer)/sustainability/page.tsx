import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Surdurulebilirlik - enolsun.com | En Surdurulebilir E-Ticaret Platformu",
  description:
    "enolsun.com surdurulebilirlik taahhutleri. Cevre dostu ambalaj, karbon notr kargo ve organik urun garantisi.",
  keywords: "surdurulebilirlik, cevre dostu, karbon notr, organik urunler, enolsun",
  openGraph: {
    title: "Surdurulebilirlik - enolsun.com",
    description: "Turkiye'nin en surdurulebilir e-ticaret platformu.",
    type: "website",
  },
};

const commitments = [
  {
    title: "Cevre Dostu Ambalaj",
    description:
      "Tum gonderilerimizde geri donusturulmus ve biyolojik olarak parcalanabilir ambalaj malzemeleri kullaniyoruz. Plastik kullanimi sifir.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  },
  {
    title: "Karbon Notr Kargo",
    description:
      "Tum kargo sureclerimizdeki karbon ayak izini olcuyor ve agac dikme projeleriyle dengeliyoruz. Her gonderi, bir agac fidani demek.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    title: "Organik Urun Garantisi",
    description:
      "Platformdaki tum dogal urunler, bagimsiz laboratuvarlarda test edilir. Organik sertifikali urunlere ozel etiket verilir.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
];

const impactStats = [
  { value: "12 Ton", label: "Tasarruf Edilen Plastik", description: "Yillik plastik kullanimi azaltimi" },
  { value: "50.000+", label: "Dikilen Agac", description: "Karbon dengeleme projeleriyle" },
  { value: "2.500+", label: "Desteklenen Ciftci", description: "Yerel uretici isbirlikleri" },
  { value: "%85", label: "Geri Donusum Orani", description: "Ambalaj malzemelerinde" },
];

const timeline = [
  {
    year: "2020",
    title: "Yesil Baslangic",
    description: "enolsun.com kuruldu. Surdurulebilir urunler icin ilk kategori olusturuldu.",
  },
  {
    year: "2021",
    title: "Plastik-Free Ambalaj",
    description: "Tum gonderilerde plastiksiz ambalaj kullanimimiza gecis tamamlandi.",
  },
  {
    year: "2022",
    title: "Karbon Notr Kargo",
    description: "Kargo operasyonlarimiz karbon notr hale getirildi. 10.000 agac dikildi.",
  },
  {
    year: "2023",
    title: "Organik Sertifikasyon",
    description: "Urunler icin bagimsiz organik sertifikasyon programi basllatildi.",
  },
  {
    year: "2024",
    title: "Yesil Enerji Gecisi",
    description: "Tum operasyonlarimiz %100 yenilenebilir enerjiyle calismaya basladi.",
  },
  {
    year: "2025",
    title: "Dongusel Ekonomi",
    description: "Urun geri donusum ve yeniden kullanim programi hayata gecirildi.",
  },
  {
    year: "2026",
    title: "Sifir Atik Hedefi",
    description: "2026 sonuna kadar tum operasyonlarda sifir atik hedefi.",
  },
];

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-50 via-primary-25 to-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
            EN&apos;lerin Dunyasina Hos Geldiniz!
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 mb-6">
            En <span className="text-primary-500">Surdurulebilir</span> E-Ticaret Platformu
          </h1>
          <p className="text-lg md:text-xl text-neutral-500 max-w-3xl mx-auto leading-relaxed">
            Dogaya en saygiliyiz, cunku dogadan ilham aliyoruz. Her adimimiz, daha yesil bir gelecek icin.
          </p>
        </div>
      </section>

      {/* Commitments */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">Taahhutlerimiz</h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">
              En surdurulebilir e-ticaret platformu olmak icin verdikimiz sozler.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {commitments.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-neutral-100 rounded-2xl p-8 hover:shadow-align-md transition-shadow text-center"
              >
                <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-500 mx-auto mb-5">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-3">{item.title}</h3>
                <p className="text-neutral-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-primary-500">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Etkimiz</h2>
            <p className="text-primary-100 max-w-2xl mx-auto">
              Rakamlarla en somut sonuclarimiz.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-primary-100 font-medium mb-1">{stat.label}</div>
                <div className="text-primary-200 text-xs">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-neutral-25">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
              Surdurulebilirlik Yol Haritamiz
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">
              Baslangictan bugune, en surdurulebilir platformu insa etme yolculugumuz.
            </p>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-200 -translate-x-1/2" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div key={item.year} className={`relative flex items-start gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-primary-100 -translate-x-1/2 z-10" />

                  {/* Content */}
                  <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8 md:ml-auto"}`}>
                    <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-bold rounded-full mb-2">
                      {item.year}
                    </span>
                    <h3 className="text-lg font-semibold text-neutral-800 mb-1">{item.title}</h3>
                    <p className="text-neutral-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
