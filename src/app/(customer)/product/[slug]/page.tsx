'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Product, ProductImage, ProductVariant } from '@/lib/queries'
import FavoriteButton from '@/components/ui/FavoriteButton'
import AddToCartButton from '@/components/ui/AddToCartButton'

const StarIcon = ({ filled = true, size = 'sm' }: { filled?: boolean; size?: 'sm' | 'md' }) => (
  <svg className={`${size === 'md' ? 'w-5 h-5' : 'w-4 h-4'} ${filled ? 'text-yellow-400' : 'text-neutral-200'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
)
const SmallStar = ({ filled = true }: { filled?: boolean }) => (
  <svg className={`w-3 md:w-3.5 h-3 md:h-3.5 ${filled ? 'text-yellow-400' : 'text-neutral-200'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
)

const fallbackColors = [
  { name: 'Dogal', bg: 'bg-amber-600' },
  { name: 'Koyu Yesil', bg: 'bg-primary-700' },
  { name: 'Beyaz', bg: 'bg-white border-neutral-200' },
  { name: 'Siyah', bg: 'bg-neutral-900' },
]

const fallbackSizes = ['S', 'M', 'L', 'XL']

const fallbackGradients = [
  'from-primary-100 via-primary-50 to-white',
  'from-primary-50 via-primary-100 to-primary-200',
  'from-white via-primary-50 to-primary-100',
  'from-primary-200 via-primary-100 to-primary-50',
]

const reviews = [
  { name: 'Ayse Y.', initials: 'AY', rating: 5, date: '2 hafta once', text: 'EN iyi kalitede bir urun! Tasarimi muhtesem ve eve cok yakisti. Kesinlikle tavsiye ederim.', bgColor: 'bg-primary-100', textColor: 'text-primary-700' },
  { name: 'Mehmet K.', initials: 'MK', rating: 5, date: '1 ay once', text: 'Bekledigimden cok daha guzel cikti. EN ozenli paketleme, EN hizli kargo. Tesekkurler!', bgColor: 'bg-primary-200', textColor: 'text-primary-800' },
  { name: 'Zeynep D.', initials: 'ZD', rating: 4, date: '1 ay once', text: 'Guzel urun, EN dogal malzeme hissiyati. Rengi fotograftan biraz farkli ama yine de cok begendim.', bgColor: 'bg-primary-300', textColor: 'text-white' },
]

const specs = [
  { label: 'Malzeme', value: '%100 Organik Bambu' },
  { label: 'Boyutlar', value: '25cm x 15cm x 15cm' },
  { label: 'Agirlik', value: '850g' },
  { label: 'Renk Secenekleri', value: 'Dogal, Koyu Yesil, Beyaz, Siyah' },
  { label: 'Mensei', value: 'Turkiye' },
  { label: 'Garanti', value: '2 Yil' },
]

const primaryImage = (images: any[]) => images?.find((img: any) => img.is_primary)?.url || images?.[0]?.url

function ProductDetailSkeleton() {
  return (
    <>
      <div className="pt-20 pb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-4 w-64 bg-neutral-100 rounded animate-pulse" />
        </div>
      </div>
      <main id="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mt-6">
            {/* Image skeleton */}
            <div className="space-y-4">
              <div className="w-full aspect-square bg-neutral-100 rounded-2xl md:rounded-3xl animate-pulse" />
              <div className="flex gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-neutral-100 animate-pulse" />
                ))}
              </div>
            </div>
            {/* Info skeleton */}
            <div className="space-y-6">
              <div>
                <div className="h-3 w-20 bg-neutral-100 rounded animate-pulse mb-2" />
                <div className="h-7 w-3/4 bg-neutral-100 rounded animate-pulse mb-3" />
                <div className="h-4 w-48 bg-neutral-100 rounded animate-pulse" />
              </div>
              <div className="h-10 w-40 bg-neutral-100 rounded animate-pulse" />
              <div className="space-y-2">
                <div className="h-3 w-full bg-neutral-100 rounded animate-pulse" />
                <div className="h-3 w-5/6 bg-neutral-100 rounded animate-pulse" />
                <div className="h-3 w-4/6 bg-neutral-100 rounded animate-pulse" />
              </div>
              <div>
                <div className="h-4 w-24 bg-neutral-100 rounded animate-pulse mb-3" />
                <div className="flex gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-neutral-100 animate-pulse" />
                  ))}
                </div>
              </div>
              <div>
                <div className="h-4 w-24 bg-neutral-100 rounded animate-pulse mb-3" />
                <div className="flex gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-12 h-12 rounded-xl bg-neutral-100 animate-pulse" />
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1 h-12 bg-neutral-100 rounded-xl animate-pulse" />
                <div className="w-12 h-12 bg-neutral-100 rounded-xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  const [product, setProduct] = useState<Product | null>(null)
  const [similarProducts, setSimilarProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState(1)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description')

  useEffect(() => {
    if (!slug) return

    const fetchProduct = async () => {
      setLoading(true)
      const _sb = createClient()

      const { data, error } = await _sb
        .from('products')
        .select('*, category:categories(*), product_images(*), product_variants(*)')
        .eq('slug', slug)
        .eq('is_active', true)
        .single()

      if (error || !data) {
        setNotFound(true)
        setLoading(false)
        return
      }

      setProduct(data as Product)

      // Fetch similar products from same category
      if (data.category_id) {
        const { data: similar } = await _sb
          .from('products')
          .select('*, product_images(*)')
          .eq('is_active', true)
          .eq('category_id', data.category_id)
          .neq('id', data.id)
          .limit(4)

        setSimilarProducts((similar || []) as Product[])
      }

      setLoading(false)
    }

    fetchProduct()
  }, [slug])

  if (loading) return <ProductDetailSkeleton />

  if (notFound || !product) {
    return (
      <div className="pt-20 pb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <svg className="w-24 h-24 text-neutral-200 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">Urun bulunamadi</h1>
            <p className="text-neutral-500 mb-6">Aradiginiz urun mevcut degil veya kaldirilmis olabilir.</p>
            <Link href="/products" className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-xl transition-colors">
              Urunlere Don
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const images = product.product_images?.sort((a, b) => a.sort_order - b.sort_order) || []
  const hasImages = images.length > 0

  // Build gallery items: real images or fallback gradients
  const galleryItems = hasImages
    ? images.map((img) => ({ type: 'image' as const, url: img.url, alt: img.alt }))
    : fallbackGradients.map((grad) => ({ type: 'gradient' as const, gradient: grad }))

  // Variants
  const colorVariants = product.product_variants?.filter((v) => v.name.toLowerCase() === 'renk' || v.name.toLowerCase() === 'color') || []
  const sizeVariants = product.product_variants?.filter((v) => v.name.toLowerCase() === 'boyut' || v.name.toLowerCase() === 'beden' || v.name.toLowerCase() === 'size') || []

  const colors = colorVariants.length > 0
    ? colorVariants.map((v) => ({ name: v.value, bg: 'bg-neutral-300', id: v.id }))
    : fallbackColors

  const sizes = sizeVariants.length > 0
    ? sizeVariants.map((v) => ({ name: v.value, id: v.id }))
    : fallbackSizes.map((s) => ({ name: s, id: s }))

  const rating = product.rating ?? 4.9
  const reviewCount = product.review_count ?? 0
  const categoryName = product.category?.name || 'Urunler'
  const displayPrice = product.discount_price ?? product.price
  const hasDiscount = product.discount_price != null && product.discount_price < product.price
  const discountPercent = hasDiscount ? Math.round(((product.price - product.discount_price!) / product.price) * 100) : 0

  return (
    <>
      {/* BREADCRUMBS */}
      <div className="pt-20 pb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Sayfa yolu" className="flex items-center gap-2 text-sm text-neutral-400 overflow-x-auto whitespace-nowrap" style={{ scrollbarWidth: 'none' }}>
            <Link href="/" className="hover:text-primary-500 transition-colors flex-shrink-0">Ana Sayfa</Link>
            <svg aria-hidden="true" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
            <Link href="/products" className="hover:text-primary-500 transition-colors flex-shrink-0">Urunler</Link>
            <svg aria-hidden="true" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
            <span className="text-neutral-700 font-medium flex-shrink-0">{product.name}</span>
          </nav>
        </div>
      </div>

      <main id="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mt-6">
            {/* LEFT: IMAGE GALLERY */}
            <div className="space-y-4">
              {/* Main Image */}
              {galleryItems[selectedImage]?.type === 'image' ? (
                <div className="w-full aspect-square rounded-2xl md:rounded-3xl overflow-hidden bg-neutral-50 relative">
                  <Image
                    src={galleryItems[selectedImage].url!}
                    alt={galleryItems[selectedImage].alt || product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              ) : (
                <div className={`w-full aspect-square bg-gradient-to-br ${(galleryItems[selectedImage] as any)?.gradient || fallbackGradients[0]} rounded-2xl md:rounded-3xl flex items-center justify-center overflow-hidden`}>
                  <svg className="w-32 h-32 md:w-48 md:h-48 text-primary-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.5"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/><circle cx="12" cy="12" r="3"/></svg>
                </div>
              )}
              {/* Thumbnails */}
              <div className="flex gap-3">
                {galleryItems.map((item, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)} className={`w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === i ? 'border-primary-500 ring-2 ring-primary-200' : 'border-transparent hover:border-neutral-200'}`}>
                    {item.type === 'image' ? (
                      <div className="relative w-full h-full">
                        <Image src={item.url!} alt={item.alt || product.name} fill className="object-cover" sizes="80px" />
                      </div>
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${(item as any).gradient} flex items-center justify-center`}>
                        <svg className="w-6 h-6 text-primary-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.5"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z"/></svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT: PRODUCT INFO */}
            <div className="space-y-6">
              {/* Title & Rating */}
              <div>
                <p className="text-sm text-primary-600 font-medium mb-1">{categoryName}</p>
                <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">{product.name}</h1>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <div className="flex">{[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < Math.round(rating)} size="md" />)}</div>
                    <span className="text-sm font-medium text-neutral-700 ml-1">{rating.toFixed(1)}</span>
                  </div>
                  <span className="text-sm text-neutral-400">({reviewCount} degerlendirme)</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl md:text-4xl font-bold text-primary-600">&#8378;{displayPrice.toLocaleString('tr-TR')}</span>
                {hasDiscount && (
                  <>
                    <span className="text-lg text-neutral-300 line-through">&#8378;{product.price.toLocaleString('tr-TR')}</span>
                    <span className="px-2 py-0.5 bg-error-light text-error-dark text-xs font-semibold rounded-lg">%{discountPercent} Indirim</span>
                  </>
                )}
              </div>

              {/* Stock Indicator */}
              <div className="flex items-center gap-2">
                {product.stock === 0 ? (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="text-sm font-medium text-red-600">Tukendi</span>
                  </>
                ) : product.stock <= 10 ? (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                    <span className="text-sm font-medium text-orange-600">Son {product.stock} urun!</span>
                  </>
                ) : (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    <span className="text-sm font-medium text-green-600">Stokta</span>
                  </>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Color Selection */}
              <div>
                <p className="text-sm font-medium text-neutral-700 mb-3">Renk: <span className="text-neutral-500 font-normal">{colors[selectedColor]?.name}</span></p>
                <div className="flex gap-2">
                  {colors.map((c, i) => (
                    <button key={c.name} onClick={() => setSelectedColor(i)} className={`w-10 h-10 rounded-full ${c.bg} border-2 transition-all ${selectedColor === i ? 'ring-2 ring-primary-500 ring-offset-2 border-transparent' : 'border-neutral-200 hover:border-neutral-300'}`} title={c.name} />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <p className="text-sm font-medium text-neutral-700 mb-3">Boyut: <span className="text-neutral-500 font-normal">{sizes[selectedSize]?.name}</span></p>
                <div className="flex gap-2">
                  {sizes.map((s, i) => (
                    <button key={s.name} onClick={() => setSelectedSize(i)} className={`w-12 h-12 rounded-xl text-sm font-medium transition-all ${selectedSize === i ? 'bg-primary-500 text-white shadow-sm' : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:border-primary-300'}`}>{s.name}</button>
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
                {product.stock === 0 ? (
                  <button
                    disabled
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-neutral-300 text-white text-sm font-semibold rounded-xl min-h-[48px] cursor-not-allowed"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/></svg>
                    Tukendi
                  </button>
                ) : (
                  <AddToCartButton
                    productId={product.id}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-primary-500/20 transition-all hover:shadow-lg min-h-[48px] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/></svg>
                    Sepete Ekle
                  </AddToCartButton>
                )}
                <FavoriteButton
                  productId={product.id}
                  size="md"
                  className="w-12 h-12 flex items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-400 hover:border-primary-300 hover:text-primary-500 transition-all min-h-[48px]"
                />
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {[
                  { icon: <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25h.008v.008h-.008v-.008zm0 0L5.25 6.75h13.5l1.875 7.5"/></svg>, text: 'EN Hizli Kargo' },
                  { icon: <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>, text: 'EN Guvenli Odeme' },
                  { icon: <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"/></svg>, text: 'EN Kolay Iade' },
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
                { key: 'description' as const, label: 'Aciklama' },
                { key: 'specs' as const, label: 'Ozellikler' },
                { key: 'reviews' as const, label: 'Degerlendirmeler' },
              ].map((tab) => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === tab.key ? 'bg-white text-neutral-800 shadow-align-xs' : 'text-neutral-400 hover:text-neutral-600'}`}>{tab.label}</button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'description' && (
              <div className="prose prose-sm max-w-none text-neutral-600 leading-relaxed space-y-4">
                {product.description ? (
                  <p>{product.description}</p>
                ) : (
                  <>
                    <p>Organik Bambu Saksi Seti, %100 surdurulebilir bambudan el yapimi olarak uretilmistir. Her set, uc farkli boyutta saksiden olusmaktadir ve evinizin her kosesine EN dogal dokunusu katmak icin tasarlanmistir.</p>
                    <p>Bambu, dogada EN hizli buyen bitkilerden biridir ve hasat edildikten sonra yeniden yetisir. Bu sayede cevre uzerinde EN dusuk etkiyi birakir. Urunlerimiz hicbir kimyasal islem gormeden, dogal haliyle islenerek sizlere sunulmaktadir.</p>
                  </>
                )}
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
                    <div className="text-4xl font-bold text-neutral-900">{rating.toFixed(1)}</div>
                    <div className="flex mt-1">{[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < Math.round(rating)} />)}</div>
                    <p className="text-xs text-neutral-400 mt-1">{reviewCount} degerlendirme</p>
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
          {similarProducts.length > 0 && (
            <section className="mt-12 md:mt-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-neutral-900">Benzer Urunler</h2>
                <Link href="/products" className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">Tumunu Gor</Link>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                {similarProducts.map((sp) => {
                  const spImage = primaryImage(sp.product_images || [])
                  return (
                    <Link key={sp.id} href={`/product/${sp.slug}`} className="group bg-white rounded-xl md:rounded-2xl border border-neutral-100 overflow-hidden card-hover block">
                      <div className="relative overflow-hidden">
                        {spImage ? (
                          <div className="w-full h-40 sm:h-56 relative bg-neutral-50">
                            <Image src={spImage} alt={sp.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 25vw" />
                          </div>
                        ) : (
                          <div className="w-full h-40 sm:h-56 bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 flex items-center justify-center">
                            <svg className="w-16 sm:w-24 h-16 sm:h-24 text-primary-200 group-hover:scale-110 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.5"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/><circle cx="12" cy="12" r="3"/></svg>
                          </div>
                        )}
                        <FavoriteButton productId={sp.id} />
                      </div>
                      <div className="p-3 md:p-4">
                        <p className="text-[10px] md:text-xs text-neutral-400 mb-1">{sp.category?.name || categoryName}</p>
                        <h3 className="text-xs md:text-sm font-semibold text-neutral-800 mb-1 md:mb-2 line-clamp-2">{sp.name}</h3>
                        <div className="flex items-center gap-1 mb-2 md:mb-3">
                          <div className="flex">{[...Array(5)].map((_, i) => <SmallStar key={i} filled={i < Math.round(sp.rating || 0)} />)}</div>
                          <span className="text-[10px] md:text-xs text-neutral-400">({sp.review_count})</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-base md:text-lg font-bold text-primary-600">&#8378;{(sp.discount_price ?? sp.price).toLocaleString('tr-TR')}</span>
                          <button className="p-2 bg-primary-50 hover:bg-primary-100 text-primary-600 rounded-xl transition-colors cursor-pointer" aria-label="Sepete ekle">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
                          </button>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  )
}
