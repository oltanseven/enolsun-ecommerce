import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'enolsun.com | EN\'lerin Dünyasına Hoş Geldiniz!',
  description: 'enolsun.com — EN iyi doğal ürünler, EN güvenilir e-ticaret deneyimi. Sürdürülebilir online alışverişin EN yenilikçi adresi. Hızlı teslimat, güvenli ödeme.',
}

/* ---- tiny SVG helpers (to keep JSX readable) ---- */
const StarIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
)
const SmallStar = ({ className = '' }: { className?: string }) => (
  <svg className={`w-3 md:w-3.5 h-3 md:h-3.5 ${className}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
)

/* ---- data for the product grid ---- */
const products = [
  {
    category: 'Ev & Yasam',
    name: 'Organik Bambu Saksi Seti',
    price: 249,
    oldPrice: null,
    rating: 5,
    reviews: 128,
    badge: 'Yeni',
    badgeColor: 'bg-primary-500',
    gradient: 'from-primary-50 via-primary-100 to-primary-50',
    iconPath: 'M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z',
    hasCircle: true,
    favorited: false,
    slug: 'organik-bambu-saksi-seti',
  },
  {
    category: 'Aydinlatma',
    name: 'Minimal Ay Gece Lambasi',
    price: 132,
    oldPrice: 189,
    rating: 4,
    reviews: 89,
    badge: '%30',
    badgeColor: 'bg-error-base',
    gradient: 'from-primary-100 via-primary-200 to-primary-100',
    iconPath: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
    hasCircle: false,
    favorited: false,
    slug: 'minimal-ay-gece-lambasi',
  },
  {
    category: 'Ev & Yasam',
    name: 'El Yapimi Bambu Dekor Seti',
    price: 549,
    oldPrice: null,
    rating: 5,
    reviews: 256,
    badge: 'Best',
    badgeColor: 'bg-neutral-800',
    gradient: 'from-primary-50 via-white to-primary-100',
    iconPath: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4',
    hasCircle: false,
    favorited: true,
    slug: 'el-yapimi-bambu-dekor-seti',
  },
  {
    category: 'Dekorasyon',
    name: 'Kristal Yildiz Dekor',
    price: 129,
    oldPrice: null,
    rating: 4,
    reviews: 67,
    badge: null,
    badgeColor: '',
    gradient: 'from-primary-100 via-primary-50 to-white',
    iconPath: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    hasCircle: false,
    favorited: false,
    slug: 'kristal-yildiz-dekor',
  },
]

const categories = [
  { name: 'Ev & Yasam', count: 324, icon: <svg className="w-6 md:w-7 h-6 md:h-7 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/></svg> },
  { name: 'Dogal Bakim', count: 186, icon: <svg className="w-6 md:w-7 h-6 md:h-7 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/></svg> },
  { name: 'Eko Giyim', count: 412, icon: <svg className="w-6 md:w-7 h-6 md:h-7 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"/></svg> },
  { name: 'Aydinlatma', count: 98, icon: <svg className="w-6 md:w-7 h-6 md:h-7 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/></svg> },
  { name: 'Mutfak', count: 267, icon: <svg className="w-6 md:w-7 h-6 md:h-7 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"/></svg> },
  { name: 'Outdoor', count: 153, icon: <svg className="w-6 md:w-7 h-6 md:h-7 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64"/></svg> },
]

const testimonials = [
  { text: '"Bambu saksı setini aldım, EN iyi kalite ve EN şık tasarım! Evime çok yakıştı, çevre dostu olması da ayrı bir artı."', name: 'Ayşe Yılmaz', initials: 'AY', bgColor: 'bg-primary-100', textColor: 'text-primary-700' },
  { text: '"EN hızlı kargo deneyimiydi, ürünler harika paketlenmişti. Gece lambasının ışık kalitesi beklentimin EN üstünde çıktı."', name: 'Mehmet Kaya', initials: 'MK', bgColor: 'bg-primary-200', textColor: 'text-primary-800' },
  { text: '"Üçüncü kez alışveriş yapıyorum. Her seferinde EN iyi kalite ve özen. Müşteri hizmetleri de EN ilgili ve çözüm odaklı."', name: 'Zeynep Demir', initials: 'ZD', bgColor: 'bg-primary-300', textColor: 'text-white' },
]

export default function HomePage() {
  return (
    <main id="main-content">
      {/* ============ HERO SECTION ============ */}
      <section className="pt-20 md:pt-24 pb-8 md:pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center min-h-[50vh] md:min-h-[70vh]">
            {/* Left Content */}
            <div className="space-y-4 md:space-y-8 opacity-0 animate-fade-in-up">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-50 border border-primary-100 rounded-full">
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-primary-700">Yeni Sezon Koleksiyonu</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-neutral-900 leading-tight">
                <span className="text-primary-500">EN</span>&apos;lerin Dünyasına
                <span className="text-primary-500 block">Hoş Geldiniz!</span>
              </h1>

              <p className="text-base md:text-lg text-neutral-400 max-w-md leading-relaxed">
                EN doğal, EN sürdürülebilir, EN yenilikçi ürünlerle yaşam alanınızı dönüştürün. Doğadan ilham alan EN özel koleksiyonlar burada.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                <Link href="/products" className="inline-flex items-center gap-2 px-5 md:px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-xl shadow-align-md hover:shadow-align-lg transition-all cursor-pointer min-h-[44px]">
                  EN İyileri Keşfet
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
                </Link>
                <Link href="/flash-sales" className="inline-flex items-center gap-2 px-5 md:px-6 py-3 bg-white border border-neutral-200 hover:border-primary-300 text-neutral-700 text-sm font-semibold rounded-xl shadow-align-xs hover:shadow-align-sm transition-all cursor-pointer min-h-[44px]">
                  <svg className="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"/><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z"/></svg>
                  EN Büyük Fırsatlar
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 pt-2 md:pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary-200 border-2 border-white flex items-center justify-center text-xs font-bold text-primary-700">A</div>
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary-300 border-2 border-white flex items-center justify-center text-xs font-bold text-primary-800">M</div>
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary-400 border-2 border-white flex items-center justify-center text-xs font-bold text-white">S</div>
                  </div>
                  <span className="text-xs text-neutral-400"><strong className="text-neutral-600">2.4k+</strong> Mutlu Müşteri</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                  </div>
                  <span className="text-xs text-neutral-400"><strong className="text-neutral-600">4.9</strong>/5</span>
                </div>
              </div>
            </div>

            {/* Right - Hero Visual */}
            <div className="relative opacity-0 animate-fade-in-up [animation-delay:0.2s]">
              <div className="relative bg-gradient-to-br from-primary-100 via-primary-50 to-white rounded-2xl md:rounded-3xl p-4 md:p-8 overflow-hidden">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary-200 rounded-full opacity-40 blur-2xl" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary-300 rounded-full opacity-30 blur-xl" />

                <div className="relative grid grid-cols-2 gap-2 sm:gap-4">
                  <div className="space-y-2 sm:space-y-4">
                    <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 shadow-align-sm card-hover">
                      <div className="w-full h-20 sm:h-32 bg-gradient-to-br from-primary-100 to-primary-50 rounded-lg md:rounded-xl mb-2 md:mb-3 flex items-center justify-center">
                        <svg className="w-10 sm:w-16 h-10 sm:h-16 text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.5"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/><circle cx="12" cy="12" r="3"/></svg>
                      </div>
                      <p className="text-xs font-semibold text-neutral-700">Organik Saksi</p>
                      <p className="text-sm font-bold text-primary-600">&#8378;249</p>
                    </div>
                    <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 shadow-align-sm card-hover animate-float">
                      <div className="w-full h-16 sm:h-24 bg-gradient-to-br from-primary-200 to-primary-100 rounded-lg md:rounded-xl mb-2 md:mb-3 flex items-center justify-center">
                        <svg className="w-8 sm:w-12 h-8 sm:h-12 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.5"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
                      </div>
                      <p className="text-xs font-semibold text-neutral-700">Gece Lambasi</p>
                      <p className="text-sm font-bold text-primary-600">&#8378;189</p>
                    </div>
                  </div>
                  <div className="space-y-2 sm:space-y-4 pt-4 sm:pt-8">
                    <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 shadow-align-sm card-hover">
                      <div className="w-full h-18 sm:h-28 bg-gradient-to-br from-primary-50 to-white rounded-lg md:rounded-xl mb-2 md:mb-3 flex items-center justify-center">
                        <svg className="w-9 sm:w-14 h-9 sm:h-14 text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.5"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4"/></svg>
                      </div>
                      <p className="text-xs font-semibold text-neutral-700">Bambu Set</p>
                      <p className="text-sm font-bold text-primary-600">&#8378;549</p>
                    </div>
                    <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 shadow-align-sm card-hover">
                      <div className="w-full h-24 sm:h-36 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg md:rounded-xl mb-2 md:mb-3 flex items-center justify-center">
                        <svg className="w-10 sm:w-16 h-10 sm:h-16 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.5"><path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
                      </div>
                      <p className="text-xs font-semibold text-neutral-700">Dekoratif Yildiz</p>
                      <p className="text-sm font-bold text-primary-600">&#8378;129</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURES BAR ============ */}
      <section className="bg-primary-500 py-3 md:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="flex items-center gap-2 md:gap-3 text-white">
              <svg className="w-4 md:w-5 h-4 md:h-5 text-primary-200 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25h.008v.008h-.008v-.008zm0 0L5.25 6.75h13.5l1.875 7.5"/></svg>
              <span className="text-xs md:text-sm font-medium">EN Hızlı Kargo</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 text-white">
              <svg className="w-4 md:w-5 h-4 md:h-5 text-primary-200 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>
              <span className="text-xs md:text-sm font-medium">EN Güvenli Ödeme</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 text-white">
              <svg className="w-4 md:w-5 h-4 md:h-5 text-primary-200 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"/></svg>
              <span className="text-xs md:text-sm font-medium">EN Kolay İade</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 text-white">
              <svg className="w-4 md:w-5 h-4 md:h-5 text-primary-200 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"/></svg>
              <span className="text-xs md:text-sm font-medium">7/24 Destek</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CATEGORIES ============ */}
      <section id="categories" className="py-10 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6 md:mb-10">
            <div>
              <p className="text-sm font-semibold text-primary-500 mb-1">Kategoriler</p>
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">EN Çok Tercih Edilen Kategoriler</h2>
            </div>
            <Link href="/products" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
              Tümünü Gör
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
            </Link>
          </div>

          <div className="flex md:grid md:grid-cols-6 gap-3 md:gap-4 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0" style={{ scrollbarWidth: 'none' }}>
            {categories.map((cat) => (
              <Link key={cat.name} href="/products" className="group text-center p-4 md:p-6 bg-white rounded-2xl border border-neutral-100 hover:border-primary-200 hover:bg-primary-25 shadow-align-xs card-hover shrink-0 w-28 md:w-auto min-w-[7rem] md:min-w-0 cursor-pointer">
                <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-2 md:mb-3 bg-primary-50 group-hover:bg-primary-100 rounded-2xl flex items-center justify-center transition-colors">
                  {cat.icon}
                </div>
                <p className="text-xs md:text-sm font-semibold text-neutral-700 group-hover:text-primary-700">{cat.name}</p>
                <p className="text-xs text-neutral-400 mt-1">{cat.count} Ürün</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRODUCTS GRID ============ */}
      <section id="products" className="py-10 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6 md:mb-10">
            <div>
              <p className="text-sm font-semibold text-primary-500 mb-1">Koleksiyon</p>
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">EN Trend Ürünler</h2>
            </div>
            <div className="hidden md:flex items-center bg-neutral-50 rounded-xl p-1">
              <button className="px-4 py-2 text-sm font-medium bg-white text-neutral-800 rounded-lg shadow-align-xs cursor-pointer">Tümü</button>
              <button className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-neutral-600 rounded-lg cursor-pointer">EN Yeni</button>
              <button className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-neutral-600 rounded-lg cursor-pointer">EN Popüler</button>
              <button className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-neutral-600 rounded-lg cursor-pointer">İndirimli</button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {products.map((product) => (
              <Link key={product.slug} href={`/product/${product.slug}`} className="group bg-white rounded-xl md:rounded-2xl border border-neutral-100 overflow-hidden card-hover block">
                <div className="relative overflow-hidden">
                  <div className={`w-full h-40 sm:h-56 bg-gradient-to-br ${product.gradient} flex items-center justify-center`}>
                    <svg className="w-16 sm:w-24 h-16 sm:h-24 text-primary-200 group-hover:scale-110 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.5">
                      <path d={product.iconPath}/>
                      {product.hasCircle && <circle cx="12" cy="12" r="3"/>}
                    </svg>
                  </div>
                  {product.badge && (
                    <span className={`absolute top-2 md:top-3 left-2 md:left-3 px-2 py-0.5 md:px-2.5 md:py-1 ${product.badgeColor} text-white text-[10px] md:text-xs font-semibold rounded-lg`}>{product.badge}</span>
                  )}
                  <button aria-label="Favorilere ekle" className="absolute top-2 md:top-3 right-2 md:right-3 w-7 h-7 md:w-8 md:h-8 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white cursor-pointer">
                    {product.favorited ? (
                      <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24"><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/></svg>
                    ) : (
                      <svg className="w-4 h-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
                    )}
                  </button>
                </div>
                <div className="p-3 md:p-4">
                  <p className="text-[10px] md:text-xs text-neutral-400 mb-1">{product.category}</p>
                  <h3 className="text-xs md:text-sm font-semibold text-neutral-800 mb-1 md:mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-2 md:mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <SmallStar key={i} className={i >= product.rating ? 'text-neutral-200' : ''} />)}
                    </div>
                    <span className="text-[10px] md:text-xs text-neutral-400">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 md:gap-2">
                      <span className="text-base md:text-lg font-bold text-primary-600">&#8378;{product.price}</span>
                      {product.oldPrice && <span className="text-xs md:text-sm text-neutral-300 line-through">&#8378;{product.oldPrice}</span>}
                    </div>
                    <button className="p-2 bg-primary-50 hover:bg-primary-100 text-primary-600 rounded-xl transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Sepete ekle">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROMO BANNER ============ */}
      <section id="deals" className="py-10 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-r from-primary-800 via-primary-700 to-primary-600 rounded-2xl md:rounded-3xl overflow-hidden p-6 md:p-14">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full opacity-20 blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-400 rounded-full opacity-20 blur-2xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative grid md:grid-cols-2 gap-6 md:gap-8 items-center">
              <div className="space-y-4 md:space-y-6">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs font-medium text-white">
                  Sınırlı Süre
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
                  EN Yeni Bahar Koleksiyonu<br/>
                  <span className="text-primary-200">{`%40'a Varan İndirim`}</span>
                </h2>
                <p className="text-sm md:text-base text-primary-100 max-w-md">Doğadan ilham alan EN özel bahar koleksiyonumuz, sınırlı süreliğine EN düşük fiyatlarla sizlerle.</p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/products" className="inline-flex items-center gap-2 px-5 md:px-6 py-3 bg-white text-primary-700 text-sm font-semibold rounded-xl hover:bg-primary-50 transition-colors cursor-pointer min-h-[44px]">
                    EN İyi Fırsatları Yakala
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
                  </Link>
                </div>
              </div>
              {/* Countdown Timer */}
              <div className="flex justify-center md:justify-end">
                <div className="grid grid-cols-4 gap-2 md:gap-3 text-center">
                  {[{ val: '03', label: 'Gün' }, { val: '14', label: 'Saat' }, { val: '27', label: 'Dakika' }, { val: '52', label: 'Saniye' }].map((t) => (
                    <div key={t.label} className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-2.5 md:p-4 min-w-[56px] md:min-w-[70px]">
                      <span className="block text-xl md:text-3xl font-bold text-white">{t.val}</span>
                      <span className="text-[10px] md:text-xs text-primary-200 mt-1">{t.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-10 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-sm font-semibold text-primary-500 mb-1">Yorumlar</p>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">EN Mutlu Müşterilerimiz Ne Diyor?</h2>
          </div>

          <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0" style={{ scrollbarWidth: 'none' }}>
            {testimonials.map((t) => (
              <div key={t.name} className="p-5 md:p-6 bg-neutral-25 rounded-2xl border border-neutral-100 shrink-0 w-[85vw] sm:w-[70vw] md:w-auto">
                <div className="flex text-yellow-400 mb-3 md:mb-4">
                  {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                </div>
                <p className="text-sm text-neutral-600 mb-4 leading-relaxed">{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${t.bgColor} flex items-center justify-center text-sm font-bold ${t.textColor}`}>{t.initials}</div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-800">{t.name}</p>
                    <p className="text-xs text-neutral-400">Doğrulanmış Alıcı</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ NEWSLETTER ============ */}
      <section className="py-10 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-50 rounded-2xl md:rounded-3xl p-6 md:p-14 text-center">
            <div className="max-w-lg mx-auto space-y-4 md:space-y-6">
              <div className="w-12 h-12 md:w-14 md:h-14 mx-auto bg-primary-100 rounded-2xl flex items-center justify-center">
                <svg className="w-6 md:w-7 h-6 md:h-7 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-neutral-900">EN Yeni Fırsatlardan İlk Siz Haberdar Olun</h2>
              <p className="text-sm text-neutral-500">EN özel indirimler, EN yeni ürünler ve ilham verici içerikler için bültenimize abone olun.</p>
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input type="email" placeholder="E-posta adresiniz" className="flex-1 px-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all min-h-[44px]" />
                <button className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-xl shadow-align-sm transition-all whitespace-nowrap cursor-pointer min-h-[44px]">
                  Abone Ol
                </button>
              </div>
              <p className="text-xs text-neutral-400">Dilediginiz zaman aboneliginizi iptal edebilirsiniz.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SELLER CTA BANNER ============ */}
      <section className="py-12 bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-white">{`enolsun.com'da EN Kolay Satışa Başla!`}</h2>
              <p className="text-primary-200 mt-2">EN hızlı büyüyen pazar yerinde mağazanı aç, EN geniş müşteri kitlesine ulaş.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/seller-register" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-700 text-sm font-semibold rounded-xl hover:bg-primary-50 transition-colors">
                Hemen Başvur
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
              </Link>
              <Link href="/seller-login" className="inline-flex items-center gap-2 px-6 py-3 border border-primary-400 text-primary-200 text-sm font-semibold rounded-xl hover:bg-primary-800 transition-colors">
                Satıcı Girişi
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
