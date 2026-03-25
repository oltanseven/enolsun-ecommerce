"use client";

import Link from "next/link";

const recentOrders = [
  { id: "ORD-2024-1847", date: "22 Mart", status: "Kargoda", statusColor: "text-blue-700 bg-blue-50", total: "1.256,90" },
  { id: "ORD-2024-1832", date: "18 Mart", status: "Teslim Edildi", statusColor: "text-green-700 bg-green-50", total: "899,00" },
  { id: "ORD-2024-1810", date: "12 Mart", status: "Teslim Edildi", statusColor: "text-green-700 bg-green-50", total: "548,00" },
];

const recommendations = [
  { name: "Doğal Taş Difüzör", price: 349, gradient: "from-teal-200 to-cyan-300" },
  { name: "Pamuk Örgü Battaniye", price: 1199, gradient: "from-violet-200 to-purple-300" },
  { name: "Ahşap Kesme Tahtası", price: 279, gradient: "from-amber-200 to-yellow-300" },
  { name: "Aromatik Mum Seti", price: 209, gradient: "from-orange-200 to-red-200" },
];

const searchTrends = [
  { term: "Bambu lamba", searches: "2.4K" },
  { term: "Organik bakım", searches: "1.8K" },
  { term: "Seramik vazo", searches: "1.5K" },
  { term: "Doğal sabun", searches: "1.2K" },
  { term: "LED aydınlatma", searches: "980" },
];

export default function DashboardPage() {
  return (
    <>
    <title>Hesabım | enolsun.com</title>
    <meta name="description" content="enolsun.com hesabınızı yönetin. EN son siparişleriniz, EN çok aranan ürünler ve size özel EN iyi fırsatlar burada." />
    <div className="pt-4 sm:pt-8 pb-20 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-1">EN&apos;lerin Dünyasına Hoş Geldin, Emre!</h1>
          <p className="text-sm text-neutral-400">Hesabınızı ve siparişlerinizi buradan EN kolay şekilde yönetebilirsiniz.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-8">
          {[
            { label: "Toplam Sipariş", value: "12", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />, color: "bg-primary-50 text-primary-500" },
            { label: "Aktif Sipariş", value: "1", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />, color: "bg-blue-50 text-blue-500" },
            { label: "Favorilerim", value: "6", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />, color: "bg-red-50 text-red-500" },
            { label: "Kuponlarım", value: "3", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />, color: "bg-yellow-50 text-yellow-600" },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl border border-neutral-100 shadow-align-xs p-4 sm:p-5 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">{stat.icon}</svg>
              </div>
              <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
              <p className="text-xs text-neutral-400">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-5 sm:p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-bold text-neutral-900">EN Son Siparişleriniz</h2>
                <Link href="/orders" className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">Tümü</Link>
              </div>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 rounded-xl border border-neutral-50 hover:bg-neutral-25 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-800">{order.id}</p>
                        <p className="text-xs text-neutral-400">{order.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${order.statusColor}`}>{order.status}</span>
                      <span className="text-sm font-semibold text-neutral-800">{order.total} TL</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Search Trends */}
          <div>
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-5 sm:p-6">
              <h2 className="text-base font-bold text-neutral-900 mb-5">EN Çok Arananlar</h2>
              <div className="space-y-3">
                {searchTrends.map((trend, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-neutral-50 flex items-center justify-center text-[10px] font-semibold text-neutral-400">{i + 1}</span>
                      <span className="text-sm text-neutral-700">{trend.term}</span>
                    </div>
                    <span className="text-xs text-neutral-400">{trend.searches}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-neutral-900">EN Son Baktıklarınız</h2>
            <Link href="/products" className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">Tümü</Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {recommendations.map((item, i) => (
              <div key={i} className="rounded-2xl border border-neutral-100 bg-white overflow-hidden hover:-translate-y-1 hover:shadow-align-lg transition-all duration-200 animate-fade-in" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className={`relative h-40 bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                  <svg className="w-10 h-10 text-white/60" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="12" cy="12" r="3" /></svg>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-neutral-900 text-sm mb-2">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary-600">{item.price} TL</span>
                    <button className="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold rounded-xl transition-colors">Sepete Ekle</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
