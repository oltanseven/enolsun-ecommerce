import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - enolsun.com | Surdurulebilir Yasam Rehberi",
  description:
    "enolsun.com blog: Surdurulebilir yasam, dogal urunler ve cevre dostu alisveris ipuclari.",
  keywords: "enolsun blog, surdurulebilir yasam, dogal urunler, cevre dostu",
  openGraph: {
    title: "Blog - enolsun.com",
    description: "Surdurulebilir yasam rehberiniz. En guncel icerikler.",
    type: "website",
  },
};

const posts = [
  {
    title: "Surdurulebilir Alisversin 5 Altin Kurali",
    excerpt:
      "Cevre dostu alisveris aliskanliklari edinmek icin bilmeniz gereken en onemli 5 kural. Kucuk adimlarla buyuk degisimler yaratin.",
    date: "20 Mart 2026",
    category: "Surdurulebilirlik",
    readTime: "5 dk",
    gradient: "from-emerald-100 to-teal-100",
  },
  {
    title: "Bambu Urunlerinin Faydalari",
    excerpt:
      "Bambu, en hizli buyuyen bitki olarak surdurulebilirlikte en onde gelen malzemelerden. Neden bambu secmelisiniz?",
    date: "15 Mart 2026",
    category: "Dogal Malzemeler",
    readTime: "4 dk",
    gradient: "from-lime-100 to-green-100",
  },
  {
    title: "Evinizi Dogal Urunlerle Donusturun",
    excerpt:
      "Yasam alaninizi en dogal haliyle donusturmenin yollari. Dogal dekorasyon ve cevre dostu ev urunleri rehberi.",
    date: "10 Mart 2026",
    category: "Ev & Yasam",
    readTime: "6 dk",
    gradient: "from-amber-100 to-yellow-100",
  },
  {
    title: "Organik Cilt Bakimina Baslangic Rehberi",
    excerpt:
      "Cildiniz icin en dogal bakim rutinini olusturun. Kimyasal icermeyen urunlerle en saf guzellik.",
    date: "5 Mart 2026",
    category: "Dogal Bakim",
    readTime: "7 dk",
    gradient: "from-rose-100 to-pink-100",
  },
  {
    title: "Sifir Atik Mutfak: Adim Adim Rehber",
    excerpt:
      "Mutfaginizda atigi en aza indirmenin pratik yollari. Beeswax wrap, cam kavanoz ve daha fazlasi.",
    date: "28 Subat 2026",
    category: "Sifir Atik",
    readTime: "5 dk",
    gradient: "from-sky-100 to-blue-100",
  },
  {
    title: "2026'nin En Trend Eko-Giyim Parcalari",
    excerpt:
      "Bu sezonun en populer surdurulebilir moda trendleri. Organik pamuk, geri donusturulmus kumas ve daha fazlasi.",
    date: "20 Subat 2026",
    category: "Moda",
    readTime: "4 dk",
    gradient: "from-violet-100 to-purple-100",
  },
];

const popularPosts = [
  "Surdurulebilir Alisversin 5 Altin Kurali",
  "Bambu Urunlerinin Faydalari",
  "Organik Cilt Bakimina Baslangic Rehberi",
];

const categories = [
  "Surdurulebilirlik",
  "Dogal Malzemeler",
  "Ev & Yasam",
  "Dogal Bakim",
  "Sifir Atik",
  "Moda",
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 via-primary-25 to-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
            En Guncel Icerikler
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4">
            enolsun <span className="text-primary-500">Blog</span>
          </h1>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            Surdurulebilir yasam, dogal urunler ve cevre dostu alisveris hakkinda en faydali icerikler.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Posts Grid */}
            <div className="lg:col-span-2">
              <div className="grid sm:grid-cols-2 gap-6">
                {posts.map((post) => (
                  <article
                    key={post.title}
                    className="bg-white border border-neutral-100 rounded-2xl overflow-hidden hover:shadow-align-md transition-shadow"
                  >
                    <div className={`h-40 bg-gradient-to-br ${post.gradient} flex items-center justify-center`}>
                      <svg className="w-12 h-12 text-neutral-400/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                      </svg>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2.5 py-0.5 bg-primary-50 text-primary-600 text-xs font-medium rounded-full">
                          {post.category}
                        </span>
                        <span className="text-neutral-300 text-xs">{post.readTime}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-neutral-800 mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-neutral-500 text-sm leading-relaxed line-clamp-3 mb-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400 text-xs">{post.date}</span>
                        <span className="text-primary-500 text-sm font-medium hover:text-primary-600 cursor-pointer">
                          Devamini Oku &rarr;
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Popular Posts */}
              <div className="bg-neutral-25 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-neutral-800 mb-4">Populer Yazilar</h3>
                <ul className="space-y-3">
                  {popularPosts.map((title, i) => (
                    <li key={title} className="flex gap-3 items-start">
                      <span className="flex-shrink-0 w-7 h-7 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      <span className="text-neutral-600 text-sm leading-snug hover:text-primary-500 cursor-pointer transition-colors">
                        {title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Categories */}
              <div className="bg-neutral-25 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-neutral-800 mb-4">Kategoriler</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <span
                      key={cat}
                      className="px-3 py-1.5 bg-white border border-neutral-100 text-neutral-600 text-sm rounded-full hover:border-primary-300 hover:text-primary-600 cursor-pointer transition-colors"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Bultenimize Katilin</h3>
                <p className="text-primary-100 text-sm mb-4">
                  En yeni icerikleri ve firsat bildirimlerini kacirmayin.
                </p>
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="E-posta adresiniz"
                    className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 text-sm focus:outline-none focus:border-white/40"
                    readOnly
                  />
                  <button className="w-full px-4 py-2.5 bg-white text-primary-600 font-medium rounded-xl text-sm hover:bg-primary-25 transition-colors">
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
