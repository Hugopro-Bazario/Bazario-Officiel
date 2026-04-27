# Diagnostic Bazario

Date: 2026-04-27
URL cible: https://www.bazario-official.com
Depot analyse: application Vite statique avec API serverless Vercel `/api/order`

## Resultats des 7 tests du kit

Les tests externes du PDF demandent Chrome, PageSpeed, Rich Results, Google, Mobile Friendly et SecurityHeaders. Depuis cet environnement, je ne peux pas valider visuellement le site de production ni interagir avec ces services. J'ai donc documente l'etat verifiable dans le depot et les actions prises.

| Test | Statut depot | Resultat / observation |
| --- | --- | --- |
| 1. SSR / rendu sans JavaScript | Partiellement OK | Les pages principales sont du HTML statique Vite. Le contenu de la home et des pages de confiance est visible sans JavaScript. Le checkout utilise JS uniquement pour le total et l'envoi formulaire. |
| 2. Lighthouse / PageSpeed | A mesurer en production | Le depot est leger, sans framework client lourd ni images. Les prochains risques seront les images produit, scripts analytics et checkout Stripe. |
| 3. Schema.org | Ameliore | Ajout de JSON-LD Organization/WebSite sur la home et OfferCatalog sur le checkout. Les schemas Product/Offer reels devront attendre un catalogue produit. |
| 4. Console errors | A mesurer en preview | Le code statique ne depend pas de bundles applicatifs complexes. Le formulaire peut afficher des warnings si Brevo/CJ ne sont pas configures. |
| 5. Indexation Google | A verifier | Ajouter le domaine dans Google Search Console et soumettre `sitemap.xml`. |
| 6. Mobile Friendly | Base OK | Les pages utilisent des grilles responsives et du HTML simple. A tester sur la preview Vercel. |
| 7. Security headers | Ameliore | Ajout de `vercel.json` avec headers securite de base. CSP stricte a affiner quand Stripe, analytics et Brevo front seront branches. |

## Diagnostic technique du repo

- Stack actuelle: Vite 7, HTML statique, JavaScript inline sur checkout, Vitest pour logique pure.
- API: `api/order.js` en CommonJS pour Vercel serverless.
- Donnees: pas de vraie base Supabase ni catalogue produit dans le code actuel.
- Paiement: simulation de commande, pas encore de Stripe Checkout.
- Integrations: Brevo et CJDropshipping sont preparees via variables d'environnement, mais non obligatoires en local.

## Priorites

1. Garder toutes les pages business critiques indexables en HTML.
2. Remplacer les offres test par un vrai catalogue produit.
3. Ajouter Stripe Checkout avant tout trafic payant.
4. Mesurer PageSpeed et Rich Results sur la preview Vercel apres deploiement.
5. Declarer Search Console / Bing Webmaster et soumettre le sitemap.
