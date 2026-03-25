"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { showToast } from "@/components/ui/Toast";

const _sb = createClient();

interface Address {
  id: string;
  user_id: string;
  title: string;
  address_line: string;
  city: string;
  district: string;
  postal_code: string;
  phone: string;
  is_default: boolean;
  created_at: string;
}

const emptyAddressForm = {
  title: "",
  address_line: "",
  city: "",
  district: "",
  postal_code: "",
  phone: "",
};

export default function ProfilePage() {
  const [notifications, setNotifications] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("enolsun_notification_prefs");
        if (stored) return JSON.parse(stored) as { email: boolean; sms: boolean; push: boolean };
      } catch { /* ignore */ }
    }
    return { email: true, sms: false, push: true };
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("Belirtmek İstemiyorum");

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  // Address state
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressesLoading, setAddressesLoading] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addressForm, setAddressForm] = useState(emptyAddressForm);
  const [savingAddress, setSavingAddress] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      const { data: { user } } = await _sb.auth.getUser();
      if (!user) { setLoading(false); setAddressesLoading(false); return; }

      setEmail(user.email ?? "");

      const { data: profile } = await _sb
        .from("profiles")
        .select("full_name, phone, birth_date, gender")
        .eq("id", user.id)
        .maybeSingle();

      if (profile) {
        const parts = (profile.full_name ?? "").split(" ");
        setFirstName(parts[0] ?? "");
        setLastName(parts.slice(1).join(" ") ?? "");
        setPhone(profile.phone ?? "");
        setBirthDate(profile.birth_date ?? "");
        setGender(profile.gender ?? "Belirtmek İstemiyorum");
      }
      setLoading(false);

      // Fetch addresses
      const { data: addr } = await _sb
        .from("addresses")
        .select("*")
        .eq("user_id", user.id)
        .order("is_default", { ascending: false })
        .order("created_at", { ascending: false });

      setAddresses(addr ?? []);
      setAddressesLoading(false);
    }
    fetchProfile();
  }, []);

  async function handleSave() {
    setSaving(true);
    const { data: { user } } = await _sb.auth.getUser();
    if (!user) { setSaving(false); return; }

    const fullName = [firstName.trim(), lastName.trim()].filter(Boolean).join(" ");

    const { error } = await _sb
      .from("profiles")
      .update({
        full_name: fullName,
        phone: phone.trim(),
        birth_date: birthDate || null,
        gender,
      })
      .eq("id", user.id);

    setSaving(false);
    if (error) {
      showToast("Profil kaydedilirken bir hata oluştu.", "error");
    } else {
      showToast("Profil bilgileriniz başarıyla güncellendi.", "success");
    }
  }

  async function handlePasswordChange() {
    if (newPassword !== confirmPassword) {
      showToast("Yeni şifreler eşleşmiyor.", "error");
      return;
    }
    if (newPassword.length < 8 || !/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword) || !/\d/.test(newPassword)) {
      showToast("Şifre en az 8 karakter, 1 büyük harf, 1 küçük harf ve 1 rakam içermelidir.", "error");
      return;
    }

    setSavingPassword(true);
    const { error } = await _sb.auth.updateUser({ password: newPassword });
    setSavingPassword(false);

    if (error) {
      showToast("Şifre güncellenirken bir hata oluştu.", "error");
    } else {
      showToast("Şifreniz başarıyla güncellendi.", "success");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }

  // Address helpers
  async function fetchAddresses() {
    const { data: { user } } = await _sb.auth.getUser();
    if (!user) return;
    const { data } = await _sb
      .from("addresses")
      .select("*")
      .eq("user_id", user.id)
      .order("is_default", { ascending: false })
      .order("created_at", { ascending: false });
    setAddresses(data ?? []);
  }

  async function handleSaveAddress() {
    const { title, address_line, city, district, postal_code, phone: addrPhone } = addressForm;
    if (!title.trim() || !address_line.trim() || !city.trim() || !district.trim()) {
      showToast("Lütfen zorunlu alanları doldurun.", "error");
      return;
    }

    setSavingAddress(true);
    const { data: { user } } = await _sb.auth.getUser();
    if (!user) { setSavingAddress(false); return; }

    if (editingAddressId) {
      // Update existing
      const { error } = await _sb
        .from("addresses")
        .update({
          title: title.trim(),
          address_line: address_line.trim(),
          city: city.trim(),
          district: district.trim(),
          postal_code: postal_code.trim(),
          phone: addrPhone.trim(),
        })
        .eq("id", editingAddressId)
        .eq("user_id", user.id);

      setSavingAddress(false);
      if (error) {
        showToast("Adres güncellenirken bir hata oluştu.", "error");
      } else {
        showToast("Adres başarıyla güncellendi.", "success");
        setShowAddressForm(false);
        setEditingAddressId(null);
        setAddressForm(emptyAddressForm);
        await fetchAddresses();
      }
    } else {
      // Insert new — if first address, make default
      const isFirst = addresses.length === 0;
      const { error } = await _sb
        .from("addresses")
        .insert({
          user_id: user.id,
          title: title.trim(),
          address_line: address_line.trim(),
          city: city.trim(),
          district: district.trim(),
          postal_code: postal_code.trim(),
          phone: addrPhone.trim(),
          is_default: isFirst,
        });

      setSavingAddress(false);
      if (error) {
        showToast("Adres eklenirken bir hata oluştu.", "error");
      } else {
        showToast("Adres başarıyla eklendi.", "success");
        setShowAddressForm(false);
        setAddressForm(emptyAddressForm);
        await fetchAddresses();
      }
    }
  }

  async function handleDeleteAddress(id: string) {
    const { data: { user } } = await _sb.auth.getUser();
    if (!user) return;

    const { error } = await _sb
      .from("addresses")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      showToast("Adres silinirken bir hata oluştu.", "error");
    } else {
      showToast("Adres silindi.", "success");
      await fetchAddresses();
    }
  }

  async function handleSetDefault(id: string) {
    const { data: { user } } = await _sb.auth.getUser();
    if (!user) return;

    // Remove default from all
    await _sb
      .from("addresses")
      .update({ is_default: false })
      .eq("user_id", user.id);

    // Set new default
    const { error } = await _sb
      .from("addresses")
      .update({ is_default: true })
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      showToast("Varsayılan adres ayarlanırken bir hata oluştu.", "error");
    } else {
      showToast("Varsayılan adres güncellendi.", "success");
      await fetchAddresses();
    }
  }

  function openEditAddress(addr: Address) {
    setEditingAddressId(addr.id);
    setAddressForm({
      title: addr.title,
      address_line: addr.address_line,
      city: addr.city,
      district: addr.district,
      postal_code: addr.postal_code,
      phone: addr.phone ?? "",
    });
    setShowAddressForm(true);
  }

  function openNewAddress() {
    setEditingAddressId(null);
    setAddressForm(emptyAddressForm);
    setShowAddressForm(true);
  }

  if (loading) {
    return (
      <>
        <title>Profil Bilgilerim | enolsun.com</title>
        <div className="space-y-6">
          <div className="h-8 w-48 bg-neutral-100 rounded-lg animate-pulse" />
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-5 sm:p-6 space-y-5">
            <div className="h-5 w-36 bg-neutral-100 rounded animate-pulse" />
            <div className="grid sm:grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="h-3 w-16 bg-neutral-100 rounded animate-pulse" />
                  <div className="h-10 bg-neutral-100 rounded-xl animate-pulse" />
                </div>
              ))}
            </div>
            <div className="h-10 w-24 bg-neutral-100 rounded-xl animate-pulse" />
          </div>
        </div>
      </>
    );
  }

  const inputClass = "w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all";

  return (
    <>
    <title>Profil Bilgilerim | enolsun.com</title>
    <meta name="description" content="enolsun.com profil bilgilerinizi güncelleyin. Kişisel bilgiler, adresler ve bildirim tercihlerinizi EN kolay şekilde yönetin." />
    <div className="space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">Profil Bilgilerim</h1>


      {/* Personal Info */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-5 sm:p-6">
        <h2 className="text-base font-bold text-neutral-900 mb-5">Kişisel Bilgiler</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">Ad</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">Soyad</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">E-posta</label>
            <input type="email" value={email} disabled className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl bg-neutral-50 text-neutral-400 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">Telefon</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">Doğum Tarihi</label>
            <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">Cinsiyet</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className={`${inputClass} bg-white`}>
              <option>Erkek</option>
              <option>Kadın</option>
              <option>Belirtmek İstemiyorum</option>
            </select>
          </div>
        </div>
        <button onClick={handleSave} disabled={saving} className="mt-5 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60">
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>

      {/* Password Change */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-5 sm:p-6">
        <h2 className="text-base font-bold text-neutral-900 mb-5">Şifre Değiştir</h2>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">Mevcut Şifre</label>
            <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">Yeni Şifre</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">Yeni Şifre (Tekrar)</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={inputClass} />
          </div>
          <button onClick={handlePasswordChange} disabled={savingPassword} className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60">
            {savingPassword ? "Güncelleniyor..." : "Şifreyi Güncelle"}
          </button>
        </div>
      </div>

      {/* Addresses */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-neutral-900">Adreslerim</h2>
          <button onClick={openNewAddress} className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">+ Yeni Adres</button>
        </div>

        {/* Address Form (inline) */}
        {showAddressForm && (
          <div className="mb-5 p-4 rounded-xl border border-neutral-200 bg-neutral-50 space-y-4">
            <h3 className="text-sm font-semibold text-neutral-800">{editingAddressId ? "Adresi Düzenle" : "Yeni Adres Ekle"}</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1.5">Adres Başlığı *</label>
                <input type="text" placeholder="Ev, İş vb." value={addressForm.title} onChange={(e) => setAddressForm((p) => ({ ...p, title: e.target.value }))} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1.5">Telefon</label>
                <input type="tel" value={addressForm.phone} onChange={(e) => setAddressForm((p) => ({ ...p, phone: e.target.value }))} className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-neutral-500 mb-1.5">Açık Adres *</label>
                <input type="text" value={addressForm.address_line} onChange={(e) => setAddressForm((p) => ({ ...p, address_line: e.target.value }))} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1.5">İl *</label>
                <input type="text" value={addressForm.city} onChange={(e) => setAddressForm((p) => ({ ...p, city: e.target.value }))} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1.5">İlçe *</label>
                <input type="text" value={addressForm.district} onChange={(e) => setAddressForm((p) => ({ ...p, district: e.target.value }))} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1.5">Posta Kodu</label>
                <input type="text" value={addressForm.postal_code} onChange={(e) => setAddressForm((p) => ({ ...p, postal_code: e.target.value }))} className={inputClass} />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={handleSaveAddress} disabled={savingAddress} className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60">
                {savingAddress ? "Kaydediliyor..." : "Kaydet"}
              </button>
              <button onClick={() => { setShowAddressForm(false); setEditingAddressId(null); setAddressForm(emptyAddressForm); }} className="px-5 py-2.5 text-sm font-semibold text-neutral-600 hover:text-neutral-800 transition-colors">
                İptal
              </button>
            </div>
          </div>
        )}

        {/* Address List */}
        {addressesLoading ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="p-4 rounded-xl border border-neutral-200 space-y-2">
                <div className="h-4 w-24 bg-neutral-100 rounded animate-pulse" />
                <div className="h-3 w-full bg-neutral-100 rounded animate-pulse" />
                <div className="h-3 w-2/3 bg-neutral-100 rounded animate-pulse" />
              </div>
            ))}
          </div>
        ) : addresses.length === 0 ? (
          <p className="text-sm text-neutral-400">Henüz kayıtlı adresiniz yok.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {addresses.map((addr) => (
              <div key={addr.id} className={`p-4 rounded-xl relative ${addr.is_default ? "border-2 border-primary-500 bg-primary-25" : "border border-neutral-200"}`}>
                {addr.is_default && (
                  <span className="absolute top-2 right-2 text-[10px] font-semibold text-primary-700 bg-primary-100 px-2 py-0.5 rounded-full">Varsayılan</span>
                )}
                <p className="text-sm font-semibold text-neutral-800 mb-1">{addr.title}</p>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {addr.address_line}, {addr.district}, {addr.city} {addr.postal_code}
                </p>
                {addr.phone && <p className="text-xs text-neutral-400 mt-1">{addr.phone}</p>}
                <div className="flex gap-3 mt-3">
                  <button onClick={() => openEditAddress(addr)} className="text-xs font-medium text-primary-600 hover:text-primary-700">Düzenle</button>
                  {!addr.is_default && (
                    <button onClick={() => handleSetDefault(addr.id)} className="text-xs font-medium text-primary-600 hover:text-primary-700">Varsayılan Yap</button>
                  )}
                  <button onClick={() => handleDeleteAddress(addr.id)} className="text-xs font-medium text-red-500 hover:text-red-600">Sil</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-5 sm:p-6">
        <h2 className="text-base font-bold text-neutral-900 mb-5">Bildirim Tercihleri</h2>
        <div className="space-y-4">
          {[
            { key: "email" as const, label: "E-posta Bildirimleri", desc: "Kampanya ve sipariş bildirimleri" },
            { key: "sms" as const, label: "SMS Bildirimleri", desc: "Kargo ve sipariş güncellemeleri" },
            { key: "push" as const, label: "Push Bildirimleri", desc: "Anlık bildirimler" },
          ].map((n) => (
            <div key={n.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-800">{n.label}</p>
                <p className="text-xs text-neutral-400">{n.desc}</p>
              </div>
              <button onClick={() => {
                setNotifications((prev) => {
                  const updated = { ...prev, [n.key]: !prev[n.key] };
                  try { localStorage.setItem("enolsun_notification_prefs", JSON.stringify(updated)); } catch { /* ignore */ }
                  return updated;
                });
                showToast("Kaydedildi", "success");
              }} className={`relative w-11 h-6 rounded-full transition-colors ${notifications[n.key] ? "bg-primary-500" : "bg-neutral-200"}`}>
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${notifications[n.key] ? "translate-x-5" : "translate-x-0"}`}></span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
