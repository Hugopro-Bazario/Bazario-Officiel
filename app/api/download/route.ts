import { NextResponse, type NextRequest } from "next/server"
import { PRODUCTS } from "@/lib/data"

export const runtime = "nodejs"

/**
 * Livraison numérique du catalogue de démonstration.
 *
 * Renvoie, en pièce jointe, un guide d'accès + licence généré pour le produit
 * demandé. C'est le mécanisme réel de remise de fichier ; en production on
 * remplacera le contenu généré par le(s) vrai(s) fichier(s) du créateur
 * (stockage privé) et on validera l'achat (entitlement) avant la remise.
 */
export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug")?.trim()
  if (!slug) {
    return NextResponse.json({ error: "Paramètre 'slug' manquant." }, { status: 400 })
  }

  const product = PRODUCTS.find((p) => p.slug === slug)
  if (!product) {
    return NextResponse.json({ error: "Produit introuvable." }, { status: 404 })
  }

  const now = new Date().toLocaleString("fr-FR")
  const licenses = product.variants.map((v) => `- ${v.label} (${v.sku})`).join("\n")

  const content = `BAZARIO — GUIDE D'ACCÈS & LICENCE
====================================

Produit : ${product.title}
Créateur : ${product.brand}
Catégorie : ${product.categoryPath.join(" > ")}
Délivré le : ${now}

À PROPOS
--------
${product.description}

VOS ACCÈS
---------
1. Connectez-vous à votre espace : https://www.bazario-official.com/account/orders
2. Retrouvez ce produit dans « Mes téléchargements ».
3. Les mises à jour à vie apparaîtront automatiquement dans cet espace.

LICENCES DISPONIBLES
--------------------
${licenses}

CONDITIONS DE LICENCE
---------------------
- Usage conforme à la licence achetée (personnelle, commerciale ou agence).
- Revente / redistribution interdites hors des droits accordés.
- Garantie 14 jours satisfait ou remboursé.

SUPPORT
-------
support@bazario.com — réponse augmentée par IA 24/7.

Merci de votre confiance.
— L'équipe Bazario
`

  const filename = `bazario-${slug}.txt`

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  })
}
