"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";

const primaryImage = (images: any[]) =>
  images?.find((img: any) => img.is_primary)?.url || images?.[0]?.url;

function calculateInstallments(total: number) {
  const rates: { count: number; rate: number }[] = [
    { count: 1, rate: 0 },
    { count: 2, rate: 0.0256 },
    { count: 3, rate: 0.0399 },
    { count: 6, rate: 0.0664 },
    { count: 9, rate: 0.1034 },
    { count: 12, rate: 0.1355 },
  ];
  return rates.map(({ count, rate }) => {
    const totalWithRate = total * (1 + rate);
    return {
      count,
      monthly: (totalWithRate / count).toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      total: totalWithRate.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    };
  });
}

export default function CheckoutPage() {
  const [shipping, setShipping] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [saveCard, setSaveCard] = useState(false);
  const [sameAddress, setSameAddress] = useState(true);
  const [selectedInstallment, setSelectedInstallment] = useState(1);

  const { items, total, loading } = useCart();

  const shippingCost = shipping === "express" ? 29.90 : shipping === "same-day" ? 59.90 : 0;
  const grandTotal = total + shippingCost;
  const installments = calculateInstallments(grandTotal);

  const formatPrice = (price: number) =>
    price.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  if (loading) {
    return (
      <div className="pt-4 sm:pt-8 pb-32 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-neutral-100 p-4 sm:p-6 animate-pulse">
                  <div className="h-5 bg-neutral-100 rounded w-40 mb-5" />
                  <div className="space-y-3">
                    {[...Array(3)].map((_, j) => <div key={j} className="h-10 bg-neutral-50 rounded-xl" />)}
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-neutral-100 p-4 sm:p-6 animate-pulse h-fit">
              <div className="h-5 bg-neutral-100 rounded w-32 mb-4" />
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => <div key={i} className="h-12 bg-neutral-50 rounded" />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-4 sm:pt-8 pb-32 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="sr-only">Güvenli Ödeme</h1>

        {/* Step Indicator */}
        <div className="mb-6 sm:mb-10 max-w-md animate-fade-in-up">
          <div className="flex items-center gap-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-align-sm">
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
              </div>
              <span className="text-xs sm:text-sm font-medium text-primary-600 hidden sm:inline">Sepet</span>
            </div>
            <div className="flex-1 h-0.5 bg-primary-400 mx-2 sm:mx-3 rounded-full"></div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary-500 text-white flex items-center justify-center text-xs sm:text-sm font-semibold shadow-align-sm">2</div>
              <span className="text-xs sm:text-sm font-semibold text-primary-700">Ödeme</span>
            </div>
            <div className="flex-1 h-0.5 bg-neutral-200 mx-2 sm:mx-3 rounded-full"></div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center text-xs sm:text-sm font-medium border border-neutral-200">3</div>
              <span className="text-xs sm:text-sm font-medium text-neutral-400 hidden sm:inline">Onay</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">

            {/* Address Form */}
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-4 sm:p-6 animate-fade-in-up">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                </div>
                <h2 className="text-base font-bold text-neutral-900">Teslimat Adresi</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1.5">Ad</label>
                  <input type="text" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1.5">Soyad</label>
                  <input type="text" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-neutral-500 mb-1.5">Adres</label>
                  <input type="text" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1.5">İl</label>
                  <select className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all bg-white">
                    <option>İstanbul</option>
                    <option>Ankara</option>
                    <option>İzmir</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1.5">İlçe</label>
                  <select className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all bg-white">
                    <option>Şişli</option>
                    <option>Beşiktaş</option>
                    <option>Kadıköy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1.5">Telefon</label>
                  <input type="tel" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1.5">Posta Kodu</label>
                  <input type="text" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all" />
                </div>
              </div>
              <label className="flex items-center gap-2 mt-4 cursor-pointer">
                <input type="checkbox" checked={sameAddress} onChange={(e) => setSameAddress(e.target.checked)} className="w-4 h-4 rounded border-neutral-300 text-primary-500 focus:ring-primary-300 accent-primary-500" />
                <span className="text-sm text-neutral-600">Fatura adresi teslimat adresi ile aynı</span>
              </label>
            </div>

            {/* Shipping Options */}
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-4 sm:p-6 animate-fade-in-up">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
                </div>
                <h2 className="text-base font-bold text-neutral-900">Kargo Seçenekleri</h2>
              </div>
              <div className="space-y-3">
                {[
                  { id: "standard", label: "Standart Kargo", desc: "3-5 iş günü", price: "Ücretsiz", priceColor: "text-green-600" },
                  { id: "express", label: "EN Hızlı Kargo", desc: "1-2 iş günü", price: "+29,90 TL", priceColor: "text-neutral-700" },
                  { id: "same-day", label: "Aynı Gün Teslimat", desc: "Bugün teslim", price: "+59,90 TL", priceColor: "text-neutral-700" },
                ].map((opt) => (
                  <button key={opt.id} onClick={() => setShipping(opt.id)} className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left ${shipping === opt.id ? "border-primary-500 bg-primary-25" : "border-neutral-200 hover:border-primary-200"}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${shipping === opt.id ? "border-primary-500" : "border-neutral-300"}`}>
                        {shipping === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-primary-500"></div>}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-neutral-800">{opt.label}</p>
                        <p className="text-xs text-neutral-400">{opt.desc}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-semibold ${opt.priceColor}`}>{opt.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-4 sm:p-6 animate-fade-in-up">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg>
                </div>
                <h2 className="text-base font-bold text-neutral-900">Ödeme Bilgileri</h2>
              </div>

              {/* Payment method tabs */}
              <div className="flex gap-2 mb-5">
                {[
                  { id: "card", label: "Kredi Kartı" },
                  { id: "transfer", label: "Havale/EFT" },
                  { id: "cod", label: "Kapıda Ödeme" },
                ].map((m) => (
                  <button key={m.id} onClick={() => setPaymentMethod(m.id)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${paymentMethod === m.id ? "bg-primary-600 text-white" : "bg-neutral-50 text-neutral-500 hover:bg-neutral-100"}`}>{m.label}</button>
                ))}
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-500 mb-1.5">Kart Üzerindeki İsim</label>
                    <input type="text" placeholder="AD SOYAD" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all uppercase" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-500 mb-1.5">Kart Numarası</label>
                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all tabular-nums" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-500 mb-1.5">Son Kullanma</label>
                      <input type="text" placeholder="AA/YY" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-500 mb-1.5">CVV</label>
                      <input type="text" placeholder="000" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all" />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={saveCard} onChange={(e) => setSaveCard(e.target.checked)} className="w-4 h-4 rounded border-neutral-300 text-primary-500 focus:ring-primary-300 accent-primary-500" />
                    <span className="text-sm text-neutral-600">Kartımı kaydet</span>
                  </label>

                  {/* Installments Table */}
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-neutral-800 mb-3">Taksit Seçenekleri</h3>
                    <div className="overflow-x-auto overflow-hidden rounded-xl border border-neutral-200">
                      <table className="w-full text-xs sm:text-sm">
                        <thead className="bg-neutral-50">
                          <tr>
                            <th className="text-left px-2 sm:px-4 py-2.5 text-xs font-medium text-neutral-500">Taksit</th>
                            <th className="text-right px-2 sm:px-4 py-2.5 text-xs font-medium text-neutral-500">Aylık</th>
                            <th className="text-right px-2 sm:px-4 py-2.5 text-xs font-medium text-neutral-500">Toplam</th>
                            <th className="px-2 sm:px-4 py-2.5 w-8 sm:w-10"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {installments.map((inst) => (
                            <tr key={inst.count} onClick={() => setSelectedInstallment(inst.count)} className={`cursor-pointer transition-colors ${selectedInstallment === inst.count ? "bg-primary-25" : "hover:bg-neutral-25"}`}>
                              <td className="px-2 sm:px-4 py-2.5 sm:py-3 font-medium text-neutral-800">{inst.count === 1 ? "Tek Çekim" : `${inst.count} Taksit`}</td>
                              <td className="px-2 sm:px-4 py-2.5 sm:py-3 text-right text-neutral-600">{inst.monthly} TL</td>
                              <td className="px-2 sm:px-4 py-2.5 sm:py-3 text-right font-semibold text-neutral-800">{inst.total} TL</td>
                              <td className="px-2 sm:px-4 py-2.5 sm:py-3 text-center">
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mx-auto ${selectedInstallment === inst.count ? "border-primary-500" : "border-neutral-300"}`}>
                                  {selectedInstallment === inst.count && <div className="w-2 h-2 rounded-full bg-primary-500"></div>}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "transfer" && (
                <div className="p-4 bg-primary-25 rounded-xl border border-primary-100">
                  <p className="text-sm text-neutral-700 mb-2 font-medium">Banka Hesap Bilgileri</p>
                  <p className="text-xs text-neutral-500">Garanti BBVA - TR12 0006 2000 0000 0012 3456 78</p>
                  <p className="text-xs text-neutral-500 mt-1">Hesap Sahibi: enolsun.com Ticaret A.S.</p>
                </div>
              )}

              {paymentMethod === "cod" && (
                <div className="p-4 bg-warning-light rounded-xl border border-yellow-200">
                  <p className="text-sm text-neutral-700 font-medium">Kapıda ödeme seçeneği</p>
                  <p className="text-xs text-neutral-500 mt-1">+9,90 TL kapıda ödeme ücreti uygulanır. Nakit veya kart ile ödeme yapabilirsiniz.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-4 sm:p-6 lg:sticky lg:top-24 animate-scale-in">
              <h2 className="text-base font-bold text-neutral-900 mb-4">Sipariş Özeti</h2>

              {/* Order Items */}
              <div className="space-y-3 mb-4">
                {items.length === 0 && (
                  <p className="text-sm text-neutral-400 text-center py-4">Sepetiniz boş.</p>
                )}
                {items.map((item) => {
                  const img = primaryImage(item.product?.product_images || []);
                  const itemPrice = item.product?.discount_price || item.product?.price || 0;
                  return (
                  <div key={item.id} className="flex gap-3 items-start text-sm">
                    <div className="w-12 h-12 rounded-lg bg-neutral-50 flex-shrink-0 overflow-hidden flex items-center justify-center">
                      {img ? (
                        <img src={img} alt={item.product?.name} className="w-full h-full object-cover" />
                      ) : (
                        <svg className="w-5 h-5 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="12" cy="12" r="3" /></svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 pr-1">
                      <p className="text-neutral-700 truncate">{item.product?.name}</p>
                      <p className="text-xs text-neutral-400">Adet: {item.quantity}</p>
                    </div>
                    <span className="font-medium text-neutral-800 whitespace-nowrap">{formatPrice(itemPrice * item.quantity)} TL</span>
                  </div>
                  );
                })}
              </div>

              <div className="border-t border-neutral-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Ara Toplam</span>
                  <span className="text-neutral-800">{formatPrice(total)} TL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Kargo</span>
                  {shippingCost === 0 ? (
                    <span className="text-green-600 font-medium">Ücretsiz</span>
                  ) : (
                    <span className="text-neutral-800">+{formatPrice(shippingCost)} TL</span>
                  )}
                </div>
              </div>

              <div className="border-t border-neutral-100 mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-neutral-900">Toplam</span>
                  <span className="text-xl font-bold text-neutral-900">{formatPrice(grandTotal)} TL</span>
                </div>
              </div>

              <button className="w-full mt-5 flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-xl shadow-align-sm transition-all hover:shadow-align-md active:scale-[0.98]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                Siparişi Güvenle Onayla
              </button>

              <p className="text-[10px] text-neutral-400 text-center mt-3">Siparişi onaylayarak satış sözleşmesini kabul etmiş olursunuz. EN güvenli alışveriş deneyimi.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
