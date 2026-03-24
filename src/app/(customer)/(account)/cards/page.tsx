"use client";

import { useState } from "react";

const savedCards = [
  { id: 1, last4: "4589", brand: "VISA", holder: "EMRE YILMAZ", expires: "12/26", isDefault: true },
  { id: 2, last4: "7823", brand: "MASTERCARD", holder: "EMRE YILMAZ", expires: "08/25", isDefault: false },
];

export default function CardsPage() {
  const [cards, setCards] = useState(savedCards);
  const [showForm, setShowForm] = useState(false);

  const removeCard = (id: number) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const setDefault = (id: number) => {
    setCards((prev) => prev.map((c) => ({ ...c, isDefault: c.id === id })));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">Kartlarim</h1>
        <button onClick={() => setShowForm(!showForm)} className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
          {showForm ? "Iptal" : "+ Yeni Kart"}
        </button>
      </div>

      {/* Add Card Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-5 sm:p-6 animate-fade-in-up">
          <h2 className="text-base font-bold text-neutral-900 mb-5">Yeni Kart Ekle</h2>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-1.5">Kart Uzerindeki Isim</label>
              <input type="text" placeholder="EMRE YILMAZ" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all uppercase" />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-1.5">Kart Numarasi</label>
              <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all tabular-nums" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1.5">Son Kullanma</label>
                <input type="text" placeholder="AA/YY" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1.5">CVV</label>
                <input type="text" placeholder="000" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all" />
              </div>
            </div>
            <button onClick={() => setShowForm(false)} className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors">Karti Kaydet</button>
          </div>
        </div>
      )}

      {/* Saved Cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {cards.map((card) => (
          <div key={card.id} className={`relative rounded-2xl p-5 overflow-hidden group hover:-translate-y-1 hover:shadow-align-lg transition-all duration-300 ${card.brand === "VISA" ? "bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800" : "bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-900"}`}>
            {card.isDefault && (
              <span className="absolute top-3 right-3 text-[10px] font-semibold text-white/80 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">Varsayilan</span>
            )}
            <div className="mb-8">
              <span className="text-xs font-bold text-white/60 tracking-widest">{card.brand}</span>
            </div>
            <div className="mb-6">
              <p className="text-lg font-mono text-white tracking-[0.2em] tabular-nums">**** **** **** {card.last4}</p>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] text-white/50 mb-0.5">Kart Sahibi</p>
                <p className="text-xs font-medium text-white">{card.holder}</p>
              </div>
              <div>
                <p className="text-[10px] text-white/50 mb-0.5">Son Kullanma</p>
                <p className="text-xs font-medium text-white">{card.expires}</p>
              </div>
            </div>
            <div className="flex gap-3 mt-4 pt-3 border-t border-white/10">
              {!card.isDefault && (
                <button onClick={() => setDefault(card.id)} className="text-xs font-medium text-white/70 hover:text-white transition-colors">Varsayilan Yap</button>
              )}
              <button onClick={() => removeCard(card.id)} className="text-xs font-medium text-red-300 hover:text-red-200 transition-colors">Sil</button>
            </div>
          </div>
        ))}
      </div>

      {cards.length === 0 && !showForm && (
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-neutral-50 flex items-center justify-center">
            <svg className="w-10 h-10 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg>
          </div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">Kayitli kart yok</h2>
          <p className="text-sm text-neutral-400">Hizli odeme icin kart ekleyin.</p>
        </div>
      )}
    </div>
  );
}
