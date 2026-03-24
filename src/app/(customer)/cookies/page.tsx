import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cerez Politikasi - enolsun.com",
  description:
    "enolsun.com cerez politikasi. Cerez turleri, cerez yonetimi ve ucuncu taraf cerezler hakkinda bilgi.",
  keywords: "cerez politikasi, cookie, cerez yonetimi, enolsun",
  openGraph: {
    title: "Cerez Politikasi - enolsun.com",
    description: "enolsun.com cerez politikasi ve cerez yonetimi.",
    type: "website",
  },
};

const cookieTypes = [
  {
    name: "Zorunlu Cerezler",
    description:
      "Web sitesinin temel islevlerinin calismasi icin gerekli olan cerezlerdir. Bu cerezler olmadan site duzgun calismaz.",
    examples: [
      "Oturum yonetimi (giris durumunuz)",
      "Sepet bilgileri",
      "Guvenlik cerezleri",
      "Cerez tercih ayarlariniz",
    ],
    canDisable: false,
  },
  {
    name: "Analitik Cerezler",
    description:
      "Ziyaretcilerin siteyi nasil kullandigini anlamamiza yardimci olan cerezlerdir. Toplanan veriler anonimdir.",
    examples: [
      "Sayfa goruntulenme sayilari",
      "Ziyaretci sayisi ve kaynaklari",
      "Sitede gecirilen sure",
      "En cok ziyaret edilen sayfalar",
    ],
    canDisable: true,
  },
  {
    name: "Pazarlama Cerezleri",
    description:
      "Size ilgi alaniniza uygun reklamlar gostermek ve pazarlama kampanyalarinin etkinligini olcmek icin kullanilir.",
    examples: [
      "Kisisellestirilmis reklam gosterimi",
      "Sosyal medya entegrasyonlari",
      "Reklam kampanyasi performansi",
      "Yeniden hedefleme (retargeting)",
    ],
    canDisable: true,
  },
];

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 via-primary-25 to-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4">
            Cerez <span className="text-primary-500">Politikasi</span>
          </h1>
          <p className="text-neutral-500">
            Son guncelleme: 1 Ocak 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-10">
            {/* Intro */}
            <div>
              <p className="text-neutral-600 leading-relaxed">
                enolsun.com olarak web sitemizde cerezler kullaniyoruz. Bu politika, hangi cerezleri
                kullandigimizi, neden kullandigimizi ve cerez tercihlerinizi nasil yonetebileceginizi aciklar.
              </p>
            </div>

            {/* What are cookies */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">Cerez Nedir?</h2>
              <p className="text-neutral-600 leading-relaxed">
                Cerezler, web sitelerinin cihaziniza (bilgisayar, tablet veya telefon) yerlesirdigi
                kucuk metin dosyalaridir. Cerezler, web sitesinin sizi tanimas, tercihlerinizi
                hatirlamas ve size daha iyi bir deneyim sunmasini saglar.
              </p>
            </div>

            {/* Cookie Types */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-6">Kullandigimiz Cerez Turleri</h2>
              <div className="space-y-6">
                {cookieTypes.map((type) => (
                  <div
                    key={type.name}
                    className="border border-neutral-100 rounded-2xl p-6 md:p-8"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-semibold text-neutral-800">{type.name}</h3>
                      {type.canDisable ? (
                        <span className="px-3 py-1 bg-amber-50 text-amber-600 text-xs font-medium rounded-full">
                          Devre Disi Birakilabilir
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded-full">
                          Zorunlu
                        </span>
                      )}
                    </div>
                    <p className="text-neutral-600 leading-relaxed mb-4">{type.description}</p>
                    <div className="bg-neutral-25 rounded-xl p-4">
                      <p className="text-sm font-medium text-neutral-700 mb-2">Ornekler:</p>
                      <ul className="space-y-1">
                        {type.examples.map((example) => (
                          <li key={example} className="text-neutral-500 text-sm flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary-400 rounded-full flex-shrink-0" />
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How to manage */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">Cerezleri Nasil Yonetebilirsiniz?</h2>
              <div className="space-y-3 text-neutral-600 leading-relaxed">
                <p>
                  Cerez tercihlerinizi asagidaki yontemlerle yonetebilirsiniz:
                </p>
                <div className="bg-neutral-25 rounded-xl p-6 space-y-4">
                  <div>
                    <h4 className="font-medium text-neutral-700 mb-1">Tarayici Ayarlari</h4>
                    <p className="text-sm text-neutral-500">
                      Cogu web tarayicisi, cerezleri kontrol etmenize olanak tanir. Tarayicinizin
                      ayarlar bolumunden cerezleri silebilir, engelleyebilir veya bildirimleri yonetebilirsiniz.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-700 mb-1">Cerez Tercih Paneli</h4>
                    <p className="text-sm text-neutral-500">
                      Sitemizi ilk ziyaretinizde gosterilen cerez onay bannerindan tercihlerinizi
                      belirleyebilirsiniz. Daha sonra sayfanin altindaki &quot;Cerez Ayarlari&quot;
                      linkinden tercihlerinizi guncelleyebilirsiniz.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-neutral-400">
                  Not: Zorunlu cerezleri devre disi birakmak, web sitesinin duzgun calismamas&atilde;na neden olabilir.
                </p>
              </div>
            </div>

            {/* Third-party */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">Ucuncu Taraf Cerezler</h2>
              <div className="space-y-3 text-neutral-600 leading-relaxed">
                <p>
                  Sitemizde asagidaki ucuncu taraf hizmetlerinin cerezleri de kullanilmaktadir:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><span className="font-medium">Google Analytics:</span> Site trafigi ve kullanici davranisi analizi</li>
                  <li><span className="font-medium">Facebook Pixel:</span> Reklam olcumleme ve hedefleme</li>
                  <li><span className="font-medium">Hotjar:</span> Kullanici deneyimi analizi (isi haritalari, oturum kayitlari)</li>
                  <li><span className="font-medium">Intercom:</span> Canli destek ve musteri iletisimi</li>
                </ul>
                <p>
                  Bu hizmetlerin kendi gizlilik politikalari ve cerez politikalari bulunmaktadir.
                  Detayli bilgi icin ilgili hizmetin web sitesini ziyaret edebilirsiniz.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">Iletisim</h2>
              <div className="space-y-3 text-neutral-600 leading-relaxed">
                <p>
                  Cerez politikamiz ile ilgili sorulariniz icin:
                </p>
                <div className="bg-neutral-25 rounded-xl p-6">
                  <div className="space-y-2">
                    <p><span className="font-medium text-neutral-700">E-posta:</span> kvkk@enolsun.com</p>
                    <p><span className="font-medium text-neutral-700">Telefon:</span> +90 (212) 555 0123</p>
                  </div>
                </div>
                <p className="text-sm text-neutral-400 mt-4">
                  Bu politika enolsun.com tarafindan duzenli olarak guncellenmektedir.
                  Degisiklikler yayinlandigi tarihte yururluge girer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
