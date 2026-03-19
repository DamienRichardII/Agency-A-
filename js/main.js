/* ============================================
   AGENCY A — Main JavaScript
   Animations, interactions, i18n, form
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Loader ──
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 2200);

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
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(bookingForm);
        const data = Object.fromEntries(formData);

        // Simulate submission
        const btn = bookingForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Envoi en cours...';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = '✓ Demande envoyée';
            btn.style.background = '#2a6e4e';
            btn.style.borderColor = '#2a6e4e';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.disabled = false;
                bookingForm.reset();
            }, 3000);
        }, 1500);

        console.log('Booking request:', data);
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
            form_name: "Full name",
            form_email: "Email",
            form_service: "Service type",
            form_select: "Select",
            form_other: "Other",
            form_date: "Preferred date",
            form_message: "Describe your project",
            form_submit: "Send request",
            footer_tagline: "Bringing to life the images that tell your story.",
            footer_nav: "Navigation",
            footer_social: "Social",
            footer_credit: "Website by <a href='https://dam-company.vercel.app' target='_blank' rel='noopener'>DamCompany</a>",
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
