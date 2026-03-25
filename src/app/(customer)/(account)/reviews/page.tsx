"use client";

import { useState } from "react";

const pendingReviews = [
  { id: 1, name: "Premium Organik Pamuklu T-Shirt", orderId: "ORD-2024-1847", date: "22 Mart 2024", gradient: "from-primary-100 to-primary-200" },
  { id: 2, name: "El Yapimi Seramik Kahve Fincani Seti", orderId: "ORD-2024-1847", date: "22 Mart 2024", gradient: "from-amber-100 to-orange-200" },
];

const completedReviews = [
  { id: 3, name: "El Yapımı Bambu Lamba", rating: 5, comment: "Harika kalitede, çok memnun kaldım. Tasarımı görseldeki gibi, hatta daha güzel.", date: "18 Mart 2024", gradient: "from-yellow-200 to-amber-300" },
  { id: 4, name: "Doğal Taş Difüzör", rating: 4, comment: "Güzel ürün, kokusu çok hoş. Sadece ambalajlama biraz daha özenli olabilirdi.", date: "12 Mart 2024", gradient: "from-teal-200 to-cyan-300" },
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

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState<"pending" | "completed">("pending");
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [comments, setComments] = useState<Record<number, string>>({});

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

      {activeTab === "pending" && (
        <div className="space-y-4">
          {pendingReviews.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-neutral-100 shadow-align-xs p-4 sm:p-5">
              <div className="flex gap-3 mb-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0`}>
                  <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="12" cy="12" r="3" /></svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900">{item.name}</h3>
                  <p className="text-xs text-neutral-400">{item.orderId} - {item.date}</p>
                </div>
              </div>

              <div className="mb-3">
                <label className="text-xs font-medium text-neutral-500 mb-1.5 block">Puanınız</label>
                <StarRating rating={ratings[item.id] || 0} onRate={(r) => setRatings((prev) => ({ ...prev, [item.id]: r }))} interactive />
              </div>

              <div className="mb-3">
                <label className="text-xs font-medium text-neutral-500 mb-1.5 block">Yorumunuz</label>
                <textarea rows={3} value={comments[item.id] || ""} onChange={(e) => setComments((prev) => ({ ...prev, [item.id]: e.target.value }))} placeholder="EN dürüst değerlendirmenizi paylaşın, EN detaylı yorumlarınız diğer müşterilere yol gösterir..." className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all resize-none" />
              </div>

              <button className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors">Değerlendirmeyi Gönder</button>
            </div>
          ))}
        </div>
      )}

      {activeTab === "completed" && (
        <div className="space-y-4">
          {completedReviews.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-neutral-100 shadow-align-xs p-4 sm:p-5">
              <div className="flex gap-3 mb-3">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0`}>
                  <svg className="w-7 h-7 text-white/60" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="12" cy="12" r="3" /></svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900">{item.name}</h3>
                  <p className="text-xs text-neutral-400">{item.date}</p>
                </div>
              </div>
              <StarRating rating={item.rating} />
              <p className="text-sm text-neutral-500 mt-2">{item.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}
