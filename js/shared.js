
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (header) header.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });

const menu = document.getElementById('mobileMenu');
const openBtn = document.getElementById('menuToggle');
const closeBtn = document.getElementById('menuClose');
const setMenu = (state) => {
  if (!menu) return;
  menu.classList.toggle('open', state);
  document.body.style.overflow = state ? 'hidden' : '';
};
if (openBtn) openBtn.addEventListener('click', () => setMenu(true));
if (closeBtn) closeBtn.addEventListener('click', () => setMenu(false));
document.querySelectorAll('.mobile-nav-link').forEach(link => link.addEventListener('click', () => setMenu(false)));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Portfolio filters
const filterButtons = document.querySelectorAll('[data-filter]');
const filterItems = document.querySelectorAll('[data-category]');
filterButtons.forEach(btn => btn.addEventListener('click', () => {
  const value = btn.dataset.filter;
  const wasActive = btn.classList.contains('active');
  filterButtons.forEach(b => b.classList.remove('active'));
  if (wasActive) {
    filterItems.forEach(item => item.style.display = '');
  } else {
    btn.classList.add('active');
    filterItems.forEach(item => {
      const show = value === 'all' || item.dataset.category.split(' ').includes(value);
      item.style.display = show ? '' : 'none';
    });
  }
}));

// Portfolio modal
const modal = document.getElementById('portfolioModal');
if (modal) {
  const modalImage = modal.querySelector('[data-modal-image]');
  const modalTitle = modal.querySelector('[data-modal-title]');
  const modalCategory = modal.querySelector('[data-modal-category]');
  const modalText = modal.querySelector('[data-modal-text]');
  const modalDetails = modal.querySelector('[data-modal-details]');
  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };
  document.querySelectorAll('[data-modal-trigger]').forEach(card => {
    card.addEventListener('click', () => {
      modalImage.src = card.dataset.image;
      modalImage.alt = card.dataset.title;
      modalTitle.textContent = card.dataset.title;
      modalCategory.textContent = card.dataset.categoryLabel;
      modalText.textContent = card.dataset.text;
      modalDetails.innerHTML = '';
      (card.dataset.details || '').split('|').filter(Boolean).forEach(detail => {
        const row = document.createElement('span');
        row.textContent = detail;
        modalDetails.appendChild(row);
      });
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  modal.querySelectorAll('[data-modal-close]').forEach(el => el.addEventListener('click', closeModal));
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
}

// Client gallery selection
let selectionCount = 0;
const selectionCounter = document.querySelector('[data-selection-count]');
document.querySelectorAll('.gallery-tile button').forEach(btn => {
  btn.addEventListener('click', () => {
    const tile = btn.closest('.gallery-tile');
    if (!tile) return;
    tile.classList.toggle('selected');
    btn.textContent = tile.classList.contains('selected') ? '✓' : '+';
    selectionCount = document.querySelectorAll('.gallery-tile.selected').length;
    if (selectionCounter) selectionCounter.textContent = `${selectionCount} image${selectionCount > 1 ? 's' : ''}`;
  });
});
