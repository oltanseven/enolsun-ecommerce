"use client";

import { useState, useRef } from "react";
import { showToast } from "@/components/ui/Toast";
import Breadcrumb from "@/components/ui/Breadcrumb";

const posts = [
  {
    id: "surdurulebilir-alisveris",
    title: "Sürdürülebilir Alışverişin 5 Altın Kuralı",
    excerpt:
      "Çevre dostu alışveriş alışkanlıkları edinmek için bilmeniz gereken EN önemli 5 kural. Küçük adımlarla büyük değişimler yaratın.",
    date: "20 Mart 2026",
    category: "Sürdürülebilirlik",
    readTime: "5 dk okuma",
    gradient: "from-emerald-100 to-teal-100",
  },
  {
    id: "bambu-urunleri",
    title: "Bambu Ürünlerinin EN Önemli Faydaları",
    excerpt:
      "Bambu, EN hızlı büyüyen bitki olarak sürdürülebilirlikte EN önde gelen malzemelerden. Neden bambu seçmelisiniz?",
    date: "15 Mart 2026",
    category: "Doğal Malzemeler",
    readTime: "4 dk okuma",
    gradient: "from-lime-100 to-green-100",
  },
  {
    id: "dogal-ev-donusumu",
    title: "Evinizi Doğal Ürünlerle Dönüştürmenin EN Kolay Yolları",
    excerpt:
      "Yaşam alanınızı EN doğal hâliyle dönüştürmenin yolları. Doğal dekorasyon ve çevre dostu ev ürünleri rehberi.",
    date: "10 Mart 2026",
    category: "Ev & Yaşam",
    readTime: "6 dk okuma",
    gradient: "from-amber-100 to-yellow-100",
  },
  {
    id: "organik-cilt-bakim",
    title: "Organik Cilt Bakımına EN İyi Başlangıç Rehberi",
    excerpt:
      "Cildiniz için EN doğal bakım rutinini oluşturun. Kimyasal içermeyen ürünlerle EN saf güzellik.",
    date: "5 Mart 2026",
    category: "Doğal Bakım",
    readTime: "7 dk okuma",
    gradient: "from-rose-100 to-pink-100",
  },
  {
    id: "sifir-atik-mutfak",
    title: "Sıfır Atık Mutfak: Adım Adım Rehber",
    excerpt:
      "Mutfağınızda atığı EN aza indirmenin pratik yolları. Beeswax wrap, cam kavanoz ve daha fazlası.",
    date: "28 Şubat 2026",
    category: "Sıfır Atık",
    readTime: "5 dk okuma",
    gradient: "from-sky-100 to-blue-100",
  },
  {
    id: "eko-giyim-trendleri",
    title: "2026\u2019nın EN Trend Eko-Giyim Parçaları",
    excerpt:
      "Bu sezonun EN popüler sürdürülebilir moda trendleri. Organik pamuk, geri dönüştürülmüş kumaş ve daha fazlası.",
    date: "20 Şubat 2026",
    category: "Moda",
    readTime: "4 dk okuma",
    gradient: "from-violet-100 to-purple-100",
  },
];

const popularPosts = [
  "Sürdürülebilir Alışverişin 5 Altın Kuralı",
  "Bambu Ürünlerinin EN Önemli Faydaları",
  "Organik Cilt Bakımına EN İyi Başlangıç Rehberi",
];

const categories = [
  "Sürdürülebilirlik",
  "Doğal Malzemeler",
  "Ev & Yaşam",
  "Doğal Bakım",
  "Sıfır Atık",
  "Moda",
];

export default function BlogContent() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const postRefs = useRef<Record<string, HTMLElement | null>>({});

  const filteredPosts = selectedCategory
    ? posts.filter((p) => p.category === selectedCategory)
    : posts;

  function handleCategoryClick(cat: string) {
    setSelectedCategory((prev) => (prev === cat ? null : cat));
  }

  function handlePopularPostClick(title: string) {
    // Reset category filter so the post is visible
    setSelectedCategory(null);
    // Small timeout to allow re-render after filter reset
    setTimeout(() => {
      const post = posts.find((p) => p.title === title);
      if (post && postRefs.current[post.id]) {
        postRefs.current[post.id]?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 50);
  }

  function handleNewsletterSubmit() {
    if (!newsletterEmail.trim() || !newsletterEmail.includes("@")) {
      showToast("Lütfen geçerli bir e-posta adresi girin.", "error");
      return;
    }
    showToast("Bültenimize başarıyla abone oldunuz!", "success");
    setNewsletterEmail("");
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <Breadcrumb items={[{ label: "Blog" }]} />
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 via-primary-25 to-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
            EN Güncel İçerikler
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4">
            enolsun <span className="text-primary-500">Blog</span>
          </h1>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            Sürdürülebilir yaşam, doğal ürünler ve çevre dostu alışveriş hakkında EN faydalı içerikler.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Posts Grid */}
            <div className="lg:col-span-2">
              {/* Active filter indicator */}
              {selectedCategory && (
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-sm text-neutral-500">Filtre:</span>
                  <span className="px-2.5 py-0.5 bg-primary-50 text-primary-600 text-xs font-medium rounded-full">
                    {selectedCategory}
                  </span>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors"
                  >
                    Temizle
                  </button>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <article
                    key={post.title}
                    ref={(el) => { postRefs.current[post.id] = el; }}
                    className="bg-white border border-neutral-100 rounded-2xl overflow-hidden hover:shadow-align-md transition-shadow"
                  >
                    <div className={`h-40 bg-gradient-to-br ${post.gradient} flex items-center justify-center`}>
                      <svg className="w-12 h-12 text-neutral-400/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                      </svg>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <button
                          onClick={() => handleCategoryClick(post.category)}
                          className="px-2.5 py-0.5 bg-primary-50 text-primary-600 text-xs font-medium rounded-full hover:bg-primary-100 transition-colors"
                        >
                          {post.category}
                        </button>
                        <span className="text-neutral-300 text-xs">{post.readTime}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-neutral-800 mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className={`text-neutral-500 text-sm leading-relaxed mb-3 ${expandedPost === post.id ? "" : "line-clamp-3"}`}>
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400 text-xs">{post.date}</span>
                        <button
                          onClick={() => setExpandedPost((prev) => (prev === post.id ? null : post.id))}
                          className="text-primary-500 text-sm font-medium hover:text-primary-600 transition-colors"
                        >
                          {expandedPost === post.id ? "Kapat" : "Devamını Oku"} &rarr;
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <p className="text-center text-neutral-400 text-sm py-12">
                  Bu kategoride henüz yazı bulunmuyor.
                </p>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Popular Posts */}
              <div className="bg-neutral-25 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-neutral-800 mb-4">Popüler Yazılar</h3>
                <ul className="space-y-3">
                  {popularPosts.map((title, i) => (
                    <li key={title} className="flex gap-3 items-start">
                      <span className="flex-shrink-0 w-7 h-7 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      <button
                        onClick={() => handlePopularPostClick(title)}
                        className="text-neutral-600 text-sm leading-snug hover:text-primary-500 cursor-pointer transition-colors text-left"
                      >
                        {title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Categories */}
              <div className="bg-neutral-25 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-neutral-800 mb-4">Kategoriler</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryClick(cat)}
                      className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                        selectedCategory === cat
                          ? "bg-primary-500 text-white border border-primary-500"
                          : "bg-white border border-neutral-100 text-neutral-600 hover:border-primary-300 hover:text-primary-600"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Bültenimize Katılın</h3>
                <p className="text-primary-100 text-sm mb-4">
                  EN yeni içerikleri ve EN özel fırsat bildirimlerini kaçırmayın.
                </p>
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="E-posta adresiniz"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleNewsletterSubmit(); }}
                    className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 text-sm focus:outline-none focus:border-white/40"
                  />
                  <button
                    onClick={handleNewsletterSubmit}
                    className="w-full px-4 py-2.5 bg-white text-primary-600 font-medium rounded-xl text-sm hover:bg-primary-25 transition-colors"
                  >
                    Abone Ol
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
