/* ============================================================
   portfolio-category.js — Agency A
   Page dédiée à un univers du portfolio
   Utilise window.pfCatData défini dans la page HTML
   ============================================================ */

(function () {
  const data = window.pfCatData;
  if (!data) return;

  const filtersEl = document.getElementById('pfFilters');
  const gridEl    = document.getElementById('pfGrid');
  const counterEl = document.getElementById('pfCounter');
  const lightbox  = document.getElementById('pfLightbox');
  const lbImg     = document.getElementById('pfLbImg');
  const lbPrev    = document.getElementById('pfLbPrev');
  const lbNext    = document.getElementById('pfLbNext');
  const lbClose   = document.getElementById('pfLbClose');
  const lbCounter = document.getElementById('pfLbCounter');

  let lbPhotos = [], lbIndex = 0;

  /* ── GRILLE ─────────────────────────────────────────────── */
  function buildGrid(filter) {
    if (!gridEl) return;
    gridEl.innerHTML = '';
    const allPhotos = [];

    data.projects.forEach(project => {
      if (filter !== 'Tous les projets' && project.category !== filter) return;

      const header = document.createElement('div');
      header.className = 'pf-gallery-project-info';
      header.innerHTML = `
        <div class="pf-gallery-project-title">${project.title}</div>
        <div class="pf-gallery-project-sub">${project.category} · ${project.year}</div>`;
      gridEl.appendChild(header);

      project.images.forEach((src, i) => {
        allPhotos.push(src);
        const div = document.createElement('div');
        const isFeature = (allPhotos.length - 1) % 5 === 0;
        div.className = 'pf-gphoto' + (isFeature ? ' is-featured' : '');
        const img = document.createElement('img');
        img.src = src;
        img.alt = project.title + ' — photo ' + (i + 1);
        img.decoding = 'async';
        div.appendChild(img);
        gridEl.appendChild(div);
      });
    });

    // Wiring lightbox
    const snapshot = [...allPhotos];
    gridEl.querySelectorAll('.pf-gphoto').forEach((el, idx) => {
      el.addEventListener('click', () => openLightbox(snapshot, idx));
    });

    // Compteur
    if (counterEl) counterEl.textContent = allPhotos.length + ' PHOTO' + (allPhotos.length > 1 ? 'S' : '');
  }

  /* ── FILTRES ─────────────────────────────────────────────── */
  function buildFilters() {
    if (!filtersEl) return;
    filtersEl.innerHTML = '';
    data.categories.forEach((cat, i) => {
      const count = cat === 'Tous les projets'
        ? data.projects.reduce((s, p) => s + p.images.length, 0)
        : data.projects.filter(p => p.category === cat).reduce((s, p) => s + p.images.length, 0);
      const btn = document.createElement('button');
      btn.className = 'pf-gf-btn' + (i === 0 ? ' is-active' : '');
      btn.innerHTML = `<span>${cat}</span><span class="pf-gf-count">(${count})</span>`;
      btn.addEventListener('click', () => {
        filtersEl.querySelectorAll('.pf-gf-btn').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        buildGrid(cat);
      });
      filtersEl.appendChild(btn);
    });
  }

  /* ── LIGHTBOX ───────────────────────────────────────────── */
  function openLightbox(photos, index) {
    lbPhotos = photos;
    lbIndex  = index;
    if (lightbox) lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    setLbPhoto(index, true);
  }

  function closeLightbox() {
    if (lightbox) lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function setLbPhoto(idx, instant) {
    lbIndex = idx;
    if (!instant && lbImg) lbImg.classList.add('fading');
    setTimeout(() => {
      if (lbImg) {
        lbImg.src = lbPhotos[idx];
        lbImg.alt = 'Photo ' + (idx + 1) + ' sur ' + lbPhotos.length;
        lbImg.classList.remove('fading');
      }
    }, instant ? 0 : 180);
    if (lbCounter) lbCounter.textContent = (idx + 1) + ' / ' + lbPhotos.length;
    if (lbPrev) lbPrev.disabled = idx === 0;
    if (lbNext) lbNext.disabled = idx === lbPhotos.length - 1;
  }

  /* ── EVENTS ─────────────────────────────────────────────── */
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lightbox) lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  if (lbPrev)  lbPrev.addEventListener('click',  () => { if (lbIndex > 0) setLbPhoto(lbIndex - 1); });
  if (lbNext)  lbNext.addEventListener('click',  () => { if (lbIndex < lbPhotos.length - 1) setLbPhoto(lbIndex + 1); });

  document.addEventListener('keydown', e => {
    if (!lightbox || !lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft'  && lbIndex > 0) setLbPhoto(lbIndex - 1);
    if (e.key === 'ArrowRight' && lbIndex < lbPhotos.length - 1) setLbPhoto(lbIndex + 1);
  });

  let txStart = 0;
  if (lightbox) {
    lightbox.addEventListener('touchstart', e => { txStart = e.touches[0].clientX; }, { passive: true });
    lightbox.addEventListener('touchend',   e => {
      const dx = e.changedTouches[0].clientX - txStart;
      if (Math.abs(dx) > 48) {
        if (dx < 0 && lbIndex < lbPhotos.length - 1) setLbPhoto(lbIndex + 1);
        if (dx > 0 && lbIndex > 0)                    setLbPhoto(lbIndex - 1);
      }
    }, { passive: true });
  }

  /* ── INIT ───────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    buildFilters();
    buildGrid('Tous les projets');
  });
})();
