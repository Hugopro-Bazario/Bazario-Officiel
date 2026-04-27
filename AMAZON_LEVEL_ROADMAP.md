# Bazario - roadmap pour viser une experience meilleure qu'Amazon sur une niche

Objectif : construire Bazario comme une marketplace fiable, rapide, rassurante et automatisable. Battre Amazon globalement demande capital, logistique, catalogue, data et execution. La strategie realiste est de devenir meilleur sur des niches ciblees, puis d'elargir.

## 1. UX/UI et navigation

### Deja pose

- Home claire avec promesse, categories, produits, reassurance.
- Catalogue avec recherche instantanee, filtre categorie, filtre prix, tri et panier local.
- Panier local avec total et passage checkout.
- Pages confiance et legales.

### A faire ensuite

- Header unifie sur toutes les pages avec recherche globale.
- Design system complet : boutons, cartes, alertes, badges, grilles, formulaires.
- Fiches produit homogenes pour chaque produit.
- Pages categorie dediees : `/categorie/maison-pratique`, `/categorie/tech-mobilite`.
- Tests UX mobile reels.

### KPI

- Taux de clic catalogue -> fiche produit.
- Taux ajout panier.
- Taux panier -> checkout.
- Taux checkout -> commande.

## 2. Catalogue et millions de produits

### Deja pose

- Donnees produit centralisees dans `src/data/products.json`.
- API `/api/catalog` pour recherche/pagination.
- Feed `/api/merchant-feed` pour Google Merchant.

### A faire pour scaler

- Migrer vers Supabase/Postgres.
- Tables : `products`, `product_variants`, `categories`, `suppliers`, `inventory_events`.
- Index Postgres sur `slug`, `category_id`, `price`, `active`.
- Recherche dediee : Meilisearch, Typesense ou Algolia.
- Import fournisseur planifie.
- Publication par lots, pas millions de pages statiques dans Git.

### Regle

Ne jamais importer des millions de produits dans le repo. Le repo contient le code, la base contient le catalogue.

## 3. Logistique et livraison

### A faire

- Choisir fournisseur principal : CJDropshipping, AutoDS, Spocket ou autre.
- Ajouter champs livraison : pays, delai min/max, transporteur, tracking URL.
- Automatiser statut commande : `paid`, `processing`, `shipped`, `delivered`, `refunded`.
- Page suivi commande.
- Emails Brevo : confirmation, expedition, livraison, demande avis.

### KPI

- Delai moyen expedition.
- Taux commandes livrees sans incident.
- Taux remboursement.
- Delai reponse support.

## 4. Paiement et securite

### Priorite absolue avant vente

- Stripe Checkout reel.
- Webhook Stripe signe.
- Commande creee en `pending`, confirmee uniquement par webhook `checkout.session.completed`.
- Pas de commande fournisseur avant paiement confirme.
- Logs anti-fraude basiques : email, pays, montant, IP cote plateforme si disponible.

### Conformite

- RGPD : consentement cookies, finalites, suppression donnees.
- Mentions legales a valider juridiquement.
- Conditions de retour conformes UE.

## 5. Confiance et reputation

### Deja pose

- FAQ, retours, livraison, contact, CGV, confidentialite, mentions legales.
- Signaux reassurance dans home, catalogue, checkout.

### A faire

- Avis clients verifies uniquement apres achat.
- Page suivi de commande.
- Garantie remboursement claire.
- Support Brevo/ticketing.
- Remplacer avis pilotes par vrais avis.

## 6. Marketing, SEO et traction

### Deja pose

- Sitemap.
- Robots.
- Meta descriptions.
- JSON-LD Organization, WebSite, Product, BreadcrumbList.
- Feed Merchant initial.
- Documents SEO/social.

### A faire

- Google Search Console.
- Google Merchant Center.
- Pages categories SEO 500-800 mots chacune.
- Blog long-tail.
- Tracking PostHog/GA4.
- Campagnes ads uniquement apres Stripe + analytics + vrais produits.

### Funnel minimum

1. SEO et social organique.
2. Retargeting visiteurs.
3. Email capture.
4. Offre de bienvenue.
5. Relance panier abandonne.
6. Demande avis apres livraison.

## 7. Prix, avantages, fidelisation

### Strategie prix

- Prix clair.
- Prix compare affiche uniquement s'il est justifiable.
- Livraison gratuite au-dessus d'un seuil rentable.
- Bundles : produit principal + accessoire.

### Fidelisation

- Programme points.
- Code parrainage.
- Emails win-back.
- Abonnement type "Bazario Plus" seulement apres preuves de demande.

## 8. Technologie, IA et automatisation

### A faire

- Recommandations produits : produits similaires, souvent achetes ensemble.
- Scoring produits : marge, delai, avis, taux retour.
- Description SEO assistee IA avec validation humaine.
- Detection produits a risque : delai trop long, images douteuses, marge faible.
- Dashboard admin.

## 9. Marketplace vendeurs

### A faire plus tard

- `/devenir-vendeur`.
- Table `sellers`.
- KYC Stripe Identity ou Stripe Connect.
- Dashboard vendeur.
- Commission par categorie.
- Moderation catalogue.
- Support vendeur.

## 10. Internationalisation

### A faire

- URLs propres par langue : `/fr`, `/en`.
- Multi-devise via Stripe.
- Taxes et retours par pays.
- Traductions verifiees.
- Catalogue adapte localement.

## 11. Financement

### Besoins

- Budget catalogue/photos.
- Budget outils : Vercel, Supabase, Brevo, recherche, analytics.
- Budget ads test uniquement apres tunnel valide.
- Budget support client.

### Regle

Ne pas depenser fort en publicite avant :

- paiement reel fonctionnel ;
- produits reels valides ;
- suivi analytics ;
- politique livraison claire ;
- support pret.

## 12. Ordre exact des prochains chantiers code

1. Migrer catalogue vers Supabase avec schema SQL.
2. Ajouter Stripe Checkout + webhook.
3. Enregistrer commandes et items en base.
4. Ajouter vraie page panier persistante.
5. Ajouter pages categorie SEO.
6. Ajouter recherche scalable.
7. Ajouter analytics events.
8. Ajouter sync fournisseur.
9. Ajouter emails Brevo transactionnels.
10. Ajouter avis verifies.

## 13. Definition "pret a vendre"

Bazario est pret a vendre quand :

- au moins 10 produits reels sont valides ;
- Stripe fonctionne en production ;
- commande en base apres paiement ;
- email confirmation envoye ;
- politique livraison/retour exacte ;
- support contact fonctionne ;
- analytics mesure le funnel ;
- pages produit et categorie sont indexables ;
- preview Vercel est verte.
