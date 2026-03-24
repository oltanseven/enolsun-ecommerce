export const SITE_NAME = 'enolsun.com'
export const SITE_DESCRIPTION = 'Doganin Ilhamiyla Tasarlanan Yasam'
export const SITE_URL = 'https://enolsun-ecommerce.vercel.app'

// Navigation items for customer-facing pages
export const NAV_ITEMS = [
  { label: 'Ana Sayfa', href: '/', hasMegaMenu: false },
  { label: 'Urunler', href: '/urunler', hasMegaMenu: true },
  { label: 'Firsatlar', href: '/firsatlar', hasMegaMenu: false },
  { label: 'Cok Satanlar', href: '/cok-satanlar', hasMegaMenu: false },
  { label: 'Iletisim', href: '/iletisim', hasMegaMenu: false },
] as const

// Mega menu categories with subcategories
export const MEGA_MENU_CATEGORIES = [
  {
    label: 'Ev & Yasam',
    href: '/urunler?cat=ev-yasam',
    icon: 'home' as const,
    subcategories: [
      { group: 'Dekorasyon', items: ['Saksilar', 'Tablolar', 'Mumlar', 'Vazolar'] },
      { group: 'Tekstil', items: ['Yastiklar', 'Battaniyeler', 'Perdeler'] },
      { group: 'Organizer', items: ['Raf Sistemleri', 'Sepetler', 'Kutular'] },
    ],
  },
  {
    label: 'Dogal Bakim',
    href: '/urunler?cat=dogal-bakim',
    icon: 'sparkles' as const,
    subcategories: [
      { group: 'Cilt Bakimi', items: ['Nemlendirici', 'Serum', 'Tonik'] },
      { group: 'Sac Bakimi', items: ['Sampuan', 'Sac Maskesi', 'Sac Yagi'] },
      { group: 'Vucut', items: ['Dus Jeli', 'Vucut Losyonu', 'Sabun'] },
    ],
  },
  {
    label: 'Eko Giyim',
    href: '/urunler?cat=eko-giyim',
    icon: 'fire' as const,
    subcategories: [
      { group: 'Kadin', items: ['Tisortler', 'Elbiseler', 'Etekler'] },
      { group: 'Erkek', items: ['Tisortler', 'Gomlek', 'Pantolon'] },
      { group: 'Aksesuar', items: ['Sapka', 'Canta', 'Atki'] },
    ],
  },
  {
    label: 'Aydinlatma',
    href: '/urunler?cat=aydinlatma',
    icon: 'lightbulb' as const,
    subcategories: [
      { group: 'Masa Lambalari', items: ['Gece Lambasi', 'Calisma Lambasi'] },
      { group: 'Tavan & Duvar', items: ['Sarkit', 'Aplik'] },
      { group: 'Dekoratif', items: ['LED Seritler', 'Isik Zincirleri'] },
    ],
  },
  {
    label: 'Mutfak',
    href: '/urunler?cat=mutfak',
    icon: 'cube' as const,
    subcategories: [
      { group: 'Pisirme', items: ['Tencere Seti', 'Tava'] },
      { group: 'Sunum', items: ['Tabak Seti', 'Bardaklar'] },
      { group: 'Saklama', items: ['Kavanozlar', 'Beeswax Wrap'] },
    ],
  },
  {
    label: 'Outdoor',
    href: '/urunler?cat=outdoor',
    icon: 'globe' as const,
    subcategories: [
      { group: 'Kamp', items: ['Cadir', 'Uyku Tulumu'] },
      { group: 'Bahce', items: ['Bahce Mobilyasi', 'Bahce Aleti'] },
      { group: 'Spor', items: ['Yoga Mati', 'Matara'] },
    ],
  },
  {
    label: 'Teknoloji',
    href: '/urunler?cat=teknoloji',
    icon: 'device' as const,
    subcategories: [
      { group: 'Eko-Teknoloji', items: ['Solar Sarj', 'Enerji Tasarrufu'] },
      { group: 'Akilli Ev', items: ['Akilli Priz', 'Sensor'] },
      { group: 'Aksesuar', items: ['Kablo Duzenleyici', 'Stand'] },
    ],
  },
  {
    label: 'Aksesuar',
    href: '/urunler?cat=aksesuar',
    icon: 'tag' as const,
    subcategories: [
      { group: 'Taki', items: ['Kolye', 'Bileklik'] },
      { group: 'Canta', items: ['Sirt Cantasi', 'El Cantasi'] },
      { group: 'Diger', items: ['Gunes Gozlugu', 'Saat'] },
    ],
  },
]

// Categories (simple list for product pages)
export const CATEGORIES = [
  { name: 'Ev & Yasam', slug: 'ev-yasam', icon: 'home', count: 324 },
  { name: 'Dogal Bakim', slug: 'dogal-bakim', icon: 'sparkles', count: 186 },
  { name: 'Eko Giyim', slug: 'eko-giyim', icon: 'shirt', count: 412 },
  { name: 'Aydinlatma', slug: 'aydinlatma', icon: 'lightbulb', count: 98 },
  { name: 'Mutfak', slug: 'mutfak', icon: 'utensils', count: 267 },
  { name: 'Outdoor', slug: 'outdoor', icon: 'globe', count: 153 },
  { name: 'Teknoloji', slug: 'teknoloji', icon: 'cpu', count: 89 },
  { name: 'Aksesuar', slug: 'aksesuar', icon: 'gem', count: 201 },
]

// Seller panel sidebar navigation items (grouped with sections)
export const SELLER_NAV_ITEMS = [
  {
    section: 'main',
    items: [
      { label: 'Genel Bakis', href: '/satici', icon: 'dashboard' },
      { label: 'Siparisler', href: '/satici/siparisler', icon: 'clipboard' },
      { label: 'Urunlerim', href: '/satici/urunler', icon: 'box' },
      { label: 'Mesajlar', href: '/satici/mesajlar', icon: 'chat', badge: 3 },
      { label: 'Finans', href: '/satici/finans', icon: 'dollar' },
      { label: 'Magaza Ayarlari', href: '/satici/ayarlar', icon: 'settings' },
      { label: 'Istatistikler', href: '/satici/istatistikler', icon: 'chart' },
    ],
  },
  {
    section: 'secondary',
    items: [
      { label: 'Yardim Merkezi', href: '#', icon: 'help' },
      { label: 'Magazayi Goruntule', href: '/magaza', icon: 'external', external: true },
      { label: 'Cikis Yap', href: '/satici/giris', icon: 'logout', danger: true },
    ],
  },
] as const

// Footer links
export const FOOTER_LINKS = {
  quickLinks: [
    { label: 'Hakkimizda', href: '#' },
    { label: 'Kariyer', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Surdurulebilirlik', href: '#' },
    { label: 'Satici Girisi', href: '/satici/giris' },
    { label: 'Satici Ol', href: '/satici/kayit' },
  ],
  support: [
    { label: 'Sikca Sorulan Sorular', href: '#' },
    { label: 'Kargo Bilgileri', href: '#' },
    { label: 'Iade & Degisim', href: '#' },
    { label: 'Iletisim', href: '/iletisim' },
  ],
  contact: {
    email: 'info@enolsun.com',
    phone: '+90 (212) 555 0123',
    address: 'Istanbul, Turkiye',
  },
  policies: [
    { label: 'Gizlilik Politikasi', href: '#' },
    { label: 'Kullanim Kosullari', href: '#' },
    { label: 'Cerez Politikasi', href: '#' },
  ],
} as const

// Slogans
export const SLOGANS = [
  'En hizli buyuyen pazar yeri',
  'En kolay satis platformu',
  'En dusuk komisyon oranlari',
  'En guvenilir e-ticaret altyapisi',
  'Satista en olsun, enolsun!',
]
