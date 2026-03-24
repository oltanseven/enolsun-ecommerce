'use client'

import { useState } from 'react'
import Link from 'next/link'

const StarIcon = ({ filled = true }: { filled?: boolean }) => (
  <svg className={`w-4 h-4 ${filled ? 'text-yellow-400' : 'text-neutral-200'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
)

const SmallStar = ({ filled = true }: { filled?: boolean }) => (
  <svg className={`w-3 md:w-3.5 h-3 md:h-3.5 ${filled ? 'text-yellow-400' : 'text-neutral-200'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
)

const filterCategories = [
  { name: 'Ev & Yasam', count: 18 },
  { name: 'Dogal Bakim', count: 12 },
  { name: 'Eko Giyim', count: 10 },
  { name: 'Aydinlatma', count: 8 },
  { name: 'Mutfak', count: 9 },
  { name: 'Outdoor', count: 7 },
]

const colors = [
  { name: 'Siyah', bg: 'bg-neutral-900', selected: true },
  { name: 'Beyaz', bg: 'bg-white' },
  { name: 'Yesil', bg: 'bg-primary-500' },
  { name: 'Kahverengi', bg: 'bg-amber-600' },
  { name: 'Mavi', bg: 'bg-blue-500' },
  { name: 'Kirmizi', bg: 'bg-red-500' },
  { name: 'Sari', bg: 'bg-yellow-400' },
  { name: 'Gri', bg: 'bg-neutral-300' },
]

const demoProducts = [
  { slug: 'organik-bambu-saksi-seti', name: 'Organik Bambu Saksi Seti', category: 'Ev & Yasam', price: 249, oldPrice: null, rating: 5, reviews: 128, badge: 'Yeni', badgeColor: 'bg-primary-500', gradient: 'from-primary-50 via-primary-100 to-primary-50' },
  { slug: 'minimal-ay-gece-lambasi', name: 'Minimal Ay Gece Lambasi', category: 'Aydinlatma', price: 132, oldPrice: 189, rating: 4, reviews: 89, badge: '%30', badgeColor: 'bg-error-base', gradient: 'from-primary-100 via-primary-200 to-primary-100' },
  { slug: 'el-yapimi-bambu-dekor-seti', name: 'El Yapimi Bambu Dekor Seti', category: 'Ev & Yasam', price: 549, oldPrice: null, rating: 5, reviews: 256, badge: 'Best', badgeColor: 'bg-neutral-800', gradient: 'from-primary-50 via-white to-primary-100' },
  { slug: 'kristal-yildiz-dekor', name: 'Kristal Yildiz Dekor', category: 'Dekorasyon', price: 129, oldPrice: null, rating: 4, reviews: 67, badge: null, badgeColor: '', gradient: 'from-primary-100 via-primary-50 to-white' },
  { slug: 'dogal-tas-mumluk', name: 'Dogal Tas Mumluk', category: 'Ev & Yasam', price: 89, oldPrice: 120, rating: 4, reviews: 45, badge: '%25', badgeColor: 'bg-error-base', gradient: 'from-primary-50 via-primary-100 to-primary-200' },
  { slug: 'organik-pamuk-yastik', name: 'Organik Pamuk Yastik', category: 'Ev & Yasam', price: 179, oldPrice: null, rating: 5, reviews: 92, badge: 'Yeni', badgeColor: 'bg-primary-500', gradient: 'from-white via-primary-50 to-primary-100' },
  { slug: 'bambu-sirt-cantasi', name: 'Bambu Sirt Cantasi', category: 'Aksesuar', price: 349, oldPrice: null, rating: 4, reviews: 73, badge: null, badgeColor: '', gradient: 'from-primary-100 via-primary-200 to-primary-100' },
  { slug: 'seramik-vazo-seti', name: 'El Yapimi Seramik Vazo', category: 'Ev & Yasam', price: 199, oldPrice: 249, rating: 5, reviews: 156, badge: '%20', badgeColor: 'bg-error-base', gradient: 'from-primary-50 via-white to-primary-50' },
]

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('popular')
  const [filterOpen, setFilterOpen] = useState(false)
  const [priceRange, setPriceRange] = useState(3500)

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Kategori */}
      <div className="bg-white rounded-xl border border-neutral-100 p-5">
        <h3 className="text-sm font-semibold text-neutral-900 mb-4">Kategori</h3>
        <div className="space-y-3">
          {filterCategories.map((cat) => (
            <label key={cat.name} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-neutral-300 text-primary-500 focus:ring-primary-500 focus:ring-offset-0 transition-colors" />
              <span className="text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">{cat.name}</span>
              <span className="ml-auto text-xs text-neutral-300 bg-neutral-50 px-1.5 py-0.5 rounded-full">{cat.count}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Fiyat Araligi */}
      <div className="bg-white rounded-xl border border-neutral-100 p-5">
        <h3 className="text-sm font-semibold text-neutral-900 mb-4">Fiyat Araligi</h3>
        <div className="space-y-4">
          <div>
            <input type="range" min="0" max="5000" value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))} className="w-full accent-primary-500" />
            <div className="flex justify-between mt-1 text-xs text-neutral-400">
              <span>&#8378;0</span>
              <span className="font-medium text-primary-600">&#8378;{priceRange.toLocaleString('tr-TR')}</span>
              <span>&#8378;5.000</span>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-xs text-neutral-400 mb-1 block">Min</label>
              <input type="number" placeholder="0" className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all" />
            </div>
            <div className="flex-1">
              <label className="text-xs text-neutral-400 mb-1 block">Max</label>
              <input type="number" placeholder="5000" className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all" />
            </div>
          </div>
        </div>
      </div>

      {/* Renk */}
      <div className="bg-white rounded-xl border border-neutral-100 p-5">
        <h3 className="text-sm font-semibold text-neutral-900 mb-4">Renk</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((c) => (
            <button key={c.name} className={`w-8 h-8 rounded-full ${c.bg} border-2 border-neutral-200 hover:border-primary-400 transition-all focus:outline-none ${c.selected ? 'ring-2 ring-primary-500 ring-offset-2' : ''}`} title={c.name} />
          ))}
        </div>
      </div>

      {/* Degerlendirme */}
      <div className="bg-white rounded-xl border border-neutral-100 p-5">
        <h3 className="text-sm font-semibold text-neutral-900 mb-4">Degerlendirme</h3>
        <div className="space-y-2">
          {[5, 4, 3].map((rating) => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer group">
              <input type="radio" name="rating" className="w-4 h-4 border-neutral-300 text-primary-500 focus:ring-primary-500 focus:ring-offset-0" />
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < rating} />)}
              </div>
              <span className="text-xs text-neutral-400 group-hover:text-neutral-600">{rating === 5 ? '5.0' : `${rating}.0+`}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* BREADCRUMBS */}
      <div className="pt-20 pb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Sayfa yolu" className="flex items-center gap-2 text-sm text-neutral-400 overflow-x-auto whitespace-nowrap" style={{ scrollbarWidth: 'none' }}>
            <Link href="/" className="hover:text-primary-500 transition-colors flex-shrink-0">Ana Sayfa</Link>
            <svg aria-hidden="true" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
            <span className="text-neutral-700 font-medium flex-shrink-0">Urunler</span>
          </nav>
        </div>
      </div>

      {/* PAGE HEADER */}
      <div className="pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">Tum Urunler</h1>
              <p className="mt-1 text-neutral-400 text-sm">Toplam <span className="font-semibold text-neutral-600">64</span> urun listeleniyor</p>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main id="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-16">
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <button onClick={() => setFilterOpen(true)} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors min-h-[44px]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"/></svg>
              Filtrele
            </button>
          </div>

          {/* Mobile Filter Drawer */}
          {filterOpen && (
            <div className="fixed inset-0 z-[60]">
              <div className="absolute inset-0 bg-black/40" onClick={() => setFilterOpen(false)} />
              <div className="absolute top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-align-xl overflow-y-auto flex flex-col slide-in-left">
                <div className="flex items-center justify-between p-5 border-b border-neutral-100">
                  <h2 className="text-lg font-bold text-neutral-900">Filtreler</h2>
                  <button onClick={() => setFilterOpen(false)} className="p-2 text-neutral-400 hover:text-neutral-600 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-5">
                  <FilterContent />
                </div>
                <div className="p-5 border-t border-neutral-100">
                  <button onClick={() => setFilterOpen(false)} className="w-full py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors min-h-[44px]">Filtreleri Uygula</button>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-8">
            {/* LEFT SIDEBAR FILTERS */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-20">
                <FilterContent />
              </div>
            </aside>

            {/* RIGHT: PRODUCTS */}
            <div className="flex-1 min-w-0">
              {/* Sort & View Controls */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400">
                    <option value="popular">Populerlik</option>
                    <option value="newest">En Yeniler</option>
                    <option value="price_asc">Fiyat: Artan</option>
                    <option value="price_desc">Fiyat: Azalan</option>
                    <option value="rating">Puan</option>
                  </select>
                </div>
                <div className="flex items-center gap-1 bg-neutral-50 rounded-lg p-1">
                  <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-align-xs text-neutral-800' : 'text-neutral-400 hover:text-neutral-600'}`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/></svg>
                  </button>
                  <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow-align-xs text-neutral-800' : 'text-neutral-400 hover:text-neutral-600'}`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"/></svg>
                  </button>
                </div>
              </div>

              {/* Product Grid */}
              <div className={viewMode === 'grid' ? 'grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6' : 'space-y-4'}>
                {demoProducts.map((product) => (
                  <Link key={product.slug} href={`/product/${product.slug}`} className={`group bg-white rounded-xl md:rounded-2xl border border-neutral-100 overflow-hidden card-hover block ${viewMode === 'list' ? 'flex gap-4' : ''}`}>
                    <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-40 h-40 flex-shrink-0' : ''}`}>
                      <div className={`${viewMode === 'list' ? 'w-full h-full' : 'w-full h-40 sm:h-56'} bg-gradient-to-br ${product.gradient} flex items-center justify-center`}>
                        <svg className="w-16 sm:w-24 h-16 sm:h-24 text-primary-200 group-hover:scale-110 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.5"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/><circle cx="12" cy="12" r="3"/></svg>
                      </div>
                      {product.badge && (
                        <span className={`absolute top-2 md:top-3 left-2 md:left-3 px-2 py-0.5 md:px-2.5 md:py-1 ${product.badgeColor} text-white text-[10px] md:text-xs font-semibold rounded-lg`}>{product.badge}</span>
                      )}
                      <button aria-label="Favorilere ekle" className="absolute top-2 md:top-3 right-2 md:right-3 w-7 h-7 md:w-8 md:h-8 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white cursor-pointer">
                        <svg className="w-4 h-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
                      </button>
                    </div>
                    <div className="p-3 md:p-4 flex-1">
                      <p className="text-[10px] md:text-xs text-neutral-400 mb-1">{product.category}</p>
                      <h3 className="text-xs md:text-sm font-semibold text-neutral-800 mb-1 md:mb-2 line-clamp-2">{product.name}</h3>
                      <div className="flex items-center gap-1 mb-2 md:mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => <SmallStar key={i} filled={i < product.rating} />)}
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

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mt-10">
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-400 hover:bg-neutral-50 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/></svg>
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-500 text-white text-sm font-medium">1</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50 text-sm font-medium transition-colors">2</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50 text-sm font-medium transition-colors">3</button>
                <span className="px-2 text-neutral-400">...</span>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50 text-sm font-medium transition-colors">8</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-400 hover:bg-neutral-50 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
