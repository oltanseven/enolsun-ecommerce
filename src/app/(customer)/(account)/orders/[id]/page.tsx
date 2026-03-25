"use client";

import Link from "next/link";

const steps = [
  { label: "Sipariş Alındı", date: "22 Mart 10:30", done: true },
  { label: "Hazırlanıyor", date: "22 Mart 14:15", done: true },
  { label: "Kargoya Verildi", date: "23 Mart 09:00", done: true },
  { label: "Dağıtımda", date: "", done: false, active: true },
  { label: "Teslim Edildi", date: "", done: false },
];

const timeline = [
  { date: "23 Mart 2024 - 16:45", text: "Kargo dağıtım şubesine ulaştı", location: "İstanbul - Şişli Dağıtım Merkezi" },
  { date: "23 Mart 2024 - 09:00", text: "Kargoya verildi", location: "İstanbul - Merkez Transfer" },
  { date: "22 Mart 2024 - 14:15", text: "Siparişiniz hazırlanmaya başladı", location: "enolsun.com Depo" },
  { date: "22 Mart 2024 - 10:30", text: "Siparişiniz alındı", location: "" },
];

export default function OrderTrackingPage() {
  return (
    <>
    <title>Sipariş Takibi | enolsun.com</title>
    <meta name="description" content="enolsun.com sipariş takibi. Siparişinizin EN güncel durumunu anlık olarak takip edin, kargo hareketlerini izleyin." />
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/orders" className="p-2 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">Sipariş Takibi</h1>
          <p className="text-sm text-neutral-400">ORD-2024-1847</p>
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-5 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold text-blue-700 bg-blue-50">Kargoda</span>
          <span className="text-xs text-neutral-400">Takip No: TR1234567890</span>
        </div>

        {/* Steps */}
        <div className="flex items-start justify-between relative">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center relative z-10 flex-1">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-2 ${step.done ? "bg-primary-500 text-white" : step.active ? "bg-primary-100 border-2 border-primary-500 text-primary-600" : "bg-neutral-100 text-neutral-400 border border-neutral-200"}`}>
                {step.done ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                ) : step.active ? (
                  <div className="w-3 h-3 rounded-full bg-primary-500 animate-pulse"></div>
                ) : (
                  <span className="text-xs font-medium">{i + 1}</span>
                )}
              </div>
              <p className={`text-[10px] sm:text-xs font-medium ${step.done || step.active ? "text-neutral-800" : "text-neutral-400"}`}>{step.label}</p>
              {step.date && <p className="text-[9px] sm:text-[10px] text-neutral-400 mt-0.5">{step.date}</p>}
            </div>
          ))}
          {/* Progress line */}
          <div className="absolute top-4 sm:top-5 left-[10%] right-[10%] h-0.5 bg-neutral-200 -z-0">
            <div className="h-full bg-primary-500 rounded-full" style={{ width: "60%" }}></div>
          </div>
        </div>
      </div>

      {/* Cargo Timeline */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-5 sm:p-6">
        <h2 className="text-base font-bold text-neutral-900 mb-5">Kargo Hareketleri</h2>
        <div className="space-y-0">
          {timeline.map((item, i) => (
            <div key={i} className="flex gap-4 relative">
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${i === 0 ? "bg-primary-500 ring-4 ring-primary-100" : "bg-neutral-200"}`}></div>
                {i < timeline.length - 1 && <div className="w-0.5 flex-1 bg-neutral-100 my-1"></div>}
              </div>
              <div className="pb-6">
                <p className="text-xs text-neutral-400 mb-0.5">{item.date}</p>
                <p className={`text-sm font-medium ${i === 0 ? "text-neutral-900" : "text-neutral-600"}`}>{item.text}</p>
                {item.location && <p className="text-xs text-neutral-400 mt-0.5">{item.location}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Details */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-5 sm:p-6">
        <h2 className="text-base font-bold text-neutral-900 mb-5">Sipariş Detayı</h2>
        <div className="space-y-3">
          {[
            { name: "Premium Organik Pamuklu T-Shirt", qty: 1, price: "349,90" },
            { name: "El Yapimi Seramik Kahve Fincani Seti", qty: 2, price: "378,00" },
            { name: "Akilli LED Masa Lambasi", qty: 1, price: "529,00" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-neutral-50 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="12" cy="12" r="3" /></svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-800">{item.name}</p>
                  <p className="text-xs text-neutral-400">Adet: {item.qty}</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-neutral-800">{item.price} TL</span>
            </div>
          ))}
        </div>
        <div className="border-t border-neutral-100 mt-4 pt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-neutral-500">Ara Toplam </span>
            <span className="text-neutral-800">1.256,90 TL</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-neutral-500">Kargo</span>
            <span className="text-green-600">Ücretsiz</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-primary-600">Kupon İndirimi</span>
            <span className="text-primary-600">-125,69 TL</span>
          </div>
          <div className="flex justify-between text-base font-bold mt-3 pt-3 border-t border-neutral-100">
            <span className="text-neutral-900">Toplam</span>
            <span className="text-neutral-900">1.131,21 TL</span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
