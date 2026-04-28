## Prochaines etapes MVP Bazario

1. Regenerer les secrets exposes pendant la session
   - Supabase: `SUPABASE_SERVICE_ROLE_KEY` (et `SUPABASE_SECRET_KEY` si rotation complete)
   - Stripe: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
   - Brevo: `BREVO_API_KEY`
   - Mettre a jour ensuite Vercel et `/.env.local`

2. Valider la sauvegarde hebdomadaire GitHub
   - Ajouter le secret repository `BACKUP_DATABASE_URL`
   - Lancer manuellement le workflow `Weekly DB Backup`
   - Verifier la release `backup-*` avec `db-backup-*.sql.gz` et son checksum `.sha256`

3. Verifier le run local et deploiement
   - Lancer `npm test`, `npm run build`, `npm run dev`
   - Faire un smoke test: accueil, checkout Stripe, webhook, ecriture Supabase, email Brevo
   - Commit/push final setup si tout est vert
