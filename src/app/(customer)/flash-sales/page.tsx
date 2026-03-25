"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { createClient } from "@/lib/supabase/client";
import FavoriteButton from "@/components/ui/FavoriteButton";
import AddToCartButton from "@/components/ui/AddToCartButton";

const _sb = createClient();

interface ProductImage {
  id: string;
  url: string;
  alt: string | null;
  is_primary: boolean;
  sort_order: number;
}

interface FlashProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  discount_price: number | null;
  stock: number;
  product_images: ProductImage[];
}

const gradients = [
  "from-rose-200 to-pink-300",
  "from-teal-200 to-cyan-300",
  "from-amber-200 to-yellow-300",
  "from-violet-200 to-purple-300",
  "from-lime-200 to-green-300",
  "from-sky-200 to-blue-300",
  "from-orange-200 to-red-300",
  "from-indigo-200 to-blue-300",
];

const upcoming = [
  { name: "Premium Havlu Seti", original: 699, sale: 419, start: "25 Mart 14:00" },
  { name: "Cam Teraryum", original: 459, sale: 275, start: "25 Mart 18:00" },
  { name: "Dogal Sabun Koleksiyonu", original: 289, sale: 173, start: "26 Mart 10:00" },
  { name: "Dekoratif Yastik (2li)", original: 599, sale: 359, start: "26 Mart 14:00" },
];

const primaryImage = (images: any[]) =>
  images?.find((img: any) => img.is_primary)?.url || images?.[0]?.url;

function formatCountdown(diff: number) {
  if (diff < 0) diff = 0;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s };
}

function ProductSkeleton() {
  return (
    <div className="rounded-2xl border border-neutral-100 bg-white overflow-hidden animate-pulse">
      <div className="h-44 bg-neutral-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-neutral-200 rounded w-3/4" />
        <div className="flex items-baseline gap-2">
          <div className="h-5 bg-neutral-200 rounded w-20" />
          <div className="h-4 bg-neutral-100 rounded w-14" />
        </div>
        <div className="space-y-1">
          <div className="flex justify-between">
            <div className="h-3 bg-neutral-100 rounded w-10" />
            <div className="h-3 bg-neutral-100 rounded w-8" />
          </div>
          <div className="h-1.5 bg-neutral-100 rounded-full" />
        </div>
        <div className="h-3 bg-neutral-100 rounded w-24" />
        <div className="h-9 bg-neutral-200 rounded-xl" />
      </div>
    </div>
  );
}

export default function FlashSalesPage() {
  const [products, setProducts] = useState<FlashProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const [mainTarget] = useState(() => {
    const t = new Date();
    t.setDate(t.getDate() + 3);
    t.setHours(t.getHours() + 7);
    return t.getTime();
  });

  const [productTargets, setProductTargets] = useState<number[]>([]);
  const [now, setNow] = useState(Date.now());

  // Fetch flash sale products
  useEffect(() => {
    const fetchFlashProducts = async () => {
      setLoading(true);
      const { data, error } = await _sb
        .from("products")
        .select("id, name, slug, price, discount_price, stock, product_images(*)")
        .eq("is_active", true)
        .not("discount_price", "is", null)
        .order("discount_price", { ascending: true })
        .limit(8);

      if (!error && data) {
        // Filter only products where discount_price < price
        const flashProducts = (data as FlashProduct[]).filter(
          (p) => p.discount_price !== null && p.discount_price < p.price
        );
        setProducts(flashProducts);

        // Generate random countdown targets for each product (2-12 hours)
        const targets = flashProducts.map(() => {
          const hours = Math.floor(Math.random() * 10) + 2;
          const t = new Date();
          t.setHours(t.getHours() + hours);
          return t.getTime();
        });
        setProductTargets(targets);
      }
      setLoading(false);
    };
    fetchFlashProducts();
  }, []);

  // Countdown ticker
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const main = formatCountdown(mainTarget - now);

  return (
    <>
      {/* Hero Header */}
      <section>
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"></div>
          </div>
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-yellow-400/20 mb-6">
              <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 10 10-12h-9l1-10z" /></svg>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-4 tracking-tight">EN Buyuk Flas Firsatlar</h1>
            <p className="text-lg sm:text-xl text-primary-200 mb-10 max-w-2xl mx-auto">EN buyuk indirimler, EN kisa sure! Kacirilmayacak firsatlar sizi bekliyor.</p>

            <div className="inline-flex items-center gap-3 sm:gap-5 bg-white/10 backdrop-blur-sm rounded-2xl px-6 sm:px-10 py-5 border border-white/10">
              <div className="text-center">
                <div className="tabular-nums text-3xl sm:text-5xl font-extrabold text-white">{String(main.d).padStart(2, "0")}</div>
                <div className="text-xs sm:text-sm text-primary-200 font-medium mt-1">GUN</div>
              </div>
              <span className="text-2xl sm:text-4xl font-bold text-yellow-400/60">:</span>
              <div className="text-center">
                <div className="tabular-nums text-3xl sm:text-5xl font-extrabold text-white">{String(main.h).padStart(2, "0")}</div>
                <div className="text-xs sm:text-sm text-primary-200 font-medium mt-1">SAAT</div>
              </div>
              <span className="text-2xl sm:text-4xl font-bold text-yellow-400/60">:</span>
              <div className="text-center">
                <div className="tabular-nums text-3xl sm:text-5xl font-extrabold text-white">{String(main.m).padStart(2, "0")}</div>
                <div className="text-xs sm:text-sm text-primary-200 font-medium mt-1">DAKIKA</div>
              </div>
              <span className="text-2xl sm:text-4xl font-bold text-yellow-400/60">:</span>
              <div className="text-center">
                <div className="tabular-nums text-3xl sm:text-5xl font-extrabold text-white">{String(main.s).padStart(2, "0")}</div>
                <div className="text-xs sm:text-sm text-primary-200 font-medium mt-1">SANIYE</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Campaigns */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.536 8.464a5 5 0 010 7.072M12 12v.01M17.657 6.343a8 8 0 010 11.314M6.343 6.343a8 8 0 000 11.314M8.464 15.536a5 5 0 010-7.072" /></svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">EN Aktif Kampanyalar</h2>
            <p className="text-sm text-neutral-400">Su an devam eden EN ozel firsatlar</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { title: "Ev & Yasam Festivali", desc: "EN iyi fiyatlarla evinizi yenileyin", discount: 40, time: "2 gun 14 saat kaldi", gradient: "from-amber-400 via-orange-400 to-red-400", icon: <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />, timeColor: "text-orange-700 bg-orange-50" },
            { title: "Aydinlatma Senligi", desc: "EN sik isiklandirma cozumleri", discount: 35, time: "1 gun 8 saat kaldi", gradient: "from-yellow-300 via-amber-400 to-yellow-500", icon: <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />, timeColor: "text-orange-700 bg-orange-50" },
            { title: "Dogal Bakim Haftasi", desc: "EN dogal urunlerle guzellesin", discount: 50, time: "5 saat kaldi", gradient: "from-emerald-400 via-teal-400 to-cyan-500", icon: <><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></>, timeColor: "text-red-700 bg-red-50" },
          ].map((c, i) => (
            <div key={i} className="group rounded-2xl overflow-hidden border border-neutral-100 bg-white hover:-translate-y-1 hover:shadow-align-lg transition-all duration-300">
              <div className={`relative h-48 bg-gradient-to-br ${c.gradient} flex items-center justify-center`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors"></div>
                <svg className="relative w-16 h-16 text-white/80" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">{c.icon}</svg>
                <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">%{c.discount}&apos;a varan</div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-neutral-900 mb-1">{c.title}</h3>
                <p className="text-sm text-neutral-400 mb-4">{c.desc}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${c.timeColor} px-2.5 py-1 rounded-full`}>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                    {c.time}
                  </span>
                </div>
                <Link href="/products" className="block w-full text-center py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors min-h-[44px] flex items-center justify-center">Kampanyayi Gor</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Flash Deal Products */}
      <section className="bg-neutral-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 10 10-12h-9l1-10z" /></svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Flas Firsatlar</h2>
              <p className="text-sm text-neutral-400">EN hizli kapasite tukeniyor, EN iyi firsatlari kacirmayin!</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
              : products.map((p, i) => {
                  const discount = Math.round((1 - p.discount_price! / p.price) * 100);
                  const diff = (productTargets[i] || 0) - now;
                  const timer = formatCountdown(diff);
                  const hoursLeft = diff / 3600000;
                  const urgencyColor = hoursLeft <= 3 ? "text-red-600" : hoursLeft <= 6 ? "text-orange-600" : "text-neutral-500";

                  // Simulate sold percentage based on stock (lower stock = more sold)
                  const soldPercent = Math.max(10, Math.min(95, 100 - p.stock));
                  const barColor = soldPercent >= 75 ? "bg-red-500" : soldPercent >= 50 ? "bg-orange-500" : "bg-primary-500";

                  const imgUrl = primaryImage(p.product_images);

                  return (
                    <div key={p.id} className="group rounded-2xl border border-neutral-100 bg-white overflow-hidden hover:-translate-y-1 hover:shadow-align-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 0.08}s` }}>
                      <Link href={`/product/${p.slug}`}>
                        <div className={`relative h-44 ${!imgUrl ? `bg-gradient-to-br ${gradients[i % gradients.length]}` : "bg-neutral-100"} flex items-center justify-center`}>
                          {imgUrl ? (
                            <img
                              src={imgUrl}
                              alt={p.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <svg className="w-12 h-12 text-white/60" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="12" cy="12" r="3" /></svg>
                          )}
                          <div className="absolute top-2.5 left-2.5 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-lg">%{discount}</div>
                          <div className="absolute top-2.5 right-2.5">
                            <FavoriteButton productId={p.id} />
                          </div>
                        </div>
                      </Link>
                      <div className="p-4">
                        <Link href={`/product/${p.slug}`}>
                          <h3 className="font-semibold text-neutral-900 text-sm mb-2 truncate">{p.name}</h3>
                        </Link>
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="text-lg font-bold text-primary-600">{p.discount_price} TL</span>
                          <span className="text-sm text-neutral-400 line-through">{p.price} TL</span>
                        </div>
                        <div className="mb-2">
                          <div className="flex justify-between text-xs text-neutral-500 mb-1">
                            <span>Satilan</span>
                            <span className="font-semibold">{soldPercent}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                            <div className={`h-full ${barColor} rounded-full transition-all duration-1000`} style={{ width: `${soldPercent}%` }}></div>
                          </div>
                        </div>
                        <div className={`flex items-center gap-1 ${urgencyColor} text-xs font-medium mb-3`}>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                          <span className="tabular-nums">{String(timer.h).padStart(2, "0")}:{String(timer.m).padStart(2, "0")}:{String(timer.s).padStart(2, "0")}</span>
                        </div>
                        <AddToCartButton
                          productId={p.id}
                          className="w-full py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          Sepete Ekle
                        </AddToCartButton>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </section>

      {/* Upcoming Deals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">Yakinda Baslayacak</h2>
            <p className="text-sm text-neutral-400">Hatirlatma kurarak EN iyi firsati kacirmayin</p>
          </div>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
          {upcoming.map((p, i) => {
            const discount = Math.round((1 - p.sale / p.original) * 100);
            return (
              <div key={i} className="shrink-0 w-72 rounded-2xl border border-neutral-100 bg-white overflow-hidden opacity-60">
                <div className="relative h-36 bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center">
                  <svg className="w-10 h-10 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="12" cy="12" r="3" /></svg>
                  <div className="absolute top-2.5 left-2.5 bg-neutral-600 text-white text-xs font-bold px-2 py-0.5 rounded-lg">%{discount}</div>
                  <div className="absolute bottom-2.5 right-2.5 bg-primary-700 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                    Baslangic: {p.start}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-neutral-700 text-sm mb-2">{p.name}</h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-lg font-bold text-neutral-500">{p.sale} TL</span>
                    <span className="text-sm text-neutral-300 line-through">{p.original} TL</span>
                  </div>
                  <button disabled className="w-full py-2 bg-neutral-200 text-neutral-400 text-sm font-semibold rounded-xl cursor-not-allowed">Hatirlat</button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-yellow-300 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-yellow-400/20 mb-5">
            <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 17H2a3 3 0 003 3h14a3 3 0 003-3zM6 4h12a2 2 0 012 2v4a8 8 0 01-16 0V6a2 2 0 012-2z" /></svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">EN buyuk firsatlari kacirma!</h2>
          <p className="text-primary-200 mb-8 max-w-lg mx-auto">E-posta adresini birak, EN yeni kampanyalardan ve EN buyuk indirimlerden aninda haberdar ol.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input type="email" required placeholder="ornek@email.com" className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 text-sm min-h-[44px]" />
            <button type="submit" className="px-6 py-3 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-colors text-sm whitespace-nowrap min-h-[44px]">Abone Ol</button>
          </form>
        </div>
      </section>
    </>
  );
}
