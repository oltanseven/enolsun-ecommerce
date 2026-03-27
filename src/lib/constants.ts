export const SITE_NAME = 'enolsun.com'
export const SITE_DESCRIPTION = 'Doğanın İlhamıyla Tasarlanan Yaşam'
export const SITE_URL = 'https://enolsun.com'

export const NAV_ITEMS = [
  { label: 'Ana Sayfa', href: '/', hasMegaMenu: false },
  { label: 'Ürünler', href: '/products', hasMegaMenu: true },
  { label: 'Fırsatlar', href: '/flash-sales', hasMegaMenu: false },
  { label: 'Çok Satanlar', href: '/bestsellers', hasMegaMenu: false },
  { label: 'İletişim', href: '/contact', hasMegaMenu: false },
] as const

export const MEGA_MENU_CATEGORIES = [
  {
    label: 'Ev & Yaşam',
    href: '/products?cat=ev-yasam',
    icon: 'home' as const,
    subcategories: [
      { group: 'Dekorasyon', items: ['Saksılar', 'Tablolar', 'Mumlar', 'Vazolar'] },
      { group: 'Tekstil', items: ['Yastıklar', 'Battaniyeler', 'Perdeler'] },
      { group: 'Organizer', items: ['Raf Sistemleri', 'Sepetler', 'Kutular'] },
    ],
  },
  {
    label: 'Doğal Bakım',
    href: '/products?cat=dogal-bakim',
    icon: 'sparkles' as const,
    subcategories: [
      { group: 'Cilt Bakımı', items: ['Nemlendirici', 'Serum', 'Tonik'] },
      { group: 'Saç Bakımı', items: ['Şampuan', 'Saç Maskesi', 'Saç Yağı'] },
      { group: 'Vücut', items: ['Duş Jeli', 'Vücut Losyonu', 'Sabun'] },
    ],
  },
  {
    label: 'Eko Giyim',
    href: '/products?cat=eko-giyim',
    icon: 'fire' as const,
    subcategories: [
      { group: 'Kadın', items: ['Tişörtler', 'Elbiseler', 'Etekler'] },
      { group: 'Erkek', items: ['Tişörtler', 'Gömlek', 'Pantolon'] },
      { group: 'Aksesuar', items: ['Şapka', 'Çanta', 'Atkı'] },
    ],
  },
  {
    label: 'Aydınlatma',
    href: '/products?cat=aydinlatma',
    icon: 'lightbulb' as const,
    subcategories: [
      { group: 'Masa Lambaları', items: ['Gece Lambası', 'Çalışma Lambası'] },
      { group: 'Tavan & Duvar', items: ['Sarkıt', 'Aplik'] },
      { group: 'Dekoratif', items: ['LED Şeritler', 'Işık Zincirleri'] },
    ],
  },
  {
    label: 'Mutfak',
    href: '/products?cat=mutfak',
    icon: 'cube' as const,
    subcategories: [
      { group: 'Pişirme', items: ['Tencere Seti', 'Tava'] },
      { group: 'Sunum', items: ['Tabak Seti', 'Bardaklar'] },
      { group: 'Saklama', items: ['Kavanozlar', 'Beeswax Wrap'] },
    ],
  },
  {
    label: 'Outdoor',
    href: '/products?cat=outdoor',
    icon: 'globe' as const,
    subcategories: [
      { group: 'Kamp', items: ['Çadır', 'Uyku Tulumu'] },
      { group: 'Bahçe', items: ['Bahçe Mobilyası', 'Bahçe Aleti'] },
      { group: 'Spor', items: ['Yoga Matı', 'Matara'] },
    ],
  },
  {
    label: 'Teknoloji',
    href: '/products?cat=teknoloji',
    icon: 'device' as const,
    subcategories: [
      { group: 'Eko-Teknoloji', items: ['Solar Şarj', 'Enerji Tasarrufu'] },
      { group: 'Akıllı Ev', items: ['Akıllı Priz', 'Sensör'] },
      { group: 'Aksesuar', items: ['Kablo Düzenleyici', 'Stand'] },
    ],
  },
  {
    label: 'Aksesuar',
    href: '/products?cat=aksesuar',
    icon: 'tag' as const,
    subcategories: [
      { group: 'Takı', items: ['Kolye', 'Bileklik'] },
      { group: 'Çanta', items: ['Sırt Çantası', 'El Çantası'] },
      { group: 'Diğer', items: ['Güneş Gözlüğü', 'Saat'] },
    ],
  },
]

export const CATEGORIES = [
  { name: 'Ev & Yaşam', slug: 'ev-yasam', icon: 'home', count: 324 },
  { name: 'Doğal Bakım', slug: 'dogal-bakim', icon: 'sparkles', count: 186 },
  { name: 'Eko Giyim', slug: 'eko-giyim', icon: 'shirt', count: 412 },
  { name: 'Aydınlatma', slug: 'aydinlatma', icon: 'lightbulb', count: 98 },
  { name: 'Mutfak', slug: 'mutfak', icon: 'utensils', count: 267 },
  { name: 'Outdoor', slug: 'outdoor', icon: 'globe', count: 153 },
  { name: 'Teknoloji', slug: 'teknoloji', icon: 'cpu', count: 89 },
  { name: 'Aksesuar', slug: 'aksesuar', icon: 'gem', count: 201 },
]

export const SELLER_NAV_ITEMS = [
  {
    section: 'main',
    items: [
      { label: 'Genel Bakış', href: '/seller-dashboard', icon: 'dashboard' },
      { label: 'Siparişler', href: '/seller-orders', icon: 'clipboard' },
      { label: 'Ürünlerim', href: '/seller-products', icon: 'box' },
      { label: 'Mesajlar', href: '/seller-messages', icon: 'chat', badge: 3 },
      { label: 'Finans', href: '/seller-finance', icon: 'dollar' },
      { label: 'Mağaza Ayarları', href: '/seller-settings', icon: 'settings' },
      { label: 'İstatistikler', href: '/seller-stats', icon: 'chart' },
    ],
  },
  {
    section: 'secondary',
    items: [
      { label: 'Yardım Merkezi', href: '#', icon: 'help' },
      { label: 'Mağazayı Görüntüle', href: '/store/yesil-yaprak-atolye', icon: 'external', external: true },
      { label: 'Çıkış Yap', href: '/seller-login', icon: 'logout', danger: true },
    ],
  },
] as const

export const FOOTER_LINKS = {
  quickLinks: [
    { label: 'Hakkımızda', href: '/about' },
    { label: 'Kariyer', href: '/careers' },
    { label: 'Blog', href: '/blog' },
    { label: 'Sürdürülebilirlik', href: '/sustainability' },
    { label: 'Satıcı Girişi', href: '/seller-login' },
    { label: 'Satıcı Ol', href: '/seller-register' },
  ],
  support: [
    { label: 'Sıkça Sorulan Sorular', href: '/faq' },
    { label: 'Kargo Bilgileri', href: '/shipping-info' },
    { label: 'İade & Değişim', href: '/returns' },
    { label: 'İletişim', href: '/contact' },
  ],
  contact: {
    email: 'info@enolsun.com',
    phone: '+90 (212) 555 0123',
    address: 'İstanbul, Türkiye',
  },
  policies: [
    { label: 'Gizlilik Politikası', href: '/privacy' },
    { label: 'Kullanım Koşulları', href: '/terms' },
    { label: 'Çerez Politikası', href: '/cookies' },
  ],
} as const

export const SLOGANS = [
  'En hızlı büyüyen pazar yeri',
  'En kolay satış platformu',
  'En düşük komisyon oranları',
  'En güvenilir e-ticaret altyapısı',
  'Satışta en olsun, enolsun!',
]
