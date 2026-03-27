"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { createClient } from "@/lib/supabase/client";
import FavoriteButton from "@/components/ui/FavoriteButton";
import Breadcrumb from "@/components/ui/Breadcrumb";

const _sb = createClient();

const primaryImage = (images: any[]) =>
  images?.find((img: any) => img.is_primary)?.url || images?.[0]?.url;

const GRADIENTS = [
  "from-teal-200 to-cyan-300",
  "from-amber-200 to-yellow-300",
  "from-violet-200 to-purple-300",
  "from-rose-200 to-pink-300",
  "from-lime-200 to-green-300",
  "from-orange-200 to-red-200",
  "from-sky-200 to-blue-300",
  "from-indigo-200 to-blue-300",
  "from-pink-200 to-rose-300",
  "from-emerald-200 to-teal-300",
  "from-gray-200 to-slate-300",
  "from-fuchsia-200 to-pink-300",
];

const TOP3_CONFIG = [
  {
    // rank 1 — gold (center)
    border: "border-2 border-[#d4a017]",
    gradient: "from-yellow-200 via-amber-100 to-orange-200",
    badgeBg: "bg-gradient-to-br from-yellow-500 to-amber-600",
    order: "order-1 lg:order-2",
    featured: true,
  },
  {
    // rank 2 — silver (left)
    border: "border-2 border-gray-400",
    gradient: "from-gray-200 via-gray-100 to-gray-300",
    badgeBg: "bg-gray-400",
    order: "order-2 lg:order-1",
    featured: false,
  },
  {
    // rank 3 — bronze (right)
    border: "border-2 border-[#b87333]",
    gradient: "from-orange-200 via-amber-100 to-yellow-200",
    badgeBg: "bg-gradient-to-br from-amber-600 to-orange-700",
    order: "order-3",
    featured: false,
  },
];

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  return (
    <div className="flex">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < full ? "text-yellow-400" : "text-neutral-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TopCardSkeleton({ featured }: { featured: boolean }) {
  return (
    <div className={`rounded-2xl border border-neutral-100 bg-white overflow-hidden ${featured ? "order-1 lg:order-2" : ""}`}>
      <div className={`${featured ? "h-64 lg:h-72" : "h-56"} bg-neutral-100 animate-pulse`} />
      <div className={featured ? "p-6" : "p-5"}>
        <div className="h-4 w-20 bg-neutral-100 rounded-full mb-3 animate-pulse" />
        <div className="h-5 w-3/4 bg-neutral-100 rounded mb-2 animate-pulse" />
        <div className="h-3 w-full bg-neutral-50 rounded mb-3 animate-pulse" />
        <div className="h-3 w-24 bg-neutral-50 rounded mb-4 animate-pulse" />
        <div className="flex items-center justify-between">
          <div className="h-7 w-20 bg-neutral-100 rounded animate-pulse" />
          <div className="h-9 w-24 bg-neutral-100 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function GridCardSkeleton() {
  return (
    <div className="rounded-2xl border border-neutral-100 bg-white overflow-hidden">
      <div className="h-44 bg-neutral-100 animate-pulse" />
      <div className="p-4">
        <div className="h-4 w-3/4 bg-neutral-100 rounded mb-2 animate-pulse" />
        <div className="h-3 w-20 bg-neutral-50 rounded mb-3 animate-pulse" />
        <div className="flex items-center justify-between">
          <div className="h-6 w-16 bg-neutral-100 rounded animate-pulse" />
          <div className="h-8 w-20 bg-neutral-100 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function TrendingSkeleton() {
  return (
    <div className="rounded-2xl border border-neutral-100 bg-white overflow-hidden">
      <div className="h-40 bg-neutral-100 animate-pulse" />
      <div className="p-4">
        <div className="h-4 w-3/4 bg-neutral-100 rounded mb-2 animate-pulse" />
        <div className="h-3 w-24 bg-neutral-50 rounded mb-3 animate-pulse" />
        <div className="flex items-center justify-between">
          <div className="h-6 w-16 bg-neutral-100 rounded animate-pulse" />
          <div className="h-8 w-20 bg-neutral-100 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function formatPrice(price: number) {
  return price.toLocaleString("tr-TR");
}

export default function BestsellersPage() {
  const [activeCat, setActiveCat] = useState("all");
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [trending, setTrending] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await _sb.from("categories").select("id, name, slug").order("name");
      if (data) setCategories(data);
    };
    fetchCategories();
  }, []);

  // Fetch bestsellers (sorted by review_count DESC)
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      let query = _sb
        .from("products")
        .select("id, name, slug, price, discount_price, rating, review_count, category_id, category:categories(id, name, slug), product_images(url, is_primary, sort_order)")
        .eq("is_active", true)
        .order("review_count", { ascending: false })
        .limit(20);

      if (activeCat !== "all") {
        query = query.eq("category_id", activeCat);
      }

      const { data } = await query;
      setProducts(data || []);
      setLoading(false);
    };

    fetchProducts();
  }, [activeCat]);

  // Fetch trending (most recent products with good ratings — simulate "rising")
  useEffect(() => {
    const fetchTrending = async () => {
      const { data } = await _sb
        .from("products")
        .select("id, name, slug, price, discount_price, rating, review_count, category:categories(name), product_images(url, is_primary, sort_order)")
        .eq("is_active", true)
        .gte("rating", 4)
        .order("created_at", { ascending: false })
        .limit(4);

      if (data) setTrending(data);
    };
    fetchTrending();
  }, []);

  const top3 = products.slice(0, 3);
  const rest = products.slice(3);

  const categoryButtons = [
    { key: "all", label: "Tümü" },
    ...categories.map((c) => ({ key: c.id, label: c.name })),
  ];

  return (
    <>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumb items={[{ label: "Cok Satanlar" }]} />
      </div>

      {/* Hero Section */}
      <section>
        <div className="bg-primary-50 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: "radial-gradient(#b5d6a3 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          ></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-yellow-100 mb-6">
              <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5L18.2 21 12 16.5 5.8 21l2.4-7.1L2 9.4h7.6z" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 mb-4 tracking-tight">
              EN Cok Satanlar
            </h1>
            <p className="text-lg text-neutral-500 mb-10 max-w-xl mx-auto">
              EN cok satan, EN cok begenilen urunler bir arada
            </p>

            <div className="flex flex-nowrap md:flex-wrap md:justify-center gap-2 overflow-x-auto scrollbar-hide px-2 md:px-0 pb-2 md:pb-0">
              {categoryButtons.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setActiveCat(c.key)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap min-h-[44px] flex items-center ${
                    activeCat === c.key
                      ? "bg-primary-600 text-white"
                      : "bg-neutral-50 text-neutral-500 hover:bg-neutral-100"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TOP 3 Feature Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-start">
            <TopCardSkeleton featured={false} />
            <TopCardSkeleton featured={true} />
            <TopCardSkeleton featured={false} />
          </div>
        ) : top3.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-400">Bu kategoride urun bulunamadi.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-start">
            {top3.map((item, idx) => {
              const config = TOP3_CONFIG[idx];
              const rank = idx + 1;
              const imgUrl = primaryImage(item.product_images);
              const displayPrice = item.discount_price ?? item.price;
              const hasDiscount = item.discount_price != null && item.discount_price < item.price;

              return (
                <Link
                  key={item.id}
                  href={`/product/${item.slug}`}
                  className={`${config.order} group relative rounded-2xl ${config.border} bg-white overflow-hidden hover:-translate-y-1 hover:shadow-align-lg transition-all duration-300`}
                >
                  {config.featured && (
                    <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l2.4 7.4H22l-6.2 4.5L18.2 21 12 16.5 5.8 21l2.4-7.1L2 9.4h7.6z" />
                      </svg>
                      EN Cok Satan
                    </div>
                  )}
                  <div
                    className={`relative ${config.featured ? "h-64 lg:h-72" : "h-56"} ${
                      imgUrl ? "" : `bg-gradient-to-br ${config.gradient}`
                    } flex items-center justify-center`}
                  >
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <svg
                        className={`${config.featured ? "w-16 h-16" : "w-14 h-14"} text-white/60`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                    <div
                      className={`absolute top-3 left-3 ${
                        config.featured ? "w-12 h-12 text-xl" : "w-10 h-10 text-lg"
                      } ${config.badgeBg} text-white font-extrabold rounded-full flex items-center justify-center shadow-lg z-10`}
                    >
                      #{rank}
                    </div>
                    <div className="absolute top-3 right-3 z-10">
                      <FavoriteButton productId={item.id} />
                    </div>
                  </div>
                  <div className={config.featured ? "p-6" : "p-5"}>
                    <div className="flex items-center gap-2 mb-2">
                      {item.category?.name && (
                        <span className="text-xs font-semibold text-primary-700 bg-primary-50 px-2 py-0.5 rounded-full">
                          {item.category.name}
                        </span>
                      )}
                    </div>
                    <h3
                      className={`${config.featured ? "text-xl" : "text-lg"} font-bold text-neutral-900 mb-1 line-clamp-2`}
                    >
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Stars rating={item.rating || 0} />
                      <span className="text-xs text-neutral-400 ml-1">
                        {item.rating || 0} ({item.review_count || 0} degerlendirme)
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary-700 bg-primary-50 px-2 py-0.5 rounded-full">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                        {item.review_count || 0} degerlendirme
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`${config.featured ? "text-2xl" : "text-xl"} font-bold text-primary-600`}>
                          {formatPrice(displayPrice)} TL
                        </span>
                        {hasDiscount && (
                          <span className="text-sm text-neutral-500 line-through">
                            {formatPrice(item.price)} TL
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Remaining Products 4+ */}
      {(loading || rest.length > 0) && (
        <section className="bg-neutral-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <GridCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
                {rest.map((p, i) => {
                  const rank = i + 4;
                  const imgUrl = primaryImage(p.product_images);
                  const gradient = GRADIENTS[i % GRADIENTS.length];
                  const displayPrice = p.discount_price ?? p.price;
                  const hasDiscount = p.discount_price != null && p.discount_price < p.price;

                  return (
                    <Link
                      key={p.id}
                      href={`/product/${p.slug}`}
                      className="group rounded-2xl border border-neutral-100 bg-white overflow-hidden hover:-translate-y-1 hover:shadow-align-lg transition-all duration-300 animate-fade-in"
                      style={{ animationDelay: `${i * 0.06}s` }}
                    >
                      <div
                        className={`relative h-44 ${
                          imgUrl ? "" : `bg-gradient-to-br ${gradient}`
                        } flex items-center justify-center`}
                      >
                        {imgUrl ? (
                          <img
                            src={imgUrl}
                            alt={p.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <svg
                            className="w-12 h-12 text-white/60"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                          >
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                        <div className="absolute top-2.5 left-2.5 w-8 h-8 bg-neutral-800 text-white text-sm font-bold rounded-full flex items-center justify-center z-10">
                          {rank}
                        </div>
                        <div className="absolute top-2.5 right-2.5 z-10">
                          <FavoriteButton productId={p.id} />
                        </div>
                        {hasDiscount && (
                          <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 bg-red-500 text-white text-[10px] font-semibold rounded-lg z-10">
                            %{Math.round(((p.price - p.discount_price!) / p.price) * 100)}
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-neutral-900 text-sm mb-2 line-clamp-2">{p.name}</h3>
                        <div className="flex items-center gap-1 mb-2">
                          <Stars rating={p.rating || 0} />
                          <span className="text-xs text-neutral-400 ml-1">{p.rating || 0}</span>
                          <span className="text-xs text-neutral-300">({p.review_count || 0})</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="text-lg font-bold text-primary-600">
                              {formatPrice(displayPrice)} TL
                            </span>
                            {hasDiscount && (
                              <span className="text-xs text-neutral-500 line-through">
                                {formatPrice(p.price)} TL
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Bu Hafta Yukselenler */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">Bu Hafta EN Cok Yukselenler</h2>
            <p className="text-sm text-neutral-400">Satislari EN hizli artan urunler</p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <TrendingSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {trending.map((p, i) => {
              const imgUrl = primaryImage(p.product_images);
              const gradient = GRADIENTS[(i + 5) % GRADIENTS.length];
              const displayPrice = p.discount_price ?? p.price;

              return (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}`}
                  className="group rounded-2xl border border-neutral-100 bg-white overflow-hidden hover:-translate-y-1 hover:shadow-align-lg transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div
                    className={`relative h-40 ${
                      imgUrl ? "" : `bg-gradient-to-br ${gradient}`
                    } flex items-center justify-center`}
                  >
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <svg
                        className="w-10 h-10 text-white/60"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                    <div className="absolute top-2.5 right-2.5 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-lg flex items-center gap-0.5 z-10">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M7 17l5-5 5 5M7 7l5 5 5-5" />
                      </svg>
                      Yukselen
                    </div>
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <FavoriteButton productId={p.id} />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-neutral-900 text-sm mb-2 line-clamp-2">{p.name}</h3>
                    <div className="flex items-center gap-1.5 mb-3">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <span className="text-xs font-semibold text-green-600">
                        {p.review_count || 0} degerlendirme
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary-600">
                        {formatPrice(displayPrice)} TL
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
