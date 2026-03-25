"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { showToast } from "@/components/ui/Toast";

const _sb = createClient();

interface PendingReview {
  order_item_id: string;
  product_id: string;
  product_name: string;
  order_id: string;
  order_date: string;
  image_url: string | null;
}

interface CompletedReview {
  id: string;
  product_name: string;
  rating: number;
  comment: string;
  created_at: string;
  image_url: string | null;
}

const gradients = [
  "from-primary-100 to-primary-200",
  "from-amber-100 to-orange-200",
  "from-yellow-200 to-amber-300",
  "from-teal-200 to-cyan-300",
  "from-purple-100 to-pink-200",
  "from-blue-100 to-indigo-200",
];

function StarRating({ rating, onRate, interactive = false }: { rating: number; onRate?: (r: number) => void; interactive?: boolean }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} onClick={() => interactive && onRate?.(star)} className={`${interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"}`}>
          <svg className={`w-5 h-5 ${star <= rating ? "text-yellow-400" : "text-neutral-200"}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState<"pending" | "completed">("pending");
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [pendingReviews, setPendingReviews] = useState<PendingReview[]>([]);
  const [completedReviews, setCompletedReviews] = useState<CompletedReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReviews() {
      const { data: { user } } = await _sb.auth.getUser();
      if (!user) { setLoading(false); return; }

      // Fetch completed reviews
      const { data: reviews } = await _sb
        .from("reviews")
        .select("id, rating, comment, created_at, product_id, product:products(name, product_images(url, is_primary))")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (reviews) {
        setCompletedReviews(
          reviews.map((r: any) => ({
            id: r.id,
            product_name: r.product?.name ?? "Ürün",
            rating: r.rating,
            comment: r.comment ?? "",
            created_at: r.created_at,
            image_url: r.product?.product_images?.find((img: any) => img.is_primary)?.url ?? r.product?.product_images?.[0]?.url ?? null,
          }))
        );
      }

      // Fetch delivered order items that don't have reviews yet
      const reviewedProductIds = (reviews ?? []).map((r: any) => r.product_id);

      const { data: deliveredOrders } = await _sb
        .from("orders")
        .select("id, created_at, order_items(id, product_id, product:products(name, product_images(url, is_primary)))")
        .eq("user_id", user.id)
        .eq("status", "delivered");

      if (deliveredOrders) {
        const pending: PendingReview[] = [];
        for (const order of deliveredOrders) {
          for (const item of (order as any).order_items ?? []) {
            if (!reviewedProductIds.includes(item.product_id)) {
              pending.push({
                order_item_id: item.id,
                product_id: item.product_id,
                product_name: item.product?.name ?? "Ürün",
                order_id: order.id,
                order_date: order.created_at,
                image_url: item.product?.product_images?.find((img: any) => img.is_primary)?.url ?? item.product?.product_images?.[0]?.url ?? null,
              });
            }
          }
        }
        setPendingReviews(pending);
      }

      setLoading(false);
    }
    fetchReviews();
  }, []);

  async function submitReview(item: PendingReview) {
    const rating = ratings[item.order_item_id];
    const comment = comments[item.order_item_id] ?? "";

    if (!rating || rating < 1) {
      showToast("Lütfen bir puan seçin.", "error");
      return;
    }

    setSubmitting(item.order_item_id);

    const { data: { user } } = await _sb.auth.getUser();
    if (!user) {
      showToast("Oturum bulunamadı.", "error");
      setSubmitting(null);
      return;
    }

    const { error } = await _sb
      .from("reviews")
      .insert({
        user_id: user.id,
        product_id: item.product_id,
        order_id: item.order_id,
        rating,
        comment: comment.trim() || null,
      });

    if (error) {
      showToast("Değerlendirme gönderilemedi. Lütfen tekrar deneyin.", "error");
    } else {
      showToast("Değerlendirmeniz başarıyla gönderildi!", "success");
      // Move from pending to completed
      setPendingReviews((prev) => prev.filter((p) => p.order_item_id !== item.order_item_id));
      setCompletedReviews((prev) => [
        {
          id: crypto.randomUUID(),
          product_name: item.product_name,
          rating,
          comment: comment.trim(),
          created_at: new Date().toISOString(),
          image_url: item.image_url,
        },
        ...prev,
      ]);
    }

    setSubmitting(null);
  }

  return (
    <>
    <title>Değerlendirmelerim | enolsun.com</title>
    <meta name="description" content="enolsun.com ürün değerlendirmeleriniz. EN dürüst değerlendirmeler ve EN detaylı yorumlarla diğer müşterilere yol gösterin." />
    <div className="space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">Değerlendirmelerim</h1>

      {/* Tab Pills */}
      <div className="flex gap-2">
        <button onClick={() => setActiveTab("pending")} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[40px] ${activeTab === "pending" ? "bg-primary-600 text-white" : "bg-neutral-50 text-neutral-500 hover:bg-neutral-100"}`}>
          Bekleyenler ({pendingReviews.length})
        </button>
        <button onClick={() => setActiveTab("completed")} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[40px] ${activeTab === "completed" ? "bg-primary-600 text-white" : "bg-neutral-50 text-neutral-500 hover:bg-neutral-100"}`}>
          Yapılanlar ({completedReviews.length})
        </button>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-neutral-100 shadow-align-xs p-4 sm:p-5 animate-pulse">
              <div className="flex gap-3 mb-4">
                <div className="w-16 h-16 rounded-xl bg-neutral-100" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-40 bg-neutral-100 rounded" />
                  <div className="h-3 w-28 bg-neutral-100 rounded" />
                </div>
              </div>
              <div className="h-5 w-28 bg-neutral-100 rounded mb-3" />
              <div className="h-20 bg-neutral-100 rounded-xl" />
            </div>
          ))}
        </div>
      )}

      {!loading && activeTab === "pending" && (
        <div className="space-y-4">
          {pendingReviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm text-neutral-400">Bekleyen değerlendirme bulunmuyor.</p>
            </div>
          ) : (
            pendingReviews.map((item, idx) => (
              <div key={item.order_item_id} className="bg-white rounded-2xl border border-neutral-100 shadow-align-xs p-4 sm:p-5">
                <div className="flex gap-3 mb-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${gradients[idx % gradients.length]} flex items-center justify-center flex-shrink-0 overflow-hidden`}>
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.product_name} className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="12" cy="12" r="3" /></svg>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-900">{item.product_name}</h3>
                    <p className="text-xs text-neutral-400">#{item.order_id.slice(0, 8).toUpperCase()} - {formatDate(item.order_date)}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="text-xs font-medium text-neutral-500 mb-1.5 block">Puanınız</label>
                  <StarRating rating={ratings[item.order_item_id] || 0} onRate={(r) => setRatings((prev) => ({ ...prev, [item.order_item_id]: r }))} interactive />
                </div>

                <div className="mb-3">
                  <label className="text-xs font-medium text-neutral-500 mb-1.5 block">Yorumunuz</label>
                  <textarea rows={3} value={comments[item.order_item_id] || ""} onChange={(e) => setComments((prev) => ({ ...prev, [item.order_item_id]: e.target.value }))} placeholder="EN dürüst değerlendirmenizi paylaşın, EN detaylı yorumlarınız diğer müşterilere yol gösterir..." className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all resize-none" />
                </div>

                <button
                  onClick={() => submitReview(item)}
                  disabled={submitting === item.order_item_id}
                  className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60"
                >
                  {submitting === item.order_item_id ? "Gönderiliyor..." : "Değerlendirmeyi Gönder"}
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {!loading && activeTab === "completed" && (
        <div className="space-y-4">
          {completedReviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm text-neutral-400">Henüz değerlendirme yapmadınız.</p>
            </div>
          ) : (
            completedReviews.map((item, idx) => (
              <div key={item.id} className="bg-white rounded-2xl border border-neutral-100 shadow-align-xs p-4 sm:p-5">
                <div className="flex gap-3 mb-3">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradients[idx % gradients.length]} flex items-center justify-center flex-shrink-0 overflow-hidden`}>
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.product_name} className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-7 h-7 text-white/60" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="12" cy="12" r="3" /></svg>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-900">{item.product_name}</h3>
                    <p className="text-xs text-neutral-400">{formatDate(item.created_at)}</p>
                  </div>
                </div>
                <StarRating rating={item.rating} />
                {item.comment && <p className="text-sm text-neutral-500 mt-2">{item.comment}</p>}
              </div>
            ))
          )}
        </div>
      )}
    </div>
    </>
  );
}
