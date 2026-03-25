"use client"

import { useState, useEffect } from "react"

export default function SellerStatsPage() {
  const [dateRange, setDateRange] = useState("30d")

  useEffect(() => { document.title = "İstatistikler | enolsun.com — EN Detaylı Analiz" }, [])

  const kpis = [
    { label: "Toplam Satış", value: "186.400", change: "+18%", positive: true, icon: <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>, iconBg: "bg-primary-50", iconColor: "text-primary-500" },
    { label: "Sipariş Sayısı", value: "1.248", change: "+12%", positive: true, icon: <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>, iconBg: "bg-blue-50", iconColor: "text-blue-500" },
    { label: "Ort. Sipariş Tutarı", value: "149,36", change: "+5%", positive: true, icon: <><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></>, iconBg: "bg-emerald-50", iconColor: "text-emerald-500" },
    { label: "Dönüşüm Oranı", value: "%3.8", change: "-0.2%", positive: false, icon: <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/>, iconBg: "bg-amber-50", iconColor: "text-amber-500" },
    { label: "Sayfa Görüntülenme", value: "48.320", change: "+22%", positive: true, icon: <><path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></>, iconBg: "bg-purple-50", iconColor: "text-purple-500" },
    { label: "Müşteri Memnuniyeti", value: "%96.4", change: "+1.2%", positive: true, icon: <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>, iconBg: "bg-rose-50", iconColor: "text-rose-500" },
  ]

  const trafficSources = [
    { source: "Arama Motorları", pct: 42, color: "bg-primary-500" },
    { source: "Direkt Erişim", pct: 28, color: "bg-primary-400" },
    { source: "Sosyal Medya", pct: 18, color: "bg-primary-300" },
    { source: "Referanslar", pct: 8, color: "bg-primary-200" },
    { source: "Diğer", pct: 4, color: "bg-neutral-200" },
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
    { label: "Çar", value: "7.5K", height: "64%", shade: "bg-primary-300" },
    { label: "Per", value: "11.1K", height: "94%", shade: "bg-primary-500" },
    { label: "Cum", value: "8.4K", height: "71%", shade: "bg-primary-400" },
    { label: "Cmt", value: "3.2K", height: "27%", shade: "bg-primary-200" },
    { label: "Paz", value: "12K", height: "100%", shade: "bg-primary-600" },
  ]

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">İstatistikler — EN Detaylı Analiz Paneli</h1>
        <div className="flex items-center gap-2">
          {[
            { key: "7d", label: "7 Gün" },
            { key: "30d", label: "30 Gün" },
            { key: "90d", label: "90 Gün" },
            { key: "1y", label: "1 Yıl" },
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
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${kpi.positive ? "bg-success-light text-success-dark" : "bg-error-light text-error-dark"}`}>
                {kpi.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-neutral-900">{kpi.label === "Toplam Satış" || kpi.label === "Ort. Sipariş Tutarı" ? <>&#8378;</> : ""}{kpi.value}</p>
            <p className="text-sm text-neutral-500 mt-1">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-8">
        {/* Sales Trend */}
        <div className="bg-white rounded-2xl p-6 shadow-align-xs border border-neutral-100">
          <h2 className="text-base font-semibold text-neutral-900 mb-4">Satış Trendi</h2>
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
          <h2 className="text-base font-semibold text-neutral-900 mb-4">Trafik Kaynakları</h2>
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
          <h2 className="text-base font-semibold text-neutral-900 mb-4">Yaş Dağılımı</h2>
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
              <div><p className="text-xs text-neutral-400">Kadın</p><p className="text-lg font-bold text-neutral-900">%62</p></div>
              <div><p className="text-xs text-neutral-400">Erkek</p><p className="text-lg font-bold text-neutral-900">%38</p></div>
            </div>
          </div>
        </div>

        {/* Performance Comparison */}
        <div className="bg-white rounded-2xl p-6 shadow-align-xs border border-neutral-100">
          <h2 className="text-base font-semibold text-neutral-900 mb-4">Performans Karşılaştırma</h2>
          <p className="text-sm text-neutral-500 mb-4">Kategorinizdeki ortalamaya göre</p>
          <div className="space-y-5">
            {[
              { metric: "Sipariş Karşılama Süresi", yours: "1.2 gün", avg: "2.1 gün", pct: 85 },
              { metric: "Müşteri Memnuniyeti", yours: "%96.4", avg: "%91.2", pct: 96 },
              { metric: "İade Oranı", yours: "%2.1", avg: "%4.8", pct: 92 },
              { metric: "Yanıt Süresi", yours: "18 dk", avg: "45 dk", pct: 78 },
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
