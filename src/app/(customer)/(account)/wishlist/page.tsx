"use client";

import { useState } from "react";
import Link from "next/link";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { showToast } from "@/components/ui/Toast";

const primaryImage = (images: any[]) =>
  images?.find((img: any) => img.is_primary)?.url || images?.[0]?.url;

export default function WishlistPage() {
  const { items, loading, toggleWishlist, count } = useWishlist();
  const { addToCart } = useCart();
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [addingToCartId, setAddingToCartId] = useState<string | null>(null);

  const handleRemove = async (productId: string) => {
    setRemovingId(productId);
    const result = await toggleWishlist(productId);
    if (result?.error) {
      showToast(result.error, "error");
    } else {
      showToast("Favorilerden kaldırıldı", "info");
    }
    setRemovingId(null);
  };

  const handleAddToCart = async (productId: string) => {
    setAddingToCartId(productId);
    const result = await addToCart(productId);
    if (result?.error) {
      showToast(result.error, "error");
    } else {
      showToast("Sepete eklendi", "success");
    }
    setAddingToCartId(null);
  };

  return (
    <>
      <title>Favorilerim | enolsun.com</title>
      <meta
        name="description"
        content="enolsun.com favori ürünleriniz. EN sevdiğiniz ürünleri burada toplayın, EN iyi fiyatları kaçırmayın."
      />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">
            Favorilerim
          </h1>
          <span className="text-sm text-neutral-400">{count} ürün</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-neutral-100 bg-white overflow-hidden"
              >
                <div className="h-44 bg-neutral-100 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-neutral-100 rounded animate-pulse w-3/4" />
                  <div className="h-3 bg-neutral-100 rounded animate-pulse w-1/4" />
                  <div className="flex items-center justify-between">
                    <div className="h-5 bg-neutral-100 rounded animate-pulse w-1/3" />
                    <div className="h-8 bg-neutral-100 rounded-xl animate-pulse w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary-50 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-primary-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              Favori listeniz boş
            </h2>
            <p className="text-sm text-neutral-400 mb-6">
              EN sevdiğin ürünleri burada topla!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              Ürünlere Göz At
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {items.map((item) => {
              const product = item.product;
              const imageUrl = primaryImage(product.product_images);
              const displayPrice = product.discount_price || product.price;

              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-neutral-100 bg-white overflow-hidden hover:-translate-y-1 hover:shadow-align-lg transition-all duration-200"
                >
                  <div className="relative h-44 bg-neutral-50 flex items-center justify-center">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg
                        className="w-12 h-12 text-neutral-300"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                    <button
                      onClick={() => handleRemove(item.product_id)}
                      disabled={removingId === item.product_id}
                      className="absolute top-2.5 right-2.5 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors shadow-sm disabled:opacity-50"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                      </svg>
                    </button>
                    {product.discount_price && (
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-red-500 text-white text-xs font-semibold rounded-lg">
                        %
                        {Math.round(
                          ((product.price - product.discount_price) /
                            product.price) *
                            100
                        )}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="font-semibold text-neutral-900 text-sm mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-1 mb-3">
                      <svg
                        className="w-3.5 h-3.5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs text-neutral-400">
                        {product.rating?.toFixed(1) || "0.0"}
                      </span>
                      {product.review_count > 0 && (
                        <span className="text-xs text-neutral-300">
                          ({product.review_count})
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-primary-600">
                          {displayPrice.toLocaleString("tr-TR")} TL
                        </span>
                        {product.discount_price && (
                          <span className="text-xs text-neutral-400 line-through">
                            {product.price.toLocaleString("tr-TR")} TL
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleAddToCart(item.product_id)}
                        disabled={addingToCartId === item.product_id}
                        className="px-4 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
                      >
                        {addingToCartId === item.product_id
                          ? "Ekleniyor..."
                          : "Sepete Ekle"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
