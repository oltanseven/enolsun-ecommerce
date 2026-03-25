import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullanım Koşulları | enolsun.com",
  description:
    "enolsun.com kullanım koşulları. Genel koşullar, üyelik, sipariş ve ödeme, fikri mülkiyet ve sorumluluk bilgileri.",
  keywords: "kullanım koşulları, şartlar, sözleşme, enolsun, yasal bilgiler",
  openGraph: {
    title: "Kullanım Koşulları | enolsun.com",
    description: "enolsun.com kullanım koşulları ve şartları.",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 via-primary-25 to-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4">
            Kullanım <span className="text-primary-500">Koşulları</span>
          </h1>
          <p className="text-neutral-500">
            Son güncelleme: 1 Ocak 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose-container space-y-10">
            {/* Intro */}
            <div>
              <p className="text-neutral-600 leading-relaxed">
                Bu Kullanım Koşulları, enolsun.com web sitesini ve mobil uygulamasını kullanan
                tüm kullanıcıları bağlar. Platformumuzu kullanarak bu koşulları kabul etmiş sayılırsınız.
              </p>
            </div>

            {/* Section 1 */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">1. Genel Koşullar</h2>
              <div className="space-y-3 text-neutral-600 leading-relaxed">
                <p>
                  enolsun.com, doğal ve sürdürülebilir ürünlerin satışına aracılık eden bir e-ticaret
                  platformudur. Platform üzerindeki tüm işlemler Türkiye Cumhuriyeti kanunlarına tâbidir.
                </p>
                <p>
                  Platformu kullanmak için 18 yaşından büyük olmalısınız. 18 yaşından küçük kullanıcılar
                  yasal vasileri aracılığıyla işlem yapabilir.
                </p>
                <p>
                  enolsun.com, bu kullanım koşullarını önceden bildirimde bulunmaksızın değiştirme
                  hakkını saklı tutar. Değişiklikler yayınlandığı tarihte yürürlüğe girer.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">2. Üyelik</h2>
              <div className="space-y-3 text-neutral-600 leading-relaxed">
                <p>
                  Platforma üye olmak için geçerli bir e-posta adresi veya telefon numarası gereklidir.
                  Üyelik bilgilerinizin doğruluğundan siz sorumlusunuz.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Her kullanıcı yalnızca bir hesap açabilir.</li>
                  <li>Hesap bilgilerinizin güvenliği sizin sorumluluğunuzdadır.</li>
                  <li>Hesabınızla yapılan tüm işlemlerden siz sorumlusunuz.</li>
                  <li>Yetkisiz erişim durumunda derhal bizi bilgilendirmelisiniz.</li>
                </ul>
                <p>
                  enolsun.com, kurallara aykırı davranan hesapları askıya alma veya kapatma hakkına sahiptir.
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">3. Sipariş & Ödeme</h2>
              <div className="space-y-3 text-neutral-600 leading-relaxed">
                <p>
                  Platform üzerinden verilen siparişler, ödemenin onaylanmasından sonra işleme alınır.
                  Ürün fiyatları KDV dahil olarak gösterilir.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Fiyatlar ve kampanyalar önceden bildirilmeksizin değiştirilebilir.</li>
                  <li>Sipariş verildikten sonra fiyat değişiklikleri mevcut siparişi etkilemez.</li>
                  <li>Ödeme işlemleri 256-bit SSL şifreleme ile güvence altındadır.</li>
                  <li>Kredi kartı, banka kartı, havale/EFT ve kapıda ödeme kabul edilir.</li>
                </ul>
                <p>
                  Sipariş iptali, ürün kargoya verilmeden önce talep edilmelidir. Kargoya verilen
                  siparişler için iade prosedürü uygulanır.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">4. Fikri Mülkiyet</h2>
              <div className="space-y-3 text-neutral-600 leading-relaxed">
                <p>
                  enolsun.com web sitesindeki tüm içerikler (metin, görsel, logo, tasarım, yazılım vb.)
                  enolsun.com&apos;a aittir ve telif hakları ile korunmaktadır.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>İçeriklerin izinsiz kopyalanması, dağıtılması veya değiştirilmesi yasaktır.</li>
                  <li>Platform üzerindeki ticari markalar ve logolar tescilli haklardır.</li>
                  <li>Kullanıcılar, platforma yükledikleri içeriklerin telif haklarından sorumludur.</li>
                </ul>
              </div>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">5. Sorumluluk</h2>
              <div className="space-y-3 text-neutral-600 leading-relaxed">
                <p>
                  enolsun.com, platformda satışa sunulan ürünlerin kalitesi ve güvenliği konusunda
                  satıcılarla birlikte sorumluluk taşır. Ancak:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Platformda yer alan üçüncü taraf bağlantıların içeriğinden sorumlu değildir.</li>
                  <li>Mücbir sebepler nedeniyle oluşabilecek gecikmelerden dolayı sorumluluk kabul etmez.</li>
                  <li>Kullanıcıların yanlış bilgi sağlamasından kaynaklanan sorunlardan sorumlu değildir.</li>
                </ul>
              </div>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">6. Uyuşmazlık</h2>
              <div className="space-y-3 text-neutral-600 leading-relaxed">
                <p>
                  Bu kullanım koşullarından doğan uyuşmazlıklarda İstanbul Mahkemeleri ve İcra
                  Daireleri yetkilidir.
                </p>
                <p>
                  Tüketici haklarına ilişkin uyuşmazlıklarda, 6502 sayılı Tüketicinin Korunması
                  Hakkında Kanun hükümleri uygulanır.
                </p>
                <div className="bg-neutral-25 rounded-xl p-6 mt-4">
                  <div className="space-y-2">
                    <p><span className="font-medium text-neutral-700">E-posta:</span> hukuk@enolsun.com</p>
                    <p><span className="font-medium text-neutral-700">Telefon:</span> +90 (212) 555 0123</p>
                    <p><span className="font-medium text-neutral-700">Adres:</span> İstanbul, Türkiye</p>
                  </div>
                </div>
                <p className="text-sm text-neutral-400 mt-4">
                  Bu koşullar enolsun.com tarafından düzenli olarak güncellenmektedir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
