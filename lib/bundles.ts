import { PRODUCTS, type Product } from "@/lib/data"

export type Bundle = {
  slug: string
  name: string
  tagline: string
  description: string
  emoji: string
  productIds: string[]
  /** Prix du pack (inférieur à la somme des produits). */
  price: number
  badge?: string
}

export const BUNDLES: Bundle[] = [
  {
    slug: "machine-de-vente",
    name: "Machine de vente",
    tagline: "Vendez pendant que vous dormez",
    description:
      "L'agent commercial Orion qualifie et relance, CopyForge écrit des pages qui convertissent, CRM Autopilot orchestre le pipeline. Le trio complet pour automatiser vos ventes.",
    emoji: "📈",
    productIds: ["p1", "p9", "p38"],
    price: 219,
    badge: "Le plus populaire",
  },
  {
    slug: "createur-de-contenu",
    name: "Créateur de contenu",
    tagline: "Un studio créatif complet",
    description:
      "800 prompts Midjourney cinématiques, 500 artworks 4K, 60 LUTs néon et 2 000 musiques libres de droits : tout ce qu'il faut pour produire du contenu premium en série.",
    emoji: "🎨",
    productIds: ["p7", "p26", "p29", "p31"],
    price: 109,
  },
  {
    slug: "lancement-saas",
    name: "Lancement SaaS",
    tagline: "De l'idée au produit en un week-end",
    description:
      "Le starter LaunchPad (paiements + auth + IA), 450 composants Nebula UI et l'analytics prédictif DataLens. La stack complète pour lancer et piloter votre SaaS.",
    emoji: "🚀",
    productIds: ["p13", "p12", "p24"],
    price: 269,
  },
  {
    slug: "academie-ia",
    name: "Académie IA",
    tagline: "Devenez opérationnel, pas spectateur",
    description:
      "La Masterclass IA générative, la formation Agents no-code et 2 500 prompts business : le parcours complet pour maîtriser l'IA et la mettre au travail.",
    emoji: "🎓",
    productIds: ["p16", "p19", "p6"],
    price: 299,
  },
]

export function getBundleProducts(bundle: Bundle): Product[] {
  return bundle.productIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p))
}

export function getBundleOriginalPrice(bundle: Bundle): number {
  return getBundleProducts(bundle).reduce((sum, p) => sum + p.price, 0)
}

export function getBundleSavings(bundle: Bundle): number {
  return Math.max(0, getBundleOriginalPrice(bundle) - bundle.price)
}

export type BundleCartLine = {
  productId: string
  qty: number
  /** Prix unitaire de la ligne (celui de la variante choisie). */
  price: number
}

/**
 * Un pack est « complet » quand chacun de ses produits est présent au tarif de
 * base (1re licence). Les variantes supérieures (Équipe, Agence…) restent au
 * prix normal et ne déclenchent pas la remise.
 */
export function findCompleteBundles(lines: BundleCartLine[]): Bundle[] {
  return BUNDLES.filter((bundle) =>
    bundle.productIds.every((id) => {
      const product = PRODUCTS.find((p) => p.id === id)
      if (!product) return false
      return lines.some((l) => l.productId === id && l.qty >= 1 && l.price === product.price)
    }),
  )
}

/**
 * Remise totale « packs » pour un panier donné (appliquée une fois par pack
 * complet). Utilisée à l'identique côté client (affichage) et côté serveur
 * (prix Stripe), pour que les montants correspondent toujours.
 */
export function computeCartBundleDiscount(lines: BundleCartLine[]): {
  discount: number
  bundles: Bundle[]
} {
  const bundles = findCompleteBundles(lines)
  const discount = bundles.reduce((sum, b) => sum + getBundleSavings(b), 0)
  return { discount, bundles }
}
