import { NextResponse, type NextRequest } from "next/server"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { PRODUCTS } from "@/lib/data"

export const runtime = "nodejs"

/**
 * Livraison numérique : remet, en pièce jointe, le fichier livrable du produit.
 *
 * On sert d'abord le vrai livrable (public/deliverables/<slug>.md, généré par
 * scripts/generate-deliverables.ts). En cas d'absence, on retombe sur un guide
 * d'accès minimal. En production, validez l'entitlement de l'acheteur avant la
 * remise et servez le(s) vrai(s) fichier(s) depuis un stockage privé.
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

  let content: string
  let extension = "md"
  try {
    content = await readFile(join(process.cwd(), "public", "deliverables", `${slug}.md`), "utf-8")
  } catch {
    extension = "txt"
    content = `BAZARIO — GUIDE D'ACCÈS\n\nProduit : ${product.title}\nCréateur : ${product.brand}\n\nRetrouvez vos accès et mises à jour dans votre espace :\nhttps://www.bazario-official.com/account/orders\n`
  }

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": `text/${extension === "md" ? "markdown" : "plain"}; charset=utf-8`,
      "Content-Disposition": `attachment; filename="bazario-${slug}.${extension}"`,
      "Cache-Control": "no-store",
    },
  })
}
