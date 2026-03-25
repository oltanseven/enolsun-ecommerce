"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function SellerLoginPage() {
  const router = useRouter()

  // Redirect already-logged-in sellers to dashboard
  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user && user.user_metadata?.role === "seller") {
        router.replace("/seller-dashboard")
      }
    })
  }, [router])

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  // Toast state
  const [toast, setToast] = useState<{ type: string; title: string; message: string } | null>(null)
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  function showToast(type: string, title: string, message: string) {
    setToast({ type, title, message })
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    toastTimeoutRef.current = setTimeout(() => setToast(null), 4000)
  }

  async function handleSellerLogin(e: React.FormEvent) {
    e.preventDefault()
    setEmailError("")
    setPasswordError("")

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Gecerli bir e-posta adresi giriniz.")
      return
    }
    if (!password) {
      setPasswordError("Sifre alani bos birakilamaz.")
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setLoading(false)
      showToast("error", "Giris Basarisiz", error.message === "Invalid login credentials"
        ? "E-posta veya sifre hatali."
        : error.message)
      return
    }

    // Check role
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single()

    if (!profile || profile.role !== "seller") {
      await supabase.auth.signOut()
      setLoading(false)
      showToast("error", "Erisim Reddedildi", "Bu hesap bir satici hesabi degil.")
      return
    }

    showToast("success", "Basarili!", "Satici panelinize yonlendiriliyorsunuz...")
    setTimeout(() => router.push("/seller-dashboard"), 1000)
  }

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-[200] max-w-sm w-full transition-transform duration-300 ease-out pointer-events-none">
          <div className="bg-white rounded-xl shadow-align-xl border border-neutral-100 p-4 flex items-start gap-3 pointer-events-auto">
            <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
              toast.type === "success" ? "bg-success-light" :
              toast.type === "error" ? "bg-error-light" :
              toast.type === "warning" ? "bg-warning-light" : "bg-primary-50"
            }`}>
              {toast.type === "success" && (
                <svg className="w-4 h-4 text-success-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
              )}
              {toast.type === "error" && (
                <svg className="w-4 h-4 text-error-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/></svg>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-neutral-800">{toast.title}</p>
              <p className="text-xs text-neutral-500 mt-0.5">{toast.message}</p>
            </div>
            <button onClick={() => setToast(null)} className="flex-shrink-0 text-neutral-300 hover:text-neutral-500 transition-colors p-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
        </div>
      )}

      <main className="min-h-screen flex flex-col lg:flex-row">
        {/* Left: Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-12 xl:p-16 pb-20 sm:pb-8 lg:pb-12 xl:pb-16 relative">
          <div className="w-full max-w-[440px] space-y-6 sm:space-y-7">

            {/* Logo */}
            <div className="opacity-0 animate-fade-in-up flex justify-center sm:justify-start">
              <Link href="/" className="inline-flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center shadow-md shadow-primary-500/20 group-hover:shadow-lg group-hover:shadow-primary-500/30 transition-shadow duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <span className="text-xl font-bold text-neutral-800 tracking-tight">enolsun<span className="text-primary-500">.com</span></span>
              </Link>
            </div>

            {/* Header */}
            <div className="space-y-2 opacity-0 animate-fade-in-up delay-100">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-semibold mb-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.15c0 .415.336.75.75.75z"/>
                </svg>
                Satici Merkezi
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight text-center sm:text-left">Satici Girisi</h1>
              <p className="text-neutral-500 text-sm leading-relaxed text-center sm:text-left">Magaza panelinize giris yaparak satislarinizi yonetin.</p>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSellerLogin} noValidate>
              {/* Email */}
              <div className="space-y-1.5 opacity-0 animate-fade-in-up delay-200">
                <label htmlFor="seller-email" className="block text-sm font-medium text-neutral-700">E-posta Adresi</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <svg className="h-[18px] w-[18px] text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="seller-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ornek@magaza.com"
                    required
                    autoComplete="email"
                    className="block w-full rounded-xl border border-neutral-200 bg-white py-3 min-h-[48px] pl-11 pr-4 text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300"
                  />
                  {emailError && <p className="mt-1 text-xs text-error-base">{emailError}</p>}
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5 opacity-0 animate-fade-in-up delay-300">
                <label htmlFor="seller-password" className="block text-sm font-medium text-neutral-700">Sifre</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <svg className="h-[18px] w-[18px] text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="seller-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Sifrenizi girin"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-xl border border-neutral-200 bg-white py-3 min-h-[48px] pl-11 pr-11 text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-300 hover:text-neutral-500 transition-colors"
                    tabIndex={-1}
                  >
                    {!showPassword ? (
                      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                    ) : (
                      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
                      </svg>
                    )}
                  </button>
                  {passwordError && <p className="mt-1 text-xs text-error-base">{passwordError}</p>}
                </div>
              </div>

              {/* Remember / Forgot */}
              <div className="flex items-center justify-between opacity-0 animate-fade-in-up delay-400">
                <label className="flex items-center gap-2.5 cursor-pointer group min-h-[44px]">
                  <div className="relative">
                    <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="peer sr-only" />
                    <div className="w-[18px] h-[18px] rounded-md border border-neutral-200 bg-white transition-all duration-200 peer-checked:bg-primary-500 peer-checked:border-primary-500 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-300 peer-focus-visible:ring-offset-1 group-hover:border-neutral-300"></div>
                    <svg className="absolute top-[3px] left-[3px] w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                    </svg>
                  </div>
                  <span className="text-sm text-neutral-500 select-none">Beni Hatirla</span>
                </label>
                <Link href="#" className="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors min-h-[44px] flex items-center">Sifremi Unuttum</Link>
              </div>

              {/* Submit */}
              <div className="opacity-0 animate-fade-in-up delay-500">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary-500 px-5 py-3 min-h-[48px] text-sm font-semibold text-white shadow-md shadow-primary-500/20 transition-all duration-200 hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-500/30 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-60"
                >
                  {loading ? "Giris yapiliyor..." : "Giris Yap"}
                  {!loading && (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                    </svg>
                  )}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="relative opacity-0 animate-fade-in-up delay-500">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-100"></div></div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-neutral-25 px-4 text-neutral-400 font-medium uppercase tracking-wider">veya</span>
              </div>
            </div>

            {/* e-Devlet Button */}
            <div className="space-y-3 opacity-0 animate-fade-in-up delay-600">
              <button
                type="button"
                className="edevlet-btn w-full flex items-center justify-center gap-3 rounded-xl px-5 py-3 min-h-[48px] text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:scale-[0.98]"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/>
                </svg>
                e-Devlet ile Giris
              </button>
            </div>

            {/* Register Link */}
            <div className="space-y-2 opacity-0 animate-fade-in-up delay-600">
              <p className="text-center text-sm text-neutral-400">
                Henuz satici degil misiniz?{" "}
                <Link href="/seller-register" className="font-semibold text-primary-500 hover:text-primary-600 transition-colors">Hemen Basvurun</Link>
              </p>
              <p className="text-center text-xs text-neutral-300">
                <Link href="/login" className="hover:text-primary-500 transition-colors underline underline-offset-2">Musteri girisi icin tiklayin</Link>
              </p>
            </div>

          </div>
        </div>

        {/* Right: Decorative Panel */}
        <div className="hidden lg:flex lg:w-1/2 seller-gradient relative overflow-hidden items-center justify-center p-12 xl:p-16">
          {/* Floating decorative elements */}
          <div className="absolute top-16 left-12 w-80 h-80 bg-primary-400/[0.08] rounded-full blur-3xl float-slow"></div>
          <div className="absolute bottom-20 right-8 w-96 h-96 bg-primary-300/[0.06] rounded-full blur-3xl float-reverse"></div>
          <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-white/[0.03] rounded-full blur-2xl animate-float" style={{ animationDelay: "-2s" }}></div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>

          {/* Decorative lines */}
          <div className="absolute top-24 right-16 w-32 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent float-slow"></div>
          <div className="absolute bottom-32 left-20 w-48 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent float-reverse"></div>

          {/* Decorative circles */}
          <div className="absolute top-40 right-24 w-3 h-3 rounded-full bg-primary-400/30 float-reverse"></div>
          <div className="absolute bottom-48 left-28 w-2 h-2 rounded-full bg-primary-300/40 float-slow"></div>
          <div className="absolute top-1/2 right-12 w-4 h-4 rounded-full border border-white/10 float-slow" style={{ animationDelay: "-4s" }}></div>

          {/* Content */}
          <div className="relative z-10 text-center space-y-10 max-w-lg">
            {/* Branding */}
            <div className="space-y-4 opacity-0 animate-fade-in-up delay-200">
              <div className="inline-flex items-center gap-3 mb-2">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center">
                  <svg className="w-7 h-7 text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.15c0 .415.336.75.75.75z"/>
                  </svg>
                </div>
              </div>
              <h2 className="text-3xl xl:text-4xl font-bold text-white tracking-tight leading-tight">
                enolsun<br/>
                <span className="text-primary-300">Satici Merkezi</span>
              </h2>
              <p className="text-white/60 text-base leading-relaxed max-w-sm mx-auto">
                En hizli buyuyen pazar yerinde satisa basla!
              </p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-3 gap-3 xl:gap-4 opacity-0 animate-fade-in-up delay-400">
              <div className="stat-glass rounded-2xl px-4 py-5 text-center transition-transform duration-300 hover:scale-105 hover:-translate-y-1">
                <div className="text-2xl xl:text-3xl font-bold text-white mb-1">50.000+</div>
                <div className="text-xs text-white/50 font-medium">Satici</div>
              </div>
              <div className="stat-glass rounded-2xl px-4 py-5 text-center transition-transform duration-300 hover:scale-105 hover:-translate-y-1">
                <div className="text-2xl xl:text-3xl font-bold text-white mb-1">2M+</div>
                <div className="text-xs text-white/50 font-medium">Musteri</div>
              </div>
              <div className="stat-glass rounded-2xl px-4 py-5 text-center transition-transform duration-300 hover:scale-105 hover:-translate-y-1">
                <div className="text-2xl xl:text-3xl font-bold text-primary-300 mb-1">&#8378;500M+</div>
                <div className="text-xs text-white/50 font-medium">Ciro</div>
              </div>
            </div>

            {/* Trust badge */}
            <div className="opacity-0 animate-fade-in-up delay-600">
              <div className="stat-glass rounded-2xl px-6 py-4 inline-flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary-400/30 border-2 border-white/10 flex items-center justify-center text-xs font-bold text-white">A</div>
                  <div className="w-8 h-8 rounded-full bg-primary-500/30 border-2 border-white/10 flex items-center justify-center text-xs font-bold text-white">M</div>
                  <div className="w-8 h-8 rounded-full bg-primary-600/30 border-2 border-white/10 flex items-center justify-center text-xs font-bold text-white">K</div>
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-white">En cok kazandiran platform</div>
                  <div className="text-xs text-white/40">Satista en olsun, enolsun!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
