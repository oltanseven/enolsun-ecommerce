"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

const _sb = createClient()

function formatPrice(price: number) {
  return price.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const trafficSources = [
  { source: "Arama Motorlari", pct: 42, color: "bg-primary-500" },
  { source: "Direkt Erisim", pct: 28, color: "bg-primary-400" },
  { source: "Sosyal Medya", pct: 18, color: "bg-primary-300" },
  { source: "Referanslar", pct: 8, color: "bg-primary-200" },
  { source: "Diger", pct: 4, color: "bg-neutral-200" },
]

const demographics = [
  { range: "18-24", pct: 15, color: "bg-primary-200" },
  { range: "25-34", pct: 38, color: "bg-primary-500" },
  { range: "35-44", pct: 28, color: "bg-primary-400" },
  { range: "45-54", pct: 12, color: "bg-primary-300" },
  { range: "55+", pct: 7, color: "bg-primary-200" },
]

const salesChart = [
  { label: "Pzt", value: "6.8K", height: "58%", shade: "bg-primary-300" },
  { label: "Sal", value: "9.2K", height: "78%", shade: "bg-primary-400" },
  { label: "Car", value: "7.5K", height: "64%", shade: "bg-primary-300" },
  { label: "Per", value: "11.1K", height: "94%", shade: "bg-primary-500" },
  { label: "Cum", value: "8.4K", height: "71%", shade: "bg-primary-400" },
  { label: "Cmt", value: "3.2K", height: "27%", shade: "bg-primary-200" },
  { label: "Paz", value: "12K", height: "100%", shade: "bg-primary-600" },
]

export default function SellerStatsPage() {
  const [dateRange, setDateRange] = useState("30d")
  const [loading, setLoading] = useState(true)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const [avgOrderValue, setAvgOrderValue] = useState(0)
  const [productsCount, setProductsCount] = useState(0)
  const [avgRating, setAvgRating] = useState(0)
  const [reviewCount, setReviewCount] = useState(0)

  useEffect(() => {
    document.title = "Istatistikler | enolsun.com -- EN Detayli Analiz"
    loadStats()
  }, [])

  async function loadStats() {
    const { data: { user } } = await _sb.auth.getUser()
    if (!user) { setLoading(false); return }

    const { data: store } = await _sb
      .from("stores")
      .select("id")
      .eq("owner_id", user.id)
      .maybeSingle()

    if (!store) { setLoading(false); return }

    const [ordersRes, productsRes, reviewsRes] = await Promise.all([
      _sb
        .from("orders")
        .select("id, total_amount")
        .eq("store_id", store.id),

      _sb
        .from("products")
        .select("id", { count: "exact", head: true })
        .eq("store_id", store.id),

      _sb
        .from("reviews")
        .select("rating, product:products!inner(store_id)")
        .eq("product.store_id", store.id),
    ])

    const orders = ordersRes.data ?? []
    const revenue = orders.reduce((sum: number, o: any) => sum + (o.total_amount ?? 0), 0)
    setTotalOrders(orders.length)
    setTotalRevenue(revenue)
    setAvgOrderValue(orders.length > 0 ? revenue / orders.length : 0)
    setProductsCount(productsRes.count ?? 0)

    const allReviews = reviewsRes.data ?? []
    if (allReviews.length > 0) {
      const avg = allReviews.reduce((sum: number, r: any) => sum + r.rating, 0) / allReviews.length
      setAvgRating(Math.round(avg * 10) / 10)
      setReviewCount(allReviews.length)
    }

    setLoading(false)
  }

  const kpis = [
    { label: "Toplam Satis", value: `${formatPrice(totalRevenue)}`, prefix: "\u20BA", icon: <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />, iconBg: "bg-primary-50", iconColor: "text-primary-500" },
    { label: "Siparis Sayisi", value: totalOrders.toLocaleString("tr-TR"), prefix: "", icon: <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />, iconBg: "bg-blue-50", iconColor: "text-blue-500" },
    { label: "Ort. Siparis Tutari", value: `${formatPrice(avgOrderValue)}`, prefix: "\u20BA", icon: <><path d="M3 3v18h18" /><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" /></>, iconBg: "bg-emerald-50", iconColor: "text-emerald-500" },
    { label: "Urun Sayisi", value: productsCount.toLocaleString("tr-TR"), prefix: "", icon: <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />, iconBg: "bg-amber-50", iconColor: "text-amber-500" },
    { label: "Ortalama Puan", value: avgRating > 0 ? avgRating.toFixed(1) : "--", prefix: "", icon: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />, iconBg: "bg-purple-50", iconColor: "text-purple-500" },
    { label: "Degerlendirme Sayisi", value: reviewCount.toLocaleString("tr-TR"), prefix: "", icon: <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />, iconBg: "bg-rose-50", iconColor: "text-rose-500" },
  ]

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="h-7 bg-neutral-100 rounded w-72" />
          <div className="flex gap-2">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-9 bg-neutral-100 rounded-lg w-16" />)}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-align-xs border border-neutral-100">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-neutral-100 rounded-xl" />
                <div className="h-5 bg-neutral-100 rounded-full w-14" />
              </div>
              <div className="h-7 bg-neutral-100 rounded w-28 mb-2" />
              <div className="h-4 bg-neutral-100 rounded w-32" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-8">
          {[1, 2].map(i => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-align-xs border border-neutral-100 h-64" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">Istatistikler -- EN Detayli Analiz Paneli</h1>
        <div className="flex items-center gap-2">
          {[
            { key: "7d", label: "7 Gun" },
            { key: "30d", label: "30 Gun" },
            { key: "90d", label: "90 Gun" },
            { key: "1y", label: "1 Yil" },
          ].map(d => (
            <button key={d.key} onClick={() => setDateRange(d.key)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${dateRange === d.key ? "bg-primary-500 text-white" : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50"}`}>{d.label}</button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-align-xs border border-neutral-100 hover:shadow-align-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${kpi.iconBg} rounded-xl flex items-center justify-center`}>
                <svg className={`w-5 h-5 ${kpi.iconColor}`} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">{kpi.icon}</svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-neutral-900">{kpi.prefix}{kpi.value}</p>
            <p className="text-sm text-neutral-500 mt-1">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-8">
        {/* Sales Trend */}
        <div className="bg-white rounded-2xl p-6 shadow-align-xs border border-neutral-100">
          <h2 className="text-base font-semibold text-neutral-900 mb-4">Satis Trendi</h2>
          <div className="flex items-end justify-between gap-2 h-44">
            {salesChart.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[11px] text-neutral-500 font-medium">&#8378;{d.value}</span>
                <div className={`chart-bar w-full ${d.shade} rounded-t-lg`} style={{ height: d.height }}></div>
                <span className="text-xs text-neutral-500">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-2xl p-6 shadow-align-xs border border-neutral-100">
          <h2 className="text-base font-semibold text-neutral-900 mb-4">Trafik Kaynaklari</h2>
          <div className="space-y-4">
            {trafficSources.map((t, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-neutral-700">{t.source}</span>
                  <span className="text-sm font-semibold text-neutral-900">%{t.pct}</span>
                </div>
                <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div className={`h-full ${t.color} rounded-full transition-all duration-500`} style={{ width: `${t.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Demographics + Performance Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-8">
        {/* Demographics */}
        <div className="bg-white rounded-2xl p-6 shadow-align-xs border border-neutral-100">
          <h2 className="text-base font-semibold text-neutral-900 mb-4">Yas Dagilimi</h2>
          <div className="space-y-3">
            {demographics.map((d, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-sm text-neutral-600 w-12">{d.range}</span>
                <div className="flex-1 h-6 bg-neutral-100 rounded-lg overflow-hidden">
                  <div className={`h-full ${d.color} rounded-lg transition-all duration-500 flex items-center justify-end pr-2`} style={{ width: `${d.pct}%` }}>
                    {d.pct >= 15 && <span className="text-[11px] font-semibold text-white">%{d.pct}</span>}
                  </div>
                </div>
                {d.pct < 15 && <span className="text-xs font-medium text-neutral-600">%{d.pct}</span>}
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-neutral-100">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-xs text-neutral-400">Kadin</p><p className="text-lg font-bold text-neutral-900">%62</p></div>
              <div><p className="text-xs text-neutral-400">Erkek</p><p className="text-lg font-bold text-neutral-900">%38</p></div>
            </div>
          </div>
        </div>

        {/* Performance Comparison */}
        <div className="bg-white rounded-2xl p-6 shadow-align-xs border border-neutral-100">
          <h2 className="text-base font-semibold text-neutral-900 mb-4">Performans Karsilastirma</h2>
          <p className="text-sm text-neutral-500 mb-4">Kategorinizdeki ortalamaya gore</p>
          <div className="space-y-5">
            {[
              { metric: "Siparis Karsilama Suresi", yours: "1.2 gun", avg: "2.1 gun", pct: 85 },
              { metric: "Musteri Memnuniyeti", yours: avgRating > 0 ? `%${(avgRating / 5 * 100).toFixed(1)}` : "--%", avg: "%91.2", pct: avgRating > 0 ? Math.round(avgRating / 5 * 100) : 0 },
              { metric: "Iade Orani", yours: "%2.1", avg: "%4.8", pct: 92 },
              { metric: "Yanit Suresi", yours: "18 dk", avg: "45 dk", pct: 78 },
            ].map((p, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-neutral-700">{p.metric}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-neutral-400">Ort: {p.avg}</span>
                    <span className="text-sm font-semibold text-primary-600">{p.yours}</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-500 rounded-full transition-all duration-500" style={{ width: `${p.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
