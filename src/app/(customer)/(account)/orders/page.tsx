"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const _sb = createClient();

const tabs = ["Tümü", "Hazırlanıyor", "Kargoda", "Teslim Edildi", "İptal"];

const statusMap: Record<string, { label: string; color: string }> = {
  pending: { label: "Hazırlanıyor", color: "text-yellow-700 bg-yellow-50" },
  preparing: { label: "Hazırlanıyor", color: "text-yellow-700 bg-yellow-50" },
  shipped: { label: "Kargoda", color: "text-blue-700 bg-blue-50" },
  delivered: { label: "Teslim Edildi", color: "text-green-700 bg-green-50" },
  cancelled: { label: "İptal", color: "text-red-700 bg-red-50" },
};

interface OrderItem {
  id: string;
  quantity: number;
  product: {
    name: string;
    slug: string;
    product_images: { url: string; is_primary: boolean }[];
  } | null;
}

interface Order {
  id: string;
  created_at: string;
  status: string;
  total: number;
  order_items: OrderItem[];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatPrice(price: number) {
  return price.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("Tümü");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      const { data: { user } } = await _sb.auth.getUser();
      if (!user) { setLoading(false); return; }

      const { data } = await _sb
        .from("orders")
        .select("*, order_items(*, product:products(name, slug, product_images(url, is_primary)))")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setOrders((data as Order[]) ?? []);
      setLoading(false);
    }
    fetchOrders();
  }, []);

  const filtered = activeTab === "Tümü"
    ? orders
    : orders.filter((o) => {
        const mapped = statusMap[o.status];
        return mapped?.label === activeTab;
      });

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

      {/* Loading Skeleton */}
      {loading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-neutral-100 shadow-align-xs p-4 sm:p-5 animate-pulse">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100" />
                  <div className="space-y-1.5">
                    <div className="h-4 w-32 bg-neutral-100 rounded" />
                    <div className="h-3 w-24 bg-neutral-100 rounded" />
                  </div>
                </div>
                <div className="h-6 w-20 bg-neutral-100 rounded-full" />
              </div>
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-3 w-14 bg-neutral-100 rounded" />
                  <div className="h-4 w-20 bg-neutral-100 rounded" />
                </div>
                <div className="h-4 w-12 bg-neutral-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-xs p-10 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-neutral-50 flex items-center justify-center">
            <svg className="w-8 h-8 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
          </div>
          <p className="text-sm font-semibold text-neutral-700 mb-1">Sipariş bulunamadı</p>
          <p className="text-xs text-neutral-400">
            {activeTab === "Tümü" ? "Henüz bir siparişiniz bulunmuyor." : `"${activeTab}" durumunda sipariş yok.`}
          </p>
        </div>
      )}

      {/* Order Cards */}
      {!loading && filtered.length > 0 && (
        <div className="space-y-4">
          {filtered.map((order) => {
            const status = statusMap[order.status] ?? { label: order.status, color: "text-neutral-700 bg-neutral-50" };
            const itemCount = order.order_items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

            return (
              <div key={order.id} className="bg-white rounded-2xl border border-neutral-100 shadow-align-xs p-4 sm:p-5 hover:shadow-align-sm transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">#{order.id.slice(0, 8).toUpperCase()}</p>
                      <p className="text-xs text-neutral-400">{formatDate(order.created_at)}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${status.color}`}>{status.label}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                  <div className="flex items-center gap-4 text-xs text-neutral-500">
                    <span>{itemCount} ürün</span>
                    <span className="font-semibold text-neutral-800">{formatPrice(order.total)} TL</span>
                  </div>
                  <Link href={`/orders/${order.id}`} className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
                    Detay
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
    </>
  );
}
