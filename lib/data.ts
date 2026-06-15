// Bazario — catalogue digital & IA (front-only). Will be swapped for Supabase queries.

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
  { slug: "agents-ia", name: "Agents IA", icon: "Bot", productCount: 1240, image: "/digital/cat-agents-ia.svg" },
  { slug: "prompts", name: "Prompts & GPTs", icon: "Sparkles", productCount: 3860, image: "/digital/cat-prompts.svg" },
  { slug: "templates", name: "Templates & UI Kits", icon: "LayoutTemplate", productCount: 2540, image: "/digital/cat-templates.svg" },
  { slug: "formations", name: "Formations & Masterclass", icon: "GraduationCap", productCount: 980, image: "/digital/cat-formations.svg" },
  { slug: "saas", name: "Apps & SaaS", icon: "Rocket", productCount: 1420, image: "/digital/cat-saas.svg" },
  { slug: "art-ia", name: "Art génératif", icon: "Palette", productCount: 5210, image: "/digital/cat-art-ia.svg" },
  { slug: "audio-ia", name: "Musique & Voix IA", icon: "AudioWaveform", productCount: 1680, image: "/digital/cat-audio-ia.svg" },
  { slug: "automatisations", name: "Automatisations", icon: "Workflow", productCount: 1150, image: "/digital/cat-automatisations.svg" },
]

export const SELLERS: Seller[] = [
  {
    id: "s1",
    name: "NeuraForge",
    slug: "neuraforge",
    rating: 4.9,
    reviewCount: 18420,
    country: "France",
    verified: true,
    logo: "/digital/seller-neuraforge.svg",
    productCount: 64,
  },
  {
    id: "s2",
    name: "PromptCraft Lab",
    slug: "promptcraft-lab",
    rating: 4.8,
    reviewCount: 26930,
    country: "France",
    verified: true,
    logo: "/digital/seller-promptcraft.svg",
    productCount: 212,
  },
  {
    id: "s3",
    name: "Quantum Studio",
    slug: "quantum-studio",
    rating: 4.9,
    reviewCount: 31100,
    country: "Allemagne",
    verified: true,
    logo: "/digital/seller-quantum.svg",
    productCount: 148,
  },
  {
    id: "s4",
    name: "Aether Audio",
    slug: "aether-audio",
    rating: 4.8,
    reviewCount: 12480,
    country: "Canada",
    verified: true,
    logo: "/digital/seller-aether.svg",
    productCount: 96,
  },
  {
    id: "s5",
    name: "Nova Academy",
    slug: "nova-academy",
    rating: 4.9,
    reviewCount: 9870,
    country: "France",
    verified: true,
    logo: "/digital/seller-nova-academy.svg",
    productCount: 38,
  },
]

export const baseReviews: Review[] = [
  {
    id: "r1",
    author: "Camille D.",
    avatar: "/avatar-1.jpg",
    rating: 5,
    date: "2026-05-12",
    title: "Accès instantané, qualité au rendez-vous",
    body: "Téléchargement reçu dans la seconde après le paiement. La documentation est limpide et les mises à jour arrivent vraiment chaque mois. Je recommande ce studio.",
    verified: true,
    helpful: 42,
  },
  {
    id: "r2",
    author: "Yanis B.",
    avatar: "/avatar-2.jpg",
    rating: 4,
    date: "2026-04-28",
    title: "Excellent rapport qualité/prix",
    body: "Le produit tient ses promesses et m'a fait gagner un temps fou. Petit bémol sur l'onboarding un peu dense, mais le support a répondu en moins d'une heure.",
    verified: true,
    helpful: 18,
  },
  {
    id: "r3",
    author: "Léa M.",
    avatar: "/avatar-3.jpg",
    rating: 5,
    date: "2026-04-14",
    title: "Game changer pour mon business",
    body: "Mis en place en une après-midi, résultats visibles dès la première semaine. La licence commerciale est claire et le créateur répond vite sur le chat Bazario.",
    verified: true,
    helpful: 56,
  },
]

const DIGITAL_DELIVERY = "Livraison numérique"
const INSTANT = "Accès instantané après paiement"
const GUARANTEE = "Garantie 14 jours satisfait ou remboursé"

export const PRODUCTS: Product[] = [
  // ───────── AGENTS IA ─────────
  {
    id: "p1",
    slug: "agent-orion-assistant-commercial",
    title: "Agent IA Orion — assistant commercial autonome 24/7",
    brand: "NeuraForge",
    description:
      "Orion qualifie vos leads, répond à vos prospects et relance vos devis pendant que vous dormez. Connecté à votre CRM, votre boîte mail et votre calendrier, il apprend votre ton et vos offres en 48 h. Tableau de bord temps réel, garde-fous configurables et passage à un humain en un clic. Installation guidée incluse.",
    category: "agents-ia",
    categoryPath: ["Agents IA", "Vente", "Assistants commerciaux"],
    seller: SELLERS[0],
    images: ["/digital/p-orion.svg", "/digital/p-orion-2.svg", "/digital/p-orion-3.svg"],
    price: 149.0,
    compareAtPrice: 249.0,
    currency: "EUR",
    rating: 4.9,
    reviewCount: 2340,
    sold: 18420,
    badges: ["flash", "bestseller"],
    variants: [
      { id: "v1", label: "Licence Solo", attrs: { Licence: "Solo (1 utilisateur)" }, price: 149, compareAtPrice: 249, stock: 999, sku: "NF-ORION-SOLO" },
      { id: "v2", label: "Licence Équipe", attrs: { Licence: "Équipe (5 utilisateurs)" }, price: 349, compareAtPrice: 549, stock: 999, sku: "NF-ORION-TEAM" },
      { id: "v3", label: "Licence Agence", attrs: { Licence: "Agence (revente autorisée)" }, price: 699, compareAtPrice: 999, stock: 500, sku: "NF-ORION-AGCY" },
    ],
    reviews: baseReviews,
    shippingFrom: DIGITAL_DELIVERY,
    estimatedDelivery: INSTANT,
    returns: GUARANTEE,
  },
  {
    id: "p2", slug: "agent-luna-support-client", title: "Agent IA Luna — support client multilingue instantané",
    brand: "NeuraForge", description: "Luna répond à 80 % de vos tickets en moins de 3 secondes, dans 28 langues. Elle s'entraîne sur votre FAQ, vos CGV et votre historique, escalade les cas sensibles et envoie un rapport hebdomadaire. Compatible site web, WhatsApp, Instagram et email.",
    category: "agents-ia", categoryPath: ["Agents IA", "Support", "Chatbots"], seller: SELLERS[0],
    images: ["/digital/p-luna.svg"], price: 99, compareAtPrice: 179, currency: "EUR",
    rating: 4.8, reviewCount: 1860, sold: 14210, badges: ["bestseller"],
    variants: [
      { id: "v1", label: "Starter", attrs: { Plan: "Starter — 1 000 conversations/mois" }, price: 99, compareAtPrice: 179, stock: 999, sku: "NF-LUNA-ST" },
      { id: "v2", label: "Business", attrs: { Plan: "Business — illimité" }, price: 249, compareAtPrice: 349, stock: 999, sku: "NF-LUNA-BIZ" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  {
    id: "p3", slug: "agent-atlas-prospection", title: "Agent Atlas — prospection LinkedIn 100 % automatisée",
    brand: "NeuraForge", description: "Atlas identifie vos prospects idéaux, rédige des messages personnalisés à partir de leur profil et gère les relances avec un timing humain. Quotas de sécurité intégrés, conformité RGPD et export CRM en un clic.",
    category: "agents-ia", categoryPath: ["Agents IA", "Vente", "Prospection"], seller: SELLERS[0],
    images: ["/digital/p-atlas.svg"], price: 129, currency: "EUR",
    rating: 4.7, reviewCount: 942, sold: 7860, badges: ["new"],
    variants: [
      { id: "v1", label: "Licence Solo", attrs: { Licence: "Solo" }, price: 129, stock: 999, sku: "NF-ATLAS-SOLO" },
      { id: "v2", label: "Licence Équipe", attrs: { Licence: "Équipe" }, price: 299, stock: 999, sku: "NF-ATLAS-TEAM" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  {
    id: "p4", slug: "agent-nova-redaction-seo", title: "Agent Nova — rédacteur SEO autonome (briefs → articles publiés)",
    brand: "NeuraForge", description: "Nova transforme un simple mot-clé en article optimisé : recherche sémantique, maillage interne, images générées, méta-données et publication directe sur WordPress, Shopify ou Webflow. Détection anti-duplicate et relecture par score de qualité.",
    category: "agents-ia", categoryPath: ["Agents IA", "Marketing", "SEO"], seller: SELLERS[0],
    images: ["/digital/p-nova-seo.svg"], price: 89, compareAtPrice: 149, currency: "EUR",
    rating: 4.8, reviewCount: 1280, sold: 9640, badges: ["flash"],
    variants: [
      { id: "v1", label: "20 articles/mois", attrs: { Plan: "Croissance — 20 articles/mois" }, price: 89, compareAtPrice: 149, stock: 999, sku: "NF-NOVA-20" },
      { id: "v2", label: "Illimité", attrs: { Plan: "Scale — illimité" }, price: 199, compareAtPrice: 299, stock: 999, sku: "NF-NOVA-INF" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  {
    id: "p5", slug: "agent-sentinel-veille", title: "Agent Sentinel — veille concurrentielle en temps réel",
    brand: "NeuraForge", description: "Sentinel surveille les prix, les lancements et les avis de vos concurrents 24/7 et vous alerte sur Slack, Discord ou email dès qu'un signal important apparaît. Synthèse hebdomadaire générée par IA avec recommandations actionnables.",
    category: "agents-ia", categoryPath: ["Agents IA", "Business", "Veille"], seller: SELLERS[0],
    images: ["/digital/p-sentinel.svg"], price: 79, currency: "EUR",
    rating: 4.6, reviewCount: 568, sold: 4320, badges: [],
    variants: [
      { id: "v1", label: "5 concurrents", attrs: { Plan: "5 concurrents suivis" }, price: 79, stock: 999, sku: "NF-SENT-5" },
      { id: "v2", label: "20 concurrents", attrs: { Plan: "20 concurrents suivis" }, price: 159, stock: 999, sku: "NF-SENT-20" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  // ───────── PROMPTS & GPTs ─────────
  {
    id: "p6", slug: "mega-pack-prompts-business-2026", title: "Méga-pack 2 500 prompts business 2026 — testés et classés",
    brand: "PromptCraft Lab", description: "2 500 prompts professionnels organisés en 32 catégories : vente, copywriting, stratégie, RH, finance, productivité. Chaque prompt est testé sur les derniers modèles, livré dans Notion + PDF + JSON, avec mises à jour à vie incluses.",
    category: "prompts", categoryPath: ["Prompts & GPTs", "Business", "Packs"], seller: SELLERS[1],
    images: ["/digital/p-promptpack.svg"], price: 29, compareAtPrice: 59, currency: "EUR",
    rating: 4.8, reviewCount: 4280, sold: 32400, badges: ["bestseller", "flash"],
    variants: [
      { id: "v1", label: "Licence Personnelle", attrs: { Licence: "Personnelle" }, price: 29, compareAtPrice: 59, stock: 9999, sku: "PC-MEGA-PERS" },
      { id: "v2", label: "Licence Commerciale", attrs: { Licence: "Commerciale" }, price: 59, compareAtPrice: 99, stock: 9999, sku: "PC-MEGA-COM" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  {
    id: "p7", slug: "prompts-midjourney-cinematique", title: "Pack 800 prompts Midjourney cinématiques — style blockbuster",
    brand: "PromptCraft Lab", description: "800 prompts photo-réalistes calibrés pour Midjourney v7 : éclairages de cinéma, palettes étalonnées, focales précises. Inclut un guide des paramètres avancés et 50 styles signature prêts à copier-coller.",
    category: "prompts", categoryPath: ["Prompts & GPTs", "Créatif", "Midjourney"], seller: SELLERS[1],
    images: ["/digital/p-mj-cine.svg"], price: 24, currency: "EUR",
    rating: 4.7, reviewCount: 1890, sold: 15600, badges: ["bestseller"],
    variants: [
      { id: "v1", label: "Pack complet", attrs: { Format: "Notion + PDF" }, price: 24, stock: 9999, sku: "PC-MJ-CINE" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  {
    id: "p8", slug: "gpt-sur-mesure-coach-vente", title: "GPT sur mesure « Coach de vente » — entraîné sur 1 200 scripts",
    brand: "PromptCraft Lab", description: "Un assistant GPT personnalisé qui simule vos appels de vente, analyse vos objections et améliore votre closing. Livré clé en main avec accès privé, guide d'utilisation vidéo et 3 mois d'ajustements offerts.",
    category: "prompts", categoryPath: ["Prompts & GPTs", "Business", "GPTs personnalisés"], seller: SELLERS[1],
    images: ["/digital/p-gpt-coach.svg"], price: 49, compareAtPrice: 79, currency: "EUR",
    rating: 4.8, reviewCount: 760, sold: 5240, badges: ["new"],
    variants: [
      { id: "v1", label: "Accès individuel", attrs: { Licence: "Individuelle" }, price: 49, compareAtPrice: 79, stock: 9999, sku: "PC-GPT-COACH" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  {
    id: "p9", slug: "systeme-prompts-copywriting", title: "CopyForge — système de prompts copywriting haute conversion",
    brand: "PromptCraft Lab", description: "La méthode complète pour générer pages de vente, emails et publicités qui convertissent : 420 prompts chaînés, 12 frameworks (AIDA, PAS, 4P…), exemples avant/après et calculateur de structure d'offre.",
    category: "prompts", categoryPath: ["Prompts & GPTs", "Marketing", "Copywriting"], seller: SELLERS[1],
    images: ["/digital/p-copy-system.svg"], price: 39, compareAtPrice: 79, currency: "EUR",
    rating: 4.9, reviewCount: 1420, sold: 11200, badges: ["premium", "flash"],
    variants: [
      { id: "v1", label: "Licence Personnelle", attrs: { Licence: "Personnelle" }, price: 39, compareAtPrice: 79, stock: 9999, sku: "PC-COPY-PERS" },
      { id: "v2", label: "Licence Agence", attrs: { Licence: "Agence" }, price: 89, compareAtPrice: 149, stock: 9999, sku: "PC-COPY-AGCY" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  {
    id: "p10", slug: "bibliotheque-prompts-developpeur", title: "Bibliothèque 1 200 prompts développeur — code, debug, archi",
    brand: "PromptCraft Lab", description: "1 200 prompts techniques pour accélérer votre workflow : revue de code, tests unitaires, refactoring, documentation, architecture. Classés par langage (JS/TS, Python, Go, Rust) et intégrables dans Cursor, Copilot ou Claude Code.",
    category: "prompts", categoryPath: ["Prompts & GPTs", "Tech", "Développement"], seller: SELLERS[1],
    images: ["/digital/p-dev-prompts.svg"], price: 19, currency: "EUR",
    rating: 4.7, reviewCount: 980, sold: 8740, badges: [],
    variants: [
      { id: "v1", label: "Pack complet", attrs: { Format: "JSON + Markdown" }, price: 19, stock: 9999, sku: "PC-DEV-1200" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  // ───────── TEMPLATES & UI KITS ─────────
  {
    id: "p11", slug: "second-cerveau-os-notion", title: "Second Cerveau OS — le template Notion ultime",
    brand: "Quantum Studio", description: "Un système complet de gestion de vie et de business dans Notion : projets, objectifs, finances, contenu, CRM léger et tableau de bord IA. 9 modules interconnectés, vidéos d'installation et version FR/EN.",
    category: "templates", categoryPath: ["Templates & UI Kits", "Productivité", "Notion"], seller: SELLERS[2],
    images: ["/digital/p-notion-os.svg"], price: 49, compareAtPrice: 89, currency: "EUR",
    rating: 4.9, reviewCount: 3120, sold: 24800, badges: ["bestseller", "premium"],
    variants: [
      { id: "v1", label: "Licence Personnelle", attrs: { Licence: "Personnelle" }, price: 49, compareAtPrice: 89, stock: 9999, sku: "QS-NOTION-PERS" },
      { id: "v2", label: "Licence Équipe", attrs: { Licence: "Équipe" }, price: 119, compareAtPrice: 179, stock: 9999, sku: "QS-NOTION-TEAM" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  {
    id: "p12", slug: "ui-kit-nebula-react", title: "Nebula UI — 450 composants React/Tailwind futuristes",
    brand: "Quantum Studio", description: "450 composants dark-mode prêts pour la production : dashboards, pricing, landing IA, graphiques animés. TypeScript strict, accessibilité AA, Figma source inclus et thème néon personnalisable en une variable.",
    category: "templates", categoryPath: ["Templates & UI Kits", "Développement", "React"], seller: SELLERS[2],
    images: ["/digital/p-nebula-ui.svg"], price: 79, compareAtPrice: 129, currency: "EUR",
    rating: 4.8, reviewCount: 1640, sold: 9820, badges: ["flash", "premium"],
    variants: [
      { id: "v1", label: "Licence Solo", attrs: { Licence: "Solo dev" }, price: 79, compareAtPrice: 129, stock: 9999, sku: "QS-NEBULA-SOLO" },
      { id: "v2", label: "Licence Équipe", attrs: { Licence: "Équipe (10 devs)" }, price: 199, compareAtPrice: 299, stock: 9999, sku: "QS-NEBULA-TEAM" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  {
    id: "p13", slug: "starter-saas-nextjs-launchpad", title: "LaunchPad — starter SaaS Next.js (paiements, auth, IA inclus)",
    brand: "Quantum Studio", description: "Lancez votre SaaS en un week-end : Next.js App Router, Stripe abonnements, auth Supabase, emails transactionnels, intégration IA prête à l'emploi et déploiement Vercel en un clic. Documentation pas-à-pas en français.",
    category: "templates", categoryPath: ["Templates & UI Kits", "Développement", "Starters"], seller: SELLERS[2],
    images: ["/digital/p-saas-starter.svg"], price: 149, compareAtPrice: 249, currency: "EUR",
    rating: 4.9, reviewCount: 890, sold: 5680, badges: ["bestseller", "new"],
    variants: [
      { id: "v1", label: "Licence 1 projet", attrs: { Licence: "1 projet" }, price: 149, compareAtPrice: 249, stock: 9999, sku: "QS-LP-1" },
      { id: "v2", label: "Licence illimitée", attrs: { Licence: "Projets illimités" }, price: 299, compareAtPrice: 449, stock: 9999, sku: "QS-LP-INF" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  {
    id: "p14", slug: "pack-300-templates-canva-ia", title: "Pack 300 templates Canva boostés IA — réseaux sociaux",
    brand: "Quantum Studio", description: "300 templates Canva modernes pour Instagram, TikTok, LinkedIn et YouTube, avec prompts IA assortis pour générer vos visuels et légendes en série. Formats stories, reels, carrousels et miniatures inclus.",
    category: "templates", categoryPath: ["Templates & UI Kits", "Créatif", "Canva"], seller: SELLERS[2],
    images: ["/digital/p-canva-pack.svg"], price: 29, currency: "EUR",
    rating: 4.6, reviewCount: 2140, sold: 17300, badges: ["flash"],
    variants: [
      { id: "v1", label: "Pack complet", attrs: { Format: "Liens Canva + guide" }, price: 29, stock: 9999, sku: "QS-CANVA-300" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  {
    id: "p15", slug: "template-framer-quantum-3d", title: "Quantum — template Framer portfolio 3D immersif",
    brand: "Quantum Studio", description: "Un portfolio Framer spectaculaire : scènes 3D interactives, transitions fluides, mode sombre natif et CMS intégré. Optimisé Core Web Vitals, responsive parfait et personnalisable sans code.",
    category: "templates", categoryPath: ["Templates & UI Kits", "Créatif", "Framer"], seller: SELLERS[2],
    images: ["/digital/p-framer-3d.svg"], price: 69, compareAtPrice: 99, currency: "EUR",
    rating: 4.8, reviewCount: 540, sold: 3460, badges: ["new", "premium"],
    variants: [
      { id: "v1", label: "Licence standard", attrs: { Licence: "1 site" }, price: 69, compareAtPrice: 99, stock: 9999, sku: "QS-FRAMER-3D" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  // ───────── FORMATIONS ─────────
  {
    id: "p16", slug: "masterclass-ia-generative", title: "Masterclass IA générative — de zéro à professionnel en 6 semaines",
    brand: "Nova Academy", description: "42 h de vidéo, 6 projets concrets, accès à la communauté privée et certification finale. Vous maîtriserez les LLM, la génération d'images, les agents et l'intégration de l'IA dans un vrai business. Mises à jour à vie à chaque nouveau modèle.",
    category: "formations", categoryPath: ["Formations", "IA", "Masterclass"], seller: SELLERS[4],
    images: ["/digital/p-masterclass-ia.svg"], price: 199, compareAtPrice: 349, currency: "EUR",
    rating: 4.9, reviewCount: 1840, sold: 8920, badges: ["bestseller", "premium"],
    variants: [
      { id: "v1", label: "Accès complet", attrs: { Accès: "À vie + certification" }, price: 199, compareAtPrice: 349, stock: 9999, sku: "NA-MC-IA" },
      { id: "v2", label: "Accès + coaching", attrs: { Accès: "À vie + 3 sessions 1:1" }, price: 449, compareAtPrice: 649, stock: 200, sku: "NA-MC-IA-COACH" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  {
    id: "p17", slug: "formation-automatisation-business", title: "Formation Automatisation — libérez 20 h par semaine",
    brand: "Nova Academy", description: "Apprenez à automatiser votre business avec n8n, Make et les agents IA : facturation, prospection, contenu, support. 28 h de vidéo, 40 workflows téléchargeables et études de cas chiffrées.",
    category: "formations", categoryPath: ["Formations", "Productivité", "Automatisation"], seller: SELLERS[4],
    images: ["/digital/p-auto-formation.svg"], price: 149, currency: "EUR",
    rating: 4.8, reviewCount: 920, sold: 5340, badges: ["bestseller"],
    variants: [
      { id: "v1", label: "Accès à vie", attrs: { Accès: "À vie" }, price: 149, stock: 9999, sku: "NA-AUTO" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  {
    id: "p18", slug: "bootcamp-prompt-engineering", title: "Bootcamp Prompt Engineering certifiant — cohorte live",
    brand: "Nova Academy", description: "4 semaines intensives en live avec nos instructeurs : techniques avancées de prompting, function calling, RAG, évaluation. Projets corrigés individuellement, certificat vérifiable et accès alumni à vie. Places limitées par cohorte.",
    category: "formations", categoryPath: ["Formations", "IA", "Bootcamps"], seller: SELLERS[4],
    images: ["/digital/p-bootcamp-prompt.svg"], price: 249, compareAtPrice: 399, currency: "EUR",
    rating: 4.9, reviewCount: 480, sold: 2180, badges: ["new", "premium"],
    variants: [
      { id: "v1", label: "Cohorte juillet", attrs: { Session: "Juillet 2026" }, price: 249, compareAtPrice: 399, stock: 60, sku: "NA-BOOT-JUL" },
      { id: "v2", label: "Cohorte septembre", attrs: { Session: "Septembre 2026" }, price: 249, compareAtPrice: 399, stock: 120, sku: "NA-BOOT-SEP" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  {
    id: "p19", slug: "creez-vos-agents-ia-sans-coder", title: "Créez vos agents IA sans coder — formation no-code complète",
    brand: "Nova Academy", description: "Construisez des agents IA opérationnels sans écrire une ligne de code : 18 h de vidéo, 12 agents prêts à dupliquer (support, vente, contenu, veille) et un module monétisation pour revendre vos créations.",
    category: "formations", categoryPath: ["Formations", "IA", "No-code"], seller: SELLERS[4],
    images: ["/digital/p-agents-nocode.svg"], price: 179, compareAtPrice: 299, currency: "EUR",
    rating: 4.8, reviewCount: 640, sold: 3780, badges: ["flash"],
    variants: [
      { id: "v1", label: "Accès à vie", attrs: { Accès: "À vie" }, price: 179, compareAtPrice: 299, stock: 9999, sku: "NA-NOCODE" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  {
    id: "p20", slug: "accelerateur-ecommerce-ia", title: "Accélérateur E-commerce × IA — vendez plus, travaillez moins",
    brand: "Nova Academy", description: "Le programme complet pour propulser votre boutique avec l'IA : fiches produits générées, publicités optimisées, service client automatisé, pricing dynamique. 35 h de contenu, templates inclus et suivi de cohorte sur 8 semaines.",
    category: "formations", categoryPath: ["Formations", "Business", "E-commerce"], seller: SELLERS[4],
    images: ["/digital/p-ecom-ia.svg"], price: 299, compareAtPrice: 499, currency: "EUR",
    rating: 4.9, reviewCount: 380, sold: 1920, badges: ["premium"],
    variants: [
      { id: "v1", label: "Programme complet", attrs: { Accès: "À vie + communauté" }, price: 299, compareAtPrice: 499, stock: 9999, sku: "NA-ECOM-IA" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  // ───────── APPS & SAAS ─────────
  {
    id: "p21", slug: "pixelmind-pro-licence-a-vie", title: "PixelMind Pro — générateur d'images IA (licence à vie)",
    brand: "Quantum Studio", description: "Générez des visuels professionnels illimités : photos produits, mockups, illustrations. Licence à vie sans abonnement, droits commerciaux complets, upscale 8K et suppression d'arrière-plan intégrée. Deal exclusif Bazario.",
    category: "saas", categoryPath: ["Apps & SaaS", "Créatif", "Génération d'images"], seller: SELLERS[2],
    images: ["/digital/p-pixelmind.svg"], price: 199, compareAtPrice: 399, currency: "EUR",
    rating: 4.8, reviewCount: 1240, sold: 7420, badges: ["flash", "bestseller"],
    variants: [
      { id: "v1", label: "Licence à vie Solo", attrs: { Licence: "À vie — 1 poste" }, price: 199, compareAtPrice: 399, stock: 999, sku: "QS-PXM-LIFE" },
      { id: "v2", label: "Licence à vie Studio", attrs: { Licence: "À vie — 5 postes" }, price: 449, compareAtPrice: 799, stock: 500, sku: "QS-PXM-STUDIO" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  {
    id: "p22", slug: "scribe-ia-redaction-12-mois", title: "Scribe IA — assistant rédaction premium (12 mois)",
    brand: "NeuraForge", description: "L'assistant d'écriture qui s'adapte à votre style : articles, newsletters, posts, scripts vidéo. Mémoire de marque, vérification factuelle intégrée et export direct vers vos outils. 12 mois d'accès complet.",
    category: "saas", categoryPath: ["Apps & SaaS", "Marketing", "Rédaction"], seller: SELLERS[0],
    images: ["/digital/p-scribe.svg"], price: 99, currency: "EUR",
    rating: 4.7, reviewCount: 860, sold: 6240, badges: [],
    variants: [
      { id: "v1", label: "12 mois", attrs: { Durée: "12 mois" }, price: 99, stock: 9999, sku: "NF-SCRIBE-12" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  {
    id: "p23", slug: "clearvoice-studio-clonage-vocal", title: "ClearVoice Studio — clonage vocal éthique pour créateurs",
    brand: "Aether Audio", description: "Clonez votre propre voix en 10 minutes et générez voix off, podcasts et doublages dans 14 langues. Consentement vérifié, filigrane audio invisible et qualité broadcast 48 kHz. Crédits inclus : 500 minutes.",
    category: "saas", categoryPath: ["Apps & SaaS", "Audio", "Voix"], seller: SELLERS[3],
    images: ["/digital/p-clearvoice.svg"], price: 149, compareAtPrice: 199, currency: "EUR",
    rating: 4.8, reviewCount: 540, sold: 3180, badges: ["new"],
    variants: [
      { id: "v1", label: "500 minutes", attrs: { Crédits: "500 min" }, price: 149, compareAtPrice: 199, stock: 9999, sku: "AA-CV-500" },
      { id: "v2", label: "2 000 minutes", attrs: { Crédits: "2 000 min" }, price: 349, compareAtPrice: 449, stock: 9999, sku: "AA-CV-2000" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  {
    id: "p24", slug: "datalens-analytics-predictif", title: "DataLens — analytics prédictif pour e-commerce",
    brand: "Quantum Studio", description: "Anticipez vos ventes, détectez les ruptures avant qu'elles n'arrivent et identifiez vos clients à risque de churn. Connecteurs Shopify, WooCommerce et Stripe, prédictions expliquées en français clair.",
    category: "saas", categoryPath: ["Apps & SaaS", "Business", "Analytics"], seller: SELLERS[2],
    images: ["/digital/p-datalens.svg"], price: 129, compareAtPrice: 199, currency: "EUR",
    rating: 4.7, reviewCount: 420, sold: 2640, badges: ["premium"],
    variants: [
      { id: "v1", label: "Licence annuelle", attrs: { Durée: "12 mois" }, price: 129, compareAtPrice: 199, stock: 9999, sku: "QS-DL-12" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  {
    id: "p25", slug: "holoboard-whiteboard-3d", title: "HoloBoard — tableau blanc collaboratif 3D avec copilote IA",
    brand: "Quantum Studio", description: "Brainstormez dans un espace 3D infini : mind-maps génératives, résumés automatiques de réunion, exports Notion et Figma. Jusqu'à 50 collaborateurs en temps réel. Licence 12 mois, toutes fonctionnalités.",
    category: "saas", categoryPath: ["Apps & SaaS", "Productivité", "Collaboration"], seller: SELLERS[2],
    images: ["/digital/p-holoboard.svg"], price: 59, currency: "EUR",
    rating: 4.6, reviewCount: 380, sold: 2120, badges: ["new"],
    variants: [
      { id: "v1", label: "12 mois", attrs: { Durée: "12 mois" }, price: 59, stock: 9999, sku: "QS-HOLO-12" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  // ───────── ART GÉNÉRATIF ─────────
  {
    id: "p26", slug: "pack-500-artworks-cyberpunk-4k", title: "Cyber Vault — 500 artworks cyberpunk 4K libres de droits",
    brand: "Aether Audio", description: "500 œuvres uniques en 4K : mégalopoles néon, portraits augmentés, véhicules du futur. Licence commerciale complète pour vos sites, vidéos, NFT et merchandising. Fichiers PNG + sources éditables.",
    category: "art-ia", categoryPath: ["Art génératif", "Illustrations", "Cyberpunk"], seller: SELLERS[3],
    images: ["/digital/p-cyberpack.svg"], price: 39, compareAtPrice: 69, currency: "EUR",
    rating: 4.8, reviewCount: 1680, sold: 12800, badges: ["flash", "bestseller"],
    variants: [
      { id: "v1", label: "Licence Personnelle", attrs: { Licence: "Personnelle" }, price: 39, compareAtPrice: 69, stock: 9999, sku: "AA-CYBER-PERS" },
      { id: "v2", label: "Licence Commerciale", attrs: { Licence: "Commerciale étendue" }, price: 79, compareAtPrice: 119, stock: 9999, sku: "AA-CYBER-COM" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  {
    id: "p27", slug: "120-avatars-ia-professionnels", title: "120 avatars IA professionnels générés sur mesure",
    brand: "Aether Audio", description: "Envoyez 10 selfies, recevez 120 portraits professionnels en 24 h : studio corporate, lumière cinéma, styles créatifs. Parfait pour LinkedIn, site web et profils réseaux. Retouches illimitées pendant 7 jours.",
    category: "art-ia", categoryPath: ["Art génératif", "Portraits", "Avatars"], seller: SELLERS[3],
    images: ["/digital/p-avatars.svg"], price: 29, currency: "EUR",
    rating: 4.7, reviewCount: 2240, sold: 18600, badges: ["bestseller"],
    variants: [
      { id: "v1", label: "Pack 120 avatars", attrs: { Format: "PNG haute résolution" }, price: 29, stock: 9999, sku: "AA-AVATAR-120" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: "Livré sous 24 h dans votre espace", returns: GUARANTEE,
  },
  {
    id: "p28", slug: "1000-textures-sci-fi-seamless", title: "Bibliothèque 1 000 textures sci-fi seamless 8K",
    brand: "Aether Audio", description: "1 000 textures sans couture en 8K pour vos jeux, rendus 3D et motion design : métaux brossés, panneaux holographiques, circuits, surfaces alien. PBR complet (albedo, normal, roughness) inclus.",
    category: "art-ia", categoryPath: ["Art génératif", "3D", "Textures"], seller: SELLERS[3],
    images: ["/digital/p-textures.svg"], price: 49, currency: "EUR",
    rating: 4.8, reviewCount: 460, sold: 3240, badges: ["premium"],
    variants: [
      { id: "v1", label: "Licence studio", attrs: { Licence: "Studio illimitée" }, price: 49, stock: 9999, sku: "AA-TEX-1000" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  {
    id: "p29", slug: "pack-60-luts-cinema-neon", title: "Pack 60 LUTs cinéma néon — étalonnage futuriste",
    brand: "Aether Audio", description: "60 LUTs professionnels inspirés des blockbusters sci-fi : nuits néon, teal & orange augmenté, hologramme. Compatibles Premiere, DaVinci, Final Cut et CapCut. Avant/après inclus pour chaque LUT.",
    category: "art-ia", categoryPath: ["Art génératif", "Vidéo", "LUTs"], seller: SELLERS[3],
    images: ["/digital/p-luts-neon.svg"], price: 24, compareAtPrice: 39, currency: "EUR",
    rating: 4.7, reviewCount: 890, sold: 7120, badges: ["flash"],
    variants: [
      { id: "v1", label: "Pack complet", attrs: { Format: ".cube universel" }, price: 24, compareAtPrice: 39, stock: 9999, sku: "AA-LUT-60" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  {
    id: "p30", slug: "pack-350-illustrations-3d-isometriques", title: "Pack 350 illustrations 3D isométriques — tech & business",
    brand: "Aether Audio", description: "350 illustrations 3D isométriques cohérentes pour vos landing pages, pitch decks et applications : data, IA, finance, équipe, croissance. PNG fond transparent + fichiers Blender sources.",
    category: "art-ia", categoryPath: ["Art génératif", "Illustrations", "3D"], seller: SELLERS[3],
    images: ["/digital/p-iso-3d.svg"], price: 35, currency: "EUR",
    rating: 4.6, reviewCount: 520, sold: 4180, badges: ["new"],
    variants: [
      { id: "v1", label: "Licence commerciale", attrs: { Licence: "Commerciale" }, price: 35, stock: 9999, sku: "AA-ISO-350" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  // ───────── MUSIQUE & VOIX IA ─────────
  {
    id: "p31", slug: "banque-2000-musiques-ia-libres", title: "Banque 2 000 musiques IA libres de droits — tous genres",
    brand: "Aether Audio", description: "2 000 titres composés par IA et masterisés par nos ingénieurs du son : électro, cinématique, lo-fi, corporate. Licence monde entière pour YouTube, podcasts, publicités et jeux. Nouveaux titres chaque mois.",
    category: "audio-ia", categoryPath: ["Musique & Voix IA", "Musique", "Banques"], seller: SELLERS[3],
    images: ["/digital/p-music-bank.svg"], price: 59, compareAtPrice: 99, currency: "EUR",
    rating: 4.8, reviewCount: 1120, sold: 8460, badges: ["bestseller", "flash"],
    variants: [
      { id: "v1", label: "Accès 12 mois", attrs: { Durée: "12 mois + nouveautés" }, price: 59, compareAtPrice: 99, stock: 9999, sku: "AA-MUS-12" },
      { id: "v2", label: "Accès à vie", attrs: { Durée: "À vie" }, price: 129, compareAtPrice: 199, stock: 9999, sku: "AA-MUS-LIFE" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  {
    id: "p32", slug: "studio-voix-off-ia-francaise", title: "Studio voix off IA française — 50 voix ultra-réalistes",
    brand: "Aether Audio", description: "50 voix françaises indiscernables de l'humain pour vos vidéos, publicités, formations et standards téléphoniques. Contrôle de l'émotion, de la vitesse et des pauses. Export WAV broadcast et licence commerciale.",
    category: "audio-ia", categoryPath: ["Musique & Voix IA", "Voix", "Voix off"], seller: SELLERS[3],
    images: ["/digital/p-voixoff.svg"], price: 79, currency: "EUR",
    rating: 4.7, reviewCount: 680, sold: 4920, badges: ["bestseller"],
    variants: [
      { id: "v1", label: "300 000 caractères", attrs: { Crédits: "300k caractères" }, price: 79, stock: 9999, sku: "AA-VO-300K" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  {
    id: "p33", slug: "ultra-pack-5000-samples-synthwave", title: "Ultra pack 5 000 samples synthwave & cyberpunk",
    brand: "Aether Audio", description: "5 000 samples 24-bit : basses analogiques, arpèges néon, drums rétro-futuristes, nappes spatiales. Classés par BPM et tonalité, compatibles Ableton, FL Studio et Logic. 100 % libres de droits.",
    category: "audio-ia", categoryPath: ["Musique & Voix IA", "Production", "Samples"], seller: SELLERS[3],
    images: ["/digital/p-synthwave.svg"], price: 45, currency: "EUR",
    rating: 4.8, reviewCount: 740, sold: 5680, badges: ["premium"],
    variants: [
      { id: "v1", label: "Pack complet", attrs: { Format: "WAV 24-bit" }, price: 45, stock: 9999, sku: "AA-SW-5000" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  {
    id: "p34", slug: "kit-sound-design-futuriste", title: "Kit sound design futuriste — UI, interfaces & SFX",
    brand: "Aether Audio", description: "800 effets sonores conçus pour les produits du futur : notifications holographiques, transitions, whooshs, interfaces. Le kit utilisé par les studios d'applications et de jeux indés. WAV + Ableton rack inclus.",
    category: "audio-ia", categoryPath: ["Musique & Voix IA", "Production", "SFX"], seller: SELLERS[3],
    images: ["/digital/p-sfx-kit.svg"], price: 39, currency: "EUR",
    rating: 4.6, reviewCount: 320, sold: 2480, badges: ["new"],
    variants: [
      { id: "v1", label: "Kit complet", attrs: { Format: "WAV 48 kHz" }, price: 39, stock: 9999, sku: "AA-SFX-800" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  {
    id: "p35", slug: "podcast-toolkit-ia-montage-auto", title: "Podcast Toolkit IA — montage et diffusion automatiques",
    brand: "Aether Audio", description: "Enregistrez, l'IA fait le reste : suppression des silences et des « euh », mixage broadcast, chapitres, transcription, extraits viraux pour TikTok et notes d'épisode. Publiez sur toutes les plateformes en un clic.",
    category: "audio-ia", categoryPath: ["Musique & Voix IA", "Podcast", "Outils"], seller: SELLERS[3],
    images: ["/digital/p-podcast-kit.svg"], price: 69, compareAtPrice: 119, currency: "EUR",
    rating: 4.7, reviewCount: 440, sold: 2860, badges: ["flash"],
    variants: [
      { id: "v1", label: "12 mois", attrs: { Durée: "12 mois" }, price: 69, compareAtPrice: 119, stock: 9999, sku: "AA-POD-12" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  // ───────── AUTOMATISATIONS ─────────
  {
    id: "p36", slug: "pack-120-workflows-n8n-ecommerce", title: "Pack 120 workflows n8n e-commerce prêts à importer",
    brand: "NeuraForge", description: "120 automatisations testées en production : synchronisation stocks, relances panier, avis clients, alertes marge, reporting quotidien. Import en un clic, documentation vidéo et schémas annotés en français.",
    category: "automatisations", categoryPath: ["Automatisations", "E-commerce", "n8n"], seller: SELLERS[0],
    images: ["/digital/p-n8n-pack.svg"], price: 79, compareAtPrice: 139, currency: "EUR",
    rating: 4.9, reviewCount: 980, sold: 6840, badges: ["bestseller", "flash"],
    variants: [
      { id: "v1", label: "Licence Solo", attrs: { Licence: "Solo" }, price: 79, compareAtPrice: 139, stock: 9999, sku: "NF-N8N-SOLO" },
      { id: "v2", label: "Licence Agence", attrs: { Licence: "Agence (clients illimités)" }, price: 189, compareAtPrice: 299, stock: 9999, sku: "NF-N8N-AGCY" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  {
    id: "p37", slug: "200-automatisations-marketing", title: "200 automatisations marketing prêtes à l'emploi (Make & Zapier)",
    brand: "NeuraForge", description: "200 scénarios marketing à dupliquer : nurturing email, scoring de leads, republication de contenu, monitoring de marque. Compatibles Make et Zapier, avec temps de mise en place estimé pour chaque scénario.",
    category: "automatisations", categoryPath: ["Automatisations", "Marketing", "Make & Zapier"], seller: SELLERS[0],
    images: ["/digital/p-zapier-mkt.svg"], price: 59, currency: "EUR",
    rating: 4.7, reviewCount: 620, sold: 4480, badges: [],
    variants: [
      { id: "v1", label: "Pack complet", attrs: { Format: "Blueprints + guide" }, price: 59, stock: 9999, sku: "NF-MKT-200" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  {
    id: "p38", slug: "blueprint-crm-autopilot", title: "Blueprint CRM Autopilot — votre pipeline 100 % automatisé",
    brand: "NeuraForge", description: "Le système complet pour un CRM qui travaille seul : enrichissement automatique des contacts, scoring IA, relances intelligentes et rapports hebdomadaires. Compatible HubSpot, Pipedrive et Notion. Installation guidée en 2 h.",
    category: "automatisations", categoryPath: ["Automatisations", "Vente", "CRM"], seller: SELLERS[0],
    images: ["/digital/p-crm-autopilot.svg"], price: 99, currency: "EUR",
    rating: 4.8, reviewCount: 410, sold: 2740, badges: ["premium"],
    variants: [
      { id: "v1", label: "Blueprint complet", attrs: { Format: "Workflows + vidéos" }, price: 99, stock: 9999, sku: "NF-CRM-AP" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  {
    id: "p39", slug: "social-media-machine", title: "Social Media Machine — 30 jours de contenu en 30 minutes",
    brand: "NeuraForge", description: "Un pipeline complet qui transforme une idée en 30 jours de posts multi-plateformes : génération, visuels, planification et publication automatique. Calibré pour Instagram, LinkedIn, TikTok et X. Statistiques unifiées incluses.",
    category: "automatisations", categoryPath: ["Automatisations", "Marketing", "Réseaux sociaux"], seller: SELLERS[0],
    images: ["/digital/p-social-machine.svg"], price: 89, compareAtPrice: 149, currency: "EUR",
    rating: 4.8, reviewCount: 760, sold: 5120, badges: ["new", "flash"],
    variants: [
      { id: "v1", label: "Licence Solo", attrs: { Licence: "Solo" }, price: 89, compareAtPrice: 149, stock: 9999, sku: "NF-SMM-SOLO" },
      { id: "v2", label: "Licence Agence", attrs: { Licence: "Agence" }, price: 219, compareAtPrice: 349, stock: 9999, sku: "NF-SMM-AGCY" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
  },
  {
    id: "p40", slug: "kit-facturation-relances-automatiques", title: "FactureBot — kit facturation & relances automatiques",
    brand: "NeuraForge", description: "Fini les impayés : devis, factures conformes, relances graduées et réconciliation bancaire, le tout sans intervention. Conforme à la facturation électronique française 2026. Compatible Stripe, Qonto et Pennylane.",
    category: "automatisations", categoryPath: ["Automatisations", "Finance", "Facturation"], seller: SELLERS[0],
    images: ["/digital/p-invoice-kit.svg"], price: 49, currency: "EUR",
    rating: 4.7, reviewCount: 530, sold: 3960, badges: ["bestseller"],
    variants: [
      { id: "v1", label: "Kit complet", attrs: { Format: "Workflows + modèles" }, price: 49, stock: 9999, sku: "NF-FACT-KIT" },
    ],
    reviews: baseReviews, shippingFrom: DIGITAL_DELIVERY, estimatedDelivery: INSTANT, returns: GUARANTEE,
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

export const FLASH_SALE_END = "2026-06-30T23:59:59"

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
    id: "BZ-20266102",
    date: "8 juin 2026",
    status: "delivered",
    statusLabel: "Livrée dans votre espace",
    total: 228,
    items: [
      {
        title: "Agent IA Orion — assistant commercial autonome 24/7",
        image: "/digital/p-orion.svg",
        qty: 1,
        price: 149,
        sellerId: "neuraforge",
      },
      {
        title: "Nebula UI — 450 composants React/Tailwind futuristes",
        image: "/digital/p-nebula-ui.svg",
        qty: 1,
        price: 79,
        sellerId: "quantum",
      },
    ],
  },
  {
    id: "BZ-20266087",
    date: "2 juin 2026",
    status: "shipped",
    statusLabel: "Génération en cours (avatars sous 24 h)",
    total: 29,
    trackingUrl: "#",
    items: [
      {
        title: "120 avatars IA professionnels générés sur mesure",
        image: "/digital/p-avatars.svg",
        qty: 1,
        price: 29,
        sellerId: "aether",
      },
    ],
  },
  {
    id: "BZ-20266055",
    date: "27 mai 2026",
    status: "pending",
    statusLabel: "Paiement en cours de validation",
    total: 199,
    items: [
      {
        title: "Masterclass IA générative — de zéro à professionnel",
        image: "/digital/p-masterclass-ia.svg",
        qty: 1,
        price: 199,
        sellerId: "nova-academy",
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
    label: "Facturation",
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
    label: "Société",
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
    sellerId: "s1",
    sellerName: "NeuraForge",
    sellerLogo: "/digital/seller-neuraforge.svg",
    subject: "Connexion d'Orion à mon CRM",
    unread: 1,
    lastAt: "il y a 12 min",
    productImage: "/digital/p-orion.svg",
    productTitle: "Agent IA Orion — assistant commercial",
    messages: [
      { id: "m-1", fromMe: true, body: "Bonjour, Orion est-il compatible avec Pipedrive ?", time: "10:14" },
      { id: "m-2", fromMe: false, body: "Bonjour ! Oui, connecteur natif Pipedrive, HubSpot et Notion. L'installation prend 10 minutes.", time: "10:21" },
      { id: "m-3", fromMe: true, body: "Parfait, et les mises à jour sont incluses ?", time: "10:22" },
      { id: "m-4", fromMe: false, body: "Oui, mises à jour à vie + garantie 14 jours satisfait ou remboursé via Bazario.", time: "10:24" },
    ],
  },
  {
    id: "t-2",
    sellerId: "s3",
    sellerName: "Quantum Studio",
    sellerLogo: "/digital/seller-quantum.svg",
    subject: "Licence équipe Nebula UI",
    unread: 0,
    lastAt: "hier",
    productImage: "/digital/p-nebula-ui.svg",
    productTitle: "Nebula UI — 450 composants React/Tailwind",
    messages: [
      { id: "m-1", fromMe: true, body: "Bonjour, la licence équipe couvre combien de développeurs ?", time: "hier · 14:02" },
      { id: "m-2", fromMe: false, body: "Jusqu'à 10 développeurs, projets clients illimités. Le Figma source est inclus.", time: "hier · 14:18" },
    ],
  },
  {
    id: "t-3",
    sellerId: "s5",
    sellerName: "Nova Academy",
    sellerLogo: "/digital/seller-nova-academy.svg",
    subject: "Prochaine cohorte du bootcamp",
    unread: 0,
    lastAt: "lun.",
    productImage: "/digital/p-bootcamp-prompt.svg",
    productTitle: "Bootcamp Prompt Engineering certifiant",
    messages: [
      { id: "m-1", fromMe: true, body: "La cohorte de juillet est-elle accessible aux débutants ?", time: "lun. · 09:00" },
      { id: "m-2", fromMe: false, body: "Oui, un module de mise à niveau est inclus la première semaine. Il reste 14 places.", time: "lun. · 09:45" },
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
  neuraforge: {
    cover: "/digital/cover-neuraforge.svg",
    city: "Paris",
    founded: 2023,
    tagline: "Des agents IA qui travaillent vraiment, pendant que vous vivez.",
    story:
      "NeuraForge est né dans un studio parisien avec une conviction : l'IA ne doit pas être un gadget mais un employé fiable. Notre équipe de 14 ingénieurs et designers conçoit des agents autonomes testés sur de vrais business pendant 90 jours avant publication. Plus de 40 000 entreprises francophones utilisent nos agents au quotidien, avec un taux de satisfaction de 97 %.",
    specialties: ["Agents IA", "Automatisations", "Intégrations CRM"],
    responseTime: "moins de 1 h",
    shippingTime: "instantané",
    languages: ["Français", "English", "Español"],
    certifications: ["Bazario Vérifié", "RGPD Compliant", "AI Act Ready"],
    followers: 86400,
    joinedYear: 2024,
    policies: [
      { label: "Garantie", value: "14 jours satisfait ou remboursé" },
      { label: "Mises à jour", value: "À vie, à chaque nouveau modèle IA" },
      { label: "Livraison", value: "Accès instantané + installation guidée" },
    ],
  },
  "promptcraft-lab": {
    cover: "/digital/cover-promptcraft.svg",
    city: "Lyon",
    founded: 2023,
    tagline: "Le laboratoire français du prompt engineering.",
    story:
      "PromptCraft Lab teste chaque prompt sur les derniers modèles avant de le publier : 6 testeurs, 3 modèles, un score de fiabilité public. Nos packs sont utilisés par plus de 60 000 créateurs, freelances et équipes marketing. Chaque achat inclut les mises à jour à vie : quand un modèle change, vos prompts évoluent.",
    specialties: ["Prompts", "GPTs personnalisés", "Copywriting IA"],
    responseTime: "moins de 2 h",
    shippingTime: "instantané",
    languages: ["Français", "English"],
    certifications: ["Bazario Vérifié", "Prompts testés v7", "Mises à jour à vie"],
    followers: 64200,
    joinedYear: 2024,
    policies: [
      { label: "Garantie", value: "14 jours satisfait ou remboursé" },
      { label: "Mises à jour", value: "Incluses à vie" },
      { label: "Livraison", value: "Notion + PDF + JSON instantanés" },
    ],
  },
  "quantum-studio": {
    cover: "/digital/cover-quantum.svg",
    city: "Berlin",
    founded: 2022,
    tagline: "Design engineering pour les produits du futur.",
    story:
      "Quantum Studio réunit 22 designers et développeurs entre Berlin et Lisbonne. Nos templates et UI kits équipent plus de 30 000 produits en production, des startups YC aux grands groupes. Code TypeScript strict, accessibilité AA, performance mesurée : chaque release passe 120 points de contrôle avant publication.",
    specialties: ["UI Kits", "Starters SaaS", "Templates Notion & Framer"],
    responseTime: "moins de 3 h",
    shippingTime: "instantané",
    languages: ["Français", "English", "Deutsch"],
    certifications: ["Bazario Vérifié", "WCAG AA", "Production Ready"],
    followers: 98600,
    joinedYear: 2023,
    policies: [
      { label: "Garantie", value: "14 jours satisfait ou remboursé" },
      { label: "Mises à jour", value: "Versions majeures incluses 24 mois" },
      { label: "Livraison", value: "Repo privé + Figma instantanés" },
    ],
  },
  "aether-audio": {
    cover: "/digital/cover-aether.svg",
    city: "Montréal",
    founded: 2023,
    tagline: "Le son et l'image du futur, générés avec éthique.",
    story:
      "Aether Audio est un collectif de 17 artistes, ingénieurs du son et chercheurs basés à Montréal. Nous créons des banques audio et visuelles génératives où chaque asset est vérifié humainement et 100 % libre de droits. Nos voix IA sont clonées uniquement avec consentement documenté, et chaque fichier embarque un filigrane de traçabilité.",
    specialties: ["Musique IA", "Voix off", "Art génératif 4K"],
    responseTime: "moins de 6 h",
    shippingTime: "instantané",
    languages: ["Français", "English"],
    certifications: ["Bazario Vérifié", "Fairly Trained", "Consentement vérifié"],
    followers: 47300,
    joinedYear: 2024,
    policies: [
      { label: "Garantie", value: "14 jours satisfait ou remboursé" },
      { label: "Licence", value: "Commerciale monde entier incluse" },
      { label: "Livraison", value: "Téléchargement instantané haute définition" },
    ],
  },
  "nova-academy": {
    cover: "/digital/cover-nova-academy.svg",
    city: "Paris",
    founded: 2024,
    tagline: "Les compétences du futur, enseignées par ceux qui les pratiquent.",
    story:
      "Nova Academy forme les professionnels aux métiers augmentés par l'IA. Nos instructeurs sont des praticiens en activité : fondateurs, ingénieurs IA, créateurs à succès. Chaque formation est mise à jour à chaque évolution majeure des modèles, et nos certifications sont vérifiables publiquement. 25 000 alumni, note moyenne de 4,9/5.",
    specialties: ["IA générative", "Automatisation", "Business digital"],
    responseTime: "moins de 4 h",
    shippingTime: "instantané",
    languages: ["Français", "English"],
    certifications: ["Bazario Vérifié", "Certification vérifiable", "Qualiopi en cours"],
    followers: 52300,
    joinedYear: 2024,
    policies: [
      { label: "Garantie", value: "14 jours satisfait ou remboursé" },
      { label: "Accès", value: "À vie, mises à jour incluses" },
      { label: "Livraison", value: "Espace de formation instantané" },
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
