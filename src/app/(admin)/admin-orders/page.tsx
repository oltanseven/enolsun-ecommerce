"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

interface Order {
  id: string
  created_at: string
  status: string
  total: number
  buyer_name: string
  store_name: string
}

const statusMap: Record<string, { label: string; cls: string }> = {
  pending: { label: "Beklemede", cls: "bg-yellow-50 text-yellow-700" },
  preparing: { label: "Hazırlanıyor", cls: "bg-orange-50 text-orange-700" },
  shipped: { label: "Kargoda", cls: "bg-blue-50 text-blue-700" },
  delivered: { label: "Teslim Edildi", cls: "bg-success-light text-success-dark" },
  cancelled: { label: "İptal", cls: "bg-error-light text-error-dark" },
}

function formatPrice(n: number) {
  return n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" })
}

export default function AdminOrdersPage() {
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])
  const [tab, setTab] = useState<string>("all")

  useEffect(() => {
    async function loadOrders() {
      const _sb = createClient()
      const { data } = await _sb
        .from("orders")
        .select("id, created_at, status, total, buyer_name, store_id")
        .order("created_at", { ascending: false })

      if (data) {
        const storeIds = [...new Set(data.map(o => o.store_id).filter(Boolean))]
        let storeMap: Record<string, string> = {}
        if (storeIds.length > 0) {
          const { data: stores } = await _sb.from("stores").select("slug, name").in("slug", storeIds)
          if (stores) stores.forEach(s => { storeMap[s.slug] = s.name })
        }
        setOrders(data.map(o => ({
          id: o.id,
          created_at: o.created_at,
          status: o.status,
          total: o.total,
          buyer_name: o.buyer_name || "Misafir",
          store_name: storeMap[o.store_id] || o.store_id || "-",
        })))
      }
      setLoading(false)
    }
    loadOrders()
  }, [])

  const filtered = tab === "all" ? orders : orders.filter(o => o.status === tab)

  const tabs = [
    { key: "all", label: "Tümü", count: orders.length },
    { key: "pending", label: "Beklemede", count: orders.filter(o => o.status === "pending").length },
    { key: "preparing", label: "Hazırlanıyor", count: orders.filter(o => o.status === "preparing").length },
    { key: "shipped", label: "Kargoda", count: orders.filter(o => o.status === "shipped").length },
    { key: "delivered", label: "Teslim Edildi", count: orders.filter(o => o.status === "delivered").length },
    { key: "cancelled", label: "İptal", count: orders.filter(o => o.status === "cancelled").length },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-neutral-200 rounded-lg animate-pulse"></div>
        <div className="flex gap-2">
          {[...Array(6)].map((_, i) => <div key={i} className="h-9 w-24 bg-neutral-100 rounded-lg animate-pulse"></div>)}
        </div>
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
        <h1 className="text-2xl font-bold text-neutral-900">Siparişler</h1>
        <p className="text-sm text-neutral-500 mt-1">Platform üzerindeki tüm siparişler</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t.key ? "bg-primary-500 text-white" : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50"}`}
          >
            {t.label} <span className={`ml-1 ${tab === t.key ? "text-primary-100" : "text-neutral-400"}`}>({t.count})</span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-neutral-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-100">
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">Sipariş</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">Müşteri</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">Mağaza</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">Tutar</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">Durum</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">Tarih</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="text-center text-sm text-neutral-400 py-8">Sipariş bulunamadı</td></tr>
              ) : (
                filtered.map(order => {
                  const st = statusMap[order.status] || { label: order.status, cls: "bg-neutral-100 text-neutral-600" }
                  return (
                    <tr key={order.id} className="border-b border-neutral-50 hover:bg-neutral-50/50 transition-colors">
                      <td className="px-5 py-3 text-sm font-medium text-neutral-900">#{order.id.slice(0, 8)}</td>
                      <td className="px-5 py-3 text-sm text-neutral-600">{order.buyer_name}</td>
                      <td className="px-5 py-3 text-sm text-neutral-600">{order.store_name}</td>
                      <td className="px-5 py-3 text-sm font-medium text-neutral-900">₺{formatPrice(order.total)}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${st.cls}`}>{st.label}</span>
                      </td>
                      <td className="px-5 py-3 text-sm text-neutral-500">{formatDate(order.created_at)}</td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
