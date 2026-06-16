/**
 * Génère un livrable réel (Markdown) par produit du catalogue, dans
 * public/deliverables/<slug>.md. Le contenu est adapté à la catégorie afin que
 * le téléchargement remette un fichier utile et cohérent.
 *
 * Usage : npx tsx scripts/generate-deliverables.ts
 */
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { PRODUCTS, type Product } from "../lib/data"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const OUT = join(ROOT, "public", "deliverables")
mkdirSync(OUT, { recursive: true })

function header(p: Product): string {
  return `# ${p.title}

> ${p.description}

**Créateur :** ${p.brand}
**Catégorie :** ${p.categoryPath.join(" › ")}
**Licence(s) :** ${p.variants.map((v) => v.label).join(", ")}
**Livraison :** numérique, mises à jour à vie incluses · Garantie 14 jours

---
`
}

function footer(): string {
  return `

---

## Support & licence
- Conforme à la licence achetée (personnelle, commerciale ou agence).
- Revente / redistribution interdites hors des droits accordés.
- Support augmenté par IA 24/7 : support@bazario.com

© Bazario — le marché du futur.
`
}

// ───────── Contenus par catégorie ─────────

function agentsIA(p: Product): string {
  return `## 🚀 Démarrage rapide (10 minutes)

1. **Connexion des sources** — reliez votre CRM, votre boîte mail et votre calendrier.
2. **Entraînement** — importez vos offres, votre FAQ et 3 exemples d'échanges réussis.
3. **Mode copilote** — l'agent propose, vous validez pendant 48 h.
4. **Autonomie** — activez le mode autonome en un clic une fois la confiance établie.

## ⚙️ Configuration recommandée (à copier/coller)

\`\`\`json
{
  "agent": "${p.brand}",
  "langue": "fr",
  "ton": "professionnel, direct, chaleureux",
  "garde_fous": {
    "escalade_humaine": true,
    "ne_jamais_promettre": ["remise non validée", "délai non garanti"],
    "heures_actives": "24/7"
  },
  "objectif": "qualifier, répondre et relancer sans intervention"
}
\`\`\`

## 🧠 Prompt système de départ

\`\`\`
Tu es l'assistant de [VOTRE MARQUE]. Objectif : ${p.categoryPath[1] ?? "assister"} avec
précision et concision. Pose une question de clarification si l'information manque.
Escalade à un humain dès qu'un cas sort de ton périmètre. Ne promets jamais ce qui
n'est pas explicitement autorisé.
\`\`\`

## ✅ Checklist de mise en production
- [ ] Sources connectées et testées
- [ ] Garde-fous configurés
- [ ] 5 conversations de test validées
- [ ] Tableau de bord de suivi activé`
}

function prompts(p: Product): string {
  const examples = [
    "Agis comme un directeur marketing. Propose 10 angles d'accroche pour [PRODUIT] ciblant [AUDIENCE], classés par potentiel de conversion.",
    "Réécris ce texte pour le rendre 30 % plus court sans perdre d'information : [TEXTE].",
    "Analyse cette page de vente et liste 5 faiblesses + 5 améliorations concrètes : [URL/TEXTE].",
    "Génère un plan d'article SEO sur [MOT-CLÉ] : H1, 6 H2, intentions de recherche et FAQ.",
    "Transforme ces notes en email de relance B2B percutant (objet + corps) : [NOTES].",
    "Crée 7 idées de posts LinkedIn sur [SUJET], chacune avec un hook fort et une CTA.",
    "Joue le rôle d'un client sceptique et challenge mon offre : [OFFRE]. Puis donne-moi les meilleures réponses.",
    "Résume ce document en 5 points actionnables et 1 décision recommandée : [DOC].",
  ]
  return `## 📦 Ce que contient ce pack
- Prompts testés sur les derniers modèles, classés par cas d'usage
- Variables entre crochets \`[ ]\` à remplacer
- Format prêt à copier/coller (compatible tous assistants IA)

## ⭐ Exemples inclus (extrait)

${examples.map((e, i) => `**${i + 1}.**\n\`\`\`\n${e}\n\`\`\``).join("\n\n")}

## 🛠️ Comment l'utiliser
1. Choisissez le prompt adapté à votre besoin.
2. Remplacez les variables \`[ ]\` par votre contexte.
3. Itérez : demandez à l'IA 3 faiblesses puis une version corrigée.

> La version complète et ses mises à jour sont disponibles dans votre espace Bazario.`
}

function templates(p: Product): string {
  return `## 📥 Installation
1. Téléchargez les fichiers source depuis votre espace Bazario.
2. Ouvrez le projet dans votre outil (Notion, Figma, VS Code, Framer…).
3. Dupliquez, puis personnalisez couleurs, textes et logo.

## 🗂️ Structure fournie
- \`/composants\` — éléments réutilisables prêts à l'emploi
- \`/pages\` — gabarits assemblés (landing, pricing, dashboard…)
- \`/guide\` — documentation pas-à-pas (FR)
- \`/theme\` — variables de personnalisation (1 fichier)

## 🎨 Personnalisation express
\`\`\`
couleur_primaire = #6D28D9
couleur_accent   = #22D3EE
police_titres    = Inter / Geist
rayon            = 14px
\`\`\`

## ✅ Bonnes pratiques
- Gardez une seule source de vérité pour le thème.
- Testez le rendu mobile avant publication.
- Activez les mises à jour à vie : les nouvelles versions arrivent dans votre espace.`
}

function formations(p: Product): string {
  return `## 🎓 Programme de la formation

**Module 1 — Fondations**
- Comprendre les concepts clés et le vocabulaire
- Mettre en place son environnement de travail

**Module 2 — Pratique guidée**
- Premiers projets pas-à-pas
- Erreurs courantes et comment les éviter

**Module 3 — Cas réels**
- Études de cas chiffrées
- Reproduire un résultat concret de A à Z

**Module 4 — Passage à l'échelle**
- Automatiser et industrialiser
- Mesurer le ROI

**Module 5 — Certification**
- Projet final corrigé
- Certificat vérifiable

## 📌 Comment suivre la formation
1. Accédez aux vidéos depuis votre espace Bazario (accès à vie).
2. Téléchargez les ressources de chaque module.
3. Rejoignez la communauté privée pour vos questions.

## 🧰 Ressources incluses
- Slides PDF de chaque module
- Fichiers d'exercices
- Modèles réutilisables`
}

function saas(p: Product): string {
  return `## 🔑 Activation de votre licence
1. Connectez-vous à votre espace Bazario.
2. Copiez votre clé de licence depuis « Mes téléchargements ».
3. Collez-la dans l'application lors du premier lancement.

\`\`\`
LICENCE : BZ-XXXX-XXXX-XXXX  (visible dans votre espace après achat)
\`\`\`

## ⚡ Premiers pas
1. Créez votre espace de travail.
2. Importez vos données (CSV / connecteurs natifs).
3. Lancez votre première action en 1 clic.

## 🧩 Fonctionnalités clés
${p.description}

## ♾️ Mises à jour
Votre licence inclut les mises à jour à vie : chaque nouvelle version apparaît
automatiquement dans votre espace.`
}

function artIA(p: Product): string {
  return `## 🖼️ Contenu de la collection
- Fichiers haute résolution prêts à l'emploi
- Licence commerciale incluse (selon variante achetée)
- Organisation par thème pour retrouver rapidement vos assets

## 📐 Formats & utilisation
- Web : exportez en WebP/AVIF pour la performance.
- Print : conservez la résolution maximale fournie.
- Vidéo / 3D : importez directement dans votre logiciel.

## ⚖️ Droits d'utilisation
- Personnelle : projets non commerciaux.
- Commerciale : sites, vidéos, publicités, produits.
- Agence : projets clients illimités.

> Les fichiers source haute définition sont disponibles dans votre espace Bazario.`
}

function audioIA(p: Product): string {
  return `## 🎧 Contenu
- Fichiers audio prêts à l'emploi (qualité broadcast)
- Classés par ambiance / BPM / tonalité
- 100 % libres de droits selon la licence achetée

## 🎚️ Utilisation
- YouTube, podcasts, publicités, jeux : aucune redevance.
- Montage : importez directement dans votre éditeur.
- Pensez à créditer Bazario quand c'est possible (facultatif).

## ⚖️ Licence
- Monde entier, durée illimitée (selon variante).
- Revente du fichier brut interdite.

> Les fichiers HD et les nouveautés mensuelles sont dans votre espace Bazario.`
}

function automatisations(p: Product): string {
  return `## 🔌 Import des workflows
1. Téléchargez les fichiers depuis votre espace Bazario.
2. Dans n8n / Make / Zapier : **Import** → sélectionnez le fichier.
3. Renseignez vos identifiants (API keys) dans les nœuds marqués.

## 🧱 Bonnes pratiques
- Testez chaque workflow en mode « manuel » avant activation.
- Ajoutez une étape de notification (Slack/email) en cas d'erreur.
- Documentez vos variables d'environnement.

## 🗺️ Contenu
${p.description}

## ✅ Checklist
- [ ] Identifiants renseignés
- [ ] Test manuel réussi
- [ ] Gestion d'erreur ajoutée
- [ ] Planification activée`
}

const BUILDERS: Record<string, (p: Product) => string> = {
  "agents-ia": agentsIA,
  prompts,
  templates,
  formations,
  saas,
  "art-ia": artIA,
  "audio-ia": audioIA,
  automatisations,
}

let count = 0
for (const product of PRODUCTS) {
  const builder = BUILDERS[product.category] ?? templates
  const md = header(product) + builder(product) + footer()
  writeFileSync(join(OUT, `${product.slug}.md`), md, "utf-8")
  count++
}

console.log(`✓ ${count} livrables générés dans public/deliverables/`)
