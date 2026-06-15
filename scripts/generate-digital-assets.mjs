// Génère les visuels SVG futuristes du catalogue digital Bazario dans public/digital/.
// Usage : node scripts/generate-digital-assets.mjs
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const OUT = join(ROOT, "public", "digital")
mkdirSync(OUT, { recursive: true })

// Palettes néon (hue1 → hue2)
const PALETTES = {
  cyan: ["#22d3ee", "#6366f1"],
  violet: ["#a855f7", "#22d3ee"],
  magenta: ["#ec4899", "#8b5cf6"],
  lime: ["#a3e635", "#06b6d4"],
  amber: ["#fbbf24", "#f472b6"],
  blue: ["#3b82f6", "#a855f7"],
  teal: ["#2dd4bf", "#6366f1"],
  rose: ["#fb7185", "#818cf8"],
}

function motifOrb(c1, c2) {
  return `
    <circle cx="400" cy="380" r="170" fill="none" stroke="url(#g)" stroke-width="2.5" opacity="0.9"/>
    <circle cx="400" cy="380" r="120" fill="url(#g)" opacity="0.18"/>
    <circle cx="400" cy="380" r="60" fill="url(#g)" opacity="0.55"/>
    <ellipse cx="400" cy="380" rx="230" ry="62" fill="none" stroke="${c1}" stroke-width="1.5" opacity="0.5" transform="rotate(-18 400 380)"/>
    <circle cx="592" cy="318" r="9" fill="${c2}"/>
    <circle cx="225" cy="445" r="6" fill="${c1}"/>`
}

function motifRings(c1, c2) {
  return `
    <g fill="none" stroke-width="2">
      <circle cx="400" cy="380" r="190" stroke="${c1}" opacity="0.35"/>
      <circle cx="400" cy="380" r="150" stroke="url(#g)" opacity="0.7"/>
      <circle cx="400" cy="380" r="108" stroke="${c2}" opacity="0.5"/>
      <circle cx="400" cy="380" r="64" stroke="url(#g)"/>
    </g>
    <circle cx="400" cy="380" r="34" fill="url(#g)" opacity="0.8"/>
    <circle cx="510" cy="272" r="7" fill="${c1}"/>
    <circle cx="294" cy="492" r="5" fill="${c2}"/>`
}

function motifHex(c1, c2) {
  const hex = (cx, cy, r, o, col) => {
    const pts = Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 6
      return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`
    }).join(" ")
    return `<polygon points="${pts}" fill="none" stroke="${col}" stroke-width="2" opacity="${o}"/>`
  }
  return `
    ${hex(400, 380, 170, 0.4, c1)}
    ${hex(400, 380, 120, 0.8, "url(#g)")}
    ${hex(400, 380, 70, 0.9, c2)}
    <circle cx="400" cy="380" r="26" fill="url(#g)"/>
    <circle cx="540" cy="290" r="6" fill="${c2}"/>`
}

function motifWave(c1, c2) {
  const wave = (off, amp, col, o) => {
    let d = `M 80 ${420 + off}`
    for (let x = 80; x <= 720; x += 16) {
      d += ` L ${x} ${420 + off + Math.sin((x - 80) / 38) * amp}`
    }
    return `<path d="${d}" fill="none" stroke="${col}" stroke-width="2.5" opacity="${o}"/>`
  }
  return `
    ${wave(-70, 26, c1, 0.5)}
    ${wave(-25, 40, "url(#g)", 0.95)}
    ${wave(25, 30, c2, 0.6)}
    ${wave(70, 18, c1, 0.3)}
    <circle cx="400" cy="312" r="42" fill="url(#g)" opacity="0.55"/>`
}

function motifGridCube(c1, c2) {
  return `
    <g stroke-width="2" fill="none">
      <path d="M 400 230 L 540 312 L 540 470 L 400 552 L 260 470 L 260 312 Z" stroke="url(#g)"/>
      <path d="M 400 230 L 400 392 M 260 312 L 400 392 L 540 312 M 400 392 L 400 552" stroke="${c1}" opacity="0.7"/>
      <circle cx="400" cy="392" r="14" fill="${c2}"/>
      <circle cx="400" cy="230" r="7" fill="${c1}"/>
      <circle cx="540" cy="470" r="7" fill="${c2}"/>
      <circle cx="260" cy="470" r="7" fill="${c1}"/>
    </g>`
}

const MOTIFS = [motifOrb, motifRings, motifHex, motifWave, motifGridCube]

function svg({ label, sub, palette = "cyan", motif = 0, w = 800, h = 760 }) {
  const [c1, c2] = PALETTES[palette]
  const draw = MOTIFS[motif % MOTIFS.length](c1, c2)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 800 760">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.45" r="0.75">
      <stop offset="0" stop-color="${c1}" stop-opacity="0.28"/>
      <stop offset="0.55" stop-color="${c2}" stop-opacity="0.10"/>
      <stop offset="1" stop-color="#05060f" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#7dd3fc" stroke-opacity="0.07" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="800" height="760" fill="#05060f"/>
  <rect width="800" height="760" fill="url(#grid)"/>
  <rect width="800" height="760" fill="url(#glow)"/>
  ${draw}
  <text x="400" y="652" text-anchor="middle" font-family="ui-sans-serif,system-ui,sans-serif" font-size="40" font-weight="700" fill="#f8fafc">${label}</text>
  <text x="400" y="694" text-anchor="middle" font-family="ui-monospace,monospace" font-size="19" letter-spacing="4" fill="${c1}">${sub}</text>
</svg>
`
}

function write(name, opts) {
  writeFileSync(join(OUT, `${name}.svg`), svg(opts))
  console.log(`✓ digital/${name}.svg`)
}

// ── Catégories ──────────────────────────────────────────────
const CATS = [
  ["cat-agents-ia", "Agents IA", "AUTONOMOUS · 24/7", "cyan", 0],
  ["cat-prompts", "Prompts & GPTs", "PROMPT ENGINEERING", "violet", 1],
  ["cat-templates", "Templates & UI Kits", "BUILD FASTER", "blue", 4],
  ["cat-formations", "Formations", "LEVEL UP", "amber", 2],
  ["cat-saas", "Apps & SaaS", "LIFETIME DEALS", "teal", 4],
  ["cat-art-ia", "Art génératif", "4K ASSETS", "magenta", 0],
  ["cat-audio-ia", "Musique & Voix IA", "ROYALTY FREE", "rose", 3],
  ["cat-automatisations", "Automatisations", "ZERO FRICTION", "lime", 4],
]
CATS.forEach(([n, l, s, p, m]) => write(n, { label: l, sub: s, palette: p, motif: m }))

// ── Produits (label court, sous-titre, palette, motif) ─────
const PRODUCTS = [
  ["p-orion", "Orion", "AGENT COMMERCIAL IA", "cyan", 0],
  ["p-orion-2", "Orion", "PIPELINE AUTONOME", "cyan", 1],
  ["p-orion-3", "Orion", "CRM NATIF", "cyan", 4],
  ["p-luna", "Luna", "SUPPORT CLIENT IA", "violet", 1],
  ["p-atlas", "Atlas", "PROSPECTION AUTO", "blue", 4],
  ["p-nova-seo", "Nova", "RÉDACTEUR SEO IA", "teal", 2],
  ["p-sentinel", "Sentinel", "VEILLE TEMPS RÉEL", "lime", 0],
  ["p-promptpack", "2 500 Prompts", "BUSINESS 2026", "violet", 2],
  ["p-mj-cine", "800 Prompts", "MIDJOURNEY CINÉMA", "magenta", 0],
  ["p-gpt-coach", "Coach Vente", "GPT SUR MESURE", "amber", 1],
  ["p-copy-system", "CopyForge", "PROMPTS CONVERSION", "rose", 3],
  ["p-dev-prompts", "1 200 Prompts", "DÉVELOPPEURS", "blue", 4],
  ["p-notion-os", "Second Cerveau", "NOTION OS", "teal", 4],
  ["p-nebula-ui", "Nebula UI", "450 COMPOSANTS", "cyan", 2],
  ["p-saas-starter", "LaunchPad", "STARTER SAAS NEXT.JS", "blue", 4],
  ["p-canva-pack", "300 Templates", "CANVA × IA", "amber", 1],
  ["p-framer-3d", "Quantum", "PORTFOLIO FRAMER 3D", "violet", 0],
  ["p-masterclass-ia", "Masterclass IA", "DE ZÉRO À PRO", "amber", 2],
  ["p-auto-formation", "Automatisation", "+20 H / SEMAINE", "lime", 4],
  ["p-bootcamp-prompt", "Bootcamp", "PROMPT ENGINEERING", "violet", 1],
  ["p-agents-nocode", "Agents No-Code", "CRÉEZ SANS CODER", "cyan", 0],
  ["p-ecom-ia", "Accélérateur", "E-COMMERCE × IA", "rose", 4],
  ["p-pixelmind", "PixelMind Pro", "IMAGES ILLIMITÉES", "magenta", 0],
  ["p-scribe", "Scribe IA", "RÉDACTION 12 MOIS", "teal", 3],
  ["p-clearvoice", "ClearVoice", "STUDIO VOCAL IA", "rose", 3],
  ["p-datalens", "DataLens", "ANALYTICS PRÉDICTIF", "blue", 4],
  ["p-holoboard", "HoloBoard", "WHITEBOARD 3D", "cyan", 2],
  ["p-cyberpack", "500 Artworks", "CYBERPUNK 4K", "magenta", 0],
  ["p-avatars", "120 Avatars", "PORTRAITS IA PRO", "violet", 1],
  ["p-textures", "1 000 Textures", "SCI-FI SEAMLESS", "teal", 2],
  ["p-luts-neon", "60 LUTs", "CINÉMA NÉON", "rose", 0],
  ["p-iso-3d", "350 Illus", "3D ISOMÉTRIQUES", "blue", 4],
  ["p-music-bank", "2 000 Titres", "MUSIQUE IA LIBRE", "violet", 3],
  ["p-voixoff", "50 Voix", "VOIX OFF FRANÇAISES", "amber", 3],
  ["p-synthwave", "5 000 Samples", "SYNTHWAVE ULTRA", "magenta", 3],
  ["p-sfx-kit", "SFX Futuriste", "UI & SOUND DESIGN", "cyan", 3],
  ["p-podcast-kit", "Podcast IA", "MONTAGE AUTO", "teal", 1],
  ["p-n8n-pack", "120 Workflows", "N8N E-COMMERCE", "lime", 4],
  ["p-zapier-mkt", "200 Zaps", "MARKETING AUTO", "amber", 4],
  ["p-crm-autopilot", "CRM Autopilot", "PIPELINE AUTOMATISÉ", "blue", 1],
  ["p-social-machine", "Social Machine", "30 JOURS DE CONTENU", "rose", 0],
  ["p-invoice-kit", "FactureBot", "RELANCES AUTO", "teal", 2],
]
PRODUCTS.forEach(([n, l, s, p, m]) => write(n, { label: l, sub: s, palette: p, motif: m }))

// ── Vendeurs : logos + covers ───────────────────────────────
const SELLERS = [
  ["neuraforge", "NeuraForge", "AI AGENTS STUDIO", "cyan", 0],
  ["promptcraft", "PromptCraft", "PROMPT LAB", "violet", 1],
  ["quantum", "Quantum Studio", "DESIGN ENGINEERING", "blue", 4],
  ["aether", "Aether Audio", "GENERATIVE SOUND", "rose", 3],
  ["nova-academy", "Nova Academy", "FUTURE SKILLS", "amber", 2],
]
SELLERS.forEach(([n, l, s, p, m]) => {
  write(`seller-${n}`, { label: l, sub: s, palette: p, motif: m })
  write(`cover-${n}`, { label: l, sub: s, palette: p, motif: m, w: 1600, h: 500 })
})

// ── Hero, drops, éditorial ──────────────────────────────────
write("hero-nexus", { label: "BAZARIO NEXUS", sub: "LE MARCHÉ DU FUTUR", palette: "violet", motif: 0, w: 1600, h: 900 })
write("drop-orion", { label: "Orion v2", sub: "DROP · 500 LICENCES", palette: "cyan", motif: 0 })
write("drop-cyber", { label: "Cyber Vault", sub: "DROP · ÉDITION LIMITÉE", palette: "magenta", motif: 2 })
write("drop-bootcamp", { label: "Bootcamp", sub: "COHORTE JUILLET", palette: "amber", motif: 1 })
write("editorial-agents", { label: "Agents IA", sub: "LE GUIDE 2026", palette: "cyan", motif: 4 })
write("editorial-stack", { label: "Stack Créateur", sub: "10 OUTILS ESSENTIELS", palette: "violet", motif: 2 })
write("editorial-revenus", { label: "Revenus Passifs", sub: "PRODUITS DIGITAUX", palette: "lime", motif: 3 })

console.log("Tous les assets ont été générés.")
