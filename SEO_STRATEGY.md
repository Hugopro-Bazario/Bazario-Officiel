# Stratégie SEO & trafic — Bazario (produits digitaux & IA)

## Objectif

Générer du trafic organique qualifié (intention d'achat) sans dépendre de la
publicité, en capitalisant sur ce qui est **déjà codé** : pages statiques
rapides, données structurées complètes, sitemap dynamique, vrais 404.

## ✅ Fondations techniques en place (dans le code)

| Élément | État |
|---|---|
| Sitemap dynamique (`/sitemap.xml`) : accueil, 8 catégories, 40 produits, 5 studios, blog, packs | ✅ |
| `robots.txt` : crawl ouvert, `/account` `/admin` `/seller` `/checkout` `/api` exclus | ✅ |
| Pages produit/catégorie/studio/blog **pré-rendues statiques** + vrais 404 | ✅ |
| `metadataBase`, canonicals, Open Graph + Twitter cards | ✅ |
| JSON-LD : `Organization` + `WebSite` (SearchAction), `Product` + `Offer` + `AggregateRating` + `BreadcrumbList` (fiches), `FAQPage` (FAQ), `Article` (blog), `CollectionPage` + `ItemList` (catégories), `ItemList` + `Offer` (packs) | ✅ |
| Performance : images AVIF/WebP, SVG légers, dark theme sans flash | ✅ |

## 🚀 À faire au lancement (jour J, ~30 min)

1. **Google Search Console** : ajouter la propriété `www.bazario-official.com`,
   soumettre `/sitemap.xml`, demander l'indexation de l'accueil + 8 catégories.
2. **Bing Webmaster Tools** : importer depuis Search Console (2 clics).
3. Vérifier les rich results : https://search.google.com/test/rich-results
   sur une fiche produit, la FAQ et un article de blog.
4. Créer les profils sociaux du `sameAs` (Instagram, TikTok, LinkedIn) — même
   vides, ils consolident l'entité « Bazario » chez Google.

## 🎯 Mots-clés money (intention d'achat)

| Mot-clé | Page cible |
|---|---|
| acheter agent ia / agent ia entreprise | `/c/agents-ia` |
| pack prompts chatgpt français | `/c/prompts` |
| template notion second cerveau | `/p/second-cerveau-os-notion` |
| starter saas next.js | `/p/starter-saas-nextjs-launchpad` |
| formation ia générative certifiante | `/c/formations` |
| musique libre de droits youtube | `/c/audio-ia` |
| workflow n8n e-commerce | `/p/pack-120-workflows-n8n-ecommerce` |
| marketplace produits digitaux | `/` + `/why-bazario` |

## ✍️ Long-tail : le blog est la machine à trafic

3 articles optimisés sont déjà en ligne (agents IA, prompt engineering,
revenus passifs). Cadence recommandée : **2 articles/semaine**, format
guide/comparatif, chacun ciblant UNE requête long-tail et poussant vers 1-2
produits (CTA intégré, comme les articles existants). Exemples à produire :

- « meilleur agent ia support client 2026 » → Luna
- « comment vendre ses prompts » → /sell
- « notion vs obsidian second cerveau » → template Notion
- « combien coûte un agent ia » → /c/agents-ia
- « musique ia droits commerciaux youtube » → banque musicale
- « automatiser sa prospection linkedin » → Atlas
- « créer un saas sans coder 2026 » → LaunchPad + formations
- « avatars ia photo profil linkedin » → pack avatars

## 📣 Distribution (générer du trafic au-delà de Google)

1. **Réutilisation systématique** : chaque article blog → 1 thread X + 1 post
   LinkedIn + 1 carrousel Instagram + 1 vidéo courte TikTok.
2. **Communautés FR** : subreddits entrepreneuriat/IA, groupes Facebook &
   Discord no-code, Product Hunt (lancement des packs), betalist.
3. **Créateurs relais** : chaque studio partenaire relaie ses fiches — prévoir
   un kit de partage (visuels + liens UTM) dans l'espace créateur.
4. **Newsletter** (déjà sur le site) nourrie par les drops et le blog.
5. Plus tard : flux Google Merchant Center (produits digitaux éligibles).

## 📊 Mesure avant d'acheter du trafic

Meta Pixel + TikTok Pixel + consentement RGPD sont déjà intégrés. Règle
maintenue : **pas d'achat média tant que** le tunnel organique ne convertit pas
(≥ 1 % visiteur→achat) et que LTV/CAC estimé < 3.

## Definition of done SEO

- Search Console : 0 erreur de couverture, sitemap accepté.
- Rich results valides sur produit, FAQ, article.
- 8 articles publiés le premier mois.
- Positions suivies sur les 8 mots-clés money (Search Console → Performances).
