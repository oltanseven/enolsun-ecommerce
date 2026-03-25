"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { showToast } from "@/components/ui/Toast"

interface Product {
  id: string
  name: string
  price: number
  stock: number
  is_active: boolean
  created_at: string
  store_id: string
  store_name: string
}

function formatPrice(n: number) {
  return n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" })
}

export default function AdminProductsPage() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])

  async function loadProducts() {
    const _sb = createClient()
    const { data } = await _sb
      .from("products")
      .select("id, name, price, stock, is_active, created_at, store_id")
      .order("created_at", { ascending: false })

    if (data) {
      // Get store names
      const storeIds = [...new Set(data.map(p => p.store_id).filter(Boolean))]
      let storeMap: Record<string, string> = {}
      if (storeIds.length > 0) {
        const { data: stores } = await _sb.from("stores").select("slug, name").in("slug", storeIds)
        if (stores) {
          stores.forEach(s => { storeMap[s.slug] = s.name })
        }
      }
      setProducts(data.map(p => ({
        ...p,
        store_name: storeMap[p.store_id] || p.store_id || "-",
      })))
    }
    setLoading(false)
  }

  useEffect(() => { loadProducts() }, [])

  async function toggleActive(productId: string, currentActive: boolean) {
    const _sb = createClient()
    const { error } = await _sb
      .from("products")
      .update({ is_active: !currentActive })
      .eq("id", productId)

    if (error) {
      showToast("Ürün durumu güncellenemedi.", "error")
    } else {
      setProducts(prev => prev.map(p => p.id === productId ? { ...p, is_active: !currentActive } : p))
      showToast(currentActive ? "Ürün pasife alındı." : "Ürün aktifleştirildi.", "success")
    }
  }

  async function deleteProduct(productId: string) {
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) return
    const _sb = createClient()
    const { error } = await _sb.from("products").delete().eq("id", productId)

    if (error) {
      showToast("Ürün silinemedi.", "error")
    } else {
      setProducts(prev => prev.filter(p => p.id !== productId))
      showToast("Ürün silindi.", "success")
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-neutral-200 rounded-lg animate-pulse"></div>
        <div className="bg-white rounded-xl border border-neutral-100 p-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-12 bg-neutral-50 rounded-lg animate-pulse mb-2"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Ürünler</h1>
        <p className="text-sm text-neutral-500 mt-1">Platform üzerindeki tüm ürünleri yönetin ({products.length} ürün)</p>
      </div>

      <div className="bg-white rounded-xl border border-neutral-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-100">
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">Ürün</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">Mağaza</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">Fiyat</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">Stok</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">Durum</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">Tarih</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr><td colSpan={7} className="text-center text-sm text-neutral-400 py-8">Ürün bulunamadı</td></tr>
              ) : (
                products.map(product => (
                  <tr key={product.id} className="border-b border-neutral-50 hover:bg-neutral-50/50 transition-colors">
                    <td className="px-5 py-3">
                      <p className="text-sm font-medium text-neutral-900 max-w-[200px] truncate">{product.name}</p>
                    </td>
                    <td className="px-5 py-3 text-sm text-neutral-600">{product.store_name}</td>
                    <td className="px-5 py-3 text-sm font-medium text-neutral-900">₺{formatPrice(product.price)}</td>
                    <td className="px-5 py-3 text-sm text-neutral-600">{product.stock}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${product.is_active ? "bg-success-light text-success-dark" : "bg-neutral-100 text-neutral-500"}`}>
                        {product.is_active ? "Aktif" : "Pasif"}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm text-neutral-500">{formatDate(product.created_at)}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleActive(product.id, product.is_active)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${product.is_active ? "bg-neutral-100 text-neutral-600 hover:bg-neutral-200" : "bg-primary-50 text-primary-600 hover:bg-primary-100"}`}
                        >
                          {product.is_active ? "Pasife Al" : "Aktifleştir"}
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-error-light text-error-dark hover:bg-red-100 transition-colors"
                        >
                          Sil
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
