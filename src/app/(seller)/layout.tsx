"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

const navItems = [
  { href: "/seller-dashboard", label: "Genel Bakış", icon: <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></> },
  { href: "/seller-orders", label: "Siparişler", icon: <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/> },
  { href: "/seller-products", label: "Ürünlerim", icon: <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/> },
  { href: "/seller-messages", label: "Mesajlar", icon: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/> },
  { href: "/seller-finance", label: "Finans", icon: <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/> },
  { href: "/seller-settings", label: "Mağaza Ayarları", icon: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></> },
  { href: "/seller-stats", label: "İstatistikler", icon: <path d="M18 20V10M12 20V4M6 20v-6"/> },
]

interface StoreInfo {
  name: string
  slug: string
  email: string
}

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [store, setStore] = useState<StoreInfo | null>(null)
  const [orderCount, setOrderCount] = useState(0)
  const [msgCount, setMsgCount] = useState(0)

  useEffect(() => {
    async function loadStore() {
      const _sb = createClient()
      const { data: { user } } = await _sb.auth.getUser()
      if (!user) return

      const { data: s } = await _sb.from("stores").select("name, slug, email").eq("owner_id", user.id).maybeSingle()
      if (s) setStore(s)

      // Pending orders count
      const { count: oc } = await _sb.from("orders").select("id", { count: "exact", head: true }).eq("store_id", s?.slug || "").in("status", ["pending", "processing"])
      setOrderCount(oc || 0)

      // Unread messages count (simple approach)
      const { count: mc } = await _sb.from("messages").select("id", { count: "exact", head: true }).eq("receiver_id", user.id).eq("is_read", false)
      setMsgCount(mc || 0)
    }
    loadStore()
  }, [])

  const storeName = store?.name || "Mağazam"
  const storeSlug = store?.slug || ""
  const storeEmail = store?.email || ""
  const storeInitials = storeName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)

  function toggleSidebar() { setSidebarOpen(!sidebarOpen) }

  async function handleSignOut() {
    const _sb = createClient()
    await _sb.auth.signOut()
    window.location.href = "/seller-login"
  }

  return (
    <div className="bg-neutral-50 text-neutral-800 antialiased min-h-screen">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity" onClick={toggleSidebar}></div>
      )}

      {/* SIDEBAR */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-neutral-100 z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Logo */}
        <div className="p-5 border-b border-neutral-100">
          <Link href="/seller-dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-primary-500 rounded-xl flex items-center justify-center shadow-align-sm">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <div>
              <span className="text-lg font-bold text-neutral-900">enolsun</span><span className="text-lg font-bold text-primary-500">.com</span>
              <p className="text-[11px] text-neutral-400 -mt-0.5">Satıcı Merkezi</p>
            </div>
          </Link>
        </div>

        {/* Seller Info */}
        <div className="p-4 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary-700">
              {storeInitials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-neutral-900 truncate">{storeName}</p>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary-50 text-primary-700 text-[11px] font-medium rounded-full">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                Satıcı
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          <ul className="space-y-1">
            {navItems.map(item => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`seller-sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${isActive ? "active" : "text-neutral-600"}`}
                  >
                    <svg className="nav-icon w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">{item.icon}</svg>
                    <span className="flex-1">{item.label}</span>
                    {item.href === "/seller-orders" && orderCount > 0 && (
                      <span className="inline-flex items-center justify-center min-w-[20px] h-5 bg-primary-100 text-primary-700 text-[11px] font-semibold rounded-full px-1.5">{orderCount}</span>
                    )}
                    {item.href === "/seller-messages" && msgCount > 0 && (
                      <span className="inline-flex items-center justify-center min-w-[20px] h-5 bg-error-base text-white text-[11px] font-semibold rounded-full px-1.5">{msgCount}</span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="my-4 border-t border-neutral-100"></div>

          <ul className="space-y-1">
            <li>
              <Link href="/faq" target="_blank" className="seller-sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-500">
                <svg className="nav-icon w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"/></svg>
                <span>Yardım Merkezi</span>
              </Link>
            </li>
            {storeSlug && (
              <li>
                <Link href={`/store/${storeSlug}`} target="_blank" className="seller-sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-500">
                  <svg className="nav-icon w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                  <span>Mağazayı Görüntüle</span>
                </Link>
              </li>
            )}
            <li>
              <button onClick={handleSignOut} className="w-full seller-sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-error-base hover:!bg-error-light">
                <svg className="nav-icon w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
                <span>Çıkış Yap</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Sidebar footer */}
        <div className="p-4 border-t border-neutral-100">
          <p className="text-[11px] text-neutral-400 text-center">&copy; 2026 enolsun.com</p>
        </div>
      </aside>

      {/* MAIN WRAPPER */}
      <div className="lg:ml-64 min-h-screen transition-all duration-300">
        {/* TOP BAR */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-neutral-100">
          <div className="flex items-center justify-between h-16 px-4 lg:px-8">
            <div className="flex items-center gap-3 flex-1">
              <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-lg hover:bg-neutral-50 text-neutral-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
              </button>
              <div className="relative flex-1 max-w-md">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                <input type="text" placeholder="Sipariş, ürün veya müşteri ara..." className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-700 placeholder-neutral-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" />
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Bildirimler — dropdown */}
              <div className="relative">
                <button onClick={() => { setNotifOpen(!notifOpen); setAvatarMenuOpen(false) }} className="relative p-2 rounded-xl hover:bg-neutral-50 text-neutral-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
                  {orderCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-error-base text-white text-[10px] font-bold rounded-full px-1">{orderCount}</span>
                  )}
                </button>
                {notifOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-align-lg border border-neutral-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-neutral-100 flex items-center justify-between">
                      <p className="text-sm font-semibold text-neutral-900">Bildirimler</p>
                    </div>
                    {orderCount > 0 ? (
                      <Link href="/seller-orders" onClick={() => setNotifOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/></svg>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-800"><strong>{orderCount}</strong> bekleyen sipariş var</p>
                          <p className="text-xs text-neutral-400">Siparişleri görüntüle</p>
                        </div>
                      </Link>
                    ) : (
                      <p className="px-4 py-6 text-sm text-neutral-400 text-center">Yeni bildirim yok</p>
                    )}
                  </div>
                )}
              </div>

              {/* Mesajlar */}
              <Link href="/seller-messages" className="relative p-2 rounded-xl hover:bg-neutral-50 text-neutral-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                {msgCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-primary-500 text-white text-[10px] font-bold rounded-full px-1">{msgCount}</span>
                )}
              </Link>

              {/* Profil dropdown */}
              <div className="relative ml-1">
                <button onClick={() => { setAvatarMenuOpen(!avatarMenuOpen); setNotifOpen(false) }} className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-neutral-50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs font-semibold">{storeInitials}</div>
                  <svg className={`w-4 h-4 text-neutral-400 hidden sm:block transition-transform ${avatarMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                </button>
                {avatarMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-align-lg border border-neutral-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-neutral-100">
                      <p className="text-sm font-semibold text-neutral-900">{storeName}</p>
                      <p className="text-xs text-neutral-500">{storeEmail}</p>
                    </div>
                    <Link href="/seller-settings" onClick={() => setAvatarMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
                      Mağaza Ayarları
                    </Link>
                    {storeSlug && (
                      <Link href={`/store/${storeSlug}`} target="_blank" onClick={() => setAvatarMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                        Mağazayı Görüntüle
                      </Link>
                    )}
                    <div className="border-t border-neutral-100 mt-1 pt-1">
                      <button onClick={() => { setAvatarMenuOpen(false); handleSignOut() }} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-error-base hover:bg-error-light rounded-b-xl">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
                        Çıkış Yap
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="p-4 lg:p-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
