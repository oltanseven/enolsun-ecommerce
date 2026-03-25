"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [notifications, setNotifications] = useState({ email: true, sms: false, push: true });

  return (
    <>
    <title>Profil Bilgilerim | enolsun.com</title>
    <meta name="description" content="enolsun.com profil bilgilerinizi güncelleyin. Kişisel bilgiler, adresler ve bildirim tercihlerinizi EN kolay şekilde yönetin." />
    <div className="space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">Profil Bilgilerim</h1>


      {/* Personal Info */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-5 sm:p-6">
        <h2 className="text-base font-bold text-neutral-900 mb-5">Kişisel Bilgiler</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">Ad</label>
            <input type="text" defaultValue="Emre" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all" />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">Soyad</label>
            <input type="text" defaultValue="Yilmaz" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all" />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">E-posta</label>
            <input type="email" defaultValue="emre@enolsun.com" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all" />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">Telefon</label>
            <input type="tel" defaultValue="+90 532 555 0456" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all" />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">Doğum Tarihi</label>
            <input type="date" defaultValue="1990-05-15" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all" />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">Cinsiyet</label>
            <select className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all bg-white">
              <option>Erkek</option>
              <option>Kadın</option>
              <option>Belirtmek İstemiyorum</option>
            </select>
          </div>
        </div>
        <button className="mt-5 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors">Kaydet</button>
      </div>

      {/* Password Change */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-5 sm:p-6">
        <h2 className="text-base font-bold text-neutral-900 mb-5">Şifre Değiştir</h2>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">Mevcut Şifre</label>
            <input type="password" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all" />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">Yeni Şifre</label>
            <input type="password" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all" />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">Yeni Şifre (Tekrar)</label>
            <input type="password" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all" />
          </div>
          <button className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors">Şifreyi Güncelle</button>
        </div>
      </div>

      {/* Addresses */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-neutral-900">Adreslerim</h2>
          <button className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">+ Yeni Adres</button>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border-2 border-primary-500 bg-primary-25 relative">
            <span className="absolute top-2 right-2 text-[10px] font-semibold text-primary-700 bg-primary-100 px-2 py-0.5 rounded-full">Varsayılan</span>
            <p className="text-sm font-semibold text-neutral-800 mb-1">Ev Adresi</p>
            <p className="text-xs text-neutral-500 leading-relaxed">Levent Mah. Buyukdere Cad. No:185 K:12, Sisli, Istanbul 34394</p>
            <div className="flex gap-3 mt-3">
              <button className="text-xs font-medium text-primary-600 hover:text-primary-700">Düzenle</button>
              <button className="text-xs font-medium text-red-500 hover:text-red-600">Sil</button>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-neutral-200">
            <p className="text-sm font-semibold text-neutral-800 mb-1">İş Adresi</p>
            <p className="text-xs text-neutral-500 leading-relaxed">Maslak Mah. Ahi Evran Cad. No:6/1, Sariyer, Istanbul 34398</p>
            <div className="flex gap-3 mt-3">
              <button className="text-xs font-medium text-primary-600 hover:text-primary-700">Düzenle</button>
              <button className="text-xs font-medium text-red-500 hover:text-red-600">Sil</button>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-5 sm:p-6">
        <h2 className="text-base font-bold text-neutral-900 mb-5">Bildirim Tercihleri</h2>
        <div className="space-y-4">
          {[
            { key: "email" as const, label: "E-posta Bildirimleri", desc: "Kampanya ve sipariş bildirimleri" },
            { key: "sms" as const, label: "SMS Bildirimleri", desc: "Kargo ve sipariş güncellemeleri" },
            { key: "push" as const, label: "Push Bildirimleri", desc: "Anlık bildirimler" },
          ].map((n) => (
            <div key={n.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-800">{n.label}</p>
                <p className="text-xs text-neutral-400">{n.desc}</p>
              </div>
              <button onClick={() => setNotifications((prev) => ({ ...prev, [n.key]: !prev[n.key] }))} className={`relative w-11 h-6 rounded-full transition-colors ${notifications[n.key] ? "bg-primary-500" : "bg-neutral-200"}`}>
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${notifications[n.key] ? "translate-x-5" : "translate-x-0"}`}></span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
