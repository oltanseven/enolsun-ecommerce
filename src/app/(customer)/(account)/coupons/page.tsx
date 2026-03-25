"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

const _sb = createClient();

const tabs = ["Aktif", "Kullanılmış", "Süresi Dolmuş"];

const promotionalCoupons = [
  { code: "HOSGELDIN", discount: "%10 İndirim", minOrder: "100 TL", expires: "31 Mart 2024", status: "Aktif", description: "EN özel hoş geldin fırsatı" },
  { code: "BAHAR2024", discount: "50 TL İndirim", minOrder: "300 TL", expires: "15 Nisan 2024", status: "Aktif", description: "EN güzel bahar kampanyası" },
  { code: "UCRETSIZ", discount: "Ücretsiz Kargo", minOrder: "0 TL", expires: "30 Mart 2024", status: "Aktif", description: "Tüm siparişlerde EN hızlı teslimat" },
];

interface Coupon {
  code: string;
  discount: string;
  minOrder: string;
  expires: string;
  status: string;
  description: string;
}

function mapCouponStatus(usedAt: string | null, expiresAt: string | null): string {
  if (usedAt) return "Kullanılmış";
  if (expiresAt && new Date(expiresAt) < new Date()) return "Süresi Dolmuş";
  return "Aktif";
}

function formatDiscount(type: string, value: number): string {
  if (type === "percentage") return `%${value} İndirim`;
  if (type === "free_shipping") return "Ücretsiz Kargo";
  return `${value.toLocaleString("tr-TR")} TL İndirim`;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

export default function CouponsPage() {
  const [activeTab, setActiveTab] = useState("Aktif");
  const [couponInput, setCouponInput] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCoupons() {
      const { data: { user } } = await _sb.auth.getUser();
      if (!user) {
        setCoupons(promotionalCoupons);
        setLoading(false);
        return;
      }

      const { data } = await _sb
        .from("user_coupons")
        .select("*, coupon:coupons(*)")
        .eq("user_id", user.id);

      if (data && data.length > 0) {
        const mapped: Coupon[] = data.map((uc: any) => ({
          code: uc.coupon?.code ?? uc.coupon_code ?? "",
          discount: formatDiscount(uc.coupon?.discount_type ?? "fixed", uc.coupon?.discount_value ?? 0),
          minOrder: uc.coupon?.min_order_amount ? `${uc.coupon.min_order_amount.toLocaleString("tr-TR")} TL` : "0 TL",
          expires: formatDate(uc.coupon?.expires_at ?? null),
          status: mapCouponStatus(uc.used_at, uc.coupon?.expires_at),
          description: uc.coupon?.description ?? "",
        }));
        setCoupons(mapped);
      } else {
        setCoupons(promotionalCoupons);
      }
      setLoading(false);
    }
    fetchCoupons();
  }, []);

  const filtered = coupons.filter((c) => c.status === activeTab);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <>
    <title>Kuponlarım | enolsun.com — EN İyi Fırsatlar</title>
    <meta name="description" content="enolsun.com kuponlarınız. EN iyi fırsatları ve EN özel indirim kodlarını kullanarak alışverişte EN çok tasarruf edin." />
    <div className="space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">Kuponlarım</h1>

      {/* Coupon Input */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-4 sm:p-5">
        <label className="text-sm font-medium text-neutral-700 mb-2 block">Kupon Kodu Ekle</label>
        <div className="flex gap-2">
          <input type="text" value={couponInput} onChange={(e) => setCouponInput(e.target.value)} placeholder="Kupon kodunuzu girin" className="flex-1 px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all min-h-[44px]" />
          <button className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors min-h-[44px]">Ekle</button>
        </div>
      </div>

      {/* Tab Pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors min-h-[40px] ${activeTab === tab ? "bg-primary-600 text-white" : "bg-neutral-50 text-neutral-500 hover:bg-neutral-100"}`}>{tab}</button>
        ))}
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-neutral-100 shadow-align-xs p-4 sm:p-5 animate-pulse">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-32 bg-neutral-100 rounded" />
                  <div className="h-3 w-48 bg-neutral-100 rounded" />
                  <div className="h-3 w-24 bg-neutral-100 rounded" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-9 w-28 bg-neutral-100 rounded-lg" />
                  <div className="h-9 w-16 bg-neutral-100 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Coupon Cards */}
      {!loading && (
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm text-neutral-400">Bu kategoride kupon bulunmuyor. EN iyi fırsatlar için takipte kalın!</p>
            </div>
          ) : (
            filtered.map((coupon, i) => (
              <div key={i} className={`bg-white rounded-2xl border shadow-align-xs p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 ${coupon.status === "Aktif" ? "border-primary-200" : "border-neutral-100 opacity-60"}`}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base font-bold text-neutral-900">{coupon.discount}</span>
                    {coupon.status === "Aktif" && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold text-green-700 bg-green-50">Aktif</span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 mb-1">{coupon.description}</p>
                  <div className="flex items-center gap-3 text-xs text-neutral-400">
                    <span>Min: {coupon.minOrder}</span>
                    <span>Son: {coupon.expires}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-4 py-2 bg-neutral-50 border border-dashed border-neutral-300 rounded-lg text-sm font-mono font-bold text-neutral-700 tracking-wider">{coupon.code}</div>
                  {coupon.status === "Aktif" && (
                    <button onClick={() => copyCode(coupon.code)} className="px-3 py-2 text-xs font-semibold text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors min-h-[40px]">
                      {copiedCode === coupon.code ? "Kopyalandı!" : "Kopyala"}
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
    </>
  );
}
