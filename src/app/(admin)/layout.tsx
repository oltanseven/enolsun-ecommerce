"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

const navItems = [
  { href: "/admin-dashboard", label: "Dashboard", icon: <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></> },
  { href: "/admin-users", label: "Kullanıcılar", icon: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></> },
  { href: "/admin-products", label: "Ürünler", icon: <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/> },
  { href: "/admin-orders", label: "Siparişler", icon: <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/> },
  { href: "/admin-categories", label: "Kategoriler", icon: <><path d="M4 7h16M4 12h16M4 17h10"/></> },
  { href: "/admin-coupons", label: "Kuponlar", icon: <><path d="M2 9a3 3 0 010-6h20a3 3 0 010 6M2 9v12h20V9M2 15h20M9 9v12"/></> },
]

interface AdminInfo {
  email: string
  full_name: string
  role: string
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false)
  const [admin, setAdmin] = useState<AdminInfo | null>(null)
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    async function checkAdmin() {
      const _sb = createClient()
      const { data: { user } } = await _sb.auth.getUser()
      if (!user) {
        router.replace("/login")
        return
      }

      const { data: profile } = await _sb
        .from("profiles")
        .select("full_name, role")
        .eq("id", user.id)
        .maybeSingle()

      if (!profile || (profile.role !== "admin" && profile.role !== "seller")) {
        router.replace("/")
        return
      }

      setAdmin({
        email: user.email || "",
        full_name: profile.full_name || "Admin",
        role: profile.role,
      })
      setAuthChecked(true)
    }
    checkAdmin()
  }, [router])

  const adminName = admin?.full_name || "Admin"
  const adminEmail = admin?.email || ""
  const adminInitials = adminName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)

  function toggleSidebar() { setSidebarOpen(!sidebarOpen) }

  async function handleSignOut() {
    const _sb = createClient()
    await _sb.auth.signOut()
    window.location.href = "/login"
  }

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
      </div>
    )
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
          <Link href="/admin-dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-primary-500 rounded-xl flex items-center justify-center shadow-align-sm">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <div>
              <span className="text-lg font-bold text-neutral-900">enolsun</span><span className="text-lg font-bold text-primary-500">.com</span>
              <p className="text-[11px] text-neutral-400 -mt-0.5">Yönetim Paneli</p>
            </div>
          </Link>
        </div>

        {/* Admin Info */}
        <div className="p-4 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary-700">
              {adminInitials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-neutral-900 truncate">{adminName}</p>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-700 text-[11px] font-medium rounded-full">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                Admin
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
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="my-4 border-t border-neutral-100"></div>

          <ul className="space-y-1">
            <li>
              <Link href="/" target="_blank" className="seller-sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-500">
                <svg className="nav-icon w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                <span>Siteyi Görüntüle</span>
              </Link>
            </li>
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
                <input type="text" placeholder="Kullanıcı, ürün veya sipariş ara..." className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-700 placeholder-neutral-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" />
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Profil dropdown */}
              <div className="relative ml-1">
                <button onClick={() => setAvatarMenuOpen(!avatarMenuOpen)} className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-neutral-50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs font-semibold">{adminInitials}</div>
                  <svg className={`w-4 h-4 text-neutral-400 hidden sm:block transition-transform ${avatarMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                </button>
                {avatarMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-align-lg border border-neutral-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-neutral-100">
                      <p className="text-sm font-semibold text-neutral-900">{adminName}</p>
                      <p className="text-xs text-neutral-500">{adminEmail}</p>
                    </div>
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
