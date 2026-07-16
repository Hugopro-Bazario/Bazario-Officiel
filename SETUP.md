# Bazario — Guide de mise en service

Ce guide liste, dans l'ordre, tout ce qu'il faut faire pour passer du site
« prêt » à un site **qui encaisse, livre et gère des comptes** réellement.

> Le code est déjà prêt : chaque capacité s'active dès que la variable
> d'environnement correspondante est renseignée. Sans clé, le site fonctionne
> en mode démonstration (messages propres, aucune erreur).

---

## 1. Débloquer le compte Vercel ⛔ (prioritaire)

La seule vérification de déploiement échoue avec « Account is blocked ».
Tant que ce n'est pas réglé, **rien ne se déploie**.
→ https://vercel.com/account — vérifier facturation / identité.

## 2. Variables d'environnement (Vercel → Settings → Environment Variables)

### Paiements & abonnements (Stripe)
| Variable | Où la trouver |
|---|---|
| `STRIPE_SECRET_KEY` | dashboard.stripe.com/apikeys (clé secrète) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | idem (clé publique) |
| `STRIPE_WEBHOOK_SECRET` | dashboard.stripe.com/webhooks (signing secret) |
| `STRIPE_PRICE_NEXUS_MONTHLY` / `_YEARLY` | *(facultatif)* sinon prix défini en ligne |

### Emails de confirmation (Brevo)
| Variable | Note |
|---|---|
| `BREVO_API_KEY` | app.brevo.com → SMTP & API |
| `BAZARIO_SENDER_EMAIL` | un expéditeur vérifié chez Brevo |

### Comptes & données (Supabase)
| Variable | Note |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | idem |
| `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` | pour le webhook (écriture des accès) |

`APP_URL` = l'URL publique du site (ex. `https://www.bazario-official.com`).

## 3. Webhook Stripe

1. https://dashboard.stripe.com/webhooks → **Add endpoint**
2. URL : `https://VOTRE-DOMAINE/api/webhooks/stripe`
3. Événements : `checkout.session.completed` (+ `charge.refunded` recommandé)
4. Copier le **Signing secret** dans `STRIPE_WEBHOOK_SECRET`.

## 4. Base de données Supabase

Appliquer les migrations du dossier `supabase/migrations/` (via le SQL Editor
ou la CLI Supabase). La migration `005_digital_entitlements.sql` crée :
- `profiles` (créé automatiquement à l'inscription)
- `entitlements` (les accès/téléchargements liés au compte)

Activer la confirmation d'email dans Supabase → Auth si souhaité.

## 5. Redéployer

Une fois 1→4 faits et un redeploy effectué :
- ✅ Paiement par carte / Apple Pay / Google Pay
- ✅ Abonnement Nexus+ (essai 30 j)
- ✅ Email de confirmation automatique (achat + abonnement)
- ✅ Inscription / connexion réelles
- ✅ Accès enregistrés dans le compte

---

## 6. Vos vrais produits (quand prêt)

Le catalogue actuel est une **démonstration** (`lib/data.ts`). Pour vendre vos
vrais produits :
1. Remplacer les entrées de `lib/data.ts` (ou brancher la table `products`).
2. Pour la **livraison de fichiers réels** : déposer les fichiers dans un
   stockage privé (Supabase Storage / S3) et adapter `app/api/download/route.ts`
   pour servir le vrai fichier après vérification de l'`entitlement`.

> Aujourd'hui, `/api/download` génère un guide d'accès + licence par produit
> (livraison réelle de démonstration). Le branchement sur de vrais fichiers se
> fait à cet endroit unique.

## Récapitulatif des capacités et de leur déclencheur

| Capacité | S'active avec |
|---|---|
| Encaissement | `STRIPE_SECRET_KEY` |
| Abonnement Nexus+ | `STRIPE_SECRET_KEY` |
| Confirmation post-paiement | `STRIPE_WEBHOOK_SECRET` |
| Emails | `BREVO_API_KEY` + `BAZARIO_SENDER_EMAIL` |
| Comptes / accès | clés Supabase + migrations appliquées |
| Téléchargement | actif (démo) — à brancher sur vos fichiers |
