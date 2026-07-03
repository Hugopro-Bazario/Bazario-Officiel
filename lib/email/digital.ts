import { sendHtmlEmail, isEmailConfigured } from "@/lib/brevo"

const BRAND = "Bazario"
const ACCENT = "#22d3ee"
const BG = "#05060f"

function formatPrice(value: number, currency = "EUR"): string {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency }).format(value)
}

function shell(title: string, inner: string): string {
  return `<!doctype html><html lang="fr"><body style="margin:0;background:#0a0c18;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#e8ecf4;">
  <div style="max-width:560px;margin:0 auto;padding:24px;">
    <div style="background:${BG};border:1px solid #1c2030;border-radius:16px;overflow:hidden;">
      <div style="padding:28px 28px 8px;">
        <div style="font-size:20px;font-weight:800;letter-spacing:-0.5px;">${BRAND}<span style="color:${ACCENT};">.</span></div>
      </div>
      <div style="padding:8px 28px 28px;">
        <h1 style="font-size:22px;margin:12px 0 8px;color:#ffffff;">${title}</h1>
        ${inner}
      </div>
      <div style="padding:18px 28px;border-top:1px solid #1c2030;font-size:12px;color:#8b93a7;">
        ${BRAND} — le marché du futur. Produits & services digitaux.<br/>
        Besoin d'aide ? Répondez à cet email.
      </div>
    </div>
  </div></body></html>`
}

export type DigitalOrderEmail = {
  email: string
  reference: string
  total: number | null
  currency: string
  items: { description: string; quantity: number; license?: string }[]
}

/**
 * Email de confirmation d'achat de produits digitaux (récap + accès).
 * Ne lève jamais : renvoie false si l'envoi est impossible/indisponible.
 */
export async function sendOrderConfirmationEmail(order: DigitalOrderEmail): Promise<boolean> {
  if (!isEmailConfigured() || !order.email) return false
  const rows = order.items
    .map((i) => {
      const license = i.license
        ? `<br/><span style="font-family:ui-monospace,monospace;font-size:12px;color:${ACCENT};">Licence : ${i.license}</span>`
        : ""
      return `<tr><td style="padding:8px 0;border-bottom:1px solid #1c2030;">${i.quantity} × ${i.description}${license}</td></tr>`
    })
    .join("")
  const licenseNote = order.items.some((i) => i.license)
    ? `<p style="color:#8b93a7;font-size:12px;margin-top:14px;">Chaque licence est signée cryptographiquement — vérifiable à tout moment sur <a href="https://www.bazario-official.com/verify" style="color:${ACCENT};">bazario-official.com/verify</a> (certificat téléchargeable).</p>`
    : ""
  const totalLine =
    order.total != null
      ? `<p style="font-size:16px;margin:16px 0 0;"><strong>Total : ${formatPrice(order.total, order.currency)}</strong></p>`
      : ""
  const inner = `
    <p style="color:#b9c0d0;line-height:1.6;">Merci pour votre commande. Vos produits sont <strong style="color:#fff;">disponibles immédiatement</strong> dans votre espace, avec les mises à jour à vie incluses.</p>
    <p style="color:#8b93a7;font-size:13px;">Référence : <strong style="color:#fff;">${order.reference}</strong></p>
    <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:14px;color:#e8ecf4;">${rows}</table>
    ${totalLine}
    ${licenseNote}
    <div style="margin-top:24px;">
      <a href="https://www.bazario-official.com/account/orders" style="display:inline-block;background:${ACCENT};color:#05060f;font-weight:700;text-decoration:none;padding:12px 20px;border-radius:10px;">Accéder à mes produits</a>
    </div>`
  try {
    await sendHtmlEmail({
      to: { email: order.email },
      subject: `Votre commande ${BRAND} ${order.reference} — accès disponible`,
      htmlContent: shell("Commande confirmée 🎉", inner),
    })
    return true
  } catch (error) {
    console.error(JSON.stringify({ scope: "email_order_confirmation", error: String(error) }))
    return false
  }
}

/**
 * Email de bienvenue pour un abonnement Nexus+.
 */
export async function sendSubscriptionWelcomeEmail(email: string, plan: string): Promise<boolean> {
  if (!isEmailConfigured() || !email) return false
  const inner = `
    <p style="color:#b9c0d0;line-height:1.6;">Bienvenue dans <strong style="color:#fff;">Bazario Nexus+</strong> (formule ${plan === "yearly" ? "annuelle" : "mensuelle"}). Votre essai de 30 jours est actif.</p>
    <ul style="color:#b9c0d0;line-height:1.8;padding-left:18px;">
      <li>−20 % sur tout le catalogue digital</li>
      <li>Crédits IA inclus chaque mois</li>
      <li>Accès anticipé aux drops (24 h)</li>
      <li>Coffre-fort de licences à vie</li>
    </ul>
    <div style="margin-top:24px;">
      <a href="https://www.bazario-official.com/search" style="display:inline-block;background:${ACCENT};color:#05060f;font-weight:700;text-decoration:none;padding:12px 20px;border-radius:10px;">Explorer le catalogue</a>
    </div>`
  try {
    await sendHtmlEmail({
      to: { email },
      subject: "Bienvenue dans Bazario Nexus+ ✨",
      htmlContent: shell("Votre abonnement est actif", inner),
    })
    return true
  } catch (error) {
    console.error(JSON.stringify({ scope: "email_subscription_welcome", error: String(error) }))
    return false
  }
}
