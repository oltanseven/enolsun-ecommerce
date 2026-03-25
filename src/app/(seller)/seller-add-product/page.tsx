"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { showToast } from "@/components/ui/Toast"

const _sb = createClient()

interface Category {
  id: string
  name: string
  slug: string
}

function generateSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
}

export default function SellerAddProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [storeId, setStoreId] = useState<string | null>(null)
  const [categories, setCategories] = useState<Category[]>([])

  const [productName, setProductName] = useState("")
  const [slug, setSlug] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [discountPrice, setDiscountPrice] = useState("")
  const [sku, setSku] = useState("")
  const [stock, setStock] = useState("")
  const [barcode, setBarcode] = useState("")
  const [weight, setWeight] = useState("")
  const [seoTitle, setSeoTitle] = useState("")
  const [seoDesc, setSeoDesc] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [variants, setVariants] = useState([{ name: "", values: "" }])

  function addVariant() { setVariants([...variants, { name: "", values: "" }]) }
  function removeVariant(i: number) { setVariants(variants.filter((_, idx) => idx !== i)) }

  useEffect(() => {
    document.title = "Yeni Urun Ekle | enolsun.com Satici Merkezi"
    loadData()
  }, [])

  async function loadData() {
    const { data: { user } } = await _sb.auth.getUser()
    if (!user) { setLoading(false); return }

    const [storeRes, catRes] = await Promise.all([
      _sb.from("stores").select("id").eq("owner_id", user.id).maybeSingle(),
      _sb.from("categories").select("id, name, slug").order("name"),
    ])

    if (storeRes.data) {
      setStoreId(storeRes.data.id)
    }
    if (catRes.data) {
      setCategories(catRes.data)
    }
    setLoading(false)
  }

  async function handleSubmit(asDraft: boolean) {
    if (!storeId) {
      showToast("Magaza bulunamadi. Lutfen tekrar giris yapin.", "error")
      return
    }
    if (!productName.trim()) {
      showToast("Urun adi zorunludur.", "error")
      return
    }
    if (!categoryId) {
      showToast("Kategori seciniz.", "error")
      return
    }
    if (!price || isNaN(parseFloat(price.replace(",", ".")))) {
      showToast("Gecerli bir fiyat giriniz.", "error")
      return
    }
    if (!stock || isNaN(parseInt(stock))) {
      showToast("Gecerli bir stok adedi giriniz.", "error")
      return
    }

    setSubmitting(true)

    const priceNum = parseFloat(price.replace(",", "."))
    const discountNum = discountPrice ? parseFloat(discountPrice.replace(",", ".")) : null
    const stockNum = parseInt(stock)

    const { data: product, error } = await _sb
      .from("products")
      .insert({
        store_id: storeId,
        name: productName.trim(),
        slug: slug || generateSlug(productName),
        category_id: categoryId,
        description: description.trim() || null,
        price: priceNum,
        discount_price: discountNum,
        stock: stockNum,
        is_active: !asDraft,
      })
      .select("id")
      .single()

    if (error || !product) {
      showToast("Urun eklenemedi: " + error.message, "error")
      setSubmitting(false)
      return
    }

    // Insert image if provided
    if (product && imageUrl.trim()) {
      await _sb
        .from("product_images")
        .insert({
          product_id: product.id,
          url: imageUrl.trim(),
          is_primary: true,
          sort_order: 0,
        })
    }

    showToast(asDraft ? "Urun taslak olarak kaydedildi." : "Urun basariyla yayinlandi!", "success")
    setTimeout(() => { router.push("/seller-products") }, 800)
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 bg-neutral-100 rounded-lg" />
          <div className="h-7 bg-neutral-100 rounded w-48" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-xl border border-neutral-100 shadow-align-xs p-6">
                <div className="h-5 bg-neutral-100 rounded w-48 mb-4" />
                <div className="space-y-4">
                  {[1, 2].map(j => (
                    <div key={j}>
                      <div className="h-4 bg-neutral-100 rounded w-24 mb-1.5" />
                      <div className="h-12 bg-neutral-100 rounded-xl" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-neutral-100 shadow-align-xs p-5 h-24" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/seller-products" className="p-2 rounded-lg hover:bg-neutral-100 transition-colors text-neutral-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          </Link>
          <h1 className="text-2xl font-bold text-neutral-800">Yeni Urun Ekle</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-24">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Temel Bilgiler */}
          <div className="bg-white rounded-xl border border-neutral-100 shadow-align-xs p-6">
            <h2 className="text-base font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center text-xs font-bold text-primary-600">1</span>
              Temel Bilgiler -- EN Detayli Urun Sayfasi, EN Cok Satan Urun Olsun!
            </h2>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-neutral-700">Urun Adi <span className="text-error-base">*</span></label>
                <input type="text" value={productName} onChange={(e) => { setProductName(e.target.value); setSlug(generateSlug(e.target.value)) }} placeholder="Urun adini girin" className="block w-full rounded-xl border border-neutral-200 bg-white py-3 px-4 min-h-[48px] text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300" />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-neutral-700">URL Slug</label>
                <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className="block w-full rounded-xl border border-neutral-200 bg-neutral-50 py-3 px-4 min-h-[48px] text-sm text-neutral-600 shadow-sm" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-neutral-700">Kategori <span className="text-error-base">*</span></label>
                  <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="block w-full rounded-xl border border-neutral-200 bg-white py-3 px-4 min-h-[48px] text-sm text-neutral-800 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300 appearance-none">
                    <option value="" disabled>Kategori secin</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-neutral-700">SKU</label>
                  <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} placeholder="Urun kodu" className="block w-full rounded-xl border border-neutral-200 bg-white py-3 px-4 min-h-[48px] text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-neutral-700">Urun Aciklamasi <span className="text-error-base">*</span></label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={6} placeholder="Urun hakkinda detayli aciklama yazin..." className="block w-full rounded-xl border border-neutral-200 bg-white py-3 px-4 text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300 resize-none"></textarea>
              </div>
            </div>
          </div>

          {/* Section 2: Gorsel URL */}
          <div className="bg-white rounded-xl border border-neutral-100 shadow-align-xs p-6">
            <h2 className="text-base font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center text-xs font-bold text-primary-600">2</span>
              Urun Gorseli
            </h2>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-neutral-700">Gorsel URL</label>
                <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://ornek.com/gorsel.jpg" className="block w-full rounded-xl border border-neutral-200 bg-white py-3 px-4 min-h-[48px] text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300" />
                <p className="text-xs text-neutral-400">Urun gorseli icin bir URL girin</p>
              </div>
              {imageUrl && (
                <div className="w-32 h-32 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                  <img src={imageUrl} alt="Onizleme" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }} />
                </div>
              )}
            </div>
          </div>

          {/* Section 3: Fiyatlandirma */}
          <div className="bg-white rounded-xl border border-neutral-100 shadow-align-xs p-6">
            <h2 className="text-base font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center text-xs font-bold text-primary-600">3</span>
              Fiyatlandirma
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-neutral-700">Satis Fiyati <span className="text-error-base">*</span></label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-neutral-400">&#8378;</span>
                  <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0,00" className="block w-full rounded-xl border border-neutral-200 bg-white py-3 pl-8 pr-4 min-h-[48px] text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-neutral-700">Indirimli Fiyat</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-neutral-400">&#8378;</span>
                  <input type="text" value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} placeholder="0,00" className="block w-full rounded-xl border border-neutral-200 bg-white py-3 pl-8 pr-4 min-h-[48px] text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Stok & Kargo */}
          <div className="bg-white rounded-xl border border-neutral-100 shadow-align-xs p-6">
            <h2 className="text-base font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center text-xs font-bold text-primary-600">4</span>
              Stok &amp; Kargo
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-neutral-700">Stok Adedi <span className="text-error-base">*</span></label>
                <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="0" className="block w-full rounded-xl border border-neutral-200 bg-white py-3 px-4 min-h-[48px] text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300" />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-neutral-700">Barkod</label>
                <input type="text" value={barcode} onChange={(e) => setBarcode(e.target.value)} placeholder="EAN/UPC" className="block w-full rounded-xl border border-neutral-200 bg-white py-3 px-4 min-h-[48px] text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300" />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-neutral-700">Agirlik (kg)</label>
                <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="0.00" className="block w-full rounded-xl border border-neutral-200 bg-white py-3 px-4 min-h-[48px] text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300" />
              </div>
            </div>
          </div>

          {/* Section 5: Varyantlar */}
          <div className="bg-white rounded-xl border border-neutral-100 shadow-align-xs p-6">
            <h2 className="text-base font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center text-xs font-bold text-primary-600">5</span>
              Varyantlar
            </h2>
            <div className="space-y-3">
              {variants.map((v, i) => (
                <div key={i} className="flex items-center gap-3">
                  <input type="text" value={v.name} onChange={(e) => { const nv = [...variants]; nv[i].name = e.target.value; setVariants(nv) }} placeholder="Ozellik (orn: Renk)" className="flex-1 rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300" />
                  <input type="text" value={v.values} onChange={(e) => { const nv = [...variants]; nv[i].values = e.target.value; setVariants(nv) }} placeholder="Degerler (orn: Kirmizi, Mavi)" className="flex-1 rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300" />
                  {variants.length > 1 && (
                    <button onClick={() => removeVariant(i)} className="p-2 rounded-lg hover:bg-red-50 text-neutral-400 hover:text-red-500 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  )}
                </div>
              ))}
              <button onClick={addVariant} className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
                Varyant Ekle
              </button>
            </div>
          </div>

          {/* Section 6: SEO */}
          <div className="bg-white rounded-xl border border-neutral-100 shadow-align-xs p-6">
            <h2 className="text-base font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center text-xs font-bold text-primary-600">6</span>
              SEO Ayarlari
            </h2>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-neutral-700">SEO Basligi</label>
                <input type="text" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} placeholder="Arama motorlarinda gorunecek baslik" className="block w-full rounded-xl border border-neutral-200 bg-white py-3 px-4 min-h-[48px] text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300" />
                <p className="text-xs text-neutral-300">{(seoTitle || productName).length}/60 karakter</p>
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-neutral-700">SEO Aciklamasi</label>
                <textarea value={seoDesc} onChange={(e) => setSeoDesc(e.target.value)} rows={3} placeholder="Arama motorlarinda gorunecek aciklama" className="block w-full rounded-xl border border-neutral-200 bg-white py-3 px-4 text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300 resize-none"></textarea>
                <p className="text-xs text-neutral-300">{seoDesc.length}/160 karakter</p>
              </div>
              {/* SEO Preview */}
              <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-100">
                <p className="text-xs text-neutral-400 mb-2">Arama Motoru Onizleme</p>
                <p className="text-blue-700 text-base font-medium truncate">{seoTitle || productName || "Urun Adi"}</p>
                <p className="text-green-700 text-xs mt-0.5">enolsun.com/urun/{slug || "urun-adi"}</p>
                <p className="text-sm text-neutral-600 mt-1 line-clamp-2">{seoDesc || description || "Urun aciklamasi burada gorunecek..."}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Quick Info */}
          <div className="bg-primary-25 border border-primary-100 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-primary-800 mb-2">Hizli Bilgi</h3>
            <ul className="space-y-2 text-xs text-primary-700">
              <li className="flex items-start gap-2">
                <svg className="w-3.5 h-3.5 text-primary-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Gorsel URL ekleyin
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-3.5 h-3.5 text-primary-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Detayli aciklama satislari artirir
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-3.5 h-3.5 text-primary-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                SEO ayarlarini doldurun
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-white border-t border-neutral-100 px-4 lg:px-8 py-3 z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/seller-products" className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors">Iptal</Link>
          <div className="flex items-center gap-3">
            <button onClick={() => handleSubmit(true)} disabled={submitting} className="px-5 py-2.5 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors disabled:opacity-50">
              {submitting ? "Kaydediliyor..." : "Taslak Kaydet"}
            </button>
            <button onClick={() => handleSubmit(false)} disabled={submitting} className="px-5 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-semibold hover:bg-primary-600 shadow-md shadow-primary-500/20 transition-all disabled:opacity-50">
              {submitting ? "Yayinlaniyor..." : "Urunu Yayinla"}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
