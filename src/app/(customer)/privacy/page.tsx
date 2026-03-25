import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | enolsun.com",
  description:
    "enolsun.com gizlilik politikası. Kişisel verilerin korunması, çerez politikası, veri güvenliği ve KVKK kapsamındaki haklarınız.",
  keywords: "gizlilik politikası, kvkk, kişisel veri, çerez, enolsun, veri güvenliği",
  openGraph: {
    title: "Gizlilik Politikası | enolsun.com",
    description: "enolsun.com gizlilik politikası ve kişisel verilerin korunması.",
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
            Gizlilik <span className="text-primary-500">Politikası</span>
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
                enolsun.com olarak kişisel verilerinizin güvenliğine en büyük önemi veriyoruz.
                Bu Gizlilik Politikası, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK)
                kapsamında kişisel verilerinizin nasıl toplandığını, işlendiğini ve korunduğunu açıklar.
                Verilerinizin güvenliği bizim için EN öncelikli konudur.
              </p>
            </div>

            {/* Section 1 */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">1. Kişisel Verilerin İşlenmesi</h2>
              <div className="space-y-3 text-neutral-600 leading-relaxed">
                <p>
                  Platformumuz üzerinden toplanan kişisel veriler aşağıdaki amaçlarla işlenmektedir:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Üyelik işlemlerinin gerçekleştirilmesi ve hesap yönetimi</li>
                  <li>Sipariş ve ödeme işlemlerinin yürütülmesi</li>
                  <li>Kargo ve teslimat süreçlerinin yönetimi</li>
                  <li>Müşteri hizmetleri ve destek taleplerinin karşılanması</li>
                  <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                  <li>Hizmet kalitesinin artırılması ve iyileştirilmesi</li>
                </ul>
                <p>
                  Toplanan veriler; ad, soyad, e-posta adresi, telefon numarası, teslimat adresi,
                  ödeme bilgileri ve alışveriş geçmişini içerebilir.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">2. Çerez Politikası</h2>
              <div className="space-y-3 text-neutral-600 leading-relaxed">
                <p>
                  Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanmaktadır.
                  Çerezler hakkında detaylı bilgi için{" "}
                  <a href="/cookies" className="text-primary-500 hover:text-primary-600 font-medium">
                    Çerez Politikası
                  </a>{" "}
                  sayfamızı ziyaret edebilirsiniz.
                </p>
                <p>
                  Kullanılan çerez türleri: zorunlu çerezler, analitik çerezler ve pazarlama çerezleri.
                  Tarayıcı ayarlarınızdan çerez tercihlerinizi yönetebilirsiniz.
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">3. Veri Güvenliği</h2>
              <div className="space-y-3 text-neutral-600 leading-relaxed">
                <p>
                  Kişisel verileriniz, en güncel güvenlik önlemleriyle korunmaktadır. enolsun.com olarak
                  veri güvenliğinde en yüksek standartları uyguluyoruz:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>256-bit SSL şifreleme ile güvenli veri iletimi</li>
                  <li>PCI DSS uyumlu ödeme altyapısı</li>
                  <li>Düzenli güvenlik denetimleri ve penetrasyon testleri</li>
                  <li>Erişim kontrol mekanizmaları ve yetkilendirme</li>
                  <li>Veri yedekleme ve felaket kurtarma planları</li>
                </ul>
                <p>
                  Verileriniz, Türkiye sınırlarındaki güvenli sunucularda saklanmaktadır.
                  Üçüncü taraflarla veri paylaşımı yalnızca hizmet gereklilikleri doğrultusunda
                  ve yasal çerçevede gerçekleştirilir.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">4. Haklarınız</h2>
              <div className="space-y-3 text-neutral-600 leading-relaxed">
                <p>
                  KVKK kapsamında aşağıdaki haklara sahipsiniz:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                  <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
                  <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                  <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme</li>
                  <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
                  <li>İşlenmesini gerektiren sebeplerin ortadan kalkması hâlinde kişisel verilerin silinmesini veya yok edilmesini isteme</li>
                </ul>
              </div>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">5. İletişim</h2>
              <div className="space-y-3 text-neutral-600 leading-relaxed">
                <p>
                  Gizlilik politikamız ile ilgili soru ve talepleriniz için aşağıdaki iletişim
                  kanallarından bize ulaşabilirsiniz:
                </p>
                <div className="bg-neutral-25 rounded-xl p-6 mt-4">
                  <div className="space-y-2">
                    <p><span className="font-medium text-neutral-700">E-posta:</span> kvkk@enolsun.com</p>
                    <p><span className="font-medium text-neutral-700">Telefon:</span> +90 (212) 555 0123</p>
                    <p><span className="font-medium text-neutral-700">Adres:</span> İstanbul, Türkiye</p>
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
