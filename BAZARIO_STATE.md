# Etat du projet Bazario

Derniere mise a jour : 2026-04-27

## Resume

Bazario est actuellement un site Vite statique deployable sur Vercel avec :

- une home HTML statique (`index.html`) ;
- un tunnel de commande HTML/JS (`checkout.html`) ;
- une API serverless Vercel (`api/order.js`) qui valide une commande test, tente une notification Brevo et verifie la connectivite CJ ;
- des tests unitaires Vitest pour la logique catalogue et checkout.

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
- Pages de confiance et legales ajoutees : a propos, FAQ, retours, livraison, CGV, mentions legales, confidentialite, contact.

## Etat SEO

- Home statique indexable sans JavaScript.
- Meta descriptions et canonical poses sur les pages principales.
- `robots.txt` et `sitemap.xml` statiques ajoutes.
- JSON-LD Organization/WebSite sur la home.
- JSON-LD OfferCatalog sur le checkout.

## Risques principaux

1. Pas encore de vrai catalogue produits ni fiches produits.
2. Pas de paiement Stripe actif.
3. Pas de persistance de commandes en base.
4. Pas de consentement cookies/analytics complet.
5. Les contenus legaux sont des bases operationnelles, a valider juridiquement avant production commerciale.

## Prochaine priorite technique

Brancher un vrai modele produit/commande :

1. definir le schema Supabase ;
2. creer des produits reels avec images et stock ;
3. remplacer les offres test par un catalogue ;
4. integrer Stripe Checkout ;
5. enregistrer les commandes et webhooks ;
6. generer les fiches produits avec schema Product/Offer.
