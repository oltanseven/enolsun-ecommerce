'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './Logo'
import MobileMenu from './MobileMenu'
import { NAV_ITEMS, MEGA_MENU_CATEGORIES } from '@/lib/constants'

export default function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  // Simple auth check placeholder (connect Supabase later)
  const isLoggedIn = false
  const userInitial = 'E'

  function isActive(href: string) {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <nav aria-label="Ana navigasyon" className="fixed top-0 left-0 right-0 z-50 glass border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Logo />

            {/* Nav Links — Desktop only */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                item.hasMegaMenu ? (
                  <div key={item.href} className="mega-menu-trigger">
                    <Link
                      href={item.href}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors inline-flex items-center gap-1 ${
                        isActive(item.href)
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50'
                      }`}
                    >
                      {item.label}
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg>
                    </Link>
                    {/* Mega Menu Dropdown */}
                    <div className="mega-menu pt-2">
                      <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-xl p-6">
                        <div className="flex gap-6">
                          {/* Left: Main Categories */}
                          <div className="w-56 shrink-0 space-y-1">
                            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3 px-3">Kategoriler</p>
                            {MEGA_MENU_CATEGORIES.map((cat) => (
                              <div key={cat.href} className="mega-cat-item group/cat relative">
                                <Link href={cat.href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary-25 transition-colors">
                                  <div className="mega-cat-icon w-9 h-9 bg-neutral-50 rounded-xl flex items-center justify-center transition-colors">
                                    <MegaCategoryIcon icon={cat.icon} />
                                  </div>
                                  <span className="mega-cat-label text-sm font-medium text-neutral-700 transition-colors">{cat.label}</span>
                                </Link>
                                <div className="mega-subcats absolute left-full top-0 ml-6 w-[520px] grid grid-cols-3 gap-x-6 gap-y-2 bg-white p-4 rounded-xl">
                                  {cat.subcategories.map((sub) => (
                                    <div key={sub.group}>
                                      <p className="text-xs font-semibold text-primary-500 mb-2">{sub.group}</p>
                                      {sub.items.map((subItem) => (
                                        <Link key={subItem} href="#" className="block text-sm text-neutral-500 hover:text-primary-600 py-1">{subItem}</Link>
                                      ))}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                          {/* Right: Default promo */}
                          <div className="mega-subcats-default flex-1 bg-primary-25 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-4">
                              <svg className="w-8 h-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
                            </div>
                            <p className="text-sm font-semibold text-neutral-700 mb-1">Tum Urunleri Kesfedin</p>
                            <p className="text-xs text-neutral-400 mb-4">Kategori uzerine gelerek alt kategorileri gorun</p>
                            <Link href="/products" className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary-500 text-white text-xs font-semibold rounded-lg hover:bg-primary-600 transition-colors">
                              Urunlere Git
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>

            {/* Advanced Search Bar — Desktop only */}
            <div className="hidden lg:block w-96">
              <div className="relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
                <input
                  type="text"
                  placeholder="Urun, kategori veya marka ara..."
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-100 rounded-xl text-sm text-neutral-700 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Mobile Search Icon */}
              <button
                aria-label="Ara"
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className="lg:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
              </button>

              {/* Wishlist — hidden on smallest mobile */}
              <Link href="/wishlist" className="hidden sm:flex p-2 min-w-[44px] min-h-[44px] items-center justify-center text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
                </svg>
              </Link>

              {/* Cart with Badge */}
              <Link href="/cart" className="relative p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors badge-pulse cursor-pointer" aria-label="Sepet">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
                </svg>
              </Link>

              {/* Avatar — hidden on mobile */}
              <Link
                aria-label="Hesabim"
                href={isLoggedIn ? '/profile' : '/login'}
                className="hidden sm:flex w-8 h-8 rounded-full bg-primary-100 border-2 border-primary-200 items-center justify-center text-sm font-semibold text-primary-700 hover:border-primary-400 transition-colors cursor-pointer"
              >
                {userInitial}
              </Link>

              {/* Hamburger Menu Button — Mobile only */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer"
                aria-label="Menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Panel */}
        {mobileSearchOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-neutral-100 shadow-align-md p-4 z-50">
            <div className="relative max-w-7xl mx-auto">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
              <input
                type="text"
                placeholder="Urun, kategori veya marka ara..."
                className="w-full pl-10 pr-12 py-3 bg-neutral-50 border border-neutral-100 rounded-xl text-sm text-neutral-700 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 focus:bg-white transition-all"
                autoFocus
              />
              <button
                onClick={() => setMobileSearchOpen(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 min-w-[44px] min-h-[44px] flex items-center justify-center text-neutral-400 hover:text-neutral-600 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="mt-3 max-w-7xl mx-auto">
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Populer</p>
              <div className="flex flex-wrap gap-2">
                {['Bambu Saksi', 'Gece Lambasi', 'Organik Krem'].map((term) => (
                  <Link key={term} href="#" className="px-3 py-1.5 bg-neutral-50 hover:bg-primary-50 text-sm text-neutral-600 hover:text-primary-600 rounded-lg transition-colors">{term}</Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}

function MegaCategoryIcon({ icon }: { icon: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    home: <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/></svg>,
    sparkles: <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/></svg>,
    fire: <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"/></svg>,
    lightbulb: <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/></svg>,
    cube: <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"/></svg>,
    globe: <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64"/></svg>,
    device: <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"/></svg>,
    tag: <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"/><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z"/></svg>,
  }
  return iconMap[icon] || iconMap.home
}
