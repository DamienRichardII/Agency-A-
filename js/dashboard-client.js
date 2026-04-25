// dashboard-client.js — Agency A
// Chargement des données Supabase pour le dashboard client

(async function () {
  // ── Protection de la page ──
  const ctx = await Auth.protect();
  if (!ctx) return; // redirigé vers login

  const { profile } = ctx;
  const userId = profile.id;

  // ── Références DOM ──
  const loading   = document.getElementById('dbLoading');
  const content   = document.getElementById('dbContent');

  // ── Affichage nom utilisateur ──
  const displayName = [profile.first_name, profile.last_name].filter(Boolean).join(' ') || profile.email;
  document.getElementById('sidebarName').textContent  = displayName;
  document.getElementById('overviewTitle').textContent = 'Bonjour, ' + (profile.first_name || displayName);

  // ── Navigation entre panels ──
  const allLinks  = document.querySelectorAll('[data-panel]');
  const allPanels = document.querySelectorAll('.db-panel');

  function showPanel(panelId) {
    allPanels.forEach(p => p.classList.remove('active'));
    allLinks.forEach(a => a.classList.remove('active'));
    const panel = document.getElementById('panel-' + panelId);
    if (panel) panel.classList.add('active');
    allLinks.forEach(a => { if (a.dataset.panel === panelId) a.classList.add('active'); });
    // Scroll top sur mobile
    if (window.innerWidth < 900) window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  allLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      showPanel(link.dataset.panel);
    });
  });

  // ── Déconnexion ──
  document.getElementById('sidebarLogout')?.addEventListener('click', () => Auth.logout());
  document.getElementById('mobileLogout')?.addEventListener('click',  () => Auth.logout());

  // ── Chargement des données ──
  let currentProject = null;
  let projectImages  = [];
  let mySelections   = new Set();

  async function loadData() {
    try {
      // 1. Projet actif (le plus récent non archivé)
      const { data: projects } = await window.sb
        .from('projects')
        .select('*, project_access(*)')
        .eq('client_id', userId)
        .neq('status', 'archive')
        .order('created_at', { ascending: false })
        .limit(1);

      currentProject = projects?.[0] || null;

      // 2. Accès
      const { data: access } = await window.sb
        .from('project_access')
        .select('*')
        .eq('client_id', userId)
        .order('created_at', { ascending: false })
        .limit(1);

      const projectAccess = access?.[0] || null;

      // 3. Images du projet
      if (currentProject) {
        const { data: imgs } = await window.sb
          .from('project_images')
          .select('*')
          .eq('project_id', currentProject.id)
          .order('sort_order');
        projectImages = imgs || [];

        // 4. Sélections existantes
        const { data: sels } = await window.sb
          .from('image_selections')
          .select('image_id')
          .eq('project_id', currentProject.id)
          .eq('selected_by', userId);
        mySelections = new Set((sels || []).map(s => s.image_id));

        // 5. Messages
        const { data: msgs } = await window.sb
          .from('project_messages')
          .select('*, profiles(first_name, last_name, role)')
          .eq('project_id', currentProject.id)
          .order('created_at');
        renderMessages(msgs || [], userId, profile);

        // Marquer les messages comme lus
        await window.sb
          .from('project_messages')
          .update({ read_at: new Date().toISOString() })
          .eq('project_id', currentProject.id)
          .neq('sender_id', userId)
          .is('read_at', null);

        // 6. Documents
        const { data: docs } = await window.sb
          .from('project_documents')
          .select('*')
          .eq('project_id', currentProject.id)
          .order('created_at');
        renderDocuments(docs || []);
      }

      // ── Rendu ──
      renderOverview(currentProject, projectAccess);
      renderGallery(projectImages, mySelections, userId, currentProject);
      renderProfile(profile);

      // Sidebar badge accès
      if (projectAccess?.access_end) {
        const end  = new Date(projectAccess.access_end);
        const days = Math.ceil((end - new Date()) / 86400000);
        document.getElementById('sidebarAccess').textContent =
          days > 0 ? 'Accès : ' + days + ' j restants' : 'Accès expiré';
      } else {
        document.getElementById('sidebarAccess').textContent = 'Accès actif';
      }

      loading.style.display = 'none';
      content.style.display = 'block';

    } catch (err) {
      console.error('[Dashboard] Erreur chargement :', err);
      loading.textContent = 'Erreur de chargement. Veuillez recharger la page.';
    }
  }

  // ── Vue d'ensemble ──
  function renderOverview(project, access) {
    const statusLabels = {
      en_cours:    'En cours',
      en_retouche: 'En retouche',
      livraison:   'Livraison',
      termine:     'Terminé',
      archive:     'Archivé'
    };

    if (!project) {
      document.getElementById('statStatus').textContent = '—';
      document.getElementById('statStatusLabel').textContent = 'Aucun projet actif';
      document.getElementById('projectTitle').textContent = 'Aucun projet en cours.';
      return;
    }

    const status = project.status || 'en_cours';
    document.getElementById('statStatus').innerHTML =
      '<span class="status-badge status-' + status + '">' + (statusLabels[status] || status) + '</span>';
    document.getElementById('statStatusLabel').textContent = '';

    if (project.session_date) {
      const d = new Date(project.session_date);
      document.getElementById('statDate').textContent = d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    document.getElementById('statType').textContent = project.session_type || project.session_location || '—';

    document.getElementById('statImages').textContent = mySelections.size + ' / ' + projectImages.length;
    document.getElementById('statImagesTotal').textContent = projectImages.length;

    document.getElementById('projectTitle').textContent = project.title;
    document.getElementById('projectNotes').textContent  = project.notes || '';

    // Accès expiry
    if (access?.access_end) {
      const end  = new Date(access.access_end);
      const days = Math.ceil((end - new Date()) / 86400000);
      document.getElementById('statExpiry').textContent = end.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
      if (days <= 7 && days > 0) {
        document.getElementById('accessWarning').innerHTML =
          '<div class="access-warning">⚠ Votre accès expire dans <strong>' + days + ' jour' + (days > 1 ? 's' : '') + '</strong>. Téléchargez vos documents et finalisez votre sélection avant cette date.</div>';
      } else if (days <= 0) {
        document.getElementById('accessWarning').innerHTML =
          '<div class="access-warning" style="background:#fee2e2;border-color:#fca5a5;color:#991b1b">Votre accès a expiré. Contactez Agency A pour le prolonger.</div>';
        document.getElementById('statExpiryLabel').textContent = 'Accès expiré';
      }
    } else {
      document.getElementById('statExpiry').textContent = '—';
    }
  }

  // ── Galerie ──
  function renderGallery(images, selected, uid, project) {
    const grid = document.getElementById('galleryGrid');
    if (!images.length) {
      grid.innerHTML = '<div class="db-empty" style="grid-column:1/-1"><p>Votre galerie sera disponible dès que l\'équipe Agency A aura importé vos photos.</p></div>';
      return;
    }

    grid.innerHTML = '';
    images.forEach(img => {
      const isSelected = selected.has(img.id);
      const url = window.sb.storage.from('client-images').getPublicUrl(img.storage_path).data.publicUrl;

      const tile = document.createElement('div');
      tile.className = 'db-gallery-tile' + (isSelected ? ' selected' : '');
      tile.dataset.id = img.id;
      tile.innerHTML =
        '<img src="' + url + '" alt="' + img.filename + '" loading="lazy">' +
        '<span class="tile-check">✓</span>';

      tile.addEventListener('click', () => toggleSelection(img.id, tile, project?.id, uid));
      grid.appendChild(tile);
    });

    updateSelectionCount();
    document.getElementById('selectionSubmitWrap').style.display = images.length ? 'block' : 'none';
  }

  async function toggleSelection(imageId, tileEl, projectId, uid) {
    if (!projectId) return;
    const wasSelected = mySelections.has(imageId);

    // Optimistic UI
    if (wasSelected) {
      mySelections.delete(imageId);
      tileEl.classList.remove('selected');
    } else {
      mySelections.add(imageId);
      tileEl.classList.add('selected');
    }
    updateSelectionCount();

    try {
      if (wasSelected) {
        await window.sb.from('image_selections')
          .delete()
          .eq('project_id', projectId)
          .eq('image_id', imageId)
          .eq('selected_by', uid);
      } else {
        await window.sb.from('image_selections')
          .insert({ project_id: projectId, image_id: imageId, selected_by: uid });
      }
    } catch (err) {
      // Rollback
      if (wasSelected) { mySelections.add(imageId); tileEl.classList.add('selected'); }
      else { mySelections.delete(imageId); tileEl.classList.remove('selected'); }
      updateSelectionCount();
      console.error('[Gallery] Erreur sélection :', err);
    }
  }

  function updateSelectionCount() {
    const n = mySelections.size;
    document.getElementById('selectionCount').textContent = n + ' image' + (n > 1 ? 's' : '') + ' sélectionnée' + (n > 1 ? 's' : '');
  }

  // Bouton "Envoyer ma sélection"
  document.getElementById('submitSelectionBtn')?.addEventListener('click', async () => {
    const feedback = document.getElementById('selectionFeedback');
    feedback.style.display = 'block';
    feedback.textContent = 'Sélection transmise à Agency A. Merci !';
    // Optionnel: envoyer une notification via Edge Function ici
  });

  // ── Messages ──
  function renderMessages(messages, uid, prof) {
    const thread = document.getElementById('msgThread');
    if (!messages.length) {
      thread.innerHTML = '<div class="db-empty"><p>Aucun message pour l\'instant.<br>L\'équipe Agency A vous contactera ici.</p></div>';
      return;
    }
    thread.innerHTML = '';
    messages.forEach(msg => {
      const isMine = msg.sender_id === uid;
      const senderName = isMine
        ? 'Vous'
        : (msg.profiles?.first_name ? msg.profiles.first_name + ' — Agency A' : 'Agency A');
      const date = new Date(msg.created_at).toLocaleString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

      const bubble = document.createElement('div');
      bubble.className = 'msg-bubble' + (isMine ? ' mine' : '');
      bubble.innerHTML =
        '<div class="msg-meta">' + senderName + ' · ' + date + '</div>' +
        '<div class="msg-body">' + escHtml(msg.content) + '</div>';
      thread.appendChild(bubble);
    });
    thread.scrollTop = thread.scrollHeight;
  }

  // Envoi message
  document.getElementById('msgForm')?.addEventListener('submit', async e => {
    e.preventDefault();
    const input   = document.getElementById('msgInput');
    const content = input.value.trim();
    if (!content || !currentProject) return;

    input.value = '';
    try {
      await window.sb.from('project_messages').insert({
        project_id: currentProject.id,
        sender_id:  userId,
        content
      });
      // Rechargement messages
      const { data: msgs } = await window.sb
        .from('project_messages')
        .select('*, profiles(first_name, last_name, role)')
        .eq('project_id', currentProject.id)
        .order('created_at');
      renderMessages(msgs || [], userId, profile);
    } catch (err) {
      console.error('[Messages] Erreur envoi :', err);
    }
  });

  // ── Documents ──
  function renderDocuments(docs) {
    const list = document.getElementById('docList');
    if (!docs.length) {
      list.innerHTML = '<div class="db-empty"><p>Aucun document disponible pour l\'instant.</p></div>';
      return;
    }

    const typeLabels = {
      contrat:     'Contrat',
      droit_image: 'Droit à l\'image',
      livraison:   'Livraison',
      facture:     'Facture',
      other:       'Document'
    };

    list.innerHTML = docs.map(doc => {
      const url = window.sb.storage.from('client-documents').getPublicUrl(doc.storage_path).data.publicUrl;
      const label = typeLabels[doc.document_type] || 'Document';
      return `<div class="doc-row">
        <div class="doc-icon">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <div class="doc-info">
          <strong>${escHtml(doc.title)}</strong>
          <span>${label}</span>
        </div>
        <a href="${url}" target="_blank" rel="noopener" class="doc-dl">Télécharger</a>
      </div>`;
    }).join('');
  }

  // ── Profil ──
  function renderProfile(p) {
    const table = document.getElementById('ficheTable');
    const rows = [
      ['Nom',      p.last_name  || '—'],
      ['Prénom',   p.first_name || '—'],
      ['Société',  p.company    || '—'],
      ['SIRET',    p.siret      || '—'],
      ['Email',    p.email      || '—'],
      ['Téléphone',p.phone      || '—'],
    ];
    table.innerHTML =
      rows.map(([label, val]) =>
        `<div class="fiche-row"><label>${label}</label><span>${escHtml(String(val))}</span></div>`
      ).join('') +
      `<div class="fiche-row full"><label>Adresse</label><span>${escHtml(p.address || '—')}</span></div>`;
  }

  // ── Utilitaires ──
  function escHtml(str) {
    return String(str)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }

  // ── Lancement ──
  await loadData();

  // ── Realtime messages ──
  if (currentProject) {
    window.sb
      .channel('messages:' + currentProject.id)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'project_messages',
        filter: 'project_id=eq.' + currentProject.id
      }, async () => {
        const { data: msgs } = await window.sb
          .from('project_messages')
          .select('*, profiles(first_name, last_name, role)')
          .eq('project_id', currentProject.id)
          .order('created_at');
        renderMessages(msgs || [], userId, profile);
      })
      .subscribe();
  }

})();
