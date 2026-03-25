import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 pt-20">
      <div className="text-center max-w-md">
        <div className="text-8xl font-extrabold text-primary-100 mb-4">404</div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Sayfa Bulunamadi</h1>
        <p className="text-neutral-500 mb-6">Aradiginiz sayfa mevcut degil veya tasindi. EN iyi urunlerimize goz atin!</p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/" className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-xl transition-colors">
            Ana Sayfaya Don
          </Link>
          <Link href="/products" className="px-5 py-2.5 border border-neutral-200 text-neutral-700 text-sm font-semibold rounded-xl hover:bg-neutral-50 transition-colors">
            Urunlere Goz At
          </Link>
        </div>
      </div>
    </div>
  )
}
