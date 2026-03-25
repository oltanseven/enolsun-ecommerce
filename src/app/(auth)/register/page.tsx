'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type ToastType = 'success' | 'error'

export default function RegisterPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [terms, setTerms] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [strength, setStrength] = useState(0)
  const [strengthText, setStrengthText] = useState('')
  const [toast, setToast] = useState<{ message: string; type: ToastType; visible: boolean }>({ message: '', type: 'success', visible: false })

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    setToast({ message, type, visible: true })
    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 3500)
  }, [])

  // Check if already logged in
  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const role = user.user_metadata?.role
        if (role === 'seller') {
          router.replace('/seller-dashboard')
        } else {
          router.replace('/dashboard')
        }
      }
    }
    checkSession()
  }, [router])

  // Password strength
  const checkStrength = (pw: string) => {
    let s = 0
    if (pw.length >= 6) s++
    if (pw.length >= 8) s++
    if (/[A-Z]/.test(pw)) s++
    if (/[0-9]/.test(pw)) s++
    if (/[^A-Za-z0-9]/.test(pw)) s++
    const level = Math.min(s, 4)
    setStrength(level)
    const texts = ['', 'Zayif', 'Orta', 'Iyi', 'Guclu']
    setStrengthText(pw ? texts[level] : '')
  }

  const strengthColors = ['bg-neutral-100', 'bg-red-400', 'bg-yellow-400', 'bg-primary-400', 'bg-green-500']

  // Step progress
  const step1Done = !!(fullName && email && phone)
  const step2Done = !!(password.length >= 6 && confirmPassword === password && confirmPassword)
  const step3Done = terms

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!fullName.trim() || !email.trim() || !password) {
      showToast('Lutfen tum zorunlu alanlari doldurun.', 'error')
      return
    }
    if (password.length < 6) {
      showToast('Sifre en az 6 karakter olmalidir.', 'error')
      return
    }
    if (password !== confirmPassword) {
      showToast('Sifreler eslesmiyoyor!', 'error')
      return
    }
    if (!terms) {
      showToast('Kullanim kosullarini kabul etmeniz gerekiyor.', 'error')
      return
    }

    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            phone: phone.trim(),
            role: 'customer',
          },
        },
      })

      if (error) {
        showToast(error.message, 'error')
        setLoading(false)
        return
      }

      showToast('Kayit basarili! Giris sayfasina yonlendiriliyorsunuz...')
      setTimeout(() => router.push('/login'), 1500)
    } catch {
      showToast('Bir hata olustu. Lutfen tekrar deneyin.', 'error')
      setLoading(false)
    }
  }

  const handleSocialRegister = (provider: string) => {
    showToast(`${provider} ile kayit yakinda aktif olacak.`, 'error')
  }

  return (
    <>
      {/* Toast */}
      <div className={`fixed top-4 right-4 z-[100] transform transition-transform duration-300 ease-in-out ${toast.visible ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className={`flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-align-lg text-sm font-medium max-w-sm ${
          toast.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {toast.type === 'success' ? (
            <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          ) : (
            <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/></svg>
          )}
          <span>{toast.message}</span>
        </div>
      </div>

      <main id="main-content" className="min-h-screen flex flex-col lg:flex-row">
        {/* Left: Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-10 xl:p-16 pb-20 sm:pb-8 lg:pb-10 xl:pb-16 relative">
          <div className="w-full max-w-[440px] space-y-4 sm:space-y-6">
            {/* Logo */}
            <div className="opacity-0 animate-fade-in-up flex justify-center sm:justify-start">
              <Link href="/" className="inline-flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center shadow-md shadow-primary-500/20 group-hover:shadow-lg group-hover:shadow-primary-500/30 transition-shadow duration-300">
                  <svg aria-hidden="true" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </div>
                <span className="text-xl font-bold text-neutral-800 tracking-tight">enolsun<span className="text-primary-500">.com</span></span>
              </Link>
            </div>

            {/* Step Indicator */}
            <div className="opacity-0 animate-fade-in-up [animation-delay:0.1s]">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-semibold transition-all duration-300 ${step1Done ? 'bg-primary-500 text-white shadow-sm shadow-primary-500/20' : 'bg-primary-500 text-white shadow-sm shadow-primary-500/20'}`}>
                    {step1Done ? <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg> : '1'}
                  </div>
                  <span className="text-[10px] sm:text-xs font-medium text-primary-600 hidden sm:inline">Bilgiler</span>
                </div>
                <div className="flex-1 h-0.5 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-400 rounded-full transition-all duration-500" style={{ width: step1Done ? '100%' : '0%' }} />
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-semibold transition-all duration-300 ${step2Done ? 'bg-primary-500 text-white shadow-sm shadow-primary-500/20' : step1Done ? 'bg-primary-500 text-white shadow-sm shadow-primary-500/20' : 'bg-neutral-100 text-neutral-400'}`}>
                    {step2Done ? <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg> : '2'}
                  </div>
                  <span className={`text-[10px] sm:text-xs font-medium hidden sm:inline ${step1Done ? 'text-primary-600' : 'text-neutral-400'}`}>Guvenlik</span>
                </div>
                <div className="flex-1 h-0.5 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-400 rounded-full transition-all duration-500" style={{ width: step2Done ? '100%' : '0%' }} />
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-semibold transition-all duration-300 ${step3Done ? 'bg-primary-500 text-white shadow-sm shadow-primary-500/20' : 'bg-neutral-100 text-neutral-400'}`}>
                    {step3Done ? <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg> : '3'}
                  </div>
                  <span className={`text-[10px] sm:text-xs font-medium hidden sm:inline ${step2Done ? 'text-primary-600' : 'text-neutral-400'}`}>Onay</span>
                </div>
              </div>
            </div>

            {/* Header */}
            <div className="space-y-2 opacity-0 animate-fade-in-up [animation-delay:0.2s]">
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight text-center sm:text-left">Hesap olusturun</h1>
              <p className="text-neutral-500 text-sm leading-relaxed text-center sm:text-left">Hemen kayit olun ve alisverise baslayin.</p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleRegister}>
              {/* Full Name */}
              <div className="space-y-1.5 opacity-0 animate-fade-in-up [animation-delay:0.2s]">
                <label htmlFor="fullname" className="block text-sm font-medium text-neutral-700">Ad Soyad</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <svg className="h-[18px] w-[18px] text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>
                  </div>
                  <input type="text" id="fullname" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Adiniz ve soyadiniz" className="block w-full rounded-xl border border-neutral-200 bg-white py-3 min-h-[48px] pr-4 text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300" style={{ paddingLeft: '2.75rem' }} />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5 opacity-0 animate-fade-in-up [animation-delay:0.3s]">
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700">E-posta Adresi</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <svg className="h-[18px] w-[18px] text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
                  </div>
                  <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ornek@email.com" className="block w-full rounded-xl border border-neutral-200 bg-white py-3 min-h-[48px] pr-4 text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300" style={{ paddingLeft: '2.75rem' }} />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1.5 opacity-0 animate-fade-in-up [animation-delay:0.3s]">
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-700">Telefon Numarasi</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <svg className="h-[18px] w-[18px] text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"/></svg>
                  </div>
                  <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="05XX XXX XX XX" className="block w-full rounded-xl border border-neutral-200 bg-white py-3 min-h-[48px] pr-4 text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300" style={{ paddingLeft: '2.75rem' }} />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5 opacity-0 animate-fade-in-up [animation-delay:0.4s]">
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700">Sifre</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <svg className="h-[18px] w-[18px] text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/></svg>
                  </div>
                  <input type={showPassword ? 'text' : 'password'} id="password" value={password} onChange={(e) => { setPassword(e.target.value); checkStrength(e.target.value) }} placeholder="En az 8 karakter" className="block w-full rounded-xl border border-neutral-200 bg-white py-3 min-h-[48px] pr-11 text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300" style={{ paddingLeft: '2.75rem' }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-300 hover:text-neutral-500 transition-colors" tabIndex={-1}>
                    {showPassword ? (
                      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/></svg>
                    ) : (
                      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    )}
                  </button>
                </div>
                {/* Strength bars */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-1.5 sm:h-1 flex-1 rounded-full bg-neutral-100 overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-400 ${strength >= i ? strengthColors[strength] : ''}`} style={{ width: strength >= i ? '100%' : '0%' }} />
                      </div>
                    ))}
                  </div>
                  <p className={`text-xs transition-colors duration-300 ${strength === 0 ? 'text-neutral-300' : strength === 1 ? 'text-red-500' : strength === 2 ? 'text-yellow-500' : strength === 3 ? 'text-primary-500' : 'text-green-500'}`}>{strengthText}</p>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5 opacity-0 animate-fade-in-up [animation-delay:0.5s]">
                <label htmlFor="confirm-password" className="block text-sm font-medium text-neutral-700">Sifre Tekrar</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <svg className="h-[18px] w-[18px] text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>
                  </div>
                  <input type={showConfirmPassword ? 'text' : 'password'} id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Sifrenizi tekrar girin" className="block w-full rounded-xl border border-neutral-200 bg-white py-3 min-h-[48px] pr-11 text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300" style={{ paddingLeft: '2.75rem' }} />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-300 hover:text-neutral-500 transition-colors" tabIndex={-1}>
                    {showConfirmPassword ? (
                      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/></svg>
                    ) : (
                      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="opacity-0 animate-fade-in-up [animation-delay:0.5s]">
                <label className="flex items-start gap-2.5 cursor-pointer group min-h-[44px]">
                  <div className="relative mt-0.5">
                    <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="peer sr-only" />
                    <div className="w-[18px] h-[18px] rounded-md border border-neutral-200 bg-white transition-all duration-200 peer-checked:bg-primary-500 peer-checked:border-primary-500 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-300 peer-focus-visible:ring-offset-1 group-hover:border-neutral-300" />
                    <svg className="absolute top-[3px] left-[3px] w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                  </div>
                  <span className="text-sm text-neutral-500 leading-snug select-none">
                    <Link href="#" className="font-medium text-primary-500 hover:text-primary-600 transition-colors">Kullanim Kosullari</Link>{`'ni ve `}
                    <Link href="#" className="font-medium text-primary-500 hover:text-primary-600 transition-colors">Gizlilik Politikasi</Link>{`'ni kabul ediyorum.`}
                  </span>
                </label>
              </div>

              {/* Submit */}
              <div className="opacity-0 animate-fade-in-up [animation-delay:0.6s] pt-1">
                <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary-500 px-5 py-3 min-h-[48px] text-sm font-semibold text-white shadow-md shadow-primary-500/20 transition-all duration-200 hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-500/30 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-70">
                  {loading ? (
                    <>
                      <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>
                      Kayit yapiliyor...
                    </>
                  ) : (
                    <>
                      Kayit Ol
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="relative opacity-0 animate-fade-in-up [animation-delay:0.6s]">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-100" /></div>
              <div className="relative flex justify-center text-xs"><span className="bg-neutral-25 px-4 text-neutral-500 font-medium uppercase tracking-wider">veya</span></div>
            </div>

            {/* Social Buttons */}
            <div className="space-y-3 opacity-0 animate-fade-in-up [animation-delay:0.7s]">
              <button type="button" onClick={() => handleSocialRegister('Google')} className="w-full flex items-center justify-center gap-3 rounded-xl border border-neutral-200 bg-white px-5 py-3 min-h-[48px] text-sm font-medium text-neutral-700 shadow-sm transition-all duration-200 hover:bg-neutral-50 hover:border-neutral-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-1 active:scale-[0.98]">
                <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Google ile kayit ol
              </button>
              <button type="button" onClick={() => handleSocialRegister('Apple')} className="w-full flex items-center justify-center gap-3 rounded-xl border border-neutral-200 bg-white px-5 py-3 min-h-[48px] text-sm font-medium text-neutral-700 shadow-sm transition-all duration-200 hover:bg-neutral-50 hover:border-neutral-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-1 active:scale-[0.98]">
                <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                Apple ile kayit ol
              </button>
            </div>

            {/* Login Link */}
            <p className="text-center text-sm text-neutral-400 opacity-0 animate-fade-in-up [animation-delay:0.7s]">
              Zaten hesabiniz var mi?{' '}
              <Link href="/login" className="font-semibold text-primary-500 hover:text-primary-600 transition-colors">Giris Yap</Link>
            </p>
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
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/></svg>
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-white tracking-tight">Toplulugumuza Katilin</h2>
                <p className="text-white/70 text-sm leading-relaxed">Binlerce memnun musterimize katilin. Kayit olun, ilk siparisinde %15 indirim kazanin.</p>
              </div>
            </div>

            <div className="space-y-3 opacity-0 animate-fade-in [animation-delay:0.5s]">
              {[
                { icon: <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>, title: 'Ucretsiz Kargo', sub: '150 TL uzeri siparislerde' },
                { icon: <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>, title: 'Guvenli Odeme', sub: '256-bit SSL sifreleme' },
                { icon: <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"/></svg>, title: 'Kolay Iade', sub: '14 gun icinde ucretsiz iade' },
              ].map((item) => (
                <div key={item.title} className="glass-card rounded-2xl px-5 py-3.5 flex items-center gap-3 text-left">
                  <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">{item.icon}</div>
                  <div>
                    <div className="text-sm font-medium text-white">{item.title}</div>
                    <div className="text-xs text-white/50">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
