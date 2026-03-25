"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

const _sb = createClient()

const starIcon = <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
const starDim = <svg className="w-3.5 h-3.5 text-amber-200" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>

const chartData = [
  { label: "Pzt", value: "6.8K", height: "58%", shade: "bg-primary-300" },
  { label: "Sal", value: "9.2K", height: "78%", shade: "bg-primary-400" },
  { label: "Çar", value: "7.5K", height: "64%", shade: "bg-primary-300" },
  { label: "Per", value: "11.1K", height: "94%", shade: "bg-primary-500" },
  { label: "Cum", value: "8.4K", height: "71%", shade: "bg-primary-400" },
  { label: "Cmt", value: "3.2K", height: "27%", shade: "bg-primary-200" },
  { label: "Paz", value: "12K", height: "100%", shade: "bg-primary-600" },
]

const statusMap: Record<string, { label: string; statusClass: string }> = {
  pending: { label: "Beklemede", statusClass: "bg-yellow-50 text-yellow-700" },
  preparing: { label: "Hazırlanıyor", statusClass: "bg-warning-light text-warning-dark" },
  shipped: { label: "Kargoda", statusClass: "bg-orange-50 text-orange-700" },
  delivered: { label: "Teslim Edildi", statusClass: "bg-success-light text-success-dark" },
  cancelled: { label: "İptal", statusClass: "bg-error-light text-error-dark" },
}

const avatarColors = [
  "bg-blue-100 text-blue-600",
  "bg-purple-100 text-purple-600",
  "bg-emerald-100 text-emerald-600",
  "bg-rose-100 text-rose-600",
  "bg-gray-100 text-gray-600",
]

const rankClasses = [
  "bg-primary-500 text-white",
  "bg-primary-400 text-white",
  "bg-primary-300 text-white",
  "bg-primary-200 text-primary-800",
  "bg-primary-100 text-primary-700",
]

interface RecentOrder {
  id: string
  created_at: string
  status: string
  total: number
  buyer_name: string
  first_product_name: string
}

interface TopProduct {
  id: string
  name: string
  review_count: number
  price: number
  rating: number | null
}

interface RecentReview {
  id: string
  rating: number
  comment: string | null
  created_at: string
  user_name: string
  product_name: string
}

function formatPrice(price: number) {
  return price.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" })
}

function getInitials(name: string) {
  return name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 60) return `${minutes} dk önce`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} saat önce`
  const days = Math.floor(hours / 24)
  return `${days} gün önce`
}

export default function SellerDashboardPage() {
  const [showTips, setShowTips] = useState(true)
  const [loading, setLoading] = useState(true)
  const [storeName, setStoreName] = useState("")
  const [totalOrders, setTotalOrders] = useState(0)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [productsCount, setProductsCount] = useState(0)
  const [avgRating, setAvgRating] = useState(0)
  const [reviewCount, setReviewCount] = useState(0)
  const [pendingOrders, setPendingOrders] = useState(0)
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [topProducts, setTopProducts] = useState<TopProduct[]>([])
  const [reviews, setReviews] = useState<RecentReview[]>([])

  useEffect(() => {
    document.title = "Satıcı Paneli | enolsun.com Satıcı Merkezi"

    async function load() {
      const { data: { user } } = await _sb.auth.getUser()
      if (!user) { setLoading(false); return }

      // Get store
      const { data: store } = await _sb
        .from("stores")
        .select("id, name")
        .eq("owner_id", user.id)
        .maybeSingle()

      if (!store) { setLoading(false); return }
      setStoreName(store.name)

      // Fetch all data in parallel
      const [ordersRes, productsRes, pendingRes, reviewsRes, topProductsRes] = await Promise.all([
        // All orders for stats
        _sb
          .from("orders")
          .select("id, created_at, status, total_amount, user_id")
          .eq("store_id", store.id)
          .order("created_at", { ascending: false }),

        // Products count
        _sb
          .from("products")
          .select("id", { count: "exact", head: true })
          .eq("store_id", store.id),

        // Pending orders count
        _sb
          .from("orders")
          .select("id", { count: "exact", head: true })
          .eq("store_id", store.id)
          .in("status", ["pending", "preparing"]),

        // Recent reviews with product name
        _sb
          .from("reviews")
          .select("id, rating, comment, created_at, user_id, product:products!inner(name, store_id)")
          .eq("product.store_id", store.id)
          .order("created_at", { ascending: false })
          .limit(3),

        // Top products by review_count
        _sb
          .from("products")
          .select("id, name, review_count, price, rating")
          .eq("store_id", store.id)
          .order("review_count", { ascending: false })
          .limit(5),
      ])

      const allOrders = ordersRes.data ?? []
      setTotalOrders(allOrders.length)
      const revenue = allOrders.reduce((sum: number, o: any) => sum + (o.total_amount ?? o.total ?? 0), 0)
      setTotalRevenue(revenue)
      setProductsCount(productsRes.count ?? 0)
      setPendingOrders(pendingRes.count ?? 0)

      // Get recent 5 orders with buyer names
      const recent5 = allOrders.slice(0, 5)
      if (recent5.length > 0) {
        const userIds = [...new Set(recent5.map((o: any) => o.user_id))]
        const { data: profiles } = await _sb
          .from("profiles")
          .select("id, full_name")
          .in("id", userIds)

        const profileMap: Record<string, string> = {}
        ;(profiles ?? []).forEach((p: any) => { profileMap[p.id] = p.full_name ?? "Müşteri" })

        // Get first product name for each order
        const orderIds = recent5.map((o: any) => o.id)
        const { data: orderItems } = await _sb
          .from("order_items")
          .select("order_id, product:products(name)")
          .in("order_id", orderIds)

        const orderProductMap: Record<string, string> = {}
        ;(orderItems ?? []).forEach((item: any) => {
          if (!orderProductMap[item.order_id]) {
            orderProductMap[item.order_id] = item.product?.name ?? "Ürün"
          }
        })

        setRecentOrders(recent5.map((o: any) => ({
          id: o.id,
          created_at: o.created_at,
          status: o.status,
          total: o.total_amount ?? o.total ?? 0,
          buyer_name: profileMap[o.user_id] ?? "Müşteri",
          first_product_name: orderProductMap[o.id] ?? "Ürün",
        })))
      }

      // Top products
      setTopProducts((topProductsRes.data ?? []) as TopProduct[])

      // Reviews - get user names
      const reviewsData = reviewsRes.data ?? []
      if (reviewsData.length > 0) {
        const reviewUserIds = [...new Set(reviewsData.map((r: any) => r.user_id))]
        const { data: reviewProfiles } = await _sb
          .from("profiles")
          .select("id, full_name")
          .in("id", reviewUserIds)

        const rpMap: Record<string, string> = {}
        ;(reviewProfiles ?? []).forEach((p: any) => { rpMap[p.id] = p.full_name ?? "Müşteri" })

        setReviews(reviewsData.map((r: any) => ({
          id: r.id,
          rating: r.rating,
          comment: r.comment,
          created_at: r.created_at,
          user_name: rpMap[r.user_id] ?? "Müşteri",
          product_name: r.product?.name ?? "Ürün",
        })))
      }

      // Avg rating from reviews on store products
      const { data: allReviews } = await _sb
        .from("reviews")
        .select("rating, product:products!inner(store_id)")
        .eq("product.store_id", store.id)

      if (allReviews && allReviews.length > 0) {
        const avg = allReviews.reduce((sum: number, r: any) => sum + r.rating, 0) / allReviews.length
        setAvgRating(Math.round(avg * 10) / 10)
        setReviewCount(allReviews.length)
      }

      setLoading(false)
    }

    load()
  }, [])

  if (loading) {
    return (
      <>
        {/* Welcome Banner Skeleton */}
        <section className="animate-pulse mb-8">
          <div className="bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 rounded-2xl p-6 lg:p-8">
            <div className="h-7 bg-white/20 rounded w-96 mb-2" />
            <div className="h-5 bg-white/15 rounded w-64 mb-5" />
            <div className="flex gap-3">
              <div className="h-10 bg-white/20 rounded-xl w-36" />
              <div className="h-10 bg-white/15 rounded-xl w-36" />
            </div>
          </div>
        </section>

        {/* KPI Skeleton */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-align-xs border border-neutral-100 animate-pulse">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-neutral-100 rounded-xl" />
                <div className="w-12 h-5 bg-neutral-100 rounded-full" />
              </div>
              <div className="h-7 bg-neutral-100 rounded w-24 mb-1" />
              <div className="h-4 bg-neutral-100 rounded w-28 mt-1" />
            </div>
          ))}
        </section>

        {/* Charts Skeleton */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-8">
          {[1, 2].map(i => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-align-xs border border-neutral-100 animate-pulse">
              <div className="h-5 bg-neutral-100 rounded w-40 mb-2" />
              <div className="h-4 bg-neutral-100 rounded w-52 mb-6" />
              <div className="h-44 bg-neutral-50 rounded-lg" />
            </div>
          ))}
        </section>

        {/* Table Skeleton */}
        <section className="bg-white rounded-2xl shadow-align-xs border border-neutral-100 mb-8 overflow-hidden animate-pulse">
          <div className="p-5 lg:p-6 border-b border-neutral-100">
            <div className="h-5 bg-neutral-100 rounded w-36 mb-1" />
            <div className="h-4 bg-neutral-100 rounded w-52" />
          </div>
          <div className="p-5 space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-4 bg-neutral-100 rounded w-24" />
                <div className="h-4 bg-neutral-100 rounded w-32 flex-1" />
                <div className="h-4 bg-neutral-100 rounded w-20" />
              </div>
            ))}
          </div>
        </section>

        {/* Bottom section skeleton */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-8">
          {[1, 2].map(i => (
            <div key={i} className="bg-white rounded-2xl shadow-align-xs border border-neutral-100 overflow-hidden animate-pulse">
              <div className="p-5 lg:p-6 border-b border-neutral-100">
                <div className="h-5 bg-neutral-100 rounded w-44 mb-1" />
                <div className="h-4 bg-neutral-100 rounded w-56" />
              </div>
              <div className="p-5 space-y-4">
                {[1, 2, 3].map(j => (
                  <div key={j} className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-neutral-100 rounded-full" />
                    <div className="flex-1 space-y-1">
                      <div className="h-4 bg-neutral-100 rounded w-32" />
                      <div className="h-3 bg-neutral-100 rounded w-48" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </>
    )
  }

  const fullStars = Math.floor(avgRating)

  return (
    <>
      {/* 1. Welcome Banner */}
      <section className="animate-fade-in-up mb-8">
        <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-1/2 w-40 h-40 bg-white/5 rounded-full translate-y-1/2"></div>
          <div className="relative z-10">
            <h1 className="text-xl lg:text-2xl font-bold mb-1">EN başarılı satıcılar burada! Hoş geldiniz, {storeName || "Mağaza"}!</h1>
            <p className="text-primary-100 text-sm lg:text-base mb-5">Bugün mağazanız EN aktif günlerinden birini yaşıyor!</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/seller-add-product" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-primary-700 font-semibold text-sm rounded-xl hover:bg-primary-25 transition-colors shadow-align-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                Yeni Ürün Ekle
              </Link>
              <Link href="/seller-orders" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 text-white font-semibold text-sm rounded-xl hover:bg-white/25 transition-colors border border-white/20">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                Siparişleri Gör
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {/* Toplam Gelir */}
        <div className="animate-fade-in-up stagger-1 bg-white rounded-2xl p-5 shadow-align-xs border border-neutral-100 hover:shadow-align-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-neutral-900">&#8378;{formatPrice(totalRevenue)}</p>
          <p className="text-sm text-neutral-500 mt-1">Toplam Gelir</p>
        </div>

        {/* Toplam Sipariş */}
        <div className="animate-fade-in-up stagger-2 bg-white rounded-2xl p-5 shadow-align-xs border border-neutral-100 hover:shadow-align-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-neutral-900">{totalOrders}</p>
          <p className="text-sm text-neutral-500 mt-1">Toplam Sipariş</p>
        </div>

        {/* Bekleyen Sipariş */}
        <div className="animate-fade-in-up stagger-3 bg-white rounded-2xl p-5 shadow-align-xs border border-neutral-100 hover:shadow-align-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-warning-light rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-warning-dark" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            </div>
            {pendingOrders > 0 && <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-warning-light text-warning-dark text-xs font-medium rounded-full">Dikkat</span>}
          </div>
          <p className="text-2xl font-bold text-neutral-900">{pendingOrders}</p>
          <p className="text-sm text-neutral-500 mt-1">Bekleyen Sipariş</p>
          {pendingOrders > 0 && <p className="text-xs text-warning-dark mt-0.5">Hazırlanmayı bekliyor</p>}
        </div>

        {/* Mağaza Puanı */}
        <div className="animate-fade-in-up stagger-4 bg-white rounded-2xl p-5 shadow-align-xs border border-neutral-100 hover:shadow-align-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i}>{i < fullStars ? starIcon : starDim}</span>
              ))}
            </div>
          </div>
          <p className="text-2xl font-bold text-neutral-900">{avgRating > 0 ? avgRating : "—"}<span className="text-base font-normal text-neutral-400">/5</span></p>
          <p className="text-sm text-neutral-500 mt-1">Mağaza Puanı</p>
          <p className="text-xs text-neutral-400 mt-0.5">{reviewCount} değerlendirme</p>
        </div>
      </section>

      {/* 3. Charts Section (hardcoded) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-8">
        {/* Sales Chart */}
        <div className="animate-fade-in-up stagger-2 bg-white rounded-2xl p-6 shadow-align-xs border border-neutral-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-neutral-900">Son 7 Gün Satış</h2>
              <p className="text-sm text-neutral-500 mt-0.5">Günlük satış performansınız</p>
            </div>
            <span className="text-sm font-semibold text-primary-600">&#8378;{formatPrice(totalRevenue)}</span>
          </div>
          <div className="flex items-end justify-between gap-2 h-44">
            {chartData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[11px] text-neutral-500 font-medium">&#8378;{d.value}</span>
                <div className={`chart-bar w-full ${d.shade} rounded-t-lg`} style={{ height: d.height }}></div>
                <span className="text-xs text-neutral-500">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="animate-fade-in-up stagger-3 bg-white rounded-2xl p-6 shadow-align-xs border border-neutral-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-neutral-900">Kategori Dağılımı</h2>
              <p className="text-sm text-neutral-500 mt-0.5">Satış kategorileriniz</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="donut-chart flex-shrink-0"></div>
            <div className="flex-1 space-y-3 w-full">
              {[
                { color: "bg-primary-500", label: "Ev & Yaşam", pct: "%45" },
                { color: "bg-primary-400", label: "Aydınlatma", pct: "%25" },
                { color: "bg-primary-300", label: "Dekorasyon", pct: "%20" },
                { color: "bg-primary-200", label: "Diğer", pct: "%10" },
              ].map((cat, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${cat.color}`}></span>
                    <span className="text-sm text-neutral-700">{cat.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-neutral-900">{cat.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Recent Orders Table */}
      <section className="animate-fade-in-up stagger-3 bg-white rounded-2xl shadow-align-xs border border-neutral-100 mb-8 overflow-hidden">
        <div className="flex items-center justify-between p-5 lg:p-6 border-b border-neutral-100">
          <div>
            <h2 className="text-base font-semibold text-neutral-900">Son Siparişler</h2>
            <p className="text-sm text-neutral-500 mt-0.5">EN son gelen siparişleriniz</p>
          </div>
          <Link href="/seller-orders" className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
            Tüm Siparişleri Gör &rarr;
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className="p-8 text-center text-neutral-500 text-sm">Henüz sipariş bulunmuyor.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="orders-table w-full">
              <thead>
                <tr className="bg-neutral-25 text-left">
                  <th className="px-5 lg:px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Sipariş No</th>
                  <th className="px-5 lg:px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Müşteri</th>
                  <th className="px-5 lg:px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Ürün</th>
                  <th className="px-5 lg:px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Tutar</th>
                  <th className="px-5 lg:px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Durum</th>
                  <th className="px-5 lg:px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Tarih</th>
                  <th className="px-5 lg:px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {recentOrders.map((order, idx) => {
                  const sm = statusMap[order.status] ?? { label: order.status, statusClass: "bg-neutral-100 text-neutral-600" }
                  const initials = getInitials(order.buyer_name)
                  const color = avatarColors[idx % avatarColors.length]
                  return (
                    <tr key={order.id} className="hover:bg-neutral-25 transition-colors">
                      <td data-label="Sipariş No" className="px-5 lg:px-6 py-4 text-sm font-medium text-primary-600">#{order.id.slice(0, 8)}</td>
                      <td data-label="Müşteri" className="px-5 lg:px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-7 h-7 ${color} rounded-full flex items-center justify-center text-xs font-semibold`}>{initials}</div>
                          <span className="text-sm text-neutral-800">{order.buyer_name}</span>
                        </div>
                      </td>
                      <td data-label="Ürün" className="px-5 lg:px-6 py-4 text-sm text-neutral-600">{order.first_product_name}</td>
                      <td data-label="Tutar" className="px-5 lg:px-6 py-4 text-sm font-semibold text-neutral-900">&#8378;{formatPrice(order.total)}</td>
                      <td data-label="Durum" className="px-5 lg:px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${sm.statusClass}`}>{sm.label}</span>
                      </td>
                      <td data-label="Tarih" className="px-5 lg:px-6 py-4 text-sm text-neutral-500">{formatDate(order.created_at)}</td>
                      <td data-label="İşlem" className="px-5 lg:px-6 py-4">
                        <Link href={`/seller-orders?order=${order.id}`} className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">Detay</Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* 5. Best Sellers + Reviews */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-8">
        {/* Best Selling Products */}
        <div className="animate-fade-in-up stagger-4 bg-white rounded-2xl shadow-align-xs border border-neutral-100 overflow-hidden">
          <div className="p-5 lg:p-6 border-b border-neutral-100">
            <h2 className="text-base font-semibold text-neutral-900">EN Çok Satan Ürünler</h2>
            <p className="text-sm text-neutral-500 mt-0.5">EN popüler ürünleriniz</p>
          </div>
          {topProducts.length === 0 ? (
            <div className="p-8 text-center text-neutral-500 text-sm">Henüz ürün bulunmuyor.</div>
          ) : (
            <div className="divide-y divide-neutral-100">
              {topProducts.map((p, idx) => (
                <div key={p.id} className="flex items-center gap-4 p-4 lg:px-6 hover:bg-neutral-25 transition-colors">
                  <span className={`w-7 h-7 ${rankClasses[idx] ?? rankClasses[4]} rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0`}>{idx + 1}</span>
                  <div className="w-11 h-11 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900 truncate">{p.name}</p>
                    <p className="text-xs text-neutral-500">{p.review_count} değerlendirme</p>
                  </div>
                  <span className="text-sm font-semibold text-neutral-900">&#8378;{formatPrice(p.price)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Reviews */}
        <div className="animate-fade-in-up stagger-5 bg-white rounded-2xl shadow-align-xs border border-neutral-100 overflow-hidden">
          <div className="p-5 lg:p-6 border-b border-neutral-100">
            <h2 className="text-base font-semibold text-neutral-900">Son Değerlendirmeler</h2>
            <p className="text-sm text-neutral-500 mt-0.5">Müşterilerinizden gelen yorumlar</p>
          </div>
          {reviews.length === 0 ? (
            <div className="p-8 text-center text-neutral-500 text-sm">Henüz değerlendirme bulunmuyor.</div>
          ) : (
            <div className="divide-y divide-neutral-100">
              {reviews.map((r, i) => {
                const initials = getInitials(r.user_name)
                const color = avatarColors[i % avatarColors.length]
                return (
                  <div key={r.id} className="p-4 lg:px-6 hover:bg-neutral-25 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 ${color} rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0`}>{initials}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-neutral-900">{r.user_name}</span>
                          <span className="text-xs text-neutral-400">{timeAgo(r.created_at)}</span>
                        </div>
                        <div className="flex gap-0.5 mb-1.5">
                          {Array.from({ length: 5 }, (_, j) => j < r.rating ? <span key={j}>{starIcon}</span> : <span key={j}><svg className="w-3.5 h-3.5 text-neutral-200" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></span>)}
                        </div>
                        <p className="text-sm text-neutral-600 line-clamp-2">{r.comment || "Yorum eklenmemiş."}</p>
                        <p className="text-xs text-primary-600 mt-1.5 font-medium">{r.product_name}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* 6. Performance Tips Banner */}
      {showTips && (
        <section className="animate-fade-in-up stagger-5 mb-8">
          <div className="bg-primary-25 border border-primary-100 rounded-2xl p-5 lg:p-6 relative">
            <button onClick={() => setShowTips(false)} className="absolute top-4 right-4 p-1 rounded-lg hover:bg-primary-100 text-primary-400 hover:text-primary-600 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <div className="flex items-start gap-3 mb-3">
              <div className="w-9 h-9 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-primary-800">EN Çok Satan Satıcıların Sırları</h3>
                <p className="text-xs text-primary-600 mt-0.5">Satışlarınızı artırmak için EN etkili öneriler</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 ml-12">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <p className="text-xs text-primary-700">Ürün fotoğraflarınızı EN yüksek kalitede yükleyin</p>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <p className="text-xs text-primary-700">Müşteri sorularına EN hızlı yanıtı verin</p>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <p className="text-xs text-primary-700">EN cazip kampanya ve indirimler oluşturun</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
