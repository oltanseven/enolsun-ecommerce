"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { showToast } from "@/components/ui/Toast";

const _sb = createClient();

export default function ProfilePage() {
  const [notifications, setNotifications] = useState({ email: true, sms: false, push: true });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("Belirtmek İstemiyorum");

  useEffect(() => {
    async function fetchProfile() {
      const { data: { user } } = await _sb.auth.getUser();
      if (!user) { setLoading(false); return; }

      setEmail(user.email ?? "");

      const { data: profile } = await _sb
        .from("profiles")
        .select("full_name, phone, birth_date, gender")
        .eq("id", user.id)
        .single();

      if (profile) {
        const parts = (profile.full_name ?? "").split(" ");
        setFirstName(parts[0] ?? "");
        setLastName(parts.slice(1).join(" ") ?? "");
        setPhone(profile.phone ?? "");
        setBirthDate(profile.birth_date ?? "");
        setGender(profile.gender ?? "Belirtmek İstemiyorum");
      }
      setLoading(false);
    }
    fetchProfile();
  }, []);

  async function handleSave() {
    setSaving(true);
    const { data: { user } } = await _sb.auth.getUser();
    if (!user) { setSaving(false); return; }

    const fullName = [firstName.trim(), lastName.trim()].filter(Boolean).join(" ");

    const { error } = await _sb
      .from("profiles")
      .update({
        full_name: fullName,
        phone: phone.trim(),
        birth_date: birthDate || null,
        gender,
      })
      .eq("id", user.id);

    setSaving(false);
    if (error) {
      showToast("Profil kaydedilirken bir hata oluştu.", "error");
    } else {
      showToast("Profil bilgileriniz başarıyla güncellendi.", "success");
    }
  }

  if (loading) {
    return (
      <>
        <title>Profil Bilgilerim | enolsun.com</title>
        <div className="space-y-6">
          <div className="h-8 w-48 bg-neutral-100 rounded-lg animate-pulse" />
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-5 sm:p-6 space-y-5">
            <div className="h-5 w-36 bg-neutral-100 rounded animate-pulse" />
            <div className="grid sm:grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="h-3 w-16 bg-neutral-100 rounded animate-pulse" />
                  <div className="h-10 bg-neutral-100 rounded-xl animate-pulse" />
                </div>
              ))}
            </div>
            <div className="h-10 w-24 bg-neutral-100 rounded-xl animate-pulse" />
          </div>
        </div>
      </>
    );
  }

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
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all" />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">Soyad</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all" />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">E-posta</label>
            <input type="email" value={email} disabled className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl bg-neutral-50 text-neutral-400 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">Telefon</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all" />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">Doğum Tarihi</label>
            <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all" />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">Cinsiyet</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all bg-white">
              <option>Erkek</option>
              <option>Kadın</option>
              <option>Belirtmek İstemiyorum</option>
            </select>
          </div>
        </div>
        <button onClick={handleSave} disabled={saving} className="mt-5 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60">
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </button>
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
