# Etat du projet Bazario

Derniere mise a jour : 2026-04-27

## Resume

Bazario est actuellement un site Vite statique deployable sur Vercel avec :

- une home HTML statique (`index.html`) ;
- un tunnel de commande HTML/JS (`checkout.html`) ;
- une API serverless Vercel (`api/order.js`) qui valide une commande test, tente une notification Brevo et verifie la connectivite CJ ;
- une API catalogue paginee (`api/catalog.js`) et un feed Google Merchant pilote (`api/merchant-feed.js`) ;
- un catalogue centralise dans `src/data/products.json` avec helpers dans `src/core/productCatalog.js` ;
- des tests unitaires Vitest pour la logique catalogue, contact, produit et checkout.

Le projet n'est pas encore une application Next.js/Supabase complete. Les variables Supabase, Stripe, Brevo et CJ existent dans `.env.example`, mais Supabase et Stripe ne sont pas encore consommes par le code applicatif.

## Stack detectee

- Frontend : HTML statique, CSS inline, JavaScript navigateur, Vite.
- Backend : fonction serverless CommonJS dans `api/order.js`.
- Tests : Vitest.
- Deploiement cible : Vercel.
- Integrations preparees : Brevo, CJDropshipping, Supabase, Stripe.

## Pages existantes

- `/` : home marketing e-commerce avec promesse, categories, offres test, trust bar et JSON-LD Organization/WebSite.
- `/checkout.html` : formulaire de commande test avec total estime, validation cote client et appel `/api/order`.
- `/catalogue.html` : mini-catalogue demonstrateur.
- `/produit-organisateur-voyage.html` : premiere fiche produit indexable avec JSON-LD Product/BreadcrumbList.
- Pages de confiance et legales ajoutees : a propos, FAQ, retours, livraison, CGV, mentions legales, confidentialite, contact.

## Etat SEO

- Home statique indexable sans JavaScript.
- Meta descriptions et canonical poses sur les pages principales.
- `robots.txt` et `sitemap.xml` statiques ajoutes.
- JSON-LD Organization/WebSite sur la home.
- JSON-LD OfferCatalog sur le checkout.
- JSON-LD Product/BreadcrumbList sur la premiere fiche produit.
- Feed Merchant pilote disponible via `/api/merchant-feed`.

## Risques principaux

1. Le catalogue reste demonstrateur : pas encore de vrais produits fournisseur.
2. Pas de paiement Stripe actif.
3. Pas de persistance de commandes en base.
4. Pas de pipeline automatique d'import fournisseur.
5. Pas de consentement cookies/analytics complet.
6. Les contenus legaux sont des bases operationnelles, a valider juridiquement avant production commerciale.

## Prochaine priorite technique

Brancher le mode autopilot decrit dans `AUTOPILOT_SCALE_PLAN.md` :

1. choisir le fournisseur principal ;
2. definir le schema Supabase produits/commandes/sync jobs ;
3. importer un premier lot de produits reels ;
4. integrer Stripe Checkout et les webhooks ;
5. automatiser les emails Brevo ;
6. passer le feed Merchant sur les produits reels.
