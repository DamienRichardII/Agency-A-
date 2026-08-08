// media-loader.js — Agency A
// Charge dynamiquement les médias depuis Supabase et remplace les images sur le site public.
// Fallback transparent sur les assets locaux si Supabase est indisponible.
// À charger après supabase/config.js et js/supabase-client.js sur chaque page concernée.

(function () {
  'use strict';

  // ── Mapping URL → page ID ─────────────────────────────────────
  const PAGE_MAP = {
    'index.html':                    'accueil',
    '':                              'accueil',
    'a-propos.html':                 'a-propos',
    'portfolio.html':                'portfolio',
    'collaborateurs-partenaires.html': 'collaborateurs',
    'boutique.html':                 'boutique',
    'humanitaire.html':              'humanitaire',
    'tarifs.html':                   'tarifs',
    'contact.html':                  'contact',
  };

  const filename = window.location.pathname.split('/').pop() || '';
  const pageId   = PAGE_MAP[filename];

  // Ne rien faire si la page n'est pas mappée ou si Supabase n'est pas chargé
  if (!pageId || !window.sb) return;

  // ── Charger les médias de la page ─────────────────────────────
  async function loadPageMedia() {
    try {
      const { data, error } = await window.sb
        .from('site_media')
        .select('slot, section, public_url, alt_text, caption, description, object_position')
        .eq('page', pageId)
        .not('public_url', 'is', null); // Uniquement si un remplacement Supabase existe

      if (error || !data || data.length === 0) return;

      data.forEach(applyMedia);

    } catch (err) {
      // Échec silencieux — les images locales restent affichées
      console.warn('[media-loader] Supabase indisponible, fallback local actif.', err);
    }
  }

  // ── Appliquer un média à son slot ─────────────────────────────
  function applyMedia(record) {
    if (!record.public_url) return;

    const selector = `[data-media-slot="${pageId}:${record.section}:${record.slot}"]`;
    const elements = document.querySelectorAll(selector);

    elements.forEach(el => {
      const tag = el.tagName.toLowerCase();

      if (tag === 'img') {
        // Image classique
        el.src = record.public_url;
        if (record.alt_text) el.alt = record.alt_text;
        if (record.object_position) el.style.objectPosition = record.object_position;
        el.onerror = function () {
          // Fallback : restaurer le src local original
          const fallback = el.dataset.mediaSrcFallback;
          if (fallback) { el.src = fallback; el.onerror = null; }
        };

      } else {
        // Background-image (div, section, etc.)
        el.style.backgroundImage = `url('${record.public_url}')`;
        if (record.object_position) el.style.backgroundPosition = record.object_position;
      }

      // Caption visible (data-media-caption) — si un élément frère porte cet attribut
      const captionEl = document.querySelector(`[data-media-caption="${pageId}:${record.section}:${record.slot}"]`);
      if (captionEl && record.caption) captionEl.textContent = record.caption;

      // ALT text sur <figcaption> associé
      const figcaption = el.closest('figure')?.querySelector('figcaption');
      if (figcaption && record.caption) figcaption.textContent = record.caption;
    });
  }

  // ── Lancer au chargement du DOM ───────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadPageMedia);
  } else {
    loadPageMedia();
  }

})();
