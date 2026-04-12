AGENCY A — SETUP SUPABASE

1. Remplacez les placeholders dans supabase/config.js :
   - YOUR_SUPABASE_URL
   - YOUR_SUPABASE_ANON_KEY

2. Exécutez supabase/schema.sql dans l'éditeur SQL de Supabase.

3. Déployez la fonction Edge :
   supabase functions deploy send-quote-notification

4. Ajoutez le secret Resend :
   supabase secrets set RESEND_API_KEY=your_resend_api_key

5. Vérifiez que anais@agency-a.fr est bien la destinataire dans la fonction.

6. index.html envoie les devis vers la table quotes.
   admin.html lit la table quotes et affiche les statistiques.

Note : pour une sécurité renforcée, ajoutez ensuite une authentification admin.
