import Link from 'next/link'
import { FOOTER_LINKS } from '@/lib/constants'

export default function Footer() {
  return (
    <footer role="contentinfo" className="bg-neutral-900 text-neutral-300 pt-12 md:pt-16 pb-20 sm:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <svg aria-hidden="true" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>
              <span className="text-lg font-bold text-white">enolsun<span className="text-primary-400">.com</span></span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">Doganin ilhamiyla tasarlanan, surdurulebilir ve yenilikci urunlerin adresi.</p>
            <div className="flex gap-3">
              {/* Twitter/X */}
              <a href="https://twitter.com/enolsun" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-neutral-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors cursor-pointer min-w-[44px] min-h-[44px]">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              {/* Instagram */}
              <a href="https://instagram.com/enolsun" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-neutral-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors cursor-pointer min-w-[44px] min-h-[44px]">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              {/* YouTube */}
              <a href="https://youtube.com/@enolsun" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-neutral-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors cursor-pointer min-w-[44px] min-h-[44px]">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Hizli Linkler</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-neutral-400 hover:text-primary-400 transition-colors cursor-pointer min-h-[44px] sm:min-h-0 flex items-center">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Destek</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-neutral-400 hover:text-primary-400 transition-colors cursor-pointer min-h-[44px] sm:min-h-0 flex items-center">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Iletisim</h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 text-sm text-neutral-400 min-h-[44px] sm:min-h-0">
                <svg className="w-4 h-4 text-primary-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
                {FOOTER_LINKS.contact.email}
              </li>
              <li className="flex items-center gap-2 text-sm text-neutral-400 min-h-[44px] sm:min-h-0">
                <svg className="w-4 h-4 text-primary-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>
                {FOOTER_LINKS.contact.phone}
              </li>
              <li className="flex items-start gap-2 text-sm text-neutral-400 min-h-[44px] sm:min-h-0">
                <svg className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
                {FOOTER_LINKS.contact.address}
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800 pt-6 md:pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-neutral-500">&copy; 2026 enolsun.com — Tum haklari saklidir.</p>
            <div className="flex items-center gap-4">
              {FOOTER_LINKS.policies.map((link) => (
                <Link key={link.label} href={link.href} className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer">{link.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
