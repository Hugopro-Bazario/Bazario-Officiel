# Bazario Officiel
Site vitrine + tunnel de commande avec API serverless (`/api/order`) déployé sur Vercel.

## Fonctionnalités
- Landing page marketing (`index.html`)
- Tunnel de commande Stripe (`checkout.html` → Checkout hébergé Stripe)
- Persistance de commande (`created` puis `paid`) dans Supabase
- Orchestration dropshipping CJDropshipping après paiement webhook
- Notification Brevo (client + admin)
- Authentification/session Supabase côté frontend Vite
- Tests unitaires Vitest sur la logique métier

## Scripts
- `npm run dev` : lancement local Vite
- `npm run build` : build de production
- `npm run preview` : prévisualisation build locale
- `npm run test` : tests unitaires

## Variables d’environnement principales
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY` (ou `VITE_SUPABASE_PUBLISHABLE_KEY`)
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_THIN_WEBHOOK_SECRET` (optionnel)
- `BREVO_API_KEY`
- `BREVO_SENDER_EMAIL`
- `BREVO_BASE_URL` (optionnel, défaut: `https://api.brevo.com/v3`)
- `CJ_API_KEY` (ou `CJ_ACCESS_TOKEN`)
- `CJ_API_BASE_URL` (optionnel, défaut: `https://developers.cjdropshipping.com/api2.0/v1`)
- `CJ_LOGISTIC_NAME` (requis pour créer une commande CJ)
- `CJ_FROM_COUNTRY_CODE` (optionnel, défaut `CN`)
- `ADMIN_API_KEY` (requis pour endpoints back-office)

Voir `.env.example` pour la liste complète.

## Notes d’exploitation
- Le chemin principal d’achat passe par Stripe Checkout (`/api/stripe/checkout-session`).
- Le webhook Stripe enregistre la commande payée puis tente la soumission CJ.
- Si CJ/Brevo échoue, la commande reste persistée avec warning et peut être relancée via les endpoints admin.

## Endpoints Stripe (Node/Vercel)
- `POST /api/stripe/create-product` (alias: `/api/create-product`)
- `POST /api/stripe/connect-account` (alias: `/api/connect-account`)
- `POST /api/stripe/account-link` (alias: `/api/account-link`)
- `GET /api/stripe/account-status?account_id=acct_...` (alias: `/api/account-status`)
- `GET /api/stripe/account-status/{id}`
- `GET /api/stripe/products` (alias: `/api/products`)
- `POST /api/stripe/checkout-session` (alias: `/api/checkout-session`)
- `POST /api/stripe/webhook` (alias: `/api/webhook` et `/api/stripe-webhook`)
- `POST /api/stripe/thin-webhook` (alias: `/api/thin-webhook`)

## Endpoints Back-office (sécurisés par `x-admin-api-key`)
- `GET /api/admin/orders?limit=50`
- `POST /api/admin/retry-cj` avec `{ "reference": "BZ-..." }`
- `POST /api/admin/sync-cj` avec `{ "reference": "BZ-..." }` ou body vide pour sync batch

