"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { showToast } from "@/components/ui/Toast"

interface Coupon {
  id: string
  code: string
  discount_type: string
  discount_value: number
  min_order: number | null
  expires_at: string | null
  is_active: boolean
  created_at: string
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" })
}

function formatPrice(n: number) {
  return n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function AdminCouponsPage() {
  const [loading, setLoading] = useState(true)
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  // Form fields
  const [formCode, setFormCode] = useState("")
  const [formType, setFormType] = useState<"percentage" | "fixed">("percentage")
  const [formValue, setFormValue] = useState("")
  const [formMinOrder, setFormMinOrder] = useState("")
  const [formExpires, setFormExpires] = useState("")

  async function loadCoupons() {
    const _sb = createClient()
    const { data } = await _sb
      .from("coupons")
      .select("id, code, discount_type, discount_value, min_order, expires_at, is_active, created_at")
      .order("created_at", { ascending: false })

    if (data) setCoupons(data)
    setLoading(false)
  }

  useEffect(() => { loadCoupons() }, [])

  function resetForm() {
    setFormCode("")
    setFormType("percentage")
    setFormValue("")
    setFormMinOrder("")
    setFormExpires("")
    setShowForm(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formCode.trim() || !formValue) {
      showToast("Kupon kodu ve indirim değeri zorunludur.", "error")
      return
    }

    setSaving(true)
    const _sb = createClient()
    const { error } = await _sb.from("coupons").insert({
      code: formCode.trim().toUpperCase(),
      discount_type: formType,
      discount_value: parseFloat(formValue),
      min_order: formMinOrder ? parseFloat(formMinOrder) : null,
      expires_at: formExpires || null,
      is_active: true,
    })

    if (error) {
      showToast(error.message.includes("duplicate") ? "Bu kupon kodu zaten mevcut." : "Kupon eklenemedi.", "error")
    } else {
      showToast("Kupon oluşturuldu.", "success")
      resetForm()
      loadCoupons()
    }
    setSaving(false)
  }

  async function toggleActive(id: string, currentActive: boolean) {
    const _sb = createClient()
    const { error } = await _sb
      .from("coupons")
      .update({ is_active: !currentActive })
      .eq("id", id)

    if (error) {
      showToast("Kupon durumu güncellenemedi.", "error")
    } else {
      setCoupons(prev => prev.map(c => c.id === id ? { ...c, is_active: !currentActive } : c))
      showToast(currentActive ? "Kupon pasife alındı." : "Kupon aktifleştirildi.", "success")
    }
  }

  async function deleteCoupon(id: string) {
    if (!confirm("Bu kuponu silmek istediğinize emin misiniz?")) return
    const _sb = createClient()
    const { error } = await _sb.from("coupons").delete().eq("id", id)

    if (error) {
      showToast("Kupon silinemedi.", "error")
    } else {
      setCoupons(prev => prev.filter(c => c.id !== id))
      showToast("Kupon silindi.", "success")
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-neutral-200 rounded-lg animate-pulse"></div>
        <div className="bg-white rounded-xl border border-neutral-100 p-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-neutral-50 rounded-lg animate-pulse mb-2"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Kuponlar</h1>
          <p className="text-sm text-neutral-500 mt-1">İndirim kuponlarını yönetin ({coupons.length} kupon)</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true) }}
          className="px-4 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
          Yeni Kupon
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-neutral-100 p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Yeni Kupon Oluştur</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Kupon Kodu</label>
                <input
                  type="text"
                  value={formCode}
                  onChange={e => setFormCode(e.target.value)}
                  placeholder="YILBASI20"
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-sm text-neutral-700 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all uppercase"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">İndirim Tipi</label>
                <select
                  value={formType}
                  onChange={e => setFormType(e.target.value as "percentage" | "fixed")}
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-sm text-neutral-700 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all bg-white"
                >
                  <option value="percentage">Yüzde (%)</option>
                  <option value="fixed">Sabit Tutar (₺)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  İndirim Değeri {formType === "percentage" ? "(%)" : "(₺)"}
                </label>
                <input
                  type="number"
                  value={formValue}
                  onChange={e => setFormValue(e.target.value)}
                  placeholder={formType === "percentage" ? "20" : "50"}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-sm text-neutral-700 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Min. Sipariş Tutarı (Opsiyonel)</label>
                <input
                  type="number"
                  value={formMinOrder}
                  onChange={e => setFormMinOrder(e.target.value)}
                  placeholder="100"
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-sm text-neutral-700 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Son Kullanma Tarihi (Opsiyonel)</label>
                <input
                  type="date"
                  value={formExpires}
                  onChange={e => setFormExpires(e.target.value)}
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-sm text-neutral-700 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600 transition-colors disabled:opacity-50"
              >
                {saving ? "Kaydediliyor..." : "Kupon Oluştur"}
              </button>
              <button type="button" onClick={resetForm} className="px-5 py-2.5 bg-neutral-100 text-neutral-600 rounded-xl text-sm font-medium hover:bg-neutral-200 transition-colors">
                İptal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-neutral-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-100">
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">Kod</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">İndirim</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">Min. Sipariş</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">Son Kullanma</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">Durum</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {coupons.length === 0 ? (
                <tr><td colSpan={6} className="text-center text-sm text-neutral-400 py-8">Kupon bulunamadı</td></tr>
              ) : (
                coupons.map(coupon => {
                  const isExpired = coupon.expires_at ? new Date(coupon.expires_at) < new Date() : false
                  return (
                    <tr key={coupon.id} className="border-b border-neutral-50 hover:bg-neutral-50/50 transition-colors">
                      <td className="px-5 py-3">
                        <span className="inline-flex px-3 py-1 bg-neutral-100 text-neutral-800 rounded-lg text-sm font-mono font-medium">{coupon.code}</span>
                      </td>
                      <td className="px-5 py-3 text-sm font-medium text-neutral-900">
                        {coupon.discount_type === "percentage" ? `%${coupon.discount_value}` : `₺${formatPrice(coupon.discount_value)}`}
                      </td>
                      <td className="px-5 py-3 text-sm text-neutral-600">
                        {coupon.min_order ? `₺${formatPrice(coupon.min_order)}` : "-"}
                      </td>
                      <td className="px-5 py-3 text-sm text-neutral-500">
                        {coupon.expires_at ? (
                          <span className={isExpired ? "text-error-dark" : ""}>
                            {formatDate(coupon.expires_at)} {isExpired && "(Süresi dolmuş)"}
                          </span>
                        ) : "Süresiz"}
                      </td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${coupon.is_active && !isExpired ? "bg-success-light text-success-dark" : "bg-neutral-100 text-neutral-500"}`}>
                          {coupon.is_active && !isExpired ? "Aktif" : "Pasif"}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleActive(coupon.id, coupon.is_active)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${coupon.is_active ? "bg-neutral-100 text-neutral-600 hover:bg-neutral-200" : "bg-primary-50 text-primary-600 hover:bg-primary-100"}`}
                          >
                            {coupon.is_active ? "Pasife Al" : "Aktifleştir"}
                          </button>
                          <button
                            onClick={() => deleteCoupon(coupon.id)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-error-light text-error-dark hover:bg-red-100 transition-colors"
                          >
                            Sil
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
