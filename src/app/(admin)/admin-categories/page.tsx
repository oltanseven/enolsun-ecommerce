"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { showToast } from "@/components/ui/Toast"

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  created_at: string
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" })
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export default function AdminCategoriesPage() {
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [formName, setFormName] = useState("")
  const [formSlug, setFormSlug] = useState("")
  const [formDesc, setFormDesc] = useState("")
  const [saving, setSaving] = useState(false)

  async function loadCategories() {
    const _sb = createClient()
    const { data } = await _sb
      .from("categories")
      .select("id, name, slug, description, created_at")
      .order("name", { ascending: true })

    if (data) setCategories(data)
    setLoading(false)
  }

  useEffect(() => { loadCategories() }, [])

  function resetForm() {
    setFormName("")
    setFormSlug("")
    setFormDesc("")
    setEditId(null)
    setShowForm(false)
  }

  function startEdit(cat: Category) {
    setEditId(cat.id)
    setFormName(cat.name)
    setFormSlug(cat.slug)
    setFormDesc(cat.description || "")
    setShowForm(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formName.trim() || !formSlug.trim()) {
      showToast("Kategori adı ve slug zorunludur.", "error")
      return
    }

    setSaving(true)
    const _sb = createClient()

    if (editId) {
      const { error } = await _sb
        .from("categories")
        .update({ name: formName.trim(), slug: formSlug.trim(), description: formDesc.trim() || null })
        .eq("id", editId)

      if (error) {
        showToast("Kategori güncellenemedi.", "error")
      } else {
        showToast("Kategori güncellendi.", "success")
        resetForm()
        loadCategories()
      }
    } else {
      const { error } = await _sb
        .from("categories")
        .insert({ name: formName.trim(), slug: formSlug.trim(), description: formDesc.trim() || null })

      if (error) {
        showToast(error.message.includes("duplicate") ? "Bu slug zaten kullanılıyor." : "Kategori eklenemedi.", "error")
      } else {
        showToast("Kategori eklendi.", "success")
        resetForm()
        loadCategories()
      }
    }
    setSaving(false)
  }

  async function deleteCategory(id: string) {
    if (!confirm("Bu kategoriyi silmek istediğinize emin misiniz?")) return
    const _sb = createClient()
    const { error } = await _sb.from("categories").delete().eq("id", id)

    if (error) {
      showToast("Kategori silinemedi.", "error")
    } else {
      setCategories(prev => prev.filter(c => c.id !== id))
      showToast("Kategori silindi.", "success")
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-neutral-200 rounded-lg animate-pulse"></div>
        <div className="bg-white rounded-xl border border-neutral-100 p-6">
          {[...Array(6)].map((_, i) => (
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
          <h1 className="text-2xl font-bold text-neutral-900">Kategoriler</h1>
          <p className="text-sm text-neutral-500 mt-1">Ürün kategorilerini yönetin ({categories.length} kategori)</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true) }}
          className="px-4 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
          Yeni Kategori
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-neutral-100 p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">{editId ? "Kategori Düzenle" : "Yeni Kategori Ekle"}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Kategori Adı</label>
                <input
                  type="text"
                  value={formName}
                  onChange={e => { setFormName(e.target.value); if (!editId) setFormSlug(slugify(e.target.value)) }}
                  placeholder="Elektronik"
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-sm text-neutral-700 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Slug</label>
                <input
                  type="text"
                  value={formSlug}
                  onChange={e => setFormSlug(e.target.value)}
                  placeholder="elektronik"
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-sm text-neutral-700 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Açıklama (Opsiyonel)</label>
              <textarea
                value={formDesc}
                onChange={e => setFormDesc(e.target.value)}
                placeholder="Kategori açıklaması..."
                rows={2}
                className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-sm text-neutral-700 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all resize-none"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600 transition-colors disabled:opacity-50"
              >
                {saving ? "Kaydediliyor..." : editId ? "Güncelle" : "Ekle"}
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
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">Kategori Adı</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">Slug</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">Açıklama</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">Tarih</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr><td colSpan={5} className="text-center text-sm text-neutral-400 py-8">Kategori bulunamadı</td></tr>
              ) : (
                categories.map(cat => (
                  <tr key={cat.id} className="border-b border-neutral-50 hover:bg-neutral-50/50 transition-colors">
                    <td className="px-5 py-3 text-sm font-medium text-neutral-900">{cat.name}</td>
                    <td className="px-5 py-3 text-sm text-neutral-500 font-mono">{cat.slug}</td>
                    <td className="px-5 py-3 text-sm text-neutral-600 max-w-[200px] truncate">{cat.description || "-"}</td>
                    <td className="px-5 py-3 text-sm text-neutral-500">{formatDate(cat.created_at)}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => startEdit(cat)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors"
                        >
                          Düzenle
                        </button>
                        <button
                          onClick={() => deleteCategory(cat.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-error-light text-error-dark hover:bg-red-100 transition-colors"
                        >
                          Sil
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
