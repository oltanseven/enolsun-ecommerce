"use client";

import { useState } from "react";
import Link from "next/link";

const categories = [
  { key: "all", label: "Tumu" },
  { key: "ev", label: "Ev & Yasam" },
  { key: "bakim", label: "Dogal Bakim" },
  { key: "aydinlatma", label: "Aydinlatma" },
  { key: "mutfak", label: "Mutfak" },
];

const top3 = [
  { rank: 2, name: "Organik Yuz Bakim Seti", desc: "7 parca dogal icerikli set", cat: "bakim", rating: 4.8, reviews: 312, sold: "2.140", price: 449, border: "border-2 border-gray-400", gradient: "from-gray-200 via-gray-100 to-gray-300", badgeBg: "bg-gray-400", order: "order-2 lg:order-1" },
  { rank: 1, name: "El Yapimi Bambu Lamba", desc: "Surdurulebilir bambudan, minimalist tasarim", cat: "ev", rating: 4.9, reviews: 487, sold: "3.247", price: 899, border: "border-2 border-[#d4a017]", gradient: "from-yellow-200 via-amber-100 to-orange-200", badgeBg: "bg-gradient-to-br from-yellow-500 to-amber-600", order: "order-1 lg:order-2", featured: true },
  { rank: 3, name: "Minimalist LED Avize", desc: "Modern cizgiler, sicak isik", cat: "aydinlatma", rating: 4.7, reviews: 198, sold: "1.856", price: 1299, border: "border-2 border-[#b87333]", gradient: "from-orange-200 via-amber-100 to-yellow-200", badgeBg: "bg-gradient-to-br from-amber-600 to-orange-700", order: "order-3" },
];

const products = [
  { rank: 4, name: "Dogal Tas Difuzor", cat: "ev", rating: 4.6, reviews: 156, sold: "1.420", price: 349, gradient: "from-teal-200 to-cyan-300" },
  { rank: 5, name: "Ahsap Kesme Tahtasi", cat: "mutfak", rating: 4.8, reviews: 243, sold: "1.380", price: 279, gradient: "from-amber-200 to-yellow-300" },
  { rank: 6, name: "Lavanta Yastik Spreyi", cat: "bakim", rating: 4.5, reviews: 189, sold: "1.210", price: 149, gradient: "from-violet-200 to-purple-300" },
  { rank: 7, name: "Seramik Masa Lambasi", cat: "aydinlatma", rating: 4.7, reviews: 134, sold: "1.150", price: 599, gradient: "from-rose-200 to-pink-300" },
  { rank: 8, name: "Bambu Mutfak Seti", cat: "mutfak", rating: 4.4, reviews: 98, sold: "980", price: 449, gradient: "from-lime-200 to-green-300" },
  { rank: 9, name: "Argan Yagi Sac Bakim", cat: "bakim", rating: 4.6, reviews: 267, sold: "920", price: 199, gradient: "from-orange-200 to-red-200" },
  { rank: 10, name: "Dekoratif Duvar Aynasi", cat: "ev", rating: 4.3, reviews: 87, sold: "870", price: 749, gradient: "from-sky-200 to-blue-300" },
  { rank: 11, name: "LED Serit Aydinlatma", cat: "aydinlatma", rating: 4.5, reviews: 312, sold: "810", price: 189, gradient: "from-indigo-200 to-blue-300" },
  { rank: 12, name: "Porselen Kahve Fincani", cat: "mutfak", rating: 4.7, reviews: 176, sold: "760", price: 129, gradient: "from-pink-200 to-rose-300" },
];

const trending = [
  { name: "Hasir Sepet (3lu Set)", cat: "ev", price: 399, increase: 142, gradient: "from-emerald-200 to-teal-300" },
  { name: "Gul Suyu Tonik", cat: "bakim", price: 119, increase: 98, gradient: "from-pink-200 to-rose-300" },
  { name: "Kristal Tuz Lambasi", cat: "aydinlatma", price: 259, increase: 87, gradient: "from-amber-200 to-orange-300" },
  { name: "Granit Havan Seti", cat: "mutfak", price: 349, increase: 73, gradient: "from-gray-200 to-slate-300" },
];

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  return (
    <div className="flex">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} className={`w-3.5 h-3.5 ${i < full ? "text-yellow-400" : "text-neutral-200"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function BestsellersPage() {
  const [activeCat, setActiveCat] = useState("all");

  const filterMatch = (cat: string) => activeCat === "all" || cat === activeCat;

  return (
    <>
      {/* Hero Section */}
      <section>
        <div className="bg-primary-50 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(#b5d6a3 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-yellow-100 mb-6">
              <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4H22l-6.2 4.5L18.2 21 12 16.5 5.8 21l2.4-7.1L2 9.4h7.6z" /></svg>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 mb-4 tracking-tight">Cok Satanlar</h1>
            <p className="text-lg text-neutral-500 mb-10 max-w-xl mx-auto">Herkesin tercih ettigi urunler</p>

            <div className="flex flex-nowrap md:flex-wrap md:justify-center gap-2 overflow-x-auto scrollbar-hide px-2 md:px-0 pb-2 md:pb-0">
              {categories.map((c) => (
                <button key={c.key} onClick={() => setActiveCat(c.key)} className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap min-h-[44px] flex items-center ${activeCat === c.key ? "bg-primary-600 text-white" : "bg-neutral-50 text-neutral-500 hover:bg-neutral-100"}`}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TOP 3 Feature Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-start">
          {top3.map((item) => (
            <div key={item.rank} className={`${item.order} rounded-2xl ${item.border} bg-white overflow-hidden hover:-translate-y-1 hover:shadow-align-lg transition-all duration-300 ${!filterMatch(item.cat) ? "opacity-30" : ""}`}>
              {item.featured && (
                <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4H22l-6.2 4.5L18.2 21 12 16.5 5.8 21l2.4-7.1L2 9.4h7.6z" /></svg>
                  En Cok Satan
                </div>
              )}
              <div className={`relative ${item.featured ? "h-64 lg:h-72" : "h-56"} bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                <svg className={`${item.featured ? "w-16 h-16" : "w-14 h-14"} text-white/60`} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="12" cy="12" r="3" /></svg>
                <div className={`absolute top-3 left-3 ${item.featured ? "w-12 h-12 text-xl" : "w-10 h-10 text-lg"} ${item.badgeBg} text-white font-extrabold rounded-full flex items-center justify-center shadow-lg`}>#{item.rank}</div>
              </div>
              <div className={item.featured ? "p-6" : "p-5"}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-primary-700 bg-primary-50 px-2 py-0.5 rounded-full">{item.cat === "ev" ? "Ev & Yasam" : item.cat === "bakim" ? "Dogal Bakim" : "Aydinlatma"}</span>
                </div>
                <h3 className={`${item.featured ? "text-xl" : "text-lg"} font-bold text-neutral-900 mb-1`}>{item.name}</h3>
                <p className="text-sm text-neutral-400 mb-3">{item.desc}</p>
                <div className="flex items-center gap-1 mb-2">
                  <Stars rating={item.rating} />
                  <span className="text-xs text-neutral-400 ml-1">{item.rating} ({item.reviews} degerlendirme)</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary-700 bg-primary-50 px-2 py-0.5 rounded-full">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                    {item.sold} satildi
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`${item.featured ? "text-2xl" : "text-xl"} font-bold text-primary-600`}>{item.price} TL</span>
                  <button className={`${item.featured ? "px-6 py-2.5" : "px-5 py-2"} bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors`}>Sepete Ekle</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Remaining Products 4-12 */}
      <section className="bg-neutral-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {products.filter((p) => filterMatch(p.cat)).map((p, i) => (
              <div key={p.rank} className="rounded-2xl border border-neutral-100 bg-white overflow-hidden hover:-translate-y-1 hover:shadow-align-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 0.06}s` }}>
                <div className={`relative h-44 bg-gradient-to-br ${p.gradient} flex items-center justify-center`}>
                  <svg className="w-12 h-12 text-white/60" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="12" cy="12" r="3" /></svg>
                  <div className="absolute top-2.5 left-2.5 w-8 h-8 bg-neutral-800 text-white text-sm font-bold rounded-full flex items-center justify-center">{p.rank}</div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-neutral-900 text-sm mb-2">{p.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Stars rating={p.rating} />
                    <span className="text-xs text-neutral-400 ml-1">{p.rating}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary-700 bg-primary-50 px-2 py-0.5 rounded-full">{p.sold} satildi</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary-600">{p.price} TL</span>
                    <button className="px-4 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors">Sepete Ekle</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bu Hafta Yukselenler */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">Bu Hafta Yukselenler</h2>
            <p className="text-sm text-neutral-400">Satislari hizla artan urunler</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {trending.map((p, i) => (
            <div key={i} className="rounded-2xl border border-neutral-100 bg-white overflow-hidden hover:-translate-y-1 hover:shadow-align-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className={`relative h-40 bg-gradient-to-br ${p.gradient} flex items-center justify-center`}>
                <svg className="w-10 h-10 text-white/60" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="12" cy="12" r="3" /></svg>
                <div className="absolute top-2.5 right-2.5 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-lg flex items-center gap-0.5">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M7 17l5-5 5 5M7 7l5 5 5-5" /></svg>
                  %{p.increase}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-neutral-900 text-sm mb-2">{p.name}</h3>
                <div className="flex items-center gap-1.5 mb-3">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  <span className="text-xs font-semibold text-green-600">Bu hafta %{p.increase} artis</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary-600">{p.price} TL</span>
                  <button className="px-4 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors">Sepete Ekle</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
