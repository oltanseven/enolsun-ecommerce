"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { showToast } from "@/components/ui/Toast";

const _sb = createClient();

interface SavedCard {
  id: string;
  last4: string;
  brand: string;
  holder: string;
  expires: string;
  is_default: boolean;
}

export default function CardsPage() {
  const [cards, setCards] = useState<SavedCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ holder: "", number: "", expiry: "", cvv: "" });

  useEffect(() => {
    fetchCards();
  }, []);

  async function fetchCards() {
    const { data: { user } } = await _sb.auth.getUser();
    if (!user) { setLoading(false); return; }

    const { data } = await _sb
      .from("saved_cards")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });

    if (data) {
      setCards(
        data.map((c: any) => ({
          id: c.id,
          last4: c.last4,
          brand: (c.brand ?? "VISA").toUpperCase(),
          holder: c.holder_name ?? c.holder ?? "",
          expires: c.expiry_month && c.expiry_year
            ? `${String(c.expiry_month).padStart(2, "0")}/${String(c.expiry_year).slice(-2)}`
            : c.expires ?? "",
          is_default: c.is_default ?? false,
        }))
      );
    }
    setLoading(false);
  }

  async function removeCard(id: string) {
    const { error } = await _sb.from("saved_cards").delete().eq("id", id);
    if (error) {
      showToast("Kart silinemedi.", "error");
    } else {
      setCards((prev) => prev.filter((c) => c.id !== id));
      showToast("Kart silindi.", "success");
    }
  }

  async function setDefault(id: string) {
    const { data: { user } } = await _sb.auth.getUser();
    if (!user) return;

    // Remove default from all, then set new default
    await _sb.from("saved_cards").update({ is_default: false }).eq("user_id", user.id);
    const { error } = await _sb.from("saved_cards").update({ is_default: true }).eq("id", id);

    if (error) {
      showToast("Varsayılan kart güncellenemedi.", "error");
    } else {
      setCards((prev) => prev.map((c) => ({ ...c, is_default: c.id === id })));
      showToast("Varsayılan kart güncellendi.", "success");
    }
  }

  async function handleAddCard() {
    if (!formData.holder || !formData.number || !formData.expiry || !formData.cvv) {
      showToast("Lütfen tüm alanları doldurun.", "error");
      return;
    }

    setSaving(true);
    const { data: { user } } = await _sb.auth.getUser();
    if (!user) { setSaving(false); return; }

    const cleanNumber = formData.number.replace(/\s/g, "");
    const last4 = cleanNumber.slice(-4);
    const [expMonth, expYear] = formData.expiry.split("/");

    // Detect brand
    let brand = "VISA";
    if (cleanNumber.startsWith("5")) brand = "MASTERCARD";
    else if (cleanNumber.startsWith("3")) brand = "AMEX";
    else if (cleanNumber.startsWith("9") || cleanNumber.startsWith("65")) brand = "TROY";

    const { error } = await _sb.from("saved_cards").insert({
      user_id: user.id,
      last4,
      brand: brand.toLowerCase(),
      holder_name: formData.holder.toUpperCase(),
      expiry_month: parseInt(expMonth),
      expiry_year: parseInt(expYear.length === 2 ? `20${expYear}` : expYear),
      is_default: cards.length === 0,
    });

    setSaving(false);

    if (error) {
      showToast("Kart eklenemedi.", "error");
    } else {
      showToast("Kart başarıyla eklendi.", "success");
      setFormData({ holder: "", number: "", expiry: "", cvv: "" });
      setShowForm(false);
      fetchCards();
    }
  }

  return (
    <>
    <title>Kayıtlı Kartlarım | enolsun.com — EN Güvenli Ödeme</title>
    <meta name="description" content="enolsun.com kayıtlı kartlarınız. 256-bit SSL şifreleme ile EN güvenli ödeme deneyimi. Kartlarınızı güvenle saklayın." />
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">Kayıtlı Kartlarım</h1>
        <button onClick={() => setShowForm(!showForm)} className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
          {showForm ? "İptal" : "+ Yeni Kart"}
        </button>
      </div>

      {/* Add Card Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-5 sm:p-6 animate-fade-in-up">
          <h2 className="text-base font-bold text-neutral-900 mb-5">Yeni Kart Ekle</h2>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-1.5">Kart Üzerindeki İsim</label>
              <input type="text" value={formData.holder} onChange={(e) => setFormData((p) => ({ ...p, holder: e.target.value }))} placeholder="AD SOYAD" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all uppercase" />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-1.5">Kart Numarası</label>
              <input type="text" value={formData.number} onChange={(e) => setFormData((p) => ({ ...p, number: e.target.value }))} placeholder="0000 0000 0000 0000" maxLength={19} className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all tabular-nums" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1.5">Son Kullanma</label>
                <input type="text" value={formData.expiry} onChange={(e) => setFormData((p) => ({ ...p, expiry: e.target.value }))} placeholder="AA/YY" maxLength={5} className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1.5">CVV</label>
                <input type="text" value={formData.cvv} onChange={(e) => setFormData((p) => ({ ...p, cvv: e.target.value }))} placeholder="000" maxLength={4} className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all" />
              </div>
            </div>
            <button onClick={handleAddCard} disabled={saving} className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60">
              {saving ? "Kaydediliyor..." : "Kartı Kaydet"}
            </button>
          </div>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid sm:grid-cols-2 gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="rounded-2xl p-5 bg-gradient-to-br from-neutral-200 to-neutral-300 animate-pulse h-48" />
          ))}
        </div>
      )}

      {/* Saved Cards */}
      {!loading && cards.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-4">
          {cards.map((card) => (
            <div key={card.id} className={`relative rounded-2xl p-5 overflow-hidden group hover:-translate-y-1 hover:shadow-align-lg transition-all duration-300 ${card.brand === "VISA" ? "bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800" : card.brand === "TROY" ? "bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800" : "bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-900"}`}>
              {card.is_default && (
                <span className="absolute top-3 right-3 text-[10px] font-semibold text-white/80 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">Varsayılan</span>
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
                {!card.is_default && (
                  <button onClick={() => setDefault(card.id)} className="text-xs font-medium text-white/70 hover:text-white transition-colors">Varsayılan Yap</button>
                )}
                <button onClick={() => removeCard(card.id)} className="text-xs font-medium text-red-300 hover:text-red-200 transition-colors">Sil</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && cards.length === 0 && !showForm && (
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-neutral-50 flex items-center justify-center">
            <svg className="w-10 h-10 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg>
          </div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">Kayıtlı kart yok</h2>
          <p className="text-sm text-neutral-400">EN güvenli ödeme için kartınızı ekleyin. 256-bit SSL şifreleme ile korunur.</p>
        </div>
      )}
    </div>
    </>
  );
}
