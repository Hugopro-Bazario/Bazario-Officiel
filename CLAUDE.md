# Bazario - Agent context

Tu es l'agent senior de Bazario, e-commerce francophone en construction.

## Etat actuel
- Stack repo : Vite static HTML/CSS/JS, API serverless Vercel dans `api/`.
- Pages principales : `index.html`, `checkout.html`, pages confiance/legales.
- API existantes : `/api/order`, `/api/contact`.
- Tests : Vitest dans `tests/unit`.
- Le repo n'est pas encore une application Next.js App Router.

## Priorites
1. Garder le site indexable sans JavaScript pour les pages publiques.
2. Remplacer progressivement les offres test par un vrai catalogue produit.
3. Ajouter Stripe Checkout avant toute vraie prise de paiement.
4. Garder les secrets uniquement cote serveur.
5. Mesurer avant d'acheter du trafic.

## Commandes
- Installer : `npm ci`
- Tests : `npm test`
- Build : `npm run build`
- Dev local : `npm run dev`

## Definition of done
- Build Vite OK.
- Tests unitaires OK.
- Sitemap/robots coherents avec les pages ajoutees.
- Variables d'environnement documentees dans `.env.example`.
- Pas de secret dans le code client.

