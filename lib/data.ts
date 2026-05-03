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
  productCount: number
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
    productCount: 142,
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
    productCount: 318,
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
    productCount: 524,
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
    productCount: 86,
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
    productCount: 207,
  },
]

export const baseReviews: Review[] = [
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
  // ───────── MODE ─────────
  {
    id: "p9", slug: "trench-emblem-camel", title: "Trench classique Emblem en gabardine de coton",
    brand: "Emblem", description: "Trench iconique en gabardine de coton imperméable, doublure rayée, ceinture nouée. Coupe régulière, finitions main au Portugal.",
    category: "mode", categoryPath: ["Mode", "Vêtements", "Manteaux"], seller: SELLERS[4],
    images: ["/p-trench.jpg"], price: 289, compareAtPrice: 389, currency: "EUR",
    rating: 4.7, reviewCount: 824, sold: 4120, badges: ["bestseller"],
    variants: [
      { id: "v1", label: "Camel / S", attrs: { Couleur: "Camel", Taille: "S" }, price: 289, compareAtPrice: 389, stock: 22, sku: "EMB-TR-CA-S" },
      { id: "v2", label: "Camel / M", attrs: { Couleur: "Camel", Taille: "M" }, price: 289, compareAtPrice: 389, stock: 31, sku: "EMB-TR-CA-M" },
      { id: "v3", label: "Camel / L", attrs: { Couleur: "Camel", Taille: "L" }, price: 289, compareAtPrice: 389, stock: 14, sku: "EMB-TR-CA-L" },
    ],
    reviews: baseReviews, shippingFrom: "Portugal", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p10", slug: "sac-cuir-juliet", title: "Sac à main Juliet en cuir de veau pleine fleur",
    brand: "Juliet", description: "Sac structuré en cuir de veau pleine fleur, doublure en daim, fermoir en laiton massif. Atelier familial à Florence depuis 1962.",
    category: "mode", categoryPath: ["Mode", "Sacs", "Sacs à main"], seller: SELLERS[3],
    images: ["/p-handbag.jpg"], price: 349, compareAtPrice: 449, currency: "EUR",
    rating: 4.9, reviewCount: 612, sold: 2890, badges: ["premium", "bestseller"],
    variants: [
      { id: "v1", label: "Cognac", attrs: { Couleur: "Cognac" }, price: 349, compareAtPrice: 449, stock: 18, sku: "JUL-COG" },
      { id: "v2", label: "Noir", attrs: { Couleur: "Noir" }, price: 349, compareAtPrice: 449, stock: 12, sku: "JUL-BK" },
    ],
    reviews: baseReviews, shippingFrom: "Italie", estimatedDelivery: "3 à 6 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p11", slug: "jean-droit-icon", title: "Jean droit Icon en denim japonais 14 oz",
    brand: "Icon Denim", description: "Jean coupe droite en denim japonais selvedge 14 oz, indigo profond. Vieillissement personnalisé, finitions à la main.",
    category: "mode", categoryPath: ["Mode", "Vêtements", "Jeans"], seller: SELLERS[4],
    images: ["/p-jeans.jpg"], price: 159, currency: "EUR",
    rating: 4.6, reviewCount: 1240, sold: 8420, badges: ["bestseller", "eco"],
    variants: [
      { id: "v1", label: "Indigo / 30", attrs: { Couleur: "Indigo", Taille: "30" }, price: 159, stock: 28, sku: "ICN-30" },
      { id: "v2", label: "Indigo / 32", attrs: { Couleur: "Indigo", Taille: "32" }, price: 159, stock: 35, sku: "ICN-32" },
      { id: "v3", label: "Indigo / 34", attrs: { Couleur: "Indigo", Taille: "34" }, price: 159, stock: 22, sku: "ICN-34" },
    ],
    reviews: baseReviews, shippingFrom: "Japon", estimatedDelivery: "5 à 8 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p12", slug: "robe-soie-noire-onde", title: "Robe Onde en soie noire mi-longue",
    brand: "Onde", description: "Robe mi-longue en soie 100 % naturelle, coupe fluide, manches longues. Tissée en France, finitions main.",
    category: "mode", categoryPath: ["Mode", "Vêtements", "Robes"], seller: SELLERS[0],
    images: ["/p-dress.jpg"], price: 219, compareAtPrice: 289, currency: "EUR",
    rating: 4.8, reviewCount: 318, sold: 1640, badges: ["new", "premium"],
    variants: [
      { id: "v1", label: "Noir / 36", attrs: { Couleur: "Noir", Taille: "36" }, price: 219, compareAtPrice: 289, stock: 14, sku: "OND-36" },
      { id: "v2", label: "Noir / 38", attrs: { Couleur: "Noir", Taille: "38" }, price: 219, compareAtPrice: 289, stock: 18, sku: "OND-38" },
      { id: "v3", label: "Noir / 40", attrs: { Couleur: "Noir", Taille: "40" }, price: 219, compareAtPrice: 289, stock: 9, sku: "OND-40" },
    ],
    reviews: baseReviews, shippingFrom: "France", estimatedDelivery: "2 à 4 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p13", slug: "lunettes-soleil-arlo", title: "Lunettes de soleil Arlo en acétate écaille",
    brand: "Arlo", description: "Monture en acétate italien fait main, verres polarisés CR-39, protection 100 % UV. Étui en cuir et chiffon microfibre inclus.",
    category: "mode", categoryPath: ["Mode", "Accessoires", "Lunettes"], seller: SELLERS[3],
    images: ["/p-sunglasses.jpg"], price: 119, compareAtPrice: 159, currency: "EUR",
    rating: 4.7, reviewCount: 542, sold: 3120, badges: ["flash"],
    variants: [
      { id: "v1", label: "Écaille", attrs: { Couleur: "Écaille" }, price: 119, compareAtPrice: 159, stock: 42, sku: "ARL-EC" },
      { id: "v2", label: "Noir", attrs: { Couleur: "Noir" }, price: 119, compareAtPrice: 159, stock: 28, sku: "ARL-BK" },
    ],
    reviews: baseReviews, shippingFrom: "Italie", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p14", slug: "bottines-chelsea-cognac", title: "Bottines Chelsea cuir cognac surpiqûres main",
    brand: "Heritage", description: "Bottines Chelsea en cuir pleine fleur tannage végétal, semelle Goodyear, surpiqûres faites main. Atelier portugais depuis 1908.",
    category: "mode", categoryPath: ["Mode", "Chaussures", "Bottines"], seller: SELLERS[4],
    images: ["/p-boots.jpg"], price: 245, compareAtPrice: 299, currency: "EUR",
    rating: 4.8, reviewCount: 712, sold: 3890, badges: ["bestseller"],
    variants: [
      { id: "v1", label: "Cognac / 41", attrs: { Couleur: "Cognac", Pointure: "41" }, price: 245, compareAtPrice: 299, stock: 16, sku: "HRT-41" },
      { id: "v2", label: "Cognac / 42", attrs: { Couleur: "Cognac", Pointure: "42" }, price: 245, compareAtPrice: 299, stock: 22, sku: "HRT-42" },
      { id: "v3", label: "Noir / 42", attrs: { Couleur: "Noir", Pointure: "42" }, price: 245, compareAtPrice: 299, stock: 11, sku: "HRT-BK-42" },
    ],
    reviews: baseReviews, shippingFrom: "Portugal", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p15", slug: "chemise-lin-toile", title: "Chemise Toile en lin lavé blanc cassé",
    brand: "Toile", description: "Chemise en lin lavé européen, coupe régulière, col français, boutons en nacre. Confection Portugal.",
    category: "mode", categoryPath: ["Mode", "Vêtements", "Chemises"], seller: SELLERS[4],
    images: ["/p-shirt.jpg"], price: 89, currency: "EUR",
    rating: 4.7, reviewCount: 928, sold: 6210, badges: ["bestseller", "eco"],
    variants: [
      { id: "v1", label: "Blanc / S", attrs: { Couleur: "Blanc cassé", Taille: "S" }, price: 89, stock: 32, sku: "TOI-S" },
      { id: "v2", label: "Blanc / M", attrs: { Couleur: "Blanc cassé", Taille: "M" }, price: 89, stock: 41, sku: "TOI-M" },
      { id: "v3", label: "Blanc / L", attrs: { Couleur: "Blanc cassé", Taille: "L" }, price: 89, stock: 28, sku: "TOI-L" },
    ],
    reviews: baseReviews, shippingFrom: "Portugal", estimatedDelivery: "2 à 4 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p16", slug: "ceinture-cuir-noir", title: "Ceinture cuir noir boucle laiton brossé",
    brand: "Atelier Lumen", description: "Ceinture en cuir pleine fleur tanné en France, boucle en laiton brossé. Largeur 3 cm, longueur ajustable.",
    category: "mode", categoryPath: ["Mode", "Accessoires", "Ceintures"], seller: SELLERS[0],
    images: ["/p-belt.jpg"], price: 79, currency: "EUR",
    rating: 4.8, reviewCount: 412, sold: 2120, badges: ["new"],
    variants: [
      { id: "v1", label: "Noir / 90", attrs: { Couleur: "Noir", Taille: "90 cm" }, price: 79, stock: 38, sku: "BLT-90" },
      { id: "v2", label: "Noir / 100", attrs: { Couleur: "Noir", Taille: "100 cm" }, price: 79, stock: 42, sku: "BLT-100" },
    ],
    reviews: baseReviews, shippingFrom: "France", estimatedDelivery: "2 à 4 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  // ───────── TECH ─────────
  {
    id: "p17", slug: "smartphone-orbit-x", title: "Smartphone Orbit X 256 Go appareil photo 50 MP",
    brand: "Orbit", description: "Smartphone 6,7 pouces OLED 120 Hz, 256 Go, appareil photo arrière 50 MP avec stabilisation optique, charge sans-fil 30 W. Aluminium et verre Gorilla.",
    category: "tech", categoryPath: ["Tech", "Téléphonie", "Smartphones"], seller: SELLERS[2],
    images: ["/p-smartphone.jpg"], price: 799, compareAtPrice: 949, currency: "EUR",
    rating: 4.7, reviewCount: 4120, sold: 18920, badges: ["flash", "bestseller"],
    variants: [
      { id: "v1", label: "Graphite 256 Go", attrs: { Couleur: "Graphite", Stockage: "256 Go" }, price: 799, compareAtPrice: 949, stock: 84, sku: "ORB-X-GR-256" },
      { id: "v2", label: "Graphite 512 Go", attrs: { Couleur: "Graphite", Stockage: "512 Go" }, price: 949, compareAtPrice: 1099, stock: 38, sku: "ORB-X-GR-512" },
    ],
    reviews: baseReviews, shippingFrom: "Allemagne", estimatedDelivery: "1 à 3 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p18", slug: "smartwatch-pulse-pro", title: "Smartwatch Pulse Pro GPS écran AMOLED",
    brand: "Pulse", description: "Montre connectée GPS multi-systèmes, écran AMOLED 1,4\", autonomie 14 jours, suivi 100+ sports, ECG et SpO2. Étanche 5 ATM.",
    category: "tech", categoryPath: ["Tech", "Montres connectées", "Sport"], seller: SELLERS[2],
    images: ["/p-smartwatch.jpg"], price: 249, compareAtPrice: 329, currency: "EUR",
    rating: 4.6, reviewCount: 2840, sold: 12120, badges: ["bestseller"],
    variants: [
      { id: "v1", label: "Noir 42 mm", attrs: { Couleur: "Noir", Taille: "42 mm" }, price: 249, compareAtPrice: 329, stock: 92, sku: "PLS-BK-42" },
      { id: "v2", label: "Argent 42 mm", attrs: { Couleur: "Argent", Taille: "42 mm" }, price: 249, compareAtPrice: 329, stock: 64, sku: "PLS-SI-42" },
    ],
    reviews: baseReviews, shippingFrom: "Allemagne", estimatedDelivery: "1 à 3 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p19", slug: "laptop-vega-air-14", title: "Ordinateur portable Vega Air 14\" — 16 Go / 512 Go",
    brand: "Vega", description: "Ultraportable 14 pouces écran 2K, processeur 12 cœurs, 16 Go RAM, SSD 512 Go. Châssis aluminium recyclé, autonomie 18 h.",
    category: "tech", categoryPath: ["Tech", "Informatique", "Ordinateurs portables"], seller: SELLERS[2],
    images: ["/p-laptop.jpg"], price: 1199, compareAtPrice: 1399, currency: "EUR",
    rating: 4.8, reviewCount: 1240, sold: 4820, badges: ["premium", "new"],
    variants: [
      { id: "v1", label: "Argent / 16 Go", attrs: { Couleur: "Argent", RAM: "16 Go" }, price: 1199, compareAtPrice: 1399, stock: 28, sku: "VEG-AIR-16" },
      { id: "v2", label: "Gris / 32 Go", attrs: { Couleur: "Gris sidéral", RAM: "32 Go" }, price: 1499, compareAtPrice: 1699, stock: 14, sku: "VEG-AIR-32" },
    ],
    reviews: baseReviews, shippingFrom: "Allemagne", estimatedDelivery: "2 à 4 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p20", slug: "tablette-canvas-pro", title: "Tablette Canvas Pro 11\" avec stylet précision",
    brand: "Canvas", description: "Tablette 11\" Liquid Retina 120 Hz, puce 8 cœurs, 256 Go, compatible stylet précision. Idéale pour le dessin et la prise de notes.",
    category: "tech", categoryPath: ["Tech", "Informatique", "Tablettes"], seller: SELLERS[2],
    images: ["/p-tablet.jpg"], price: 599, compareAtPrice: 749, currency: "EUR",
    rating: 4.7, reviewCount: 1820, sold: 6120, badges: ["flash"],
    variants: [
      { id: "v1", label: "Argent 256 Go", attrs: { Couleur: "Argent", Stockage: "256 Go" }, price: 599, compareAtPrice: 749, stock: 48, sku: "CNV-256" },
      { id: "v2", label: "Gris 512 Go", attrs: { Couleur: "Gris", Stockage: "512 Go" }, price: 799, compareAtPrice: 949, stock: 22, sku: "CNV-512" },
    ],
    reviews: baseReviews, shippingFrom: "Allemagne", estimatedDelivery: "1 à 3 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p21", slug: "ecouteurs-aurora-buds", title: "Écouteurs sans-fil Aurora Buds réduction de bruit",
    brand: "Aurora Audio", description: "Écouteurs intra-auriculaires Bluetooth 5.3, réduction de bruit active, autonomie 32 h avec étui. Charge USB-C et sans-fil Qi.",
    category: "tech", categoryPath: ["Tech", "Audio", "Écouteurs"], seller: SELLERS[2],
    images: ["/p-earbuds.jpg"], price: 149, compareAtPrice: 199, currency: "EUR",
    rating: 4.7, reviewCount: 3920, sold: 21420, badges: ["bestseller", "flash"],
    variants: [
      { id: "v1", label: "Blanc", attrs: { Couleur: "Blanc" }, price: 149, compareAtPrice: 199, stock: 142, sku: "AUR-BUD-WH" },
      { id: "v2", label: "Noir", attrs: { Couleur: "Noir" }, price: 149, compareAtPrice: 199, stock: 96, sku: "AUR-BUD-BK" },
    ],
    reviews: baseReviews, shippingFrom: "Allemagne", estimatedDelivery: "1 à 3 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p22", slug: "enceinte-monolith", title: "Enceinte portable Monolith 360° autonomie 24 h",
    brand: "Monolith", description: "Enceinte Bluetooth 360°, son immersif, autonomie 24 h, étanche IP67, charge USB-C rapide. Port jumelable pour mode stéréo.",
    category: "tech", categoryPath: ["Tech", "Audio", "Enceintes"], seller: SELLERS[2],
    images: ["/p-speaker.jpg"], price: 179, compareAtPrice: 229, currency: "EUR",
    rating: 4.6, reviewCount: 1820, sold: 7820, badges: [],
    variants: [
      { id: "v1", label: "Charbon", attrs: { Couleur: "Charbon" }, price: 179, compareAtPrice: 229, stock: 64, sku: "MON-CH" },
      { id: "v2", label: "Sable", attrs: { Couleur: "Sable" }, price: 179, compareAtPrice: 229, stock: 38, sku: "MON-SA" },
    ],
    reviews: baseReviews, shippingFrom: "Allemagne", estimatedDelivery: "1 à 3 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p23", slug: "drone-skylight-mini", title: "Drone Skylight Mini caméra 4K stabilisée",
    brand: "Skylight", description: "Drone pliable 249 g, caméra 4K HDR avec stabilisation 3 axes, autonomie 34 min, transmission HD jusqu'à 10 km.",
    category: "tech", categoryPath: ["Tech", "Drones", "Photo"], seller: SELLERS[2],
    images: ["/p-drone.jpg"], price: 499, compareAtPrice: 649, currency: "EUR",
    rating: 4.8, reviewCount: 920, sold: 2840, badges: ["new", "premium"],
    variants: [
      { id: "v1", label: "Standard", attrs: { Pack: "Standard" }, price: 499, compareAtPrice: 649, stock: 22, sku: "SKY-STD" },
      { id: "v2", label: "Combo Fly More", attrs: { Pack: "Fly More" }, price: 699, compareAtPrice: 899, stock: 12, sku: "SKY-COMBO" },
    ],
    reviews: baseReviews, shippingFrom: "Allemagne", estimatedDelivery: "2 à 4 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  // ───────── MAISON ─────────
  {
    id: "p24", slug: "canape-bouclette-3p", title: "Canapé 3 places Pillow en bouclette ivoire",
    brand: "NordicHome", description: "Canapé moelleux 3 places, structure pin massif certifié FSC, mousse haute densité, déhoussable. Livraison transporteur dédié.",
    category: "maison", categoryPath: ["Maison", "Mobilier", "Canapés"], seller: SELLERS[1],
    images: ["/p-sofa.jpg"], price: 1290, compareAtPrice: 1590, currency: "EUR",
    rating: 4.8, reviewCount: 412, sold: 1240, badges: ["premium", "bestseller"],
    variants: [
      { id: "v1", label: "Bouclette ivoire", attrs: { Tissu: "Bouclette ivoire" }, price: 1290, compareAtPrice: 1590, stock: 12, sku: "PIL-IV" },
      { id: "v2", label: "Velours olive", attrs: { Tissu: "Velours olive" }, price: 1390, compareAtPrice: 1690, stock: 8, sku: "PIL-OL" },
    ],
    reviews: baseReviews, shippingFrom: "Suède", estimatedDelivery: "10 à 15 jours ouvrés", returns: "Retour sous 14 jours",
  },
  {
    id: "p25", slug: "miroir-rond-laiton", title: "Miroir rond Lune cadre laiton brossé 80 cm",
    brand: "Atelier Lumen", description: "Miroir mural rond 80 cm, cadre fin en laiton brossé, fixation murale incluse. Verre biseauté de qualité supérieure.",
    category: "maison", categoryPath: ["Maison", "Décoration", "Miroirs"], seller: SELLERS[0],
    images: ["/p-mirror.jpg"], price: 189, compareAtPrice: 249, currency: "EUR",
    rating: 4.9, reviewCount: 524, sold: 2120, badges: ["new"],
    variants: [
      { id: "v1", label: "Laiton 80 cm", attrs: { Diamètre: "80 cm" }, price: 189, compareAtPrice: 249, stock: 24, sku: "LUN-80" },
      { id: "v2", label: "Laiton 100 cm", attrs: { Diamètre: "100 cm" }, price: 249, compareAtPrice: 319, stock: 14, sku: "LUN-100" },
    ],
    reviews: baseReviews, shippingFrom: "France", estimatedDelivery: "3 à 6 jours ouvrés", returns: "Retour sous 30 jours",
  },
  {
    id: "p26", slug: "vase-ceramique-onde", title: "Vase Onde céramique sculpté écru 35 cm",
    brand: "Atelier Lumen", description: "Vase sculpté façonné à la main par notre potier en France, terre cuite engobée écru, étanche. Pièce unique.",
    category: "maison", categoryPath: ["Maison", "Décoration", "Vases"], seller: SELLERS[0],
    images: ["/p-vase.jpg"], price: 89, currency: "EUR",
    rating: 4.8, reviewCount: 312, sold: 1820, badges: ["new", "premium"],
    variants: [
      { id: "v1", label: "Écru 35 cm", attrs: { Hauteur: "35 cm" }, price: 89, stock: 28, sku: "ONV-35" },
      { id: "v2", label: "Écru 50 cm", attrs: { Hauteur: "50 cm" }, price: 129, stock: 14, sku: "ONV-50" },
    ],
    reviews: baseReviews, shippingFrom: "France", estimatedDelivery: "3 à 6 jours ouvrés", returns: "Retour sous 30 jours",
  },
  {
    id: "p27", slug: "plaid-laine-mousse", title: "Plaid en grosse maille de laine mérinos 130x180",
    brand: "NordicHome", description: "Plaid grosse maille tricotée à la main en laine mérinos, ultra-doux, dimensions 130x180. Idéal canapé et bout de lit.",
    category: "maison", categoryPath: ["Maison", "Textile", "Plaids"], seller: SELLERS[1],
    images: ["/p-throw.jpg"], price: 119, compareAtPrice: 159, currency: "EUR",
    rating: 4.7, reviewCount: 824, sold: 4820, badges: ["bestseller"],
    variants: [
      { id: "v1", label: "Crème", attrs: { Couleur: "Crème" }, price: 119, compareAtPrice: 159, stock: 64, sku: "PLD-CR" },
      { id: "v2", label: "Anthracite", attrs: { Couleur: "Anthracite" }, price: 119, compareAtPrice: 159, stock: 38, sku: "PLD-AN" },
    ],
    reviews: baseReviews, shippingFrom: "Suède", estimatedDelivery: "5 à 8 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p28", slug: "tapis-berber-200x300", title: "Tapis Berbère pure laine motif géométrique 200x300",
    brand: "NordicHome", description: "Tapis 200x300 cm tissé main au Maroc, pure laine vierge, motif géométrique noué traditionnel. Pièce unique.",
    category: "maison", categoryPath: ["Maison", "Textile", "Tapis"], seller: SELLERS[1],
    images: ["/p-rug.jpg"], price: 489, compareAtPrice: 649, currency: "EUR",
    rating: 4.8, reviewCount: 218, sold: 820, badges: ["premium", "eco"],
    variants: [
      { id: "v1", label: "Beige 200x300", attrs: { Couleur: "Beige", Taille: "200x300" }, price: 489, compareAtPrice: 649, stock: 18, sku: "BER-200" },
      { id: "v2", label: "Beige 240x340", attrs: { Couleur: "Beige", Taille: "240x340" }, price: 689, compareAtPrice: 849, stock: 8, sku: "BER-240" },
    ],
    reviews: baseReviews, shippingFrom: "Suède", estimatedDelivery: "5 à 10 jours ouvrés", returns: "Retour sous 14 jours",
  },
  {
    id: "p29", slug: "table-basse-travertin", title: "Table basse Roma travertin naturel ronde 90 cm",
    brand: "NordicHome", description: "Table basse ronde 90 cm en travertin naturel, finition mate. Une seule pièce de pierre par table, veines uniques.",
    category: "maison", categoryPath: ["Maison", "Mobilier", "Tables basses"], seller: SELLERS[1],
    images: ["/p-coffeetable.jpg"], price: 689, compareAtPrice: 879, currency: "EUR",
    rating: 4.9, reviewCount: 142, sold: 480, badges: ["new", "premium"],
    variants: [
      { id: "v1", label: "Travertin 90 cm", attrs: { Diamètre: "90 cm" }, price: 689, compareAtPrice: 879, stock: 12, sku: "ROM-90" },
    ],
    reviews: baseReviews, shippingFrom: "Suède", estimatedDelivery: "10 à 15 jours ouvrés", returns: "Retour sous 14 jours",
  },
  {
    id: "p30", slug: "suspension-rice-paper", title: "Suspension Akari papier de riz lumière chaude",
    brand: "Atelier Lumen", description: "Suspension sculpturale en papier de riz monté sur structure bambou, ampoule LED chaude E27 incluse, câble textile 2 m.",
    category: "maison", categoryPath: ["Maison", "Éclairage", "Suspensions"], seller: SELLERS[0],
    images: ["/p-pendant.jpg"], price: 149, currency: "EUR",
    rating: 4.7, reviewCount: 412, sold: 1820, badges: ["new"],
    variants: [
      { id: "v1", label: "Diamètre 50 cm", attrs: { Diamètre: "50 cm" }, price: 149, stock: 28, sku: "AKA-50" },
      { id: "v2", label: "Diamètre 70 cm", attrs: { Diamètre: "70 cm" }, price: 199, stock: 14, sku: "AKA-70" },
    ],
    reviews: baseReviews, shippingFrom: "France", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p31", slug: "linge-lit-lin-lave", title: "Parure de lit lin lavé 4 pièces 240x260",
    brand: "NordicHome", description: "Parure 4 pièces en lin lavé européen 100 % naturel : housse 240x260, drap-housse 160x200, deux taies 65x65. Certifié Oeko-Tex.",
    category: "maison", categoryPath: ["Maison", "Linge de lit", "Parures"], seller: SELLERS[1],
    images: ["/p-linen.jpg"], price: 219, compareAtPrice: 289, currency: "EUR",
    rating: 4.8, reviewCount: 1240, sold: 5820, badges: ["bestseller", "eco"],
    variants: [
      { id: "v1", label: "Naturel", attrs: { Couleur: "Naturel" }, price: 219, compareAtPrice: 289, stock: 42, sku: "LIN-NA" },
      { id: "v2", label: "Argile", attrs: { Couleur: "Argile" }, price: 219, compareAtPrice: 289, stock: 28, sku: "LIN-AR" },
      { id: "v3", label: "Vert sauge", attrs: { Couleur: "Vert sauge" }, price: 219, compareAtPrice: 289, stock: 18, sku: "LIN-VS" },
    ],
    reviews: baseReviews, shippingFrom: "Suède", estimatedDelivery: "5 à 8 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  // ───────── BEAUTÉ ─────────
  {
    id: "p32", slug: "rouge-levres-velours", title: "Rouge à lèvres Velours rouge classique",
    brand: "Maison Verte", description: "Rouge à lèvres mat longue tenue 12 h, formule à l'huile de jojoba bio, vegan. 18 nuances disponibles.",
    category: "beaute", categoryPath: ["Beauté", "Maquillage", "Lèvres"], seller: SELLERS[3],
    images: ["/p-lipstick.jpg"], price: 24, currency: "EUR",
    rating: 4.7, reviewCount: 2820, sold: 14820, badges: ["bestseller", "eco"],
    variants: [
      { id: "v1", label: "Rouge classique", attrs: { Nuance: "Rouge classique" }, price: 24, stock: 142, sku: "MV-RGCL" },
      { id: "v2", label: "Rose nude", attrs: { Nuance: "Rose nude" }, price: 24, stock: 92, sku: "MV-RGNU" },
      { id: "v3", label: "Brique", attrs: { Nuance: "Brique" }, price: 24, stock: 64, sku: "MV-RGBR" },
    ],
    reviews: baseReviews, shippingFrom: "Italie", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Retour sous 30 jours (non ouvert)",
  },
  {
    id: "p33", slug: "parfum-iris-noir", title: "Eau de parfum Iris Noir 50 ml — note boisée",
    brand: "Maison Verte", description: "Eau de parfum mixte aux notes de poire, iris et bois de cèdre. Tenue 8 h, flacon ambré rechargeable. Composé en France.",
    category: "beaute", categoryPath: ["Beauté", "Parfum", "Eau de parfum"], seller: SELLERS[3],
    images: ["/p-perfume.jpg"], price: 89, compareAtPrice: 119, currency: "EUR",
    rating: 4.8, reviewCount: 1240, sold: 6420, badges: ["new", "premium"],
    variants: [
      { id: "v1", label: "50 ml", attrs: { Format: "50 ml" }, price: 89, compareAtPrice: 119, stock: 58, sku: "IRN-50" },
      { id: "v2", label: "100 ml", attrs: { Format: "100 ml" }, price: 139, compareAtPrice: 179, stock: 32, sku: "IRN-100" },
    ],
    reviews: baseReviews, shippingFrom: "Italie", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Retour sous 30 jours (non ouvert)",
  },
  {
    id: "p34", slug: "masque-argile-purifiant", title: "Masque argile rose purifiant pot 100 ml",
    brand: "Maison Verte", description: "Masque visage à l'argile rose et hydrolat de rose, action purifiante douce, certifié Cosmos Organic. Convient aux peaux sensibles.",
    category: "beaute", categoryPath: ["Beauté", "Soins visage", "Masques"], seller: SELLERS[3],
    images: ["/p-mask.jpg"], price: 22, currency: "EUR",
    rating: 4.6, reviewCount: 924, sold: 5120, badges: ["eco"],
    variants: [
      { id: "v1", label: "100 ml", attrs: { Format: "100 ml" }, price: 22, stock: 184, sku: "MQ-100" },
    ],
    reviews: baseReviews, shippingFrom: "Italie", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Retour sous 30 jours (non ouvert)",
  },
  {
    id: "p35", slug: "palette-yeux-terre", title: "Palette yeux Terre 12 nuances chaudes",
    brand: "Maison Verte", description: "Palette 12 fards hautement pigmentés, finis mats et satinés, formule vegan sans parabène. Miroir intégré, applicateur double.",
    category: "beaute", categoryPath: ["Beauté", "Maquillage", "Yeux"], seller: SELLERS[3],
    images: ["/p-palette.jpg"], price: 49, compareAtPrice: 69, currency: "EUR",
    rating: 4.7, reviewCount: 612, sold: 3210, badges: ["bestseller"],
    variants: [
      { id: "v1", label: "Terre", attrs: { Collection: "Terre" }, price: 49, compareAtPrice: 69, stock: 92, sku: "PAL-TR" },
    ],
    reviews: baseReviews, shippingFrom: "Italie", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Retour sous 30 jours (non ouvert)",
  },
  {
    id: "p36", slug: "set-pinceaux-bambou", title: "Set 8 pinceaux maquillage bambou poils synthétiques",
    brand: "Maison Verte", description: "Lot de 8 pinceaux essentiels en bambou FSC, poils synthétiques cruelty-free. Pochette de transport en lin offerte.",
    category: "beaute", categoryPath: ["Beauté", "Accessoires", "Pinceaux"], seller: SELLERS[3],
    images: ["/p-brush.jpg"], price: 39, currency: "EUR",
    rating: 4.8, reviewCount: 412, sold: 2120, badges: ["eco"],
    variants: [
      { id: "v1", label: "Set 8 pinceaux", attrs: { Quantité: "8 pinceaux" }, price: 39, stock: 142, sku: "PIN-8" },
    ],
    reviews: baseReviews, shippingFrom: "Italie", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p37", slug: "kit-voyage-soins", title: "Kit voyage soins essentiels 5 pièces",
    brand: "Maison Verte", description: "Kit voyage avion : nettoyant 50 ml, sérum 15 ml, crème jour 30 ml, baume lèvres et trousse en lin. Tous formats < 100 ml.",
    category: "beaute", categoryPath: ["Beauté", "Soins visage", "Kits"], seller: SELLERS[3],
    images: ["/p-travelkit.jpg"], price: 45, compareAtPrice: 65, currency: "EUR",
    rating: 4.7, reviewCount: 318, sold: 1820, badges: ["new"],
    variants: [
      { id: "v1", label: "Kit standard", attrs: { Pack: "5 pièces" }, price: 45, compareAtPrice: 65, stock: 78, sku: "KIT-VOY" },
    ],
    reviews: baseReviews, shippingFrom: "Italie", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Retour sous 30 jours (non ouvert)",
  },
  // ───────── SPORT ─────────
  {
    id: "p38", slug: "tapis-yoga-liege", title: "Tapis de yoga Cork Pro liège naturel 5 mm",
    brand: "Trail", description: "Tapis 183x68 cm en liège naturel et caoutchouc TPE, anti-dérapant, 5 mm d'épaisseur. Sangle de transport offerte.",
    category: "sport", categoryPath: ["Sport", "Yoga", "Tapis"], seller: SELLERS[2],
    images: ["/p-yogamat.jpg"], price: 79, compareAtPrice: 109, currency: "EUR",
    rating: 4.7, reviewCount: 1420, sold: 7820, badges: ["bestseller", "eco"],
    variants: [
      { id: "v1", label: "Liège 5 mm", attrs: { Épaisseur: "5 mm" }, price: 79, compareAtPrice: 109, stock: 124, sku: "YOG-5" },
      { id: "v2", label: "Liège 8 mm", attrs: { Épaisseur: "8 mm" }, price: 99, compareAtPrice: 129, stock: 64, sku: "YOG-8" },
    ],
    reviews: baseReviews, shippingFrom: "Allemagne", estimatedDelivery: "2 à 4 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p39", slug: "halteres-hex-paire", title: "Paire d'haltères hexagonaux fonte revêtement caoutchouc",
    brand: "Trail", description: "Paire d'haltères hexagonaux fonte 10 kg, revêtement caoutchouc anti-rayures, poignée acier moletée. Garantie à vie.",
    category: "sport", categoryPath: ["Sport", "Musculation", "Haltères"], seller: SELLERS[2],
    images: ["/p-dumbbells.jpg"], price: 59, currency: "EUR",
    rating: 4.8, reviewCount: 824, sold: 4120, badges: [],
    variants: [
      { id: "v1", label: "Paire 5 kg", attrs: { Poids: "5 kg" }, price: 39, stock: 84, sku: "HLT-5" },
      { id: "v2", label: "Paire 10 kg", attrs: { Poids: "10 kg" }, price: 59, stock: 64, sku: "HLT-10" },
      { id: "v3", label: "Paire 15 kg", attrs: { Poids: "15 kg" }, price: 89, stock: 38, sku: "HLT-15" },
    ],
    reviews: baseReviews, shippingFrom: "Allemagne", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p40", slug: "montre-running-tempo", title: "Montre running Tempo GPS multi-bandes triathlon",
    brand: "Pulse", description: "Montre running et triathlon, GPS multi-bandes, 80 profils sportifs, autonomie 36 h en GPS, ECG, suivi sommeil avancé.",
    category: "sport", categoryPath: ["Sport", "Running", "Montres"], seller: SELLERS[2],
    images: ["/p-runner.jpg"], price: 379, compareAtPrice: 449, currency: "EUR",
    rating: 4.8, reviewCount: 624, sold: 2820, badges: ["new", "premium"],
    variants: [
      { id: "v1", label: "Noir 47 mm", attrs: { Couleur: "Noir", Taille: "47 mm" }, price: 379, compareAtPrice: 449, stock: 28, sku: "TMP-47" },
      { id: "v2", label: "Bleu 42 mm", attrs: { Couleur: "Bleu", Taille: "42 mm" }, price: 379, compareAtPrice: 449, stock: 18, sku: "TMP-42" },
    ],
    reviews: baseReviews, shippingFrom: "Allemagne", estimatedDelivery: "1 à 3 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p41", slug: "raquette-tennis-pro", title: "Raquette tennis Pro 300 g cordage hybride",
    brand: "Trail", description: "Raquette compétition 300 g, tamis 645 cm², cordage hybride graphite. Idéale joueurs intermédiaires et confirmés.",
    category: "sport", categoryPath: ["Sport", "Tennis", "Raquettes"], seller: SELLERS[2],
    images: ["/p-tennis.jpg"], price: 189, compareAtPrice: 249, currency: "EUR",
    rating: 4.6, reviewCount: 312, sold: 1240, badges: ["flash"],
    variants: [
      { id: "v1", label: "Manche L2", attrs: { Manche: "L2" }, price: 189, compareAtPrice: 249, stock: 28, sku: "TEN-L2" },
      { id: "v2", label: "Manche L3", attrs: { Manche: "L3" }, price: 189, compareAtPrice: 249, stock: 38, sku: "TEN-L3" },
      { id: "v3", label: "Manche L4", attrs: { Manche: "L4" }, price: 189, compareAtPrice: 249, stock: 22, sku: "TEN-L4" },
    ],
    reviews: baseReviews, shippingFrom: "Allemagne", estimatedDelivery: "2 à 4 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p42", slug: "sac-sport-canvas-30l", title: "Sac de sport Athlete canvas 30 L poignées cuir",
    brand: "Trail", description: "Sac duffel 30 L canvas robuste, poignées et bandoulière cuir, compartiment chaussures ventilé. Coloris charbon ou olive.",
    category: "sport", categoryPath: ["Sport", "Bagagerie", "Sacs de sport"], seller: SELLERS[2],
    images: ["/p-gymbag.jpg"], price: 89, compareAtPrice: 119, currency: "EUR",
    rating: 4.7, reviewCount: 624, sold: 3120, badges: ["bestseller"],
    variants: [
      { id: "v1", label: "Charbon", attrs: { Couleur: "Charbon" }, price: 89, compareAtPrice: 119, stock: 92, sku: "ATH-CH" },
      { id: "v2", label: "Olive", attrs: { Couleur: "Olive" }, price: 89, compareAtPrice: 119, stock: 64, sku: "ATH-OL" },
    ],
    reviews: baseReviews, shippingFrom: "Allemagne", estimatedDelivery: "2 à 4 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  // ───────── ENFANT ─────────
  {
    id: "p43", slug: "peluche-ours-bio", title: "Peluche ours Eddy coton bio 35 cm",
    brand: "Studio Kobe", description: "Peluche ours doudou en coton bio certifié GOTS, rembourrage fibres recyclées, sans plastique. Lavable en machine.",
    category: "enfant", categoryPath: ["Enfant", "Jouets", "Peluches"], seller: SELLERS[4],
    images: ["/p-plush.jpg"], price: 39, currency: "EUR",
    rating: 4.9, reviewCount: 824, sold: 5820, badges: ["bestseller", "eco"],
    variants: [
      { id: "v1", label: "Crème 35 cm", attrs: { Couleur: "Crème", Taille: "35 cm" }, price: 39, stock: 184, sku: "EDD-35" },
      { id: "v2", label: "Crème 50 cm", attrs: { Couleur: "Crème", Taille: "50 cm" }, price: 59, stock: 92, sku: "EDD-50" },
    ],
    reviews: baseReviews, shippingFrom: "Japon", estimatedDelivery: "5 à 8 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p44", slug: "blocs-bois-50pcs", title: "Set 50 blocs en bois naturel jeu construction",
    brand: "Studio Kobe", description: "50 blocs en hêtre naturel non traité, formes variées, rangés dans une boîte en bois. Stimule motricité fine et créativité.",
    category: "enfant", categoryPath: ["Enfant", "Jouets", "Construction"], seller: SELLERS[4],
    images: ["/p-blocks.jpg"], price: 49, compareAtPrice: 65, currency: "EUR",
    rating: 4.8, reviewCount: 612, sold: 3120, badges: ["eco", "bestseller"],
    variants: [
      { id: "v1", label: "Set 50 pièces", attrs: { Pack: "50 pièces" }, price: 49, compareAtPrice: 65, stock: 142, sku: "BLC-50" },
      { id: "v2", label: "Set 100 pièces", attrs: { Pack: "100 pièces" }, price: 79, compareAtPrice: 99, stock: 64, sku: "BLC-100" },
    ],
    reviews: baseReviews, shippingFrom: "Japon", estimatedDelivery: "5 à 8 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p45", slug: "draisienne-rose", title: "Draisienne enfant Bloom rose pâle 2-5 ans",
    brand: "Trail", description: "Draisienne enfant 2-5 ans, cadre acier laqué rose pâle, selle réglable, pneus gonflés. Apprentissage de l'équilibre en douceur.",
    category: "enfant", categoryPath: ["Enfant", "Mobilité", "Draisiennes"], seller: SELLERS[2],
    images: ["/p-kidbike.jpg"], price: 99, compareAtPrice: 139, currency: "EUR",
    rating: 4.7, reviewCount: 412, sold: 1840, badges: ["new"],
    variants: [
      { id: "v1", label: "Rose pâle", attrs: { Couleur: "Rose pâle" }, price: 99, compareAtPrice: 139, stock: 38, sku: "BLM-RP" },
      { id: "v2", label: "Sauge", attrs: { Couleur: "Sauge" }, price: 99, compareAtPrice: 139, stock: 28, sku: "BLM-SA" },
    ],
    reviews: baseReviews, shippingFrom: "Allemagne", estimatedDelivery: "2 à 5 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p46", slug: "kit-aquarelle-junior", title: "Kit aquarelle Junior 24 couleurs boîte bois",
    brand: "Studio Kobe", description: "Boîte en bois avec 24 godets aquarelle, 3 pinceaux, 20 feuilles 200 g/m². Pigments non toxiques, certifiés CE.",
    category: "enfant", categoryPath: ["Enfant", "Loisirs créatifs", "Peinture"], seller: SELLERS[4],
    images: ["/p-artkit.jpg"], price: 29, currency: "EUR",
    rating: 4.7, reviewCount: 318, sold: 1620, badges: ["new"],
    variants: [
      { id: "v1", label: "24 couleurs", attrs: { Pack: "24 couleurs" }, price: 29, stock: 124, sku: "AQR-24" },
      { id: "v2", label: "36 couleurs", attrs: { Pack: "36 couleurs" }, price: 39, stock: 78, sku: "AQR-36" },
    ],
    reviews: baseReviews, shippingFrom: "Japon", estimatedDelivery: "5 à 8 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  // ───────── AUTO & MOTO ─────────
  {
    id: "p47", slug: "casque-moto-vector", title: "Casque moto Vector intégral fibre carbone",
    brand: "Trail", description: "Casque intégral fibre carbone, homologué ECE 22.06, écran solaire intégré, ventilation avancée. Garantie 5 ans.",
    category: "auto", categoryPath: ["Auto & Moto", "Moto", "Casques"], seller: SELLERS[2],
    images: ["/p-helmet.jpg"], price: 349, compareAtPrice: 449, currency: "EUR",
    rating: 4.7, reviewCount: 412, sold: 1820, badges: ["bestseller", "premium"],
    variants: [
      { id: "v1", label: "Noir mat M", attrs: { Couleur: "Noir mat", Taille: "M" }, price: 349, compareAtPrice: 449, stock: 22, sku: "VEC-M" },
      { id: "v2", label: "Noir mat L", attrs: { Couleur: "Noir mat", Taille: "L" }, price: 349, compareAtPrice: 449, stock: 28, sku: "VEC-L" },
      { id: "v3", label: "Noir mat XL", attrs: { Couleur: "Noir mat", Taille: "XL" }, price: 349, compareAtPrice: 449, stock: 14, sku: "VEC-XL" },
    ],
    reviews: baseReviews, shippingFrom: "Allemagne", estimatedDelivery: "2 à 4 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p48", slug: "booster-batterie-voiture", title: "Booster batterie voiture portable 2000 A USB-C",
    brand: "Aurora Audio", description: "Démarreur portable 2000 A pour véhicules essence et diesel jusqu'à 8 L. Batterie 20 000 mAh, lampe LED, ports USB-C et USB-A.",
    category: "auto", categoryPath: ["Auto & Moto", "Voiture", "Batteries"], seller: SELLERS[2],
    images: ["/p-charger.jpg"], price: 99, compareAtPrice: 139, currency: "EUR",
    rating: 4.8, reviewCount: 1820, sold: 8420, badges: ["flash", "bestseller"],
    variants: [
      { id: "v1", label: "2000 A", attrs: { Puissance: "2000 A" }, price: 99, compareAtPrice: 139, stock: 84, sku: "BST-2000" },
      { id: "v2", label: "3000 A Pro", attrs: { Puissance: "3000 A" }, price: 149, compareAtPrice: 199, stock: 38, sku: "BST-3000" },
    ],
    reviews: baseReviews, shippingFrom: "Allemagne", estimatedDelivery: "1 à 3 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p49", slug: "kit-detailing-voiture", title: "Kit detailing voiture 12 pièces nettoyage premium",
    brand: "Trail", description: "Kit complet 12 pièces : shampoing carrosserie, cire de carnauba, nettoyant jantes, microfibres, brosses. Convient toutes finitions.",
    category: "auto", categoryPath: ["Auto & Moto", "Voiture", "Entretien"], seller: SELLERS[2],
    images: ["/p-cleankit.jpg"], price: 79, compareAtPrice: 109, currency: "EUR",
    rating: 4.6, reviewCount: 524, sold: 2820, badges: [],
    variants: [
      { id: "v1", label: "Kit 12 pièces", attrs: { Pack: "12 pièces" }, price: 79, compareAtPrice: 109, stock: 64, sku: "DTL-12" },
    ],
    reviews: baseReviews, shippingFrom: "Allemagne", estimatedDelivery: "2 à 4 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  // ───────── ALIMENTATION ─────────
  {
    id: "p50", slug: "huile-olive-toscane", title: "Huile d'olive Toscane extra vierge bio 500 ml",
    brand: "Maison Verte", description: "Huile d'olive extra vierge AOC Toscane, première pression à froid, oliveraies bio à Florence. Récolte 2025, fruité intense.",
    category: "alimentation", categoryPath: ["Alimentation", "Épicerie", "Huiles"], seller: SELLERS[3],
    images: ["/p-oliveoil.jpg"], price: 24, currency: "EUR",
    rating: 4.9, reviewCount: 1240, sold: 7820, badges: ["bestseller", "eco"],
    variants: [
      { id: "v1", label: "500 ml", attrs: { Format: "500 ml" }, price: 24, stock: 184, sku: "HOT-500" },
      { id: "v2", label: "1 L", attrs: { Format: "1 L" }, price: 42, stock: 92, sku: "HOT-1L" },
    ],
    reviews: baseReviews, shippingFrom: "Italie", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Non retournable",
  },
  {
    id: "p51", slug: "miel-acacia-artisan", title: "Miel d'acacia artisanal pot 500 g France",
    brand: "Maison Verte", description: "Miel d'acacia récolté par notre apiculteur partenaire en Provence, non chauffé, non filtré. Cristallisation lente naturelle.",
    category: "alimentation", categoryPath: ["Alimentation", "Épicerie", "Miels"], seller: SELLERS[3],
    images: ["/p-honey.jpg"], price: 18, currency: "EUR",
    rating: 4.8, reviewCount: 824, sold: 4820, badges: ["bestseller", "eco"],
    variants: [
      { id: "v1", label: "500 g", attrs: { Format: "500 g" }, price: 18, stock: 142, sku: "MIE-500" },
      { id: "v2", label: "1 kg", attrs: { Format: "1 kg" }, price: 32, stock: 78, sku: "MIE-1KG" },
    ],
    reviews: baseReviews, shippingFrom: "Italie", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Non retournable",
  },
  {
    id: "p52", slug: "cafe-grain-ethiopie", title: "Café grains Éthiopie Yirgacheffe 1 kg torréfié main",
    brand: "Maison Verte", description: "Café 100 % arabica Yirgacheffe (Éthiopie), torréfaction artisanale toscane. Notes florales, fruits rouges, cacao. Sachet refermable 1 kg.",
    category: "alimentation", categoryPath: ["Alimentation", "Boissons", "Café"], seller: SELLERS[3],
    images: ["/p-coffeebag.jpg"], price: 32, currency: "EUR",
    rating: 4.8, reviewCount: 612, sold: 3120, badges: ["bestseller"],
    variants: [
      { id: "v1", label: "1 kg grains", attrs: { Format: "1 kg", Forme: "Grains" }, price: 32, stock: 124, sku: "CAF-1KG-G" },
      { id: "v2", label: "1 kg moulu", attrs: { Format: "1 kg", Forme: "Moulu" }, price: 32, stock: 64, sku: "CAF-1KG-M" },
    ],
    reviews: baseReviews, shippingFrom: "Italie", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Non retournable",
  },
  {
    id: "p53", slug: "sac-cuir-cognac-aurelie", title: "Sac à main cuir cognac Aurélie — pleine fleur Italie",
    brand: "Atelier Lumen", description: "Sac à main en cuir pleine fleur tannage végétal, fermoir laiton vieilli, doublure suédine, fabrication italienne. Compartiment intérieur zippé, bandoulière amovible.",
    category: "mode", categoryPath: ["Mode", "Maroquinerie", "Sacs"], seller: SELLERS[0],
    images: ["/product-bag-cognac.jpg"], price: 245, compareAtPrice: 320, currency: "EUR",
    rating: 4.9, reviewCount: 482, sold: 2140, badges: ["new", "premium"],
    variants: [
      { id: "v1", label: "Cognac", attrs: { Couleur: "Cognac" }, price: 245, compareAtPrice: 320, stock: 18, sku: "AUR-COG" },
      { id: "v2", label: "Noir", attrs: { Couleur: "Noir" }, price: 245, compareAtPrice: 320, stock: 12, sku: "AUR-BLK" },
    ],
    reviews: baseReviews, shippingFrom: "Italie", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p54", slug: "blazer-laine-marine-savile", title: "Blazer laine vierge marine Savile — coupe ajustée",
    brand: "Studio Kobe", description: "Blazer en laine vierge tissée en Italie, coupe ajustée, doublure cupro, deux poches passepoilées, finitions cousues main. Élégance intemporelle.",
    category: "mode", categoryPath: ["Mode", "Vestes", "Blazers"], seller: SELLERS[4],
    images: ["/product-blazer.jpg"], price: 289, compareAtPrice: 420, currency: "EUR",
    rating: 4.8, reviewCount: 326, sold: 1480, badges: ["premium"],
    variants: [
      { id: "v1", label: "Marine / 48", attrs: { Couleur: "Marine", Taille: "48" }, price: 289, compareAtPrice: 420, stock: 14, sku: "SAV-MAR-48" },
      { id: "v2", label: "Marine / 50", attrs: { Couleur: "Marine", Taille: "50" }, price: 289, compareAtPrice: 420, stock: 9, sku: "SAV-MAR-50" },
      { id: "v3", label: "Anthracite / 50", attrs: { Couleur: "Anthracite", Taille: "50" }, price: 289, compareAtPrice: 420, stock: 6, sku: "SAV-ANT-50" },
    ],
    reviews: baseReviews, shippingFrom: "Italie", estimatedDelivery: "4 à 6 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p55", slug: "jean-selvedge-indigo-rebel", title: "Jean selvedge indigo brut Rebel 14 oz — coupe droite",
    brand: "Runway", description: "Jean en denim selvedge japonais 14 oz, indigo profond non lavé, coupe droite. S'épatine au fil des ports pour une patine unique. Coutures rouges signature.",
    category: "mode", categoryPath: ["Mode", "Pantalons", "Jeans"], seller: SELLERS[4],
    images: ["/product-jeans.jpg"], price: 145, compareAtPrice: 195, currency: "EUR",
    rating: 4.7, reviewCount: 1240, sold: 6820, badges: ["bestseller"],
    variants: [
      { id: "v1", label: "Indigo / 30", attrs: { Couleur: "Indigo", Taille: "30" }, price: 145, compareAtPrice: 195, stock: 22, sku: "REB-IND-30" },
      { id: "v2", label: "Indigo / 32", attrs: { Couleur: "Indigo", Taille: "32" }, price: 145, compareAtPrice: 195, stock: 28, sku: "REB-IND-32" },
      { id: "v3", label: "Indigo / 34", attrs: { Couleur: "Indigo", Taille: "34" }, price: 145, compareAtPrice: 195, stock: 16, sku: "REB-IND-34" },
    ],
    reviews: baseReviews, shippingFrom: "Japon", estimatedDelivery: "5 à 8 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p56", slug: "foulard-soie-eden", title: "Foulard 100 % soie Éden imprimé floral",
    brand: "Maison Verte", description: "Foulard carré 90×90 cm en pure soie twill 14 mm, ourlets roulottés à la main. Imprimé floral exclusif crème, rouille, sauge.",
    category: "mode", categoryPath: ["Mode", "Accessoires", "Foulards"], seller: SELLERS[3],
    images: ["/product-scarf.jpg"], price: 89, compareAtPrice: 125, currency: "EUR",
    rating: 4.9, reviewCount: 218, sold: 980, badges: ["new"],
    variants: [
      { id: "v1", label: "Crème floral", attrs: { Motif: "Crème floral" }, price: 89, compareAtPrice: 125, stock: 32, sku: "EDN-CRM" },
      { id: "v2", label: "Marine floral", attrs: { Motif: "Marine floral" }, price: 89, compareAtPrice: 125, stock: 18, sku: "EDN-MAR" },
    ],
    reviews: baseReviews, shippingFrom: "Italie", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p57", slug: "bottines-cuir-aurore", title: "Bottines cuir Aurore semelle crantée",
    brand: "Studio Kobe", description: "Bottines en cuir lisse noir, doublure cuir, semelle crantée crêpe naturel, zip latéral. Confort longue durée.",
    category: "mode", categoryPath: ["Mode", "Chaussures", "Bottines"], seller: SELLERS[4],
    images: ["/product-boots.jpg"], price: 175, compareAtPrice: 240, currency: "EUR",
    rating: 4.8, reviewCount: 542, sold: 2840, badges: ["bestseller"],
    variants: [
      { id: "v1", label: "Noir / 38", attrs: { Couleur: "Noir", Pointure: "38" }, price: 175, compareAtPrice: 240, stock: 12, sku: "AUR-BK-38" },
      { id: "v2", label: "Noir / 39", attrs: { Couleur: "Noir", Pointure: "39" }, price: 175, compareAtPrice: 240, stock: 18, sku: "AUR-BK-39" },
      { id: "v3", label: "Cognac / 39", attrs: { Couleur: "Cognac", Pointure: "39" }, price: 175, compareAtPrice: 240, stock: 8, sku: "AUR-CG-39" },
    ],
    reviews: baseReviews, shippingFrom: "Japon", estimatedDelivery: "5 à 8 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p58", slug: "parka-quilt-yukon", title: "Parka matelassée Yukon imperméable capuche fourrure",
    brand: "TechWave Global", description: "Parka matelassée garnie en duvet recyclé, membrane imperméable 10 000 mm, capuche amovible bordée de fausse fourrure. Coupe longueur cuisse, 4 poches.",
    category: "mode", categoryPath: ["Mode", "Manteaux", "Parkas"], seller: SELLERS[2],
    images: ["/product-parka.jpg"], price: 235, compareAtPrice: 360, currency: "EUR",
    rating: 4.7, reviewCount: 412, sold: 1620, badges: ["flash", "eco"],
    variants: [
      { id: "v1", label: "Olive / M", attrs: { Couleur: "Olive", Taille: "M" }, price: 235, compareAtPrice: 360, stock: 18, sku: "YUK-OLI-M" },
      { id: "v2", label: "Olive / L", attrs: { Couleur: "Olive", Taille: "L" }, price: 235, compareAtPrice: 360, stock: 12, sku: "YUK-OLI-L" },
      { id: "v3", label: "Noir / M", attrs: { Couleur: "Noir", Taille: "M" }, price: 235, compareAtPrice: 360, stock: 14, sku: "YUK-BK-M" },
    ],
    reviews: baseReviews, shippingFrom: "Allemagne", estimatedDelivery: "2 à 4 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p59", slug: "smartwatch-orbis-fit", title: "Smartwatch Orbis Fit GPS — autonomie 14 jours",
    brand: "TechWave Global", description: "Montre connectée écran AMOLED 1,4\", GPS multi-bande, capteur cardiaque, SpO2, 100+ sports, étanche 5 ATM. Autonomie 14 jours.",
    category: "tech", categoryPath: ["Tech", "Wearables", "Smartwatches"], seller: SELLERS[2],
    images: ["/product-smartwatch.jpg"], price: 199, compareAtPrice: 279, currency: "EUR",
    rating: 4.7, reviewCount: 1840, sold: 9420, badges: ["flash", "bestseller"],
    variants: [
      { id: "v1", label: "Noir", attrs: { Couleur: "Noir" }, price: 199, compareAtPrice: 279, stock: 84, sku: "ORB-FIT-BK" },
      { id: "v2", label: "Argent", attrs: { Couleur: "Argent" }, price: 199, compareAtPrice: 279, stock: 42, sku: "ORB-FIT-SL" },
      { id: "v3", label: "Or rose", attrs: { Couleur: "Or rose" }, price: 209, compareAtPrice: 279, stock: 24, sku: "ORB-FIT-RG" },
    ],
    reviews: baseReviews, shippingFrom: "Allemagne", estimatedDelivery: "2 à 4 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p60", slug: "enceinte-bluetooth-stone", title: "Enceinte Bluetooth Stone 360° — son immersif 24h",
    brand: "Aurora Audio", description: "Enceinte Bluetooth 5.3 à diffusion 360°, son immersif 30W, basses puissantes, étanche IPX7, autonomie 24h, charge USB-C.",
    category: "tech", categoryPath: ["Tech", "Audio", "Enceintes"], seller: SELLERS[2],
    images: ["/product-speaker.jpg"], price: 89, compareAtPrice: 129, currency: "EUR",
    rating: 4.6, reviewCount: 920, sold: 4820, badges: ["flash"],
    variants: [
      { id: "v1", label: "Sable", attrs: { Couleur: "Sable" }, price: 89, compareAtPrice: 129, stock: 142, sku: "STN-SAB" },
      { id: "v2", label: "Anthracite", attrs: { Couleur: "Anthracite" }, price: 89, compareAtPrice: 129, stock: 86, sku: "STN-ANT" },
    ],
    reviews: baseReviews, shippingFrom: "Allemagne", estimatedDelivery: "2 à 4 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p61", slug: "drone-skyline-4k", title: "Drone Skyline 4K — caméra stabilisée 3 axes",
    brand: "TechWave Global", description: "Drone pliable 249g, caméra 4K 60fps stabilisée 3 axes, autonomie 31 min, retour automatique GPS, transmission HD 10 km. Catégorie C0 sans permis.",
    category: "tech", categoryPath: ["Tech", "Drones", "Caméra"], seller: SELLERS[2],
    images: ["/product-drone.jpg"], price: 549, compareAtPrice: 699, currency: "EUR",
    rating: 4.8, reviewCount: 412, sold: 1240, badges: ["new", "premium"],
    variants: [
      { id: "v1", label: "Standard", attrs: { Pack: "Standard" }, price: 549, compareAtPrice: 699, stock: 24, sku: "SKY-STD" },
      { id: "v2", label: "Fly More Combo", attrs: { Pack: "Fly More Combo" }, price: 749, compareAtPrice: 899, stock: 12, sku: "SKY-FMC" },
    ],
    reviews: baseReviews, shippingFrom: "Allemagne", estimatedDelivery: "2 à 4 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p62", slug: "robot-aspirateur-clean-pro", title: "Robot aspirateur laveur Clean Pro — cartographie laser",
    brand: "TechWave Global", description: "Robot aspirateur et laveur 2-en-1, cartographie laser LiDAR, aspiration 6 000 Pa, navigation pièce par pièce, autonomie 180 min, station d'auto-vidange.",
    category: "tech", categoryPath: ["Tech", "Maison connectée", "Robots"], seller: SELLERS[2],
    images: ["/product-robot.jpg"], price: 449, compareAtPrice: 649, currency: "EUR",
    rating: 4.7, reviewCount: 624, sold: 2120, badges: ["flash", "bestseller"],
    variants: [
      { id: "v1", label: "Sans station", attrs: { Pack: "Sans station" }, price: 449, compareAtPrice: 649, stock: 32, sku: "CLN-PRO" },
      { id: "v2", label: "Avec station auto-vidange", attrs: { Pack: "Avec station" }, price: 599, compareAtPrice: 799, stock: 18, sku: "CLN-PRO-S" },
    ],
    reviews: baseReviews, shippingFrom: "Allemagne", estimatedDelivery: "2 à 4 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p63", slug: "ecouteurs-sport-pulse", title: "Écouteurs sport Pulse — IPX7 maintien sécurisé",
    brand: "Aurora Audio", description: "Écouteurs sport Bluetooth 5.3 à crochets ergonomiques, certification IPX7, ANC, 32h d'autonomie avec étui, micro intégré.",
    category: "tech", categoryPath: ["Tech", "Audio", "Écouteurs"], seller: SELLERS[2],
    images: ["/product-earbuds.jpg"], price: 129, compareAtPrice: 179, currency: "EUR",
    rating: 4.6, reviewCount: 1620, sold: 8420, badges: ["bestseller"],
    variants: [
      { id: "v1", label: "Blanc", attrs: { Couleur: "Blanc" }, price: 129, compareAtPrice: 179, stock: 142, sku: "PLS-WH" },
      { id: "v2", label: "Noir", attrs: { Couleur: "Noir" }, price: 129, compareAtPrice: 179, stock: 84, sku: "PLS-BK" },
    ],
    reviews: baseReviews, shippingFrom: "Allemagne", estimatedDelivery: "2 à 4 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p64", slug: "station-charge-trio", title: "Station de charge Trio sans-fil 3-en-1 MagSafe",
    brand: "TechWave Global", description: "Station de charge sans fil 3-en-1 compatible MagSafe : iPhone, Apple Watch et AirPods. 15W rapide, certification Qi2, base aluminium anodisé.",
    category: "tech", categoryPath: ["Tech", "Accessoires", "Chargeurs"], seller: SELLERS[2],
    images: ["/product-charger.jpg"], price: 79, compareAtPrice: 119, currency: "EUR",
    rating: 4.7, reviewCount: 824, sold: 4120, badges: ["flash"],
    variants: [
      { id: "v1", label: "Noir", attrs: { Couleur: "Noir" }, price: 79, compareAtPrice: 119, stock: 184, sku: "TRIO-BK" },
      { id: "v2", label: "Blanc", attrs: { Couleur: "Blanc" }, price: 79, compareAtPrice: 119, stock: 124, sku: "TRIO-WH" },
    ],
    reviews: baseReviews, shippingFrom: "Allemagne", estimatedDelivery: "2 à 4 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p65", slug: "parure-lit-lin-stonewash", title: "Parure de lit lin lavé stonewash 240×260 — 3 pièces",
    brand: "NordicHome", description: "Parure de lit en lin français lavé stonewash, douceur immédiate, certifié OEKO-TEX. Housse de couette 240×260 + 2 taies 65×65. Coloris naturels.",
    category: "maison", categoryPath: ["Maison", "Linge de lit", "Parures"], seller: SELLERS[1],
    images: ["/product-bedding.jpg"], price: 159, compareAtPrice: 229, currency: "EUR",
    rating: 4.9, reviewCount: 482, sold: 1840, badges: ["bestseller", "eco"],
    variants: [
      { id: "v1", label: "Sable / 240×260", attrs: { Couleur: "Sable", Taille: "240×260" }, price: 159, compareAtPrice: 229, stock: 24, sku: "LIN-SAB-240" },
      { id: "v2", label: "Argile / 240×260", attrs: { Couleur: "Argile", Taille: "240×260" }, price: 159, compareAtPrice: 229, stock: 18, sku: "LIN-ARG-240" },
      { id: "v3", label: "Brume / 240×260", attrs: { Couleur: "Brume", Taille: "240×260" }, price: 159, compareAtPrice: 229, stock: 12, sku: "LIN-BRU-240" },
    ],
    reviews: baseReviews, shippingFrom: "Suède", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p66", slug: "vase-ceramique-sculpture", title: "Vase céramique sculptural Forme Libre — fait main",
    brand: "Atelier Lumen", description: "Vase en grès émaillé blanc cassé, modelé à la main par un artisan céramiste français. Pièce unique, finition mate satinée.",
    category: "maison", categoryPath: ["Maison", "Décoration", "Vases"], seller: SELLERS[0],
    images: ["/product-vase.jpg"], price: 119, compareAtPrice: 165, currency: "EUR",
    rating: 4.8, reviewCount: 162, sold: 480, badges: ["new", "premium"],
    variants: [
      { id: "v1", label: "Blanc cassé", attrs: { Couleur: "Blanc cassé" }, price: 119, compareAtPrice: 165, stock: 18, sku: "FRM-WH" },
      { id: "v2", label: "Terre cuite", attrs: { Couleur: "Terre cuite" }, price: 119, compareAtPrice: 165, stock: 12, sku: "FRM-TC" },
    ],
    reviews: baseReviews, shippingFrom: "France", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p67", slug: "miroir-rond-laiton-soleil", title: "Miroir rond cadre laiton Soleil Ø80 cm",
    brand: "Atelier Lumen", description: "Miroir rond 80 cm, fin cadre en laiton brossé, dos en MDF, accroche murale. Ajoute lumière et profondeur à toute pièce.",
    category: "maison", categoryPath: ["Maison", "Décoration", "Miroirs"], seller: SELLERS[0],
    images: ["/product-mirror.jpg"], price: 149, compareAtPrice: 219, currency: "EUR",
    rating: 4.8, reviewCount: 284, sold: 1240, badges: ["bestseller"],
    variants: [
      { id: "v1", label: "Laiton brossé Ø80", attrs: { Finition: "Laiton brossé", Diamètre: "80 cm" }, price: 149, compareAtPrice: 219, stock: 24, sku: "SOL-LT-80" },
      { id: "v2", label: "Noir mat Ø80", attrs: { Finition: "Noir mat", Diamètre: "80 cm" }, price: 149, compareAtPrice: 219, stock: 18, sku: "SOL-BK-80" },
    ],
    reviews: baseReviews, shippingFrom: "France", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p68", slug: "bougie-soja-cedre-iris", title: "Bougie soja Cèdre & Iris 220 g — fabriquée à Grasse",
    brand: "Maison Verte", description: "Bougie parfumée 100 % cire de soja, mèche coton, fragrance Cèdre & Iris fabriquée à Grasse. 50h de combustion. Pot verre ambré.",
    category: "maison", categoryPath: ["Maison", "Parfum d'intérieur", "Bougies"], seller: SELLERS[3],
    images: ["/product-candle.jpg"], price: 38, compareAtPrice: 52, currency: "EUR",
    rating: 4.9, reviewCount: 624, sold: 3240, badges: ["bestseller", "eco"],
    variants: [
      { id: "v1", label: "Cèdre & Iris 220g", attrs: { Parfum: "Cèdre & Iris" }, price: 38, compareAtPrice: 52, stock: 142, sku: "CDR-IR-220" },
      { id: "v2", label: "Figue & Vétiver 220g", attrs: { Parfum: "Figue & Vétiver" }, price: 38, compareAtPrice: 52, stock: 84, sku: "FIG-VT-220" },
    ],
    reviews: baseReviews, shippingFrom: "Italie", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Non retournable",
  },
  {
    id: "p69", slug: "plaid-laine-tricot", title: "Plaid laine tricoté gros-mailles Naia 130×170",
    brand: "NordicHome", description: "Plaid en grosses mailles, 70 % laine mérinos / 30 % alpaga, tricot artisanal portugais. 130×170 cm. Coloris doux, ultra-douillet.",
    category: "maison", categoryPath: ["Maison", "Textile", "Plaids"], seller: SELLERS[1],
    images: ["/product-throw.jpg"], price: 89, compareAtPrice: 129, currency: "EUR",
    rating: 4.8, reviewCount: 412, sold: 1820, badges: ["new", "eco"],
    variants: [
      { id: "v1", label: "Avoine", attrs: { Couleur: "Avoine" }, price: 89, compareAtPrice: 129, stock: 38, sku: "NAI-AV" },
      { id: "v2", label: "Anthracite", attrs: { Couleur: "Anthracite" }, price: 89, compareAtPrice: 129, stock: 24, sku: "NAI-AN" },
      { id: "v3", label: "Camel", attrs: { Couleur: "Camel" }, price: 89, compareAtPrice: 129, stock: 18, sku: "NAI-CM" },
    ],
    reviews: baseReviews, shippingFrom: "Suède", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p70", slug: "palette-eyeshadow-terracotta", title: "Palette ombres à paupières Terracotta 12 teintes",
    brand: "Maison Verte", description: "Palette de 12 ombres à paupières mates et satinées, pigments riches, formule vegan & cruelty-free. Tons chauds terracotta intemporels.",
    category: "beaute", categoryPath: ["Beauté", "Maquillage", "Yeux"], seller: SELLERS[3],
    images: ["/product-palette.jpg"], price: 42, compareAtPrice: 65, currency: "EUR",
    rating: 4.7, reviewCount: 824, sold: 4820, badges: ["bestseller"],
    variants: [
      { id: "v1", label: "Terracotta", attrs: { Palette: "Terracotta" }, price: 42, compareAtPrice: 65, stock: 184, sku: "PAL-TER" },
      { id: "v2", label: "Smoky Noir", attrs: { Palette: "Smoky Noir" }, price: 42, compareAtPrice: 65, stock: 124, sku: "PAL-SMK" },
    ],
    reviews: baseReviews, shippingFrom: "Italie", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Retour sous 30 jours non ouvert",
  },
  {
    id: "p71", slug: "parfum-eau-azur", title: "Eau de parfum Azur 50ml — note marine fraîche",
    brand: "Maison Verte", description: "Eau de parfum mixte 50 ml, notes de tête : bergamote, romarin. Cœur : iris, néroli. Fond : ambre blanc, bois flotté. Composition à Grasse.",
    category: "beaute", categoryPath: ["Beauté", "Parfums", "Eau de parfum"], seller: SELLERS[3],
    images: ["/product-perfume.jpg"], price: 95, compareAtPrice: 135, currency: "EUR",
    rating: 4.9, reviewCount: 1240, sold: 6420, badges: ["bestseller", "premium"],
    variants: [
      { id: "v1", label: "50 ml", attrs: { Format: "50 ml" }, price: 95, compareAtPrice: 135, stock: 84, sku: "AZR-50" },
      { id: "v2", label: "100 ml", attrs: { Format: "100 ml" }, price: 145, compareAtPrice: 195, stock: 42, sku: "AZR-100" },
    ],
    reviews: baseReviews, shippingFrom: "Italie", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Retour sous 30 jours non ouvert",
  },
  {
    id: "p72", slug: "mascara-volume-noir", title: "Mascara Volume Noir Intense — formule vegan",
    brand: "Maison Verte", description: "Mascara volume et longueur, brosse 200 fibres, formule vegan enrichie en huile de ricin. Tenue 16h sans transfert. Noir profond ou Brun.",
    category: "beaute", categoryPath: ["Beauté", "Maquillage", "Yeux"], seller: SELLERS[3],
    images: ["/product-mascara.jpg"], price: 28, compareAtPrice: 39, currency: "EUR",
    rating: 4.6, reviewCount: 1820, sold: 8240, badges: ["flash", "bestseller"],
    variants: [
      { id: "v1", label: "Noir intense", attrs: { Couleur: "Noir intense" }, price: 28, compareAtPrice: 39, stock: 284, sku: "MSC-NR" },
      { id: "v2", label: "Brun", attrs: { Couleur: "Brun" }, price: 28, compareAtPrice: 39, stock: 124, sku: "MSC-BR" },
    ],
    reviews: baseReviews, shippingFrom: "Italie", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Retour sous 30 jours non ouvert",
  },
  {
    id: "p73", slug: "huile-cheveux-soleil", title: "Huile capillaire Soleil — argan, jojoba, vitamine E",
    brand: "Maison Verte", description: "Huile capillaire nourrissante et brillance, mélange d'argan, jojoba et vitamine E. Formule légère non grasse, 100 ml.",
    category: "beaute", categoryPath: ["Beauté", "Cheveux", "Soins"], seller: SELLERS[3],
    images: ["/product-hair-oil.jpg"], price: 32, compareAtPrice: 45, currency: "EUR",
    rating: 4.8, reviewCount: 624, sold: 2840, badges: ["bestseller", "eco"],
    variants: [
      { id: "v1", label: "100 ml", attrs: { Format: "100 ml" }, price: 32, compareAtPrice: 45, stock: 142, sku: "HUL-CHV" },
    ],
    reviews: baseReviews, shippingFrom: "Italie", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Retour sous 30 jours non ouvert",
  },
  {
    id: "p74", slug: "tapis-yoga-liege-pro", title: "Tapis yoga liège Pro 5 mm — anti-dérapant naturel",
    brand: "NordicHome", description: "Tapis yoga en liège naturel certifié + base TPE. Anti-dérapant amélioré par la sueur, 5 mm d'amorti, 183×68 cm. Sangle de transport en cuir incluse.",
    category: "sport", categoryPath: ["Sport", "Yoga", "Tapis"], seller: SELLERS[1],
    images: ["/product-yoga.jpg"], price: 79, compareAtPrice: 109, currency: "EUR",
    rating: 4.8, reviewCount: 412, sold: 1840, badges: ["new", "eco"],
    variants: [
      { id: "v1", label: "Liège naturel 5 mm", attrs: { Épaisseur: "5 mm" }, price: 79, compareAtPrice: 109, stock: 84, sku: "YOG-CK-5" },
    ],
    reviews: baseReviews, shippingFrom: "Suède", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p75", slug: "haltere-hexa-paire", title: "Haltères hexagonales paire 2×10 kg revêtement caoutchouc",
    brand: "TechWave Global", description: "Paire d'haltères hexagonales 2×10 kg, revêtement caoutchouc anti-rayure et anti-roulement, poignée acier moletée chromée.",
    category: "sport", categoryPath: ["Sport", "Musculation", "Haltères"], seller: SELLERS[2],
    images: ["/product-dumbbells.jpg"], price: 89, compareAtPrice: 125, currency: "EUR",
    rating: 4.7, reviewCount: 524, sold: 2120, badges: ["bestseller"],
    variants: [
      { id: "v1", label: "Paire 2×5 kg", attrs: { Poids: "2×5 kg" }, price: 49, compareAtPrice: 69, stock: 84, sku: "HEX-5" },
      { id: "v2", label: "Paire 2×10 kg", attrs: { Poids: "2×10 kg" }, price: 89, compareAtPrice: 125, stock: 42, sku: "HEX-10" },
      { id: "v3", label: "Paire 2×15 kg", attrs: { Poids: "2×15 kg" }, price: 129, compareAtPrice: 175, stock: 24, sku: "HEX-15" },
    ],
    reviews: baseReviews, shippingFrom: "Allemagne", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p76", slug: "gourde-isotherme-sage", title: "Gourde isotherme Sage 750 ml — inox 24h froid",
    brand: "NordicHome", description: "Gourde isotherme inox double paroi 750 ml, conserve 24h froid / 12h chaud. Bouchon sport double ouverture, sans BPA, finition mate.",
    category: "sport", categoryPath: ["Sport", "Hydratation", "Gourdes"], seller: SELLERS[1],
    images: ["/product-bottle.jpg"], price: 32, compareAtPrice: 49, currency: "EUR",
    rating: 4.8, reviewCount: 1240, sold: 6840, badges: ["bestseller", "eco"],
    variants: [
      { id: "v1", label: "Sauge 750ml", attrs: { Couleur: "Sauge" }, price: 32, compareAtPrice: 49, stock: 184, sku: "GRD-SG" },
      { id: "v2", label: "Sable 750ml", attrs: { Couleur: "Sable" }, price: 32, compareAtPrice: 49, stock: 124, sku: "GRD-SB" },
      { id: "v3", label: "Anthracite 750ml", attrs: { Couleur: "Anthracite" }, price: 32, compareAtPrice: 49, stock: 84, sku: "GRD-AN" },
    ],
    reviews: baseReviews, shippingFrom: "Suède", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p77", slug: "jouet-bois-cubes", title: "Cubes en bois empilables 30 pièces — peinture non toxique",
    brand: "NordicHome", description: "30 cubes en bois de hêtre certifié FSC, peinture à l'eau non toxique. Stimulent motricité fine et créativité. Dès 18 mois. Sac coton inclus.",
    category: "enfant", categoryPath: ["Enfant", "Jouets", "Bois"], seller: SELLERS[1],
    images: ["/product-toy.jpg"], price: 39, compareAtPrice: 58, currency: "EUR",
    rating: 4.9, reviewCount: 482, sold: 1920, badges: ["new", "eco"],
    variants: [
      { id: "v1", label: "30 pièces", attrs: { Quantité: "30 pièces" }, price: 39, compareAtPrice: 58, stock: 124, sku: "CUB-30" },
    ],
    reviews: baseReviews, shippingFrom: "Suède", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p78", slug: "sac-ecole-mini", title: "Sac à dos école Mini Petit Aventurier — coton recyclé",
    brand: "Maison Verte", description: "Sac à dos enfant en coton recyclé, 6L, ergonomique, bretelles rembourrées, doublure imperméable, poche extérieure. Dès 3 ans.",
    category: "enfant", categoryPath: ["Enfant", "Bagages", "Sacs"], seller: SELLERS[3],
    images: ["/product-backpack.jpg"], price: 34, compareAtPrice: 49, currency: "EUR",
    rating: 4.7, reviewCount: 282, sold: 1240, badges: ["bestseller", "eco"],
    variants: [
      { id: "v1", label: "Rose poudré", attrs: { Couleur: "Rose poudré" }, price: 34, compareAtPrice: 49, stock: 84, sku: "MINI-RP" },
      { id: "v2", label: "Bleu marine", attrs: { Couleur: "Bleu marine" }, price: 34, compareAtPrice: 49, stock: 64, sku: "MINI-MR" },
      { id: "v3", label: "Sauge", attrs: { Couleur: "Sauge" }, price: 34, compareAtPrice: 49, stock: 42, sku: "MINI-SG" },
    ],
    reviews: baseReviews, shippingFrom: "Italie", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p79", slug: "gigoteuse-coton-bio", title: "Gigoteuse coton bio Étoiles 0-6 mois TOG 2",
    brand: "Maison Verte", description: "Gigoteuse en coton bio GOTS, garnissage ouate recyclée, TOG 2 idéale 18-22°C. Fermeture à glissière inversée, certifiée OEKO-TEX.",
    category: "enfant", categoryPath: ["Enfant", "Bébé", "Gigoteuses"], seller: SELLERS[3],
    images: ["/product-gigoteuse.jpg"], price: 45, compareAtPrice: 65, currency: "EUR",
    rating: 4.9, reviewCount: 624, sold: 3120, badges: ["bestseller", "eco"],
    variants: [
      { id: "v1", label: "0-6 mois", attrs: { Taille: "0-6 mois" }, price: 45, compareAtPrice: 65, stock: 84, sku: "GIG-06" },
      { id: "v2", label: "6-18 mois", attrs: { Taille: "6-18 mois" }, price: 49, compareAtPrice: 69, stock: 64, sku: "GIG-618" },
    ],
    reviews: baseReviews, shippingFrom: "Italie", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p80", slug: "couvre-volant-cuir-grain", title: "Couvre-volant cuir grainé universel — sur-mesure",
    brand: "Studio Kobe", description: "Couvre-volant en cuir grainé véritable, surpiqures contrastantes, antidérapant, universel 37-39 cm. Pose facile sans outils.",
    category: "auto", categoryPath: ["Auto & Moto", "Habitacle", "Volants"], seller: SELLERS[4],
    images: ["/product-steering.jpg"], price: 29, compareAtPrice: 49, currency: "EUR",
    rating: 4.5, reviewCount: 1240, sold: 6240, badges: ["bestseller"],
    variants: [
      { id: "v1", label: "Noir / fil rouge", attrs: { Couleur: "Noir / rouge" }, price: 29, compareAtPrice: 49, stock: 284, sku: "VOL-NR-RG" },
      { id: "v2", label: "Noir / fil blanc", attrs: { Couleur: "Noir / blanc" }, price: 29, compareAtPrice: 49, stock: 184, sku: "VOL-NR-BL" },
      { id: "v3", label: "Cognac", attrs: { Couleur: "Cognac" }, price: 29, compareAtPrice: 49, stock: 124, sku: "VOL-CG" },
    ],
    reviews: baseReviews, shippingFrom: "Japon", estimatedDelivery: "5 à 8 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p81", slug: "dashcam-4k-night", title: "Dashcam 4K Night Vision — GPS Wi-Fi 64Go",
    brand: "TechWave Global", description: "Dashcam voiture 4K UHD, capteur Sony Starvis vision nocturne, GPS intégré, Wi-Fi, capteur G, parking surveillance, carte SD 64 Go incluse.",
    category: "auto", categoryPath: ["Auto & Moto", "Sécurité", "Dashcams"], seller: SELLERS[2],
    images: ["/product-dashcam.jpg"], price: 169, compareAtPrice: 249, currency: "EUR",
    rating: 4.7, reviewCount: 824, sold: 3120, badges: ["new", "premium"],
    variants: [
      { id: "v1", label: "Avant seul", attrs: { Pack: "Avant seul" }, price: 169, compareAtPrice: 249, stock: 84, sku: "DSH-1" },
      { id: "v2", label: "Avant + Arrière", attrs: { Pack: "Avant + Arrière" }, price: 229, compareAtPrice: 329, stock: 42, sku: "DSH-2" },
    ],
    reviews: baseReviews, shippingFrom: "Allemagne", estimatedDelivery: "2 à 4 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p82", slug: "huile-olive-toscane-extra", title: "Huile d'olive extra-vierge Toscane 500 ml — 1ère pression",
    brand: "Maison Verte", description: "Huile d'olive extra-vierge toscane, première pression à froid, récolte précoce. Saveur fruitée et légèrement piquante. Bouteille verre 500 ml.",
    category: "alimentation", categoryPath: ["Alimentation", "Épicerie", "Huiles"], seller: SELLERS[3],
    images: ["/product-olive-oil.jpg"], price: 24, compareAtPrice: 32, currency: "EUR",
    rating: 4.9, reviewCount: 482, sold: 1840, badges: ["bestseller", "premium"],
    variants: [
      { id: "v1", label: "500 ml", attrs: { Format: "500 ml" }, price: 24, compareAtPrice: 32, stock: 142, sku: "OLI-500" },
      { id: "v2", label: "1 L", attrs: { Format: "1 L" }, price: 42, compareAtPrice: 58, stock: 84, sku: "OLI-1L" },
    ],
    reviews: baseReviews, shippingFrom: "Italie", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Non retournable",
  },
  {
    id: "p83", slug: "chocolat-noir-grand-cru", title: "Chocolat noir Grand Cru 75% Madagascar — 4×100 g",
    brand: "Maison Verte", description: "4 tablettes de chocolat noir 75 % cacao Grand Cru de Madagascar (origine unique), torréfié et conché par un maître chocolatier. Pur beurre de cacao.",
    category: "alimentation", categoryPath: ["Alimentation", "Épicerie", "Chocolats"], seller: SELLERS[3],
    images: ["/product-chocolate.jpg"], price: 28, compareAtPrice: 38, currency: "EUR",
    rating: 4.9, reviewCount: 624, sold: 2640, badges: ["bestseller", "premium"],
    variants: [
      { id: "v1", label: "Coffret 4×100 g", attrs: { Format: "4 tablettes" }, price: 28, compareAtPrice: 38, stock: 184, sku: "CHO-4" },
      { id: "v2", label: "Coffret 8×100 g", attrs: { Format: "8 tablettes" }, price: 52, compareAtPrice: 72, stock: 84, sku: "CHO-8" },
    ],
    reviews: baseReviews, shippingFrom: "Italie", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Non retournable",
  },
  {
    id: "p84", slug: "miel-acacia-savoie", title: "Miel d'acacia de Savoie 500 g — récolte artisanale",
    brand: "Atelier Lumen", description: "Miel d'acacia récolté en Savoie par un apiculteur artisan, IGP. Saveur douce et florale, ne cristallise pas. Pot verre 500 g.",
    category: "alimentation", categoryPath: ["Alimentation", "Épicerie", "Miels"], seller: SELLERS[0],
    images: ["/product-honey.jpg"], price: 18, compareAtPrice: 24, currency: "EUR",
    rating: 4.9, reviewCount: 412, sold: 1620, badges: ["bestseller", "eco"],
    variants: [
      { id: "v1", label: "500 g", attrs: { Format: "500 g" }, price: 18, compareAtPrice: 24, stock: 224, sku: "MIE-500" },
      { id: "v2", label: "1 kg", attrs: { Format: "1 kg" }, price: 32, compareAtPrice: 42, stock: 124, sku: "MIE-1KG" },
    ],
    reviews: baseReviews, shippingFrom: "France", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Non retournable",
  },
  {
    id: "p85", slug: "distributeur-croquettes-petsmart-cam", title: "Distributeur de croquettes connecté caméra HD — chats & chiens",
    brand: "TechWave Global", description: "Distributeur automatique 4L avec caméra HD 1080p, micro 2-voies, vision nocturne, 6 repas programmables, app iOS/Android. Détection de mouvement.",
    category: "maison", categoryPath: ["Maison", "Animaux", "Alimentation"], seller: SELLERS[2],
    images: ["/product-pet-feeder.jpg"], price: 89, compareAtPrice: 159, currency: "EUR",
    rating: 4.6, reviewCount: 1820, sold: 5240, badges: ["flash", "bestseller"],
    variants: [
      { id: "v1", label: "4 L Blanc", attrs: { Capacité: "4 L", Couleur: "Blanc" }, price: 89, compareAtPrice: 159, stock: 184, sku: "PET-4L-WH" },
      { id: "v2", label: "6 L Blanc", attrs: { Capacité: "6 L", Couleur: "Blanc" }, price: 119, compareAtPrice: 189, stock: 84, sku: "PET-6L-WH" },
    ],
    reviews: baseReviews, shippingFrom: "Chine (entrepôt CJ)", estimatedDelivery: "8 à 14 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p86", slug: "fontaine-eau-chat-silencieuse", title: "Fontaine à eau silencieuse 2,5L pour chat — filtre triple action",
    brand: "TechWave Global", description: "Fontaine eau silencieuse 25 dB, 3 modes débit, filtre triple action charbon actif. Capteur infrarouge éclairage LED, BPA-free.",
    category: "maison", categoryPath: ["Maison", "Animaux", "Hydratation"], seller: SELLERS[2],
    images: ["/product-pet-fountain.jpg"], price: 39, compareAtPrice: 69, currency: "EUR",
    rating: 4.7, reviewCount: 2420, sold: 8240, badges: ["bestseller", "flash"],
    variants: [
      { id: "v1", label: "2,5 L Blanc", attrs: { Capacité: "2,5 L" }, price: 39, compareAtPrice: 69, stock: 284, sku: "FOUNT-25" },
    ],
    reviews: baseReviews, shippingFrom: "Chine (entrepôt CJ)", estimatedDelivery: "8 à 14 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p87", slug: "friteuse-air-pro-6l", title: "Friteuse à air Pro 6L — 8 programmes écran tactile",
    brand: "TechWave Global", description: "Friteuse à air 6L, 8 programmes (frites, poulet, légumes, gâteau, pain), écran tactile, panier antiadhésif, 1700W. Sans BPA.",
    category: "maison", categoryPath: ["Maison", "Cuisine", "Petit électroménager"], seller: SELLERS[2],
    images: ["/product-airfryer.jpg"], price: 79, compareAtPrice: 149, currency: "EUR",
    rating: 4.7, reviewCount: 3240, sold: 12480, badges: ["flash", "bestseller"],
    variants: [
      { id: "v1", label: "6 L Noir", attrs: { Capacité: "6 L", Couleur: "Noir" }, price: 79, compareAtPrice: 149, stock: 384, sku: "AF-6L-BK" },
      { id: "v2", label: "8 L Noir", attrs: { Capacité: "8 L", Couleur: "Noir" }, price: 109, compareAtPrice: 189, stock: 184, sku: "AF-8L-BK" },
    ],
    reviews: baseReviews, shippingFrom: "Chine (entrepôt CJ)", estimatedDelivery: "8 à 14 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p88", slug: "machine-espresso-portable-nomad", title: "Machine espresso portable Nomad — sans branchement, 18 bars",
    brand: "TechWave Global", description: "Cafetière espresso portable 18 bars, fonctionne sans électricité, compatible capsules Nespresso et café moulu. Idéale voyage / camping.",
    category: "maison", categoryPath: ["Maison", "Cuisine", "Café"], seller: SELLERS[2],
    images: ["/product-coffee-machine.jpg"], price: 59, compareAtPrice: 109, currency: "EUR",
    rating: 4.6, reviewCount: 1240, sold: 4820, badges: ["new", "flash"],
    variants: [
      { id: "v1", label: "Noir", attrs: { Couleur: "Noir" }, price: 59, compareAtPrice: 109, stock: 184, sku: "ESP-NM-BK" },
      { id: "v2", label: "Argent", attrs: { Couleur: "Argent" }, price: 59, compareAtPrice: 109, stock: 124, sku: "ESP-NM-SL" },
    ],
    reviews: baseReviews, shippingFrom: "Chine (entrepôt CJ)", estimatedDelivery: "8 à 14 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p89", slug: "pistolet-massage-deeptouch", title: "Pistolet de massage DeepTouch — 6 têtes, 30 vitesses",
    brand: "TechWave Global", description: "Pistolet de massage percussion 30 vitesses, 6 têtes interchangeables, écran LCD, batterie 2500 mAh, valise de transport. Silencieux 35 dB.",
    category: "sport", categoryPath: ["Sport", "Récupération", "Massage"], seller: SELLERS[2],
    images: ["/product-massage-gun.jpg"], price: 69, compareAtPrice: 159, currency: "EUR",
    rating: 4.7, reviewCount: 4820, sold: 18420, badges: ["bestseller", "flash"],
    variants: [
      { id: "v1", label: "Noir", attrs: { Couleur: "Noir" }, price: 69, compareAtPrice: 159, stock: 484, sku: "MASS-BK" },
    ],
    reviews: baseReviews, shippingFrom: "Chine (entrepôt CJ)", estimatedDelivery: "8 à 14 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p90", slug: "correcteur-posture-active", title: "Correcteur de posture Active — capteur intelligent vibrant",
    brand: "TechWave Global", description: "Correcteur de posture intelligent avec capteur, vibre quand vous vous voûtez. App de suivi, batterie 7 jours. Confort respirant, ajustable.",
    category: "sport", categoryPath: ["Sport", "Bien-être", "Posture"], seller: SELLERS[2],
    images: ["/product-posture.jpg"], price: 39, compareAtPrice: 79, currency: "EUR",
    rating: 4.5, reviewCount: 1820, sold: 6240, badges: ["flash"],
    variants: [
      { id: "v1", label: "Taille S/M", attrs: { Taille: "S/M" }, price: 39, compareAtPrice: 79, stock: 224, sku: "POST-SM" },
      { id: "v2", label: "Taille L/XL", attrs: { Taille: "L/XL" }, price: 39, compareAtPrice: 79, stock: 184, sku: "POST-LXL" },
    ],
    reviews: baseReviews, shippingFrom: "Chine (entrepôt CJ)", estimatedDelivery: "8 à 14 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p91", slug: "masque-led-photo-therapy", title: "Masque LED photothérapie 7 couleurs — anti-âge & anti-acné",
    brand: "Maison Verte", description: "Masque LED 7 couleurs (rouge, bleu, vert, jaune, cyan, violet, blanc), 150 LEDs, 4 niveaux d'intensité, programmes anti-âge, anti-acné, éclat.",
    category: "beaute", categoryPath: ["Beauté", "Soins", "Appareils"], seller: SELLERS[3],
    images: ["/product-led-mask.jpg"], price: 119, compareAtPrice: 249, currency: "EUR",
    rating: 4.6, reviewCount: 2420, sold: 7240, badges: ["new", "bestseller"],
    variants: [
      { id: "v1", label: "7 couleurs", attrs: { Modèle: "7 couleurs" }, price: 119, compareAtPrice: 249, stock: 184, sku: "LED-7C" },
    ],
    reviews: baseReviews, shippingFrom: "Italie (entrepôt EU)", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Retour sous 30 jours",
  },
  {
    id: "p92", slug: "kit-blanchiment-dents-led", title: "Kit blanchiment dentaire LED — gel sans peroxyde, 32 LEDs",
    brand: "Maison Verte", description: "Kit blanchiment dentaire LED 32 LEDs, 4 seringues de gel sans peroxyde, embout connecté smartphone. Résultats visibles en 7 jours.",
    category: "beaute", categoryPath: ["Beauté", "Soins", "Dentaire"], seller: SELLERS[3],
    images: ["/product-whitening.jpg"], price: 39, compareAtPrice: 89, currency: "EUR",
    rating: 4.5, reviewCount: 3820, sold: 14820, badges: ["flash", "bestseller"],
    variants: [
      { id: "v1", label: "Kit complet", attrs: { Pack: "Kit complet" }, price: 39, compareAtPrice: 89, stock: 384, sku: "WHIT-KIT" },
      { id: "v2", label: "Kit + 2 recharges", attrs: { Pack: "Kit + recharges" }, price: 59, compareAtPrice: 119, stock: 184, sku: "WHIT-PR" },
    ],
    reviews: baseReviews, shippingFrom: "Italie (entrepôt EU)", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Retour sous 30 jours",
  },
  {
    id: "p93", slug: "videoprojecteur-cube-smart", title: "Vidéoprojecteur cube Smart — 1080p Wi-Fi & Bluetooth",
    brand: "TechWave Global", description: "Vidéoprojecteur portable cube, résolution native 1080p, Android TV, Wi-Fi 6, Bluetooth, autonomie 3h, projection jusqu'à 200\".",
    category: "tech", categoryPath: ["Tech", "Image", "Vidéoprojecteurs"], seller: SELLERS[2],
    images: ["/product-projector.jpg"], price: 199, compareAtPrice: 379, currency: "EUR",
    rating: 4.6, reviewCount: 1620, sold: 4820, badges: ["new", "premium"],
    variants: [
      { id: "v1", label: "Standard", attrs: { Pack: "Standard" }, price: 199, compareAtPrice: 379, stock: 124, sku: "PROJ-STD" },
      { id: "v2", label: "Avec écran 100\"", attrs: { Pack: "Avec écran" }, price: 249, compareAtPrice: 449, stock: 64, sku: "PROJ-SCN" },
    ],
    reviews: baseReviews, shippingFrom: "Chine (entrepôt CJ)", estimatedDelivery: "8 à 14 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p94", slug: "projecteur-galaxie-stelar", title: "Projecteur galaxie Stelar — étoiles & nébuleuses Bluetooth",
    brand: "TechWave Global", description: "Projecteur LED galaxie nébuleuse, télécommande, enceinte Bluetooth intégrée, minuteur, 16 millions de couleurs, app smartphone.",
    category: "maison", categoryPath: ["Maison", "Décoration", "Luminaires"], seller: SELLERS[2],
    images: ["/product-star-projector.jpg"], price: 49, compareAtPrice: 99, currency: "EUR",
    rating: 4.6, reviewCount: 4820, sold: 16240, badges: ["bestseller", "flash"],
    variants: [
      { id: "v1", label: "Sphère blanche", attrs: { Modèle: "Sphère blanche" }, price: 49, compareAtPrice: 99, stock: 484, sku: "STELAR-WH" },
    ],
    reviews: baseReviews, shippingFrom: "Chine (entrepôt CJ)", estimatedDelivery: "8 à 14 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p95", slug: "lampe-bureau-led-arch", title: "Lampe de bureau LED Arch — capteur tactile, charge sans-fil",
    brand: "TechWave Global", description: "Lampe LED bureau 12W avec base de charge sans-fil 10W, 5 modes éclairage, 5 luminosités, capteur tactile, USB-C.",
    category: "maison", categoryPath: ["Maison", "Bureau", "Luminaires"], seller: SELLERS[2],
    images: ["/product-desk-lamp.jpg"], price: 49, compareAtPrice: 89, currency: "EUR",
    rating: 4.7, reviewCount: 1820, sold: 6240, badges: ["bestseller"],
    variants: [
      { id: "v1", label: "Sable", attrs: { Couleur: "Sable" }, price: 49, compareAtPrice: 89, stock: 224, sku: "ARCH-SB" },
      { id: "v2", label: "Anthracite", attrs: { Couleur: "Anthracite" }, price: 49, compareAtPrice: 89, stock: 184, sku: "ARCH-AN" },
    ],
    reviews: baseReviews, shippingFrom: "Chine (entrepôt CJ)", estimatedDelivery: "8 à 14 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p96", slug: "humidificateur-ultrason-mist", title: "Humidificateur ultrasonique Mist 4L — diffuseur huiles essentielles",
    brand: "NordicHome", description: "Humidificateur ultrasonique 4L, diffuseur huiles essentielles, lumière d'ambiance 7 couleurs, autonomie 32h, silencieux 28 dB, app smartphone.",
    category: "maison", categoryPath: ["Maison", "Air", "Humidificateurs"], seller: SELLERS[1],
    images: ["/product-humidifier.jpg"], price: 49, compareAtPrice: 89, currency: "EUR",
    rating: 4.6, reviewCount: 2420, sold: 8420, badges: ["bestseller", "flash"],
    variants: [
      { id: "v1", label: "4 L Blanc", attrs: { Capacité: "4 L" }, price: 49, compareAtPrice: 89, stock: 284, sku: "MIST-4L" },
    ],
    reviews: baseReviews, shippingFrom: "Suède (entrepôt EU)", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p97", slug: "trepied-ring-light-bluetooth", title: "Trépied 1,6m + ring light 26cm — créateurs de contenu",
    brand: "TechWave Global", description: "Trépied télescopique 1,6m + ring light 26cm 3 températures de couleur, 11 niveaux luminosité, télécommande Bluetooth, support smartphone.",
    category: "tech", categoryPath: ["Tech", "Photo", "Accessoires"], seller: SELLERS[2],
    images: ["/product-tripod.jpg"], price: 35, compareAtPrice: 69, currency: "EUR",
    rating: 4.6, reviewCount: 3240, sold: 12480, badges: ["bestseller", "flash"],
    variants: [
      { id: "v1", label: "Standard", attrs: { Pack: "Standard" }, price: 35, compareAtPrice: 69, stock: 484, sku: "TRIP-STD" },
      { id: "v2", label: "Pack pro 3 lights", attrs: { Pack: "Pack pro" }, price: 59, compareAtPrice: 119, stock: 184, sku: "TRIP-PRO" },
    ],
    reviews: baseReviews, shippingFrom: "Chine (entrepôt CJ)", estimatedDelivery: "8 à 14 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p98", slug: "brosse-soufflante-glow", title: "Brosse soufflante Glow — lissage et volume en 1 geste",
    brand: "Maison Verte", description: "Brosse soufflante 1000W, ions négatifs, 3 températures, 2 vitesses, technologie céramique-tourmaline. Lisse, volumise et sèche en 1 geste.",
    category: "beaute", categoryPath: ["Beauté", "Cheveux", "Coiffage"], seller: SELLERS[3],
    images: ["/product-hair-brush.jpg"], price: 49, compareAtPrice: 99, currency: "EUR",
    rating: 4.7, reviewCount: 4820, sold: 18420, badges: ["bestseller", "flash"],
    variants: [
      { id: "v1", label: "Or rose", attrs: { Couleur: "Or rose" }, price: 49, compareAtPrice: 99, stock: 384, sku: "GLOW-RG" },
      { id: "v2", label: "Crème", attrs: { Couleur: "Crème" }, price: 49, compareAtPrice: 99, stock: 224, sku: "GLOW-CR" },
    ],
    reviews: baseReviews, shippingFrom: "Italie (entrepôt EU)", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Retour sous 30 jours non ouvert",
  },
  {
    id: "p99", slug: "tablette-dessin-magique-kids", title: "Tablette de dessin LCD enfant 10\" — réutilisable & sans écran",
    brand: "Maison Verte", description: "Tablette LCD 10\" effaçable, écran couleur sans lumière bleue, stylet attaché, 1 pile bouton incluse. Pour enfants dès 3 ans.",
    category: "enfant", categoryPath: ["Enfant", "Jouets", "Créatifs"], seller: SELLERS[3],
    images: ["/product-kids-tablet.jpg"], price: 19, compareAtPrice: 39, currency: "EUR",
    rating: 4.7, reviewCount: 5840, sold: 24820, badges: ["bestseller", "flash"],
    variants: [
      { id: "v1", label: "10\" Rose", attrs: { Taille: "10\"", Couleur: "Rose" }, price: 19, compareAtPrice: 39, stock: 624, sku: "KIDS-10P" },
      { id: "v2", label: "10\" Bleu", attrs: { Taille: "10\"", Couleur: "Bleu" }, price: 19, compareAtPrice: 39, stock: 484, sku: "KIDS-10B" },
      { id: "v3", label: "12\" Rose", attrs: { Taille: "12\"", Couleur: "Rose" }, price: 29, compareAtPrice: 49, stock: 224, sku: "KIDS-12P" },
    ],
    reviews: baseReviews, shippingFrom: "Italie (entrepôt EU)", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
  {
    id: "p100", slug: "veilleuse-silicone-cloud", title: "Veilleuse silicone Cloud — tactile, 16 couleurs, rechargeable",
    brand: "Maison Verte", description: "Veilleuse silicone douce en forme de nuage, 16 couleurs au tactile, intensité réglable, batterie 2000 mAh USB-C, autonomie 30h.",
    category: "enfant", categoryPath: ["Enfant", "Bébé", "Veilleuses"], seller: SELLERS[3],
    images: ["/product-nightlight.jpg"], price: 25, compareAtPrice: 45, currency: "EUR",
    rating: 4.8, reviewCount: 3420, sold: 12840, badges: ["bestseller", "eco"],
    variants: [
      { id: "v1", label: "Crème", attrs: { Couleur: "Crème" }, price: 25, compareAtPrice: 45, stock: 484, sku: "NL-CR" },
      { id: "v2", label: "Rose", attrs: { Couleur: "Rose" }, price: 25, compareAtPrice: 45, stock: 384, sku: "NL-RP" },
      { id: "v3", label: "Bleu", attrs: { Couleur: "Bleu" }, price: 25, compareAtPrice: 45, stock: 284, sku: "NL-BL" },
    ],
    reviews: baseReviews, shippingFrom: "Italie (entrepôt EU)", estimatedDelivery: "3 à 5 jours ouvrés", returns: "Retour gratuit sous 30 jours",
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getBestSellers(limit?: number): Product[] {
  const sorted = [...PRODUCTS].sort((a, b) => b.sold - a.sold)
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted
}

export function getNewArrivals(limit?: number): Product[] {
  const sorted = [...PRODUCTS]
    .filter((p) => p.badges.includes("new"))
    .concat([...PRODUCTS].filter((p) => !p.badges.includes("new")).reverse())
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted
}

export function getDeals(limit?: number): Product[] {
  const sorted = [...PRODUCTS]
    .filter((p) => p.compareAtPrice && p.compareAtPrice > p.price)
    .sort((a, b) => {
      const da = a.compareAtPrice ? (a.compareAtPrice - a.price) / a.compareAtPrice : 0
      const db = b.compareAtPrice ? (b.compareAtPrice - b.price) / b.compareAtPrice : 0
      return db - da
    })
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted
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

// ───────────────────── Mock messages ─────────────────────
export type Message = {
  id: string
  fromMe: boolean
  body: string
  time: string
}

export type Thread = {
  id: string
  sellerId: string
  sellerName: string
  sellerLogo: string
  subject: string
  unread: number
  lastAt: string
  productImage?: string
  productTitle?: string
  messages: Message[]
}

export const mockThreads: Thread[] = [
  {
    id: "t-1",
    sellerId: "s3",
    sellerName: "TechWave Global",
    sellerLogo: "/seller-techwave.jpg",
    subject: "Question sur le casque Aurora Pro",
    unread: 1,
    lastAt: "il y a 12 min",
    productImage: "/product-headphones-1.jpg",
    productTitle: "Casque audio sans-fil Aurora Pro",
    messages: [
      { id: "m-1", fromMe: true, body: "Bonjour, le casque est-il compatible avec un Mac M3 en USB-C ?", time: "10:14" },
      { id: "m-2", fromMe: false, body: "Bonjour ! Oui, le câble USB-C fourni est plug-and-play sur macOS.", time: "10:21" },
      { id: "m-3", fromMe: true, body: "Parfait, merci. Et la garantie est de combien ?", time: "10:22" },
      { id: "m-4", fromMe: false, body: "2 ans constructeur + 30 jours satisfait ou remboursé chez Bazario.", time: "10:24" },
    ],
  },
  {
    id: "t-2",
    sellerId: "s2",
    sellerName: "NordicHome",
    sellerLogo: "/seller-nordic.jpg",
    subject: "Délais pour la Suisse",
    unread: 0,
    lastAt: "hier",
    productImage: "/product-lamp-1.jpg",
    productTitle: "Lampe de table Halo laiton brossé",
    messages: [
      { id: "m-1", fromMe: true, body: "Bonjour, vous livrez en Suisse ?", time: "hier · 14:02" },
      { id: "m-2", fromMe: false, body: "Oui, sous 5 à 7 jours ouvrés via DHL Express.", time: "hier · 14:18" },
    ],
  },
  {
    id: "t-3",
    sellerId: "s4",
    sellerName: "Maison Verte",
    sellerLogo: "/seller-verte.jpg",
    subject: "Composition du sérum",
    unread: 0,
    lastAt: "lun.",
    productImage: "/product-serum-1.jpg",
    productTitle: "Sérum Éclat Vitamine C 15% bio",
    messages: [
      { id: "m-1", fromMe: true, body: "Le sérum est-il vegan et sans alcool ?", time: "lun. · 09:00" },
      { id: "m-2", fromMe: false, body: "Oui, 100% vegan, sans alcool, certifié Cosmos Organic.", time: "lun. · 09:45" },
    ],
  },
]

// ───────────────────── Seller profiles (storefront) ─────────────────────
export type SellerProfile = {
  cover: string
  city: string
  founded: number
  tagline: string
  story: string
  specialties: string[]
  responseTime: string
  shippingTime: string
  languages: string[]
  certifications: string[]
  followers: number
  joinedYear: number
  policies: { label: string; value: string }[]
}

export const SELLER_PROFILES: Record<string, SellerProfile> = {
  "atelier-lumen": {
    cover: "/cover-lumen.jpg",
    city: "Paris",
    founded: 2014,
    tagline: "L'artisanat parisien, transmis depuis quatre générations.",
    story:
      "Fondé en 2014 par Léa et Mathéo, Atelier Lumen perpétue l'héritage d'une famille de luminairiers parisiens depuis 1908. Chaque pièce est conçue, prototypée et assemblée à la main dans notre atelier du Marais, à partir de laiton recyclé et de bois locaux. Nos lampes accompagnent aujourd'hui des hôtels boutiques, des restaurants étoilés et des intérieurs particuliers dans 42 pays.",
    specialties: ["Luminaires", "Mobilier", "Décoration"],
    responseTime: "moins de 2 h",
    shippingTime: "2 à 4 jours",
    languages: ["Français", "English", "Italiano"],
    certifications: ["Origine France Garantie", "Bazario Vérifié", "Made in Europe"],
    followers: 28400,
    joinedYear: 2018,
    policies: [
      { label: "Retours", value: "30 jours satisfait ou remboursé" },
      { label: "Garantie", value: "5 ans pièces et main-d'oeuvre" },
      { label: "Livraison", value: "Offerte dès 49 €, Express 24h disponible" },
    ],
  },
  nordichome: {
    cover: "/cover-nordic.jpg",
    city: "Stockholm",
    founded: 2011,
    tagline: "Le mobilier scandinave qui dure une vie.",
    story:
      "NordicHome, c'est l'histoire d'une obsession : celle de la durabilité. Depuis Stockholm, notre équipe sourcing parcourt la Scandinavie pour dénicher les meilleurs ateliers - bois certifié FSC, textiles Oeko-Tex, productions à moins de 200 km. Nos meubles sont pensés pour traverser les modes et les générations.",
    specialties: ["Mobilier", "Textile", "Maison"],
    responseTime: "moins de 4 h",
    shippingTime: "5 à 8 jours",
    languages: ["Français", "English", "Svenska", "Deutsch"],
    certifications: ["FSC", "Oeko-Tex", "Bazario Vérifié"],
    followers: 41200,
    joinedYear: 2017,
    policies: [
      { label: "Retours", value: "60 jours sans condition" },
      { label: "Garantie", value: "10 ans sur la structure" },
      { label: "Livraison", value: "Offerte dès 79 €, transporteur dédié pour le mobilier" },
    ],
  },
  "techwave-global": {
    cover: "/cover-techwave.jpg",
    city: "Berlin",
    founded: 2017,
    tagline: "La pointe de la tech, sans le surplus.",
    story:
      "Basés à Berlin, nous sélectionnons et testons chaque produit pendant 6 semaines avant de le mettre en vente : audio, smart-home, accessoires PC. Nous ne référençons que ce qui passe nos 47 critères techniques. Nos clients, eux, gagnent du temps et un produit qui tient ses promesses.",
    specialties: ["Audio", "Smart-home", "Accessoires"],
    responseTime: "moins de 1 h",
    shippingTime: "1 à 3 jours",
    languages: ["Français", "English", "Deutsch", "Español"],
    certifications: ["Bazario Vérifié", "Pro Reseller", "RGPD Compliant"],
    followers: 89600,
    joinedYear: 2019,
    policies: [
      { label: "Retours", value: "30 jours, étiquette retour incluse" },
      { label: "Garantie", value: "2 ans constructeur + 1 an Bazario" },
      { label: "Livraison", value: "Express 24h offerte dès 39 €" },
    ],
  },
  "maison-verte": {
    cover: "/cover-verte.jpg",
    city: "Florence",
    founded: 2019,
    tagline: "La beauté vivante, formulée en Toscane.",
    story:
      "Maison Verte, c'est la rencontre de la tradition cosmétique italienne et de la science verte moderne. Toutes nos formules sont conçues à Florence par notre laboratoire de 12 chimistes, à partir d'ingrédients bio cultivés dans nos partenariats fermiers de Toscane. Aucun test sur les animaux, packaging 100 % recyclable, et chaque vente plante un olivier.",
    specialties: ["Soins visage", "Corps", "Bien-être"],
    responseTime: "moins de 6 h",
    shippingTime: "3 à 5 jours",
    languages: ["Français", "English", "Italiano"],
    certifications: ["Cosmos Organic", "Vegan Society", "Bazario Vérifié"],
    followers: 18700,
    joinedYear: 2021,
    policies: [
      { label: "Retours", value: "30 jours, échantillon offert si non satisfait" },
      { label: "Garantie", value: "Fraîcheur garantie 18 mois" },
      { label: "Livraison", value: "Offerte dès 35 €, échantillons gratuits" },
    ],
  },
  "studio-kobe": {
    cover: "/cover-kobe.jpg",
    city: "Kyoto",
    founded: 2009,
    tagline: "L'art de vivre japonais, du bol au bain.",
    story:
      "Studio Kobe est un collectif de 18 céramistes et artisans textiles établis autour de Kyoto. Nous proposons l'art de vivre japonais dans son expression la plus pure : bols Iga, théières Tokoname, peignoirs en lin de Kurume, encens d'Awaji. Chaque commande est emballée à la main avec un mot du créateur.",
    specialties: ["Céramique", "Textile", "Art de la table"],
    responseTime: "moins de 12 h",
    shippingTime: "7 à 10 jours",
    languages: ["Français", "English", "日本語"],
    certifications: ["Artisans certifiés", "Bazario Vérifié", "Made in Japan"],
    followers: 52300,
    joinedYear: 2020,
    policies: [
      { label: "Retours", value: "14 jours hors pièces uniques" },
      { label: "Garantie", value: "Casse au transport remboursée" },
      { label: "Livraison", value: "Express DHL depuis Osaka" },
    ],
  },
}

export function getSellerBySlug(slug: string) {
  return SELLERS.find((s) => s.slug === slug)
}

export function getSellerProductsBySlug(slug: string) {
  const seller = getSellerBySlug(slug)
  if (!seller) return []
  return PRODUCTS.filter((p) => p.seller.id === seller.id)
}

