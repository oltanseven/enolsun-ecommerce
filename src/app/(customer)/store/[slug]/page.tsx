"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const primaryImage = (images: any[]) =>
  images?.find((img: any) => img.is_primary)?.url || images?.[0]?.url;

const policies = [
  { title: "İade Politikası", content: "Ürünü teslim aldığınız tarihten itibaren 14 gün içinde iade edebilirsiniz. Ürünün kullanılmamış ve orijinal ambalajında olması gerekmektedir." },
  { title: "Kargo Politikası", content: "200 TL ve üzeri siparişlerde ücretsiz kargo. Standart kargo 3-5 iş günü, hızlı kargo 1-2 iş günü içinde teslim edilir." },
  { title: "Garanti Politikası", content: "Tüm ürünlerimiz 2 yıl garanti kapsamındadır. Üretim hatası durumunda ücretsiz değişim yapılır." },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400" : "text-neutral-200"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

interface Store {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  city: string | null;
  rating: number | null;
  review_count: number | null;
  follower_count: number | null;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  discount_price: number | null;
  rating: number | null;
  review_count: number | null;
  product_images: { url: string; is_primary: boolean }[];
}

export default function StorePage() {
  const params = useParams();
  const slug = params.slug as string;

  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("products");
  const [following, setFollowing] = useState(false);
  const [openPolicy, setOpenPolicy] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      const _sb = createClient();

      const { data: storeData } = await _sb
        .from("stores")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (!storeData) { setLoading(false); return; }
      setStore(storeData);

      const { data: storeProducts } = await _sb
        .from("products")
        .select("id, name, slug, price, discount_price, rating, review_count, product_images(url, is_primary)")
        .eq("store_id", storeData.id)
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      setProducts(storeProducts || []);
      setLoading(false);
    }
    load();
  }, [slug]);

  const tabs = [
    { id: "products", label: "Ürünler" },
    { id: "about", label: "Hakkında" },
    { id: "reviews", label: "Değerlendirmeler" },
    { id: "policies", label: "Politikalar" },
  ];

  if (loading) {
    return (
      <>
        <div className="relative h-48 sm:h-56 bg-gradient-to-br from-primary-200 via-primary-100 to-primary-50 animate-pulse" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-md p-4 sm:p-6 animate-pulse">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-neutral-100" />
              <div className="flex-1 space-y-2">
                <div className="h-6 bg-neutral-100 rounded w-48" />
                <div className="h-4 bg-neutral-100 rounded w-72" />
                <div className="h-4 bg-neutral-100 rounded w-60" />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-neutral-100 bg-white overflow-hidden animate-pulse">
                <div className="h-44 bg-neutral-100" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-neutral-100 rounded w-3/4" />
                  <div className="h-4 bg-neutral-100 rounded w-1/2" />
                  <div className="h-5 bg-neutral-100 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (!store) {
    return (
      <div className="pt-20 pb-20 text-center">
        <p className="text-neutral-500">Mağaza bulunamadı.</p>
      </div>
    );
  }

  const initials = store.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const storeRating = store.rating || 0;
  const reviewCount = store.review_count || 0;
  const followerCount = store.follower_count || 0;
  const formatFollowers = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);

  return (
    <>
      {/* Store Banner */}
      <div className="relative h-48 sm:h-56 bg-gradient-to-br from-primary-200 via-primary-100 to-primary-50 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1200 240" fill="none">
          <circle cx="150" cy="80" r="120" fill="#4f7a3a" />
          <circle cx="1050" cy="160" r="90" fill="#4f7a3a" />
          <circle cx="600" cy="20" r="60" fill="#6ba54e" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent"></div>
      </div>

      {/* Store Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-md p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-align-md flex-shrink-0 overflow-hidden">
              {store.logo_url ? (
                <img src={store.logo_url} alt={store.name} className="w-full h-full object-cover" />
              ) : (
                initials
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 truncate">{store.name}</h1>
                <svg className="w-5 h-5 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <p className="text-sm text-neutral-400 mb-3">{store.description || `EN güvenilir satıcı`}</p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs sm:text-sm text-neutral-500">
                <div className="flex items-center gap-1">
                  <Stars rating={storeRating} />
                  <span className="font-medium text-neutral-700 ml-1">{storeRating.toFixed(1)}</span>
                  <span>({reviewCount.toLocaleString("tr-TR")})</span>
                </div>
                <span>{products.length} ürün</span>
                <span>{formatFollowers(followerCount)} takipçi</span>
                {store.city && <span className="text-primary-600 font-medium">{store.city}</span>}
              </div>
            </div>
            <div className="flex gap-2 sm:flex-shrink-0 w-full sm:w-auto">
              <button onClick={() => setFollowing(!following)} className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors min-h-[44px] ${following ? "bg-neutral-100 text-neutral-600 hover:bg-neutral-200" : "bg-primary-600 text-white hover:bg-primary-700"}`}>
                {following ? "Takip Ediliyor" : "Takip Et"}
              </button>
              <button className="px-3 py-2.5 rounded-xl border border-neutral-200 text-neutral-500 hover:bg-neutral-50 transition-colors min-h-[44px]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="border-b border-neutral-100">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`relative px-4 sm:px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id ? "text-primary-600 font-semibold" : "text-neutral-400 hover:text-neutral-600"}`}>
                {tab.label}
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-t"></div>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "products" && (
          <>
          <div className="mb-4"><p className="text-sm text-neutral-500">EN çok satan ürünler bu mağazada</p></div>
          {products.length === 0 ? (
            <p className="text-sm text-neutral-400 text-center py-12">Bu mağazada henüz ürün bulunmuyor.</p>
          ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {products.map((p) => {
              const img = primaryImage(p.product_images || []);
              const displayPrice = p.discount_price || p.price;
              const pRating = p.rating || 0;
              return (
              <Link key={p.id} href={`/product/${p.slug}`} className="rounded-2xl border border-neutral-100 bg-white overflow-hidden hover:-translate-y-1 hover:shadow-align-lg transition-all duration-200 block">
                <div className="relative h-44 bg-gradient-to-br from-primary-50 via-primary-100 to-primary-50 flex items-center justify-center">
                  {img ? (
                    <img src={img} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-12 h-12 text-primary-200" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="12" cy="12" r="3" /></svg>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-neutral-900 text-sm mb-2 line-clamp-1">{p.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Stars rating={pRating} />
                    <span className="text-xs text-neutral-400 ml-1">{pRating.toFixed(1)} ({p.review_count || 0})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary-600">&#8378;{displayPrice.toLocaleString("tr-TR")}</span>
                      {p.discount_price && p.discount_price < p.price && (
                        <span className="text-sm text-neutral-300 line-through">&#8378;{p.price.toLocaleString("tr-TR")}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
              );
            })}
          </div>
          )}
          </>
        )}

        {activeTab === "about" && (
          <div className="max-w-2xl">
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-6">
              <h2 className="text-lg font-bold text-neutral-900 mb-4">Mağaza Hakkında</h2>
              <p className="text-sm text-neutral-500 leading-relaxed mb-6">{store.description || "Bu mağaza hakkında henüz detaylı bilgi eklenmemiştir."}</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-primary-25 rounded-xl">
                  <p className="text-2xl font-bold text-primary-600">{products.length}</p>
                  <p className="text-xs text-neutral-500">Ürün</p>
                </div>
                <div className="text-center p-4 bg-primary-25 rounded-xl">
                  <p className="text-2xl font-bold text-primary-600">{formatFollowers(followerCount)}</p>
                  <p className="text-xs text-neutral-500">Takipçi</p>
                </div>
                <div className="text-center p-4 bg-primary-25 rounded-xl">
                  <p className="text-2xl font-bold text-primary-600">{storeRating.toFixed(1)}</p>
                  <p className="text-xs text-neutral-500">Puan</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="max-w-2xl space-y-4">
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex gap-1">
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-neutral-900 mr-2">{storeRating.toFixed(1)}</span>
                    <Stars rating={storeRating} />
                  </div>
                </div>
                <span className="text-sm text-neutral-400">{reviewCount.toLocaleString("tr-TR")} değerlendirme</span>
              </div>
              <div className="space-y-2">
                {[
                  { star: 5, pct: 72 },
                  { star: 4, pct: 18 },
                  { star: 3, pct: 6 },
                  { star: 2, pct: 3 },
                  { star: 1, pct: 1 },
                ].map((row) => (
                  <div key={row.star} className="flex items-center gap-2 text-sm">
                    <span className="w-3 text-neutral-500">{row.star}</span>
                    <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400 rounded-full transition-all duration-600" style={{ width: `${row.pct}%` }}></div>
                    </div>
                    <span className="w-8 text-right text-neutral-400 text-xs">%{row.pct}</span>
                  </div>
                ))}
              </div>
            </div>
            {[
              { name: "Ayşe K.", rating: 5, date: "2 gün önce", text: "Harika kalitede ürünler, çok memnun kaldım. Paketleme de çok özenli." },
              { name: "Mehmet D.", rating: 4, date: "1 hafta önce", text: "Ürün görseldeki gibi, güzel tasarım. Kargo biraz geç geldi ama genel olarak memnunum." },
            ].map((r, i) => (
              <div key={i} className="bg-white rounded-2xl border border-neutral-100 shadow-align-xs p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-sm font-semibold text-primary-700">{r.name[0]}</div>
                    <span className="text-sm font-medium text-neutral-800">{r.name}</span>
                  </div>
                  <span className="text-xs text-neutral-400">{r.date}</span>
                </div>
                <Stars rating={r.rating} />
                <p className="text-sm text-neutral-500 mt-2">{r.text}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "policies" && (
          <div className="max-w-2xl space-y-3">
            {policies.map((p, i) => (
              <div key={i} className="bg-white rounded-2xl border border-neutral-100 shadow-align-xs overflow-hidden">
                <button onClick={() => setOpenPolicy(openPolicy === i ? null : i)} className="w-full flex items-center justify-between p-4 sm:p-5 text-left min-h-[48px]">
                  <span className="text-sm font-semibold text-neutral-800">{p.title}</span>
                  <svg className={`w-5 h-5 text-neutral-400 flex-shrink-0 transition-transform duration-300 ${openPolicy === i ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openPolicy === i ? "max-h-72 pb-4 px-4 sm:px-5" : "max-h-0"}`}>
                  <p className="text-sm text-neutral-500 leading-relaxed">{p.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
