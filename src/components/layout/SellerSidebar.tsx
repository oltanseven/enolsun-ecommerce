'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SELLER_NAV_ITEMS } from '@/lib/constants'

export default function SellerSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile sidebar open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  function isActive(href: string) {
    if (href === '/satici') return pathname === '/satici'
    return pathname.startsWith(href) && href !== '/satici'
  }

  const sidebarContent = (
    <>
      {/* Logo / Header */}
      <div className="p-5 border-b border-neutral-100">
        <Link href="/seller-register" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-primary-500 rounded-xl flex items-center justify-center shadow-align-sm">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
          <div className="sidebar-header-text">
            <span className="text-lg font-bold text-neutral-900">enolsun</span><span className="text-lg font-bold text-primary-500">.com</span>
            <p className="text-[11px] text-neutral-400 -mt-0.5">Satici Merkezi</p>
          </div>
        </Link>
      </div>

      {/* Seller Info */}
      <div className="p-4 border-b border-neutral-100">
        <div className="seller-info flex items-center gap-3">
          <div className="seller-avatar w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </div>
          <div className="seller-info-text min-w-0">
            <p className="text-sm font-semibold text-neutral-900 truncate">Yesil Yaprak Atolye</p>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary-50 text-primary-700 text-[11px] font-medium rounded-full">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              Premium Satici
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-3">
        {SELLER_NAV_ITEMS.map((section, sIdx) => (
          <div key={section.section}>
            {sIdx > 0 && <div className="my-4 border-t border-neutral-100"></div>}
            <ul className="space-y-1">
              {section.items.map((item) => {
                const active = isActive(item.href)
                const isExternal = 'external' in item && item.external
                const isDanger = 'danger' in item && item.danger
                const badge = 'badge' in item ? item.badge : undefined
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      {...(isExternal ? { target: '_blank' } : {})}
                      className={`sidebar-nav-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
                        active
                          ? 'active'
                          : isDanger
                          ? 'text-error-base hover:bg-error-light'
                          : 'text-neutral-600'
                      }`}
                    >
                      <SellerNavIcon icon={item.icon} />
                      <span className="sidebar-label flex-1">{item.label}</span>
                      {badge && (
                        <span className="nav-badge inline-flex items-center justify-center w-5 h-5 bg-error-base text-white text-[11px] font-semibold rounded-full">{badge}</span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Sidebar footer */}
      <div className="p-4 border-t border-neutral-100">
        <p className="sidebar-label text-[11px] text-neutral-400 text-center">&copy; 2026 enolsun.com</p>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div
          className="sidebar-overlay fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`sidebar fixed top-0 left-0 h-full w-64 bg-white border-r border-neutral-100 z-50 flex flex-col transform transition-all duration-300 lg:w-64 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile hamburger trigger (placed in seller topbar) */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 bg-white border border-neutral-100 rounded-lg shadow-align-sm"
        aria-label="Menu"
      >
        <svg className="w-5 h-5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/></svg>
      </button>
    </>
  )
}

function SellerNavIcon({ icon }: { icon: string }) {
  const cls = "nav-icon w-5 h-5 flex-shrink-0"
  const icons: Record<string, React.ReactNode> = {
    dashboard: <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,
    clipboard: <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>,
    box: <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>,
    chat: <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
    dollar: <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
    settings: <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
    chart: <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>,
    help: <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"/></svg>,
    external: <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>,
    logout: <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>,
  }
  return icons[icon] || icons.dashboard
}
