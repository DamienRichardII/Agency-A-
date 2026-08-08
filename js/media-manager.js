// media-manager.js — Agency A Administration
// Gestionnaire de médias : Parcourir Page→Section→Emplacement, Médiathèque, Upload, Replace, Edit
// Dépend de : window.sb (supabase-client.js), window.AGENCY_A_SUPABASE_CONFIG

/* ════════════════════════════════════════════════════════════════
   CONFIGURATION
════════════════════════════════════════════════════════════════ */
const MM = {
  BUCKET: 'site-media',

  // Labels affichés dans l'interface
  PAGE_LABELS: {
    'accueil':         { label: 'Accueil',         icon: '🏠' },
    'a-propos':        { label: 'À propos',         icon: '👤' },
    'portfolio':       { label: 'Portfolio',        icon: '🖼️' },
    'collaborateurs':  { label: 'Collaborateurs',   icon: '🤝' },
    'boutique':        { label: 'Boutique',         icon: '🛍️' },
    'humanitaire':     { label: 'Humanitaire',      icon: '💛' },
    'tarifs':          { label: 'Tarifs',           icon: '📋' },
    'contact':         { label: 'Contact',          icon: '✉️' },
  },

  SECTION_LABELS: {
    'valeurs':  'Nos valeurs',
    'galerie':  'Galerie portfolio',
    'profils':  'Profils collaborateurs',
    'tirages':  'Tirages boutique',
    'hero':     'Section Hero',
    'general':  'Général',
  },

  SECTIONS_MAP: {
    'a-propos':       ['valeurs'],
    'portfolio':      ['galerie'],
    'collaborateurs': ['profils'],
    'boutique':       ['tirages'],
    'accueil':        ['hero'],
    'humanitaire':    ['general'],
    'tarifs':         ['general'],
    'contact':        ['general'],
  },

  UPLOAD_SECTIONS: {
    'a-propos':       ['valeurs'],
    'portfolio':      ['galerie'],
    'collaborateurs': ['profils'],
    'boutique':       ['tirages'],
    'accueil':        ['hero'],
  },

  ITEMS_PER_PAGE: 24,
};

/* ════════════════════════════════════════════════════════════════
   STATE
════════════════════════════════════════════════════════════════ */
let mm = {
  view: 'browse',        // 'browse' | 'library'
  browsePage: null,
  browseSection: null,
  selectedId: null,
  selectedRecord: null,
  replaceFile: null,
  replacePosition: 'center',
  libPage: 0,
  libSearch: '',
  libFilterPage: '',
  libFilterUsed: '',
  libTotal: 0,
};

/* ════════════════════════════════════════════════════════════════
   INIT
════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {
  if (!window.sb) return;

  // Ne s'initialise que si le panel médias existe
  const panel = document.getElementById('panel-media');
  if (!panel) return;

  initViewTabs();
  initBrowseView();
  initLibraryView();
  initUploadModal();
  initReplaceModal();
  initEditModal();
  initDeleteModal();
  initModalCloseHandlers();

  // Bouton "+ Ajouter des médias"
  const uploadBtn = document.getElementById('mediaOpenUploadBtn');
  if (uploadBtn) uploadBtn.addEventListener('click', () => openMediaModal('modalMediaUpload'));
});

/* ════════════════════════════════════════════════════════════════
   TABS — PARCOURIR / MÉDIATHÈQUE
════════════════════════════════════════════════════════════════ */
function initViewTabs() {
  document.querySelectorAll('.media-view-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      document.querySelectorAll('.media-view-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('mediaViewBrowse').style.display = view === 'browse' ? '' : 'none';
      document.getElementById('mediaViewLibrary').style.display = view === 'library' ? '' : 'none';
      mm.view = view;
      if (view === 'library') renderLibrary();
    });
  });
}

/* ════════════════════════════════════════════════════════════════
   PARCOURIR — Page → Section → Médias
════════════════════════════════════════════════════════════════ */
async function initBrowseView() {
  await renderPageCards();
}

async function renderPageCards() {
  mm.browsePage = null;
  mm.browseSection = null;

  document.getElementById('mediaBrowsePages').style.display = '';
  document.getElementById('mediaBrowseSections').style.display = 'none';
  document.getElementById('mediaBrowseSlots').style.display = 'none';

  setBreadcrumb([]);

  const grid = document.getElementById('pageCardsGrid');
  grid.innerHTML = '<div class="empty-state">Chargement…</div>';

  // Compter médias par page
  const { data: counts, error } = await window.sb
    .from('site_media')
    .select('page')
    .order('page');

  if (error) {
    grid.innerHTML = '<div class="empty-state">Erreur de chargement.</div>';
    console.error('[Media Manager]', error);
    return;
  }

  // Compter par page
  const pageCounts = {};
  (counts || []).forEach(r => {
    pageCounts[r.page] = (pageCounts[r.page] || 0) + 1;
  });

  // Pages à afficher (celles qui ont des médias + toutes les pages du site)
  const pages = Object.keys(MM.PAGE_LABELS);
  grid.innerHTML = '';

  pages.forEach(pageId => {
    const info = MM.PAGE_LABELS[pageId];
    const count = pageCounts[pageId] || 0;
    const card = document.createElement('div');
    card.className = 'page-card';
    card.innerHTML = `
      <div class="page-card-icon">${info.icon}</div>
      <p class="page-card-name">${info.label}</p>
      <p class="page-card-count">${count} média${count > 1 ? 's' : ''}</p>
    `;
    card.addEventListener('click', () => renderSectionCards(pageId));
    grid.appendChild(card);
  });
}

async function renderSectionCards(pageId) {
  mm.browsePage = pageId;
  mm.browseSection = null;

  const pageLabel = MM.PAGE_LABELS[pageId]?.label || pageId;

  document.getElementById('mediaBrowsePages').style.display = 'none';
  document.getElementById('mediaBrowseSections').style.display = '';
  document.getElementById('mediaBrowseSlots').style.display = 'none';

  setBreadcrumb([
    { label: 'Pages', action: () => renderPageCards() },
    { label: pageLabel },
  ]);

  const grid = document.getElementById('sectionCardsGrid');
  grid.innerHTML = '<div class="empty-state">Chargement…</div>';

  const sections = MM.SECTIONS_MAP[pageId] || [];

  // Compter médias par section
  const { data, error } = await window.sb
    .from('site_media')
    .select('section')
    .eq('page', pageId);

  const sectionCounts = {};
  (data || []).forEach(r => {
    sectionCounts[r.section] = (sectionCounts[r.section] || 0) + 1;
  });

  grid.innerHTML = '';

  if (sections.length === 0) {
    grid.innerHTML = '<div class="empty-state">Aucune section configurée pour cette page.</div>';
    return;
  }

  sections.forEach(sectionId => {
    const label = MM.SECTION_LABELS[sectionId] || sectionId;
    const count = sectionCounts[sectionId] || 0;
    const card = document.createElement('div');
    card.className = 'section-card';
    card.innerHTML = `
      <div class="section-card-dot"></div>
      <div class="section-card-info">
        <p class="section-card-name">${label}</p>
        <p class="section-card-count">${count} média${count > 1 ? 's' : ''}</p>
      </div>
    `;
    card.addEventListener('click', () => renderMediaCards(pageId, sectionId));
    grid.appendChild(card);
  });

  // Si section inconnue mais médias présents, les afficher aussi
  Object.keys(sectionCounts).forEach(sec => {
    if (!sections.includes(sec)) {
      const label = MM.SECTION_LABELS[sec] || sec;
      const count = sectionCounts[sec];
      const card = document.createElement('div');
      card.className = 'section-card';
      card.innerHTML = `
        <div class="section-card-dot" style="background:var(--muted)"></div>
        <div class="section-card-info">
          <p class="section-card-name">${label}</p>
          <p class="section-card-count">${count} média${count > 1 ? 's' : ''} (médiathèque)</p>
        </div>
      `;
      card.addEventListener('click', () => renderMediaCards(pageId, sec));
      grid.appendChild(card);
    }
  });
}

async function renderMediaCards(pageId, sectionId) {
  mm.browsePage = pageId;
  mm.browseSection = sectionId;

  const pageLabel    = MM.PAGE_LABELS[pageId]?.label || pageId;
  const sectionLabel = MM.SECTION_LABELS[sectionId] || sectionId;

  document.getElementById('mediaBrowsePages').style.display    = 'none';
  document.getElementById('mediaBrowseSections').style.display = 'none';
  document.getElementById('mediaBrowseSlots').style.display    = '';

  setBreadcrumb([
    { label: 'Pages',        action: () => renderPageCards() },
    { label: pageLabel,      action: () => renderSectionCards(pageId) },
    { label: sectionLabel },
  ]);

  const grid = document.getElementById('mediaCardsGrid');
  grid.innerHTML = '<div class="empty-state">Chargement…</div>';

  const { data, error } = await window.sb
    .from('site_media')
    .select('*')
    .eq('page', pageId)
    .eq('section', sectionId)
    .order('display_order');

  if (error || !data) {
    grid.innerHTML = '<div class="empty-state">Erreur de chargement.</div>';
    return;
  }

  if (data.length === 0) {
    grid.innerHTML = '<div class="empty-state">Aucun média dans cette section.</div>';
    return;
  }

  grid.innerHTML = '';
  data.forEach(record => {
    grid.appendChild(buildMediaCard(record));
  });
}

function buildMediaCard(record) {
  const imgSrc = record.public_url || record.local_fallback || '';
  const hasSupabaseUrl = !!record.public_url;
  const card = document.createElement('div');
  card.className = 'media-card';
  card.innerHTML = `
    <div class="media-card-preview">
      <img src="${escHtml(imgSrc)}" alt="${escHtml(record.alt_text || record.slot)}"
           onerror="this.style.display='none'" loading="lazy"
           style="object-position:${escHtml(record.object_position || 'center')}">
      <span class="media-card-slot">${escHtml(record.slot)}</span>
      ${record.is_structural ? '<span class="media-card-structural">Structurel</span>' : ''}
    </div>
    <div class="media-card-body">
      <p class="media-card-name">${escHtml(record.title || record.slot)}</p>
      <p class="media-card-meta">
        ${hasSupabaseUrl ? '✓ Supabase' : '⚪ Fichier local'}
        ${record.caption ? ' · ' + escHtml(record.caption.slice(0, 28)) : ''}
      </p>
      <div class="media-card-actions">
        <button onclick="openReplace('${record.id}')" title="Remplacer la photo">↑ Photo</button>
        <button onclick="openEdit('${record.id}')" title="Modifier les infos">✎ Infos</button>
        ${!record.is_structural ? `<button class="danger" onclick="openDelete('${record.id}')" title="Supprimer">✕</button>` : ''}
      </div>
    </div>
  `;
  return card;
}

/* ════════════════════════════════════════════════════════════════
   BREADCRUMB
════════════════════════════════════════════════════════════════ */
function setBreadcrumb(steps) {
  const el = document.getElementById('mediaBreadcrumb');
  if (!el) return;

  if (!steps.length) {
    el.innerHTML = '<span>Sélectionnez une page</span>';
    return;
  }

  let html = '';
  steps.forEach((step, i) => {
    if (i > 0) html += '<span class="sep">/</span>';
    if (step.action) {
      html += `<button onclick="(${step.action.toString()})()">${escHtml(step.label)}</button>`;
    } else {
      html += `<span style="color:var(--ink);font-weight:500">${escHtml(step.label)}</span>`;
    }
  });
  el.innerHTML = html;
}

/* ════════════════════════════════════════════════════════════════
   MÉDIATHÈQUE
════════════════════════════════════════════════════════════════ */
function initLibraryView() {
  const search = document.getElementById('librarySearch');
  const filterPage = document.getElementById('libraryFilterPage');
  const filterUsed = document.getElementById('libraryFilterUsed');

  if (search) search.addEventListener('input', debounce(() => {
    mm.libSearch = search.value.trim();
    mm.libPage = 0;
    renderLibrary();
  }, 300));

  if (filterPage) filterPage.addEventListener('change', () => {
    mm.libFilterPage = filterPage.value;
    mm.libPage = 0;
    renderLibrary();
  });

  if (filterUsed) filterUsed.addEventListener('change', () => {
    mm.libFilterUsed = filterUsed.value;
    mm.libPage = 0;
    renderLibrary();
  });
}

async function renderLibrary() {
  const grid = document.getElementById('libraryGrid');
  const pagination = document.getElementById('libraryPagination');
  if (!grid) return;

  grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1">Chargement…</div>';

  let query = window.sb.from('site_media').select('*', { count: 'exact' });

  if (mm.libFilterPage) query = query.eq('page', mm.libFilterPage);
  if (mm.libSearch) query = query.or(`slot.ilike.%${mm.libSearch}%,title.ilike.%${mm.libSearch}%,alt_text.ilike.%${mm.libSearch}%,caption.ilike.%${mm.libSearch}%`);
  if (mm.libFilterUsed === 'used')   query = query.not('public_url', 'is', null);
  if (mm.libFilterUsed === 'unused') query = query.is('public_url', null);

  const from = mm.libPage * MM.ITEMS_PER_PAGE;
  const to   = from + MM.ITEMS_PER_PAGE - 1;
  query = query.order('page').order('display_order').range(from, to);

  const { data, error, count } = await query;

  if (error) {
    grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1">Erreur de chargement.</div>';
    return;
  }

  mm.libTotal = count || 0;
  grid.innerHTML = '';

  if (!data || data.length === 0) {
    grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1">Aucun média trouvé.</div>';
    if (pagination) pagination.innerHTML = '';
    return;
  }

  data.forEach(record => {
    const imgSrc = record.public_url || record.local_fallback || '';
    const used = !!record.public_url;
    const thumb = document.createElement('div');
    thumb.className = 'lib-thumb';
    thumb.title = record.title || record.slot;
    thumb.innerHTML = `
      ${used ? '<div class="lib-thumb-used" title="Utilisé sur le site"></div>' : ''}
      <img src="${escHtml(imgSrc)}" loading="lazy" alt="${escHtml(record.alt_text || record.slot)}"
           onerror="this.style.opacity='.3'" style="object-position:${escHtml(record.object_position||'center')}">
      <div class="lib-thumb-overlay">
        <span class="lib-thumb-label">${escHtml(record.slot)}</span>
      </div>
    `;
    thumb.addEventListener('click', () => {
      // Aller dans Parcourir sur ce média
      document.querySelector('[data-view="browse"]')?.click();
      renderMediaCards(record.page, record.section);
    });
    grid.appendChild(thumb);
  });

  // Pagination
  renderLibPagination(count);
}

function renderLibPagination(total) {
  const el = document.getElementById('libraryPagination');
  if (!el) return;
  const pages = Math.ceil((total || 0) / MM.ITEMS_PER_PAGE);
  if (pages <= 1) { el.innerHTML = ''; return; }

  el.innerHTML = '';
  const prev = document.createElement('button');
  prev.textContent = '←';
  prev.disabled = mm.libPage === 0;
  prev.addEventListener('click', () => { mm.libPage--; renderLibrary(); });
  el.appendChild(prev);

  for (let i = 0; i < pages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i + 1;
    if (i === mm.libPage) btn.classList.add('active');
    btn.addEventListener('click', () => { mm.libPage = i; renderLibrary(); });
    el.appendChild(btn);
  }

  const next = document.createElement('button');
  next.textContent = '→';
  next.disabled = mm.libPage >= pages - 1;
  next.addEventListener('click', () => { mm.libPage++; renderLibrary(); });
  el.appendChild(next);
}

/* ════════════════════════════════════════════════════════════════
   MODAL — REMPLACER
════════════════════════════════════════════════════════════════ */
function initReplaceModal() {
  const fileInput = document.getElementById('replaceFileInput');
  if (!fileInput) return;

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;
    if (!validateImageFile(file)) return;

    mm.replaceFile = file;

    // Preview nouvelle photo
    const reader = new FileReader();
    reader.onload = e => {
      const box = document.getElementById('replacePreviewNew');
      box.innerHTML = `<img src="${e.target.result}" style="width:100%;height:100%;object-fit:cover;display:block">`;
      document.getElementById('replacePreviewNewPlaceholder')?.remove();
    };
    reader.readAsDataURL(file);

    // Info fichier
    const info = document.getElementById('replaceFileInfo');
    if (info) info.textContent = `${file.name} — ${formatFileSize(file.size)}`;

    document.getElementById('replaceConfirmBtn').disabled = false;
  });

  // Position buttons
  document.querySelectorAll('.position-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.position-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      mm.replacePosition = btn.dataset.pos;
    });
  });

  // Confirm
  const confirmBtn = document.getElementById('replaceConfirmBtn');
  if (confirmBtn) confirmBtn.addEventListener('click', doReplace);
}

async function openReplace(id) {
  const { data, error } = await window.sb.from('site_media').select('*').eq('id', id).single();
  if (error || !data) return;

  mm.selectedId = id;
  mm.selectedRecord = data;
  mm.replaceFile = null;
  mm.replacePosition = data.object_position || 'center';

  // Réinitialiser
  const confirmBtn = document.getElementById('replaceConfirmBtn');
  if (confirmBtn) confirmBtn.disabled = true;
  document.getElementById('replaceFileInfo').textContent = '';
  document.getElementById('replaceFileInput').value = '';

  // Preview actuelle
  const currentBox = document.getElementById('replacePreviewCurrent');
  const src = data.public_url || data.local_fallback || '';
  currentBox.innerHTML = src
    ? `<img src="${escHtml(src)}" style="width:100%;height:100%;object-fit:cover;display:block">`
    : '<span style="font-size:12px;color:var(--muted)">Aucune photo actuelle</span>';

  // Preview nouvelle = vide
  const newBox = document.getElementById('replacePreviewNew');
  newBox.innerHTML = `<span id="replacePreviewNewPlaceholder" style="font-size:12px;color:var(--muted)">Cliquez pour choisir</span>`;

  // Sync position active
  document.querySelectorAll('.position-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.pos === mm.replacePosition);
  });

  openMediaModal('modalMediaReplace');
}

async function doReplace() {
  if (!mm.replaceFile || !mm.selectedId || !mm.selectedRecord) return;
  const btn = document.getElementById('replaceConfirmBtn');
  btn.disabled = true;
  btn.textContent = 'Upload en cours…';

  try {
    const rec = mm.selectedRecord;
    const ext = mm.replaceFile.name.split('.').pop().toLowerCase();
    const storagePath = `${rec.page}/${rec.section}/${rec.slot}.${ext}`;

    // Upload dans Supabase Storage (upsert)
    const { error: upErr } = await window.sb.storage
      .from(MM.BUCKET)
      .upload(storagePath, mm.replaceFile, {
        upsert: true,
        contentType: mm.replaceFile.type,
      });

    if (upErr) throw upErr;

    // Récupérer l'URL publique
    const { data: urlData } = window.sb.storage.from(MM.BUCKET).getPublicUrl(storagePath);
    const publicUrl = urlData?.publicUrl;

    // Mettre à jour site_media
    const { error: dbErr } = await window.sb.from('site_media').update({
      storage_path:    storagePath,
      public_url:      publicUrl,
      object_position: mm.replacePosition,
    }).eq('id', mm.selectedId);

    if (dbErr) throw dbErr;

    closeMediaModal('modalMediaReplace');
    showAdminToast('✓ Photo remplacée avec succès !');

    // Rafraîchir la vue courante
    if (mm.browsePage && mm.browseSection) {
      renderMediaCards(mm.browsePage, mm.browseSection);
    }

  } catch (err) {
    console.error('[Replace]', err);
    showAdminToast('Erreur lors du remplacement : ' + (err.message || err), true);
    btn.disabled = false;
    btn.textContent = 'Confirmer le remplacement';
  }
}

/* ════════════════════════════════════════════════════════════════
   MODAL — MODIFIER INFORMATIONS
════════════════════════════════════════════════════════════════ */
function initEditModal() {
  const saveBtn = document.getElementById('editSaveBtn');
  if (saveBtn) saveBtn.addEventListener('click', doEdit);
}

async function openEdit(id) {
  const { data, error } = await window.sb.from('site_media').select('*').eq('id', id).single();
  if (error || !data) return;

  mm.selectedId = id;
  mm.selectedRecord = data;

  // Remplir les champs
  document.getElementById('editTitle').value       = data.title       || '';
  document.getElementById('editAlt').value         = data.alt_text    || '';
  document.getElementById('editCaption').value     = data.caption     || '';
  document.getElementById('editDescription').value = data.description || '';
  document.getElementById('editStatus').textContent = '';
  document.getElementById('editStatus').className  = 'media-info-status';

  // Preview
  const preview = document.getElementById('editPreview');
  const src = data.public_url || data.local_fallback || '';
  preview.innerHTML = src
    ? `<img src="${escHtml(src)}" style="width:100%;height:100%;object-fit:cover;display:block">`
    : '<span style="font-size:12px;color:var(--muted)">Aucune photo</span>';

  openMediaModal('modalMediaEdit');
}

async function doEdit() {
  if (!mm.selectedId) return;

  const btn = document.getElementById('editSaveBtn');
  const status = document.getElementById('editStatus');
  btn.disabled = true;
  btn.textContent = 'Sauvegarde…';

  try {
    const { error } = await window.sb.from('site_media').update({
      title:       document.getElementById('editTitle').value.trim()       || null,
      alt_text:    document.getElementById('editAlt').value.trim()         || null,
      caption:     document.getElementById('editCaption').value.trim()     || null,
      description: document.getElementById('editDescription').value.trim() || null,
    }).eq('id', mm.selectedId);

    if (error) throw error;

    status.textContent = '✓ Informations sauvegardées';
    status.className   = 'media-info-status';
    setTimeout(() => closeMediaModal('modalMediaEdit'), 1400);

    if (mm.browsePage && mm.browseSection) {
      renderMediaCards(mm.browsePage, mm.browseSection);
    }

  } catch (err) {
    console.error('[Edit]', err);
    status.textContent = 'Erreur : ' + (err.message || err);
    status.className   = 'media-info-status err';
    btn.disabled = false;
    btn.textContent = 'Sauvegarder';
  }
}

/* ════════════════════════════════════════════════════════════════
   MODAL — SUPPRIMER
════════════════════════════════════════════════════════════════ */
function initDeleteModal() {
  const confirmBtn = document.getElementById('deleteConfirmBtn');
  if (confirmBtn) confirmBtn.addEventListener('click', doDelete);
}

async function openDelete(id) {
  const { data, error } = await window.sb.from('site_media').select('*').eq('id', id).single();
  if (error || !data) return;
  if (data.is_structural) {
    showAdminToast('Ce média est structurel et ne peut pas être supprimé. Utilisez "Remplacer".', true);
    return;
  }

  mm.selectedId = id;
  mm.selectedRecord = data;

  const preview = document.getElementById('deletePreview');
  const src = data.public_url || data.local_fallback || '';
  preview.innerHTML = src
    ? `<img src="${escHtml(src)}" style="width:100%;height:100%;object-fit:cover;border-radius:6px;display:block">`
    : '<span style="font-size:12px;color:var(--muted)">Aucune photo</span>';

  openMediaModal('modalMediaDelete');
}

async function doDelete() {
  if (!mm.selectedId || !mm.selectedRecord) return;

  const btn = document.getElementById('deleteConfirmBtn');
  btn.disabled = true;
  btn.textContent = 'Suppression…';

  try {
    const rec = mm.selectedRecord;

    // Supprimer du Storage si un fichier Supabase existe
    if (rec.storage_path) {
      await window.sb.storage.from(MM.BUCKET).remove([rec.storage_path]);
    }

    // Supprimer la ligne en DB
    const { error } = await window.sb.from('site_media').delete().eq('id', mm.selectedId);
    if (error) throw error;

    closeMediaModal('modalMediaDelete');
    showAdminToast('✓ Média supprimé.');

    if (mm.browsePage && mm.browseSection) {
      renderMediaCards(mm.browsePage, mm.browseSection);
    }

  } catch (err) {
    console.error('[Delete]', err);
    showAdminToast('Erreur lors de la suppression : ' + (err.message || err), true);
    btn.disabled = false;
    btn.textContent = 'Supprimer définitivement';
  }
}

/* ════════════════════════════════════════════════════════════════
   MODAL — UPLOAD MULTI-MÉDIAS
════════════════════════════════════════════════════════════════ */
function initUploadModal() {
  const zone = document.getElementById('mediaUploadZone');
  const input = document.getElementById('mediaUploadInput');
  const startBtn = document.getElementById('uploadStartBtn');
  const destPage = document.getElementById('uploadDestPage');
  const destSection = document.getElementById('uploadDestSection');

  if (!zone || !input) return;

  let filesToUpload = [];

  // Drag & drop
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('drag-over');
    handleUploadFiles(Array.from(e.dataTransfer.files));
  });

  zone.addEventListener('click', () => input.click());
  input.addEventListener('change', () => handleUploadFiles(Array.from(input.files)));

  function handleUploadFiles(files) {
    filesToUpload = files.filter(f => validateImageFile(f, true));
    if (filesToUpload.length > 0) {
      startBtn.disabled = false;
      renderUploadList(filesToUpload);
    }
  }

  // Page → sections dynamiques
  destPage.addEventListener('change', () => {
    const page = destPage.value;
    const sections = MM.UPLOAD_SECTIONS[page] || [];
    destSection.disabled = !sections.length;
    destSection.innerHTML = sections.length
      ? sections.map(s => `<option value="${s}">${MM.SECTION_LABELS[s] || s}</option>`).join('')
      : '<option value="">— Médiathèque générale —</option>';
  });

  startBtn.addEventListener('click', async () => {
    if (!filesToUpload.length) return;
    startBtn.disabled = true;
    startBtn.textContent = 'Upload en cours…';

    const page    = destPage.value    || 'mediateque';
    const section = destSection.value || 'general';

    for (let i = 0; i < filesToUpload.length; i++) {
      const file = filesToUpload[i];
      const itemEl = document.getElementById(`upload-item-${i}`);
      const barEl  = document.getElementById(`upload-bar-${i}`);
      if (barEl) barEl.style.width = '10%';

      try {
        const ext = file.name.split('.').pop().toLowerCase();
        const slug = slugify(file.name.replace(/\.[^.]+$/, ''));
        const storagePath = `${page}/${section}/${slug}-${Date.now()}.${ext}`;

        const { error: upErr } = await window.sb.storage
          .from(MM.BUCKET)
          .upload(storagePath, file, { upsert: false, contentType: file.type });

        if (upErr) throw upErr;
        if (barEl) barEl.style.width = '70%';

        const { data: urlData } = window.sb.storage.from(MM.BUCKET).getPublicUrl(storagePath);
        const publicUrl = urlData?.publicUrl;

        // Insérer dans site_media
        await window.sb.from('site_media').insert({
          page,
          section,
          slot:          slug + '-' + Date.now(),
          storage_path:  storagePath,
          public_url:    publicUrl,
          alt_text:      file.name.replace(/\.[^.]+$/, ''),
          is_structural: false,
        });

        if (barEl) barEl.style.width = '100%';
        if (itemEl) itemEl.querySelector('span').textContent = '✓ ' + file.name;

      } catch (err) {
        console.error('[Upload]', file.name, err);
        if (itemEl) {
          itemEl.querySelector('span').textContent = '✗ ' + file.name + ' — ' + (err.message || 'Erreur');
          itemEl.querySelector('span').style.color = '#b91c1c';
        }
      }
    }

    startBtn.textContent = 'Terminé';
    filesToUpload = [];
    // Rafraîchir médiathèque si ouverte
    if (mm.view === 'library') renderLibrary();
  });
}

function renderUploadList(files) {
  const list = document.getElementById('uploadProgressList');
  if (!list) return;
  list.innerHTML = '';
  files.forEach((file, i) => {
    const item = document.createElement('div');
    item.className = 'upload-progress-item';
    item.id = `upload-item-${i}`;
    item.innerHTML = `
      <span style="flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escHtml(file.name)} — ${formatFileSize(file.size)}</span>
      <div class="upload-progress-bar">
        <div class="upload-progress-bar-fill" id="upload-bar-${i}" style="width:0%"></div>
      </div>
    `;
    list.appendChild(item);
  });
}

/* ════════════════════════════════════════════════════════════════
   HELPERS MODAUX
════════════════════════════════════════════════════════════════ */
function initModalCloseHandlers() {
  document.querySelectorAll('[data-media-close]').forEach(btn => {
    btn.addEventListener('click', () => closeMediaModal(btn.dataset.mediaClose));
  });
  document.querySelectorAll('.media-modal').forEach(m => {
    m.addEventListener('click', e => { if (e.target === m) closeMediaModal(m.id); });
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.media-modal.open').forEach(m => closeMediaModal(m.id));
    }
  });
}

function openMediaModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.add('open'); document.body.style.overflow = 'hidden'; }
}

function closeMediaModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.remove('open'); document.body.style.overflow = ''; }
}

/* ════════════════════════════════════════════════════════════════
   TOAST NOTIFICATION
════════════════════════════════════════════════════════════════ */
function showAdminToast(msg, isError = false) {
  let toast = document.getElementById('mmToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'mmToast';
    toast.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;padding:12px 20px;border-radius:8px;font-size:13px;font-family:var(--body);font-weight:500;box-shadow:0 8px 24px rgba(17,17,17,.2);transition:opacity .3s;max-width:360px;line-height:1.5';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.background = isError ? '#b91c1c' : '#111';
  toast.style.color = '#f8f2ea';
  toast.style.opacity = '1';
  clearTimeout(toast._to);
  toast._to = setTimeout(() => { toast.style.opacity = '0'; }, 3500);
}

/* ════════════════════════════════════════════════════════════════
   UTILITAIRES
════════════════════════════════════════════════════════════════ */
function escHtml(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' o';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' Ko';
  return (bytes / 1024 / 1024).toFixed(1) + ' Mo';
}

function slugify(str) {
  return str.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function validateImageFile(file, silent = false) {
  const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif'];
  if (!allowed.includes(file.type)) {
    if (!silent) showAdminToast('Format non supporté : ' + file.name, true);
    return false;
  }
  if (file.size > 52428800) { // 50 Mo
    if (!silent) showAdminToast('Fichier trop lourd (max 50 Mo) : ' + file.name, true);
    return false;
  }
  return true;
}

function debounce(fn, delay) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
}

// Expose pour les onclick inline dans le HTML généré dynamiquement
window.openReplace = openReplace;
window.openEdit    = openEdit;
window.openDelete  = openDelete;
