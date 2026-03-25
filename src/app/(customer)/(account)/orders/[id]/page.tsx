"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const _sb = createClient();

interface OrderItem {
  id: string;
  quantity: number;
  unit_price: number;
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
  subtotal: number;
  shipping_cost: number;
  discount_amount: number;
  tracking_number: string | null;
  order_items: OrderItem[];
}

interface StatusEvent {
  status: string;
  created_at: string;
  note: string | null;
}

const statusSteps = [
  { key: "pending", label: "Sipariş Alındı" },
  { key: "preparing", label: "Hazırlanıyor" },
  { key: "shipped", label: "Kargoya Verildi" },
  { key: "in_transit", label: "Dağıtımda" },
  { key: "delivered", label: "Teslim Edildi" },
];

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: "Hazırlanıyor", color: "text-yellow-700 bg-yellow-50" },
  preparing: { label: "Hazırlanıyor", color: "text-yellow-700 bg-yellow-50" },
  shipped: { label: "Kargoda", color: "text-blue-700 bg-blue-50" },
  in_transit: { label: "Dağıtımda", color: "text-blue-700 bg-blue-50" },
  delivered: { label: "Teslim Edildi", color: "text-green-700 bg-green-50" },
  cancelled: { label: "İptal Edildi", color: "text-red-700 bg-red-50" },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

function formatDateTime(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function formatPrice(price: number) {
  return price.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function OrderTrackingPage() {
  const params = useParams();
  const orderId = params.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [statusHistory, setStatusHistory] = useState<StatusEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      if (!orderId) { setLoading(false); return; }

      const { data: { user } } = await _sb.auth.getUser();
      if (!user) { setLoading(false); return; }

      const { data } = await _sb
        .from("orders")
        .select("*, order_items(*, product:products(name, slug, product_images(url, is_primary)))")
        .eq("id", orderId)
        .eq("user_id", user.id)
        .single();

      if (data) {
        setOrder({
          id: data.id,
          created_at: data.created_at,
          status: data.status,
          total: data.total ?? 0,
          subtotal: data.subtotal ?? data.total ?? 0,
          shipping_cost: data.shipping_cost ?? 0,
          discount_amount: data.discount_amount ?? 0,
          tracking_number: data.tracking_number ?? null,
          order_items: (data.order_items ?? []).map((item: any) => ({
            id: item.id,
            quantity: item.quantity,
            unit_price: item.unit_price ?? item.price ?? 0,
            product: item.product,
          })),
        });
      }

      // order_status_history table does not exist; status comes from the order itself
      // statusHistory state will remain empty, and the timeline will fall back
      // to showing order.created_at as the single event.

      setLoading(false);
    }
    fetchOrder();
  }, [orderId]);

  // Determine completed steps based on order status
  function getStepState(stepKey: string) {
    if (!order) return { done: false, active: false };
    const stepOrder = statusSteps.map((s) => s.key);
    const currentIdx = stepOrder.indexOf(order.status);
    const stepIdx = stepOrder.indexOf(stepKey);

    if (currentIdx < 0) return { done: false, active: false };
    if (stepIdx < currentIdx) return { done: true, active: false };
    if (stepIdx === currentIdx) return { done: false, active: true };
    return { done: false, active: false };
  }

  const progressPercent = (() => {
    if (!order) return 0;
    const idx = statusSteps.findIndex((s) => s.key === order.status);
    if (idx < 0) return 0;
    return Math.round((idx / (statusSteps.length - 1)) * 100);
  })();

  // Build timeline from status history or fallback from order dates
  const timeline = statusHistory.length > 0
    ? statusHistory.map((h) => ({
        date: formatDateTime(h.created_at),
        text: statusLabels[h.status]?.label ?? h.status,
        location: h.note ?? "",
      }))
    : order
    ? [{ date: formatDateTime(order.created_at), text: "Sipariş alındı", location: "" }]
    : [];

  if (loading) {
    return (
      <>
        <title>Sipariş Takibi | enolsun.com</title>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-neutral-100 animate-pulse" />
            <div className="space-y-1.5">
              <div className="h-6 w-40 bg-neutral-100 rounded animate-pulse" />
              <div className="h-4 w-28 bg-neutral-100 rounded animate-pulse" />
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-5 sm:p-6 animate-pulse">
            <div className="h-6 w-20 bg-neutral-100 rounded-full mb-6" />
            <div className="flex justify-between">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-neutral-100" />
                  <div className="h-3 w-14 bg-neutral-100 rounded" />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-5 sm:p-6 animate-pulse space-y-4">
            <div className="h-5 w-36 bg-neutral-100 rounded" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-3 h-3 rounded-full bg-neutral-100" />
                <div className="space-y-1 flex-1">
                  <div className="h-3 w-32 bg-neutral-100 rounded" />
                  <div className="h-4 w-48 bg-neutral-100 rounded" />
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-5 sm:p-6 animate-pulse space-y-3">
            <div className="h-5 w-28 bg-neutral-100 rounded" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-neutral-100" />
                  <div className="space-y-1">
                    <div className="h-4 w-40 bg-neutral-100 rounded" />
                    <div className="h-3 w-16 bg-neutral-100 rounded" />
                  </div>
                </div>
                <div className="h-4 w-20 bg-neutral-100 rounded" />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (!order) {
    return (
      <>
        <title>Sipariş Bulunamadı | enolsun.com</title>
        <div className="text-center py-16">
          <h1 className="text-lg font-bold text-neutral-900 mb-2">Sipariş bulunamadı</h1>
          <p className="text-sm text-neutral-400 mb-4">Bu sipariş mevcut değil veya erişim yetkiniz yok.</p>
          <Link href="/orders" className="text-sm font-medium text-primary-600 hover:text-primary-700">Siparişlerime Dön</Link>
        </div>
      </>
    );
  }

  const currentStatus = statusLabels[order.status] ?? { label: order.status, color: "text-neutral-700 bg-neutral-50" };

  return (
    <>
    <title>Sipariş Takibi | enolsun.com</title>
    <meta name="description" content="enolsun.com sipariş takibi. Siparişinizin EN güncel durumunu anlık olarak takip edin, kargo hareketlerini izleyin." />
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/orders" className="p-2 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">Sipariş Takibi</h1>
          <p className="text-sm text-neutral-400">#{order.id.slice(0, 8).toUpperCase()}</p>
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-5 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${currentStatus.color}`}>{currentStatus.label}</span>
          {order.tracking_number && (
            <span className="text-xs text-neutral-400">Takip No: {order.tracking_number}</span>
          )}
        </div>

        {/* Steps */}
        <div className="flex items-start justify-between relative">
          {statusSteps.map((step, i) => {
            const state = getStepState(step.key);
            // Find date from history
            const historyEntry = statusHistory.find((h) => h.status === step.key);
            const stepDate = historyEntry ? new Date(historyEntry.created_at).toLocaleDateString("tr-TR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "";

            return (
              <div key={i} className="flex flex-col items-center text-center relative z-10 flex-1">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-2 ${state.done ? "bg-primary-500 text-white" : state.active ? "bg-primary-100 border-2 border-primary-500 text-primary-600" : "bg-neutral-100 text-neutral-400 border border-neutral-200"}`}>
                  {state.done ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  ) : state.active ? (
                    <div className="w-3 h-3 rounded-full bg-primary-500 animate-pulse"></div>
                  ) : (
                    <span className="text-xs font-medium">{i + 1}</span>
                  )}
                </div>
                <p className={`text-[10px] sm:text-xs font-medium ${state.done || state.active ? "text-neutral-800" : "text-neutral-400"}`}>{step.label}</p>
                {stepDate && <p className="text-[9px] sm:text-[10px] text-neutral-400 mt-0.5">{stepDate}</p>}
              </div>
            );
          })}
          {/* Progress line */}
          <div className="absolute top-4 sm:top-5 left-[10%] right-[10%] h-0.5 bg-neutral-200 -z-0">
            <div className="h-full bg-primary-500 rounded-full" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
      </div>

      {/* Cargo Timeline */}
      {timeline.length > 0 && (
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-5 sm:p-6">
          <h2 className="text-base font-bold text-neutral-900 mb-5">Kargo Hareketleri</h2>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-4 relative">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${i === 0 ? "bg-primary-500 ring-4 ring-primary-100" : "bg-neutral-200"}`}></div>
                  {i < timeline.length - 1 && <div className="w-0.5 flex-1 bg-neutral-100 my-1"></div>}
                </div>
                <div className="pb-6">
                  <p className="text-xs text-neutral-400 mb-0.5">{item.date}</p>
                  <p className={`text-sm font-medium ${i === 0 ? "text-neutral-900" : "text-neutral-600"}`}>{item.text}</p>
                  {item.location && <p className="text-xs text-neutral-400 mt-0.5">{item.location}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Order Details */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-5 sm:p-6">
        <h2 className="text-base font-bold text-neutral-900 mb-5">Sipariş Detayı</h2>
        <div className="space-y-3">
          {order.order_items.map((item) => {
            const primaryImage = item.product?.product_images?.find((img) => img.is_primary)?.url ?? item.product?.product_images?.[0]?.url;

            return (
              <div key={item.id} className="flex items-center justify-between py-3 border-b border-neutral-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {primaryImage ? (
                      <img src={primaryImage} alt={item.product?.name ?? ""} className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="12" cy="12" r="3" /></svg>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-800">{item.product?.name ?? "Ürün"}</p>
                    <p className="text-xs text-neutral-400">Adet: {item.quantity}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-neutral-800">{formatPrice(item.unit_price * item.quantity)} TL</span>
              </div>
            );
          })}
        </div>
        <div className="border-t border-neutral-100 mt-4 pt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-neutral-500">Ara Toplam</span>
            <span className="text-neutral-800">{formatPrice(order.subtotal)} TL</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-neutral-500">Kargo</span>
            <span className={order.shipping_cost === 0 ? "text-green-600" : "text-neutral-800"}>
              {order.shipping_cost === 0 ? "Ücretsiz" : `${formatPrice(order.shipping_cost)} TL`}
            </span>
          </div>
          {order.discount_amount > 0 && (
            <div className="flex justify-between text-sm mb-1">
              <span className="text-primary-600">Kupon İndirimi</span>
              <span className="text-primary-600">-{formatPrice(order.discount_amount)} TL</span>
            </div>
          )}
          <div className="flex justify-between text-base font-bold mt-3 pt-3 border-t border-neutral-100">
            <span className="text-neutral-900">Toplam</span>
            <span className="text-neutral-900">{formatPrice(order.total)} TL</span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
