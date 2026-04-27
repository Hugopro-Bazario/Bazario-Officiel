# Bazario - Decisions techniques

## ADR-001 - Conserver Vite statique pour la phase de fondations

**Statut :** accepte

### Contexte

Le kit Bazario mentionne une stack cible Next.js + Supabase + Brevo + Vercel. Le depot actuel contient une application Vite statique avec :

- `index.html`
- `checkout.html`
- `api/order.js` pour une API Vercel serverless
- tests unitaires Vitest

Il n'existe pas encore de pages produit dynamiques, de route App Router, de client Supabase ou de schema base de donnees.

### Decision

Ne pas migrer immediatement vers Next.js. Stabiliser d'abord le site statique :

- HTML indexable sans JavaScript pour les pages principales
- pages de confiance et legales
- sitemap et robots statiques
- headers de securite via `vercel.json`
- documentation de diagnostic et de plan

### Consequences

Avantages :

- changement peu risque et deployable rapidement
- le site reste compatible Vercel
- les fondations SEO/confiance sont visibles sans attendre une refonte complete

Limites :

- pas de sitemap dynamique
- pas de fiches produits SSR
- pas de donnees catalogue Supabase
- pas de checkout Stripe reel

### Critere de reouverture

Revoir cette decision quand au moins un de ces elements devient necessaire :

- catalogue produit reel avec plusieurs dizaines de references
- pages produit dynamiques
- besoin d'ISR/SSR
- integration Supabase active
- dashboard vendeur ou admin

## ADR-002 - Publier les pages de confiance avant acquisition payante

**Statut :** accepte

### Decision

Ajouter avant trafic payant les pages :

- FAQ
- contact
- a propos
- politique de retours
- delais de livraison
- CGV
- mentions legales
- politique de confidentialite

### Raison

Le modele dropshipping demande un niveau de confiance eleve. Les pages de support, delais, retours et mentions reduisent le risque de rebond et preparent les validations publicitaires.

### Limite

Les contenus devront etre relus et completes avec les informations legales reelles de l'editeur avant mise en production commerciale.
