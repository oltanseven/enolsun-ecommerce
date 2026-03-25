import Link from 'next/link'

export default function GlobalNotFound() {
  return (
    <html lang="tr">
      <body className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center max-w-md">
          <div className="text-8xl font-extrabold text-gray-100 mb-4">404</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Sayfa Bulunamadi</h1>
          <p className="text-gray-500 mb-6">Aradiginiz sayfa mevcut degil.</p>
          <Link href="/" className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl transition-colors inline-block">
            Ana Sayfaya Don
          </Link>
        </div>
      </body>
    </html>
  )
}
