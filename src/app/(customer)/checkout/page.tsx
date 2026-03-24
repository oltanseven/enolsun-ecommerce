"use client";

import { useState } from "react";
import Link from "next/link";

const installments = [
  { count: 1, monthly: "1.131,21", total: "1.131,21" },
  { count: 2, monthly: "580,11", total: "1.160,22" },
  { count: 3, monthly: "392,07", total: "1.176,21" },
  { count: 6, monthly: "201,04", total: "1.206,24" },
  { count: 9, monthly: "138,67", total: "1.248,03" },
  { count: 12, monthly: "107,03", total: "1.284,36" },
];

export default function CheckoutPage() {
  const [shipping, setShipping] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [saveCard, setSaveCard] = useState(false);
  const [sameAddress, setSameAddress] = useState(true);
  const [selectedInstallment, setSelectedInstallment] = useState(1);

  return (
    <div className="pt-4 sm:pt-8 pb-32 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="sr-only">Odeme</h1>

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
              <span className="text-xs sm:text-sm font-semibold text-primary-700">Odeme</span>
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
                  <input type="text" defaultValue="Emre" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1.5">Soyad</label>
                  <input type="text" defaultValue="Yilmaz" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-neutral-500 mb-1.5">Adres</label>
                  <input type="text" defaultValue="Levent Mah. Buyukdere Cad. No:185 K:12" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1.5">Il</label>
                  <select className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all bg-white">
                    <option>Istanbul</option>
                    <option>Ankara</option>
                    <option>Izmir</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1.5">Ilce</label>
                  <select className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all bg-white">
                    <option>Sisli</option>
                    <option>Besiktas</option>
                    <option>Kadikoy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1.5">Telefon</label>
                  <input type="tel" defaultValue="+90 532 555 0456" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1.5">Posta Kodu</label>
                  <input type="text" defaultValue="34394" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all" />
                </div>
              </div>
              <label className="flex items-center gap-2 mt-4 cursor-pointer">
                <input type="checkbox" checked={sameAddress} onChange={(e) => setSameAddress(e.target.checked)} className="w-4 h-4 rounded border-neutral-300 text-primary-500 focus:ring-primary-300 accent-primary-500" />
                <span className="text-sm text-neutral-600">Fatura adresi teslimat adresi ile ayni</span>
              </label>
            </div>

            {/* Shipping Options */}
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-4 sm:p-6 animate-fade-in-up">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
                </div>
                <h2 className="text-base font-bold text-neutral-900">Kargo Secenekleri</h2>
              </div>
              <div className="space-y-3">
                {[
                  { id: "standard", label: "Standart Kargo", desc: "3-5 is gunu", price: "Ucretsiz", priceColor: "text-green-600" },
                  { id: "express", label: "Hizli Kargo", desc: "1-2 is gunu", price: "+29,90 TL", priceColor: "text-neutral-700" },
                  { id: "same-day", label: "Ayni Gun Teslimat", desc: "Bugun teslim", price: "+59,90 TL", priceColor: "text-neutral-700" },
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
                <h2 className="text-base font-bold text-neutral-900">Odeme Bilgileri</h2>
              </div>

              {/* Payment method tabs */}
              <div className="flex gap-2 mb-5">
                {[
                  { id: "card", label: "Kredi Karti" },
                  { id: "transfer", label: "Havale/EFT" },
                  { id: "cod", label: "Kapida Odeme" },
                ].map((m) => (
                  <button key={m.id} onClick={() => setPaymentMethod(m.id)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${paymentMethod === m.id ? "bg-primary-600 text-white" : "bg-neutral-50 text-neutral-500 hover:bg-neutral-100"}`}>{m.label}</button>
                ))}
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-500 mb-1.5">Kart Uzerindeki Isim</label>
                    <input type="text" placeholder="EMRE YILMAZ" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all uppercase" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-500 mb-1.5">Kart Numarasi</label>
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
                    <span className="text-sm text-neutral-600">Kartimi kaydet</span>
                  </label>

                  {/* Installments Table */}
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-neutral-800 mb-3">Taksit Secenekleri</h3>
                    <div className="overflow-hidden rounded-xl border border-neutral-200">
                      <table className="w-full text-sm">
                        <thead className="bg-neutral-50">
                          <tr>
                            <th className="text-left px-4 py-2.5 text-xs font-medium text-neutral-500">Taksit</th>
                            <th className="text-right px-4 py-2.5 text-xs font-medium text-neutral-500">Aylik</th>
                            <th className="text-right px-4 py-2.5 text-xs font-medium text-neutral-500">Toplam</th>
                            <th className="px-4 py-2.5 w-10"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {installments.map((inst) => (
                            <tr key={inst.count} onClick={() => setSelectedInstallment(inst.count)} className={`cursor-pointer transition-colors ${selectedInstallment === inst.count ? "bg-primary-25" : "hover:bg-neutral-25"}`}>
                              <td className="px-4 py-3 font-medium text-neutral-800">{inst.count === 1 ? "Tek Cekim" : `${inst.count} Taksit`}</td>
                              <td className="px-4 py-3 text-right text-neutral-600">{inst.monthly} TL</td>
                              <td className="px-4 py-3 text-right font-semibold text-neutral-800">{inst.total} TL</td>
                              <td className="px-4 py-3 text-center">
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
                  <p className="text-sm text-neutral-700 font-medium">Kapida odeme secenegi</p>
                  <p className="text-xs text-neutral-500 mt-1">+9,90 TL kapida odeme ucreti uygulanir. Nakit veya kart ile odeme yapabilirsiniz.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-4 sm:p-6 lg:sticky lg:top-24 animate-scale-in">
              <h2 className="text-base font-bold text-neutral-900 mb-4">Siparis Ozeti</h2>

              {/* Order Items */}
              <div className="space-y-3 mb-4">
                {[
                  { name: "Premium Organik Pamuklu T-Shirt", qty: 1, price: "349,90" },
                  { name: "El Yapimi Seramik Kahve Fincani Seti", qty: 2, price: "378,00" },
                  { name: "Akilli LED Masa Lambasi", qty: 1, price: "529,00" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-start text-sm">
                    <div className="flex-1 min-w-0 pr-3">
                      <p className="text-neutral-700 truncate">{item.name}</p>
                      <p className="text-xs text-neutral-400">Adet: {item.qty}</p>
                    </div>
                    <span className="font-medium text-neutral-800 whitespace-nowrap">{item.price} TL</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-neutral-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Ara Toplam</span>
                  <span className="text-neutral-800">1.256,90 TL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Kargo</span>
                  <span className="text-green-600 font-medium">Ucretsiz</span>
                </div>
                <div className="flex justify-between text-primary-600">
                  <span>Kupon (HOSGELDIN)</span>
                  <span className="font-medium">-125,69 TL</span>
                </div>
              </div>

              <div className="border-t border-neutral-100 mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-neutral-900">Toplam</span>
                  <span className="text-xl font-bold text-neutral-900">1.131,21 TL</span>
                </div>
              </div>

              <button className="w-full mt-5 flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-xl shadow-align-sm transition-all hover:shadow-align-md active:scale-[0.98]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                Siparisi Onayla
              </button>

              <p className="text-[10px] text-neutral-400 text-center mt-3">Siparisi onaylayarak satis sozlesmesini kabul etmis olursunuz.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
