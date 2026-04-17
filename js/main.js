document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('mainNav');

    if (!toggle || !nav) {
        return;
    }

    toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            nav.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
});
