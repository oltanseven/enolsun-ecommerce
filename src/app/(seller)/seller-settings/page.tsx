"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { showToast } from "@/components/ui/Toast"

const _sb = createClient()

export default function SellerSettingsPage() {
  const [activeTab, setActiveTab] = useState("store")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [storeId, setStoreId] = useState<string | null>(null)

  // Store info
  const [storeName, setStoreName] = useState("")
  const [storeDesc, setStoreDesc] = useState("")
  const [storePhone, setStorePhone] = useState("")
  const [storeEmail, setStoreEmail] = useState("")
  const [storeAddress, setStoreAddress] = useState("")
  const [storeLogo, setStoreLogo] = useState("")

  // Shipping
  const [freeShipMin, setFreeShipMin] = useState("200")
  const [defaultCargo, setDefaultCargo] = useState("yurtici")
  const [processTime, setProcessTime] = useState("1-2")

  // Notifications
  const [notifNewOrder, setNotifNewOrder] = useState(true)
  const [notifMessage, setNotifMessage] = useState(true)
  const [notifReview, setNotifReview] = useState(true)
  const [notifStock, setNotifStock] = useState(true)
  const [notifEmail, setNotifEmail] = useState(true)
  const [notifSms, setNotifSms] = useState(false)

  // Security
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [twoFactor, setTwoFactor] = useState(false)

  useEffect(() => {
    document.title = "Magaza Ayarlari | enolsun.com Satici Merkezi"
    loadStore()
  }, [])

  async function loadStore() {
    const { data: { user } } = await _sb.auth.getUser()
    if (!user) { setLoading(false); return }

    const { data: store } = await _sb
      .from("stores")
      .select("*")
      .eq("owner_id", user.id)
      .maybeSingle()

    if (!store) { setLoading(false); return }

    setStoreId(store.id)
    setStoreName(store.name ?? "")
    setStoreDesc(store.description ?? "")
    setStorePhone(store.phone ?? "")
    setStoreEmail(store.email ?? "")
    setStoreAddress(store.city ?? "")
    setStoreLogo(store.logo_url ?? "")
    setLoading(false)
  }

  async function saveStoreSettings() {
    if (!storeId) return
    setSaving(true)

    const { error } = await _sb
      .from("stores")
      .update({
        name: storeName,
        description: storeDesc,
        phone: storePhone,
        email: storeEmail,
        city: storeAddress,
        logo_url: storeLogo,
      })
      .eq("id", storeId)

    if (error) {
      showToast("Ayarlar kaydedilemedi. Lutfen tekrar deneyin.", "error")
    } else {
      showToast("Magaza ayarlari basariyla kaydedildi.", "success")
    }
    setSaving(false)
  }

  const tabs = [
    { key: "store", label: "Magaza Bilgileri", icon: <path d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.15c0 .415.336.75.75.75z" /> },
    { key: "shipping", label: "Kargo Ayarlari", icon: <path d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H6.375c-.621 0-1.125.504-1.125 1.125M20.25 18.75V10.5a1.875 1.875 0 00-.254-.955l-2.658-4.587A1.875 1.875 0 0015.72 3.75H12v14.25m0 0h8.25m-8.25 0H5.25" /> },
    { key: "notifications", label: "Bildirimler", icon: <path d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /> },
    { key: "security", label: "Guvenlik", icon: <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /> },
  ]

  function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
    return (
      <button type="button" onClick={() => onChange(!checked)} className={`toggle-track ${checked ? "active" : ""}`}>
        <div className="toggle-thumb"></div>
      </button>
    )
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-7 bg-neutral-100 rounded w-72 mb-6" />
        <div className="flex flex-wrap gap-2 mb-8">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-10 bg-neutral-100 rounded-xl w-36" />)}
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-align-xs border border-neutral-100 space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="space-y-1.5">
              <div className="h-4 bg-neutral-100 rounded w-28" />
              <div className="h-12 bg-neutral-100 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-neutral-800 mb-6">Magaza Ayarlari -- EN Kolay Magaza Yonetimi</h1>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`seller-tab flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === tab.key ? "active" : "bg-neutral-100 text-neutral-600"}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">{tab.icon}</svg>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Store Info Tab */}
      {activeTab === "store" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-align-xs border border-neutral-100">
            <h2 className="text-base font-semibold text-neutral-900 mb-4">Magaza Bilgileri</h2>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-neutral-700">Magaza Adi</label>
                <input type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} className="block w-full rounded-xl border border-neutral-200 bg-white py-3 px-4 min-h-[48px] text-sm text-neutral-800 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300" />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-neutral-700">Magaza Aciklamasi</label>
                <textarea value={storeDesc} onChange={(e) => setStoreDesc(e.target.value)} rows={3} className="block w-full rounded-xl border border-neutral-200 bg-white py-3 px-4 text-sm text-neutral-800 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300 resize-none"></textarea>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-neutral-700">Telefon</label>
                  <input type="tel" value={storePhone} onChange={(e) => setStorePhone(e.target.value)} className="block w-full rounded-xl border border-neutral-200 bg-white py-3 px-4 min-h-[48px] text-sm text-neutral-800 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300" />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-neutral-700">E-posta</label>
                  <input type="email" value={storeEmail} onChange={(e) => setStoreEmail(e.target.value)} className="block w-full rounded-xl border border-neutral-200 bg-white py-3 px-4 min-h-[48px] text-sm text-neutral-800 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-neutral-700">Adres</label>
                <input type="text" value={storeAddress} onChange={(e) => setStoreAddress(e.target.value)} className="block w-full rounded-xl border border-neutral-200 bg-white py-3 px-4 min-h-[48px] text-sm text-neutral-800 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300" />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-neutral-700">Magaza Logosu</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-primary-100 flex items-center justify-center overflow-hidden">
                    {storeLogo ? (
                      <img src={storeLogo} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-8 h-8 text-primary-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <input type="text" value={storeLogo} onChange={(e) => setStoreLogo(e.target.value)} placeholder="Logo URL'si girin" className="block w-full rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button onClick={saveStoreSettings} disabled={saving} className="px-6 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-semibold hover:bg-primary-600 shadow-md shadow-primary-500/20 transition-all disabled:opacity-50">
              {saving ? "Kaydediliyor..." : "Kaydet"}
            </button>
          </div>
        </div>
      )}

      {/* Shipping Tab */}
      {activeTab === "shipping" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-align-xs border border-neutral-100">
            <h2 className="text-base font-semibold text-neutral-900 mb-4">Kargo Ayarlari</h2>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-neutral-700">Ucretsiz Kargo Limiti (&#8378;)</label>
                <input type="text" value={freeShipMin} onChange={(e) => setFreeShipMin(e.target.value)} className="block w-full rounded-xl border border-neutral-200 bg-white py-3 px-4 min-h-[48px] text-sm text-neutral-800 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300" />
                <p className="text-xs text-neutral-400">Bu tutarin uzerindeki siparislerde kargo ucretsiz olur</p>
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-neutral-700">Varsayilan Kargo Firmasi</label>
                <select value={defaultCargo} onChange={(e) => setDefaultCargo(e.target.value)} className="block w-full rounded-xl border border-neutral-200 bg-white py-3 px-4 min-h-[48px] text-sm text-neutral-800 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300 appearance-none">
                  <option value="yurtici">Yurtici Kargo</option>
                  <option value="aras">Aras Kargo</option>
                  <option value="mng">MNG Kargo</option>
                  <option value="ptt">PTT Kargo</option>
                  <option value="ups">UPS</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-neutral-700">Hazirlama Suresi</label>
                <select value={processTime} onChange={(e) => setProcessTime(e.target.value)} className="block w-full rounded-xl border border-neutral-200 bg-white py-3 px-4 min-h-[48px] text-sm text-neutral-800 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300 appearance-none">
                  <option value="0-1">Ayni gun / 1 is gunu</option>
                  <option value="1-2">1-2 is gunu</option>
                  <option value="2-3">2-3 is gunu</option>
                  <option value="3-5">3-5 is gunu</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="px-6 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-semibold hover:bg-primary-600 shadow-md shadow-primary-500/20 transition-all">Kaydet</button>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-align-xs border border-neutral-100">
            <h2 className="text-base font-semibold text-neutral-900 mb-4">Bildirim Tercihleri</h2>
            <div className="space-y-5">
              {[
                { label: "Yeni siparis bildirimi", desc: "Yeni bir siparis geldiginde bildirim al", checked: notifNewOrder, onChange: setNotifNewOrder },
                { label: "Mesaj bildirimi", desc: "Yeni mesaj geldiginde bildirim al", checked: notifMessage, onChange: setNotifMessage },
                { label: "Degerlendirme bildirimi", desc: "Yeni bir degerlendirme yapildiginda", checked: notifReview, onChange: setNotifReview },
                { label: "Stok uyarisi", desc: "Stok azaldiginda uyari al", checked: notifStock, onChange: setNotifStock },
              ].map((n, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{n.label}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{n.desc}</p>
                  </div>
                  <ToggleSwitch checked={n.checked} onChange={n.onChange} />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-align-xs border border-neutral-100">
            <h2 className="text-base font-semibold text-neutral-900 mb-4">Bildirim Kanallari</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div><p className="text-sm font-medium text-neutral-900">E-posta Bildirimleri</p></div>
                <ToggleSwitch checked={notifEmail} onChange={setNotifEmail} />
              </div>
              <div className="flex items-center justify-between py-2">
                <div><p className="text-sm font-medium text-neutral-900">SMS Bildirimleri</p></div>
                <ToggleSwitch checked={notifSms} onChange={setNotifSms} />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="px-6 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-semibold hover:bg-primary-600 shadow-md shadow-primary-500/20 transition-all">Kaydet</button>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-align-xs border border-neutral-100">
            <h2 className="text-base font-semibold text-neutral-900 mb-4">Sifre Degistir</h2>
            <div className="space-y-4 max-w-md">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-neutral-700">Mevcut Sifre</label>
                <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Mevcut sifreniz" className="block w-full rounded-xl border border-neutral-200 bg-white py-3 px-4 min-h-[48px] text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300" />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-neutral-700">Yeni Sifre</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Yeni sifreniz" className="block w-full rounded-xl border border-neutral-200 bg-white py-3 px-4 min-h-[48px] text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300" />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-neutral-700">Yeni Sifre (Tekrar)</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Yeni sifrenizi tekrarlayin" className="block w-full rounded-xl border border-neutral-200 bg-white py-3 px-4 min-h-[48px] text-sm text-neutral-800 placeholder:text-neutral-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300" />
              </div>
              <button className="px-6 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-semibold hover:bg-primary-600 shadow-md shadow-primary-500/20 transition-all">Sifreyi Guncelle</button>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-align-xs border border-neutral-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-neutral-900">Iki Faktorlu Dogrulama</h2>
                <p className="text-sm text-neutral-500 mt-0.5">Hesabinizi ek bir guvenlik katmani ile koruyun</p>
              </div>
              <ToggleSwitch checked={twoFactor} onChange={setTwoFactor} />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-align-xs border border-neutral-100">
            <h2 className="text-base font-semibold text-neutral-900 mb-3">Aktif Oturumlar</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-25">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary-50 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a9 9 0 11-18 0V5.25" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">Chrome - macOS</p>
                    <p className="text-xs text-neutral-500">Istanbul, TR - Su anda aktif</p>
                  </div>
                </div>
                <span className="text-xs text-success-base font-medium">Mevcut</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-25">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-neutral-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">Safari - iPhone</p>
                    <p className="text-xs text-neutral-500">Istanbul, TR - 2 saat once</p>
                  </div>
                </div>
                <button className="text-xs text-error-base font-medium hover:text-error-dark transition-colors">Sonlandir</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
