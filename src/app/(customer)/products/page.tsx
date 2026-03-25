'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

import { createClient } from '@/lib/supabase/client'
import FavoriteButton from '@/components/ui/FavoriteButton'
import AddToCartButton from '@/components/ui/AddToCartButton'
import ProductCardSkeleton from '@/components/ui/ProductCardSkeleton'

const _sb = createClient()

const PRODUCTS_PER_PAGE = 12

const StarIcon = ({ filled = true }: { filled?: boolean }) => (
  <svg className={`w-4 h-4 ${filled ? 'text-yellow-400' : 'text-neutral-200'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
)

const SmallStar = ({ filled = true }: { filled?: boolean }) => (
  <svg className={`w-3 md:w-3.5 h-3 md:h-3.5 ${filled ? 'text-yellow-400' : 'text-neutral-200'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
)

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

const primaryImage = (images: any[]) => images?.find((img: any) => img.is_primary)?.url || images?.[0]?.url

function ProductsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const searchQuery = searchParams.get('q') || ''
  const categoryParam = searchParams.get('category') || ''

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('popular')
  const [filterOpen, setFilterOpen] = useState(false)
  const [priceRange, setPriceRange] = useState(5000)
  const [currentPage, setCurrentPage] = useState(1)

  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam)

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await _sb
        .from('categories')
        .select('*')
        .order('name')
      if (data) setCategories(data)
    }
    fetchCategories()
  }, [])

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setLoading(true)

    const from = (currentPage - 1) * PRODUCTS_PER_PAGE
    const to = from + PRODUCTS_PER_PAGE - 1

    let query = _sb
      .from('products')
      .select('*, category:categories(*), product_images(*)', { count: 'exact' })

    // Search filter
    if (searchQuery) {
      query = query.ilike('name', `%${searchQuery}%`)
    }

    // Category filter
    if (selectedCategory) {
      query = query.eq('category_id', selectedCategory)
    }

    // Sorting
    switch (sortBy) {
      case 'newest':
        query = query.order('created_at', { ascending: false })
        break
      case 'price_asc':
        query = query.order('price', { ascending: true })
        break
      case 'price_desc':
        query = query.order('price', { ascending: false })
        break
      case 'rating':
        query = query.order('rating', { ascending: false })
        break
      case 'popular':
      default:
        query = query.order('review_count', { ascending: false })
        break
    }

    query = query.range(from, to)

    const { data, count } = await query

    setProducts(data || [])
    setTotalCount(count || 0)
    setLoading(false)
  }, [searchQuery, selectedCategory, sortBy, currentPage])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory, sortBy])

  // Sync category param
  useEffect(() => {
    setSelectedCategory(categoryParam)
  }, [categoryParam])

  const totalPages = Math.ceil(totalCount / PRODUCTS_PER_PAGE)

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategory(prev => prev === categoryId ? '' : categoryId)
  }

  // Count products per category (from total, not filtered)
  const getCategoryProductCount = (categoryId: string) => {
    // We show category counts from the categories list if available
    return categories.find(c => c.id === categoryId)?.product_count ?? ''
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push('...')
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      for (let i = start; i <= end; i++) pages.push(i)
      if (currentPage < totalPages - 2) pages.push('...')
      pages.push(totalPages)
    }
    return pages
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Kategori */}
      <div className="bg-white rounded-xl border border-neutral-100 p-5">
        <h3 className="text-sm font-semibold text-neutral-900 mb-4">Kategoriler</h3>
        <div className="space-y-3">
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCategory === cat.id}
                onChange={() => handleCategoryToggle(cat.id)}
                className="w-4 h-4 rounded border-neutral-300 text-primary-500 focus:ring-primary-500 focus:ring-offset-0 transition-colors"
              />
              <span className="text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">{cat.name}</span>
              <span className="ml-auto text-xs text-neutral-300 bg-neutral-50 px-1.5 py-0.5 rounded-full">{getCategoryProductCount(cat.id)}</span>
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
              <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">
                {searchQuery ? `"${searchQuery}" icin sonuclar` : 'Tum Urunler'}
              </h1>
              <p className="mt-1 text-neutral-400 text-sm">
                {searchQuery ? 'Arama sonuclarinizda' : 'EN genis urun yelpazemizde'} toplam <span className="font-semibold text-neutral-600">{totalCount}</span> urun listeleniyor
              </p>
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
                  <h2 className="text-lg font-bold text-neutral-900">Filtrele</h2>
                  <button onClick={() => setFilterOpen(false)} className="p-2 text-neutral-400 hover:text-neutral-600 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-5">
                  <FilterContent />
                </div>
                <div className="p-5 border-t border-neutral-100">
                  <button onClick={() => setFilterOpen(false)} className="w-full py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors min-h-[44px]">EN Iyi Sonuclari Goster</button>
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
                    <option value="popular">EN Populer</option>
                    <option value="newest">EN Yeniler</option>
                    <option value="price_asc">Fiyat: EN Dusuk</option>
                    <option value="price_desc">Fiyat: EN Yuksek</option>
                    <option value="rating">EN Yuksek Puan</option>
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
              {loading ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                  <ProductCardSkeleton count={6} />
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-20">
                  <svg className="w-16 h-16 text-neutral-200 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
                  <h3 className="text-lg font-semibold text-neutral-700 mb-1">Urun bulunamadi</h3>
                  <p className="text-sm text-neutral-400">Farkli filtreler veya arama terimleri deneyebilirsiniz.</p>
                </div>
              ) : (
                <div className={viewMode === 'grid' ? 'grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6' : 'space-y-4'}>
                  {products.map((product) => {
                    const imgUrl = primaryImage(product.product_images)
                    const discountPercent = product.compare_at_price
                      ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
                      : null

                    return (
                      <Link key={product.id} href={`/product/${product.slug}`} className={`group bg-white rounded-xl md:rounded-2xl border border-neutral-100 overflow-hidden card-hover block ${viewMode === 'list' ? 'flex gap-4' : ''}`}>
                        <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-40 h-40 flex-shrink-0' : ''}`}>
                          {imgUrl ? (
                            <img
                              src={imgUrl}
                              alt={product.name}
                              className={`${viewMode === 'list' ? 'w-full h-full' : 'w-full h-40 sm:h-56'} object-cover group-hover:scale-105 transition-transform duration-500`}
                            />
                          ) : (
                            <div className={`${viewMode === 'list' ? 'w-full h-full' : 'w-full h-40 sm:h-56'} bg-gradient-to-br from-primary-50 via-primary-100 to-primary-50 flex items-center justify-center`}>
                              <svg className="w-16 sm:w-24 h-16 sm:h-24 text-primary-200 group-hover:scale-110 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.5"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/><circle cx="12" cy="12" r="3"/></svg>
                            </div>
                          )}
                          {discountPercent && (
                            <span className="absolute top-2 md:top-3 left-2 md:left-3 px-2 py-0.5 md:px-2.5 md:py-1 bg-error-base text-white text-[10px] md:text-xs font-semibold rounded-lg">%{discountPercent}</span>
                          )}
                          <FavoriteButton
                            productId={product.id}
                            className="absolute top-2 md:top-3 right-2 md:right-3 w-7 h-7 md:w-8 md:h-8 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white cursor-pointer"
                          />
                        </div>
                        <div className="p-3 md:p-4 flex-1">
                          <p className="text-[10px] md:text-xs text-neutral-400 mb-1">{product.category?.name}</p>
                          <h3 className="text-xs md:text-sm font-semibold text-neutral-800 mb-1 md:mb-2 line-clamp-2">{product.name}</h3>
                          <div className="flex items-center gap-1 mb-2 md:mb-3">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => <SmallStar key={i} filled={i < (product.rating || 0)} />)}
                            </div>
                            <span className="text-[10px] md:text-xs text-neutral-400">({product.review_count || 0})</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 md:gap-2">
                              <span className="text-base md:text-lg font-bold text-primary-600">&#8378;{product.price}</span>
                              {product.compare_at_price && <span className="text-xs md:text-sm text-neutral-300 line-through">&#8378;{product.compare_at_price}</span>}
                            </div>
                            <AddToCartButton
                              productId={product.id}
                              className="p-2 bg-primary-50 hover:bg-primary-100 text-primary-600 rounded-xl transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
                            </AddToCartButton>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-400 hover:bg-neutral-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/></svg>
                  </button>
                  {getPageNumbers().map((page, idx) =>
                    page === '...' ? (
                      <span key={`dots-${idx}`} className="px-2 text-neutral-400">...</span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page as number)}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                          currentPage === page
                            ? 'bg-primary-500 text-white'
                            : 'border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-400 hover:bg-neutral-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            <ProductCardSkeleton count={6} />
          </div>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}
