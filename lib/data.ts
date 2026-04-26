// Bazario — mock catalog (front-only). Will be swapped for Supabase queries.

export type Category = {
  slug: string
  name: string
  icon: string
  productCount: number
  image: string
}

export type Seller = {
  id: string
  name: string
  slug: string
  rating: number
  reviewCount: number
  country: string
  verified: boolean
  logo: string
}

export type Variant = {
  id: string
  label: string
  attrs: Record<string, string>
  price: number
  compareAtPrice?: number
  stock: number
  sku: string
}

export type Review = {
  id: string
  author: string
  avatar: string
  rating: number
  date: string
  title: string
  body: string
  verified: boolean
  helpful: number
}

export type Product = {
  id: string
  slug: string
  title: string
  brand: string
  description: string
  category: string
  categoryPath: string[]
  seller: Seller
  images: string[]
  price: number
  compareAtPrice?: number
  currency: string
  rating: number
  reviewCount: number
  sold: number
  badges: ("flash" | "new" | "bestseller" | "premium" | "eco")[]
  variants: Variant[]
  reviews: Review[]
  shippingFrom: string
  estimatedDelivery: string
  returns: string
}

export const CATEGORIES: Category[] = [
  { slug: "mode", name: "Mode", icon: "Shirt", productCount: 18420, image: "/category-fashion.jpg" },
  { slug: "tech", name: "Tech", icon: "Smartphone", productCount: 12350, image: "/category-tech.jpg" },
  { slug: "maison", name: "Maison", icon: "Home", productCount: 9870, image: "/category-home.jpg" },
  { slug: "beaute", name: "Beauté", icon: "Sparkles", productCount: 6540, image: "/category-beauty.jpg" },
  { slug: "sport", name: "Sport", icon: "Dumbbell", productCount: 5210, image: "/category-sport.jpg" },
  { slug: "enfant", name: "Enfant", icon: "Baby", productCount: 4380, image: "/category-kids.jpg" },
  { slug: "auto", name: "Auto & Moto", icon: "Car", productCount: 3120, image: "/category-auto.jpg" },
  { slug: "alimentation", name: "Alimentation", icon: "ShoppingBasket", productCount: 2890, image: "/category-food.jpg" },
]

export const SELLERS: Seller[] = [
  {
    id: "s1",
    name: "Atelier Lumen",
    slug: "atelier-lumen",
    rating: 4.9,
    reviewCount: 12480,
    country: "France",
    verified: true,
    logo: "/seller-lumen.jpg",
  },
  {
    id: "s2",
    name: "NordicHome",
    slug: "nordichome",
    rating: 4.8,
    reviewCount: 8932,
    country: "Suède",
    verified: true,
    logo: "/seller-nordic.jpg",
  },
  {
    id: "s3",
    name: "TechWave Global",
    slug: "techwave-global",
    rating: 4.7,
    reviewCount: 24100,
    country: "Allemagne",
    verified: true,
    logo: "/seller-techwave.jpg",
  },
  {
    id: "s4",
    name: "Maison Verte",
    slug: "maison-verte",
    rating: 4.9,
    reviewCount: 5430,
    country: "Italie",
    verified: true,
    logo: "/seller-verte.jpg",
  },
  {
    id: "s5",
    name: "Studio Kobe",
    slug: "studio-kobe",
    rating: 4.8,
    reviewCount: 9870,
    country: "Japon",
    verified: true,
    logo: "/seller-kobe.jpg",
  },
]

const baseReviews: Review[] = [
  {
    id: "r1",
    author: "Camille D.",
    avatar: "/avatar-1.jpg",
    rating: 5,
    date: "2026-03-12",
    title: "Conforme et très bonne qualité",
    body: "Livraison rapide, produit conforme à la description. Le packaging était soigné, je recommande vivement ce vendeur.",
    verified: true,
    helpful: 24,
  },
  {
    id: "r2",
    author: "Yanis B.",
    avatar: "/avatar-2.jpg",
    rating: 4,
    date: "2026-02-28",
    title: "Très bon rapport qualité/prix",
    body: "Bon produit pour le prix. Petit bémol sur le coloris légèrement plus foncé qu'en photo, mais rien de grave.",
    verified: true,
    helpful: 11,
  },
  {
    id: "r3",
    author: "Léa M.",
    avatar: "/avatar-3.jpg",
    rating: 5,
    date: "2026-02-14",
    title: "Parfait, je rachète !",
    body: "Exactement ce que je cherchais. La finition est top et le SAV vendeur a répondu en moins d'une heure à ma question.",
    verified: true,
    helpful: 32,
  },
]

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    slug: "casque-audio-aurora-pro",
    title: "Casque audio sans-fil Aurora Pro — réduction de bruit active",
    brand: "Aurora Audio",
    description:
      "Le casque Aurora Pro combine une réduction de bruit active de pointe, une autonomie de 40 h et un son haute résolution. Coussinets mémoire de forme, charge USB-C rapide et compatibilité multipoint Bluetooth 5.3.",
    category: "tech",
    categoryPath: ["Tech", "Audio", "Casques"],
    seller: SELLERS[2],
    images: ["/product-headphones-1.jpg", "/product-headphones-2.jpg", "/product-headphones-3.jpg", "/product-headphones-4.jpg"],
    price: 189.0,
    compareAtPrice: 279.0,
    currency: "EUR",
    rating: 4.8,
    reviewCount: 2340,
    sold: 18420,
    badges: ["flash", "bestseller"],
    variants: [
      { id: "v1", label: "Noir mat", attrs: { Couleur: "Noir mat" }, price: 189, compareAtPrice: 279, stock: 142, sku: "AUR-PRO-BK" },
      { id: "v2", label: "Blanc perle", attrs: { Couleur: "Blanc perle" }, price: 189, compareAtPrice: 279, stock: 38, sku: "AUR-PRO-WH" },
      { id: "v3", label: "Bleu nuit", attrs: { Couleur: "Bleu nuit" }, price: 199, compareAtPrice: 279, stock: 12, sku: "AUR-PRO-BL" },
    ],
    reviews: baseReviews,
    shippingFrom: "Allemagne",
    estimatedDelivery: "2 à 4 jours ouvrés",
    returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p2",
    slug: "lampe-design-halo",
    title: "Lampe de table design Halo en laiton brossé",
    brand: "Atelier Lumen",
    description:
      "Lampe de table sculpturale en laiton brossé avec abat-jour en lin écru. Variateur tactile intégré, ampoule LED chaleureuse 2700K incluse. Fabriquée à la main en France.",
    category: "maison",
    categoryPath: ["Maison", "Éclairage", "Lampes"],
    seller: SELLERS[0],
    images: ["/product-lamp-1.jpg", "/product-lamp-2.jpg", "/product-lamp-3.jpg"],
    price: 129.0,
    compareAtPrice: 169.0,
    currency: "EUR",
    rating: 4.9,
    reviewCount: 412,
    sold: 1820,
    badges: ["new", "premium"],
    variants: [
      { id: "v1", label: "Laiton brossé", attrs: { Finition: "Laiton brossé" }, price: 129, compareAtPrice: 169, stock: 24, sku: "HALO-BR" },
      { id: "v2", label: "Noir mat", attrs: { Finition: "Noir mat" }, price: 129, compareAtPrice: 169, stock: 8, sku: "HALO-BK" },
    ],
    reviews: baseReviews,
    shippingFrom: "France",
    estimatedDelivery: "3 à 5 jours ouvrés",
    returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p3",
    slug: "sneakers-runway-x1",
    title: "Sneakers Runway X1 en cuir recyclé",
    brand: "Runway",
    description:
      "Sneakers en cuir recyclé certifié, semelle en caoutchouc naturel et doublure respirante. Conception responsable, fabriquées au Portugal.",
    category: "mode",
    categoryPath: ["Mode", "Chaussures", "Sneakers"],
    seller: SELLERS[4],
    images: ["/product-sneakers-1.jpg", "/product-sneakers-2.jpg", "/product-sneakers-3.jpg"],
    price: 95.0,
    compareAtPrice: 140.0,
    currency: "EUR",
    rating: 4.7,
    reviewCount: 1890,
    sold: 9230,
    badges: ["flash", "eco"],
    variants: [
      { id: "v1", label: "Blanc / 41", attrs: { Couleur: "Blanc", Pointure: "41" }, price: 95, compareAtPrice: 140, stock: 32, sku: "RW-X1-WH-41" },
      { id: "v2", label: "Blanc / 42", attrs: { Couleur: "Blanc", Pointure: "42" }, price: 95, compareAtPrice: 140, stock: 18, sku: "RW-X1-WH-42" },
      { id: "v3", label: "Noir / 41", attrs: { Couleur: "Noir", Pointure: "41" }, price: 95, compareAtPrice: 140, stock: 5, sku: "RW-X1-BK-41" },
    ],
    reviews: baseReviews,
    shippingFrom: "Japon",
    estimatedDelivery: "5 à 8 jours ouvrés",
    returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p4",
    slug: "serum-eclat-vitamine-c",
    title: "Sérum Éclat Vitamine C 15 % bio",
    brand: "Maison Verte",
    description:
      "Sérum visage concentré en vitamine C stabilisée, acide hyaluronique et extrait de figue. Formule vegan, certifiée bio. Texture fluide non grasse.",
    category: "beaute",
    categoryPath: ["Beauté", "Soins visage", "Sérums"],
    seller: SELLERS[3],
    images: ["/product-serum-1.jpg", "/product-serum-2.jpg"],
    price: 38.0,
    compareAtPrice: 49.0,
    currency: "EUR",
    rating: 4.9,
    reviewCount: 3120,
    sold: 14820,
    badges: ["bestseller", "eco"],
    variants: [
      { id: "v1", label: "30 ml", attrs: { Format: "30 ml" }, price: 38, compareAtPrice: 49, stock: 200, sku: "MV-VITC-30" },
      { id: "v2", label: "50 ml", attrs: { Format: "50 ml" }, price: 58, compareAtPrice: 75, stock: 80, sku: "MV-VITC-50" },
    ],
    reviews: baseReviews,
    shippingFrom: "Italie",
    estimatedDelivery: "3 à 6 jours ouvrés",
    returns: "Retour sous 30 jours (produit non ouvert)",
  },
  {
    id: "p5",
    slug: "fauteuil-osko",
    title: "Fauteuil lounge Oskö en chêne et bouclette ivoire",
    brand: "NordicHome",
    description:
      "Fauteuil lounge inspiration scandinave, structure en chêne massif huilé et assise en tissu bouclette ivoire. Confort enveloppant, montage en moins de 10 minutes.",
    category: "maison",
    categoryPath: ["Maison", "Mobilier", "Fauteuils"],
    seller: SELLERS[1],
    images: ["/product-chair-1.jpg", "/product-chair-2.jpg", "/product-chair-3.jpg"],
    price: 459.0,
    compareAtPrice: 599.0,
    currency: "EUR",
    rating: 4.8,
    reviewCount: 642,
    sold: 2150,
    badges: ["premium"],
    variants: [
      { id: "v1", label: "Bouclette ivoire", attrs: { Tissu: "Bouclette ivoire" }, price: 459, compareAtPrice: 599, stock: 18, sku: "OSKO-IV" },
      { id: "v2", label: "Velours olive", attrs: { Tissu: "Velours olive" }, price: 489, compareAtPrice: 629, stock: 6, sku: "OSKO-OL" },
    ],
    reviews: baseReviews,
    shippingFrom: "Suède",
    estimatedDelivery: "7 à 12 jours ouvrés",
    returns: "Retour sous 14 jours",
  },
  {
    id: "p6",
    slug: "montre-orbis-titane",
    title: "Montre automatique Orbis Titane saphir",
    brand: "Orbis",
    description:
      "Montre automatique 40 mm boîtier titane grade 5, verre saphir bombé, bracelet maille milanaise. Mouvement Sellita SW200, étanchéité 100 m.",
    category: "mode",
    categoryPath: ["Mode", "Accessoires", "Montres"],
    seller: SELLERS[2],
    images: ["/product-watch-1.jpg", "/product-watch-2.jpg"],
    price: 549.0,
    compareAtPrice: 729.0,
    currency: "EUR",
    rating: 4.9,
    reviewCount: 218,
    sold: 980,
    badges: ["new", "premium"],
    variants: [
      { id: "v1", label: "Cadran noir", attrs: { Cadran: "Noir" }, price: 549, compareAtPrice: 729, stock: 12, sku: "ORB-TI-BK" },
      { id: "v2", label: "Cadran bleu", attrs: { Cadran: "Bleu" }, price: 549, compareAtPrice: 729, stock: 9, sku: "ORB-TI-BL" },
    ],
    reviews: baseReviews,
    shippingFrom: "Allemagne",
    estimatedDelivery: "3 à 5 jours ouvrés",
    returns: "Retour sous 30 jours",
  },
  {
    id: "p7",
    slug: "vtt-electrique-trail-x",
    title: "VTT électrique Trail X 29\" — moteur 250 W",
    brand: "Trail",
    description:
      "VTT électrique tout-suspendu 29 pouces, moteur central 250 W, batterie 720 Wh, autonomie jusqu'à 130 km. Cadre aluminium hydroformé, transmission Shimano 12 vitesses.",
    category: "sport",
    categoryPath: ["Sport", "Vélo", "VTT électriques"],
    seller: SELLERS[2],
    images: ["/product-bike-1.jpg", "/product-bike-2.jpg"],
    price: 2390.0,
    compareAtPrice: 2890.0,
    currency: "EUR",
    rating: 4.7,
    reviewCount: 154,
    sold: 420,
    badges: ["flash"],
    variants: [
      { id: "v1", label: "Taille M", attrs: { Taille: "M" }, price: 2390, compareAtPrice: 2890, stock: 6, sku: "TR-X-M" },
      { id: "v2", label: "Taille L", attrs: { Taille: "L" }, price: 2390, compareAtPrice: 2890, stock: 4, sku: "TR-X-L" },
    ],
    reviews: baseReviews,
    shippingFrom: "Allemagne",
    estimatedDelivery: "5 à 10 jours ouvrés",
    returns: "Retour sous 14 jours",
  },
  {
    id: "p8",
    slug: "machine-cafe-espresso-ducale",
    title: "Machine à expresso Ducale automatique broyeur",
    brand: "Ducale",
    description:
      "Machine à expresso automatique avec broyeur en céramique, mousseur de lait intégré, 14 recettes mémorisées. Buse à eau chaude, écran tactile couleur.",
    category: "maison",
    categoryPath: ["Maison", "Cuisine", "Machines à café"],
    seller: SELLERS[3],
    images: ["/product-coffee-1.jpg", "/product-coffee-2.jpg"],
    price: 649.0,
    compareAtPrice: 899.0,
    currency: "EUR",
    rating: 4.6,
    reviewCount: 980,
    sold: 3210,
    badges: ["flash", "bestseller"],
    variants: [
      { id: "v1", label: "Inox", attrs: { Finition: "Inox" }, price: 649, compareAtPrice: 899, stock: 20, sku: "DUC-INX" },
      { id: "v2", label: "Noir mat", attrs: { Finition: "Noir mat" }, price: 649, compareAtPrice: 899, stock: 14, sku: "DUC-BK" },
    ],
    reviews: baseReviews,
    shippingFrom: "Italie",
    estimatedDelivery: "4 à 7 jours ouvrés",
    returns: "Retour sous 30 jours",
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getProductsByCategory(slug: string): Product[] {
  return PRODUCTS.filter((p) => p.category === slug)
}

export function getRelatedProducts(slug: string, limit = 4): Product[] {
  const current = getProductBySlug(slug)
  if (!current) return []
  return PRODUCTS.filter(
    (p) => p.slug !== slug && p.category === current.category,
  ).slice(0, limit)
}

export function searchProducts(query: string): Product[] {
  if (!query.trim()) return PRODUCTS
  const q = query.toLowerCase()
  return PRODUCTS.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q),
  )
}

export const FLASH_SALE_END = "2026-04-27T23:59:59"

// ───────────────────── Convenience aliases & helpers ─────────────────────
export const products = PRODUCTS
export const sellers = SELLERS
export const categories = CATEGORIES

export function formatPrice(value: number, currency: string = "EUR", locale: string = "fr-FR"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value)
}

// ───────────────────── Mock orders ─────────────────────
export type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled"

export type Order = {
  id: string
  date: string
  status: OrderStatus
  statusLabel: string
  total: number
  trackingUrl?: string
  items: { title: string; image: string; qty: number; price: number; sellerId: string }[]
}

export const mockOrders: Order[] = [
  {
    id: "BZ-20264102",
    date: "12 avril 2026",
    status: "delivered",
    statusLabel: "Livrée",
    total: 412.5,
    items: [
      {
        title: "Casque audio sans fil bluetooth premium ANC",
        image: "/product-headphones-1.jpg",
        qty: 1,
        price: 189,
        sellerId: "techwave",
      },
      {
        title: "Sneakers en cuir blanc minimaliste",
        image: "/product-sneakers-1.jpg",
        qty: 1,
        price: 129,
        sellerId: "lumen",
      },
    ],
  },
  {
    id: "BZ-20264087",
    date: "8 avril 2026",
    status: "shipped",
    statusLabel: "En cours de livraison",
    total: 219,
    trackingUrl: "#",
    items: [
      {
        title: "Lampe de table en laiton brossé",
        image: "/product-lamp-1.jpg",
        qty: 1,
        price: 219,
        sellerId: "nordic",
      },
    ],
  },
  {
    id: "BZ-20264055",
    date: "2 avril 2026",
    status: "pending",
    statusLabel: "Préparation en cours",
    total: 78,
    items: [
      {
        title: "Sérum vitamine C éclat 30 ml",
        image: "/product-serum-1.jpg",
        qty: 2,
        price: 39,
        sellerId: "verte",
      },
    ],
  },
]

// ───────────────────── Mock addresses ─────────────────────
export type Address = {
  id: string
  label: string
  fullName: string
  line1: string
  line2?: string
  zip: string
  city: string
  country: string
  phone: string
  isDefault?: boolean
}

export const mockAddresses: Address[] = [
  {
    id: "addr-1",
    label: "Domicile",
    fullName: "Hugo Pro",
    line1: "12 rue de la République",
    line2: "Apt 4B",
    zip: "75001",
    city: "Paris",
    country: "France",
    phone: "+33 6 12 34 56 78",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Bureau",
    fullName: "Hugo Pro",
    line1: "55 avenue des Champs-Élysées",
    zip: "75008",
    city: "Paris",
    country: "France",
    phone: "+33 6 12 34 56 78",
  },
]

