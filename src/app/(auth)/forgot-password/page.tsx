'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

type ToastType = 'success' | 'error' | 'info'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: ToastType; visible: boolean }>({ message: '', type: 'info', visible: false })

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    setToast({ message, type, visible: true })
    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 3500)
  }, [])

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      showToast('Lutfen e-posta adresinizi giriniz.', 'error')
      return
    }

    setLoading(true)

    try {
      const _sb = createClient()
      const { error } = await _sb.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        showToast(error.message, 'error')
        setLoading(false)
        return
      }

      setSent(true)
      showToast('Sifre sifirlama baglantisi e-posta adresinize gonderildi.', 'success')
    } catch {
      showToast('Bir hata olustu. Lutfen tekrar deneyin.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <title>Sifremi Unuttum | enolsun.com</title>
      <meta name="description" content="enolsun.com hesabinizin sifresini sifirlayin." />

      {/* Toast Notification */}
      <div className={`fixed top-4 right-4 z-[100] transform transition-transform duration-300 ease-in-out ${toast.visible ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className={`flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-align-lg text-sm font-medium max-w-sm ${
          toast.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' :
          toast.type === 'error' ? 'bg-red-50 text-red-800 border border-red-200' :
          'bg-primary-50 text-primary-800 border border-primary-200'
        }`}>
          {toast.type === 'success' && (
            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          )}
          {toast.type === 'error' && (
            <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/></svg>
          )}
          {toast.type === 'info' && (
            <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/></svg>
          )}
          <span>{toast.message}</span>
        </div>
      </div>

      <main id="main-content" className="min-h-screen flex flex-col lg:flex-row">
        {/* Left: Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-12 xl:p-16 pb-20 sm:pb-8 lg:pb-12 xl:pb-16 relative">
          <div className="w-full max-w-[440px] space-y-6 sm:space-y-8">
            {/* Logo */}
            <div className="opacity-0 animate-fade-in-up flex justify-center sm:justify-start">
              <Link href="/" className="inline-flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center shadow-md shadow-primary-500/20 group-hover:shadow-lg group-hover:shadow-primary-500/30 transition-shadow duration-300">
                  <svg aria-hidden="true" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <span className="text-xl font-bold text-neutral-800 tracking-tight">enolsun<span className="text-primary-500">.com</span></span>
              </Link>
            </div>

            {/* Header */}
            <div className="space-y-2 opacity-0 animate-fade-in-up [animation-delay:0.1s]">
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight text-center sm:text-left">Sifrenizi mi Unuttunuz?</h1>
              <p className="text-neutral-500 text-sm leading-relaxed text-center sm:text-left">E-posta adresinizi girin, size sifre sifirlama baglantisi gonderelim.</p>
            </div>

            {sent ? (
              /* Success State */
              <div className="opacity-0 animate-fade-in-up [animation-delay:0.2s] space-y-6">
                <div className="rounded-xl bg-green-50 border border-green-200 p-6 text-center space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-green-100 flex items-center justify-center">
                    <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-green-800">E-posta Gonderildi!</h2>
                  <p className="text-sm text-green-700 leading-relaxed">
                    <span className="font-medium">{email}</span> adresine sifre sifirlama baglantisi gonderdik. Lutfen gelen kutunuzu kontrol edin.
                  </p>
                </div>

                <div className="text-center">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/></svg>
                    Giris sayfasina don
                  </Link>
                </div>
              </div>
            ) : (
              /* Form */
              <form className="space-y-5" onSubmit={handleReset}>
                {/* Email */}
                <div className="space-y-1.5 opacity-0 animate-fade-in-up [animation-delay:0.2s]">
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700">E-posta Adresiniz</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                      <svg className="h-[18px] w-[18px] text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                      </svg>
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ornek@email.com"
                      className="block w-full rounded-xl border border-neutral-200 bg-white py-3 min-h-[48px] pr-4 text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300"
                      style={{ paddingLeft: '2.75rem' }}
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="opacity-0 animate-fade-in-up [animation-delay:0.3s]">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary-500 px-5 py-3 min-h-[48px] text-sm font-semibold text-white shadow-md shadow-primary-500/20 transition-all duration-200 hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-500/30 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>
                        Gonderiliyor...
                      </>
                    ) : (
                      <>
                        Sifre Sifirla
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Back to Login */}
            {!sent && (
              <p className="text-center text-sm text-neutral-400 opacity-0 animate-fade-in-up [animation-delay:0.4s]">
                Sifrenizi hatirliyorsaniz{' '}
                <Link href="/login" className="font-semibold text-primary-500 hover:text-primary-600 transition-colors">Giris Yap</Link>
              </p>
            )}
          </div>
        </div>

        {/* Right: Decorative */}
        <div className="hidden lg:flex lg:w-1/2 gradient-mesh relative overflow-hidden items-center justify-center p-12 xl:p-16">
          <div className="absolute top-20 left-16 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-24 right-12 w-96 h-96 bg-primary-300/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '-1.5s' }} />

          <div className="relative z-10 text-center space-y-8 max-w-md">
            <div className="glass-card rounded-3xl p-8 space-y-6 opacity-0 animate-fade-in [animation-delay:0.3s]">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                </svg>
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-white tracking-tight">Sifrenizi Sifirlayin</h2>
                <p className="text-white/70 text-sm leading-relaxed">E-posta adresinize gonderecegimiz baglanti ile yeni bir sifre olusturabilirsiniz.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
