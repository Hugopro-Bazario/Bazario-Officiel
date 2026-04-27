# Bazario - Plan d'action 4 semaines

Ce plan reprend l'esprit du kit fourni en l'adaptant au depot actuel : site Vite statique, pages HTML, API serverless Vercel `/api/order`.

## Semaine 1 - Fondations techniques

Objectif : rendre le site indexable, credible et mesurable avant acquisition.

### Lundi - Diagnostic et corrections SSR/HTML

- Verifier que la home, le checkout et les pages de confiance restent lisibles sans JavaScript.
- Controler `robots.txt`, `sitemap.xml`, canonical, title et meta descriptions.
- Noter les resultats externes dans `DIAGNOSTIC_BAZARIO.md`.

Done : toutes les pages critiques ont un HTML utile sans JS.

### Mardi - Performance

- Garder CSS et JS inline limites.
- Eviter toute librairie client non essentielle.
- Auditer Lighthouse mobile et corriger LCP/CLS si besoin.

Done : score mobile cible >= 85 avant lancement trafic.

### Mercredi - SEO technique

- Completer les donnees structurees Organization, WebSite, FAQPage et OfferCatalog.
- Ajouter des pages categorie dediees quand le catalogue reel existe.
- Remplacer les offres test par des produits reels avec Product/Offer.

Done : rich results sans erreur bloquante.

### Jeudi - Architecture catalogue

- Choisir la source produit prioritaire.
- Definir le schema minimal produit : nom, slug, prix, images, stock, categorie, fournisseur, delai.
- Choisir entre maintien Vite + API ou migration Next.js/Supabase selon le besoin SSR produit.

Done : contrat de donnees catalogue documente.

### Vendredi - Securite

- Garder les secrets uniquement cote serveur.
- Verifier les headers dans `vercel.json`.
- Auditer les variables exposees `NEXT_PUBLIC_*` avant migration eventuelle.

Done : securityheaders.com cible A/A+ hors contraintes Vercel.

## Semaine 2 - Catalogue et parcours d'achat

Objectif : rendre un parcours d'achat de bout en bout testable avec produits reels.

- Creer ou importer au moins 20 produits qualifies.
- Creer une page detail produit avec description unique, delai, retours, CTA, avis et schema Product.
- Creer des pages categorie SEO-friendly.
- Remplacer la simulation checkout par Stripe Checkout.
- Ajouter confirmation commande persistante.

Done : un client peut voir un produit reel, payer, recevoir un email et obtenir un recapitulatif.

## Semaine 3 - Conversion et automation

Objectif : mesurer et ameliorer la conversion.

- Brancher analytics consent-aware : Vercel Analytics, GA4 ou PostHog.
- Creer newsletter et email de bienvenue Brevo.
- Ajouter sequence confirmation commande et expedition.
- Enrichir FAQ, retours et livraison avec les conditions definitives.
- Ajouter signaux de confiance reels : avis verifies, photos, contact, delais.

Done : funnel mesure de `view_item` a `purchase`, emails critiques envoyes.

## Semaine 4 - Trafic et lancement

Objectif : envoyer du trafic seulement quand le parcours est fiable.

- Soumettre sitemap a Google Search Console et Bing Webmaster.
- Preparer feed Google Merchant Center.
- Installer Meta Pixel/CAPI si campagnes Meta prevues.
- Produire 3 contenus blog ou guides d'achat.
- Lancer tests publicitaires avec budget limite uniquement apres verification preview.

Done : indexation soumise, tracking actif, catalogue et checkout validates.

## Risques principaux

- Le depot n'est pas encore une app Next.js/Supabase comme le kit le suppose.
- Pas de base de donnees produit versionnee dans le repo.
- Le checkout est encore une simulation sans paiement.
- Les avis pilotes doivent etre remplaces par des avis clients reels des que possible.
