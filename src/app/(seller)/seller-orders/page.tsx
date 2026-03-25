"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { showToast } from "@/components/ui/Toast"

const _sb = createClient()

const statusMap: Record<string, { label: string; statusClass: string }> = {
  pending: { label: "Beklemede", statusClass: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  preparing: { label: "Hazırlanıyor", statusClass: "bg-blue-50 text-blue-700 border-blue-200" },
  shipped: { label: "Kargoda", statusClass: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  delivered: { label: "Teslim Edildi", statusClass: "bg-green-50 text-green-700 border-green-200" },
  cancelled: { label: "İptal", statusClass: "bg-red-50 text-red-700 border-red-200" },
}

const statusFlow: Record<string, string> = {
  pending: "preparing",
  preparing: "shipped",
  shipped: "delivered",
}

const statusActionLabels: Record<string, string> = {
  pending: "Onayla",
  preparing: "Kargola",
  shipped: "Teslim Edildi",
}

const tabs = [
  { key: "all", label: "Tümü" },
  { key: "pending", label: "Beklemede" },
  { key: "preparing", label: "Hazırlanıyor" },
  { key: "shipped", label: "Kargoda" },
  { key: "delivered", label: "Teslim Edildi" },
  { key: "cancelled", label: "İptal" },
]

const avatarColors = [
  "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",
  "bg-purple-100 text-purple-700",
  "bg-orange-100 text-orange-700",
  "bg-pink-100 text-pink-700",
]

interface OrderItem {
  id: string
  quantity: number
  unit_price: number
  product: {
    name: string
    product_images: { url: string; is_primary: boolean }[]
  } | null
}

interface Order {
  id: string
  created_at: string
  status: string
  total: number
  tracking_number: string | null
  user_id: string
  buyer_name: string
  order_items: OrderItem[]
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

function primaryImage(images: { url: string; is_primary: boolean }[]) {
  return images?.find(img => img.is_primary)?.url || images?.[0]?.url || null
}

export default function SellerOrdersPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  useEffect(() => {
    document.title = "Siparişler | enolsun.com Satıcı Merkezi"
    fetchOrders()
  }, [])

  async function fetchOrders() {
    const { data: { user } } = await _sb.auth.getUser()
    if (!user) { setLoading(false); return }

    const { data: store } = await _sb
      .from("stores")
      .select("id")
      .eq("owner_id", user.id)
      .maybeSingle()

    if (!store) { setLoading(false); return }

    const { data } = await _sb
      .from("orders")
      .select("id, created_at, status, total, tracking_number, user_id, order_items(id, quantity, unit_price, product:products(name, product_images(url, is_primary)))")
      .eq("store_id", store.id)
      .order("created_at", { ascending: false })

    const ordersRaw = data ?? []

    // Get buyer names
    if (ordersRaw.length > 0) {
      const userIds = [...new Set(ordersRaw.map((o: any) => o.user_id))]
      const { data: profiles } = await _sb
        .from("profiles")
        .select("id, full_name")
        .in("id", userIds)

      const profileMap: Record<string, string> = {}
      ;(profiles ?? []).forEach((p: any) => { profileMap[p.id] = p.full_name ?? "Müşteri" })

      setOrders(ordersRaw.map((o: any) => ({
        ...o,
        total: o.total ?? 0,
        buyer_name: profileMap[o.user_id] ?? "Müşteri",
        order_items: o.order_items ?? [],
      })))
    }

    setLoading(false)
  }

  async function updateOrderStatus(orderId: string, newStatus: string) {
    setUpdatingId(orderId)
    const { error } = await _sb
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId)

    if (error) {
      showToast("Durum güncellenemedi. Lütfen tekrar deneyin.", "error")
    } else {
      showToast("Sipariş durumu güncellendi.", "success")
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
    }
    setUpdatingId(null)
    setOpenDropdown(null)
  }

  async function cancelOrder(orderId: string) {
    setUpdatingId(orderId)
    const { error } = await _sb
      .from("orders")
      .update({ status: "cancelled" })
      .eq("id", orderId)

    if (error) {
      showToast("Sipariş iptal edilemedi.", "error")
    } else {
      showToast("Sipariş iptal edildi.", "success")
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: "cancelled" } : o))
    }
    setUpdatingId(null)
    setOpenDropdown(null)
  }

  const tabCounts: Record<string, number> = { all: orders.length }
  orders.forEach(o => { tabCounts[o.status] = (tabCounts[o.status] ?? 0) + 1 })

  const filtered = activeTab === "all" ? orders : orders.filter(o => o.status === activeTab)

  function toggleSelectAll(checked: boolean) {
    setSelectedOrders(checked ? filtered.map(o => o.id) : [])
  }

  function toggleOrderSelect(id: string) {
    setSelectedOrders(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  function clearSelection() { setSelectedOrders([]) }

  async function bulkUpdateStatus(newStatus: string) {
    const promises = selectedOrders.map(id =>
      _sb.from("orders").update({ status: newStatus }).eq("id", id)
    )
    await Promise.all(promises)
    setOrders(prev => prev.map(o => selectedOrders.includes(o.id) ? { ...o, status: newStatus } : o))
    showToast(`${selectedOrders.length} sipariş güncellendi.`, "success")
    setSelectedOrders([])
  }

  if (loading) {
    return (
      <>
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="h-7 bg-neutral-100 rounded w-72" />
            <div className="h-6 w-12 bg-neutral-100 rounded-full" />
          </div>
          <div className="h-10 w-28 bg-neutral-100 rounded-xl" />
        </div>

        {/* Tab Skeleton */}
        <div className="flex flex-wrap gap-2 mb-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-9 w-24 bg-neutral-100 rounded-full" />
          ))}
        </div>

        {/* Filter Skeleton */}
        <div className="bg-white rounded-xl border border-neutral-100 p-4 mb-6 shadow-align-xs animate-pulse">
          <div className="flex gap-3">
            <div className="h-9 w-32 bg-neutral-100 rounded-xl" />
            <div className="h-9 w-32 bg-neutral-100 rounded-xl" />
            <div className="h-9 w-32 bg-neutral-100 rounded-xl" />
            <div className="h-9 flex-1 bg-neutral-100 rounded-xl" />
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="bg-white rounded-xl border border-neutral-100 shadow-align-xs overflow-hidden mb-6 animate-pulse">
          <div className="p-4 space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-5 h-5 bg-neutral-100 rounded" />
                <div className="h-4 bg-neutral-100 rounded w-24" />
                <div className="flex items-center gap-2 flex-1">
                  <div className="w-7 h-7 bg-neutral-100 rounded-full" />
                  <div className="h-4 bg-neutral-100 rounded w-28" />
                </div>
                <div className="h-4 bg-neutral-100 rounded w-16" />
                <div className="h-6 bg-neutral-100 rounded-full w-20" />
                <div className="h-4 bg-neutral-100 rounded w-24" />
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {/* Bulk Action Bar */}
      {selectedOrders.length > 0 && (
        <div className="bg-primary-600 text-white px-4 sm:px-6 py-3 flex items-center justify-between rounded-xl mb-4">
          <span className="text-sm font-medium">{selectedOrders.length} sipariş seçildi</span>
          <div className="flex items-center gap-2">
            <button onClick={() => bulkUpdateStatus("preparing")} className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors">Seçilileri Onayla</button>
            <button onClick={() => bulkUpdateStatus("shipped")} className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors">Seçilileri Kargola</button>
            <button onClick={clearSelection} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-neutral-800">Siparişler — EN Hızlı Sipariş Yönetimi</h1>
          <span className="bg-primary-100 text-primary-700 text-sm font-semibold px-2.5 py-0.5 rounded-full">{orders.length}</span>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-sm font-medium text-neutral-700 hover:bg-neutral-50 shadow-align-xs transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          Dışa Aktar
        </button>
      </div>

      {/* Tab Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map(tab => (
          <button key={tab.key} onClick={() => { setActiveTab(tab.key); setSelectedOrders([]) }} className={`seller-tab px-4 py-2 rounded-full text-sm font-medium ${activeTab === tab.key ? "active" : "bg-neutral-100 text-neutral-600"}`}>
            {tab.label} <span className="ml-1 opacity-70">{tabCounts[tab.key] ?? 0}</span>
          </button>
        ))}
      </div>

      {/* Filters Row */}
      <div className="bg-white rounded-xl border border-neutral-100 p-4 mb-6 shadow-align-xs">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 flex-1">
            <input type="date" className="px-3 py-2 border border-neutral-200 rounded-xl text-sm text-neutral-700 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all w-full sm:w-auto" />
            <span className="text-neutral-400 text-sm">-</span>
            <input type="date" className="px-3 py-2 border border-neutral-200 rounded-xl text-sm text-neutral-700 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all w-full sm:w-auto" />
          </div>
          <select className="px-3 py-2 border border-neutral-200 rounded-xl text-sm text-neutral-700 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all bg-white">
            <option value="">Durum Seçin</option>
            <option>Beklemede</option>
            <option>Hazırlanıyor</option>
            <option>Kargoda</option>
            <option>Teslim Edildi</option>
            <option>İptal</option>
          </select>
          <div className="relative flex-1 sm:max-w-xs">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input type="text" placeholder="Sipariş no ile ara..." className="w-full pl-9 pr-3 py-2 border border-neutral-200 rounded-xl text-sm text-neutral-700 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" />
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="bg-white rounded-xl border border-neutral-100 shadow-align-xs p-12 text-center mb-6">
          <svg className="w-12 h-12 text-neutral-200 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          <p className="text-neutral-500 text-sm">Bu kategoride sipariş bulunmuyor.</p>
        </div>
      )}

      {/* Desktop Orders Table */}
      {filtered.length > 0 && (
        <div className="hidden md:block bg-white rounded-xl border border-neutral-100 shadow-align-xs overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-25 border-b border-neutral-100">
                  <th className="px-4 py-3 text-left"><input type="checkbox" checked={selectedOrders.length === filtered.length && filtered.length > 0} onChange={(e) => toggleSelectAll(e.target.checked)} className="rounded border-neutral-300 text-primary-500 focus:ring-primary-300 cursor-pointer" /></th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Sipariş No</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Müşteri</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Ürünler</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Tutar</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Durum</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Tarih</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {filtered.map((order, idx) => {
                  const sm = statusMap[order.status] ?? { label: order.status, statusClass: "bg-neutral-100 text-neutral-600 border-neutral-200" }
                  const initials = getInitials(order.buyer_name)
                  const color = avatarColors[idx % avatarColors.length]
                  const nextStatus = statusFlow[order.status]
                  const actionLabel = statusActionLabels[order.status]

                  return (
                    <tr key={order.id} className="hover:bg-neutral-25 transition-colors">
                      <td className="px-4 py-3"><input type="checkbox" checked={selectedOrders.includes(order.id)} onChange={() => toggleOrderSelect(order.id)} className="rounded border-neutral-300 text-primary-500 focus:ring-primary-300 cursor-pointer" /></td>
                      <td className="px-4 py-3 text-sm font-semibold text-primary-600">#{order.id.slice(0, 8)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-7 h-7 rounded-full ${color} flex items-center justify-center`}><span className="text-xs font-bold">{initials}</span></div>
                          <span className="text-sm text-neutral-700">{order.buyer_name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          {order.order_items.slice(0, 2).map((item, i) => {
                            const imgUrl = item.product ? primaryImage(item.product.product_images) : null
                            return (
                              <div key={i} className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center overflow-hidden">
                                {imgUrl ? (
                                  <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                                ) : (
                                  <svg className="w-4 h-4 text-neutral-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                                )}
                              </div>
                            )
                          })}
                          {order.order_items.length > 2 && <span className="text-xs text-neutral-400 ml-1">+{order.order_items.length - 2}</span>}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-neutral-800">&#8378;{formatPrice(order.total)}</td>
                      <td className="px-4 py-3"><span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${sm.statusClass}`}>{sm.label}</span></td>
                      <td className="px-4 py-3 text-sm text-neutral-500">{formatDate(order.created_at)}</td>
                      <td className="px-4 py-3">
                        <div className="relative">
                          <button onClick={() => setOpenDropdown(openDropdown === order.id ? null : order.id)} className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors" disabled={updatingId === order.id}>
                            {updatingId === order.id ? (
                              <svg className="w-4 h-4 text-primary-500 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg>
                            ) : (
                              <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01"/></svg>
                            )}
                          </button>
                          {openDropdown === order.id && (
                            <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-neutral-100 rounded-xl shadow-align-md z-10 py-1">
                              <Link href={`/seller-orders?order=${order.id}`} className="block px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50">Detay</Link>
                              {nextStatus && (
                                <button onClick={() => updateOrderStatus(order.id, nextStatus)} className="w-full text-left block px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
                                  {actionLabel}
                                </button>
                              )}
                              {order.status !== "cancelled" && order.status !== "delivered" && (
                                <button onClick={() => cancelOrder(order.id)} className="w-full text-left block px-3 py-2 text-sm text-red-600 hover:bg-red-50">İptal Et</button>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mobile Order Cards */}
      {filtered.length > 0 && (
        <div className="md:hidden space-y-3 mb-6">
          {filtered.map((order, idx) => {
            const sm = statusMap[order.status] ?? { label: order.status, statusClass: "bg-neutral-100 text-neutral-600 border-neutral-200" }
            const initials = getInitials(order.buyer_name)
            const color = avatarColors[idx % avatarColors.length]
            const nextStatus = statusFlow[order.status]
            const actionLabel = statusActionLabels[order.status]

            return (
              <div key={order.id} className="bg-white rounded-xl border border-neutral-100 p-4 shadow-align-xs" style={{ animationDelay: `${idx * 0.05}s` }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-primary-600">#{order.id.slice(0, 8)}</span>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${sm.statusClass}`}>{sm.label}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-7 h-7 rounded-full ${color} flex items-center justify-center`}><span className="text-xs font-bold">{initials}</span></div>
                  <span className="text-sm text-neutral-700">{order.buyer_name}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-neutral-800">&#8378;{formatPrice(order.total)}</span>
                  <span className="text-xs text-neutral-500">{formatDate(order.created_at)}</span>
                </div>
                {nextStatus && (
                  <button
                    onClick={() => updateOrderStatus(order.id, nextStatus)}
                    disabled={updatingId === order.id}
                    className="w-full py-2 bg-primary-50 text-primary-700 text-sm font-medium rounded-lg hover:bg-primary-100 transition-colors disabled:opacity-50"
                  >
                    {updatingId === order.id ? "Güncelleniyor..." : actionLabel}
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
