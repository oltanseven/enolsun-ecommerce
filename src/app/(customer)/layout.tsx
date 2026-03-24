import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MobileBottomNav from '@/components/layout/MobileBottomNav'
import ScrollToTop from '@/components/layout/ScrollToTop'
import ChatWidget from '@/components/layout/ChatWidget'

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-16 pb-20 md:pb-0">{children}</main>
      <Footer />
      <MobileBottomNav />
      <ScrollToTop />
      <ChatWidget />
    </>
  )
}
