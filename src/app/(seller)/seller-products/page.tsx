"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { showToast } from "@/components/ui/Toast"

const _sb = createClient()

interface Product {
  id: string
  name: string
  slug: string
  price: number
  discount_price: number | null
  stock: number
  rating: number | null
  review_count: number
  is_active: boolean
  category?: { name: string } | null
  product_images: { url: string; is_primary: boolean }[]
}

function formatPrice(price: number) {
  return price.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function primaryImage(images: { url: string; is_primary: boolean }[]) {
  return images?.find(img => img.is_primary)?.url || images?.[0]?.url || null
}

export default function SellerProductsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [storeId, setStoreId] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    document.title = "Ürünlerim | enolsun.com Satıcı Merkezi"
    fetchProducts()
  }, [])

  async function fetchProducts() {
    const { data: { user } } = await _sb.auth.getUser()
    if (!user) { setLoading(false); return }

    const { data: store } = await _sb
      .from("stores")
      .select("id")
      .eq("owner_id", user.id)
      .maybeSingle()

    if (!store) { setLoading(false); return }
    setStoreId(store.id)

    const { data } = await _sb
      .from("products")
      .select("id, name, slug, price, discount_price, stock, rating, review_count, is_active, category:categories(name), product_images(url, is_primary)")
      .eq("store_id", store.id)
      .order("created_at", { ascending: false })

    setProducts(((data ?? []) as any[]).map((p: any) => ({
      ...p,
      category: Array.isArray(p.category) ? p.category[0] ?? null : p.category ?? null,
    })) as Product[])
    setLoading(false)
  }

  async function toggleActive(productId: string, currentActive: boolean) {
    setTogglingId(productId)
    const { error } = await _sb
      .from("products")
      .update({ is_active: !currentActive })
      .eq("id", productId)

    if (error) {
      showToast("Durum güncellenemedi.", "error")
    } else {
      showToast(!currentActive ? "Ürün aktifleştirildi." : "Ürün pasife alındı.", "success")
      setProducts(prev => prev.map(p => p.id === productId ? { ...p, is_active: !currentActive } : p))
    }
    setTogglingId(null)
  }

  async function deleteProduct(productId: string) {
    if (!confirm("Bu ürünü silmek istediğinizden emin misiniz?")) return

    setDeletingId(productId)
    const { error } = await _sb
      .from("products")
      .delete()
      .eq("id", productId)

    if (error) {
      showToast("Ürün silinemedi. Lütfen tekrar deneyin.", "error")
    } else {
      showToast("Ürün başarıyla silindi.", "success")
      setProducts(prev => prev.filter(p => p.id !== productId))
    }
    setDeletingId(null)
  }

  const tabs = [
    { key: "all", label: "Tüm Ürünler", count: products.length },
    { key: "active", label: "Aktif", count: products.filter(p => p.is_active && p.stock > 0).length },
    { key: "inactive", label: "Pasif", count: products.filter(p => !p.is_active).length },
    { key: "outofstock", label: "Tükenmiş", count: products.filter(p => p.stock === 0).length },
  ]

  const filtered = (() => {
    switch (activeTab) {
      case "active": return products.filter(p => p.is_active && p.stock > 0)
      case "inactive": return products.filter(p => !p.is_active)
      case "outofstock": return products.filter(p => p.stock === 0)
      default: return products
    }
  })()

  function getStatusInfo(p: Product) {
    if (!p.is_active) return { label: "Pasif", statusClass: "bg-neutral-100 text-neutral-600" }
    if (p.stock === 0) return { label: "Tükendi", statusClass: "bg-error-light text-error-dark" }
    if (p.stock <= 5) return { label: "Aktif", statusClass: "bg-warning-light text-warning-dark" }
    return { label: "Aktif", statusClass: "bg-success-light text-success-dark" }
  }

  if (loading) {
    return (
      <>
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="h-7 bg-neutral-100 rounded w-72" />
            <div className="h-6 w-12 bg-neutral-100 rounded-full" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-9 w-20 bg-neutral-100 rounded-lg" />
            <div className="h-10 w-36 bg-neutral-100 rounded-xl" />
          </div>
        </div>

        {/* Tab Skeleton */}
        <div className="flex flex-wrap gap-2 mb-6 animate-pulse">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-9 w-28 bg-neutral-100 rounded-full" />
          ))}
        </div>

        {/* Table Skeleton */}
        <div className="bg-white rounded-xl border border-neutral-100 shadow-align-xs overflow-hidden mb-6 animate-pulse">
          <div className="p-4 space-y-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 bg-neutral-100 rounded-xl" />
                <div className="h-4 bg-neutral-100 rounded w-40 flex-1" />
                <div className="h-4 bg-neutral-100 rounded w-20" />
                <div className="h-4 bg-neutral-100 rounded w-16" />
                <div className="h-4 bg-neutral-100 rounded w-12" />
                <div className="h-6 bg-neutral-100 rounded-full w-16" />
                <div className="h-4 bg-neutral-100 rounded w-10" />
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-neutral-800">EN Çok Satan Ürünlerinizi Yönetin</h1>
          <span className="bg-primary-100 text-primary-700 text-sm font-semibold px-2.5 py-0.5 rounded-full">{products.length}</span>
        </div>
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex bg-neutral-100 rounded-lg p-1">
            <button onClick={() => setViewMode("table")} className={`p-1.5 rounded-md transition-colors ${viewMode === "table" ? "bg-white shadow-sm text-primary-600" : "text-neutral-400 hover:text-neutral-600"}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
            </button>
            <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-white shadow-sm text-primary-600" : "text-neutral-400 hover:text-neutral-600"}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            </button>
          </div>
          <Link href="/seller-add-product" className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-semibold hover:bg-primary-600 shadow-md shadow-primary-500/20 transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
            Yeni Ürün Ekle
          </Link>
        </div>
      </div>

      {/* Tab Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`seller-tab px-4 py-2 rounded-full text-sm font-medium ${activeTab === tab.key ? "active" : "bg-neutral-100 text-neutral-600"}`}>
            {tab.label} <span className="ml-1 opacity-70">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="bg-white rounded-xl border border-neutral-100 shadow-align-xs p-12 text-center mb-6">
          <svg className="w-12 h-12 text-neutral-200 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
          <p className="text-neutral-500 text-sm mb-3">Bu kategoride ürün bulunmuyor.</p>
          <Link href="/seller-add-product" className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-xl text-sm font-semibold hover:bg-primary-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
            Ürün Ekle
          </Link>
        </div>
      )}

      {/* Table View */}
      {filtered.length > 0 && viewMode === "table" ? (
        <div className="bg-white rounded-xl border border-neutral-100 shadow-align-xs overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-25 border-b border-neutral-100">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Ürün</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Kategori</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Fiyat</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Stok</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Durum</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Puan</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {filtered.map(p => {
                  const si = getStatusInfo(p)
                  const imgUrl = primaryImage(p.product_images)
                  return (
                    <tr key={p.id} className={`hover:bg-neutral-25 transition-colors ${deletingId === p.id ? "opacity-50" : ""}`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {imgUrl ? (
                              <img src={imgUrl} alt={p.name} className="w-full h-full object-cover" />
                            ) : (
                              <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                            )}
                          </div>
                          <span className="text-sm font-medium text-neutral-900">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-600">{p.category?.name ?? "—"}</td>
                      <td className="px-4 py-3">
                        <div>
                          {p.discount_price ? (
                            <>
                              <span className="text-sm font-semibold text-neutral-800">&#8378;{formatPrice(p.discount_price)}</span>
                              <span className="text-xs text-neutral-400 line-through ml-1">&#8378;{formatPrice(p.price)}</span>
                            </>
                          ) : (
                            <span className="text-sm font-semibold text-neutral-800">&#8378;{formatPrice(p.price)}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-sm font-medium ${p.stock <= 5 ? (p.stock === 0 ? "text-error-base" : "text-warning-dark") : "text-neutral-800"}`}>{p.stock}</span>
                        {p.stock > 0 && p.stock <= 5 && <span className="ml-1 text-xs text-warning-dark">Düşük!</span>}
                      </td>
                      <td className="px-4 py-3"><span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${si.statusClass}`}>{si.label}</span></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                          <span className="text-sm text-neutral-700">{p.rating ?? "—"}</span>
                          <span className="text-xs text-neutral-400">({p.review_count})</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          {/* Toggle active/inactive */}
                          <button
                            onClick={() => toggleActive(p.id, p.is_active)}
                            disabled={togglingId === p.id}
                            className={`p-1.5 rounded-lg transition-colors ${p.is_active ? "hover:bg-yellow-50 text-yellow-600" : "hover:bg-green-50 text-green-600"}`}
                            title={p.is_active ? "Pasife Al" : "Aktifleştir"}
                          >
                            {togglingId === p.id ? (
                              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg>
                            ) : p.is_active ? (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            )}
                          </button>
                          {/* Edit */}
                          <Link href={`/seller-add-product?edit=${p.id}`} className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors text-neutral-500" title="Düzenle">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                          </Link>
                          {/* Delete */}
                          <button
                            onClick={() => deleteProduct(p.id)}
                            disabled={deletingId === p.id}
                            className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-neutral-500 hover:text-red-500"
                            title="Sil"
                          >
                            {deletingId === p.id ? (
                              <svg className="w-4 h-4 animate-spin text-red-400" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : filtered.length > 0 ? (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {filtered.map(p => {
            const si = getStatusInfo(p)
            const imgUrl = primaryImage(p.product_images)
            return (
              <div key={p.id} className={`bg-white rounded-xl border border-neutral-100 shadow-align-xs overflow-hidden hover:shadow-align-md transition-shadow ${deletingId === p.id ? "opacity-50" : ""}`}>
                <div className="h-40 bg-primary-50 flex items-center justify-center overflow-hidden relative">
                  {imgUrl ? (
                    <img src={imgUrl} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-12 h-12 text-primary-200" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  )}
                  {/* Toggle + Delete on grid */}
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={() => toggleActive(p.id, p.is_active)}
                      disabled={togglingId === p.id}
                      className={`p-1.5 rounded-lg bg-white/90 shadow-sm transition-colors ${p.is_active ? "text-yellow-600 hover:bg-yellow-50" : "text-green-600 hover:bg-green-50"}`}
                      title={p.is_active ? "Pasife Al" : "Aktifleştir"}
                    >
                      {p.is_active ? (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>
                      ) : (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      )}
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      disabled={deletingId === p.id}
                      className="p-1.5 rounded-lg bg-white/90 shadow-sm text-red-500 hover:bg-red-50 transition-colors"
                      title="Sil"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${si.statusClass}`}>{si.label}</span>
                    <div className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      <span className="text-xs text-neutral-600">{p.rating ?? "—"}</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-neutral-900 mb-1">{p.name}</h3>
                  <p className="text-xs text-neutral-500 mb-3">{p.category?.name ?? "—"}</p>
                  <div className="flex items-center justify-between">
                    {p.discount_price ? (
                      <div>
                        <span className="text-base font-bold text-neutral-900">&#8378;{formatPrice(p.discount_price)}</span>
                        <span className="text-xs text-neutral-400 line-through ml-1">&#8378;{formatPrice(p.price)}</span>
                      </div>
                    ) : (
                      <span className="text-base font-bold text-neutral-900">&#8378;{formatPrice(p.price)}</span>
                    )}
                    <span className={`text-xs font-medium ${p.stock <= 5 ? "text-warning-dark" : "text-neutral-500"}`}>Stok: {p.stock}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : null}
    </>
  )
}
