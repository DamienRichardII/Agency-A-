/* ============================================================
   portfolio.js — Agency A
   Journal Portfolio : données, animation livre, galerie, lightbox
   ============================================================ */

/* ── DATA ─────────────────────────────────────────────────── */
const portfolioData = {
  mode: {
    id: 'mode', number: '01', title: 'Mode',
    cover: 'assets/photos/mode/081225_Elfie_AgencyA_Nocollection0-21.jpg',
    tagline: 'Éditoriaux · Défilés',
    description: "Des éditoriaux aux défilés, notre regard met en lumière la créativité, l'élégance et l'authenticité des marques de mode.",
    categories: ['Tous les projets', 'Éditoriaux', 'Défilés'],
    projects: [
      {
        id: 'paris-fashion-week', title: 'Paris Fashion Week',
        category: 'Défilés', year: '2025', client: 'Agency A', location: 'Paris',
        cover: 'assets/photos/paris-fashion-week/PFW25-11MARS-32.JPG',
        images: [
          'assets/photos/paris-fashion-week/PFW25-11MARS-32.JPG',
          'assets/photos/paris-fashion-week/PFW-25-7mars-71.JPG',
          'assets/photos/paris-fashion-week/PFW-25-7mars-76.JPG',
          'assets/photos/paris-fashion-week/PFW25-11MARS-89.JPG',
          'assets/photos/paris-fashion-week/PFW25-11MARS-90.JPG',
          'assets/photos/paris-fashion-week/PFW25-11MARS-110.JPG',
          'assets/photos/paris-fashion-week/PFW25-11MARS-111.JPG',
          'assets/photos/paris-fashion-week/PFW25-11MARS-130.JPG',
          'assets/photos/paris-fashion-week/PFW25-11MARS-167.JPG',
          'assets/photos/paris-fashion-week/pfw25-11mars-111-2.jpg',
          'assets/photos/paris-fashion-week/pfw25-11mars-112-2.jpg',
          'assets/photos/paris-fashion-week/pfw25-11mars-116-2.jpg',
          'assets/photos/paris-fashion-week/pfw25-11mars-126-2.jpg',
        ]
      },
      {
        id: 'mode-editoriale', title: 'Mode Éditoriale',
        category: 'Éditoriaux', year: '2025', client: 'Agency A', location: 'Paris',
        cover: 'assets/photos/mode/081225_Elfie_AgencyA_Nocollection0-21.jpg',
        images: [
          'assets/photos/mode/081225_Elfie_AgencyA_Nocollection0-21.jpg',
          'assets/photos/mode/081225_elfie_agencya_nocollection0-2-2.jpg',
          'assets/photos/mode/081225_elfie_agencya_nocollection0-3-2.jpg',
          'assets/photos/mode/081225_elfie_agencya_nocollection0-4-2.jpg',
          'assets/photos/mode/2025-11-03_Chaimaa_mannequin_agence_mademoiselle_01.jpg',
          'assets/photos/mode/2025-11-03_Chaimaa_mannequin_agence_mademoiselle_04.jpg',
          'assets/photos/mode/2025-11-03_Chaimaa_mannequin_agence_mademoiselle_05.jpg',
          'assets/photos/mode/IMG_0108-Modifier.JPG',
          'assets/photos/mode/IMG_0217-Modifier.JPG',
          'assets/photos/mode/IMG_0571-Modifier.JPG',
          'assets/photos/mode/IMG_0578-Modifier.JPG',
          'assets/photos/mode/IMG_0583-Modifier.JPG',
          'assets/photos/mode/IMG_0584-Modifier.JPG',
          'assets/photos/mode/IMG_3574.JPG',
          'assets/photos/mode/IMG_9548-Modifier.JPG',
          'assets/photos/mode/IMG_9684-Modifier.JPG',
          'assets/photos/mode/IMG_9801-Modifier.JPG',
          'assets/photos/mode/IMG_9816-Modifier.JPG',
        ]
      },
      {
        id: 'defile-monteiro', title: 'Défilé Monteiro',
        category: 'Défilés', year: '2025', client: 'Monteiro', location: 'Paris',
        cover: 'assets/photos/defile-monteiro/defile-mars-2025-436.jpg',
        images: [
          'assets/photos/defile-monteiro/defile-mars-2025-426.jpg',
          'assets/photos/defile-monteiro/defile-mars-2025-427.jpg',
          'assets/photos/defile-monteiro/defile-mars-2025-428.jpg',
          'assets/photos/defile-monteiro/defile-mars-2025-429.jpg',
          'assets/photos/defile-monteiro/defile-mars-2025-433.jpg',
          'assets/photos/defile-monteiro/defile-mars-2025-434.jpg',
          'assets/photos/defile-monteiro/defile-mars-2025-435.jpg',
          'assets/photos/defile-monteiro/defile-mars-2025-436.jpg',
          'assets/photos/defile-monteiro/defile-mars-2025-437.jpg',
          'assets/photos/defile-monteiro/defile-mars-2025-438.jpg',
          'assets/photos/defile-monteiro/defile-mars-2025-439.jpg',
          'assets/photos/defile-monteiro/defile-mars-2025-440.jpg',
          'assets/photos/defile-monteiro/defile-mars-2025-441.jpg',
          'assets/photos/defile-monteiro/defile-mars-2025-442.jpg',
          'assets/photos/defile-monteiro/defile-mars-2025-443.jpg',
          'assets/photos/defile-monteiro/defile-mars-2025-444.jpg',
          'assets/photos/defile-monteiro/defile-mars-2025-445.jpg',
          'assets/photos/defile-monteiro/defile-mars-2025-446.jpg',
          'assets/photos/defile-monteiro/defile-mars-2025-447.jpg',
          'assets/photos/defile-monteiro/defile-mars-2025-448.jpg',
          'assets/photos/defile-monteiro/defile-mars-2025-456.jpg',
        ]
      }
    ]
  },
  produit: {
    id: 'produit', number: '02', title: 'Produit',
    cover: 'assets/photos/produit/BVLGARI-rose-goldea_AnaisDescomps_AgencyA_0.jpg',
    tagline: 'Packshots · Campagnes',
    description: "Images pensées pour traduire une identité de marque — packshots raffinés et narration visuelle au service du produit.",
    categories: ['Tous les projets', 'Packshots'],
    projects: [
      {
        id: 'objet-matiere', title: 'Objet & matière',
        category: 'Packshots', year: '2025', client: 'Agency A', location: 'Paris',
        cover: 'assets/photos/produit/BVLGARI-rose-goldea_AnaisDescomps_AgencyA_0.jpg',
        images: [
          'assets/photos/produit/BVLGARI-rose-goldea_AnaisDescomps_AgencyA_0.jpg',
          'assets/photos/produit/rouge-a-levre-chanel.jpg',
          'assets/photos/produit/26-01-12_wisky_Anais-Descomps.JPG',
        ]
      }
    ]
  },
  beaute: {
    id: 'beaute', number: '03', title: 'Beauté',
    cover: 'assets/portraits/Anais-22.jpg',
    tagline: 'Portraits · Cosmétique',
    description: "Beauté éditoriale, cadrage précis, peau lumineuse et direction douce pour révéler chaque personnalité.",
    categories: ['Tous les projets', 'Portraits'],
    projects: [
      {
        id: 'portrait-lumiere', title: 'Portrait lumière',
        category: 'Portraits', year: '2025', client: 'Agency A', location: 'Paris',
        cover: 'assets/portraits/Anais-22.jpg',
        images: ['assets/portraits/Anais-22.jpg']
      }
    ]
  },
  culinaire: {
    id: 'culinaire', number: '04', title: 'Culinaire',
    cover: 'assets/photos/culinaire/AnaisDescomps_AgencyA_Culinaire_0.jpg',
    tagline: 'Savoir-faire · Lifestyle',
    description: "Une image qui ouvre l'appétit sans perdre l'élégance du geste photographique. Food styling et lumière douce.",
    categories: ['Tous les projets', 'Food styling'],
    projects: [
      {
        id: 'still-life-culinaire', title: 'Still life culinaire',
        category: 'Food styling', year: '2025', client: 'Agency A', location: 'Paris',
        cover: 'assets/photos/culinaire/AnaisDescomps_AgencyA_Culinaire_0.jpg',
        images: [
          'assets/photos/culinaire/AnaisDescomps_AgencyA_Culinaire_0.jpg',
          'assets/photos/culinaire/AnaisDescomps_AgencyA_Culinaire_0-9.jpg',
          'assets/photos/culinaire/AnaisDescomps_AgencyA_Culinaire--5.jpg',
          'assets/photos/culinaire/AnaisDescomps_AgencyA_Culinaire--7.jpg',
          'assets/photos/culinaire/AnaisDescomps_AgencyA_Culinaire--8.jpg',
          'assets/photos/culinaire/AnaisDescomps_AgencyA_Culinaire--9.jpg',
          'assets/photos/culinaire/AnaisDescomps_AgencyA_Culinaire--10.jpg',
          'assets/photos/culinaire/AnaisDescomps_AgencyA_Culinaire--11.jpg',
        ]
      }
    ]
  },
  talents: {
    id: 'talents', number: '05', title: 'Talents',
    cover: 'assets/nos talents - galerie/celine-polas-25.jpg',
    tagline: 'Portraits · Casting',
    description: "Books, digitals et portraits de développement pour modèles et artistes qui construisent leur image.",
    categories: ['Tous les projets', 'Books'],
    projects: [
      {
        id: 'scouting-books', title: 'Scouting & books',
        category: 'Books', year: '2025', client: 'Agency A', location: 'Paris',
        cover: 'assets/nos talents - galerie/celine-polas-25.jpg',
        images: [
          'assets/nos talents - galerie/celine-polas-25.jpg',
          'assets/nos talents - galerie/29012026_Elfie_AnaisDescomps_AgencyA_-9.jpg',
        ]
      }
    ]
  },
  sport: {
    id: 'sport', number: '06', title: 'Sport',
    cover: 'assets/photos/sport/NM1-28MARS.JPG',
    tagline: 'Événements · Campagnes',
    description: "Reportage sportif — énergie, mouvement et intensité. L'image au service de l'action et des émotions du sport.",
    categories: ['Tous les projets', 'Reportage'],
    projects: [
      {
        id: 'sport-action', title: 'Sport & action',
        category: 'Reportage', year: '2025', client: 'NM1', location: 'Paris',
        cover: 'assets/photos/sport/NM1-28MARS.JPG',
        images: [
          'assets/photos/sport/NM1-28MARS.JPG',
          'assets/photos/sport/NM1-28MARS-3.JPG',
          'assets/photos/sport/NM1-28MARS-45.JPG',
          'assets/photos/sport/NM1-28MARS-46.JPG',
          'assets/photos/sport/NM1-28MARS-47.JPG',
          'assets/photos/sport/NM1-LEVALLOIS-HAVRE-14.JPG',
          'assets/photos/sport/NM1-LEVALLOIS-HAVRE-15.JPG',
          'assets/photos/sport/NM1-LEVALLOIS-HAVRE-16.JPG',
          'assets/photos/sport/NM1-LEVALLOIS-HAVRE-26.JPG',
          'assets/photos/sport/NM1-LEVALLOIS-HAVRE-27.JPG',
          'assets/photos/sport/NM1-LEVALLOIS-HAVRE-31.JPG',
          'assets/photos/sport/NM1-LEVALLOIS-HAVRE-33.JPG',
          'assets/photos/sport/NM1-LEVALLOIS-HAVRE-40.JPG',
          'assets/photos/sport/NM1-LEVALLOIS-HAVRE-42.JPG',
          'assets/photos/sport/NM1-LEVALLOIS-HAVRE-47.JPG',
          'assets/photos/sport/NM1-LEVALLOIS-SCABB-12.jpg',
          'assets/photos/sport/NM1-LEVALLOIS-SCABB-13.jpg',
          'assets/photos/sport/NM1-LEVALLOIS-SCABB-44.jpg',
          'assets/photos/sport/NM1-LEVALLOIS-SCABB-46.jpg',
          'assets/photos/sport/NM1-LEVALLOIS-SCABB-79.jpg',
          'assets/photos/sport/NM1-LEVALLOIS-SCABB-115.jpg',
        ]
      }
    ]
  }
};

/* ── ÉTAT ────────────────────────────────────────────────── */
const state = {
  bookOpen:       false,
  activeUniverse: null,
  activeFilter:   'Tous les projets',
  lbPhotos:       [],
  lbIndex:        0,
};

/* ── DOM ──────────────────────────────────────────────────── */
const bookScene    = document.getElementById('pfBookScene');
const bookWrap     = document.getElementById('pfBook');
const pfOpenBtn    = document.getElementById('pfOpenBtn');
const universesEl  = document.getElementById('pfUniverses');
const universesGrid= document.getElementById('pfUniversesGrid');
const gallery      = document.getElementById('pfGallery');
const galBack      = document.getElementById('pfGalleryBack');
const galClose     = document.getElementById('pfGalleryClose');
const galNum       = document.getElementById('pfGalleryNum');
const galTitle     = document.getElementById('pfGalleryTitle');
const galDesc      = document.getElementById('pfGalleryDesc');
const galFilters   = document.getElementById('pfGalleryFilters');
const galGrid      = document.getElementById('pfGalleryGrid');
const galCounter   = document.getElementById('pfGalleryCounter');
const lightbox     = document.getElementById('pfLightbox');
const lbImg        = document.getElementById('pfLbImg');
const lbPrev       = document.getElementById('pfLbPrev');
const lbNext       = document.getElementById('pfLbNext');
const lbClose      = document.getElementById('pfLbClose');
const lbCounter    = document.getElementById('pfLbCounter');

/* ── LIVRE ────────────────────────────────────────────────── */
function openBook() {
  if (state.bookOpen) { scrollToUniverses(); return; }
  state.bookOpen = true;
  if (bookScene) bookScene.classList.add('is-open');
  if (bookWrap)  bookWrap.style.transform = 'rotateX(2deg) rotateY(-10deg)';
  setTimeout(() => {
    if (universesEl) universesEl.classList.add('is-revealed');
    scrollToUniverses();
  }, 1100);
}

function scrollToUniverses() {
  if (universesEl) universesEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ── CARTES UNIVERS ──────────────────────────────────────── */
function buildUniverseCards() {
  if (!universesGrid) return;
  Object.values(portfolioData).forEach(u => {
    const card = document.createElement('div');
    card.className = 'pf-universe-card reveal';
    card.dataset.universe = u.id;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', 'Ouvrir l\'univers ' + u.title);
    card.innerHTML = `
      <img src="${u.cover}" alt="${u.title}" loading="lazy">
      <div class="pf-universe-info">
        <div class="pf-universe-num">${u.number}</div>
        <h3 class="pf-universe-name">${u.title}</h3>
        <div class="pf-universe-tag">${u.tagline}</div>
        <a class="pf-universe-link" href="portfolio-${u.id}.html" aria-label="Page dédiée ${u.title}" title="Voir la page ${u.title}"><svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M1 9L9 1M9 1H2M9 1V8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
      </div>`;
    card.addEventListener('click', () => openUniverse(u.id));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openUniverse(u.id); }
    });
    // Le lien ↗ ouvre la page dédiée sans déclencher openUniverse
    const uLink = card.querySelector('.pf-universe-link');
    if (uLink) uLink.addEventListener('click', e => e.stopPropagation());
    universesGrid.appendChild(card);
  });
}

/* ── MARQUEE MOBILE ───────────────────────────────────────── */
function setupMobileMarquee() {
  if (!universesGrid) return;
  if (!window.matchMedia('(max-width: 600px)').matches) return;

  const origCards = [...universesGrid.querySelectorAll('.pf-universe-card')];
  if (!origCards.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Pas d'animation : scroll horizontal manuel
    universesGrid.classList.add('pf-mob-scroll');
    origCards.forEach(card => {
      card.classList.remove('reveal');
      card.classList.add('is-visible');
    });
    return;
  }

  const track = document.createElement('div');
  track.className = 'pf-mob-track';

  // Déplacer les cartes originales dans le track (events déjà attachés)
  origCards.forEach(card => {
    card.classList.remove('reveal');
    card.classList.add('is-visible');
    track.appendChild(card);
  });

  // Cloner pour la boucle sans couture
  origCards.forEach(card => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.removeAttribute('tabindex');
    const uid = card.dataset.universe;
    if (uid) clone.addEventListener('click', () => openUniverse(uid));
    track.appendChild(clone);
  });

  universesGrid.appendChild(track);
  universesGrid.classList.add('pf-mob-active');

  // Pause au touch, reprise au relâchement
  universesGrid.addEventListener('touchstart', () => {
    track.style.animationPlayState = 'paused';
  }, { passive: true });
  universesGrid.addEventListener('touchend', () => {
    track.style.animationPlayState = 'running';
  }, { passive: true });
}

/* ── GALERIE ──────────────────────────────────────────────── */
function openUniverse(id) {
  const u = portfolioData[id];
  if (!u || !gallery) return;
  state.activeUniverse = id;
  state.activeFilter   = 'Tous les projets';
  if (universesEl) universesEl.classList.add('is-revealed');
  if (galNum)   galNum.textContent   = u.number;
  if (galTitle) galTitle.textContent = u.title;
  if (galDesc)  galDesc.textContent  = u.description;
  buildGalleryFilters(u);
  buildGalleryGrid(u, 'Tous les projets');
  const total = u.projects.reduce((s, p) => s + p.images.length, 0);
  if (galCounter) galCounter.textContent = total + ' PHOTO' + (total > 1 ? 'S' : '');
  gallery.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  window.history.pushState({ universe: id }, '', '#' + id);
}

function closeGallery() {
  if (!gallery) return;
  gallery.classList.remove('is-open');
  document.body.style.overflow = '';
  state.activeUniverse = null;
  window.history.pushState({}, '', window.location.pathname + window.location.search);
}

function buildGalleryFilters(u) {
  if (!galFilters) return;
  galFilters.innerHTML = '';
  u.categories.forEach(cat => {
    const count = cat === 'Tous les projets'
      ? u.projects.reduce((s, p) => s + p.images.length, 0)
      : u.projects.filter(p => p.category === cat).reduce((s, p) => s + p.images.length, 0);
    const btn = document.createElement('button');
    btn.className = 'pf-gf-btn' + (cat === state.activeFilter ? ' is-active' : '');
    btn.innerHTML = `<span>${cat}</span><span class="pf-gf-count">(${count})</span>`;
    btn.addEventListener('click', () => {
      state.activeFilter = cat;
      buildGalleryGrid(u, cat);
      galFilters.querySelectorAll('.pf-gf-btn').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
    });
    galFilters.appendChild(btn);
  });
}

function buildGalleryGrid(u, filter) {
  if (!galGrid) return;
  galGrid.innerHTML = '';
  const allPhotos = [];

  u.projects.forEach(project => {
    if (filter !== 'Tous les projets' && project.category !== filter) return;
    // En-tête projet
    const header = document.createElement('div');
    header.className = 'pf-gallery-project-info';
    header.innerHTML = `
      <div class="pf-gallery-project-title">${project.title}</div>
      <div class="pf-gallery-project-sub">${project.category} · ${project.year}</div>`;
    galGrid.appendChild(header);

    project.images.forEach((src, i) => {
      allPhotos.push(src);
      const div = document.createElement('div');
      const isFeature = (allPhotos.length - 1) % 5 === 0;
      div.className = 'pf-gphoto' + (isFeature ? ' is-featured' : '') + (u.id === 'beaute' ? ' is-beaute' : '');
      const img = document.createElement('img');
      img.src = src;
      img.alt = project.title + ' — photo ' + (i + 1);
      img.decoding = 'async';
      div.appendChild(img);
      galGrid.appendChild(div);
    });
  });

  // Wiring lightbox avec indices corrects
  galGrid.querySelectorAll('.pf-gphoto').forEach((el, idx) => {
    el.addEventListener('click', () => openLightbox(allPhotos, idx));
  });
}

/* ── LIGHTBOX ────────────────────────────────────────────── */
function openLightbox(photos, index) {
  state.lbPhotos = photos;
  state.lbIndex  = index;
  if (lightbox) lightbox.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  setLbPhoto(index, true);
}

function closeLightbox() {
  if (lightbox) lightbox.classList.remove('is-open');
  if (!state.activeUniverse) document.body.style.overflow = '';
}

function setLbPhoto(idx, instant) {
  state.lbIndex = idx;
  const photos  = state.lbPhotos;
  if (!instant && lbImg) lbImg.classList.add('fading');
  setTimeout(() => {
    if (lbImg) {
      lbImg.src = photos[idx];
      lbImg.alt = 'Photo ' + (idx + 1) + ' sur ' + photos.length;
      lbImg.classList.remove('fading');
    }
  }, instant ? 0 : 180);
  if (lbCounter) lbCounter.textContent = (idx + 1) + ' / ' + photos.length;
  if (lbPrev) lbPrev.disabled = idx === 0;
  if (lbNext) lbNext.disabled = idx === photos.length - 1;
}

/* ── ÉVÉNEMENTS ──────────────────────────────────────────── */
function initEvents() {
  // Livre
  if (bookWrap) bookWrap.addEventListener('click', openBook);
  if (pfOpenBtn)  pfOpenBtn.addEventListener('click', openBook);

  // Galerie
  if (galBack)  galBack.addEventListener('click',  closeGallery);
  if (galClose) galClose.addEventListener('click', closeGallery);

  // Lightbox
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev)  lbPrev.addEventListener('click', () => setLbPhoto(state.lbIndex - 1));
  if (lbNext)  lbNext.addEventListener('click', () => setLbPhoto(state.lbIndex + 1));

  // Clavier
  document.addEventListener('keydown', e => {
    if (lightbox && lightbox.classList.contains('is-open')) {
      if (e.key === 'Escape')      { closeLightbox(); return; }
      if (e.key === 'ArrowLeft'  && state.lbIndex > 0)
        setLbPhoto(state.lbIndex - 1);
      if (e.key === 'ArrowRight' && state.lbIndex < state.lbPhotos.length - 1)
        setLbPhoto(state.lbIndex + 1);
      return;
    }
    if (gallery && gallery.classList.contains('is-open')) {
      if (e.key === 'Escape') { closeGallery(); return; }
    }
  });

  // Swipe mobile sur lightbox
  let txStart = 0;
  if (lightbox) {
    lightbox.addEventListener('touchstart', e => { txStart = e.touches[0].clientX; }, { passive: true });
    lightbox.addEventListener('touchend',   e => {
      const dx = e.changedTouches[0].clientX - txStart;
      if (Math.abs(dx) > 48) {
        if (dx < 0 && state.lbIndex < state.lbPhotos.length - 1) setLbPhoto(state.lbIndex + 1);
        if (dx > 0 && state.lbIndex > 0)                          setLbPhoto(state.lbIndex - 1);
      }
    }, { passive: true });
  }

  // History API — bouton retour navigateur
  window.addEventListener('popstate', e => {
    if (lightbox && lightbox.classList.contains('is-open')) { closeLightbox(); return; }
    if (e.state && e.state.universe) {
      openUniverse(e.state.universe);
    } else if (gallery && gallery.classList.contains('is-open')) {
      closeGallery();
    }
  });

  // Hash au chargement
  const hash = window.location.hash.replace('#', '');
  if (hash && portfolioData[hash]) openUniverse(hash);
}

/* ── INIT ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  buildUniverseCards();
  initEvents();
  setupMobileMarquee();

  // Les cartes sont créées dynamiquement APRÈS que shared.js a observé les .reveal
  // → on crée un observer dédié pour les éléments du grid univers
  const pfIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        pfIO.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('#pfUniversesGrid .reveal').forEach(el => pfIO.observe(el));
});
