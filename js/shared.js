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
            { src: "assets/photos/defile-monteiro/defile-mars-2025-426.jpg", title: "Collection Monteiro — Look 1",      tall: true  },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-427.jpg", title: "Collection Monteiro — Look 2",      tall: false },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-428.jpg", title: "Collection Monteiro — Look 3",      tall: false },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-429.jpg", title: "Collection Monteiro — Look 4",      tall: true  },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-433.jpg", title: "Collection Monteiro — Détails",     tall: false },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-434.jpg", title: "Collection Monteiro — Runway I",    tall: false },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-435.jpg", title: "Collection Monteiro — Runway II",   tall: true  },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-436.jpg", title: "Collection Monteiro — Runway III",  tall: false },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-437.jpg", title: "Collection Monteiro — Mouvement",   tall: false },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-438.jpg", title: "Collection Monteiro — Silhouette",  tall: true  },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-439.jpg", title: "Collection Monteiro — Matière",     tall: false },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-440.jpg", title: "Collection Monteiro — Look 12",     tall: false },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-441.jpg", title: "Collection Monteiro — Look 13",     tall: true  },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-442.jpg", title: "Collection Monteiro — Backstage I", tall: false },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-443.jpg", title: "Collection Monteiro — Backstage II",tall: false },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-444.jpg", title: "Collection Monteiro — Final Walk",  tall: true  },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-445.jpg", title: "Collection Monteiro — Clap Final",  tall: false },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-446.jpg", title: "Collection Monteiro — Ambiance I",  tall: false },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-447.jpg", title: "Collection Monteiro — Ambiance II", tall: true  },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-448.jpg", title: "Collection Monteiro — Portrait",    tall: false },
            { src: "assets/photos/defile-monteiro/defile-mars-2025-456.jpg", title: "Collection Monteiro — Closing",     tall: false }
        ]
    },

    // ─── PRODUIT ───
    "produit": {
        name: "Produit",
        nameEN: "Product",
        items: [
            { src: "assets/photos/produit/BVLGARI-rose-goldea_AnaisDescomps_AgencyA_0.jpg", title: "Bulgari — Rose Goldea",       tall: false },
            { src: "assets/photos/produit/rouge-a-levre-chanel.jpg",                        title: "Chanel — Rouge à Lèvres",     tall: false },
            { src: "assets/photos/produit/26-01-12_wisky_Anais-Descomps.JPG",               title: "Packshot — Whisky Ambiance",  tall: false }
        ]
    },

    // ─── CULINAIRE ───
    "culinaire": {
        name: "Culinaire",
        nameEN: "Culinary",
        items: [
            { src: "assets/photos/culinaire/AnaisDescomps_AgencyA_Culinaire_0.jpg",    title: "Gastronomie — Mise en scène I",  tall: true  },
            { src: "assets/photos/culinaire/AnaisDescomps_AgencyA_Culinaire_0-9.jpg",  title: "Gastronomie — Mise en scène II", tall: false },
            { src: "assets/photos/culinaire/AnaisDescomps_AgencyA_Culinaire--5.jpg",   title: "Gastronomie — Plat Signature I", tall: false },
            { src: "assets/photos/culinaire/AnaisDescomps_AgencyA_Culinaire--7.jpg",   title: "Gastronomie — Textures",         tall: false },
            { src: "assets/photos/culinaire/AnaisDescomps_AgencyA_Culinaire--8.jpg",   title: "Gastronomie — Plat Signature II",tall: false },
            { src: "assets/photos/culinaire/AnaisDescomps_AgencyA_Culinaire--9.jpg",   title: "Gastronomie — Ambiance",         tall: false },
            { src: "assets/photos/culinaire/AnaisDescomps_AgencyA_Culinaire--10.jpg",  title: "Gastronomie — Détail",           tall: false },
            { src: "assets/photos/culinaire/AnaisDescomps_AgencyA_Culinaire--11.jpg",  title: "Gastronomie — Clôture",          tall: false }
        ]
    },

    // ─── MODE ───
    "mode": {
        name: "Mode",
        nameEN: "Fashion",
        items: [
            { src: "assets/photos/mode/IMG_0108-Modifier.JPG",                               title: "Mode — Portrait I",            tall: true  },
            { src: "assets/photos/mode/IMG_0217-Modifier.JPG",                               title: "Mode — Portrait II",           tall: true  },
            { src: "assets/photos/mode/IMG_0571-Modifier.JPG",                               title: "Mode — Éditorial I",           tall: false },
            { src: "assets/photos/mode/IMG_0578-Modifier.JPG",                               title: "Mode — Éditorial II",          tall: true  },
            { src: "assets/photos/mode/IMG_0583-Modifier.JPG",                               title: "Mode — Lookbook I",            tall: false },
            { src: "assets/photos/mode/IMG_0584-Modifier.JPG",                               title: "Mode — Lookbook II",           tall: true  },
            { src: "assets/photos/mode/IMG_3574.JPG",                                        title: "Mode — Studio",                tall: false },
            { src: "assets/photos/mode/IMG_9548-Modifier.JPG",                               title: "Mode — Campagne I",            tall: true  },
            { src: "assets/photos/mode/IMG_9684-Modifier.JPG",                               title: "Mode — Campagne II",           tall: false },
            { src: "assets/photos/mode/IMG_9801-Modifier.JPG",                               title: "Mode — Série N&B I",           tall: true  },
            { src: "assets/photos/mode/IMG_9816-Modifier.JPG",                               title: "Mode — Série N&B II",          tall: false },
            { src: "assets/photos/mode/2025-11-03_Chaimaa_mannequin_agence_mademoiselle_01.jpg", title: "Chaimaa — Portrait",       tall: true  },
            { src: "assets/photos/mode/2025-11-03_Chaimaa_mannequin_agence_mademoiselle_04.jpg", title: "Chaimaa — Éditorial",      tall: false },
            { src: "assets/photos/mode/2025-11-03_Chaimaa_mannequin_agence_mademoiselle_05.jpg", title: "Chaimaa — Studio",         tall: false },
            { src: "assets/photos/mode/081225_Elfie_AgencyA_Nocollection0-21.jpg",           title: "Elfie — No Collection I",      tall: true  },
            { src: "assets/photos/mode/081225_elfie_agencya_nocollection0-2-2.jpg",          title: "Elfie — No Collection II",     tall: false },
            { src: "assets/photos/mode/081225_elfie_agencya_nocollection0-3-2.jpg",          title: "Elfie — No Collection III",    tall: false },
            { src: "assets/photos/mode/081225_elfie_agencya_nocollection0-4-2.jpg",          title: "Elfie — No Collection IV",     tall: true  }
        ]
    },

    // ─── VENTES (Tirages d'Art) ───
    "ventes": {
        name: "Ventes — Tirages d'Art",
        nameEN: "Art Prints — Sales",
        items: [
            // Ajouter les tirages d'art ici lorsque les fichiers seront disponibles
        ]
    },

    // ─── SPORT ───
    "sport": {
        name: "Sport",
        nameEN: "Sport",
        items: [
            { src: "assets/photos/sport/NM1-28MARS.JPG",              title: "NM1 — Match 28 Mars",           tall: true  },
            { src: "assets/photos/sport/NM1-28MARS-3.JPG",            title: "NM1 — Action I",                tall: false },
            { src: "assets/photos/sport/NM1-28MARS-45.JPG",           title: "NM1 — Action II",               tall: false },
            { src: "assets/photos/sport/NM1-28MARS-46.JPG",           title: "NM1 — Intensité I",             tall: true  },
            { src: "assets/photos/sport/NM1-28MARS-47.JPG",           title: "NM1 — Intensité II",            tall: false },
            { src: "assets/photos/sport/NM1-LEVALLOIS-HAVRE-14.JPG",  title: "NM1 Levallois — Havre I",       tall: false },
            { src: "assets/photos/sport/NM1-LEVALLOIS-HAVRE-15.JPG",  title: "NM1 Levallois — Havre II",      tall: true  },
            { src: "assets/photos/sport/NM1-LEVALLOIS-HAVRE-16.JPG",  title: "NM1 Levallois — Havre III",     tall: false },
            { src: "assets/photos/sport/NM1-LEVALLOIS-HAVRE-26.JPG",  title: "NM1 Levallois — Duel",          tall: false },
            { src: "assets/photos/sport/NM1-LEVALLOIS-HAVRE-27.JPG",  title: "NM1 Levallois — Momentum",      tall: true  },
            { src: "assets/photos/sport/NM1-LEVALLOIS-HAVRE-31.JPG",  title: "NM1 Levallois — Drive",         tall: false },
            { src: "assets/photos/sport/NM1-LEVALLOIS-HAVRE-33.JPG",  title: "NM1 Levallois — Contact",       tall: false },
            { src: "assets/photos/sport/NM1-LEVALLOIS-HAVRE-40.JPG",  title: "NM1 Levallois — Victory",       tall: true  },
            { src: "assets/photos/sport/NM1-LEVALLOIS-HAVRE-42.JPG",  title: "NM1 Levallois — Portrait",      tall: false },
            { src: "assets/photos/sport/NM1-LEVALLOIS-HAVRE-47.JPG",  title: "NM1 Levallois — Célébration",   tall: false },
            { src: "assets/photos/sport/NM1-LEVALLOIS-SCABB-12.jpg",  title: "NM1 Levallois — SCABB I",       tall: true  },
            { src: "assets/photos/sport/NM1-LEVALLOIS-SCABB-13.jpg",  title: "NM1 Levallois — SCABB II",      tall: false },
            { src: "assets/photos/sport/NM1-LEVALLOIS-SCABB-44.jpg",  title: "NM1 Levallois — SCABB III",     tall: false },
            { src: "assets/photos/sport/NM1-LEVALLOIS-SCABB-46.jpg",  title: "NM1 Levallois — SCABB IV",      tall: true  },
            { src: "assets/photos/sport/NM1-LEVALLOIS-SCABB-79.jpg",  title: "NM1 Levallois — SCABB V",       tall: false },
            { src: "assets/photos/sport/NM1-LEVALLOIS-SCABB-115.jpg", title: "NM1 Levallois — SCABB VI",      tall: false }
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

    // Une cover (1re image) par thème non vide — vue "Tous"
    const getCoverItems = () => {
        const covers = [];
        Object.keys(GALLERY_DATA).forEach(k => {
            const cat = GALLERY_DATA[k];
            if (cat.items && cat.items.length > 0) {
                covers.push({ ...cat.items[0], categoryKey: k, isCover: true, tall: false });
            }
        });
        return covers;
    };

    // Active le filtre correspondant et recharge la galerie du thème
    const activateFilter = (catKey) => {
        const btn = filtersEl.querySelector('[data-filter="' + catKey + '"]');
        if (btn) {
            filtersEl.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            render(catKey);
        }
    };

    const render = (filter = 'all') => {
        currentFilter = filter;
        gridEl.innerHTML = '';
        gIdx = 0;

        let items;
        if (filter === 'all') {
            // Vue "Tous" : une seule cover par thème
            items = getCoverItems();
            lightboxItems = []; // pas de lightbox en vue covers
        } else {
            // Vue filtrée : toutes les photos du thème
            const catItems = allItems.filter(i => i.categoryKey === filter);
            items = catItems.length > 0 ? catItems : getPlaceholders(filter, 6);
            lightboxItems = items;
        }

        items.forEach((item, index) => {
            const el = document.createElement('div');

            if (item.isCover) {
                // Cover thème : clic = active le filtre, pas de lightbox
                el.className = 'gallery-item gallery-item--cover';
                el.style.animationDelay = (index * 0.05) + 's';
                const catName = getCatName(item.categoryKey);
                const catCount = GALLERY_DATA[item.categoryKey].items.length;
                el.innerHTML = '<div class="gallery-item-inner">'
                    + '<img src="' + item.src + '" alt="' + catName + '" loading="lazy" onerror="this.closest(\'.gallery-item\').classList.add(\'img-error\');this.style.display=\'none\'">'
                    + '<div class="gallery-item-overlay gallery-cover-overlay"><div class="gallery-item-info">'
                    + '<div class="gallery-cover-label">' + catName + '</div>'
                    + '<div class="gallery-cover-count">' + catCount + ' photo' + (catCount > 1 ? 's' : '') + '</div>'
                    + '</div></div></div>';
                el.addEventListener('click', () => activateFilter(item.categoryKey));

            } else if (item.src === 'placeholder') {
                el.className = 'gallery-item' + (item.tall ? ' tall' : '');
                el.style.animationDelay = (index * 0.05) + 's';
                el.innerHTML = '<div class="gallery-item-inner gallery-placeholder" style="background:' + getGrad() + '"><div><div style="font-size:28px;margin-bottom:12px;opacity:0.3">◇</div><div>' + item.title + '</div></div></div>';

            } else {
                // Photo normale : clic = lightbox
                el.className = 'gallery-item' + (item.tall ? ' tall' : '');
                el.style.animationDelay = (index * 0.05) + 's';
                el.dataset.index = index;
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


/* ============================================
   AGENCY A — Main JavaScript
   Animations, interactions, i18n, form
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Loader ──
    const loader = document.getElementById('loader');
    let loaderHidden = false;

    const hideLoader = () => {
        if (!loader || loaderHidden) return;
        loaderHidden = true;
        loader.classList.add('hidden');
    };

    setTimeout(hideLoader, 2200);
    window.addEventListener('load', () => setTimeout(hideLoader, 300), { once: true });
    setTimeout(hideLoader, 4000);

    // ── Custom Cursor ──
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    if (window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        const animateFollower = () => {
            followerX += (mouseX - followerX) * 0.12;
            followerY += (mouseY - followerY) * 0.12;
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';
            requestAnimationFrame(animateFollower);
        };
        animateFollower();

        // Hover effect on interactive elements
        const interactiveEls = document.querySelectorAll('a, button, .gallery-item, .service-card');
        interactiveEls.forEach(el => {
            el.addEventListener('mouseenter', () => follower.classList.add('hover'));
            el.addEventListener('mouseleave', () => follower.classList.remove('hover'));
        });
    }

    // ── Header scroll effect ──
    const header = document.getElementById('header');
    let lastScroll = 0;

    const handleScroll = () => {
        const scroll = window.scrollY;
        if (scroll > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = scroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ── Mobile menu ──
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ── Scroll animations ──
    const animatedEls = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedEls.forEach(el => observer.observe(el));

    // ── Counter animation ──
    const counters = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                let current = 0;
                const increment = target / 60;
                const duration = 2000;
                const stepTime = duration / 60;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        el.textContent = Math.floor(current);
                        setTimeout(updateCounter, stepTime);
                    } else {
                        el.textContent = target;
                    }
                };

                updateCounter();
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));

    // ── Smooth scroll for anchor links ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ── Booking form ──
    const bookingForm = document.getElementById('bookingForm');
    const submitBtn = document.getElementById('submitBtn');
    const bookingStatus = document.getElementById('bookingStatus');
    const supabaseConfig = window.AGENCY_A_SUPABASE_CONFIG || {};

    const setBookingStatus = (message, isError = false) => {
        if (!bookingStatus) return;
        bookingStatus.textContent = message;
        bookingStatus.style.color = isError ? 'rgba(255, 173, 173, 0.95)' : 'rgba(242, 226, 206, 0.78)';
    };

    const isSupabaseReady = () => Boolean(
        supabaseConfig.url &&
        supabaseConfig.anonKey &&
        !String(supabaseConfig.url).includes('YOUR_SUPABASE_URL') &&
        !String(supabaseConfig.anonKey).includes('YOUR_SUPABASE_ANON_KEY')
    );

    const normalizeServiceLabel = (value) => ({
        mode: 'Shooting Mode & Éditorial',
        produit: 'Photographie Produit',
        event: 'Événementiel & Reportage',
        culinaire: 'Photographie Culinaire',
        sport: 'Photographie Sportive',
        tirage: 'Achat de Tirages',
        autre: 'Autre'
    }[value] || value || 'Non renseigné');

    const uploadAttachments = async (quoteId, files) => {
        if (!files || !files.length) return [];
        const uploaded = [];

        for (const file of Array.from(files)) {
            const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
            const objectPath = `${quoteId}/${Date.now()}-${safeName}`;
            const uploadResponse = await fetch(`${supabaseConfig.url}/storage/v1/object/quote-attachments/${objectPath}`, {
                method: 'POST',
                headers: {
                    apikey: supabaseConfig.anonKey,
                    Authorization: `Bearer ${supabaseConfig.anonKey}`,
                    'x-upsert': 'false',
                    'Content-Type': file.type || 'application/octet-stream'
                },
                body: file
            });

            if (!uploadResponse.ok) {
                const errorText = await uploadResponse.text();
                throw new Error(`Upload impossible pour ${file.name}: ${errorText}`);
            }

            uploaded.push({
                name: file.name,
                path: objectPath,
                size: file.size,
                type: file.type || 'application/octet-stream'
            });
        }

        return uploaded;
    };

    const sendClientNotification = async (quotePayload) => {
        const response = await fetch(`${supabaseConfig.url}/functions/v1/send-quote-notification`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                apikey: supabaseConfig.anonKey,
                Authorization: `Bearer ${supabaseConfig.anonKey}`
            },
            body: JSON.stringify({ quote: quotePayload })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Notification email impossible');
        }
    };

    const resetBookingFields = () => {
        ['bookLastName','bookFirstName','bookProfile','bookEmail','bookService','bookMessage','bookDestination','bookDuration','bookPhotos'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = '';
        });
        const attachmentInput = document.getElementById('bookAttachment');
        if (attachmentInput) attachmentInput.value = '';
    };

    submitBtn.addEventListener('click', async () => {
        const requiredFields = [
            document.getElementById('bookLastName'),
            document.getElementById('bookEmail'),
            document.getElementById('bookService')
        ];

        const invalidFields = requiredFields.filter(el => !el || !String(el.value).trim());
        if (invalidFields.length) {
            invalidFields.forEach(el => {
                el.style.borderColor = 'rgba(192,105,73,0.8)';
                setTimeout(() => { el.style.borderColor = ''; }, 2000);
            });
            setBookingStatus('Merci de compléter les champs obligatoires.', true);
            return;
        }

        if (!isSupabaseReady()) {
            setBookingStatus('Configuration Supabase manquante. Renseignez supabase/config.js avant test.', true);
            return;
        }

        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Envoi en cours…';
        submitBtn.disabled = true;
        setBookingStatus('Transmission du devis en cours…');

        const quoteId = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : `quote-${Date.now()}`;
        const attachmentInput = document.getElementById('bookAttachment');

        const quotePayload = {
            quote_id: quoteId,
            last_name: document.getElementById('bookLastName').value.trim(),
            first_name: document.getElementById('bookFirstName').value.trim(),
            profile: document.getElementById('bookProfile').value || null,
            email: document.getElementById('bookEmail').value.trim(),
            service: document.getElementById('bookService').value || null,
            service_label: normalizeServiceLabel(document.getElementById('bookService').value),
            description: document.getElementById('bookMessage').value.trim(),
            destination: document.getElementById('bookDestination').value.trim() || null,
            duration: document.getElementById('bookDuration').value || null,
            photos_requested: document.getElementById('bookPhotos').value || null,
            attachments: []
        };

        try {
            if (attachmentInput && attachmentInput.files && attachmentInput.files.length) {
                quotePayload.attachments = await uploadAttachments(quoteId, attachmentInput.files);
            }

            const insertResponse = await fetch(`${supabaseConfig.url}/rest/v1/quotes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    apikey: supabaseConfig.anonKey,
                    Authorization: `Bearer ${supabaseConfig.anonKey}`,
                    Prefer: 'return=representation'
                },
                body: JSON.stringify(quotePayload)
            });

            if (!insertResponse.ok) {
                const errorText = await insertResponse.text();
                throw new Error(errorText || 'Insertion Supabase impossible');
            }

            const [savedQuote] = await insertResponse.json();

            try {
                await sendClientNotification(savedQuote || quotePayload);
            } catch (emailError) {
                console.warn('Notification email non envoyée :', emailError);
            }

            submitBtn.textContent = '✓ Demande envoyée';
            submitBtn.style.background = '#183749';
            submitBtn.style.borderColor = '#183749';
            setBookingStatus('Votre devis a bien été transmis.');
            resetBookingFields();

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.style.borderColor = '';
                submitBtn.disabled = false;
                setBookingStatus('');
            }, 3500);
        } catch (error) {
            console.error('Booking request submission failed:', error);
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            submitBtn.style.borderColor = '';
            setBookingStatus('Envoi impossible pour le moment. Vérifiez la configuration Supabase.', true);
        }
    });

    // ── Language Toggle (FR/EN) ──
    const langToggle = document.getElementById('langToggle');
    let currentLang = 'fr';

    const translations = {
        en: {
            nav_home: "Home",
            nav_about: "About",
            nav_portfolio: "Portfolio",
            nav_services: "Services",
            nav_booking: "Book",
            nav_contact: "Contact",
            hero_overline: "Commercial & editorial photographer",
            hero_cta: "Discover the portfolio",
            hero_cta2: "Book a shooting",
            hero_scroll: "Scroll",
            about_label: "01 — About",
            about_title1: "A photograph",
            about_title2: "can become",
            about_title3: "a signature.",
            about_text1: "AGENCY A was born from a gaze. That of Anaïs, fascinated by the ability of an image to reveal a presence, an attitude, an identity.",
            about_text2: "Exploring the world of fashion and creation, one thing became clear: every project deserves a strong artistic direction, capable of highlighting the talent and uniqueness of those who create.",
            about_text3: "Every shoot is conceived as a collaboration. An exchange of perspectives, inspirations and expertise, where light, movement and attitude become elements of a visual narrative.",
            stat_projects: "Projects completed",
            stat_categories: "Areas of expertise",
            stat_years: "Years of experience",
            portfolio_label: "02 — Portfolio",
            portfolio_title: "Works",
            portfolio_cta: "Let's discuss your project",
            filter_all: "All",
            filter_pfw: "Paris Fashion Week",
            filter_product: "Product",
            filter_culinary: "Culinary",
            filter_fashion: "Fashion",
            filter_sales: "Prints",
            filter_sport: "Sport",
            services_label: "03 — Services",
            services_title: "What we create",
            service1_name: "Fashion & Editorial Shooting",
            service1_desc: "Complete art direction for your fashion campaigns, lookbooks and editorials. From moodboard to final delivery.",
            service2_name: "Product Photography",
            service2_desc: "Meticulous staging to showcase your products. Packshot, ambiance, lifestyle.",
            service3_name: "Events & Reporting",
            service3_desc: "Photo coverage of your events, fashion shows, fashion weeks and launch parties.",
            service4_name: "Culinary Photography",
            service4_desc: "Elegant and appetizing images for restaurants, chefs and food brands.",
            service5_name: "Sport Photography",
            service5_desc: "Capturing the intensity, movement and emotion of sport in powerful images.",
            service6_name: "Art Prints",
            service6_desc: "A curated selection of limited edition art prints, available in various formats.",
            testimonials_label: "04 — They trusted us",
            booking_label: "05 — Book",
            booking_title1: "Let's create",
            booking_title2: "your next",
            booking_title3: "visual project.",
            booking_text: "Fill out the form below to book a slot or request a personalized quote. I'll get back to you within 24 hours.",
            form_name: "Last name",
            form_firstname: "First name",
            form_profile: "Profile",
            form_email: "Email",
            form_service: "Service type",
            form_select: "Select",
            form_other: "Other",
            form_description: "Describe your project",
            form_destination: "Photo destination",
            form_duration: "Shooting duration",
            form_photos: "Number of photos",
            form_attachment: "Attachments (optional)",
            form_submit: "Send request",
            footer_tagline: "Bringing to life the images that tell your story.",
            footer_nav: "Navigation",
            footer_social: "Social",
            footer_credit: "Website by <a href='https://dam-company.vercel.app' target='_blank' rel='noopener'>DamCompany</a>",
            nav_mannequins: "Models",
        }
    };

    const translatePage = (lang) => {
        if (lang === 'fr') {
            // Reset to original French content
            document.querySelectorAll('[data-i18n]').forEach(el => {
                if (el.dataset.originalText) {
                    if (el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA') {
                        el.placeholder = el.dataset.originalText;
                    } else {
                        el.innerHTML = el.dataset.originalText;
                    }
                }
            });
            document.documentElement.lang = 'fr';
            langToggle.textContent = 'EN';
        } else if (lang === 'en' && translations.en) {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.dataset.i18n;
                if (!el.dataset.originalText) {
                    el.dataset.originalText = el.innerHTML;
                }
                if (translations.en[key]) {
                    el.innerHTML = translations.en[key];
                }
            });
            document.documentElement.lang = 'en';
            langToggle.textContent = 'FR';
        }
    };

    // Store original texts
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.dataset.originalText = el.innerHTML;
    });

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'fr' ? 'en' : 'fr';
        translatePage(currentLang);
    });

    // ── Parallax on scroll (subtle) ──
    const heroPortrait = document.querySelector('.hero-portrait-frame');
    if (heroPortrait && window.matchMedia('(min-width: 1024px)').matches) {
        window.addEventListener('scroll', () => {
            const scroll = window.scrollY;
            if (scroll < window.innerHeight) {
                heroPortrait.style.transform = `translateY(${scroll * 0.08}px)`;
            }
        }, { passive: true });
    }

});
