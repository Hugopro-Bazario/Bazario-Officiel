# Bazario — Stratégie financière & modèle de revenus

Bazario est une marketplace de **produits et services digitaux** (agents IA, prompts,
templates, formations, SaaS, art génératif, audio IA, automatisations). Les produits
étant numériques, il n'y a **ni stock, ni logistique, ni frais de port** : les marges
sont structurellement élevées et la livraison est instantanée.

## 1. Sources de revenus

| Source | Description | Tarif cible |
|---|---|---|
| **Commission marketplace** | Prélevée sur chaque vente d'un créateur | 15 à 30 % selon le volume |
| **Abonnement Nexus+** | Abonnement acheteur (avantages + crédits IA) | 9,99 €/mois · 99,90 €/an |
| **Ventes propres** | Produits édités par Bazario (drops, packs maison) | Marge ~95 % |
| **Mise en avant** | Placements sponsorisés, drops vedettes | CPC / forfait |
| **Crédits IA** | Recharges au-delà des crédits inclus | À l'usage |

## 2. Abonnement Nexus+ (récurrent)

Implémenté via **Stripe Subscriptions** (`/api/subscribe`, page `/premium`).

- **Mensuel** : 9,99 €/mois — sans engagement, résiliable en 1 clic.
- **Annuel** : 99,90 €/an — 2 mois offerts (8,33 €/mois équivalent).
- **Essai gratuit** : 30 jours (`trial_period_days: 30`).
- **Avantages** : −20 % catalogue, crédits IA mensuels, accès anticipé aux drops,
  coffre-fort de licences, mises à jour à vie, support prioritaire.

Le revenu récurrent (MRR) est le levier de valorisation principal : il lisse la
trésorerie et augmente la valeur vie client (LTV).

## 3. Paiements

- **Encaissement** : Stripe Checkout (`/api/checkout/cart`), mode `payment`.
  Les prix sont **recalculés côté serveur** depuis le catalogue (jamais le client).
- **Compte marchand** : configuré via `STRIPE_SECRET_KEY` (voir `.env.example`).
  C'est ce compte qui reçoit les fonds.
- **Moyens** : carte, Apple Pay, Google Pay, codes promo activés.
- **Webhook** : `/api/webhooks/stripe` confirme le paiement et déclenche la livraison.

## 4. Indicateurs à suivre (avant d'acheter du trafic)

1. **Taux de conversion** visiteur → acheteur.
2. **Panier moyen** (AOV) et marge par catégorie.
3. **MRR / churn** de Nexus+.
4. **CAC vs LTV** : ne pas dépenser en acquisition tant que LTV/CAC < 3.
5. **Taux de remboursement** (garantie 14 jours) par créateur.

## 5. Cadre légal (produits digitaux, France/UE)

- **Droit de rétractation** : pour un contenu numérique fourni immédiatement, le client
  renonce à la rétractation s'il consent expressément (art. L221-28 Code conso).
  Bazario applique en plus une **garantie commerciale 14 jours** volontaire.
- **TVA** : TVA sur services électroniques due dans le pays de l'acheteur (guichet OSS).
  Activer `automatic_tax` Stripe + Stripe Tax une fois le seuil atteint.
- **Facturation électronique 2026** : prévoir l'émission de factures conformes.
- **Licences** : chaque produit précise sa licence (personnelle / commerciale / agence).
- **CGV, mentions légales, confidentialité, cookies** : pages déjà présentes sous `/legal`.

> Ce document est une note de cadrage interne, pas un conseil juridique ou fiscal.
> Faire valider la conformité TVA/facturation par un expert-comptable avant le lancement.
