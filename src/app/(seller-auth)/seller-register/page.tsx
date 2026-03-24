"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function SellerRegisterPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [logoName, setLogoName] = useState("")

  // Form data
  const [form, setForm] = useState({
    firstName: "", lastName: "", tcKimlik: "", phone: "", email: "", password: "",
    storeName: "", category: "", storeDesc: "",
    companyType: "sahis", taxOffice: "", taxNumber: "", iban: "", bankName: "",
    sellerAgreement: false, kvkkAgreement: false,
  })

  // Toast
  const [toast, setToast] = useState<{ type: string; title: string; message: string } | null>(null)
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  function showToast(type: string, title: string, message: string) {
    setToast({ type, title, message })
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    toastTimeoutRef.current = setTimeout(() => setToast(null), 4000)
  }

  function updateForm(key: string, value: string | boolean) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  function validateStep(step: number): boolean {
    switch (step) {
      case 1:
        if (!form.firstName || !form.lastName) { showToast("error", "Hata", "Ad ve soyad zorunludur."); return false }
        if (!form.tcKimlik || form.tcKimlik.length !== 11) { showToast("error", "Hata", "TC Kimlik 11 haneli olmalidir."); return false }
        if (!form.phone) { showToast("error", "Hata", "Telefon numarasi zorunludur."); return false }
        if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { showToast("error", "Hata", "Gecerli bir e-posta giriniz."); return false }
        if (!form.password || form.password.length < 6) { showToast("error", "Hata", "Sifre en az 6 karakter olmalidir."); return false }
        return true
      case 2:
        if (!form.storeName) { showToast("error", "Hata", "Magaza adi zorunludur."); return false }
        if (!form.category) { showToast("error", "Hata", "Kategori seciniz."); return false }
        return true
      case 3:
        if (!form.taxOffice || !form.taxNumber) { showToast("error", "Hata", "Vergi bilgileri zorunludur."); return false }
        if (!form.iban) { showToast("error", "Hata", "IBAN zorunludur."); return false }
        if (!form.bankName) { showToast("error", "Hata", "Banka seciniz."); return false }
        return true
      case 4:
        if (!form.sellerAgreement || !form.kvkkAgreement) { showToast("error", "Hata", "Tum sozlesmeleri onaylayin."); return false }
        return true
      default: return true
    }
  }

  function nextStep() {
    if (!validateStep(currentStep)) return
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  function prevStep() {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) { showToast("error", "Hata", "Dosya boyutu 2MB'den kucuk olmali."); return }
    setLogoName(file.name)
    const reader = new FileReader()
    reader.onload = (ev) => setLogoPreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  async function submitApplication() {
    if (!validateStep(4)) return
    setLoading(true)

    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: `${form.firstName} ${form.lastName}`,
          role: "seller",
          store_name: form.storeName,
        }
      }
    })

    if (error) {
      setLoading(false)
      showToast("error", "Basvuru Basarisiz", error.message)
      return
    }

    setLoading(false)
    setShowSuccess(true)
    showToast("success", "Basarili!", "Basvurunuz basariyla alindi.")
  }

  const progressWidth = ((currentStep - 1) / 3) * 75

  if (showSuccess) {
    return (
      <main className="min-h-screen flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-1/2 flex flex-col items-center justify-center p-8">
          <div className="text-center space-y-6 max-w-sm mx-auto">
            <div className="w-20 h-20 mx-auto rounded-full bg-success-light flex items-center justify-center animate-checkmark">
              <svg className="w-10 h-10 text-success-base" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-neutral-900">Basvurunuz Alindi!</h2>
              <p className="text-neutral-500 text-sm leading-relaxed">Basvurunuz basariyla iletildi. En kisa surede degerlendirilecek ve sonuc e-posta adresinize bildirilecektir.</p>
            </div>
            <div className="bg-primary-25 rounded-xl p-4 border border-primary-100">
              <p className="text-sm text-primary-700 font-medium">Ortalama degerlendirme suresi: 24 saat</p>
            </div>
            <Link href="/seller-login" className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-3 min-h-[48px] text-sm font-semibold text-white shadow-md shadow-primary-500/20 transition-all duration-200 hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-500/30 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 active:scale-[0.98]">
              Satici Girisine Don
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex lg:w-2/5 xl:w-1/2 seller-gradient relative overflow-hidden items-center justify-center p-10 xl:p-14">
          <div className="absolute top-16 left-12 w-72 h-72 bg-primary-400/[0.08] rounded-full blur-3xl float-slow"></div>
          <div className="absolute bottom-20 right-8 w-80 h-80 bg-primary-300/[0.06] rounded-full blur-3xl float-reverse"></div>
        </div>
      </main>
    )
  }

  return (
    <>
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-[200] max-w-sm w-full pointer-events-none">
          <div className="bg-white rounded-xl shadow-align-xl border border-neutral-100 p-4 flex items-start gap-3 pointer-events-auto">
            <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${toast.type === "success" ? "bg-success-light" : toast.type === "error" ? "bg-error-light" : "bg-warning-light"}`}>
              {toast.type === "success" && <svg className="w-4 h-4 text-success-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>}
              {toast.type === "error" && <svg className="w-4 h-4 text-error-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/></svg>}
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
        {/* Left: Form */}
        <div className="w-full lg:w-3/5 xl:w-1/2 flex flex-col p-4 sm:p-6 lg:p-10 xl:p-14 min-h-screen">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6 lg:mb-8 opacity-0 animate-fade-in-up">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-primary-500 flex items-center justify-center shadow-md shadow-primary-500/20">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>
              <span className="text-lg font-bold text-neutral-800 tracking-tight">enolsun<span className="text-primary-500">.com</span></span>
            </Link>
            <Link href="/seller-login" className="text-sm text-neutral-400 hover:text-primary-500 transition-colors">Zaten satici misiniz? <span className="font-semibold text-primary-500">Giris Yapin</span></Link>
          </div>

          {/* Header */}
          <div className="space-y-2 mb-6 lg:mb-8 opacity-0 animate-fade-in-up delay-100">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-semibold">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.15c0 .415.336.75.75.75z"/>
              </svg>
              Satici Basvurusu
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">Magaza Basvuru Formu</h1>
            <p className="text-neutral-500 text-sm leading-relaxed">En kolay satis platformunda yerinizi alin. Basvurunuz 24 saat icinde degerlendirilir.</p>
          </div>

          {/* Step Indicator */}
          <div className="mb-8 opacity-0 animate-fade-in-up delay-200">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-5 left-[12.5%] right-[12.5%] h-0.5 bg-neutral-100 rounded-full"></div>
              <div className="absolute top-5 left-[12.5%] h-0.5 bg-primary-500 rounded-full transition-all duration-500 ease-out" style={{ width: `${progressWidth}%` }}></div>
              {[1, 2, 3, 4].map(step => (
                <div key={step} className="flex flex-col items-center relative z-10 w-1/4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    step < currentStep ? "bg-primary-500 text-white shadow-md shadow-primary-500/20" :
                    step === currentStep ? "bg-primary-500 text-white shadow-md shadow-primary-500/20" :
                    "bg-neutral-100 text-neutral-400"
                  }`}>
                    {step < currentStep ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                    ) : step}
                  </div>
                  <span className={`text-xs font-medium mt-2 transition-colors duration-300 text-center leading-tight ${
                    step <= currentStep ? "text-primary-600" : "text-neutral-400"
                  }`}>
                    {step === 1 && "Kisisel Bilgiler"}
                    {step === 2 && "Magaza Bilgileri"}
                    {step === 3 && "Vergi & Banka"}
                    {step === 4 && "Sozlesme & Onay"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form className="flex-1 flex flex-col" onSubmit={(e) => e.preventDefault()} noValidate>
            {/* Step 1 */}
            {currentStep === 1 && (
              <div className="step-active step-transition flex-1">
                <div className="space-y-5 max-w-lg">
                  <h2 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>
                    </span>
                    Kisisel Bilgiler
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-neutral-700">Ad <span className="text-error-base">*</span></label>
                      <input type="text" value={form.firstName} onChange={(e) => updateForm("firstName", e.target.value)} placeholder="Adiniz" className="block w-full rounded-xl border border-neutral-200 bg-white py-3 px-4 min-h-[48px] text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-neutral-700">Soyad <span className="text-error-base">*</span></label>
                      <input type="text" value={form.lastName} onChange={(e) => updateForm("lastName", e.target.value)} placeholder="Soyadiniz" className="block w-full rounded-xl border border-neutral-200 bg-white py-3 px-4 min-h-[48px] text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-neutral-700">TC Kimlik Numarasi <span className="text-error-base">*</span></label>
                    <input type="text" value={form.tcKimlik} onChange={(e) => updateForm("tcKimlik", e.target.value.replace(/\D/g, "").slice(0, 11))} placeholder="11 haneli TC Kimlik No" maxLength={11} inputMode="numeric" className="block w-full rounded-xl border border-neutral-200 bg-white py-3 px-4 min-h-[48px] text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-neutral-700">Telefon Numarasi <span className="text-error-base">*</span></label>
                    <input type="tel" value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} placeholder="05XX XXX XX XX" className="block w-full rounded-xl border border-neutral-200 bg-white py-3 px-4 min-h-[48px] text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-neutral-700">E-posta Adresi <span className="text-error-base">*</span></label>
                    <input type="email" value={form.email} onChange={(e) => updateForm("email", e.target.value)} placeholder="ornek@magaza.com" className="block w-full rounded-xl border border-neutral-200 bg-white py-3 px-4 min-h-[48px] text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-neutral-700">Sifre <span className="text-error-base">*</span></label>
                    <div className="relative">
                      <input type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => updateForm("password", e.target.value)} placeholder="En az 6 karakter" minLength={6} className="block w-full rounded-xl border border-neutral-200 bg-white py-3 px-4 pr-11 min-h-[48px] text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-300 hover:text-neutral-500 transition-colors" tabIndex={-1}>
                        <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                          {!showPassword
                            ? <><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></>
                            : <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
                          }
                        </svg>
                      </button>
                    </div>
                    <p className="text-xs text-neutral-300">En az 6 karakter olmalidir</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <div className="step-active step-transition flex-1">
                <div className="space-y-5 max-w-lg">
                  <h2 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.15c0 .415.336.75.75.75z"/></svg>
                    </span>
                    Magaza Bilgileri
                  </h2>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-neutral-700">Magaza Adi <span className="text-error-base">*</span></label>
                    <input type="text" value={form.storeName} onChange={(e) => updateForm("storeName", e.target.value)} placeholder="Magaza adinizi girin" className="block w-full rounded-xl border border-neutral-200 bg-white py-3 px-4 min-h-[48px] text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-neutral-700">Ana Kategori <span className="text-error-base">*</span></label>
                    <div className="relative">
                      <select value={form.category} onChange={(e) => updateForm("category", e.target.value)} className="block w-full rounded-xl border border-neutral-200 bg-white py-3 px-4 min-h-[48px] text-sm text-neutral-800 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300 appearance-none pr-10">
                        <option value="" disabled>Kategori secin</option>
                        <option value="elektronik">Elektronik</option>
                        <option value="moda">Moda &amp; Giyim</option>
                        <option value="ev-yasam">Ev &amp; Yasam</option>
                        <option value="kozmetik">Kozmetik &amp; Kisisel Bakim</option>
                        <option value="spor">Spor &amp; Outdoor</option>
                        <option value="kitap">Kitap &amp; Kirtasiye</option>
                        <option value="oyuncak">Oyuncak &amp; Bebek</option>
                        <option value="otomotiv">Otomotiv &amp; Aksesuar</option>
                        <option value="gida">Gida &amp; Icecek</option>
                        <option value="diger">Diger</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
                        <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-neutral-700">Magaza Aciklamasi</label>
                    <textarea value={form.storeDesc} onChange={(e) => updateForm("storeDesc", e.target.value)} rows={3} placeholder="Magazaniz hakkinda kisa bir aciklama yazin..." className="block w-full rounded-xl border border-neutral-200 bg-white py-3 px-4 text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300 resize-none"></textarea>
                    <p className="text-xs text-neutral-300">Maksimum 300 karakter</p>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-neutral-700">Magaza Logosu</label>
                    <div className="upload-zone border-neutral-200 rounded-xl p-6 text-center cursor-pointer" onClick={() => document.getElementById("logo-input")?.click()}>
                      <input type="file" id="logo-input" accept="image/png,image/jpeg,image/svg+xml" className="hidden" onChange={handleLogoUpload} />
                      {!logoPreview ? (
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-xl bg-neutral-50 flex items-center justify-center">
                            <svg className="w-6 h-6 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"/></svg>
                          </div>
                          <p className="text-sm text-neutral-500"><span className="font-semibold text-primary-500">Dosya secin</span> veya surukleyip birakin</p>
                          <p className="text-xs text-neutral-300">PNG, JPG veya SVG (maks. 2MB)</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-16 h-16 rounded-xl bg-primary-50 flex items-center justify-center overflow-hidden">
                            <img src={logoPreview} alt="Logo onizleme" className="w-full h-full object-cover" />
                          </div>
                          <p className="text-sm text-primary-600 font-medium">{logoName}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {currentStep === 3 && (
              <div className="step-active step-transition flex-1">
                <div className="space-y-5 max-w-lg">
                  <h2 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"/></svg>
                    </span>
                    Vergi &amp; Banka Bilgileri
                  </h2>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-700">Sirket Turu <span className="text-error-base">*</span></label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {["sahis", "limited", "anonim"].map(type => (
                        <label key={type} className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${form.companyType === type ? "border-primary-500 bg-primary-25" : "border-neutral-200 hover:border-primary-300"}`}>
                          <input type="radio" name="companyType" value={type} checked={form.companyType === type} onChange={(e) => updateForm("companyType", e.target.value)} className="sr-only" />
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${form.companyType === type ? "border-primary-500" : "border-neutral-200"}`}>
                            {form.companyType === type && <div className="w-2.5 h-2.5 rounded-full bg-primary-500"></div>}
                          </div>
                          <span className="text-sm font-medium text-neutral-700">{type === "sahis" ? "Sahis" : type === "limited" ? "Limited" : "Anonim"}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-neutral-700">Vergi Dairesi <span className="text-error-base">*</span></label>
                      <input type="text" value={form.taxOffice} onChange={(e) => updateForm("taxOffice", e.target.value)} placeholder="Vergi dairesi adi" className="block w-full rounded-xl border border-neutral-200 bg-white py-3 px-4 min-h-[48px] text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-neutral-700">Vergi Numarasi <span className="text-error-base">*</span></label>
                      <input type="text" value={form.taxNumber} onChange={(e) => updateForm("taxNumber", e.target.value.replace(/\D/g, "").slice(0, 11))} placeholder="Vergi numaraniz" maxLength={11} inputMode="numeric" className="block w-full rounded-xl border border-neutral-200 bg-white py-3 px-4 min-h-[48px] text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-neutral-700">IBAN <span className="text-error-base">*</span></label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5"><span className="text-sm text-neutral-400 font-medium">TR</span></div>
                      <input type="text" value={form.iban} onChange={(e) => updateForm("iban", e.target.value)} placeholder="XX XXXX XXXX XXXX XXXX XXXX XX" maxLength={32} className="block w-full rounded-xl border border-neutral-200 bg-white py-3 min-h-[48px] pl-11 pr-4 text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300 font-mono tracking-wider" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-neutral-700">Banka Adi <span className="text-error-base">*</span></label>
                    <div className="relative">
                      <select value={form.bankName} onChange={(e) => updateForm("bankName", e.target.value)} className="block w-full rounded-xl border border-neutral-200 bg-white py-3 px-4 min-h-[48px] text-sm text-neutral-800 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300 appearance-none pr-10">
                        <option value="" disabled>Banka secin</option>
                        <option value="ziraat">Ziraat Bankasi</option>
                        <option value="isbank">Is Bankasi</option>
                        <option value="garanti">Garanti BBVA</option>
                        <option value="akbank">Akbank</option>
                        <option value="yapi-kredi">Yapi Kredi</option>
                        <option value="halkbank">Halkbank</option>
                        <option value="vakifbank">VakifBank</option>
                        <option value="denizbank">DenizBank</option>
                        <option value="qnb">QNB Finansbank</option>
                        <option value="ing">ING</option>
                        <option value="teb">TEB</option>
                        <option value="diger">Diger</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
                        <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4 */}
            {currentStep === 4 && (
              <div className="step-active step-transition flex-1">
                <div className="space-y-6 max-w-lg">
                  <h2 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>
                    </span>
                    Sozlesmeler &amp; Onay
                  </h2>
                  {/* Commission Table */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-neutral-700">Komisyon Oranlari</h3>
                    <div className="rounded-xl border border-neutral-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead><tr className="bg-neutral-50"><th className="text-left py-2.5 px-4 font-semibold text-neutral-600 text-xs uppercase tracking-wide">Kategori</th><th className="text-right py-2.5 px-4 font-semibold text-neutral-600 text-xs uppercase tracking-wide">Komisyon</th></tr></thead>
                        <tbody className="divide-y divide-neutral-100">
                          {[["Elektronik", "%8"], ["Moda & Giyim", "%12"], ["Ev & Yasam", "%10"], ["Kozmetik", "%15"], ["Diger Kategoriler", "%10"]].map(([cat, rate]) => (
                            <tr key={cat} className="hover:bg-neutral-25 transition-colors"><td className="py-2.5 px-4 text-neutral-700">{cat}</td><td className="py-2.5 px-4 text-right font-semibold text-primary-600">{rate}</td></tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs text-neutral-400">* En dusuk komisyon oranlari garanti edilmektedir.</p>
                  </div>
                  {/* Agreements */}
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 p-3.5 rounded-xl border border-neutral-200 cursor-pointer hover:border-primary-300 hover:bg-primary-25 transition-all group">
                      <div className="relative mt-0.5">
                        <input type="checkbox" checked={form.sellerAgreement} onChange={(e) => updateForm("sellerAgreement", e.target.checked)} className="peer sr-only" />
                        <div className="w-[18px] h-[18px] rounded-md border border-neutral-200 bg-white transition-all duration-200 peer-checked:bg-primary-500 peer-checked:border-primary-500 group-hover:border-neutral-300"></div>
                        <svg className="absolute top-[3px] left-[3px] w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                      </div>
                      <span className="text-sm font-medium text-neutral-700"><a href="#" className="text-primary-500 hover:text-primary-600 underline underline-offset-2">Satici Sozlesmesi</a>&apos;ni okudum ve kabul ediyorum. <span className="text-error-base">*</span></span>
                    </label>
                    <label className="flex items-start gap-3 p-3.5 rounded-xl border border-neutral-200 cursor-pointer hover:border-primary-300 hover:bg-primary-25 transition-all group">
                      <div className="relative mt-0.5">
                        <input type="checkbox" checked={form.kvkkAgreement} onChange={(e) => updateForm("kvkkAgreement", e.target.checked)} className="peer sr-only" />
                        <div className="w-[18px] h-[18px] rounded-md border border-neutral-200 bg-white transition-all duration-200 peer-checked:bg-primary-500 peer-checked:border-primary-500 group-hover:border-neutral-300"></div>
                        <svg className="absolute top-[3px] left-[3px] w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                      </div>
                      <span className="text-sm font-medium text-neutral-700"><a href="#" className="text-primary-500 hover:text-primary-600 underline underline-offset-2">KVKK Aydinlatma Metni</a>&apos;ni okudum ve onayliyorum. <span className="text-error-base">*</span></span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-100">
              {currentStep > 1 ? (
                <button type="button" onClick={prevStep} className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-5 py-3 min-h-[48px] text-sm font-medium text-neutral-600 shadow-sm transition-all duration-200 hover:bg-neutral-50 hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-1 active:scale-[0.98]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/></svg>
                  Geri
                </button>
              ) : <div></div>}
              <div className="flex-1"></div>
              {currentStep < 4 ? (
                <button type="button" onClick={nextStep} className="flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-3 min-h-[48px] text-sm font-semibold text-white shadow-md shadow-primary-500/20 transition-all duration-200 hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-500/30 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 active:scale-[0.98]">
                  Ileri
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
                </button>
              ) : (
                <button type="button" onClick={submitApplication} disabled={loading} className="flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-3 min-h-[48px] text-sm font-semibold text-white shadow-md shadow-primary-500/20 transition-all duration-200 hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-500/30 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-60">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  {loading ? "Gonderiliyor..." : "Basvuruyu Tamamla"}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right: Decorative Panel */}
        <div className="hidden lg:flex lg:w-2/5 xl:w-1/2 seller-gradient relative overflow-hidden items-center justify-center p-10 xl:p-14">
          <div className="absolute top-16 left-12 w-72 h-72 bg-primary-400/[0.08] rounded-full blur-3xl float-slow"></div>
          <div className="absolute bottom-20 right-8 w-80 h-80 bg-primary-300/[0.06] rounded-full blur-3xl float-reverse"></div>
          <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-white/[0.03] rounded-full blur-2xl animate-float" style={{ animationDelay: "-2s" }}></div>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>

          <div className="relative z-10 space-y-6 max-w-sm w-full">
            <div className="space-y-3 mb-8">
              <h2 className="text-2xl xl:text-3xl font-bold text-white tracking-tight leading-tight">Neden <span className="text-primary-300">enolsun</span>?</h2>
              <p className="text-white/50 text-sm">En guvenilir e-ticaret altyapisi ile tanisin.</p>
            </div>
            <div className="space-y-3">
              {[
                { icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z", title: "En dusuk komisyon oranlari", desc: "Sektorun en rekabetci oranlari" },
                { icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z", title: "En hizli odeme sistemi", desc: "3 gunde hesabinizda" },
                { icon: "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605", title: "En kapsamli satici paneli", desc: "Analizler, raporlar ve istatistikler" },
                { icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z", title: "En genis musteri agi", desc: "2 milyondan fazla aktif musteri" },
                { icon: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155", title: "7/24 satici destek hatti", desc: "Her zaman yaninizdayiz" },
              ].map((b, i) => (
                <div key={i} className="benefit-glass rounded-xl p-4 flex items-start gap-3.5 transition-all duration-300 hover:bg-white/10 hover:scale-[1.02] group">
                  <div className="w-10 h-10 rounded-lg bg-primary-400/15 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-400/25 transition-colors">
                    <svg className="w-5 h-5 text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d={b.icon}/></svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{b.title}</h3>
                    <p className="text-xs text-white/40 mt-0.5">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-white/5">
              <p className="text-xs text-white/30 text-center italic">Satista en olsun, enolsun!</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
