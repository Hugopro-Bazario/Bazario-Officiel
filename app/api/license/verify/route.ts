import { NextResponse, type NextRequest } from "next/server"
import { verifyLicenseCode } from "@/lib/license"

export const runtime = "nodejs"

/** Vérification publique d'une licence Bazario (aucune donnée personnelle exposée). */
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code") || ""
  if (!code.trim()) {
    return NextResponse.json({ valid: false, reason: "Code manquant." }, { status: 400 })
  }
  const result = verifyLicenseCode(code)
  if (!result.valid) {
    return NextResponse.json({ valid: false, reason: result.reason })
  }
  return NextResponse.json({
    valid: true,
    product: {
      title: result.product.title,
      brand: result.product.brand,
      slug: result.product.slug,
      category: result.product.categoryPath.join(" › "),
    },
  })
}
