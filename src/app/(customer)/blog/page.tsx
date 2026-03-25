import type { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Blog | enolsun.com — EN Güncel İçerikler",
  description:
    "enolsun.com blog: Sürdürülebilir yaşam, doğal ürünler ve çevre dostu alışveriş hakkında EN faydalı içerikler.",
  keywords: "enolsun blog, sürdürülebilir yaşam, doğal ürünler, çevre dostu, yeşil yaşam rehberi",
  openGraph: {
    title: "Blog | enolsun.com — EN Güncel İçerikler",
    description: "Sürdürülebilir yaşam rehberiniz. EN güncel ve EN faydalı içerikler.",
    type: "website",
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
