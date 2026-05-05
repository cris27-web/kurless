document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav__toggle');
    const navList = document.querySelector('.nav__list');
    let navOverlay = document.querySelector('.nav-overlay');

    if (navToggle && navList) {
        if (!navOverlay) {
            navOverlay = document.createElement('div');
            navOverlay.className = 'nav-overlay';
            document.body.appendChild(navOverlay);
        }

        const closeMenu = () => {
            navList.classList.remove('nav__list--open');
            navOverlay.classList.remove('nav-overlay--active');
            navToggle.setAttribute('aria-expanded', 'false');
        };

        navToggle.addEventListener('click', () => {
            const isOpen = navList.classList.toggle('nav__list--open');
            navOverlay.classList.toggle('nav-overlay--active', isOpen);
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });

        navOverlay.addEventListener('click', closeMenu);
        navList.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeMenu();
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (event) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (!target) {
                return;
            }

            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    const contactForm = document.querySelector('.contact-section__form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            const email = contactForm.querySelector('input[type="email"]');
            const message = contactForm.querySelector('textarea[required]');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if ((email && !emailPattern.test(email.value.trim())) || (message && !message.value.trim())) {
                event.preventDefault();
                alert('Please add a valid email and message before sending.');
            }
        });
    }
});
