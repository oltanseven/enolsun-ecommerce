import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullanim Kosullari - enolsun.com",
  description:
    "enolsun.com kullanim kosullari. Genel kosullar, uyelik, siparis ve odeme, fikri mulkiyet ve sorumluluk bilgileri.",
  keywords: "kullanim kosullari, sartlar, sozlesme, enolsun",
  openGraph: {
    title: "Kullanim Kosullari - enolsun.com",
    description: "enolsun.com kullanim kosullari ve sartlari.",
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
            Kullanim <span className="text-primary-500">Kosullari</span>
          </h1>
          <p className="text-neutral-500">
            Son guncelleme: 1 Ocak 2026
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
                Bu Kullanim Kosullari, enolsun.com web sitesini ve mobil uygulamasini kullanan
                tum kullanicilari baglar. Platformumuzu kullanarak bu kosullari kabul etmis sayilirsiniz.
              </p>
            </div>

            {/* Section 1 */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">1. Genel Kosullar</h2>
              <div className="space-y-3 text-neutral-600 leading-relaxed">
                <p>
                  enolsun.com, dogal ve surdurulebilir urunlerin satisina aracilak eden bir e-ticaret
                  platformudur. Platform uzerindeki tum islemler Turkiye Cumhuriyeti kanunlarina tabidir.
                </p>
                <p>
                  Platformu kullanmak icin 18 yasindan buyuk olmalisiniz. 18 yasindan kucuk kullanicilar
                  yasal vasileri araciligiyla islem yapabilir.
                </p>
                <p>
                  enolsun.com, bu kullanim kosullarini onceden bildirimde bulunmaksizin degistirme
                  hakkini sakli tutar. Degisiklikler yayinlandigi tarihte yururluge girer.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">2. Uyelik</h2>
              <div className="space-y-3 text-neutral-600 leading-relaxed">
                <p>
                  Platforma uye olmak icin gecerli bir e-posta adresi veya telefon numarasi gereklidir.
                  Uyelik bilgilerinizin dogrulugundan siz sorumlusunuz.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Her kullanici yalnizca bir hesap acabilir.</li>
                  <li>Hesap bilgilerinizin guvenligi sizin sorumlulugunuzdadir.</li>
                  <li>Hesabinizla yapilan tum islemlerden siz sorumlusunuz.</li>
                  <li>Yetkisiz erisim durumunda derhal bizi bilgilendirmelisiniz.</li>
                </ul>
                <p>
                  enolsun.com, kurallara aykiri davranan hesaplari askiya alma veya kapatma hakkina sahiptir.
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">3. Siparis & Odeme</h2>
              <div className="space-y-3 text-neutral-600 leading-relaxed">
                <p>
                  Platform uzerinden verilen siparisler, odemenin onaylanmasindan sonra isleme alinir.
                  Urun fiyatlari KDV dahil olarak gosterilir.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Fiyatlar ve kampanyalar onceden bildirilmeksizin degistirilebilir.</li>
                  <li>Siparis verildikten sonra fiyat degisiklikleri mevcut siparisi etkilemez.</li>
                  <li>Odeme islemleri 256-bit SSL sifreleme ile guvence altindadir.</li>
                  <li>Kredi karti, banka karti, havale/EFT ve kapida odeme kabul edilir.</li>
                </ul>
                <p>
                  Siparis iptali, urun kargoya verilmeden once talep edilmelidir. Kargoya verilen
                  siparisler icin iade proseduru uygulanir.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">4. Fikri Mulkiyet</h2>
              <div className="space-y-3 text-neutral-600 leading-relaxed">
                <p>
                  enolsun.com web sitesindeki tum icerikler (metin, gorsel, logo, tasarim, yazilim vb.)
                  enolsun.com&apos;a aittir ve telif haklari ile korunmaktadir.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Iceriklerin izinsiz kopyalanmasi, dagitilmasi veya degistirilmesi yasaktir.</li>
                  <li>Platform uzerindeki ticari markalar ve logolar tescilli haklardir.</li>
                  <li>Kullanicilar, platforma yukledikleri iceriklerin telif haklarindan sorumludur.</li>
                </ul>
              </div>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">5. Sorumluluk</h2>
              <div className="space-y-3 text-neutral-600 leading-relaxed">
                <p>
                  enolsun.com, platformda satisa sunulan urunlerin kalitesi ve guvenligi konusunda
                  saticilarla birlikte sorumluluk tasir. Ancak:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Platformda yer alan ucuncu taraf baglantilarin iceriginden sorumlu degildir.</li>
                  <li>Mucbir sebepler nedeniyle olusabilecek gecikmelerden dolayi sorumluluk kabul etmez.</li>
                  <li>Kullanicilarin yanlis bilgi saglamasindan kaynaklanan sorunlardan sorumlu degildir.</li>
                </ul>
              </div>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">6. Uyusmazlik</h2>
              <div className="space-y-3 text-neutral-600 leading-relaxed">
                <p>
                  Bu kullanim kosullarindan dogan uyusmazliklarda Istanbul Mahkemeleri ve Icra
                  Daireleri yetkilidir.
                </p>
                <p>
                  Tuketici haklarina iliskin uyusmazliklarda, 6502 sayili Tuketicinin Korunmasi
                  Hakkinda Kanun hükümleri uygulanir.
                </p>
                <div className="bg-neutral-25 rounded-xl p-6 mt-4">
                  <div className="space-y-2">
                    <p><span className="font-medium text-neutral-700">E-posta:</span> hukuk@enolsun.com</p>
                    <p><span className="font-medium text-neutral-700">Telefon:</span> +90 (212) 555 0123</p>
                    <p><span className="font-medium text-neutral-700">Adres:</span> Istanbul, Turkiye</p>
                  </div>
                </div>
                <p className="text-sm text-neutral-400 mt-4">
                  Bu kosullar enolsun.com tarafindan duzenli olarak guncellenmektedir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
