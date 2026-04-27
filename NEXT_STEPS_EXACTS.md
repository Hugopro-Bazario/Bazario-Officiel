# Bazario - quoi faire exactement maintenant

Ce fichier liste les actions à faire hors code, dans l'ordre. Le dépôt contient déjà les fondations statiques, les pages de confiance, le sitemap, le robots.txt, les headers sécurité et les documents de pilotage.

## 1. Vérifier le déploiement Vercel

1. Ouvre le projet Bazario dans Vercel.
2. Vérifie que la branche de preview du PR se déploie sans erreur.
3. Ouvre l'URL de preview.
4. Teste ces pages :
   - `/`
   - `/checkout.html`
   - `/contact.html`
   - `/faq.html`
   - `/robots.txt`
   - `/sitemap.xml`
5. Si tout est OK, merge le PR dans `main`.

## 2. Configurer les variables d'environnement Vercel

Dans Vercel > Project Settings > Environment Variables, ajoute ou vérifie :

```txt
APP_URL=https://www.bazario-official.com
BREVO_API_KEY=ta_cle_brevo
BREVO_SENDER_EMAIL=support@bazario-official.com
BREVO_SENDER_NAME=Bazario
CJ_API_KEY=ta_cle_cj
CJ_API_SECRET=ton_secret_cj
CJ_API_BASE_URL=https://developers.cjdropshipping.com/api2.0/v1
```

Puis redéploie le site.

## 3. Tester les formulaires

1. Va sur `/contact.html`.
2. Envoie un message test.
3. Résultat attendu :
   - si Brevo est configuré : message de succès et email reçu sur `BREVO_SENDER_EMAIL`.
   - si Brevo n'est pas configuré : message indiquant que Brevo doit être configuré.
4. Va sur `/checkout.html`.
5. Crée une commande test avec chaque offre :
   - Starter
   - Growth
   - Premium
6. Vérifie que l'API retourne une référence `BZ-...`.

## 4. Brancher les outils Google

1. Google Search Console :
   - ajoute la propriété `https://www.bazario-official.com`.
   - vérifie le domaine.
   - soumets `https://www.bazario-official.com/sitemap.xml`.
2. Google Rich Results :
   - teste la home.
   - teste `/checkout.html`.
   - corrige uniquement les erreurs bloquantes.
3. PageSpeed :
   - teste la home mobile.
   - note les scores dans `DIAGNOSTIC_BAZARIO.md`.

## 5. Configurer Brevo proprement

1. Dans Brevo, vérifie le domaine d'envoi `bazario-official.com`.
2. Configure SPF, DKIM et DMARC chez le registrar/DNS.
3. Crée ces listes :
   - Prospects newsletter
   - Clients
   - Support
4. Crée ces templates :
   - confirmation contact
   - confirmation commande
   - panier abandonné
   - demande d'avis
5. Note les IDs de templates dans un futur fichier `.env.example` si tu les utilises.

## 6. Remplacer les offres test par un vrai catalogue

Décision à prendre avant de coder :

1. Choisir le fournisseur principal :
   - CJDropshipping
   - AutoDS
   - Spocket
   - AliExpress
   - autre
2. Définir les champs produit minimaux :
   - nom
   - slug
   - description courte
   - description longue
   - prix
   - prix barré
   - stock
   - images
   - catégorie
   - délai de livraison
   - fournisseur
   - SKU
3. Créer ensuite une vraie page produit et une vraie page catégorie.

## 7. Prochaine tâche code recommandée

Demande à l'agent :

```txt
Crée un catalogue statique temporaire Bazario dans src/data/products.js, une page categorie.html, une page product.html lisible sans JavaScript, et ajoute les données structurées Product/Offer/BreadcrumbList pour chaque produit test.
```

Objectif : remplacer les offres génériques Starter/Growth/Premium par de vrais produits démonstrateurs avant d'envoyer du trafic.

## 8. À ne pas faire tout de suite

- Ne lance pas de publicité tant que le catalogue réel n'est pas prêt.
- Ne promets pas une livraison rapide si le fournisseur n'est pas validé.
- Ne mets pas de faux avis clients en production ; garde les avis pilotes comme placeholders internes ou remplace-les par des preuves réelles.
- Ne migre pas vers Next.js/Supabase sans décider du modèle catalogue et checkout.
