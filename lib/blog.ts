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
    slug: "comment-choisir-machine-expresso-2026",
    title: "Comment choisir une machine à expresso : le guide 2026",
    description:
      "Manuelle, automatique ou super-automatique ? Pression, broyeur, mousseur de lait : on décortique tout pour vous aider à choisir la bonne machine à expresso en 2026.",
    cover: "/blog-espresso.jpg",
    category: "guides",
    author: { name: "Équipe Bazario", role: "Expert maison & cuisine" },
    publishedAt: "2026-04-12",
    readingMinutes: 9,
    keywords: [
      "comment choisir machine expresso",
      "machine à café automatique",
      "machine à café avec broyeur",
      "machine espresso 2026",
      "comparatif machine expresso",
    ],
    relatedSlugs: ["machine-cafe-espresso-ducale", "cafe-grain-ethiopie"],
    body: [
      {
        type: "p",
        text: "Le café à la maison est devenu un rituel, et la machine à expresso n'est plus un luxe : c'est l'investissement quotidien le plus rentable de votre cuisine. Encore faut-il choisir la bonne. Manuelle, automatique, super-automatique, avec ou sans broyeur, à pression 9 ou 15 bars… Ce guide passe en revue les 6 critères qui comptent vraiment et les 3 erreurs à éviter, en se basant sur des centaines de retours clients Bazario.",
      },
      { type: "h2", id: "manuelle-automatique-super", text: "Manuelle, automatique, super-automatique : la différence" },
      {
        type: "p",
        text: "Une machine manuelle (à levier ou à percolation) demande de moudre, doser, tasser et extraire à la main. Idéale pour le passionné qui veut tout contrôler. Une machine automatique gère pression, débit et température mais vous moulez et tassez vous-même. Une super-automatique embarque un broyeur et fait tout en un appui : grain → tasse en 30 s. C'est, et de loin, la catégorie la plus achetée chez Bazario en 2026.",
      },
      { type: "h2", id: "pression", text: "La pression : 9 bars suffisent, 15 bars ne servent pas à grand-chose" },
      {
        type: "p",
        text: "Une bonne extraction se fait à 9 bars. Les marques affichent souvent 15 bars pour rassurer, mais cela parle de la pression maximum de la pompe, pas de l'extraction réelle. Cherchez plutôt une machine avec une pression d'extraction stable et un préchauffage de tête de groupe : c'est ça qui fait un crema dense.",
      },
      { type: "h2", id: "broyeur", text: "Avec broyeur ou sans ? Le critère qui change tout" },
      {
        type: "p",
        text: "Un café fraîchement moulu perd 60 % de ses arômes en 15 minutes. Un broyeur intégré (en céramique, idéalement) garantit une extraction toujours fraîche et vous évite l'achat d'un moulin séparé. Pour un budget équivalent, une super-automatique avec broyeur bat presque toujours une machine sans broyeur + un moulin d'entrée de gamme.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Le bon réflexe Bazario",
        text: "Privilégiez un broyeur en céramique plutôt qu'en acier : il chauffe moins, préserve mieux les arômes et dure 10 ans contre 3-5 ans pour l'acier d'entrée de gamme.",
      },
      { type: "h2", id: "mousseur-lait", text: "Mousseur de lait : automatique ou buse vapeur ?" },
      {
        type: "p",
        text: "Si vous buvez majoritairement noir : zappez. Si vous aimez les cappuccinos et lattes : le mousseur automatique avec carafe à lait amovible est le plus pratique. Pour les puristes, la buse vapeur orientable permet de texturer comme un barista. C'est plus long à apprendre mais le rendu est supérieur.",
      },
      { type: "h2", id: "entretien", text: "Entretien : le critère oublié qui prolonge la durée de vie" },
      { type: "p", text: "Une machine à expresso non entretenue tient 3 ans. Bien entretenue, 10. Cherchez :" },
      {
        type: "ul",
        items: [
          "Un cycle de détartrage automatisé avec rappel programmé.",
          "Un bac à marc accessible par l'avant (pas le côté).",
          "Une chambre d'extraction amovible, lavable à l'eau.",
          "Un filtre à eau intégré (réduit le calcaire et les détartrages).",
        ],
      },
      { type: "h2", id: "budget", text: "Quel budget prévoir en 2026 ?" },
      { type: "p", text: "Voici les 4 paliers que nous observons chez Bazario :" },
      {
        type: "ul",
        items: [
          "200-400 € : entrée de gamme honnête, automatique sans broyeur.",
          "400-700 € : super-automatique avec broyeur, mousseur manuel.",
          "700-1200 € : super-automatique avec broyeur céramique et mousseur automatique. Notre sweet spot.",
          "1200-3000 € : machines à double chaudière, profils baristas, écran tactile, recettes mémorisées.",
        ],
      },
      { type: "h2", id: "erreurs", text: "Les 3 erreurs à éviter" },
      {
        type: "ol",
        items: [
          "Acheter sur la promesse \"15 bars\" : ce chiffre ne dit rien sur la qualité d'extraction.",
          "Sous-estimer le bruit : une machine de bureau partagé doit faire moins de 75 dB.",
          "Oublier le café : la meilleure machine ne sauvera pas un café industriel rance.",
        ],
      },
      {
        type: "cta",
        productSlug: "machine-cafe-espresso-ducale",
        label: "Voir notre best-seller : la machine Ducale automatique avec broyeur",
      },
      { type: "h2", id: "conclusion", text: "Conclusion" },
      {
        type: "p",
        text: "Si vous buvez 1-2 cafés par jour et voulez la simplicité : une super-automatique 700-1000 € avec broyeur céramique et carafe à lait. Si vous êtes 3+ buveurs ou que vous recevez : montez à 1000-1500 €. Si vous êtes un passionné qui veut tout contrôler : machine manuelle à levier + moulin pro. Et dans tous les cas, ne lésinez pas sur le café.",
      },
    ],
  },
  {
    slug: "comment-entretenir-trench-coat",
    title: "Comment entretenir un trench coat : 7 gestes pour le faire durer 10 ans",
    description:
      "Un trench coat bien entretenu vit 10 ans. Pluie, taches, doublure, ceinture, repassage : voici les 7 gestes que recommandent les artisans portugais qui fabriquent les nôtres.",
    cover: "/blog-trench.jpg",
    category: "entretien",
    author: { name: "Équipe Bazario", role: "Expert mode & matières" },
    publishedAt: "2026-04-19",
    readingMinutes: 7,
    keywords: [
      "comment entretenir trench coat",
      "laver trench coat",
      "trench coat camel",
      "imperméabiliser trench",
      "trench coat femme entretien",
    ],
    relatedSlugs: ["trench-emblem-camel", "ceinture-cuir-noir"],
    body: [
      {
        type: "p",
        text: "Un trench coat bien fait — c'est-à-dire en gabardine de coton dense, doublure rayée, ceinture tissée — n'a pas de date de péremption. Nos clients qui ont acheté un Emblem en 2018 le portent encore en 2026. À condition de respecter 7 règles simples que les ateliers portugais nous ont apprises.",
      },
      { type: "h2", id: "1", text: "1. Ne le lavez pas à chaque port" },
      {
        type: "p",
        text: "La gabardine est traitée pour résister à l'eau. Plus vous la lavez, plus vous fragilisez ce traitement. Aérez-le 24 h après chaque port. Brossez-le doucement avec une brosse à vêtements en poils naturels. Vous serez surpris : 90 % des taches disparaissent.",
      },
      { type: "h2", id: "2", text: "2. Pour les taches : eau froide + savon de Marseille" },
      {
        type: "p",
        text: "Pour une tache fraîche (café, vin, gras) : tamponnez avec un linge propre légèrement humide et une noisette de savon de Marseille. Toujours du centre vers l'extérieur. Jamais d'eau chaude (elle fixe la tache). Jamais d'eau de javel.",
      },
      { type: "h2", id: "3", text: "3. Le pressing 1 fois par an, pas plus" },
      {
        type: "p",
        text: "Un pressing trop fréquent agresse la gabardine et l'imperméabilisation. Choisissez un pressing artisanal qui vous demande la composition de la doublure. Demandez explicitement \"pressing à sec doux, pas de presse à chaud\".",
      },
      { type: "h2", id: "4", text: "4. Réimperméabiliser tous les 12-18 mois" },
      {
        type: "p",
        text: "Un spray imperméabilisant non fluoré (type Granger's ou Otter Wax) appliqué à 30 cm de distance, en couches fines, après un nettoyage. Laissez sécher 24 h à plat. Vous retrouverez l'effet déperlant des premiers jours.",
      },
      { type: "h2", id: "5", text: "5. Le repassage : à la pattemouille uniquement" },
      {
        type: "p",
        text: "Posez un linge en coton humide entre le fer et la gabardine. Fer à 150 °C maximum. Repassez en pressant, pas en glissant. Le résultat : un revers net sans lustrer le tissu.",
      },
      { type: "h2", id: "6", text: "6. Stockez-le sur un cintre large" },
      {
        type: "p",
        text: "Jamais sur un cintre fil : il déforme les épaules. Cintre en bois large. Ceinture nouée à l'arrière (jamais dans les passants en hiver). Couverture textile (pas plastique) si vous le rangez plus de 2 mois.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "L'erreur fatale",
        text: "Ne stockez jamais un trench mouillé. La doublure mettra 48 h à sécher et développera une odeur impossible à retirer. Toujours sécher 24 h à plat avant de pendre.",
      },
      { type: "h2", id: "7", text: "7. Bichonnez la ceinture" },
      {
        type: "p",
        text: "C'est la pièce qui s'use le plus vite. Lavez-la à part dans un filet à 30 °C tous les 6 mois. Si elle est définitivement marquée, demandez à votre retoucherie une ceinture de remplacement assortie : 30-50 € contre 300 € pour racheter le manteau entier.",
      },
      { type: "cta", productSlug: "trench-emblem-camel", label: "Découvrir notre trench Emblem fabriqué au Portugal" },
    ],
  },
  {
    slug: "cuir-pleine-fleur-croute-microfibre",
    title: "Cuir pleine fleur, croûte, microfibre : tout comprendre en 5 minutes",
    description:
      "Comment reconnaître un vrai cuir pleine fleur d'une croûte de cuir ou d'une microfibre ? Aspects, prix, durabilité, entretien : on vous dit tout, sans jargon.",
    cover: "/blog-leather.jpg",
    category: "guides",
    author: { name: "Équipe Bazario", role: "Expert mode & matières" },
    publishedAt: "2026-04-26",
    readingMinutes: 6,
    keywords: [
      "cuir pleine fleur",
      "différence cuir pleine fleur croûte",
      "qu'est-ce que la microfibre",
      "reconnaître vrai cuir",
      "cuir véritable",
    ],
    relatedSlugs: ["sac-cuir-juliet", "bottines-chelsea-cognac", "ceinture-cuir-noir"],
    body: [
      {
        type: "p",
        text: "Sur l'étiquette : \"cuir véritable\". Ça ne veut pas dire grand-chose. Un sac à 79 € peut être en \"cuir véritable\" et ne pas dépasser 2 hivers. Un sac à 349 € en cuir pleine fleur dure 15 ans et se patine. Voici comment ne plus se tromper.",
      },
      { type: "h2", id: "pleine-fleur", text: "Cuir pleine fleur : la couche supérieure de la peau" },
      {
        type: "p",
        text: "C'est la couche extérieure (la \"fleur\"), la plus dense, la plus résistante, qui garde les marques naturelles de l'animal (pores, légères cicatrices). Plus chère parce qu'on ne peut pas tricher dessus. Avantages : se patine, gagne en beauté, dure 15-20 ans. Inconvénients : prix, sensible aux taches grasses si non protégée.",
      },
      { type: "h2", id: "fleur-corrigee", text: "Fleur corrigée : la pleine fleur poncée" },
      {
        type: "p",
        text: "On ponce la surface pour retirer les imperfections, puis on imprime un grain artificiel uniforme. Plus uniforme, plus sage, mais perd la profondeur. Reconnaissable au grain trop régulier et au toucher légèrement plastifié. Bonne durabilité, esthétique moins riche.",
      },
      { type: "h2", id: "croute", text: "Croûte de cuir : la couche inférieure" },
      {
        type: "p",
        text: "C'est ce qui reste sous la pleine fleur. Sans grain naturel, on lui en colle un (parfois en polyuréthane). C'est ce qu'on appelle souvent \"cuir véritable\" sur les étiquettes. Durée de vie : 2-5 ans. Se craquelle aux pliures. À éviter pour un investissement.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Le test du pouce",
        text: "Pressez la surface avec votre pouce pendant 3 secondes puis relâchez : un cuir pleine fleur garde un léger creux puis revient lentement, une croûte rebondit instantanément, une simili reste figée. Pas infaillible, mais 80 % de réussite en boutique.",
      },
      { type: "h2", id: "microfibre", text: "Microfibre : pas un cuir, mais pas un mauvais choix" },
      {
        type: "p",
        text: "La microfibre haut de gamme (type Alcantara ou Ultrasuede) est un textile technique qui imite le suède. Pas de cuir, donc 100 % vegan. Avantages : léger, lavable, anti-taches, prix maîtrisé, bilan carbone parfois inférieur au cuir. Inconvénients : ne se patine pas, ne se répare pas.",
      },
      { type: "h2", id: "tannage", text: "Tannage : végétal vs chrome" },
      {
        type: "p",
        text: "Le tannage transforme la peau en cuir. Tannage chrome : rapide (1 jour), souple, palette de couleurs large, 90 % du marché. Tannage végétal : long (3-6 semaines), riche en patine, écologique, plus rigide à neuf. Les meilleurs sacs investissement sont en pleine fleur tannage végétal.",
      },
      { type: "h2", id: "entretien", text: "Entretien minimum d'un cuir pleine fleur" },
      {
        type: "ul",
        items: [
          "Crème nourrissante (type lait nettoyant) : 1 fois par mois.",
          "Imperméabilisant non fluoré : 2 fois par an.",
          "Brossage doux : après chaque sortie pluvieuse.",
          "Stockage : housse coton, jamais sac plastique, à l'abri de la lumière directe.",
        ],
      },
      { type: "cta", productSlug: "sac-cuir-juliet", label: "Découvrir nos sacs en cuir pleine fleur fabriqués à Florence" },
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
