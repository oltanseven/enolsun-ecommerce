"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

const starIcon = <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
const starDim = <svg className="w-3.5 h-3.5 text-amber-200" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>

const recentOrders = [
  { id: "#ENS-10247", customer: "Ayşe Yılmaz", initials: "AY", color: "bg-blue-100 text-blue-600", product: "Makrome Duvar Süsü", amount: "485,00", status: "Yeni", statusClass: "bg-blue-50 text-blue-700", date: "23 Mar 2026" },
  { id: "#ENS-10246", customer: "Mehmet Kara", initials: "MK", color: "bg-purple-100 text-purple-600", product: "Bambu Masa Lambası", amount: "1.250,00", status: "Hazırlanıyor", statusClass: "bg-warning-light text-warning-dark", date: "23 Mar 2026" },
  { id: "#ENS-10244", customer: "Zeynep Demir", initials: "ZD", color: "bg-emerald-100 text-emerald-600", product: "Seramik Vazo Seti (3'lü)", amount: "890,00", status: "Kargoda", statusClass: "bg-orange-50 text-orange-700", date: "22 Mar 2026" },
  { id: "#ENS-10240", customer: "Elif Özkan", initials: "EÖ", color: "bg-rose-100 text-rose-600", product: "Doğal Taş Mumluk", amount: "340,00", status: "Teslim Edildi", statusClass: "bg-success-light text-success-dark", date: "21 Mar 2026" },
  { id: "#ENS-10238", customer: "Can Arslan", initials: "CA", color: "bg-gray-100 text-gray-600", product: "Ahşap Saat", amount: "720,00", status: "İptal", statusClass: "bg-error-light text-error-dark", date: "20 Mar 2026" },
]

const topProducts = [
  { rank: 1, name: "Makrome Duvar Süsü", sold: "128 adet satıldı", revenue: "62.080", rankClass: "bg-primary-500 text-white" },
  { rank: 2, name: "Bambu Masa Lambası", sold: "94 adet satıldı", revenue: "117.500", rankClass: "bg-primary-400 text-white" },
  { rank: 3, name: "Seramik Vazo Seti (3'lü)", sold: "76 adet satıldı", revenue: "67.640", rankClass: "bg-primary-300 text-white" },
  { rank: 4, name: "Doğal Taş Mumluk", sold: "63 adet satıldı", revenue: "21.420", rankClass: "bg-primary-200 text-primary-800" },
  { rank: 5, name: "Ahşap Saat", sold: "51 adet satıldı", revenue: "36.720", rankClass: "bg-primary-100 text-primary-700" },
]

const reviews = [
  { name: "Selin Bulut", initials: "SB", color: "bg-emerald-100 text-emerald-600", time: "2 saat önce", stars: 5, text: "Makrome duvar süsü harika görünüyor! Oturma odamıza çok yakıştı. Renk tonları fotoğraftaki gibi, çok memnunum.", product: "Makrome Duvar Süsü" },
  { name: "Ozan Tunç", initials: "OT", color: "bg-blue-100 text-blue-600", time: "5 saat önce", stars: 4, text: "Bambu lamba gerçekten kaliteli. Işık dağılımı çok hoş. Tek eksik kargo biraz geç geldi ama ürün mükemmel.", product: "Bambu Masa Lambası" },
  { name: "Deniz Akın", initials: "DA", color: "bg-rose-100 text-rose-600", time: "1 gün önce", stars: 5, text: "Seramik vazo seti beklediğimden bile güzel çıktı. Paketleme özenli, her biri ayrı ayrı korunmuş. Teşekkürler!", product: "Seramik Vazo Seti (3'lü)" },
]

const chartData = [
  { label: "Pzt", value: "6.8K", height: "58%", shade: "bg-primary-300" },
  { label: "Sal", value: "9.2K", height: "78%", shade: "bg-primary-400" },
  { label: "Çar", value: "7.5K", height: "64%", shade: "bg-primary-300" },
  { label: "Per", value: "11.1K", height: "94%", shade: "bg-primary-500" },
  { label: "Cum", value: "8.4K", height: "71%", shade: "bg-primary-400" },
  { label: "Cmt", value: "3.2K", height: "27%", shade: "bg-primary-200" },
  { label: "Paz", value: "12K", height: "100%", shade: "bg-primary-600" },
]

export default function SellerDashboardPage() {
  const [showTips, setShowTips] = useState(true)

  useEffect(() => { document.title = "Satıcı Paneli | enolsun.com Satıcı Merkezi" }, [])

  return (
    <>
      {/* 1. Welcome Banner */}
      <section className="animate-fade-in-up mb-8">
        <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-1/2 w-40 h-40 bg-white/5 rounded-full translate-y-1/2"></div>
          <div className="relative z-10">
            <h1 className="text-xl lg:text-2xl font-bold mb-1">EN başarılı satıcılar burada! Hoş geldiniz, Yeşil Yaprak Atölye!</h1>
            <p className="text-primary-100 text-sm lg:text-base mb-5">Bugün mağazanız EN aktif günlerinden birini yaşıyor!</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/seller-add-product" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-primary-700 font-semibold text-sm rounded-xl hover:bg-primary-25 transition-colors shadow-align-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                Yeni Ürün Ekle
              </Link>
              <Link href="/seller-orders" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 text-white font-semibold text-sm rounded-xl hover:bg-white/25 transition-colors border border-white/20">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                Siparişleri Gör
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {/* Bugünkü Satış */}
        <div className="animate-fade-in-up stagger-1 bg-white rounded-2xl p-5 shadow-align-xs border border-neutral-100 hover:shadow-align-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-success-light text-success-dark text-xs font-medium rounded-full">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M7 17l5-5 5 5M7 7l5-5 5 5"/></svg>
              %18
            </span>
          </div>
          <p className="text-2xl font-bold text-neutral-900">&#8378;12.450</p>
          <p className="text-sm text-neutral-500 mt-1">Bugünkü Satış</p>
          <p className="text-xs text-neutral-400 mt-0.5">dünden &uarr;</p>
        </div>

        {/* Toplam Sipariş */}
        <div className="animate-fade-in-up stagger-2 bg-white rounded-2xl p-5 shadow-align-xs border border-neutral-100 hover:shadow-align-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-success-light text-success-dark text-xs font-medium rounded-full">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M7 17l5-5 5 5M7 7l5-5 5 5"/></svg>
              %12
            </span>
          </div>
          <p className="text-2xl font-bold text-neutral-900">47</p>
          <p className="text-sm text-neutral-500 mt-1">Toplam Sipariş</p>
          <p className="text-xs text-neutral-400 mt-0.5">dünden &uarr;</p>
        </div>

        {/* Bekleyen Sipariş */}
        <div className="animate-fade-in-up stagger-3 bg-white rounded-2xl p-5 shadow-align-xs border border-neutral-100 hover:shadow-align-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-warning-light rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-warning-dark" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-warning-light text-warning-dark text-xs font-medium rounded-full">Dikkat</span>
          </div>
          <p className="text-2xl font-bold text-neutral-900">8</p>
          <p className="text-sm text-neutral-500 mt-1">Bekleyen Sipariş</p>
          <p className="text-xs text-warning-dark mt-0.5">Hazırlanmayı bekliyor</p>
        </div>

        {/* Mağaza Puanı */}
        <div className="animate-fade-in-up stagger-4 bg-white rounded-2xl p-5 shadow-align-xs border border-neutral-100 hover:shadow-align-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <div className="flex gap-0.5">{[1,2,3,4].map(i => <span key={i}>{starIcon}</span>)}{starDim}</div>
          </div>
          <p className="text-2xl font-bold text-neutral-900">4.8<span className="text-base font-normal text-neutral-400">/5</span></p>
          <p className="text-sm text-neutral-500 mt-1">Mağaza Puanı</p>
          <p className="text-xs text-neutral-400 mt-0.5">312 değerlendirme</p>
        </div>
      </section>

      {/* 3. Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-8">
        {/* Sales Chart */}
        <div className="animate-fade-in-up stagger-2 bg-white rounded-2xl p-6 shadow-align-xs border border-neutral-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-neutral-900">Son 7 Gün Satış</h2>
              <p className="text-sm text-neutral-500 mt-0.5">Günlük satış performansınız</p>
            </div>
            <span className="text-sm font-semibold text-primary-600">&#8378;58.200</span>
          </div>
          <div className="flex items-end justify-between gap-2 h-44">
            {chartData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[11px] text-neutral-500 font-medium">&#8378;{d.value}</span>
                <div className={`chart-bar w-full ${d.shade} rounded-t-lg`} style={{ height: d.height }}></div>
                <span className="text-xs text-neutral-500">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="animate-fade-in-up stagger-3 bg-white rounded-2xl p-6 shadow-align-xs border border-neutral-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-neutral-900">Kategori Dağılımı</h2>
              <p className="text-sm text-neutral-500 mt-0.5">Satış kategorileriniz</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="donut-chart flex-shrink-0"></div>
            <div className="flex-1 space-y-3 w-full">
              {[
                { color: "bg-primary-500", label: "Ev & Yaşam", pct: "%45" },
                { color: "bg-primary-400", label: "Aydınlatma", pct: "%25" },
                { color: "bg-primary-300", label: "Dekorasyon", pct: "%20" },
                { color: "bg-primary-200", label: "Diğer", pct: "%10" },
              ].map((cat, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${cat.color}`}></span>
                    <span className="text-sm text-neutral-700">{cat.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-neutral-900">{cat.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Recent Orders Table */}
      <section className="animate-fade-in-up stagger-3 bg-white rounded-2xl shadow-align-xs border border-neutral-100 mb-8 overflow-hidden">
        <div className="flex items-center justify-between p-5 lg:p-6 border-b border-neutral-100">
          <div>
            <h2 className="text-base font-semibold text-neutral-900">Son Siparişler</h2>
            <p className="text-sm text-neutral-500 mt-0.5">EN son gelen siparişleriniz</p>
          </div>
          <Link href="/seller-orders" className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
            Tüm Siparişleri Gör &rarr;
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="orders-table w-full">
            <thead>
              <tr className="bg-neutral-25 text-left">
                <th className="px-5 lg:px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Sipariş No</th>
                <th className="px-5 lg:px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Müşteri</th>
                <th className="px-5 lg:px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Ürün</th>
                <th className="px-5 lg:px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Tutar</th>
                <th className="px-5 lg:px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Durum</th>
                <th className="px-5 lg:px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Tarih</th>
                <th className="px-5 lg:px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {recentOrders.map(order => (
                <tr key={order.id} className="hover:bg-neutral-25 transition-colors">
                  <td data-label="Sipariş No" className="px-5 lg:px-6 py-4 text-sm font-medium text-primary-600">{order.id}</td>
                  <td data-label="Müşteri" className="px-5 lg:px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 ${order.color} rounded-full flex items-center justify-center text-xs font-semibold`}>{order.initials}</div>
                      <span className="text-sm text-neutral-800">{order.customer}</span>
                    </div>
                  </td>
                  <td data-label="Ürün" className="px-5 lg:px-6 py-4 text-sm text-neutral-600">{order.product}</td>
                  <td data-label="Tutar" className="px-5 lg:px-6 py-4 text-sm font-semibold text-neutral-900">&#8378;{order.amount}</td>
                  <td data-label="Durum" className="px-5 lg:px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${order.statusClass}`}>{order.status}</span>
                  </td>
                  <td data-label="Tarih" className="px-5 lg:px-6 py-4 text-sm text-neutral-500">{order.date}</td>
                  <td data-label="İşlem" className="px-5 lg:px-6 py-4">
                    <Link href={`/seller-orders?order=${order.id}`} className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">Detay</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Best Sellers + Reviews */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-8">
        {/* Best Selling Products */}
        <div className="animate-fade-in-up stagger-4 bg-white rounded-2xl shadow-align-xs border border-neutral-100 overflow-hidden">
          <div className="p-5 lg:p-6 border-b border-neutral-100">
            <h2 className="text-base font-semibold text-neutral-900">EN Çok Satan Ürünler</h2>
            <p className="text-sm text-neutral-500 mt-0.5">Bu ayki EN popüler ürünleriniz</p>
          </div>
          <div className="divide-y divide-neutral-100">
            {topProducts.map(p => (
              <div key={p.rank} className="flex items-center gap-4 p-4 lg:px-6 hover:bg-neutral-25 transition-colors">
                <span className={`w-7 h-7 ${p.rankClass} rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0`}>{p.rank}</span>
                <div className="w-11 h-11 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 truncate">{p.name}</p>
                  <p className="text-xs text-neutral-500">{p.sold}</p>
                </div>
                <span className="text-sm font-semibold text-neutral-900">&#8378;{p.revenue}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="animate-fade-in-up stagger-5 bg-white rounded-2xl shadow-align-xs border border-neutral-100 overflow-hidden">
          <div className="p-5 lg:p-6 border-b border-neutral-100">
            <h2 className="text-base font-semibold text-neutral-900">Son Değerlendirmeler</h2>
            <p className="text-sm text-neutral-500 mt-0.5">Müşterilerinizden gelen yorumlar</p>
          </div>
          <div className="divide-y divide-neutral-100">
            {reviews.map((r, i) => (
              <div key={i} className="p-4 lg:px-6 hover:bg-neutral-25 transition-colors">
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 ${r.color} rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0`}>{r.initials}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-neutral-900">{r.name}</span>
                      <span className="text-xs text-neutral-400">{r.time}</span>
                    </div>
                    <div className="flex gap-0.5 mb-1.5">
                      {Array.from({ length: 5 }, (_, j) => j < r.stars ? <span key={j}>{starIcon}</span> : <span key={j}><svg className="w-3.5 h-3.5 text-neutral-200" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></span>)}
                    </div>
                    <p className="text-sm text-neutral-600 line-clamp-2">{r.text}</p>
                    <p className="text-xs text-primary-600 mt-1.5 font-medium">{r.product}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Performance Tips Banner */}
      {showTips && (
        <section className="animate-fade-in-up stagger-5 mb-8">
          <div className="bg-primary-25 border border-primary-100 rounded-2xl p-5 lg:p-6 relative">
            <button onClick={() => setShowTips(false)} className="absolute top-4 right-4 p-1 rounded-lg hover:bg-primary-100 text-primary-400 hover:text-primary-600 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <div className="flex items-start gap-3 mb-3">
              <div className="w-9 h-9 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-primary-800">EN Çok Satan Satıcıların Sırları</h3>
                <p className="text-xs text-primary-600 mt-0.5">Satışlarınızı artırmak için EN etkili öneriler</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 ml-12">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <p className="text-xs text-primary-700">Ürün fotoğraflarınızı EN yüksek kalitede yükleyin</p>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <p className="text-xs text-primary-700">Müşteri sorularına EN hızlı yanıtı verin</p>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <p className="text-xs text-primary-700">EN cazip kampanya ve indirimler oluşturun</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
