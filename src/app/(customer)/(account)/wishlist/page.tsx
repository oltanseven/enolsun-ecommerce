"use client";

import { useState } from "react";
import Link from "next/link";

const initialWishlist = [
  { id: 1, name: "El Yapımı Bambu Lamba", price: 899, rating: 4.9, gradient: "from-yellow-200 to-amber-300" },
  { id: 2, name: "Organik Yüz Bakım Seti", price: 449, rating: 4.8, gradient: "from-rose-200 to-pink-300" },
  { id: 3, name: "Doğal Taş Difüzör", price: 349, rating: 4.6, gradient: "from-teal-200 to-cyan-300" },
  { id: 4, name: "Minimalist LED Avize", price: 1299, rating: 4.7, gradient: "from-violet-200 to-purple-300" },
  { id: 5, name: "Ahşap Kesme Tahtası", price: 279, rating: 4.5, gradient: "from-amber-200 to-yellow-300" },
  { id: 6, name: "Pamuk Örgü Battaniye", price: 1199, rating: 4.8, gradient: "from-sky-200 to-blue-300" },
];

export default function WishlistPage() {
  const [items, setItems] = useState(initialWishlist);

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
    <title>Favorilerim | enolsun.com</title>
    <meta name="description" content="enolsun.com favori ürünleriniz. EN sevdiğiniz ürünleri burada toplayın, EN iyi fiyatları kaçırmayın." />
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">Favorilerim</h1>
        <span className="text-sm text-neutral-400">{items.length} ürün</span>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary-50 flex items-center justify-center">
            <svg className="w-10 h-10 text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
          </div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">Favori listeniz boş</h2>
          <p className="text-sm text-neutral-400 mb-6">EN sevdiğin ürünleri burada topla!</p>
          <Link href="/products" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors">Ürünlere Göz At</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-neutral-100 bg-white overflow-hidden hover:-translate-y-1 hover:shadow-align-lg transition-all duration-200">
              <div className={`relative h-44 bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                <svg className="w-12 h-12 text-white/60" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="12" cy="12" r="3" /></svg>
                <button onClick={() => removeItem(item.id)} className="absolute top-2.5 right-2.5 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors shadow-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-neutral-900 text-sm mb-2">{item.name}</h3>
                <div className="flex items-center gap-1 mb-3">
                  <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  <span className="text-xs text-neutral-400">{item.rating}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary-600">{item.price} TL</span>
                  <button className="px-4 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors">Sepete Ekle</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}
