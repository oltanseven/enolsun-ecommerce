'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const StarIcon = ({ filled = true, size = 'sm' }: { filled?: boolean; size?: 'sm' | 'md' }) => (
  <svg className={`${size === 'md' ? 'w-5 h-5' : 'w-4 h-4'} ${filled ? 'text-yellow-400' : 'text-neutral-200'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
)
const SmallStar = ({ filled = true }: { filled?: boolean }) => (
  <svg className={`w-3 md:w-3.5 h-3 md:h-3.5 ${filled ? 'text-yellow-400' : 'text-neutral-200'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
)

const productColors = [
  { name: 'Doğal', bg: 'bg-amber-600', selected: true },
  { name: 'Koyu Yeşil', bg: 'bg-primary-700' },
  { name: 'Beyaz', bg: 'bg-white border-neutral-200' },
  { name: 'Siyah', bg: 'bg-neutral-900' },
]

const productSizes = ['S', 'M', 'L', 'XL']

const galleryGradients = [
  'from-primary-100 via-primary-50 to-white',
  'from-primary-50 via-primary-100 to-primary-200',
  'from-white via-primary-50 to-primary-100',
  'from-primary-200 via-primary-100 to-primary-50',
]

const similarProducts = [
  { slug: 'dogal-tas-mumluk', name: 'Dogal Tas Mumluk', category: 'Ev & Yasam', price: 89, rating: 4, reviews: 45, gradient: 'from-primary-50 via-primary-100 to-primary-200' },
  { slug: 'seramik-vazo-seti', name: 'El Yapimi Seramik Vazo', category: 'Ev & Yasam', price: 199, rating: 5, reviews: 156, gradient: 'from-primary-100 via-white to-primary-50' },
  { slug: 'bambu-sirt-cantasi', name: 'Bambu Sirt Cantasi', category: 'Aksesuar', price: 349, rating: 4, reviews: 73, gradient: 'from-primary-100 via-primary-200 to-primary-100' },
  { slug: 'organik-pamuk-yastik', name: 'Organik Pamuk Yastik', category: 'Ev & Yasam', price: 179, rating: 5, reviews: 92, gradient: 'from-white via-primary-50 to-primary-100' },
]

const reviews = [
  { name: 'Ayşe Y.', initials: 'AY', rating: 5, date: '2 hafta önce', text: 'EN iyi kalitede bir ürün! Tasarımı muhteşem ve eve çok yakıştı. Kesinlikle tavsiye ederim.', bgColor: 'bg-primary-100', textColor: 'text-primary-700' },
  { name: 'Mehmet K.', initials: 'MK', rating: 5, date: '1 ay önce', text: 'Beklediğimden çok daha güzel çıktı. EN özenli paketleme, EN hızlı kargo. Teşekkürler!', bgColor: 'bg-primary-200', textColor: 'text-primary-800' },
  { name: 'Zeynep D.', initials: 'ZD', rating: 4, date: '1 ay önce', text: 'Güzel ürün, EN doğal malzeme hissiyatı. Rengi fotoğraftan biraz farklı ama yine de çok beğendim.', bgColor: 'bg-primary-300', textColor: 'text-white' },
]

const specs = [
  { label: 'Malzeme', value: '%100 Organik Bambu' },
  { label: 'Boyutlar', value: '25cm x 15cm x 15cm' },
  { label: 'Ağırlık', value: '850g' },
  { label: 'Renk Seçenekleri', value: 'Doğal, Koyu Yeşil, Beyaz, Siyah' },
  { label: 'Menşei', value: 'Türkiye' },
  { label: 'Garanti', value: '2 Yıl' },
]

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState(1) // M
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description')
  const [favorited, setFavorited] = useState(false)

  const productName = slug?.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()) || 'Organik Bambu Saksi Seti'

  return (
    <>
      {/* BREADCRUMBS */}
      <div className="pt-20 pb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Sayfa yolu" className="flex items-center gap-2 text-sm text-neutral-400 overflow-x-auto whitespace-nowrap" style={{ scrollbarWidth: 'none' }}>
            <Link href="/" className="hover:text-primary-500 transition-colors flex-shrink-0">Ana Sayfa</Link>
            <svg aria-hidden="true" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
            <Link href="/products" className="hover:text-primary-500 transition-colors flex-shrink-0">Ürünler</Link>
            <svg aria-hidden="true" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
            <span className="text-neutral-700 font-medium flex-shrink-0">{productName}</span>
          </nav>
        </div>
      </div>

      <main id="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mt-6">
            {/* LEFT: IMAGE GALLERY */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className={`w-full aspect-square bg-gradient-to-br ${galleryGradients[selectedImage]} rounded-2xl md:rounded-3xl flex items-center justify-center overflow-hidden`}>
                <svg className="w-32 h-32 md:w-48 md:h-48 text-primary-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.5"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/><circle cx="12" cy="12" r="3"/></svg>
              </div>
              {/* Thumbnails */}
              <div className="flex gap-3">
                {galleryGradients.map((grad, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)} className={`w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center border-2 transition-all ${selectedImage === i ? 'border-primary-500 ring-2 ring-primary-200' : 'border-transparent hover:border-neutral-200'}`}>
                    <svg className="w-6 h-6 text-primary-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.5"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z"/></svg>
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT: PRODUCT INFO */}
            <div className="space-y-6">
              {/* Title & Rating */}
              <div>
                <p className="text-sm text-primary-600 font-medium mb-1">Ev & Yaşam</p>
                <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">{productName}</h1>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <div className="flex">{[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < 5} size="md" />)}</div>
                    <span className="text-sm font-medium text-neutral-700 ml-1">4.9</span>
                  </div>
                  <span className="text-sm text-neutral-400">(128 değerlendirme)</span>
                  <span className="text-sm text-primary-600 font-medium">2.4k satış</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl md:text-4xl font-bold text-primary-600">&#8378;249</span>
                <span className="text-lg text-neutral-300 line-through">&#8378;329</span>
                <span className="px-2 py-0.5 bg-error-light text-error-dark text-xs font-semibold rounded-lg">%24 İndirim</span>
              </div>

              {/* Description */}
              <p className="text-sm text-neutral-500 leading-relaxed">
                El yapımı, %100 sürdürülebilir bambudan üretilmiş EN doğal saksı seti. Evinize EN şık dokunuşu katar. 3 farklı boyutta saksı içeren set, her ortama EN iyi uyumu sağlar.
              </p>

              {/* Color Selection */}
              <div>
                <p className="text-sm font-medium text-neutral-700 mb-3">Renk: <span className="text-neutral-500 font-normal">{productColors[selectedColor].name}</span></p>
                <div className="flex gap-2">
                  {productColors.map((c, i) => (
                    <button key={c.name} onClick={() => setSelectedColor(i)} className={`w-10 h-10 rounded-full ${c.bg} border-2 transition-all ${selectedColor === i ? 'ring-2 ring-primary-500 ring-offset-2 border-transparent' : 'border-neutral-200 hover:border-neutral-300'}`} title={c.name} />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <p className="text-sm font-medium text-neutral-700 mb-3">Boyut: <span className="text-neutral-500 font-normal">{productSizes[selectedSize]}</span></p>
                <div className="flex gap-2">
                  {productSizes.map((s, i) => (
                    <button key={s} onClick={() => setSelectedSize(i)} className={`w-12 h-12 rounded-xl text-sm font-medium transition-all ${selectedSize === i ? 'bg-primary-500 text-white shadow-sm' : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:border-primary-300'}`}>{s}</button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <p className="text-sm font-medium text-neutral-700 mb-3">Adet</p>
                <div className="inline-flex items-center border border-neutral-200 rounded-xl overflow-hidden">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-11 h-11 flex items-center justify-center text-neutral-500 hover:bg-neutral-50 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15"/></svg>
                  </button>
                  <span className="w-12 h-11 flex items-center justify-center text-sm font-semibold text-neutral-800 border-x border-neutral-200">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-11 h-11 flex items-center justify-center text-neutral-500 hover:bg-neutral-50 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-primary-500/20 transition-all hover:shadow-lg min-h-[48px]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/></svg>
                  Sepete Ekle
                </button>
                <button onClick={() => setFavorited(!favorited)} className={`w-12 h-12 flex items-center justify-center rounded-xl border transition-all min-h-[48px] ${favorited ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white border-neutral-200 text-neutral-400 hover:border-primary-300 hover:text-primary-500'}`}>
                  <svg className="w-5 h-5" fill={favorited ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {[
                  { icon: <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25h.008v.008h-.008v-.008zm0 0L5.25 6.75h13.5l1.875 7.5"/></svg>, text: 'EN Hızlı Kargo' },
                  { icon: <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>, text: 'EN Güvenli Ödeme' },
                  { icon: <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"/></svg>, text: 'EN Kolay İade' },
                ].map((badge) => (
                  <div key={badge.text} className="flex flex-col items-center gap-1.5 p-3 bg-neutral-50 rounded-xl text-center">
                    {badge.icon}
                    <span className="text-xs font-medium text-neutral-600">{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* TABS */}
          <div className="mt-12 md:mt-16">
            <div className="flex items-center gap-1 bg-neutral-50 rounded-xl p-1 mb-8 max-w-md">
              {[
                { key: 'description' as const, label: 'Açıklama' },
                { key: 'specs' as const, label: 'Özellikler' },
                { key: 'reviews' as const, label: 'Değerlendirmeler' },
              ].map((tab) => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === tab.key ? 'bg-white text-neutral-800 shadow-align-xs' : 'text-neutral-400 hover:text-neutral-600'}`}>{tab.label}</button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'description' && (
              <div className="prose prose-sm max-w-none text-neutral-600 leading-relaxed space-y-4">
                <p>Organik Bambu Saksı Seti, %100 sürdürülebilir bambudan el yapımı olarak üretilmiştir. Her set, üç farklı boyutta saksıden oluşmaktadır ve evinizin her köşesine EN doğal dokunuşu katmak için tasarlanmıştır.</p>
                <p>Bambu, doğada EN hızlı büyüyen bitkilerden biridir ve hasat edildikten sonra yeniden yetişir. Bu sayede çevre üzerinde EN düşük etkiyi bırakır. Ürünlerimiz hiçbir kimyasal işlem görmeden, doğal haliyle işlenerek sizlere sunulmaktadır.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>%100 organik ve sürdürülebilir bambu</li>
                  <li>El yapımı, her biri benzersiz</li>
                  <li>3 farklı boyut (küçük, orta, büyük)</li>
                  <li>İç mekân ve dış mekân kullanıma uygun</li>
                  <li>EN kolay bakım ve temizlik</li>
                </ul>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-lg">
                <div className="divide-y divide-neutral-100">
                  {specs.map((spec) => (
                    <div key={spec.label} className="flex items-center justify-between py-3">
                      <span className="text-sm font-medium text-neutral-500">{spec.label}</span>
                      <span className="text-sm text-neutral-800">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Summary */}
                <div className="flex items-center gap-6 p-6 bg-neutral-50 rounded-2xl">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-neutral-900">4.9</div>
                    <div className="flex mt-1">{[...Array(5)].map((_, i) => <StarIcon key={i} />)}</div>
                    <p className="text-xs text-neutral-400 mt-1">128 değerlendirme</p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-xs text-neutral-500 w-3">{star}</span>
                        <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-400 rounded-full" style={{ width: star === 5 ? '78%' : star === 4 ? '15%' : star === 3 ? '5%' : '1%' }} />
                        </div>
                        <span className="text-xs text-neutral-400 w-8 text-right">{star === 5 ? '100' : star === 4 ? '19' : star === 3 ? '6' : star === 2 ? '2' : '1'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.name} className="p-5 border border-neutral-100 rounded-2xl">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full ${review.bgColor} flex items-center justify-center text-sm font-bold ${review.textColor}`}>{review.initials}</div>
                          <div>
                            <p className="text-sm font-semibold text-neutral-800">{review.name}</p>
                            <p className="text-xs text-neutral-400">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex">{[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < review.rating} />)}</div>
                      </div>
                      <p className="text-sm text-neutral-600 leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SIMILAR PRODUCTS */}
          <section className="mt-12 md:mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-neutral-900">Benzer Ürünler</h2>
              <Link href="/products" className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">Tümünü Gör</Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {similarProducts.map((product) => (
                <Link key={product.slug} href={`/product/${product.slug}`} className="group bg-white rounded-xl md:rounded-2xl border border-neutral-100 overflow-hidden card-hover block">
                  <div className="relative overflow-hidden">
                    <div className={`w-full h-40 sm:h-56 bg-gradient-to-br ${product.gradient} flex items-center justify-center`}>
                      <svg className="w-16 sm:w-24 h-16 sm:h-24 text-primary-200 group-hover:scale-110 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.5"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/><circle cx="12" cy="12" r="3"/></svg>
                    </div>
                    <button aria-label="Favorilere ekle" className="absolute top-2 md:top-3 right-2 md:right-3 w-7 h-7 md:w-8 md:h-8 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white cursor-pointer">
                      <svg className="w-4 h-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
                    </button>
                  </div>
                  <div className="p-3 md:p-4">
                    <p className="text-[10px] md:text-xs text-neutral-400 mb-1">{product.category}</p>
                    <h3 className="text-xs md:text-sm font-semibold text-neutral-800 mb-1 md:mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center gap-1 mb-2 md:mb-3">
                      <div className="flex">{[...Array(5)].map((_, i) => <SmallStar key={i} filled={i < product.rating} />)}</div>
                      <span className="text-[10px] md:text-xs text-neutral-400">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-base md:text-lg font-bold text-primary-600">&#8378;{product.price}</span>
                      <button className="p-2 bg-primary-50 hover:bg-primary-100 text-primary-600 rounded-xl transition-colors cursor-pointer" aria-label="Sepete ekle">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
