// auth.js — Agency A
// Gestion de l'authentification, sessions, rôles et redirections

const Auth = {

  // ──────────────────────────────────────────────
  // Protège une page : redirige vers login si non connecté
  // opts.adminOnly = true → redirige aussi si pas admin
  // Retourne { session, profile } ou null
  // ──────────────────────────────────────────────
  async protect(opts = {}) {
    const { data: { session }, error } = await window.sb.auth.getSession();

    if (!session) {
      window.location.href = 'espace-client.html';
      return null;
    }

    const profile = await Auth.getProfile(session.user.id);

    if (opts.adminOnly && profile?.role !== 'admin') {
      window.location.href = 'dashboard-client.html';
      return null;
    }

    return { session, profile };
  },

  // ──────────────────────────────────────────────
  // Sur la page login : redirige si déjà connecté
  // ──────────────────────────────────────────────
  async redirectIfLoggedIn() {
    const { data: { session } } = await window.sb.auth.getSession();
    if (!session) return;

    const profile = await Auth.getProfile(session.user.id);
    if (profile?.role === 'admin') {
      window.location.href = 'admin.html';
    } else {
      window.location.href = 'dashboard-client.html';
    }
  },

  // ──────────────────────────────────────────────
  // Connexion email + mot de passe
  // ──────────────────────────────────────────────
  async login(email, password) {
    const { data, error } = await window.sb.auth.signInWithPassword({ email, password });
    if (error) throw error;

    const profile = await Auth.getProfile(data.user.id);
    if (profile?.role === 'admin') {
      window.location.href = 'admin.html';
    } else {
      window.location.href = 'dashboard-client.html';
    }
    return data;
  },

  // ──────────────────────────────────────────────
  // Déconnexion
  // ──────────────────────────────────────────────
  async logout() {
    await window.sb.auth.signOut();
    window.location.href = 'espace-client.html';
  },

  // ──────────────────────────────────────────────
  // Récupère le profil depuis la table profiles
  // ──────────────────────────────────────────────
  async getProfile(userId) {
    const { data, error } = await window.sb.from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) return null;
    return data;
  },

  // ──────────────────────────────────────────────
  // Récupère la session + profil courant
  // ──────────────────────────────────────────────
  async current() {
    const { data: { session } } = await window.sb.auth.getSession();
    if (!session) return { session: null, profile: null };
    const profile = await Auth.getProfile(session.user.id);
    return { session, profile };
  }
};
