// content-manager.js — Agency A Administration
// Panneau « Contenu du site » : modifier les textes éditables depuis l'admin.

/* ════════════════════════════════════════
   CONFIG PAGES
════════════════════════════════════════ */
const CM_PAGES = [
  { id: 'global',       label: 'Informations générales', icon: '⚙️', desc: 'Email, lieu, Instagram, délai de réponse — visibles partout sur le site.' },
  { id: 'accueil',      label: 'Page d\'accueil',         icon: '🏠', desc: 'Titre principal, boutons d\'action.' },
  { id: 'a-propos',     label: 'Page À propos',           icon: '👤', desc: 'Titre, citations de la fondatrice.' },
  { id: 'contact',      label: 'Page Contact',            icon: '✉️', desc: 'Titre, sous-titre, intro du formulaire.' },
  { id: 'boutique',     label: 'Page Boutique',           icon: '🛍️', desc: 'Titre, sous-titre, noms et formats des tirages.' },
  { id: 'humanitaire',  label: 'Page Humanitaire',        icon: '💛', desc: 'Titre et sous-titre de la section.' },
  { id: 'tarifs',       label: 'Page Tarifs',             icon: '📋', desc: 'Titre, sous-titre et introduction du catalogue.' },
];

/* ════════════════════════════════════════
   ÉTAT
════════════════════════════════════════ */
let cm = {
  currentPage: null,
  records: [],
  dirty: {},    // key → new value
  saving: false,
};

/* ════════════════════════════════════════
   INIT
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const panel = document.getElementById('panel-content');
  if (!panel || !window.sb) return;
  renderPagePicker();
});

/* ════════════════════════════════════════
   PAGE PICKER
════════════════════════════════════════ */
function renderPagePicker() {
  const container = document.getElementById('cmPagePicker');
  if (!container) return;

  container.innerHTML = '';
  CM_PAGES.forEach(p => {
    const card = document.createElement('div');
    card.className = 'cm-page-card';
    card.innerHTML = `
      <div class="cm-page-icon">${p.icon}</div>
      <div class="cm-page-info">
        <p class="cm-page-name">${p.label}</p>
        <p class="cm-page-desc">${p.desc}</p>
      </div>
      <span class="cm-page-arrow">›</span>
    `;
    card.addEventListener('click', () => loadPageContent(p.id, p.label));
    container.appendChild(card);
  });
}

/* ════════════════════════════════════════
   CHARGER UNE PAGE
════════════════════════════════════════ */
async function loadPageContent(pageId, pageLabel) {
  cm.currentPage = pageId;
  cm.dirty = {};

  document.getElementById('cmPagePicker').style.display = 'none';
  const editor = document.getElementById('cmEditor');
  editor.style.display = '';
  document.getElementById('cmEditorTitle').textContent = pageLabel;
  document.getElementById('cmFieldsList').innerHTML =
    '<p style="color:var(--muted);font-size:13px;padding:20px 0">Chargement…</p>';
  document.getElementById('cmSaveBtn').disabled = true;

  const { data, error } = await window.sb
    .from('site_content')
    .select('*')
    .eq('page', pageId)
    .order('display_order');

  if (error || !data || !data.length) {
    document.getElementById('cmFieldsList').innerHTML =
      '<p style="color:var(--muted);font-size:13px;padding:20px 0">Aucun contenu configurable pour cette page.</p>';
    return;
  }

  cm.records = data;
  renderFields(data);
}

/* ════════════════════════════════════════
   AFFICHER LES CHAMPS
════════════════════════════════════════ */
function renderFields(records) {
  const list = document.getElementById('cmFieldsList');
  list.innerHTML = '';

  // Grouper par section
  const sections = {};
  records.forEach(r => {
    if (!sections[r.section]) sections[r.section] = [];
    sections[r.section].push(r);
  });

  Object.entries(sections).forEach(([sec, fields]) => {
    const secLabel = cmSectionLabel(sec);
    const secEl = document.createElement('div');
    secEl.className = 'cm-section';
    secEl.innerHTML = `<p class="cm-section-title">${secLabel}</p>`;

    fields.forEach(field => {
      const wrap = document.createElement('div');
      wrap.className = 'cm-field';

      const isTextarea = field.type === 'textarea';
      const inputEl = isTextarea
        ? `<textarea id="cm-${field.key}" rows="3" class="cm-input">${escCm(field.value || '')}</textarea>`
        : `<input type="${field.type}" id="cm-${field.key}" class="cm-input" value="${escAttr(field.value || '')}">`;

      wrap.innerHTML = `
        <label class="cm-label" for="cm-${field.key}">${field.label}</label>
        ${field.help ? `<p class="cm-help">${field.help}</p>` : ''}
        ${inputEl}
      `;

      const input = wrap.querySelector(`#cm-${field.key}`);
      input.addEventListener('input', () => {
        cm.dirty[field.key] = input.value;
        document.getElementById('cmSaveBtn').disabled = false;
        document.getElementById('cmSaveBtn').textContent = 'Enregistrer les modifications';
      });

      secEl.appendChild(wrap);
    });

    list.appendChild(secEl);
  });
}

function cmSectionLabel(sec) {
  const map = {
    contact: 'Coordonnées de contact', hero: 'En-tête de page',
    seo: 'Référencement', footer: 'Bas de page',
    fondatrice: 'Citations de la fondatrice', formulaire: 'Formulaire',
    tirage_1: 'Tirage 1', tirage_2: 'Tirage 2', tirage_3: 'Tirage 3',
    tirage_4: 'Tirage 4', tirage_5: 'Tirage 5', tirage_6: 'Tirage 6',
  };
  return map[sec] || sec.charAt(0).toUpperCase() + sec.slice(1);
}

/* ════════════════════════════════════════
   SAUVEGARDER
════════════════════════════════════════ */
async function cmSave() {
  if (cm.saving || !Object.keys(cm.dirty).length) return;
  cm.saving = true;
  const btn = document.getElementById('cmSaveBtn');
  btn.disabled = true;
  btn.textContent = 'Enregistrement…';

  try {
    const updates = Object.entries(cm.dirty).map(([key, value]) =>
      window.sb.from('site_content').update({ value }).eq('key', key).eq('page', cm.currentPage)
    );
    await Promise.all(updates);

    // Mettre à jour les records locaux
    Object.entries(cm.dirty).forEach(([key, value]) => {
      const r = cm.records.find(x => x.key === key);
      if (r) r.value = value;
    });
    cm.dirty = {};

    btn.textContent = '✓ Modifications enregistrées';
    showAdminToast('✓ Contenu mis à jour. Les modifications sont visibles sur le site.');
    setTimeout(() => {
      btn.disabled = true;
      btn.textContent = 'Enregistrer les modifications';
    }, 3000);
  } catch (err) {
    console.error('[ContentManager]', err);
    showAdminToast('Erreur lors de l\'enregistrement : ' + (err.message || err), true);
    btn.disabled = false;
    btn.textContent = 'Enregistrer les modifications';
  }
  cm.saving = false;
}

/* ════════════════════════════════════════
   RETOUR À LA LISTE
════════════════════════════════════════ */
function cmBack() {
  if (Object.keys(cm.dirty).length) {
    if (!confirm('Vous avez des modifications non enregistrées. Quitter quand même ?')) return;
  }
  cm.currentPage = null;
  cm.dirty = {};
  document.getElementById('cmEditor').style.display = 'none';
  document.getElementById('cmPagePicker').style.display = '';
}

/* ════════════════════════════════════════
   HELPERS
════════════════════════════════════════ */
function escCm(s) { return String(s).replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function escAttr(s) { return String(s).replace(/"/g,'&quot;'); }

// Expose globalement
window.cmSave = cmSave;
window.cmBack = cmBack;
