"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { showToast } from "@/components/ui/Toast";

const _sb = createClient();

interface SavedCard {
  id: string;
  last_four: string;
  card_brand: string;
  is_default: boolean;
}

export default function CardsPage() {
  const [cards, setCards] = useState<SavedCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ number: "" });

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
          last_four: c.last_four,
          card_brand: (c.card_brand ?? "VISA").toUpperCase(),
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
    if (!formData.number) {
      showToast("Lütfen tüm alanları doldurun.", "error");
      return;
    }

    setSaving(true);
    const { data: { user } } = await _sb.auth.getUser();
    if (!user) { setSaving(false); return; }

    const cleanNumber = formData.number.replace(/\s/g, "");
    const last_four = cleanNumber.slice(-4);

    // Detect brand
    let card_brand = "visa";
    if (cleanNumber.startsWith("5")) card_brand = "mastercard";
    else if (cleanNumber.startsWith("3")) card_brand = "amex";
    else if (cleanNumber.startsWith("9") || cleanNumber.startsWith("65")) card_brand = "troy";

    const { error } = await _sb.from("saved_cards").insert({
      user_id: user.id,
      last_four,
      card_brand,
      is_default: cards.length === 0,
    });

    setSaving(false);

    if (error) {
      showToast("Kart eklenemedi.", "error");
    } else {
      showToast("Kart başarıyla eklendi.", "success");
      setFormData({ number: "" });
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
      {/* Security Info */}
      <div className="flex items-start gap-3 p-4 bg-primary-25 border border-primary-100 rounded-xl">
        <svg className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>
        <p className="text-xs text-primary-700">Kart bilgileriniz güvenli şekilde saklanır. Ödeme işlemleri için tam kart bilgileri ödeme sayfasında girilecektir.</p>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-5 sm:p-6 animate-fade-in-up">
          <h2 className="text-base font-bold text-neutral-900 mb-5">Yeni Kart Ekle</h2>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-1.5">Kart Numarasi</label>
              <input type="text" value={formData.number} onChange={(e) => setFormData((p) => ({ ...p, number: e.target.value }))} placeholder="0000 0000 0000 0000" maxLength={19} className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all tabular-nums" />
              <p className="text-xs text-neutral-400 mt-1">Sadece son 4 hane ve kart markası kaydedilir.</p>
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
            <div key={card.id} className={`relative rounded-2xl p-5 overflow-hidden group hover:-translate-y-1 hover:shadow-align-lg transition-all duration-300 ${card.card_brand === "VISA" ? "bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800" : card.card_brand === "TROY" ? "bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800" : "bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-900"}`}>
              {card.is_default && (
                <span className="absolute top-3 right-3 text-[10px] font-semibold text-white/80 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">Varsayilan</span>
              )}
              <div className="mb-8">
                <span className="text-xs font-bold text-white/60 tracking-widest">{card.card_brand}</span>
              </div>
              <div className="mb-6">
                <p className="text-lg font-mono text-white tracking-[0.2em] tabular-nums">**** **** **** {card.last_four}</p>
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
