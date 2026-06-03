// forms.js — Agency A
// Soumission des formulaires vers le backend API
// Commun à contact.html, mannequins.html, collaborateurs-partenaires.html

const FormsAPI = {

  // ── Soumission générique ──────────────────────────────
  async submit(endpoint, payload, btnEl, feedbackEl) {
    const apiUrl = window.AGENCY_A_API_URL || '';
    btnEl.disabled = true;
    btnEl.dataset.originalText = btnEl.dataset.originalText || btnEl.textContent;
    btnEl.textContent = 'Envoi en cours…';
    feedbackEl.style.display = 'none';
    feedbackEl.className = 'form-feedback';

    try {
      const res = await fetch(`${apiUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok || !data.success) throw new Error(data.error || 'Erreur.');

      FormsAPI.showSuccess(feedbackEl, 'Votre message a bien été envoyé. Nous reviendrons vers vous rapidement.');
      return true;

    } catch (err) {
      FormsAPI.showError(feedbackEl, err.message || 'Une erreur est survenue. Réessayez ou contactez-nous directement.');
      return false;
    } finally {
      btnEl.disabled = false;
      btnEl.textContent = btnEl.dataset.originalText;
    }
  },

  showSuccess(el, msg) {
    el.textContent = msg;
    el.className = 'form-feedback form-feedback--ok';
    el.style.display = 'block';
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  },

  showError(el, msg) {
    el.textContent = msg;
    el.className = 'form-feedback form-feedback--err';
    el.style.display = 'block';
  },

  // ── Collecte des champs d'un formulaire ──────────────
  collect(formEl) {
    const data = {};
    formEl.querySelectorAll('input, select, textarea').forEach(el => {
      if (el.name) data[el.name] = el.value.trim();
    });
    return data;
  },
};
