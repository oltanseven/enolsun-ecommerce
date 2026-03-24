"use client"

import { useState } from "react"
import Link from "next/link"

const products = [
  { id: 1, name: "Makrome Duvar Susu", category: "Ev & Yasam", price: "485,00", stock: 24, sold: 128, status: "Aktif", statusClass: "bg-success-light text-success-dark", rating: 4.8 },
  { id: 2, name: "Bambu Masa Lambasi", category: "Aydinlatma", price: "1.250,00", stock: 8, sold: 94, status: "Aktif", statusClass: "bg-success-light text-success-dark", rating: 4.6 },
  { id: 3, name: "Seramik Vazo Seti (3'lu)", category: "Dekorasyon", price: "890,00", stock: 15, sold: 76, status: "Aktif", statusClass: "bg-success-light text-success-dark", rating: 4.9 },
  { id: 4, name: "Dogal Tas Mumluk", category: "Dekorasyon", price: "340,00", stock: 3, sold: 63, status: "Aktif", statusClass: "bg-warning-light text-warning-dark", rating: 4.5 },
  { id: 5, name: "Ahsap Saat", category: "Ev & Yasam", price: "720,00", stock: 0, sold: 51, status: "Tukendi", statusClass: "bg-error-light text-error-dark", rating: 4.7 },
  { id: 6, name: "Keten Yastik Kilifi", category: "Ev & Yasam", price: "195,00", stock: 42, sold: 38, status: "Aktif", statusClass: "bg-success-light text-success-dark", rating: 4.4 },
]

const tabs = [
  { key: "all", label: "Tum Urunler", count: 48 },
  { key: "active", label: "Aktif", count: 42 },
  { key: "draft", label: "Taslak", count: 3 },
  { key: "outofstock", label: "Tukenmis", count: 3 },
]

export default function SellerProductsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-neutral-800">Urunlerim</h1>
          <span className="bg-primary-100 text-primary-700 text-sm font-semibold px-2.5 py-0.5 rounded-full">48</span>
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
            Yeni Urun Ekle
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

      {/* Table View */}
      {viewMode === "table" ? (
        <div className="bg-white rounded-xl border border-neutral-100 shadow-align-xs overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-25 border-b border-neutral-100">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Urun</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Kategori</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Fiyat</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Stok</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Satilan</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Durum</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Puan</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Islemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-neutral-25 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        </div>
                        <span className="text-sm font-medium text-neutral-900">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-neutral-600">{p.category}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-neutral-800">&#8378;{p.price}</td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-medium ${p.stock <= 5 ? (p.stock === 0 ? "text-error-base" : "text-warning-dark") : "text-neutral-800"}`}>{p.stock}</span>
                      {p.stock > 0 && p.stock <= 5 && <span className="ml-1 text-xs text-warning-dark">Dusuk!</span>}
                    </td>
                    <td className="px-4 py-3 text-sm text-neutral-600">{p.sold}</td>
                    <td className="px-4 py-3"><span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${p.statusClass}`}>{p.status}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        <span className="text-sm text-neutral-700">{p.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors text-neutral-500" title="Duzenle">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-neutral-500 hover:text-red-500" title="Sil">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {products.map(p => (
            <div key={p.id} className="bg-white rounded-xl border border-neutral-100 shadow-align-xs overflow-hidden hover:shadow-align-md transition-shadow">
              <div className="h-40 bg-primary-50 flex items-center justify-center">
                <svg className="w-12 h-12 text-primary-200" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${p.statusClass}`}>{p.status}</span>
                  <div className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <span className="text-xs text-neutral-600">{p.rating}</span>
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-neutral-900 mb-1">{p.name}</h3>
                <p className="text-xs text-neutral-500 mb-3">{p.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-neutral-900">&#8378;{p.price}</span>
                  <span className={`text-xs font-medium ${p.stock <= 5 ? "text-warning-dark" : "text-neutral-500"}`}>Stok: {p.stock}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
