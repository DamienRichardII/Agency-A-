// content-loader.js — Agency A
// Charge les textes éditables depuis Supabase et les injecte dans la page.
// Usage : <span data-content-key="accueil.hero.titre">Texte de secours</span>
// Si Supabase est indisponible, le texte hardcodé dans l'HTML reste affiché.

(async function () {
  if (!window.sb) return;

  // Récupère tous les éléments à remplir sur cette page
  const els = document.querySelectorAll('[data-content-key]');
  if (!els.length) return;

  const keys = Array.from(els).map(el => el.dataset.contentKey);

  try {
    const { data, error } = await window.sb
      .from('site_content')
      .select('key, value')
      .in('key', keys);

    if (error || !data) return;

    const map = {};
    data.forEach(row => { map[row.key] = row.value; });

    els.forEach(el => {
      const val = map[el.dataset.contentKey];
      if (val && val.trim()) {
        // Préserve les sauts de ligne des textareas → <br>
        if (el.dataset.contentHtml === 'true') {
          el.innerHTML = val.replace(/\n/g, '<br>');
        } else {
          el.textContent = val;
        }
      }
    });
  } catch (_) {
    // Silencieux : le texte de secours HTML reste visible
  }
})();
