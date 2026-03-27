import { redirect } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MobileBottomNav from '@/components/layout/MobileBottomNav'
import ScrollToTop from '@/components/layout/ScrollToTop'
import ChatWidget from '@/components/layout/ChatWidget'
import ToastProvider from '@/components/ui/Toast'
import CookieConsent from '@/components/ui/CookieConsent'

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  if (process.env.MAINTENANCE_MODE === 'true') {
    redirect('/maintenance')
  }
  return (
    <>
      <Navbar />
      <main className="pt-16 pb-24 sm:pb-0">{children}</main>
      <Footer />
      <MobileBottomNav />
      <ScrollToTop />
      <ChatWidget />
      <ToastProvider />
      <CookieConsent />
    </>
  )
}
