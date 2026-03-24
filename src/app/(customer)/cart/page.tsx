"use client";

import { useState } from "react";
import Link from "next/link";

interface CartItem {
  id: number;
  name: string;
  category: string;
  color: string;
  colorClass: string;
  size: string;
  unitPrice: number;
  qty: number;
  gradient: string;
  icon: React.ReactNode;
}

const initialItems: CartItem[] = [
  {
    id: 1, name: "Premium Organik Pamuklu T-Shirt", category: "Giyim - Ust Giyim",
    color: "Haki Yesil", colorClass: "bg-primary-400", size: "M", unitPrice: 349.90, qty: 1,
    gradient: "from-primary-100 via-primary-200 to-primary-300",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />,
  },
  {
    id: 2, name: "El Yapimi Seramik Kahve Fincani Seti", category: "Ev & Yasam - Mutfak",
    color: "Toprak Tonu", colorClass: "bg-amber-400", size: "6'li Set", unitPrice: 189.00, qty: 2,
    gradient: "from-amber-100 via-orange-100 to-amber-200",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />,
  },
  {
    id: 3, name: "Akilli LED Masa Lambasi", category: "Elektronik - Aydinlatma",
    color: "Siyah", colorClass: "bg-neutral-700", size: "", unitPrice: 529.00, qty: 1,
    gradient: "from-blue-100 via-indigo-100 to-blue-200",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />,
  },
];

function formatPrice(n: number) {
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", minimumFractionDigits: 2 }).format(n);
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
  const total = subtotal - discount;

  const changeQty = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item)
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const applyCouponCode = () => {
    if (coupon.toUpperCase() === "HOSGELDIN") {
      setAppliedCoupon("HOSGELDIN");
      setDiscount(subtotal * 0.1);
    }
    setCoupon("");
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscount(0);
  };

  if (items.length === 0) {
    return (
      <div className="pt-4 sm:pt-8 pb-32 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12 sm:py-20 max-w-md mx-auto px-4">
            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 rounded-full bg-primary-50 border-2 border-dashed border-primary-200 flex items-center justify-center">
              <svg className="w-10 h-10 sm:w-14 sm:h-14 text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2">Sepetiniz bos</h2>
            <p className="text-xs sm:text-sm text-neutral-400 mb-6 sm:mb-8">Henuz sepetinize urun eklemediniz. Harika urunlerimize goz atin!</p>
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-xl shadow-align-sm transition-all hover:shadow-align-md active:scale-[0.98] min-h-[48px]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              Alisverise Basla
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-4 sm:pt-8 pb-32 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav aria-label="Sayfa yolu" className="flex items-center gap-2 text-sm text-neutral-400 mb-4 sm:mb-6 animate-fade-in-up">
          <Link href="/" className="hover:text-primary-500 transition-colors">Ana Sayfa</Link>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          <span className="text-neutral-700 font-medium">Sepetim</span>
        </nav>

        {/* Page Header + Step Indicator */}
        <div className="mb-6 sm:mb-8 animate-fade-in-up">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900">Sepetim</h1>
              <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-700">{items.length} urun</span>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center gap-0 max-w-md">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary-500 text-white flex items-center justify-center text-xs sm:text-sm font-semibold shadow-align-sm">1</div>
              <span className="text-xs sm:text-sm font-semibold text-primary-700">Sepet</span>
            </div>
            <div className="flex-1 h-0.5 bg-neutral-200 mx-2 sm:mx-3 rounded-full"></div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center text-xs sm:text-sm font-medium border border-neutral-200">2</div>
              <span className="text-xs sm:text-sm font-medium text-neutral-400 hidden sm:inline">Odeme</span>
            </div>
            <div className="flex-1 h-0.5 bg-neutral-200 mx-2 sm:mx-3 rounded-full"></div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center text-xs sm:text-sm font-medium border border-neutral-200">3</div>
              <span className="text-xs sm:text-sm font-medium text-neutral-400 hidden sm:inline">Onay</span>
            </div>
          </div>
        </div>

        {/* Cart Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl border border-neutral-100 p-3 sm:p-4 md:p-6 shadow-align-xs hover:-translate-y-0.5 hover:shadow-align-md transition-all duration-300">
                <div className="flex gap-3 sm:gap-4">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-xl bg-gradient-to-br ${item.gradient} flex-shrink-0 flex items-center justify-center`}>
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-primary-500/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">{item.icon}</svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-neutral-900 truncate">{item.name}</h3>
                        <p className="text-xs text-neutral-400 mt-0.5 hidden sm:block">{item.category}</p>
                        <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2 flex-wrap">
                          <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-neutral-500 bg-neutral-50 border border-neutral-100 rounded-lg px-1.5 sm:px-2 py-0.5">
                            <span className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${item.colorClass}`}></span> {item.color}
                          </span>
                          {item.size && <span className="inline-flex items-center text-[10px] sm:text-xs text-neutral-500 bg-neutral-50 border border-neutral-100 rounded-lg px-1.5 sm:px-2 py-0.5">{item.size}</span>}
                        </div>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="p-2 sm:p-1.5 text-neutral-300 hover:text-error-base hover:bg-error-light rounded-lg transition-colors flex-shrink-0 min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center" title="Kaldir">
                        <svg className="w-5 h-5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-end justify-between mt-3 sm:mt-4">
                      <div className="flex items-center border border-neutral-200 rounded-xl overflow-hidden">
                        <button onClick={() => changeQty(item.id, -1)} className="w-9 h-9 flex items-center justify-center text-neutral-500 hover:text-neutral-800 hover:bg-primary-50 transition-colors min-w-[36px] min-h-[36px]">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" d="M5 12h14" /></svg>
                        </button>
                        <span className="w-10 h-9 flex items-center justify-center text-sm font-semibold text-neutral-800 border-x border-neutral-200">{item.qty}</span>
                        <button onClick={() => changeQty(item.id, 1)} className="w-9 h-9 flex items-center justify-center text-neutral-500 hover:text-neutral-800 hover:bg-primary-50 transition-colors min-w-[36px] min-h-[36px]">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" d="M12 5v14m-7-7h14" /></svg>
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] sm:text-xs text-neutral-400">Birim: {formatPrice(item.unitPrice)}</p>
                        <p className="text-sm sm:text-base font-bold text-neutral-900">{formatPrice(item.unitPrice * item.qty)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-2">
              <Link href="/" className="flex sm:inline-flex items-center justify-center sm:justify-start gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors group w-full sm:w-auto px-4 py-3 sm:px-0 sm:py-0 border border-primary-200 sm:border-0 rounded-xl sm:rounded-none bg-primary-25 sm:bg-transparent min-h-[48px] sm:min-h-0">
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                Alisverise Devam Et
              </Link>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-4 sm:p-6 lg:sticky lg:top-24 animate-scale-in">
              <h2 className="text-lg font-bold text-neutral-900 mb-4 sm:mb-5">Siparis Ozeti</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Ara Toplam</span>
                  <span className="font-medium text-neutral-800">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Kargo</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded-full px-2.5 py-0.5">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    Ucretsiz
                  </span>
                </div>
              </div>

              {/* Coupon Input */}
              <div className="mt-4 sm:mt-5">
                <label className="text-xs font-medium text-neutral-500 mb-1.5 block">Indirim Kuponu</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input type="text" value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Kupon kodu girin" className="w-full sm:flex-1 px-3 py-3 sm:py-2.5 text-sm border border-neutral-200 rounded-xl bg-white placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all min-h-[48px] sm:min-h-0" />
                  <button onClick={applyCouponCode} className="w-full sm:w-auto px-4 py-3 sm:py-2.5 text-sm font-semibold text-primary-700 bg-primary-50 hover:bg-primary-100 border border-primary-200 rounded-xl transition-colors flex-shrink-0 min-h-[48px] sm:min-h-0">Uygula</button>
                </div>
                {appliedCoupon && (
                  <div className="mt-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-700 bg-primary-50 border border-primary-200 rounded-lg px-2.5 py-1">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" /></svg>
                      {appliedCoupon}
                      <button onClick={removeCoupon} className="ml-1 text-primary-400 hover:text-primary-600 transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </span>
                  </div>
                )}
              </div>

              {discount > 0 && (
                <div className="mt-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-primary-600">Indirim</span>
                    <span className="font-medium text-primary-600">-{formatPrice(discount)}</span>
                  </div>
                </div>
              )}

              <div className="border-t border-neutral-100 my-4 sm:my-5"></div>

              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <span className="text-base font-bold text-neutral-900">Toplam</span>
                <span className="text-xl font-bold text-neutral-900">{formatPrice(total)}</span>
              </div>

              <Link href="/checkout" className="hidden md:flex w-full items-center justify-center gap-2 px-6 py-3.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-xl shadow-align-sm transition-all hover:shadow-align-md active:scale-[0.98]">
                Odemeye Gec
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>

              {/* Trust Badges */}
              <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-neutral-100">
                <div className="flex items-center justify-center gap-3 sm:gap-4 text-neutral-400 flex-wrap">
                  <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                    <span>Guvenli Odeme</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                    <span>SSL Sifreleme</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
                    <span>Ucretsiz Kargo</span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
                  <span className="text-[10px] font-bold text-neutral-400 bg-neutral-50 border border-neutral-200 rounded-md px-2 sm:px-2.5 py-1 tracking-wide">VISA</span>
                  <span className="text-[10px] font-bold text-neutral-400 bg-neutral-50 border border-neutral-200 rounded-md px-2 sm:px-2.5 py-1 tracking-wide">MASTERCARD</span>
                  <span className="text-[10px] font-bold text-neutral-400 bg-neutral-50 border border-neutral-200 rounded-md px-2 sm:px-2.5 py-1 tracking-wide">TROY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/80 backdrop-blur-xl border-t border-neutral-100 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-neutral-400">Toplam</p>
            <p className="text-lg font-bold text-neutral-900">{formatPrice(total)}</p>
          </div>
          <Link href="/checkout" className="flex-1 max-w-[200px] flex items-center justify-center gap-2 px-5 py-3.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-xl shadow-align-sm transition-all active:scale-[0.98] min-h-[48px]">
            Odemeye Gec
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
