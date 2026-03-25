"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

interface Profile {
  id: string
  full_name: string | null
  email: string | null
  role: string
  created_at: string
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" })
}

const roleMap: Record<string, { label: string; cls: string }> = {
  customer: { label: "Müşteri", cls: "bg-blue-50 text-blue-700" },
  seller: { label: "Satıcı", cls: "bg-purple-50 text-purple-700" },
  admin: { label: "Admin", cls: "bg-red-50 text-red-700" },
}

export default function AdminUsersPage() {
  const [loading, setLoading] = useState(true)
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [tab, setTab] = useState<"all" | "customer" | "seller">("all")

  useEffect(() => {
    async function loadUsers() {
      const _sb = createClient()
      const { data } = await _sb
        .from("profiles")
        .select("id, full_name, email, role, created_at")
        .order("created_at", { ascending: false })

      if (data) setProfiles(data)
      setLoading(false)
    }
    loadUsers()
  }, [])

  const filtered = tab === "all" ? profiles : profiles.filter(p => p.role === tab)

  const tabs = [
    { key: "all" as const, label: "Tümü", count: profiles.length },
    { key: "customer" as const, label: "Müşteriler", count: profiles.filter(p => p.role === "customer").length },
    { key: "seller" as const, label: "Satıcılar", count: profiles.filter(p => p.role === "seller").length },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-neutral-200 rounded-lg animate-pulse"></div>
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => <div key={i} className="h-9 w-28 bg-neutral-100 rounded-lg animate-pulse"></div>)}
        </div>
        <div className="bg-white rounded-xl border border-neutral-100 p-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-12 bg-neutral-50 rounded-lg animate-pulse mb-2"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Kullanıcılar</h1>
        <p className="text-sm text-neutral-500 mt-1">Platform kullanıcılarını yönetin</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t.key ? "bg-primary-500 text-white" : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50"}`}
          >
            {t.label} <span className={`ml-1 ${tab === t.key ? "text-primary-100" : "text-neutral-400"}`}>({t.count})</span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-neutral-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-100">
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">İsim</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">E-posta</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">Rol</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">Kayıt Tarihi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={4} className="text-center text-sm text-neutral-400 py-8">Kullanıcı bulunamadı</td></tr>
              ) : (
                filtered.map(user => {
                  const r = roleMap[user.role] || { label: user.role, cls: "bg-neutral-100 text-neutral-600" }
                  const initials = (user.full_name || "?").split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
                  return (
                    <tr key={user.id} className="border-b border-neutral-50 hover:bg-neutral-50/50 transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-xs font-bold text-primary-700 flex-shrink-0">{initials}</div>
                          <span className="text-sm font-medium text-neutral-900">{user.full_name || "-"}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-sm text-neutral-600">{user.email || "-"}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${r.cls}`}>{r.label}</span>
                      </td>
                      <td className="px-5 py-3 text-sm text-neutral-500">{formatDate(user.created_at)}</td>
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
