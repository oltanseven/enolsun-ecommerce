import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Çerez Politikası | enolsun.com",
  description:
    "enolsun.com çerez politikası. Çerez türleri, çerez yönetimi ve üçüncü taraf çerezler hakkında detaylı bilgi.",
  keywords: "çerez politikası, cookie, çerez yönetimi, enolsun, gizlilik",
  openGraph: {
    title: "Çerez Politikası | enolsun.com",
    description: "enolsun.com çerez politikası ve çerez yönetimi.",
    type: "website",
  },
};

const cookieTypes = [
  {
    name: "Zorunlu Çerezler",
    description:
      "Web sitesinin temel işlevlerinin çalışması için gerekli olan çerezlerdir. Bu çerezler olmadan site düzgün çalışmaz.",
    examples: [
      "Oturum yönetimi (giriş durumunuz)",
      "Sepet bilgileri",
      "Güvenlik çerezleri",
      "Çerez tercih ayarlarınız",
    ],
    canDisable: false,
  },
  {
    name: "Analitik Çerezler",
    description:
      "Ziyaretçilerin siteyi nasıl kullandığını anlamamıza yardımcı olan çerezlerdir. Toplanan veriler anonimdir.",
    examples: [
      "Sayfa görüntülenme sayıları",
      "Ziyaretçi sayısı ve kaynakları",
      "Sitede geçirilen süre",
      "En çok ziyaret edilen sayfalar",
    ],
    canDisable: true,
  },
  {
    name: "Pazarlama Çerezleri",
    description:
      "Size ilgi alanınıza uygun reklamlar göstermek ve pazarlama kampanyalarının etkinliğini ölçmek için kullanılır.",
    examples: [
      "Kişiselleştirilmiş reklam gösterimi",
      "Sosyal medya entegrasyonları",
      "Reklam kampanyası performansı",
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
            Çerez <span className="text-primary-500">Politikası</span>
          </h1>
          <p className="text-neutral-500">
            Son güncelleme: 1 Ocak 2026
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
                enolsun.com olarak web sitemizde çerezler kullanıyoruz. Bu politika, hangi çerezleri
                kullandığımızı, neden kullandığımızı ve çerez tercihlerinizi nasıl yönetebileceğinizi açıklar.
              </p>
            </div>

            {/* What are cookies */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">Çerez Nedir?</h2>
              <p className="text-neutral-600 leading-relaxed">
                Çerezler, web sitelerinin cihazınıza (bilgisayar, tablet veya telefon) yerleştirdiği
                küçük metin dosyalarıdır. Çerezler, web sitesinin sizi tanımasını, tercihlerinizi
                hatırlamasını ve size daha iyi bir deneyim sunmasını sağlar.
              </p>
            </div>

            {/* Cookie Types */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-6">Kullandığımız Çerez Türleri</h2>
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
                          Devre Dışı Bırakılabilir
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded-full">
                          Zorunlu
                        </span>
                      )}
                    </div>
                    <p className="text-neutral-600 leading-relaxed mb-4">{type.description}</p>
                    <div className="bg-neutral-25 rounded-xl p-4">
                      <p className="text-sm font-medium text-neutral-700 mb-2">Örnekler:</p>
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
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">Çerezleri Nasıl Yönetebilirsiniz?</h2>
              <div className="space-y-3 text-neutral-600 leading-relaxed">
                <p>
                  Çerez tercihlerinizi aşağıdaki yöntemlerle yönetebilirsiniz:
                </p>
                <div className="bg-neutral-25 rounded-xl p-6 space-y-4">
                  <div>
                    <h4 className="font-medium text-neutral-700 mb-1">Tarayıcı Ayarları</h4>
                    <p className="text-sm text-neutral-500">
                      Çoğu web tarayıcısı, çerezleri kontrol etmenize olanak tanır. Tarayıcınızın
                      ayarlar bölümünden çerezleri silebilir, engelleyebilir veya bildirimleri yönetebilirsiniz.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-700 mb-1">Çerez Tercih Paneli</h4>
                    <p className="text-sm text-neutral-500">
                      Sitemizi ilk ziyaretinizde gösterilen çerez onay banner&apos;ından tercihlerinizi
                      belirleyebilirsiniz. Daha sonra sayfanın altındaki &quot;Çerez Ayarları&quot;
                      linkinden tercihlerinizi güncelleyebilirsiniz.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-neutral-400">
                  Not: Zorunlu çerezleri devre dışı bırakmak, web sitesinin düzgün çalışmamasına neden olabilir.
                </p>
              </div>
            </div>

            {/* Third-party */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">Üçüncü Taraf Çerezler</h2>
              <div className="space-y-3 text-neutral-600 leading-relaxed">
                <p>
                  Sitemizde aşağıdaki üçüncü taraf hizmetlerinin çerezleri de kullanılmaktadır:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><span className="font-medium">Google Analytics:</span> Site trafiği ve kullanıcı davranışı analizi</li>
                  <li><span className="font-medium">Facebook Pixel:</span> Reklam ölçümleme ve hedefleme</li>
                  <li><span className="font-medium">Hotjar:</span> Kullanıcı deneyimi analizi (ısı haritaları, oturum kayıtları)</li>
                  <li><span className="font-medium">Intercom:</span> Canlı destek ve müşteri iletişimi</li>
                </ul>
                <p>
                  Bu hizmetlerin kendi gizlilik politikaları ve çerez politikaları bulunmaktadır.
                  Detaylı bilgi için ilgili hizmetin web sitesini ziyaret edebilirsiniz.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">İletişim</h2>
              <div className="space-y-3 text-neutral-600 leading-relaxed">
                <p>
                  Çerez politikamız ile ilgili sorularınız için:
                </p>
                <div className="bg-neutral-25 rounded-xl p-6">
                  <div className="space-y-2">
                    <p><span className="font-medium text-neutral-700">E-posta:</span> kvkk@enolsun.com</p>
                    <p><span className="font-medium text-neutral-700">Telefon:</span> +90 (212) 555 0123</p>
                  </div>
                </div>
                <p className="text-sm text-neutral-400 mt-4">
                  Bu politika enolsun.com tarafından düzenli olarak güncellenmektedir.
                  Değişiklikler yayınlandığı tarihte yürürlüğe girer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
