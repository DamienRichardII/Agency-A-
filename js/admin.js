// admin.js — Agency A
// Back-office administration : clients, projets, images, documents, messages, accès

const BACKEND = 'https://web-production-b0b3e.up.railway.app';

// ── Overlay de connexion admin ──────────────────────────────────────────────
function showAdminLogin() {
  const overlay = document.getElementById('adminLoginOverlay');
  if (overlay) overlay.style.display = 'flex';
}

function hideAdminLogin() {
  const overlay = document.getElementById('adminLoginOverlay');
  if (overlay) overlay.style.display = 'none';
}

window.adminLogin = async function () {
  const email    = document.getElementById('adminLoginEmail').value.trim();
  const password = document.getElementById('adminLoginPassword').value;
  const errEl    = document.getElementById('adminLoginError');
  const btn      = document.getElementById('adminLoginBtn');

  errEl.style.display = 'none';
  btn.textContent = 'Connexion…';
  btn.disabled = true;

  try {
    const { data, error } = await window.sb.auth.signInWithPassword({ email, password });
    if (error) throw error;

    const { data: profileData } = await window.sb.from('profiles').select('role').eq('id', data.user.id).single();
    if (profileData?.role !== 'admin') {
      await window.sb.auth.signOut();
      throw new Error('Accès réservé aux administrateurs.');
    }

    hideAdminLogin();
    location.reload(); // Recharge la page avec la session active
  } catch (err) {
    errEl.textContent = err.message || 'Email ou mot de passe incorrect.';
    errEl.style.display = 'block';
    btn.textContent = 'Accéder à l\'administration';
    btn.disabled = false;
  }
};

// ── Carte d'erreur fatale ──
function showFatalError(reason) {
  const el = document.getElementById('adminLoading');
  if (!el) return;
  el.innerHTML = `
    <div style="max-width:480px;margin:0 auto;padding:40px 32px;background:#fff;border:1px solid rgba(17,17,17,.08);border-radius:8px;text-align:left">
      <p style="font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#786d63;margin:0 0 12px">Administration</p>
      <h2 style="font-family:Georgia,serif;font-size:22px;font-weight:400;color:#111;margin:0 0 12px">Impossible de charger l'administration</h2>
      <p style="font-size:14px;color:#39332e;line-height:1.6;margin:0 0 24px">${reason || 'Une erreur inattendue s\'est produite.'}</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap">
        <button onclick="location.reload()" style="padding:10px 20px;background:#111;color:#f8f2ea;border:none;font-size:11px;letter-spacing:.1em;text-transform:uppercase;cursor:pointer">Réessayer</button>
        <a href="espace-client.html" style="padding:10px 20px;border:1px solid rgba(17,17,17,.25);color:#111;font-size:11px;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;display:inline-flex;align-items:center">Retour à la connexion</a>
      </div>
    </div>`;
}

(async function () {
  console.log('[ADMIN] Initialisation');

  // ── Guard window.sb ──
  if (!window.sb) {
    console.error('[ADMIN] window.sb non disponible — supabase/config.js absent ou mal chargé');
    showFatalError('Client Supabase non initialisé. Vérifiez que <code>supabase/config.js</code> est bien présent.');
    return;
  }

  // ── Protection admin (overlay intégré, sans redirection) ──
  let ctx;
  try {
    const { data: { session }, error: sessErr } = await window.sb.auth.getSession();
    if (sessErr) throw sessErr;

    if (!session) {
      showAdminLogin();
      return;
    }

    const profile = await Auth.getProfile(session.user.id);
    if (profile?.role !== 'admin') {
      await window.sb.auth.signOut();
      showAdminLogin();
      const errEl = document.getElementById('adminLoginError');
      if (errEl) { errEl.textContent = 'Accès réservé aux administrateurs.'; errEl.style.display = 'block'; }
      return;
    }

    ctx = { session, profile };
  } catch (err) {
    console.error('[ADMIN] Erreur auth :', err);
    showFatalError('Erreur d\'authentification : ' + (err.message || err));
    return;
  }

  console.log('[ADMIN] Session récupérée');
  console.log('[ADMIN] Profil récupéré :', ctx.profile?.role);

  const { profile: adminProfile } = ctx;
  const adminId = adminProfile.id;

  // ── Init ──
  document.getElementById('adminLoading').style.display = 'none';
  document.getElementById('adminContent').style.display = 'block';
  document.getElementById('adminName').textContent =
    (adminProfile.first_name || '') + ' ' + (adminProfile.last_name || '') + ' · Admin';
  document.getElementById('adminLogout').addEventListener('click', () => Auth.logout());

  // ── Navigation panels ──
  const allLinks  = document.querySelectorAll('[data-panel]');
  const allPanels = document.querySelectorAll('.admin-panel');

  function showPanel(id) {
    allPanels.forEach(p => p.classList.remove('active'));
    allLinks.forEach(a => a.classList.remove('active'));
    const p = document.getElementById('panel-' + id);
    if (p) p.classList.add('active');
    allLinks.forEach(a => { if (a.dataset.panel === id) a.classList.add('active'); });
  }

  allLinks.forEach(l => {
    l.addEventListener('click', e => {
      e.preventDefault();
      showPanel(l.dataset.panel);
    });
  });

  // ── Modals ──
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.dataset.close));
  });
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', e => { if (e.target === m) closeModal(m.id); });
  });

  function openModal(id)  { document.getElementById(id)?.classList.add('open'); }
  function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }

  // ── Utilitaires ──
  function esc(s) {
    return String(s || '')
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;');
  }
  function fmtDate(d) {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  function statusBadge(status) {
    const labels = { en_cours:'En cours', en_retouche:'En retouche', livraison:'Livraison', termine:'Terminé', archive:'Archivé' };
    return '<span class="s-badge s-' + status + '">' + (labels[status] || status) + '</span>';
  }
  function feedback(elId, msg, isOk) {
    const el = document.getElementById(elId);
    if (!el) return;
    el.textContent = msg;
    el.className = 'inline-feedback ' + (isOk ? 'ok' : 'err');
    if (isOk) setTimeout(() => { el.textContent = ''; }, 4000);
  }

  // ── Appels API backend admin (avec JWT Supabase) ──
  async function callAdminAPI(endpoint, body) {
    const { data: { session } } = await window.sb.auth.getSession();
    const token = session?.access_token;
    if (!token) throw new Error('Session expirée. Reconnectez-vous.');
    const resp = await fetch(BACKEND + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify(body),
    });
    const json = await resp.json();
    if (!resp.ok || json.error) throw new Error(json.error || 'Erreur serveur.');
    return json;
  }

  // ── Badge statut compte client ──
  function accountStatusBadge(c) {
    if (c.last_sign_in_at) {
      return '<span style="display:inline-block;padding:3px 10px;font-size:10px;letter-spacing:.08em;text-transform:uppercase;border-radius:20px;background:rgba(76,175,134,.12);color:#2a7a5a;border:1px solid rgba(76,175,134,.3)">Actif</span>';
    }
    if (c.invitation_sent_at) {
      return '<span style="display:inline-block;padding:3px 10px;font-size:10px;letter-spacing:.08em;text-transform:uppercase;border-radius:20px;background:rgba(212,184,155,.25);color:#6a4e3b;border:1px solid rgba(212,184,155,.5)">Invitation envoyée</span>';
    }
    return '<span style="display:inline-block;padding:3px 10px;font-size:10px;letter-spacing:.08em;text-transform:uppercase;border-radius:20px;background:rgba(17,17,17,.06);color:#786d63;border:1px solid rgba(17,17,17,.1)">Non invité</span>';
  }

  // ── Shared state ──
  let allClients  = [];
  let allProjects = [];
  let currentProjectId = null;

  // ════════════════════════════════════════
  // VUE D'ENSEMBLE
  // ════════════════════════════════════════
  async function loadOverview() {
    const [
      { count: nClients },
      { count: nProjects },
      { count: nImages },
      { count: nMessages }
    ] = await Promise.all([
      window.sb.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'client'),
      window.sb.from('projects').select('id', { count: 'exact', head: true }).neq('status', 'archive'),
      window.sb.from('project_images').select('id', { count: 'exact', head: true }),
      window.sb.from('project_messages').select('id', { count: 'exact', head: true }).is('read_at', null)
    ]);
    document.getElementById('countClients').textContent  = nClients  ?? '—';
    document.getElementById('countProjects').textContent = nProjects ?? '—';
    document.getElementById('countImages').textContent   = nImages   ?? '—';
    document.getElementById('countMessages').textContent = nMessages ?? '—';

    // Activité récente — 5 derniers messages
    const { data: recent } = await window.sb
      .from('project_messages')
      .select('*, profiles(first_name, last_name), projects(title)')
      .order('created_at', { ascending: false })
      .limit(5);

    const actDiv = document.getElementById('recentActivity');
    if (!recent?.length) { actDiv.innerHTML = '<div class="empty-state">Aucune activité.</div>'; return; }
    actDiv.innerHTML = recent.map(m => {
      const who = m.profiles?.first_name ? m.profiles.first_name + ' ' + (m.profiles.last_name || '') : 'Client';
      const proj = m.projects?.title || 'Projet';
      return `<div style="padding:10px 0;border-bottom:1px solid rgba(212,184,155,.12);display:flex;gap:12px;align-items:start">
        <div style="flex:1">
          <strong style="font-size:13px">${esc(who)}</strong>
          <span style="font-size:12px;color:var(--muted)"> · ${esc(proj)}</span>
          <p style="font-size:13px;color:var(--ink-soft);margin:3px 0 0">${esc(m.content.substring(0, 120))}${m.content.length > 120 ? '…' : ''}</p>
        </div>
        <span style="font-size:11px;color:var(--muted);white-space:nowrap">${fmtDate(m.created_at)}</span>
      </div>`;
    }).join('');
  }

  // ════════════════════════════════════════
  // CLIENTS
  // ════════════════════════════════════════
  async function loadClients() {
    const { data: clients } = await window.sb
      .from('profiles')
      .select('*')
      .eq('role', 'client')
      .order('created_at', { ascending: false });

    allClients = clients || [];

    // Compter les projets par client
    const { data: projCounts } = await window.sb
      .from('projects')
      .select('client_id');
    const pMap = {};
    (projCounts || []).forEach(p => { pMap[p.client_id] = (pMap[p.client_id] || 0) + 1; });

    const tbody = document.getElementById('clientsTableBody');
    if (!allClients.length) {
      tbody.innerHTML = '<tr><td colspan="6" class="empty-state">Aucun client.</td></tr>';
      return;
    }

    tbody.innerHTML = allClients.map(c => {
      const name     = [c.first_name, c.last_name].filter(Boolean).join(' ') || '—';
      const emailSafe = esc(c.email || '');
      const firstSafe = esc(c.first_name || '');
      const idSafe   = esc(c.id);

      // Bouton d'action selon le statut du compte
      let inviteBtn;
      if (!c.invitation_sent_at) {
        inviteBtn = `<button class="action-btn" onclick="sendClientInvite('${idSafe}','${emailSafe}','${firstSafe}')">Envoyer invitation</button>`;
      } else if (!c.last_sign_in_at) {
        inviteBtn = `<button class="action-btn" onclick="resendClientInvite('${emailSafe}','${firstSafe}')">Renvoyer invitation</button>`;
      } else {
        inviteBtn = `<button class="action-btn" onclick="resetClientPassword('${emailSafe}','${firstSafe}')">Réinitialiser MDP</button>`;
      }

      return `<tr>
        <td><strong>${esc(name)}</strong></td>
        <td>${esc(c.email || '—')}</td>
        <td>${pMap[c.id] || 0}</td>
        <td>${accountStatusBadge(c)}</td>
        <td>${fmtDate(c.created_at)}</td>
        <td style="display:flex;gap:6px;flex-wrap:wrap">
          ${inviteBtn}
          <button class="action-btn" onclick="viewClientProjects('${idSafe}','${esc(name)}')">Voir projets →</button>
        </td>
      </tr>`;
    }).join('');
  }

  window.viewClientProjects = function(clientId, name) {
    // Filtrer les projets par client et switcher sur l'onglet projets
    showPanel('projects');
    document.getElementById('projectsTitle').textContent = 'Projets — ' + name;
    renderProjectsTable(allProjects.filter(p => p.client_id === clientId));
  };

  // Nouveau client — invitation via backend (service role)
  document.getElementById('newClientBtn')?.addEventListener('click', () => openModal('modalNewClient'));
  document.getElementById('newClientForm')?.addEventListener('submit', async e => {
    e.preventDefault();
    const email      = document.getElementById('nc_email').value.trim();
    const first_name = document.getElementById('nc_first_name').value.trim();
    const last_name  = document.getElementById('nc_last_name').value.trim();
    const phone      = document.getElementById('nc_phone').value.trim();
    const company    = document.getElementById('nc_company').value.trim();
    if (!email) return;

    const btn = e.target.querySelector('button[type="submit"]');
    if (btn) btn.disabled = true;

    try {
      await callAdminAPI('/api/admin/invite-client', { email, first_name, last_name, phone, company });

      feedback('newClientFeedback',
        'Invitation envoyée à ' + email + '. Le client définira son mot de passe via le lien reçu.', true);
      document.getElementById('newClientForm').reset();
      setTimeout(() => { closeModal('modalNewClient'); loadClients(); }, 3000);
    } catch (err) {
      feedback('newClientFeedback', 'Erreur : ' + (err.message || 'Impossible d\'envoyer l\'invitation.'), false);
    } finally {
      if (btn) btn.disabled = false;
    }
  });

  // ── Envoyer invitation (client sans invitation_sent_at) ──
  window.sendClientInvite = async function(clientId, email, firstName) {
    if (!confirm('Envoyer une invitation à ' + email + ' ?')) return;
    try {
      await callAdminAPI('/api/admin/invite-client', { email, first_name: firstName });
      alert('Invitation envoyée à ' + email);
      loadClients();
    } catch (err) {
      alert('Erreur : ' + err.message);
    }
  };

  // ── Renvoyer invitation (client invité mais pas activé) ──
  window.resendClientInvite = async function(email, firstName) {
    if (!confirm('Renvoyer l\'invitation à ' + email + ' ?')) return;
    try {
      await callAdminAPI('/api/admin/resend-invite', { email, first_name: firstName });
      alert('Invitation renvoyée à ' + email);
      loadClients();
    } catch (err) {
      alert('Erreur : ' + err.message);
    }
  };

  // ── Réinitialiser mot de passe (client actif) ──
  window.resetClientPassword = async function(email, firstName) {
    if (!confirm('Envoyer un lien de réinitialisation de mot de passe à ' + email + ' ?')) return;
    try {
      await callAdminAPI('/api/admin/reset-password', { email, first_name: firstName });
      alert('Email de réinitialisation envoyé à ' + email);
    } catch (err) {
      alert('Erreur : ' + err.message);
    }
  };

  // ════════════════════════════════════════
  // PROJETS
  // ════════════════════════════════════════
  async function loadProjects() {
    const { data: projects } = await window.sb
      .from('projects')
      .select('*, profiles(first_name, last_name, email)')
      .order('created_at', { ascending: false });

    allProjects = projects || [];
    renderProjectsTable(allProjects);
  }

  function renderProjectsTable(projects) {
    const tbody = document.getElementById('projectsTableBody');
    if (!projects.length) {
      tbody.innerHTML = '<tr><td colspan="5" class="empty-state">Aucun projet.</td></tr>';
      return;
    }
    tbody.innerHTML = projects.map(p => {
      const clientName = p.profiles
        ? [p.profiles.first_name, p.profiles.last_name].filter(Boolean).join(' ') || p.profiles.email
        : '—';
      return `<tr>
        <td><strong>${esc(p.title)}</strong></td>
        <td>${esc(clientName)}</td>
        <td>${statusBadge(p.status)}</td>
        <td>${fmtDate(p.session_date)}</td>
        <td>
          <button class="action-btn" onclick="openProjectDetail('${p.id}')">Gérer →</button>
        </td>
      </tr>`;
    }).join('');
  }

  // Nouveau projet
  document.getElementById('newProjectBtn')?.addEventListener('click', () => {
    // Peupler la liste clients
    const sel = document.getElementById('np_client');
    sel.innerHTML = '<option value="">Sélectionner un client…</option>' +
      allClients.map(c =>
        `<option value="${c.id}">${esc([c.first_name, c.last_name].filter(Boolean).join(' ') || c.email)}</option>`
      ).join('');
    openModal('modalNewProject');
  });

  document.getElementById('newProjectForm')?.addEventListener('submit', async e => {
    e.preventDefault();
    const clientId = document.getElementById('np_client').value;
    const title    = document.getElementById('np_title').value.trim();
    if (!clientId || !title) { feedback('newProjectFeedback', 'Client et titre requis.', false); return; }

    try {
      const { data: proj, error } = await window.sb.from('projects').insert({
        client_id:        clientId,
        title,
        status:           document.getElementById('np_status').value,
        session_type:     document.getElementById('np_type').value.trim() || null,
        session_date:     document.getElementById('np_date').value || null,
        session_location: document.getElementById('np_location').value.trim() || null,
        notes:            document.getElementById('np_notes').value.trim() || null
      }).select().single();
      if (error) throw error;

      feedback('newProjectFeedback', 'Projet créé avec succès.', true);
      document.getElementById('newProjectForm').reset();
      setTimeout(() => { closeModal('modalNewProject'); loadProjects(); }, 1500);
    } catch (err) {
      feedback('newProjectFeedback', 'Erreur : ' + (err.message || 'Échec création projet.'), false);
    }
  });

  // ════════════════════════════════════════
  // DÉTAIL PROJET
  // ════════════════════════════════════════
  window.openProjectDetail = async function(projectId) {
    currentProjectId = projectId;
    const project = allProjects.find(p => p.id === projectId);
    if (!project) return;

    // Afficher la vue détail
    document.getElementById('projectsListView').style.display  = 'none';
    document.getElementById('projectDetailView').style.display = 'block';

    const clientName = project.profiles
      ? [project.profiles.first_name, project.profiles.last_name].filter(Boolean).join(' ') || project.profiles.email
      : '—';
    document.getElementById('detailClient').textContent = clientName;
    document.getElementById('detailTitle').textContent  = project.title;
    document.getElementById('detailStatus').outerHTML   = statusBadge(project.status);

    // Activer tab images par défaut
    activateProjTab('images');

    // Charger données
    await Promise.all([
      loadProjectImages(projectId),
      loadProjectDocuments(projectId),
      loadProjectMessages(projectId, adminId),
      loadProjectAccess(projectId, project.client_id)
    ]);
  };

  document.getElementById('backToProjectsBtn')?.addEventListener('click', () => {
    document.getElementById('projectsListView').style.display  = 'block';
    document.getElementById('projectDetailView').style.display = 'none';
    document.getElementById('projectsTitle').textContent = 'Projets';
    renderProjectsTable(allProjects);
    currentProjectId = null;
  });

  // Tabs projet
  document.querySelectorAll('.proj-tabs button').forEach(btn => {
    btn.addEventListener('click', () => activateProjTab(btn.dataset.tab));
  });

  function activateProjTab(tab) {
    document.querySelectorAll('.proj-tabs button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.proj-tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelector('.proj-tabs button[data-tab="' + tab + '"]')?.classList.add('active');
    document.getElementById('tab-' + tab)?.classList.add('active');
  }

  // Modifier projet
  document.getElementById('editProjectBtn')?.addEventListener('click', () => {
    const p = allProjects.find(x => x.id === currentProjectId);
    if (!p) return;
    document.getElementById('ep_id').value       = p.id;
    document.getElementById('ep_title').value    = p.title;
    document.getElementById('ep_type').value     = p.session_type || '';
    document.getElementById('ep_date').value     = p.session_date || '';
    document.getElementById('ep_location').value = p.session_location || '';
    document.getElementById('ep_status').value   = p.status;
    document.getElementById('ep_notes').value    = p.notes || '';
    openModal('modalEditProject');
  });

  document.getElementById('editProjectForm')?.addEventListener('submit', async e => {
    e.preventDefault();
    const id = document.getElementById('ep_id').value;
    try {
      const { error } = await window.sb.from('projects').update({
        title:            document.getElementById('ep_title').value.trim(),
        status:           document.getElementById('ep_status').value,
        session_type:     document.getElementById('ep_type').value.trim() || null,
        session_date:     document.getElementById('ep_date').value || null,
        session_location: document.getElementById('ep_location').value.trim() || null,
        notes:            document.getElementById('ep_notes').value.trim() || null
      }).eq('id', id);
      if (error) throw error;

      feedback('editProjectFeedback', 'Projet mis à jour.', true);
      await loadProjects();
      setTimeout(() => {
        closeModal('modalEditProject');
        openProjectDetail(id);
      }, 1000);
    } catch (err) {
      feedback('editProjectFeedback', 'Erreur : ' + err.message, false);
    }
  });

  // ════════════════════════════════════════
  // IMAGES
  // ════════════════════════════════════════
  async function loadProjectImages(projectId) {
    const { data: imgs } = await window.sb
      .from('project_images')
      .select('*')
      .eq('project_id', projectId)
      .order('sort_order');

    // Compter les sélections
    const { data: sels } = await window.sb
      .from('image_selections')
      .select('image_id')
      .eq('project_id', projectId);
    const selSet = new Set((sels || []).map(s => s.image_id));

    const grid = document.getElementById('projectImagesGrid');
    if (!imgs?.length) {
      grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1">Aucune image importée.</div>';
      return;
    }

    grid.innerHTML = imgs.map(img => {
      const url = window.sb.storage.from('client-images').getPublicUrl(img.storage_path).data.publicUrl;
      const sel = selSet.has(img.id);
      return `<div class="img-thumb">
        <img src="${url}" alt="${esc(img.filename)}" loading="lazy">
        ${sel ? '<div class="img-sel-badge">Sélectionnée</div>' : ''}
        <button title="Supprimer" onclick="deleteImage('${img.id}','${esc(img.storage_path)}')">×</button>
      </div>`;
    }).join('');
  }

  window.deleteImage = async function(imageId, storagePath) {
    if (!confirm('Supprimer cette image ?')) return;
    try {
      await window.sb.storage.from('client-images').remove([storagePath]);
      await window.sb.from('project_images').delete().eq('id', imageId);
      await loadProjectImages(currentProjectId);
    } catch (err) {
      alert('Erreur suppression : ' + err.message);
    }
  };

  // Upload images
  document.getElementById('uploadImgInput')?.addEventListener('change', async e => {
    const files = Array.from(e.target.files);
    if (!files.length || !currentProjectId) return;

    const progress = document.getElementById('uploadProgress');
    progress.style.display = 'block';

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      progress.textContent = `Upload ${i + 1}/${files.length} — ${file.name}…`;

      const ext  = file.name.split('.').pop();
      const path = currentProjectId + '/' + Date.now() + '-' + Math.random().toString(36).slice(2) + '.' + ext;

      try {
        const { error: upErr } = await window.sb.storage.from('client-images').upload(path, file);
        if (upErr) throw upErr;

        await window.sb.from('project_images').insert({
          project_id:   currentProjectId,
          storage_path: path,
          filename:     file.name,
          size_bytes:   file.size,
          sort_order:   i
        });
      } catch (err) {
        console.error('Upload error:', err);
        progress.textContent = 'Erreur upload ' + file.name + ' : ' + err.message;
      }
    }

    progress.textContent = files.length + ' image(s) importée(s) avec succès.';
    document.getElementById('uploadImgInput').value = '';
    setTimeout(() => { progress.style.display = 'none'; }, 3000);
    await loadProjectImages(currentProjectId);
  });

  // Drag & drop
  const uploadLabel = document.getElementById('uploadImgLabel');
  if (uploadLabel) {
    uploadLabel.addEventListener('dragover', e => { e.preventDefault(); uploadLabel.style.borderColor = 'var(--sand)'; });
    uploadLabel.addEventListener('dragleave', () => { uploadLabel.style.borderColor = ''; });
    uploadLabel.addEventListener('drop', e => {
      e.preventDefault();
      uploadLabel.style.borderColor = '';
      const dt = e.dataTransfer;
      if (dt?.files?.length) {
        document.getElementById('uploadImgInput').files = dt.files;
        document.getElementById('uploadImgInput').dispatchEvent(new Event('change'));
      }
    });
  }

  // ════════════════════════════════════════
  // DOCUMENTS
  // ════════════════════════════════════════
  async function loadProjectDocuments(projectId) {
    const { data: docs } = await window.sb
      .from('project_documents')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at');

    const list = document.getElementById('projectDocsList');
    if (!docs?.length) {
      list.innerHTML = '<div class="empty-state">Aucun document.</div>';
      return;
    }

    const typeLabels = { contrat:'Contrat', droit_image:"Droit à l'image", livraison:'Livraison', facture:'Facture', other:'Document' };
    list.innerHTML = docs.map(doc => {
      const url = window.sb.storage.from('client-documents').getPublicUrl(doc.storage_path).data.publicUrl;
      return `<div class="doc-row-admin">
        <div style="flex:1">
          <span class="doc-name">${esc(doc.title)}</span>
          <span class="doc-type-label" style="display:block">${typeLabels[doc.document_type] || 'Document'} · ${fmtDate(doc.created_at)}</span>
        </div>
        <a href="${url}" target="_blank" rel="noopener" class="action-btn" style="text-decoration:none">Voir</a>
        <button class="action-btn danger" onclick="deleteDoc('${doc.id}','${esc(doc.storage_path)}')">Supprimer</button>
      </div>`;
    }).join('');
  }

  document.getElementById('uploadDocBtn')?.addEventListener('click', () => openModal('modalUploadDoc'));

  document.getElementById('uploadDocForm')?.addEventListener('submit', async e => {
    e.preventDefault();
    const file  = document.getElementById('doc_file').files[0];
    const title = document.getElementById('doc_title').value.trim();
    const type  = document.getElementById('doc_type').value;
    if (!file || !title) { feedback('uploadDocFeedback', 'Fichier et titre requis.', false); return; }

    feedback('uploadDocFeedback', 'Upload en cours…', true);
    const ext  = file.name.split('.').pop();
    const path = currentProjectId + '/' + Date.now() + '-' + Math.random().toString(36).slice(2) + '.' + ext;

    try {
      const { error: upErr } = await window.sb.storage.from('client-documents').upload(path, file);
      if (upErr) throw upErr;

      await window.sb.from('project_documents').insert({
        project_id:    currentProjectId,
        title,
        document_type: type,
        storage_path:  path,
        filename:      file.name,
        size_bytes:    file.size
      });

      feedback('uploadDocFeedback', 'Document ajouté.', true);
      document.getElementById('uploadDocForm').reset();
      setTimeout(() => { closeModal('modalUploadDoc'); loadProjectDocuments(currentProjectId); }, 1200);
    } catch (err) {
      feedback('uploadDocFeedback', 'Erreur : ' + err.message, false);
    }
  });

  window.deleteDoc = async function(docId, storagePath) {
    if (!confirm('Supprimer ce document ?')) return;
    try {
      await window.sb.storage.from('client-documents').remove([storagePath]);
      await window.sb.from('project_documents').delete().eq('id', docId);
      await loadProjectDocuments(currentProjectId);
    } catch (err) {
      alert('Erreur suppression : ' + err.message);
    }
  };

  // ════════════════════════════════════════
  // MESSAGES
  // ════════════════════════════════════════
  async function loadProjectMessages(projectId, myId) {
    const { data: msgs } = await window.sb
      .from('project_messages')
      .select('*, profiles(first_name, last_name, role)')
      .eq('project_id', projectId)
      .order('created_at');

    renderAdminMessages(msgs || [], myId);
  }

  function renderAdminMessages(messages, myId) {
    const thread = document.getElementById('adminMsgThread');
    if (!messages.length) {
      thread.innerHTML = '<div class="empty-state">Aucun message.</div>';
      return;
    }
    thread.innerHTML = messages.map(msg => {
      const isMine = msg.sender_id === myId;
      const who = isMine ? 'Vous (Agency A)' : (msg.profiles?.first_name ? msg.profiles.first_name + ' ' + (msg.profiles.last_name || '') : 'Client');
      const dt  = new Date(msg.created_at).toLocaleString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
      return `<div class="msg-row${isMine ? ' mine' : ''}">
        <div class="msg-meta">${esc(who)} · ${dt}</div>
        <div class="msg-body">${esc(msg.content)}</div>
      </div>`;
    }).join('');
    thread.scrollTop = thread.scrollHeight;
  }

  document.getElementById('adminMsgSend')?.addEventListener('click', async () => {
    const input   = document.getElementById('adminMsgInput');
    const content = input.value.trim();
    if (!content || !currentProjectId) return;
    input.value = '';
    try {
      await window.sb.from('project_messages').insert({
        project_id: currentProjectId,
        sender_id:  adminId,
        content
      });
      await loadProjectMessages(currentProjectId, adminId);
    } catch (err) {
      console.error('[Admin] Erreur message :', err);
    }
  });

  // Touche Entrée pour envoyer (Shift+Entrée = saut de ligne)
  document.getElementById('adminMsgInput')?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      document.getElementById('adminMsgSend').click();
    }
  });

  // ── Vue globale messages ──
  async function loadAllMessages() {
    const { data: msgs } = await window.sb
      .from('project_messages')
      .select('*, profiles(first_name, last_name), projects(title, client_id)')
      .order('created_at', { ascending: false })
      .limit(50);

    const list = document.getElementById('allMessagesList');
    if (!msgs?.length) { list.innerHTML = '<div class="empty-state">Aucun message.</div>'; return; }
    list.innerHTML = msgs.map(m => {
      const who  = m.profiles?.first_name ? m.profiles.first_name + ' ' + (m.profiles.last_name || '') : 'Client';
      const proj = m.projects?.title || 'Projet';
      const unread = !m.read_at && m.sender_id !== adminId;
      return `<div style="padding:12px 0;border-bottom:1px solid rgba(212,184,155,.12);display:flex;gap:14px;align-items:start">
        ${unread ? '<span style="width:8px;height:8px;border-radius:50%;background:#f59e0b;flex-shrink:0;margin-top:4px"></span>' : '<span style="width:8px;flex-shrink:0"></span>'}
        <div style="flex:1">
          <strong style="font-size:13px">${esc(who)}</strong>
          <span style="font-size:12px;color:var(--muted)"> · ${esc(proj)}</span>
          <p style="font-size:13px;color:var(--ink-soft);margin:3px 0 0">${esc(m.content.substring(0, 150))}${m.content.length > 150 ? '…' : ''}</p>
        </div>
        <div style="text-align:right;flex-shrink:0">
          <span style="font-size:11px;color:var(--muted)">${fmtDate(m.created_at)}</span>
          <br><button class="action-btn" style="margin-top:4px" onclick="goToProjectMessages('${m.project_id}')">Répondre</button>
        </div>
      </div>`;
    }).join('');
  }

  window.goToProjectMessages = async function(projectId) {
    currentProjectId = projectId;
    showPanel('projects');
    await openProjectDetail(projectId);
    activateProjTab('messages');
  };

  // ════════════════════════════════════════
  // ACCÈS
  // ════════════════════════════════════════
  async function loadProjectAccess(projectId, clientId) {
    const { data: access } = await window.sb
      .from('project_access')
      .select('*')
      .eq('project_id', projectId)
      .eq('client_id', clientId)
      .single();

    if (access) {
      const start = access.access_start ? access.access_start.split('T')[0] : '';
      const end   = access.access_end   ? access.access_end.split('T')[0]   : '';
      document.getElementById('accessStart').value = start;
      document.getElementById('accessEnd').value   = end;
    } else {
      document.getElementById('accessStart').value = new Date().toISOString().split('T')[0];
      document.getElementById('accessEnd').value   = '';
    }
  }

  document.getElementById('saveAccessBtn')?.addEventListener('click', async () => {
    if (!currentProjectId) return;
    const project  = allProjects.find(p => p.id === currentProjectId);
    const clientId = project?.client_id;
    if (!clientId) return;

    const start = document.getElementById('accessStart').value;
    const end   = document.getElementById('accessEnd').value || null;

    try {
      await window.sb.from('project_access').upsert({
        project_id:   currentProjectId,
        client_id:    clientId,
        access_start: start ? new Date(start).toISOString() : new Date().toISOString(),
        access_end:   end   ? new Date(end).toISOString()   : null
      }, { onConflict: 'project_id,client_id' });

      feedback('accessFeedback', 'Accès mis à jour.', true);
    } catch (err) {
      feedback('accessFeedback', 'Erreur : ' + err.message, false);
    }
  });

  // ── Vue globale accès ──
  async function loadAllAccess() {
    const { data: accesses } = await window.sb
      .from('project_access')
      .select('*, projects(title), profiles(first_name, last_name, email)')
      .order('access_end', { ascending: true });

    const tbody = document.getElementById('accessTableBody');
    if (!accesses?.length) {
      tbody.innerHTML = '<tr><td colspan="6" class="empty-state">Aucun accès configuré.</td></tr>';
      return;
    }

    tbody.innerHTML = accesses.map(a => {
      const client  = a.profiles ? [a.profiles.first_name, a.profiles.last_name].filter(Boolean).join(' ') || a.profiles.email : '—';
      const project = a.projects?.title || '—';
      const end     = a.access_end ? new Date(a.access_end) : null;
      const days    = end ? Math.ceil((end - new Date()) / 86400000) : null;
      const badge   = !end
        ? '<span class="s-badge" style="background:#d1fae5;color:#065f46">Illimité</span>'
        : days > 7
          ? '<span class="s-badge" style="background:#dbeafe;color:#1e40af">' + days + 'j</span>'
          : days > 0
            ? '<span class="s-badge" style="background:#fef3c7;color:#92400e">Expire dans ' + days + 'j</span>'
            : '<span class="s-badge" style="background:#fee2e2;color:#991b1b">Expiré</span>';

      return `<tr>
        <td>${esc(client)}</td>
        <td>${esc(project)}</td>
        <td>${fmtDate(a.access_start)}</td>
        <td>${a.access_end ? fmtDate(a.access_end) : '—'}</td>
        <td>${badge}</td>
        <td><button class="action-btn" onclick="goToProjectMessages('${a.project_id}')">Gérer →</button></td>
      </tr>`;
    }).join('');
  }

  // ════════════════════════════════════════
  // INQUIRIES — Demandes (portfolio/talent/partner)
  // ════════════════════════════════════════
  const INQ_LABELS = { portfolio: 'Portfolio', talent: 'Talent', partner: 'Partenaires' };
  const INQ_COLORS = {
    portfolio: 'background:#dbeafe;color:#1e40af',
    talent:    'background:#fef3c7;color:#92400e',
    partner:   'background:#d1fae5;color:#065f46',
  };
  const STATUS_LABELS = { new:'Nouvelle', read:'Lue', replied:'Répondu', archived:'Archivée' };
  const STATUS_COLORS = {
    new:      'background:#fee2e2;color:#991b1b',
    read:     'background:#fef3c7;color:#92400e',
    replied:  'background:#d1fae5;color:#065f46',
    archived: 'background:#f3f4f6;color:#9ca3af',
  };

  let allInquiries = [];
  let inqActiveFilter = 'all';

  async function loadInquiries() {
    const { data } = await window.sb
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });
    allInquiries = data || [];
    renderInquiries(allInquiries);
    updateInquiryCounts(allInquiries);
  }

  function updateInquiryCounts(list) {
    const cnt = (cat) => list.filter(i => i.category === cat).length;
    const unread = list.filter(i => i.status === 'new').length;
    document.getElementById('cntPortfolio')?.textContent !== undefined && (document.getElementById('cntPortfolio').textContent = cnt('portfolio'));
    document.getElementById('cntTalent')?.textContent !== undefined   && (document.getElementById('cntTalent').textContent   = cnt('talent'));
    document.getElementById('cntPartner')?.textContent !== undefined  && (document.getElementById('cntPartner').textContent  = cnt('partner'));
    document.getElementById('cntUnread')?.textContent !== undefined   && (document.getElementById('cntUnread').textContent   = unread);
    const el = document.getElementById('countInquiries');
    if (el) el.textContent = unread;
  }

  function renderInquiries(list) {
    document.getElementById('inqTableBody').innerHTML = !list.length
      ? '<tr><td colspan="7" class="empty-state">Aucune demande.</td></tr>'
      : list.map(i => {
          const cat = INQ_LABELS[i.category] || i.category;
          const name = [i.first_name, i.last_name].filter(Boolean).join(' ') || '—';
          const subject = i.profile_type || i.talent_type || i.project_type || i.subject || '—';
          return `<tr>
            <td><span class="s-badge" style="${INQ_COLORS[i.category] || ''}">${cat}</span></td>
            <td><strong>${esc(name)}</strong></td>
            <td><a href="mailto:${esc(i.email)}" style="color:var(--sand)">${esc(i.email)}</a></td>
            <td style="max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(subject)}</td>
            <td>${fmtDate(i.created_at)}</td>
            <td><span class="s-badge" style="${STATUS_COLORS[i.status] || ''}">${STATUS_LABELS[i.status] || i.status}</span></td>
            <td>
              <button class="action-btn" onclick="openInquiry('${i.id}')">Voir →</button>
            </td>
          </tr>`;
        }).join('');
  }

  // Filtres catégorie
  document.querySelectorAll('.inq-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.inq-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      inqActiveFilter = btn.dataset.cat;
      const filtered = inqActiveFilter === 'all'
        ? allInquiries
        : allInquiries.filter(i => i.category === inqActiveFilter);
      renderInquiries(filtered);
    });
  });

  // Détail d'une inquiry
  window.openInquiry = async function(id) {
    const inq = allInquiries.find(i => i.id === id);
    if (!inq) return;

    // Marquer comme lue
    if (inq.status === 'new') {
      await window.sb.from('inquiries').update({ status: 'read' }).eq('id', id);
      inq.status = 'read';
      renderInquiries(inqActiveFilter === 'all' ? allInquiries : allInquiries.filter(i => i.category === inqActiveFilter));
      updateInquiryCounts(allInquiries);
    }

    const fields = [
      ['Catégorie',     INQ_LABELS[inq.category] || inq.category],
      ['Statut',        STATUS_LABELS[inq.status] || inq.status],
      ['Prénom',        inq.first_name],
      ['Nom',           inq.last_name],
      ['Email',         inq.email],
      ['Téléphone',     inq.phone],
      ['Société',       inq.company],
      ['Profil',        inq.profile_type],
      ['Type talent',   inq.talent_type],
      ['Instagram',     inq.instagram],
      ['Localisation',  inq.location],
      ['Type projet',   inq.project_type],
      ['Disponibilités',inq.availability],
      ['Sujet',         inq.subject],
      ['Message',       inq.message],
      ['Reçu le',       fmtDate(inq.created_at)],
      ['Page source',   inq.source_page],
    ].filter(([, v]) => v);

    const attachLinks = (inq.attachments || []).map((u, i) =>
      `<a href="${esc(u)}" target="_blank" rel="noopener" class="action-btn" style="text-decoration:none;margin-right:6px">Photo ${i+1}</a>`
    ).join('');

    document.getElementById('inqDetailCard').innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:20px;flex-wrap:wrap">
        <h3 style="margin:0;font-family:var(--display);font-size:22px;font-weight:400">
          ${esc([inq.first_name, inq.last_name].filter(Boolean).join(' ') || inq.email)}
        </h3>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <select id="inqStatusSel" style="border:1px solid rgba(212,184,155,.4);border-radius:5px;padding:6px 10px;font-size:12px;font-family:var(--body)">
            ${Object.entries(STATUS_LABELS).map(([v, l]) => `<option value="${v}"${inq.status===v?' selected':''}>${l}</option>`).join('')}
          </select>
          <button class="btn-primary-sm" id="saveInqStatus">Enregistrer</button>
          <a href="mailto:${esc(inq.email)}" class="btn-secondary-sm" style="text-decoration:none">Répondre par email</a>
        </div>
      </div>
      ${fields.map(([k,v]) => `
        <div class="doc-row-admin">
          <span style="font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);width:130px;flex-shrink:0">${k}</span>
          <span style="font-size:14px;color:var(--ink);white-space:pre-wrap">${esc(String(v))}</span>
        </div>`).join('')}
      ${attachLinks ? `<div style="margin-top:16px"><p class="eyebrow" style="margin-bottom:8px">Photos jointes</p>${attachLinks}</div>` : ''}
    `;

    document.getElementById('saveInqStatus')?.addEventListener('click', async () => {
      const newStatus = document.getElementById('inqStatusSel').value;
      await window.sb.from('inquiries').update({ status: newStatus }).eq('id', id);
      inq.status = newStatus;
      renderInquiries(inqActiveFilter === 'all' ? allInquiries : allInquiries.filter(i => i.category === inqActiveFilter));
      updateInquiryCounts(allInquiries);
      feedback('', 'Statut mis à jour.', true);
    });

    document.getElementById('inqTableBody').closest('.a-card').style.display = 'none';
    document.getElementById('inqDetail').style.display = 'block';
  };

  document.getElementById('backToInqBtn')?.addEventListener('click', () => {
    document.getElementById('inqDetail').style.display = 'none';
    document.getElementById('inqTableBody').closest('.a-card').style.display = 'block';
  });

  // ════════════════════════════════════════
  // INIT — chargement parallèle robuste
  // ════════════════════════════════════════
  async function safeLoad(name, fn) {
    console.log('[ADMIN] Chargement ' + name);
    try {
      await fn();
    } catch (err) {
      console.error('[ADMIN] Erreur ' + name + ' :', err.message, err.stack);
    }
  }

  await Promise.allSettled([
    safeLoad('Overview',  loadOverview),
    safeLoad('Clients',   loadClients),
    safeLoad('Projects',  loadProjects),
    safeLoad('Messages',  loadAllMessages),
    safeLoad('Access',    loadAllAccess),
    safeLoad('Inquiries', loadInquiries),
  ]);

  console.log('[ADMIN] Initialisation terminée');

  // Realtime : nouveaux messages
  window.sb
    .channel('admin-messages')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'project_messages' }, async () => {
      await loadAllMessages();
      if (currentProjectId) await loadProjectMessages(currentProjectId, adminId);
      const { count } = await window.sb
        .from('project_messages').select('id', { count: 'exact', head: true }).is('read_at', null);
      document.getElementById('countMessages').textContent = count ?? '—';
    })
    .subscribe();

  // Realtime : nouvelles demandes (inquiries)
  window.sb
    .channel('admin-inquiries')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'inquiries' }, async () => {
      await loadInquiries();
    })
    .subscribe();

})();
