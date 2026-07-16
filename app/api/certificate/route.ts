import { NextResponse, type NextRequest } from "next/server"
import { verifyLicenseCode } from "@/lib/license"

export const runtime = "nodejs"

/**
 * Certificat de licence imprimable (HTML autoporté, imprimable en PDF via le
 * navigateur). Accessible uniquement avec un code de licence valide.
 */
export async function GET(request: NextRequest) {
  const code = (request.nextUrl.searchParams.get("code") || "").trim().toUpperCase()
  const check = verifyLicenseCode(code)
  if (!check.valid) {
    return NextResponse.json({ error: check.reason }, { status: 403 })
  }

  const { product } = check
  const issued = new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })
  const licenseLabel = product.variants[0]?.label ?? "Licence standard"

  const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"/>
<title>Certificat de licence — ${code}</title>
<style>
  @page { margin: 0; }
  body { margin:0; font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif; background:#05060f; color:#e8ecf4; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  .wrap { max-width:760px; margin:0 auto; padding:48px 24px; }
  .card { border:1px solid #1c2030; border-radius:24px; overflow:hidden; background:
    radial-gradient(circle at 20% 0%, rgba(109,40,217,.25), transparent 55%),
    radial-gradient(circle at 90% 100%, rgba(34,211,238,.18), transparent 50%), #05060f; }
  .inner { padding:48px; }
  .brand { font-size:22px; font-weight:800; letter-spacing:-.5px; }
  .brand span { color:#22d3ee; }
  .eyebrow { margin-top:36px; font-size:11px; letter-spacing:.25em; text-transform:uppercase; color:#22d3ee; font-weight:700; }
  h1 { margin:10px 0 4px; font-size:30px; line-height:1.15; color:#fff; }
  .meta { color:#8b93a7; font-size:13px; }
  .code { margin-top:32px; padding:18px 22px; border:1px dashed rgba(34,211,238,.5); border-radius:14px;
    font-family:ui-monospace,Menlo,monospace; font-size:20px; letter-spacing:.08em; color:#22d3ee; background:rgba(34,211,238,.06); }
  .grid { display:grid; grid-template-columns:1fr 1fr; gap:14px 28px; margin-top:30px; font-size:14px; }
  .k { color:#8b93a7; font-size:11px; text-transform:uppercase; letter-spacing:.12em; }
  .v { margin-top:3px; font-weight:600; color:#fff; }
  .foot { margin-top:38px; padding-top:22px; border-top:1px solid #1c2030; display:flex; justify-content:space-between; gap:16px; font-size:12px; color:#8b93a7; }
  .seal { display:inline-flex; align-items:center; gap:8px; color:#34d399; font-weight:700; }
  .dot { width:9px; height:9px; border-radius:99px; background:#34d399; box-shadow:0 0 12px #34d399; }
</style></head><body>
<div class="wrap"><div class="card"><div class="inner">
  <div class="brand">bazario<span>.</span></div>
  <p class="eyebrow">Certificat de licence numérique</p>
  <h1>${product.title}</h1>
  <p class="meta">Créé et publié par ${product.brand} · ${product.categoryPath.join(" › ")}</p>
  <div class="code">${code}</div>
  <div class="grid">
    <div><div class="k">Type de licence</div><div class="v">${licenseLabel}</div></div>
    <div><div class="k">Émis le</div><div class="v">${issued}</div></div>
    <div><div class="k">Mises à jour</div><div class="v">Incluses à vie</div></div>
    <div><div class="k">Vérification publique</div><div class="v">bazario-official.com/verify</div></div>
  </div>
  <div class="foot">
    <span class="seal"><span class="dot"></span> Signature HMAC-SHA256 authentique</span>
    <span>Bazario — le marché du futur</span>
  </div>
</div></div></div>
</body></html>`

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `inline; filename="certificat-${code}.html"`,
      "Cache-Control": "no-store",
    },
  })
}
