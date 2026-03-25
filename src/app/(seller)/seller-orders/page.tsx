"use client"

import { useState, useRef } from "react"
import Link from "next/link"

const ordersData = [
  { id: "#ENS-20261201", customer: "Ayse Yilmaz", initials: "AY", color: "bg-blue-100 text-blue-700", products: ["🌿","🍃"], extra: "+1", amount: "1.249,90", status: "Yeni", statusClass: "bg-yellow-50 text-yellow-700 border-yellow-200", cargo: "—", date: "23 Mar 2026" },
  { id: "#ENS-20261200", customer: "Mehmet Kaya", initials: "MK", color: "bg-green-100 text-green-700", products: ["🪴"], extra: "", amount: "349,00", status: "Yeni", statusClass: "bg-yellow-50 text-yellow-700 border-yellow-200", cargo: "—", date: "23 Mar 2026" },
  { id: "#ENS-20261198", customer: "Zeynep Demir", initials: "ZD", color: "bg-purple-100 text-purple-700", products: ["🕯️","🧴"], extra: "", amount: "589,50", status: "Hazirlaniyor", statusClass: "bg-blue-50 text-blue-700 border-blue-200", cargo: "—", date: "22 Mar 2026" },
  { id: "#ENS-20261195", customer: "Emre Can", initials: "EC", color: "bg-orange-100 text-orange-700", products: ["🎋","🌱","🪻"], extra: "", amount: "2.150,00", status: "Kargoda", statusClass: "bg-indigo-50 text-indigo-700 border-indigo-200", cargo: "Yurtici Kargo", date: "21 Mar 2026" },
  { id: "#ENS-20261190", customer: "Selin Aksoy", initials: "SA", color: "bg-pink-100 text-pink-700", products: ["🧺"], extra: "", amount: "199,90", status: "Teslim Edildi", statusClass: "bg-green-50 text-green-700 border-green-200", cargo: "Aras Kargo", date: "19 Mar 2026" },
]

const tabs = [
  { key: "all", label: "Tumu", count: 156 },
  { key: "new", label: "Yeni", count: 12 },
  { key: "preparing", label: "Hazirlaniyor", count: 8 },
  { key: "shipped", label: "Kargoda", count: 23 },
  { key: "delivered", label: "Teslim Edildi", count: 108 },
  { key: "cancelled", label: "Iptal/Iade", count: 5 },
]

export default function SellerOrdersPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  function toggleSelectAll(checked: boolean) {
    setSelectedOrders(checked ? ordersData.map(o => o.id) : [])
  }

  function toggleOrderSelect(id: string) {
    setSelectedOrders(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  function clearSelection() { setSelectedOrders([]) }

  return (
    <>
      {/* Bulk Action Bar */}
      {selectedOrders.length > 0 && (
        <div className="bg-primary-600 text-white px-4 sm:px-6 py-3 flex items-center justify-between rounded-xl mb-4">
          <span className="text-sm font-medium">{selectedOrders.length} siparis secildi</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors">Secilileri Onayla</button>
            <button className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors">Secilileri Kargola</button>
            <button onClick={clearSelection} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-neutral-800">Siparisler</h1>
          <span className="bg-primary-100 text-primary-700 text-sm font-semibold px-2.5 py-0.5 rounded-full">156</span>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-sm font-medium text-neutral-700 hover:bg-neutral-50 shadow-align-xs transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          Disa Aktar
        </button>
      </div>

      {/* Tab Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`seller-tab px-4 py-2 rounded-full text-sm font-medium ${activeTab === tab.key ? "active" : "bg-neutral-100 text-neutral-600"}`}>
            {tab.label} <span className="ml-1 opacity-70">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Filters Row */}
      <div className="bg-white rounded-xl border border-neutral-100 p-4 mb-6 shadow-align-xs">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 flex-1">
            <input type="date" className="px-3 py-2 border border-neutral-200 rounded-xl text-sm text-neutral-700 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all w-full sm:w-auto" />
            <span className="text-neutral-400 text-sm">-</span>
            <input type="date" className="px-3 py-2 border border-neutral-200 rounded-xl text-sm text-neutral-700 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all w-full sm:w-auto" />
          </div>
          <select className="px-3 py-2 border border-neutral-200 rounded-xl text-sm text-neutral-700 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all bg-white">
            <option value="">Durum Secin</option>
            <option>Yeni</option>
            <option>Hazirlaniyor</option>
            <option>Kargoda</option>
            <option>Teslim Edildi</option>
            <option>Iptal/Iade</option>
          </select>
          <div className="relative flex-1 sm:max-w-xs">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input type="text" placeholder="Siparis no ile ara..." className="w-full pl-9 pr-3 py-2 border border-neutral-200 rounded-xl text-sm text-neutral-700 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" />
          </div>
        </div>
      </div>

      {/* Desktop Orders Table */}
      <div className="hidden md:block bg-white rounded-xl border border-neutral-100 shadow-align-xs overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-25 border-b border-neutral-100">
                <th className="px-4 py-3 text-left"><input type="checkbox" checked={selectedOrders.length === ordersData.length} onChange={(e) => toggleSelectAll(e.target.checked)} className="rounded border-neutral-300 text-primary-500 focus:ring-primary-300 cursor-pointer" /></th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Siparis No</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Musteri</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Urunler</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Tutar</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Durum</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Kargo</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Tarih</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Islemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {ordersData.map(order => (
                <tr key={order.id} className="hover:bg-neutral-25 transition-colors">
                  <td className="px-4 py-3"><input type="checkbox" checked={selectedOrders.includes(order.id)} onChange={() => toggleOrderSelect(order.id)} className="rounded border-neutral-300 text-primary-500 focus:ring-primary-300 cursor-pointer" /></td>
                  <td className="px-4 py-3 text-sm font-semibold text-primary-600">{order.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full ${order.color} flex items-center justify-center`}><span className="text-xs font-bold">{order.initials}</span></div>
                      <span className="text-sm text-neutral-700">{order.customer}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {order.products.map((p, i) => (
                        <div key={i} className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-xs">{p}</div>
                      ))}
                      {order.extra && <span className="text-xs text-neutral-400 ml-1">{order.extra}</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-neutral-800">&#8378;{order.amount}</td>
                  <td className="px-4 py-3"><span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${order.statusClass}`}>{order.status}</span></td>
                  <td className="px-4 py-3 text-sm text-neutral-500">{order.cargo}</td>
                  <td className="px-4 py-3 text-sm text-neutral-500">{order.date}</td>
                  <td className="px-4 py-3">
                    <div className="relative">
                      <button onClick={() => setOpenDropdown(openDropdown === order.id ? null : order.id)} className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors">
                        <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01"/></svg>
                      </button>
                      {openDropdown === order.id && (
                        <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-neutral-100 rounded-xl shadow-align-md z-10 py-1">
                          <Link href={`/seller-orders?order=${order.id}`} className="block px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50">Detay</Link>
                          <button onClick={() => setOpenDropdown(null)} className="w-full text-left block px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50">Kargola</button>
                          <button onClick={() => setOpenDropdown(null)} className="w-full text-left block px-3 py-2 text-sm text-red-600 hover:bg-red-50">Iptal Et</button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Order Cards */}
      <div className="md:hidden space-y-3 mb-6">
        {ordersData.map((order, i) => (
          <div key={order.id} className="bg-white rounded-xl border border-neutral-100 p-4 shadow-align-xs" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-primary-600">{order.id}</span>
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${order.statusClass}`}>{order.status}</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-7 h-7 rounded-full ${order.color} flex items-center justify-center`}><span className="text-xs font-bold">{order.initials}</span></div>
              <span className="text-sm text-neutral-700">{order.customer}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-neutral-800">&#8378;{order.amount}</span>
              <span className="text-xs text-neutral-500">{order.date}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
