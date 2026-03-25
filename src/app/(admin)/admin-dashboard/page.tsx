"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

interface RecentOrder {
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

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true)
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalSellers, setTotalSellers] = useState(0)
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])

  useEffect(() => {
    async function loadData() {
      const _sb = createClient()

      // Fetch counts in parallel
      const [usersRes, sellersRes, productsRes, ordersRes] = await Promise.all([
        _sb.from("profiles").select("id", { count: "exact", head: true }),
        _sb.from("profiles").select("id", { count: "exact", head: true }).eq("role", "seller"),
        _sb.from("products").select("id", { count: "exact", head: true }),
        _sb.from("orders").select("id", { count: "exact", head: true }),
      ])

      setTotalUsers(usersRes.count || 0)
      setTotalSellers(sellersRes.count || 0)
      setTotalProducts(productsRes.count || 0)
      setTotalOrders(ordersRes.count || 0)

      // Total revenue
      const { data: revenueData } = await _sb
        .from("orders")
        .select("total")
        .in("status", ["delivered", "shipped", "preparing", "pending"])

      if (revenueData) {
        const sum = revenueData.reduce((acc, o) => acc + (o.total || 0), 0)
        setTotalRevenue(sum)
      }

      // Recent orders
      const { data: orders } = await _sb
        .from("orders")
        .select("id, created_at, status, total, buyer_name, store_id")
        .order("created_at", { ascending: false })
        .limit(10)

      if (orders) {
        // Get store names
        const storeIds = [...new Set(orders.map(o => o.store_id).filter(Boolean))]
        let storeMap: Record<string, string> = {}
        if (storeIds.length > 0) {
          const { data: stores } = await _sb.from("stores").select("slug, name").in("slug", storeIds)
          if (stores) {
            stores.forEach(s => { storeMap[s.slug] = s.name })
          }
        }
        setRecentOrders(orders.map(o => ({
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
    loadData()
  }, [])

  const kpis = [
    { label: "Toplam Kullanıcı", value: totalUsers, icon: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></>, color: "bg-blue-50 text-blue-600" },
    { label: "Satıcılar", value: totalSellers, icon: <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></>, color: "bg-purple-50 text-purple-600" },
    { label: "Toplam Ürün", value: totalProducts, icon: <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>, color: "bg-emerald-50 text-emerald-600" },
    { label: "Toplam Sipariş", value: totalOrders, icon: <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>, color: "bg-amber-50 text-amber-600" },
    { label: "Toplam Gelir", value: `₺${formatPrice(totalRevenue)}`, icon: <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>, color: "bg-primary-50 text-primary-600" },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-neutral-200 rounded-lg animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-neutral-100 p-5">
              <div className="h-10 w-10 bg-neutral-100 rounded-xl animate-pulse mb-3"></div>
              <div className="h-4 w-20 bg-neutral-100 rounded animate-pulse mb-2"></div>
              <div className="h-7 w-16 bg-neutral-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-neutral-100 p-6">
          <div className="h-6 w-40 bg-neutral-200 rounded animate-pulse mb-4"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-neutral-50 rounded-lg animate-pulse mb-2"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Admin Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-1">Platform genel bakış</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-white rounded-xl border border-neutral-100 p-5 hover:shadow-align-sm transition-shadow">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${kpi.color}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">{kpi.icon}</svg>
            </div>
            <p className="text-xs text-neutral-500 mb-1">{kpi.label}</p>
            <p className="text-xl font-bold text-neutral-900">{typeof kpi.value === "number" ? kpi.value.toLocaleString("tr-TR") : kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-neutral-100">
        <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-900">Son Siparişler</h2>
          <Link href="/admin-orders" className="text-sm text-primary-500 hover:text-primary-600 font-medium">
            Tümünü Gör →
          </Link>
        </div>
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
              {recentOrders.length === 0 ? (
                <tr><td colSpan={6} className="text-center text-sm text-neutral-400 py-8">Henüz sipariş yok</td></tr>
              ) : (
                recentOrders.map(order => {
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
