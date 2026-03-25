"use client";

import { useState } from "react";
import Link from "next/link";

const tabs = ["Tümü", "Hazırlanıyor", "Kargoda", "Teslim Edildi", "İptal"];

const orders = [
  { id: "ORD-2024-1847", date: "22 Mart 2024", status: "Kargoda", statusColor: "text-blue-700 bg-blue-50", items: 3, total: "1.256,90", tracking: "TR1234567890" },
  { id: "ORD-2024-1832", date: "18 Mart 2024", status: "Teslim Edildi", statusColor: "text-green-700 bg-green-50", items: 1, total: "899,00", tracking: "" },
  { id: "ORD-2024-1810", date: "12 Mart 2024", status: "Teslim Edildi", statusColor: "text-green-700 bg-green-50", items: 2, total: "548,00", tracking: "" },
  { id: "ORD-2024-1798", date: "5 Mart 2024", status: "İptal", statusColor: "text-red-700 bg-red-50", items: 1, total: "349,90", tracking: "" },
  { id: "ORD-2024-1765", date: "28 Şubat 2024", status: "Teslim Edildi", statusColor: "text-green-700 bg-green-50", items: 4, total: "2.147,60", tracking: "" },
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("Tümü");

  const filtered = activeTab === "Tümü" ? orders : orders.filter((o) => o.status === activeTab);

  return (
    <>
    <title>Siparişlerim | enolsun.com — EN Hızlı Teslimat</title>
    <meta name="description" content="enolsun.com siparişlerinizi takip edin. EN hızlı teslimat ile siparişleriniz EN kısa sürede kapınızda." />
    <div className="space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">Siparişlerim</h1>

      {/* Tab Pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors min-h-[40px] ${activeTab === tab ? "bg-primary-600 text-white" : "bg-neutral-50 text-neutral-500 hover:bg-neutral-100"}`}>{tab}</button>
        ))}
      </div>

      {/* Order Cards */}
      <div className="space-y-4">
        {filtered.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl border border-neutral-100 shadow-align-xs p-4 sm:p-5 hover:shadow-align-sm transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">{order.id}</p>
                  <p className="text-xs text-neutral-400">{order.date}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${order.statusColor}`}>{order.status}</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
              <div className="flex items-center gap-4 text-xs text-neutral-500">
                <span>{order.items} ürün</span>
                <span className="font-semibold text-neutral-800">{order.total} TL</span>
              </div>
              <Link href={`/orders/${order.id}`} className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
                Detay
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 pt-4">
        <button className="w-9 h-9 rounded-lg border border-neutral-200 flex items-center justify-center text-sm text-neutral-400 hover:bg-neutral-50">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
        </button>
        <button className="w-9 h-9 rounded-lg bg-primary-600 text-white text-sm font-semibold">1</button>
        <button className="w-9 h-9 rounded-lg border border-neutral-200 text-sm text-neutral-600 hover:bg-neutral-50">2</button>
        <button className="w-9 h-9 rounded-lg border border-neutral-200 text-sm text-neutral-600 hover:bg-neutral-50">3</button>
        <button className="w-9 h-9 rounded-lg border border-neutral-200 flex items-center justify-center text-sm text-neutral-400 hover:bg-neutral-50">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
        </button>
      </div>
    </div>
    </>
  );
}
