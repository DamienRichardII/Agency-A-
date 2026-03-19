/* ============================================
   AGENCY A — Gallery Configuration
   ============================================
   
   POUR AJOUTER DES PHOTOS :
   
   1. Placer les images dans assets/photos/[theme]/
   2. Ajouter les entrées dans le tableau "items" ci-dessous
   
   Format :
   { src: "assets/photos/[theme]/nom-fichier.jpg", title: "Titre affiché", tall: false }
   
   • tall: true  → l'image prend 2 rangées (idéal pour les portraits verticaux)
   • tall: false  → hauteur standard (paysage ou carré)
   
   ============================================ */

const GALLERY_DATA = {

    // ─── PARIS FASHION WEEK 2025 ───
    // Dossier : assets/photos/paris-fashion-week/
    "pfw": {
        name: "Paris Fashion Week 2025",
        nameEN: "Paris Fashion Week 2025",
        items: [
            // ↓ AJOUTER VOS PHOTOS ICI ↓
            // { src: "assets/photos/paris-fashion-week/backstage-01.jpg", title: "Backstage PFW", tall: true },
            // { src: "assets/photos/paris-fashion-week/runway-01.jpg", title: "Défilé — Collection SS25" },
        ]
    },

    // ─── DÉFILÉ MONTEIRO ───
    // Dossier : assets/photos/defile-monteiro/
    "defile-monteiro": {
        name: "Défilé Monteiro",
        nameEN: "Monteiro Fashion Show",
        items: [
            // ↓ AJOUTER VOS PHOTOS ICI ↓
            // { src: "assets/photos/defile-monteiro/look-01.jpg", title: "Collection Monteiro — Look 1", tall: true },
        ]
    },

    // ─── PRODUIT ───
    // Dossier : assets/photos/produit/
    "produit": {
        name: "Produit",
        nameEN: "Product",
        items: [
            // ↓ AJOUTER VOS PHOTOS ICI ↓
            // { src: "assets/photos/produit/cosmetique-01.jpg", title: "Cosmétique — Ambiance" },
        ]
    },

    // ─── CULINAIRE ───
    // Dossier : assets/photos/culinaire/
    "culinaire": {
        name: "Culinaire",
        nameEN: "Culinary",
        items: [
            // ↓ AJOUTER VOS PHOTOS ICI ↓
            // { src: "assets/photos/culinaire/gastronomie-01.jpg", title: "Haute Gastronomie", tall: true },
        ]
    },

    // ─── MODE ───
    // Dossier : assets/photos/mode/
    "mode": {
        name: "Mode",
        nameEN: "Fashion",
        items: [
            // ↓ AJOUTER VOS PHOTOS ICI ↓
            // { src: "assets/photos/mode/editorial-01.jpg", title: "Éditorial — Série I", tall: true },
        ]
    },

    // ─── VENTES (Tirages d'Art) ───
    // Dossier : assets/photos/ventes/
    "ventes": {
        name: "Ventes — Tirages d'Art",
        nameEN: "Art Prints — Sales",
        items: [
            // ↓ AJOUTER VOS PHOTOS ICI ↓
            // { src: "assets/photos/ventes/tirage-01.jpg", title: "Tirage I — Édition limitée", tall: true },
        ]
    },

    // ─── SPORT ───
    // Dossier : assets/photos/sport/
    "sport": {
        name: "Sport",
        nameEN: "Sport",
        items: [
            // ↓ AJOUTER VOS PHOTOS ICI ↓
            // { src: "assets/photos/sport/action-01.jpg", title: "Action — Mouvement", tall: true },
        ]
    }
};


/* ============================================
   GALLERY ENGINE — Ne pas modifier ci-dessous
   ============================================ */

const GalleryManager = (() => {

    const placeholderGradients = [
        'linear-gradient(135deg, #183749 0%, #3f0d00 100%)',
        'linear-gradient(135deg, #2d1f1a 0%, #1a2a3a 100%)',
        'linear-gradient(135deg, #405b66 0%, #c06949 30%, #183749 100%)',
        'linear-gradient(135deg, #1a1a2e 0%, #3a1a1a 100%)',
        'linear-gradient(135deg, #0d1b2a 0%, #3a2a1a 100%)',
        'linear-gradient(135deg, #a6686e 0%, #183749 100%)',
    ];

    let gIdx = 0;
    const getGrad = () => placeholderGradients[gIdx++ % placeholderGradients.length];

    const gridEl = document.getElementById('galleryGrid');
    const filtersEl = document.getElementById('portfolioFilters');
    let currentFilter = 'all';
    let allItems = [];
    let lightboxItems = [];

    const buildAll = () => {
        allItems = [];
        Object.keys(GALLERY_DATA).forEach(k => {
            GALLERY_DATA[k].items.forEach(item => {
                allItems.push({ ...item, categoryKey: k });
            });
        });
    };

    const getCatName = (key) => {
        const lang = document.documentElement.lang || 'fr';
        return GALLERY_DATA[key] ? (lang === 'en' ? GALLERY_DATA[key].nameEN : GALLERY_DATA[key].name) : key;
    };

    // Generate placeholder items for empty categories
    const getPlaceholders = (catKey, count) => {
        const names = {
            pfw: ["Backstage PFW", "Défilé — SS25", "Front Row", "Coulisses", "Runway", "Street Style"],
            "defile-monteiro": ["Look 1", "Détails Collection", "Backstage", "Runway", "Final Walk", "Ambiance"],
            produit: ["Cosmétique", "Packshot Luxe", "Bijoux", "Texture & Matière", "Lifestyle", "Mise en scène"],
            culinaire: ["Haute Gastronomie", "Pâtisserie Fine", "Plat Signature", "Restaurant", "Ingrédients", "Chef en Action"],
            mode: ["Éditorial I", "Lookbook SS25", "Portrait Mode", "Street Fashion", "Studio N&B", "Campagne"],
            ventes: ["Tirage I", "Tirage II", "Tirage III", "Tirage IV", "Tirage V", "Tirage VI"],
            sport: ["Action", "Portrait Athlète", "Compétition", "Intensité", "Coulisses", "Victory"]
        };
        const titles = names[catKey] || ["Photo 1", "Photo 2", "Photo 3", "Photo 4", "Photo 5", "Photo 6"];
        return titles.slice(0, count).map((t, i) => ({
            src: "placeholder",
            title: t,
            category: catKey,
            categoryKey: catKey,
            tall: i === 0 || i === 4
        }));
    };

    const render = (filter = 'all') => {
        currentFilter = filter;
        gridEl.innerHTML = '';
        gIdx = 0;

        let items;
        if (filter === 'all') {
            items = allItems.length > 0 ? allItems : [];
            // If all empty, show placeholders from each category
            if (items.length === 0) {
                Object.keys(GALLERY_DATA).forEach(k => {
                    items = items.concat(getPlaceholders(k, 2));
                });
            }
        } else {
            const catItems = allItems.filter(i => i.categoryKey === filter);
            items = catItems.length > 0 ? catItems : getPlaceholders(filter, 6);
        }

        lightboxItems = items;

        items.forEach((item, index) => {
            const el = document.createElement('div');
            el.className = 'gallery-item' + (item.tall ? ' tall' : '');
            el.style.animationDelay = (index * 0.05) + 's';
            el.dataset.index = index;

            if (item.src === 'placeholder') {
                el.innerHTML = '<div class="gallery-item-inner gallery-placeholder" style="background:' + getGrad() + '"><div><div style="font-size:28px;margin-bottom:12px;opacity:0.3">◇</div><div>' + item.title + '</div></div></div>';
            } else {
                el.innerHTML = '<div class="gallery-item-inner"><img src="' + item.src + '" alt="' + item.title + '" loading="lazy"><div class="gallery-item-overlay"><div class="gallery-item-info"><div class="gallery-item-title">' + item.title + '</div><div class="gallery-item-category">' + getCatName(item.categoryKey) + '</div></div></div></div>';
                el.addEventListener('click', () => openLightbox(index));
            }
            gridEl.appendChild(el);
        });
    };

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightboxImg');
    const lbTitle = document.getElementById('lightboxTitle');
    const lbCounter = document.getElementById('lightboxCounter');
    let lbIdx = 0;

    const openLightbox = (i) => {
        const item = lightboxItems[i];
        if (!item || item.src === 'placeholder') return;
        lbIdx = i;
        lbImg.src = item.src;
        lbImg.alt = item.title;
        lbTitle.textContent = item.title;
        const realCount = lightboxItems.filter(x => x.src !== 'placeholder').length;
        const realIdx = lightboxItems.slice(0, i + 1).filter(x => x.src !== 'placeholder').length;
        lbCounter.textContent = realIdx + ' / ' + realCount;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    const navLightbox = (dir) => {
        let n = lbIdx + dir;
        while (n >= 0 && n < lightboxItems.length && lightboxItems[n].src === 'placeholder') n += dir;
        if (n >= 0 && n < lightboxItems.length) openLightbox(n);
    };

    const initFilters = () => {
        filtersEl.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                filtersEl.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                render(e.target.dataset.filter);
            }
        });
    };

    const initLightbox = () => {
        document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
        document.getElementById('lightboxPrev').addEventListener('click', () => navLightbox(-1));
        document.getElementById('lightboxNext').addEventListener('click', () => navLightbox(1));
        lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navLightbox(-1);
            if (e.key === 'ArrowRight') navLightbox(1);
        });
    };

    const init = () => {
        buildAll();
        initFilters();
        initLightbox();
        render('all');
    };

    return { init, render, GALLERY_DATA };
})();

document.addEventListener('DOMContentLoaded', GalleryManager.init);
