import { createHmac, timingSafeEqual } from "node:crypto"
import { PRODUCTS, type Product } from "@/lib/data"

/**
 * Licences Bazario signées : chaque achat reçoit un code `BZ-<PRODUIT>-<REF>-<SIG>`
 * dont la signature HMAC-SHA256 est vérifiable publiquement sur /verify, sans
 * base de données. Configurez LICENSE_SIGNING_SECRET en production ; le repli
 * de développement permet de tester le flux de bout en bout.
 */
const DEV_SECRET = "bazario-dev-license-secret"

function secret(): string {
  return (process.env.LICENSE_SIGNING_SECRET || "").trim() || DEV_SECRET
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex").slice(0, 8).toUpperCase()
}

/** Référence courte aléatoire fournie par l'appelant (ex. fin d'ID de session Stripe). */
export function generateLicenseCode(productId: string, ref: string): string {
  const pid = productId.toUpperCase()
  const cleanRef = ref.replace(/[^A-Za-z0-9]/g, "").slice(-6).toUpperCase().padStart(6, "0")
  const sig = sign(`${pid}:${cleanRef}`)
  return `BZ-${pid}-${cleanRef}-${sig}`
}

export type LicenseCheck =
  | { valid: true; product: Product; ref: string }
  | { valid: false; reason: string }

export function verifyLicenseCode(code: string): LicenseCheck {
  const trimmed = code.trim().toUpperCase()
  const match = trimmed.match(/^BZ-(P\d+)-([A-Z0-9]{6})-([A-F0-9]{8})$/)
  if (!match) return { valid: false, reason: "Format de licence invalide." }
  const [, pid, ref, sig] = match

  const product = PRODUCTS.find((p) => p.id.toUpperCase() === pid)
  if (!product) return { valid: false, reason: "Produit inconnu." }

  const expected = sign(`${pid}:${ref}`)
  const a = Buffer.from(expected)
  const b = Buffer.from(sig)
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return { valid: false, reason: "Signature invalide — cette licence n'a pas été émise par Bazario." }
  }
  return { valid: true, product, ref }
}
