// supabase-client.js — Agency A
// Initialise le client Supabase global à partir de supabase/config.js
// Ce fichier doit être chargé APRÈS le CDN Supabase et APRÈS supabase/config.js

(function () {
  if (!window.supabase) {
    console.error('[Agency A] Supabase CDN non chargé. Ajoutez le script CDN avant supabase-client.js');
    return;
  }
  if (!window.AGENCY_A_SUPABASE_CONFIG) {
    console.error('[Agency A] supabase/config.js non chargé.');
    return;
  }

  const { createClient } = window.supabase;
  const { url, anonKey } = window.AGENCY_A_SUPABASE_CONFIG;

  window.sb = createClient(url, anonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      storageKey: 'agency-a-auth'
    }
  });
})();
