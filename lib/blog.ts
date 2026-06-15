export type BlogPost = {
  slug: string
  title: string
  description: string
  cover: string
  category: "guides" | "comparatifs" | "entretien" | "tendances"
  author: { name: string; role: string }
  publishedAt: string // ISO date
  readingMinutes: number
  keywords: string[]
  relatedSlugs?: string[] // product slugs
  /**
   * Article body as a list of typed sections to keep structure simple while
   * remaining rich (h2 titles, paragraphs, lists, callouts, links).
   */
  body: BlogSection[]
}

export type BlogSection =
  | { type: "h2"; id: string; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; tone: "info" | "tip" | "warning"; title: string; text: string }
  | { type: "cta"; productSlug: string; label: string }

export const POSTS: BlogPost[] = [
  {
    slug: "choisir-premier-agent-ia-2026",
    title: "Comment choisir son premier agent IA en 2026",
    description:
      "Vente, support, SEO ou veille : quel agent IA déployer en premier ? Critères, intégrations, garde-fous et erreurs à éviter pour automatiser sans se tromper.",
    cover: "/digital/editorial-agents.svg",
    category: "guides",
    author: { name: "Équipe Bazario", role: "Expert IA & automatisation" },
    publishedAt: "2026-06-08",
    readingMinutes: 8,
    keywords: [
      "choisir agent IA",
      "agent IA entreprise",
      "agent commercial IA",
      "automatiser avec l'IA 2026",
      "comparatif agents IA",
    ],
    relatedSlugs: ["agent-orion-assistant-commercial", "agent-luna-support-client"],
    body: [
      {
        type: "p",
        text: "Un agent IA n'est plus un gadget : c'est un employé numérique qui travaille pendant que vous dormez. Mais déployer le mauvais agent en premier, c'est perdre du temps et de la confiance. Ce guide passe en revue les critères qui comptent vraiment et l'ordre dans lequel automatiser, à partir des retours de milliers d'utilisateurs Bazario.",
      },
      { type: "h2", id: "par-ou-commencer", text: "Par quel agent commencer ?" },
      {
        type: "p",
        text: "Commencez par la tâche la plus répétitive et la plus chronophage de votre activité. Pour la plupart des entreprises, c'est soit la qualification des leads (agent commercial), soit le support de premier niveau (agent support). Ces deux postes ont un ROI immédiat et mesurable dès la première semaine.",
      },
      { type: "h2", id: "criteres", text: "Les 5 critères qui comptent" },
      {
        type: "ul",
        items: [
          "Intégrations natives : l'agent se connecte-t-il à votre CRM, votre boîte mail, votre calendrier ?",
          "Garde-fous : pouvez-vous définir ce que l'agent a le droit de faire, et l'escalade vers un humain ?",
          "Transparence : un tableau de bord montre-t-il chaque action en temps réel ?",
          "Apprentissage : l'agent s'entraîne-t-il sur VOS données (offres, ton, FAQ) ?",
          "Conformité : RGPD et AI Act respectés, données hébergées correctement.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Le bon réflexe Bazario",
        text: "Démarrez en mode « copilote » (l'agent propose, vous validez) pendant 48 h, puis passez en autonomie une fois la confiance établie. Tous nos agents permettent ce basculement en un clic.",
      },
      { type: "h2", id: "erreurs", text: "Les 3 erreurs à éviter" },
      {
        type: "ol",
        items: [
          "Tout automatiser d'un coup : déployez un agent, mesurez, puis étendez.",
          "Sauter la phase d'entraînement : un agent sans vos données répond comme un chatbot générique.",
          "Oublier l'escalade humaine : 100 % d'automatisation sur des cas sensibles nuit à la relation client.",
        ],
      },
      {
        type: "cta",
        productSlug: "agent-orion-assistant-commercial",
        label: "Voir notre best-seller : l'agent commercial Orion 24/7",
      },
      { type: "h2", id: "conclusion", text: "Conclusion" },
      {
        type: "p",
        text: "Choisissez un seul agent, sur la tâche la plus répétitive, avec de vraies intégrations et des garde-fous clairs. Mesurez le temps gagné sur deux semaines, puis étendez. C'est ainsi que l'IA devient un collaborateur fiable plutôt qu'une promesse.",
      },
    ],
  },
  {
    slug: "prompt-engineering-7-techniques-pro",
    title: "Prompt engineering : 7 techniques pour des résultats de pro",
    description:
      "Rôle, contexte, exemples, format de sortie, chaînage : 7 techniques concrètes pour transformer des réponses moyennes en résultats exploitables avec n'importe quel modèle IA.",
    cover: "/digital/editorial-stack.svg",
    category: "guides",
    author: { name: "Équipe Bazario", role: "Expert prompt engineering" },
    publishedAt: "2026-06-02",
    readingMinutes: 7,
    keywords: [
      "prompt engineering",
      "techniques de prompt",
      "bien écrire un prompt",
      "prompts professionnels",
      "améliorer réponses IA",
    ],
    relatedSlugs: ["mega-pack-prompts-business-2026", "systeme-prompts-copywriting"],
    body: [
      {
        type: "p",
        text: "Un même modèle peut produire une réponse banale ou un livrable prêt à l'emploi : tout dépend du prompt. Voici 7 techniques que nos meilleurs créateurs appliquent systématiquement, valables sur n'importe quel modèle récent.",
      },
      { type: "h2", id: "role", text: "1. Donnez un rôle précis" },
      { type: "p", text: "« Tu es un directeur commercial B2B SaaS » oriente le ton, le vocabulaire et le niveau d'expertise bien mieux qu'une question nue." },
      { type: "h2", id: "contexte", text: "2. Apportez le contexte avant la demande" },
      { type: "p", text: "Cible, objectif, contraintes, ce qui a déjà été essayé. Plus le contexte est riche, moins le modèle invente." },
      { type: "h2", id: "exemples", text: "3. Montrez 1 à 3 exemples (few-shot)" },
      { type: "p", text: "Un exemple d'entrée/sortie attendue vaut mille instructions. C'est la technique la plus rentable du lot." },
      { type: "h2", id: "format", text: "4. Imposez le format de sortie" },
      { type: "p", text: "« Réponds en tableau Markdown à 3 colonnes » ou « en JSON valide » : vous gagnez un temps fou en post-traitement." },
      {
        type: "callout",
        tone: "tip",
        title: "Le test des 10 secondes",
        text: "Si un collègue ne pourrait pas exécuter votre prompt sans poser de question, le modèle non plus. Ajoutez le contexte manquant.",
      },
      { type: "h2", id: "chainage", text: "5. Chaînez plutôt que tout demander d'un coup" },
      { type: "p", text: "Décomposez : 1) plan, 2) rédaction, 3) relecture critique. Chaque étape s'appuie sur la précédente et la qualité monte." },
      { type: "h2", id: "critique", text: "6. Demandez une auto-critique" },
      { type: "p", text: "« Liste 3 faiblesses de ta réponse puis corrige-les » améliore nettement le résultat sans intervention humaine." },
      { type: "h2", id: "iterer", text: "7. Itérez avec des prompts réutilisables" },
      { type: "p", text: "Capitalisez : transformez vos meilleurs prompts en modèles paramétrables que vous réutilisez à l'infini." },
      {
        type: "cta",
        productSlug: "mega-pack-prompts-business-2026",
        label: "Gagner du temps avec 2 500 prompts business testés",
      },
    ],
  },
  {
    slug: "revenus-passifs-produits-digitaux-2026",
    title: "Revenus passifs : vendre ses produits digitaux en 2026",
    description:
      "Prompts, templates, formations, musique IA : comment transformer votre savoir-faire en revenus récurrents, sans stock ni logistique. Méthode et erreurs à éviter.",
    cover: "/digital/editorial-revenus.svg",
    category: "tendances",
    author: { name: "Équipe Bazario", role: "Expert business digital" },
    publishedAt: "2026-05-26",
    readingMinutes: 6,
    keywords: [
      "revenus passifs",
      "vendre produits digitaux",
      "créateur de contenu monétiser",
      "business en ligne 2026",
      "vendre templates et prompts",
    ],
    relatedSlugs: ["starter-saas-nextjs-launchpad", "second-cerveau-os-notion"],
    body: [
      {
        type: "p",
        text: "Un produit digital se crée une fois et se vend une infinité de fois, sans stock ni frais de port. C'est le modèle de revenus le plus accessible de 2026. Encore faut-il choisir le bon produit et le bon canal.",
      },
      { type: "h2", id: "quoi-vendre", text: "Quoi vendre quand on débute ?" },
      {
        type: "ul",
        items: [
          "Packs de prompts ou de templates : rapides à produire, demande forte.",
          "Mini-formations ciblées : forte valeur perçue, marge élevée.",
          "UI kits, presets, samples, LUTs : parfaits si vous êtes créatif/technique.",
          "Automatisations et agents no-code : le segment qui explose en 2026.",
        ],
      },
      { type: "h2", id: "prix", text: "Comment fixer son prix ?" },
      { type: "p", text: "Partez de la valeur (temps ou argent économisé par l'acheteur), pas de votre temps de production. Un pack qui fait gagner 10 h vaut bien plus que 9 €. Proposez plusieurs licences (perso, commerciale, agence) pour capter différents budgets." },
      {
        type: "callout",
        tone: "tip",
        title: "La règle des mises à jour",
        text: "Promettez (et tenez) des mises à jour à vie : c'est l'argument qui transforme un achat ponctuel en relation de confiance et booste vos avis.",
      },
      { type: "h2", id: "ou-vendre", text: "Où vendre sans tout construire soi-même ?" },
      { type: "p", text: "Une marketplace vous apporte le trafic, le paiement, les licences et la livraison automatique. Vous vous concentrez sur la création ; la plateforme gère le reste et vous paie automatiquement." },
      { type: "h2", id: "erreurs", text: "Les erreurs qui tuent les ventes" },
      {
        type: "ol",
        items: [
          "Une fiche produit floue : montrez le résultat concret, pas des promesses.",
          "Pas d'avis : offrez vos premiers exemplaires contre des retours honnêtes.",
          "Licence ambiguë : précisez toujours ce que l'acheteur a le droit de faire.",
        ],
      },
      {
        type: "cta",
        productSlug: "starter-saas-nextjs-launchpad",
        label: "Lancer plus vite avec le starter SaaS LaunchPad",
      },
    ],
  },
]

export function getAllPosts(): BlogPost[] {
  return [...POSTS].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug)
}

export function getRelatedPosts(slug: string, limit = 2): BlogPost[] {
  const current = getPostBySlug(slug)
  if (!current) return []
  return POSTS.filter((p) => p.slug !== slug && p.category === current.category).slice(0, limit)
}
