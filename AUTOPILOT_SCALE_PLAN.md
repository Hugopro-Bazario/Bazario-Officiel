# Bazario - plan pour vendre beaucoup de produits en automatique

Ce dépôt ne peut pas devenir une marketplace à millions de produits uniquement avec des fichiers HTML. La suite doit transformer Bazario en système catalogue + commandes + fournisseur + paiement + analytics.

## Ce qui vient d'être posé

- Catalogue central dans `src/data/products.json`.
- Helpers de recherche dans `src/core/productCatalog.js`.
- API `/api/catalog` pour rechercher/paginer les produits.
- API `/api/merchant-feed` pour exposer un flux compatible Google Merchant Center.
- Checkout aligné sur les produits du catalogue central.

## Architecture cible

### 1. Source catalogue

Remplacer `src/data/products.json` par une base de données :

- Supabase `products`
- Supabase `product_variants`
- Supabase `categories`
- Supabase `supplier_products`
- Supabase `inventory_events`

Champs minimum pour `products` :

- `id`
- `slug`
- `name`
- `description`
- `short_description`
- `category_id`
- `brand`
- `sku`
- `supplier_id`
- `supplier_product_id`
- `price`
- `compare_at_price`
- `currency`
- `stock_status`
- `delivery_min_days`
- `delivery_max_days`
- `images`
- `active`
- `created_at`
- `updated_at`

### 2. Synchronisation fournisseur

Créer une fonction planifiée :

- récupère les produits fournisseur toutes les heures.
- ajoute les nouveaux produits.
- met à jour prix, stock, images et délais.
- désactive automatiquement les produits en rupture.
- journalise chaque erreur.

Il faut choisir un fournisseur principal avant de coder :

- CJDropshipping
- AutoDS
- Spocket
- AliExpress
- autre

### 3. Réécriture SEO automatisée

Pipeline recommandé :

1. importer description fournisseur brute.
2. générer une description française claire.
3. garder les caractéristiques techniques exactes.
4. valider manuellement les produits prioritaires.
5. publier uniquement les produits actifs et conformes.

### 4. Paiement et commandes

Stripe doit remplacer la simulation actuelle :

- créer une session Stripe Checkout.
- enregistrer une commande `pending`.
- confirmer la commande via webhook Stripe.
- envoyer email Brevo de confirmation.
- déclencher commande fournisseur après paiement confirmé.

Tables nécessaires :

- `orders`
- `order_items`
- `payments`
- `fulfillments`
- `shipments`
- `customers`

### 5. Automatisation email

Brevo :

- confirmation commande.
- expédition.
- demande d'avis.
- panier abandonné.
- win-back.
- support contact.

### 6. Analytics

À brancher avant publicité :

- `view_item`
- `view_item_list`
- `add_to_cart`
- `begin_checkout`
- `purchase`
- `newsletter_subscribe`
- `contact_submit`

Outils recommandés :

- Vercel Analytics pour perf.
- PostHog pour événements et funnels.
- GA4 pour acquisition.
- Meta Pixel uniquement après consentement.

## Prochaine tâche code exacte

Demander :

```txt
Migre le catalogue actuel vers Supabase : crée les migrations SQL products/categories/orders, ajoute les helpers Supabase côté serveur, remplace /api/catalog et /api/merchant-feed pour lire depuis Supabase avec fallback local, puis ajoute les tests.
```

## Ce qu'il ne faut pas faire

- Ne pas importer des millions de produits dans Git.
- Ne pas vendre sans Stripe réel.
- Ne pas déclencher commande fournisseur avant paiement confirmé.
- Ne pas publier des produits sans vérifier droits images, délais et retours.
- Ne pas lancer de publicité avant analytics + checkout réel.
