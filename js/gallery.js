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
    "pfw": {
        name: "Paris Fashion Week 2025",
        nameEN: "Paris Fashion Week 2025",
        items: [
            { src: "assets/photos/paris-fashion-week/PFW25-11MARS-32.JPG",      title: "Paris Fashion Week — Ouverture",        tall: true  },
            { src: "assets/photos/paris-fashion-week/PFW-25-7mars-71.JPG",      title: "Paris Fashion Week — 7 Mars",           tall: false },
            { src: "assets/photos/paris-fashion-week/PFW25-11MARS-89.JPG",      title: "Paris Fashion Week — Backstage",        tall: false },
            { src: "assets/photos/paris-fashion-week/PFW25-11MARS-90.JPG",      title: "Paris Fashion Week — Défilé I",         tall: true  },
            { src: "assets/photos/paris-fashion-week/PFW25-11MARS-110.JPG",     title: "Paris Fashion Week — Runway",           tall: false },
            { src: "assets/photos/paris-fashion-week/PFW25-11MARS-111.JPG",     title: "Paris Fashion Week — Look 11 Mars",     tall: true  },
            { src: "assets/photos/paris-fashion-week/pfw25-11mars-111-2.jpg",   title: "Paris Fashion Week — Portrait I",       tall: false },
            { src: "assets/photos/paris-fashion-week/pfw25-11mars-112-2.jpg",   title: "Paris Fashion Week — Portrait II",      tall: false },
            { src: "assets/photos/paris-fashion-week/PFW25-11MARS-130.JPG",     title: "Paris Fashion Week — Final Walk",       tall: true  },
            { src: "assets/photos/paris-fashion-week/pfw25-11mars-116-2.jpg",   title: "Paris Fashion Week — Coulisses",        tall: false },
            { src: "assets/photos/paris-fashion-week/pfw25-11mars-126-2.jpg",   title: "Paris Fashion Week — Ambiance",         tall: false },
            { src: "assets/photos/paris-fashion-week/PFW25-11MARS-167.JPG",     title: "Paris Fashion Week — Clôture",          tall: true  },
            { src: "assets/photos/paris-fashion-week/PFW-25-7mars-76.JPG",      title: "Paris Fashion Week — Street Style",     tall: false }
        ]
    },

    // ─── DÉFILÉ MONTEIRO ───
    "defile-monteiro": {
        name: "Défilé Monteiro",
        nameEN: "Monteiro Fashion Show",
        items: [
            { src: "assets/photos/defile-monteiro/defile-mars-2025-426.jpg", title: "Collection Monteiro — Look 1",       tall: true  },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-427.jpg", title: "Collection Monteiro — Look 2",       tall: false },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-428.jpg", title: "Collection Monteiro — Look 3",       tall: false },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-429.jpg", title: "Collection Monteiro — Look 4",       tall: true  },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-433.jpg", title: "Collection Monteiro — Détails",      tall: false },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-434.jpg", title: "Collection Monteiro — Runway I",     tall: false },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-435.jpg", title: "Collection Monteiro — Runway II",    tall: true  },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-436.jpg", title: "Collection Monteiro — Runway III",   tall: false },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-437.jpg", title: "Collection Monteiro — Mouvement",    tall: false },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-438.jpg", title: "Collection Monteiro — Silhouette",   tall: true  },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-439.jpg", title: "Collection Monteiro — Matière",      tall: false },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-440.jpg", title: "Collection Monteiro — Look 12",      tall: false },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-441.jpg", title: "Collection Monteiro — Look 13",      tall: true  },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-442.jpg", title: "Collection Monteiro — Backstage I",  tall: false },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-443.jpg", title: "Collection Monteiro — Backstage II", tall: false },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-444.jpg", title: "Collection Monteiro — Final Walk",   tall: true  },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-445.jpg", title: "Collection Monteiro — Clap Final",   tall: false },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-446.jpg", title: "Collection Monteiro — Ambiance I",   tall: false },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-447.jpg", title: "Collection Monteiro — Ambiance II",  tall: true  },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-448.jpg", title: "Collection Monteiro — Portrait",     tall: false },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-456.jpg", title: "Collection Monteiro — Closing",      tall: false }
        ]
    },

    // ─── PRODUIT ───
    "produit": {
        name: "Produit",
        nameEN: "Product",
        items: [
            { src: "assets/photos/produit/BVLGARI-rose-goldea_AnaisDescomps_AgencyA_0.jpg", title: "Bulgari — Rose Goldea",      tall: false },
            { src: "assets/photos/produit/rouge-a-levre-chanel.jpg",                        title: "Chanel — Rouge à Lèvres",    tall: false },
            { src: "assets/photos/produit/26-01-12_wisky_Anais-Descomps.JPG",               title: "Packshot — Whisky Ambiance", tall: false }
        ]
    },

    // ─── CULINAIRE ───
    "culinaire": {
        name: "Culinaire",
        nameEN: "Culinary",
        items: [
            { src: "assets/photos/culinaire/AnaisDescomps_AgencyA_Culinaire_0.jpg",   title: "Gastronomie — Mise en scène I",   tall: true  },
            { src: "assets/photos/culinaire/AnaisDescomps_AgencyA_Culinaire_0-9.jpg", title: "Gastronomie — Mise en scène II",  tall: false },
            { src: "assets/photos/culinaire/AnaisDescomps_AgencyA_Culinaire--5.jpg",  title: "Gastronomie — Plat Signature I",  tall: false },
            { src: "assets/photos/culinaire/AnaisDescomps_AgencyA_Culinaire--7.jpg",  title: "Gastronomie — Textures",          tall: false },
            { src: "assets/photos/culinaire/AnaisDescomps_AgencyA_Culinaire--8.jpg",  title: "Gastronomie — Plat Signature II", tall: false },
            { src: "assets/photos/culinaire/AnaisDescomps_AgencyA_Culinaire--9.jpg",  title: "Gastronomie — Ambiance",          tall: false },
            { src: "assets/photos/culinaire/AnaisDescomps_AgencyA_Culinaire--10.jpg", title: "Gastronomie — Détail",            tall: false },
            { src: "assets/photos/culinaire/AnaisDescomps_AgencyA_Culinaire--11.jpg", title: "Gastronomie — Clôture",           tall: false }
        ]
    },

    // ─── MODE ───
    "mode": {
        name: "Mode",
        nameEN: "Fashion",
        items: [
            { src: "assets/photos/mode/IMG_0108-Modifier.JPG",                                   title: "Mode — Portrait I",          tall: true  },
            { src: "assets/photos/mode/IMG_0217-Modifier.JPG",                                   title: "Mode — Portrait II",         tall: true  },
            { src: "assets/photos/mode/IMG_0571-Modifier.JPG",                                   title: "Mode — Éditorial I",         tall: false },
            { src: "assets/photos/mode/IMG_0578-Modifier.JPG",                                   title: "Mode — Éditorial II",        tall: true  },
            { src: "assets/photos/mode/IMG_0583-Modifier.JPG",                                   title: "Mode — Lookbook I",          tall: false },
            { src: "assets/photos/mode/IMG_0584-Modifier.JPG",                                   title: "Mode — Lookbook II",         tall: true  },
            { src: "assets/photos/mode/IMG_3574.JPG",                                            title: "Mode — Studio",              tall: false },
            { src: "assets/photos/mode/IMG_9548-Modifier.JPG",                                   title: "Mode — Campagne I",          tall: true  },
            { src: "assets/photos/mode/IMG_9684-Modifier.JPG",                                   title: "Mode — Campagne II",         tall: false },
            { src: "assets/photos/mode/IMG_9801-Modifier.JPG",                                   title: "Mode — Série N&B I",         tall: true  },
            { src: "assets/photos/mode/IMG_9816-Modifier.JPG",                                   title: "Mode — Série N&B II",        tall: false },
            { src: "assets/photos/mode/2025-11-03_Chaimaa_mannequin_agence_mademoiselle_01.jpg", title: "Chaimaa — Portrait",         tall: true  },
            { src: "assets/photos/mode/2025-11-03_Chaimaa_mannequin_agence_mademoiselle_04.jpg", title: "Chaimaa — Éditorial",        tall: false },
            { src: "assets/photos/mode/2025-11-03_Chaimaa_mannequin_agence_mademoiselle_05.jpg", title: "Chaimaa — Studio",           tall: false },
            { src: "assets/photos/mode/081225_Elfie_AgencyA_Nocollection0-21.jpg",               title: "Elfie — No Collection I",    tall: true  },
            { src: "assets/photos/mode/081225_elfie_agencya_nocollection0-2-2.jpg",              title: "Elfie — No Collection II",   tall: false },
            { src: "assets/photos/mode/081225_elfie_agencya_nocollection0-3-2.jpg",              title: "Elfie — No Collection III",  tall: false },
            { src: "assets/photos/mode/081225_elfie_agencya_nocollection0-4-2.jpg",              title: "Elfie — No Collection IV",   tall: true  }
        ]
    },

    // ─── VENTES (Tirages d'Art) ───
    "ventes": {
        name: "Ventes — Tirages d'Art",
        nameEN: "Art Prints — Sales",
        items: [
            // Ajouter les tirages d'art ici lorsque les fichiers seront disponibles
            // { src: "assets/photos/ventes/tirage-01.jpg", title: "Tirage I — Édition limitée", tall: true },
        ]
    },

    // ─── SPORT ───
    "sport": {
        name: "Sport",
        nameEN: "Sport",
        items: [
            { src: "assets/photos/sport/NM1-28MARS.JPG",              title: "NM1 — Match 28 Mars",          tall: true  },
            { src: "assets/photos/sport/NM1-28MARS-3.JPG",            title: "NM1 — Action I",               tall: false },
            { src: "assets/photos/sport/NM1-28MARS-45.JPG",           title: "NM1 — Action II",              tall: false },
            { src: "assets/photos/sport/NM1-28MARS-46.JPG",           title: "NM1 — Intensité I",            tall: true  },
            { src: "assets/photos/sport/NM1-28MARS-47.JPG",           title: "NM1 — Intensité II",           tall: false },
            { src: "assets/photos/sport/NM1-LEVALLOIS-HAVRE-14.JPG",  title: "NM1 Levallois — Havre I",      tall: false },
            { src: "assets/photos/sport/NM1-LEVALLOIS-HAVRE-15.JPG",  title: "NM1 Levallois — Havre II",     tall: true  },
            { src: "assets/photos/sport/NM1-LEVALLOIS-HAVRE-16.JPG",  title: "NM1 Levallois — Havre III",    tall: false },
            { src: "assets/photos/sport/NM1-LEVALLOIS-HAVRE-26.JPG",  title: "NM1 Levallois — Duel",         tall: false },
            { src: "assets/photos/sport/NM1-LEVALLOIS-HAVRE-27.JPG",  title: "NM1 Levallois — Momentum",     tall: true  },
            { src: "assets/photos/sport/NM1-LEVALLOIS-HAVRE-31.JPG",  title: "NM1 Levallois — Drive",        tall: false },
            { src: "assets/photos/sport/NM1-LEVALLOIS-HAVRE-33.JPG",  title: "NM1 Levallois — Contact",      tall: false },
            { src: "assets/photos/sport/NM1-LEVALLOIS-HAVRE-40.JPG",  title: "NM1 Levallois — Victory",      tall: true  },
            { src: "assets/photos/sport/NM1-LEVALLOIS-HAVRE-42.JPG",  title: "NM1 Levallois — Portrait",     tall: false },
            { src: "assets/photos/sport/NM1-LEVALLOIS-HAVRE-47.JPG",  title: "NM1 Levallois — Célébration",  tall: false },
            { src: "assets/photos/sport/NM1-LEVALLOIS-SCABB-12.jpg",  title: "NM1 Levallois — SCABB I",      tall: true  },
            { src: "assets/photos/sport/NM1-LEVALLOIS-SCABB-13.jpg",  title: "NM1 Levallois — SCABB II",     tall: false },
            { src: "assets/photos/sport/NM1-LEVALLOIS-SCABB-44.jpg",  title: "NM1 Levallois — SCABB III",    tall: false },
            { src: "assets/photos/sport/NM1-LEVALLOIS-SCABB-46.jpg",  title: "NM1 Levallois — SCABB IV",     tall: true  },
            { src: "assets/photos/sport/NM1-LEVALLOIS-SCABB-79.jpg",  title: "NM1 Levallois — SCABB V",      tall: false },
            { src: "assets/photos/sport/NM1-LEVALLOIS-SCABB-115.jpg", title: "NM1 Levallois — SCABB VI",     tall: false }
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
                el.innerHTML = '<div class="gallery-item-inner"><img src="' + item.src + '" alt="' + item.title + '" loading="lazy" onerror="this.closest(\'.gallery-item\').classList.add(\'img-error\');this.style.display=\'none\'"><div class="gallery-item-overlay"><div class="gallery-item-info"><div class="gallery-item-title">' + item.title + '</div><div class="gallery-item-category">' + getCatName(item.categoryKey) + '</div></div></div></div>';
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
