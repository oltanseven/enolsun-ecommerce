import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikasi - enolsun.com",
  description:
    "enolsun.com gizlilik politikasi. Kisisel verilerin islenmesi, cerez politikasi, veri guvenligi ve haklariniz.",
  keywords: "gizlilik politikasi, kvkk, kisisel veri, cerez, enolsun",
  openGraph: {
    title: "Gizlilik Politikasi - enolsun.com",
    description: "enolsun.com gizlilik politikasi ve kisisel verilerin korunmasi.",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 via-primary-25 to-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4">
            Gizlilik <span className="text-primary-500">Politikasi</span>
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
                enolsun.com olarak kisisel verilerinizin guvenligine en buyuk onemi veriyoruz.
                Bu Gizlilik Politikasi, 6698 sayili Kisisel Verilerin Korunmasi Kanunu (KVKK)
                kapsaminda kisisel verilerinizin nasil toplandigi, islendigi ve korundugunı aciklar.
              </p>
            </div>

            {/* Section 1 */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">1. Kisisel Verilerin Islenmesi</h2>
              <div className="space-y-3 text-neutral-600 leading-relaxed">
                <p>
                  Platformumuz uzerinden toplanan kisisel veriler asagidaki amaclarla islenmektedir:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Uyelik islemlerinin gerceklestirilmesi ve hesap yonetimi</li>
                  <li>Siparis ve odeme islemlerinin yurutulmesi</li>
                  <li>Kargo ve teslimat sureclerinin yonetimi</li>
                  <li>Musteri hizmetleri ve destek taleplerinin karsilanmasi</li>
                  <li>Yasal yukumluluklerin yerine getirilmesi</li>
                  <li>Hizmet kalitesinin arttirilmasi ve iyilestirilmesi</li>
                </ul>
                <p>
                  Toplanan veriler; ad, soyad, e-posta adresi, telefon numarasi, teslimat adresi,
                  odeme bilgileri ve alisveris gecmisini icerebilir.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">2. Cerez Politikasi</h2>
              <div className="space-y-3 text-neutral-600 leading-relaxed">
                <p>
                  Web sitemiz, kullanici deneyimini iyilestirmek icin cerezler kullanmaktadir.
                  Cerezler hakkinda detayli bilgi icin{" "}
                  <a href="/cookies" className="text-primary-500 hover:text-primary-600 font-medium">
                    Cerez Politikasi
                  </a>{" "}
                  sayfamizi ziyaret edebilirsiniz.
                </p>
                <p>
                  Kullanilan cerez turleri: zorunlu cerezler, analitik cerezler ve pazarlama cerezleri.
                  Tarayici ayarlarinizdan cerez tercihlerinizi yonetebilirsiniz.
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">3. Veri Guvenligi</h2>
              <div className="space-y-3 text-neutral-600 leading-relaxed">
                <p>
                  Kisisel verileriniz, en guncel guvenlik onlemleriyle korunmaktadir:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>256-bit SSL sifreleme ile guveni veri iletimi</li>
                  <li>PCI DSS uyumlu odeme altyapisi</li>
                  <li>Duzenli guvenlik denetimleri ve penetrasyon testleri</li>
                  <li>Erisim kontrol mekanizmalari ve yetkilendirme</li>
                  <li>Veri yedekleme ve felaket kurtarma planlari</li>
                </ul>
                <p>
                  Verileriniz, Turkiye sinirlarindaki guvenli sunucularda saklanmaktadir.
                  Ucuncu taraflarla veri paylasimi yalnizca hizmet gereklilikleri dogrultusunda
                  ve yasal cercevede gerceklestirilir.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">4. Haklariniz</h2>
              <div className="space-y-3 text-neutral-600 leading-relaxed">
                <p>
                  KVKK kapsaminda asagidaki haklara sahipsiniz:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Kisisel verilerinizin islenip islenmedigini ogrenme</li>
                  <li>Kisisel verileriniz islenmisse buna iliskin bilgi talep etme</li>
                  <li>Kisisel verilerinizin islenmis amacini ve bunlarin amacina uygun kullanilip kullanilmadigini ogrenme</li>
                  <li>Yurt icinde veya yurt disinda kisisel verilerin aktarildigi ucuncu kisileri bilme</li>
                  <li>Kisisel verilerinizin eksik veya yanlis islenmis olmasi halinde bunlarin duzeltilmesini isteme</li>
                  <li>Islenmesini gerektiren sebeplerin ortadan kalkmasi halinde kisisel verilerin silinmesini veya yok edilmesini isteme</li>
                </ul>
              </div>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">5. Iletisim</h2>
              <div className="space-y-3 text-neutral-600 leading-relaxed">
                <p>
                  Gizlilik politikamiz ile ilgili soru ve talepleriniz icin asagidaki iletisim
                  kanallarindan bize ulasabilirsiniz:
                </p>
                <div className="bg-neutral-25 rounded-xl p-6 mt-4">
                  <div className="space-y-2">
                    <p><span className="font-medium text-neutral-700">E-posta:</span> kvkk@enolsun.com</p>
                    <p><span className="font-medium text-neutral-700">Telefon:</span> +90 (212) 555 0123</p>
                    <p><span className="font-medium text-neutral-700">Adres:</span> Istanbul, Turkiye</p>
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
