# Bazario - activation Stripe, Supabase, Brevo et dropshipping

Important : ne partage jamais ton mot de passe Google. Le site doit utiliser uniquement des cles API et des variables d'environnement.

## 1. Variables Vercel a ajouter

Dans Vercel > `bazario-officiel-hugo` > Settings > Environment Variables, ajoute :

```txt
APP_URL=https://www.bazario-official.com

STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

SUPABASE_URL=https://uymvlltweutiazmixuhw.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...

BREVO_API_KEY=...
BREVO_SENDER_EMAIL=support@bazario-official.com
BREVO_SENDER_NAME=Bazario

CJ_API_KEY=...
CJ_API_SECRET=...
CJ_API_BASE_URL=https://developers.cjdropshipping.com/api2.0/v1
```

Pour tester sans argent reel, utilise d'abord les cles Stripe `sk_test_...`.

## 2. Supabase

1. Va dans Supabase.
2. Ouvre le projet `uymvlltweutiazmixuhw`.
3. Va dans SQL Editor.
4. Copie/execute `supabase/migrations/001_orders.sql`.
5. Verifie que les tables existent :
   - `orders`
   - `order_items`

Le code utilise `SUPABASE_SERVICE_ROLE_KEY` uniquement cote serveur dans les fonctions Vercel.

## 3. Stripe

1. Va dans Stripe Dashboard.
2. Developers > API keys.
3. Copie `Secret key` vers `STRIPE_SECRET_KEY` dans Vercel.
4. Developers > Webhooks > Add endpoint.
5. Endpoint URL :

```txt
https://www.bazario-official.com/api/stripe-webhook
```

6. Events a cocher :
   - `checkout.session.completed`
   - `checkout.session.expired`
7. Copie le signing secret `whsec_...` vers `STRIPE_WEBHOOK_SECRET` dans Vercel.
8. Redepose/redeploy le projet Vercel.

## 4. Brevo

1. Va dans Brevo.
2. Cree une API key SMTP/API.
3. Mets-la dans `BREVO_API_KEY`.
4. Verifie ton domaine d'envoi.
5. Configure SPF/DKIM/DMARC.

Le code envoie deja :
- messages contact ;
- notification interne de commande ;
- confirmation apres webhook Stripe.

## 5. Dropshipping

Le code verifie deja la connectivite CJ via `/api/order`, mais ne passe pas encore les commandes fournisseur automatiquement.

Avant automatisation fournisseur :

1. Valide le fournisseur principal.
2. Valide les delais et retours.
3. Valide les droits images.
4. Active Stripe et webhooks.
5. Ajoute une table `fulfillments`.
6. Declenche la commande fournisseur uniquement apres paiement confirme.

## 6. Test de bout en bout

1. Ouvre `/catalogue.html`.
2. Ajoute un produit au panier.
3. Va sur `/panier.html`.
4. Clique checkout.
5. Remplis le formulaire.
6. Si Stripe est configure : redirection vers Stripe Checkout.
7. Paye avec une carte test Stripe :

```txt
4242 4242 4242 4242
```

8. Verifie :
   - redirection vers `/merci.html` ;
   - ligne dans Supabase `orders` ;
   - ligne dans Supabase `order_items` ;
   - email Brevo recu.

## 7. Pret pour ventes reelles

Passe en production seulement quand :

- Stripe live fonctionne ;
- webhook Stripe confirme les commandes ;
- Supabase enregistre les commandes ;
- Brevo envoie les emails ;
- produits reels valides fournisseur ;
- politique livraison/retours exacte ;
- support client pret.
