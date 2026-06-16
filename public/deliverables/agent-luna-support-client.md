# Agent IA Luna — support client multilingue instantané

> Luna répond à 80 % de vos tickets en moins de 3 secondes, dans 28 langues. Elle s'entraîne sur votre FAQ, vos CGV et votre historique, escalade les cas sensibles et envoie un rapport hebdomadaire. Compatible site web, WhatsApp, Instagram et email.

**Créateur :** NeuraForge
**Catégorie :** Agents IA › Support › Chatbots
**Licence(s) :** Starter, Business
**Livraison :** numérique, mises à jour à vie incluses · Garantie 14 jours

---
## 🚀 Démarrage rapide (10 minutes)

1. **Connexion des sources** — reliez votre CRM, votre boîte mail et votre calendrier.
2. **Entraînement** — importez vos offres, votre FAQ et 3 exemples d'échanges réussis.
3. **Mode copilote** — l'agent propose, vous validez pendant 48 h.
4. **Autonomie** — activez le mode autonome en un clic une fois la confiance établie.

## ⚙️ Configuration recommandée (à copier/coller)

```json
{
  "agent": "NeuraForge",
  "langue": "fr",
  "ton": "professionnel, direct, chaleureux",
  "garde_fous": {
    "escalade_humaine": true,
    "ne_jamais_promettre": ["remise non validée", "délai non garanti"],
    "heures_actives": "24/7"
  },
  "objectif": "qualifier, répondre et relancer sans intervention"
}
```

## 🧠 Prompt système de départ

```
Tu es l'assistant de [VOTRE MARQUE]. Objectif : Support avec
précision et concision. Pose une question de clarification si l'information manque.
Escalade à un humain dès qu'un cas sort de ton périmètre. Ne promets jamais ce qui
n'est pas explicitement autorisé.
```

## ✅ Checklist de mise en production
- [ ] Sources connectées et testées
- [ ] Garde-fous configurés
- [ ] 5 conversations de test validées
- [ ] Tableau de bord de suivi activé

---

## Support & licence
- Conforme à la licence achetée (personnelle, commerciale ou agence).
- Revente / redistribution interdites hors des droits accordés.
- Support augmenté par IA 24/7 : support@bazario.com

© Bazario — le marché du futur.
