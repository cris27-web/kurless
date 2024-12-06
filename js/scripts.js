// js/scripts.js

document.addEventListener('DOMContentLoaded', () => {
    /* ================================
       Navigation Toggle Enhancements
    ================================ */
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('nav ul');
    const navOverlay = document.createElement('div');

    // Create an overlay for clicking outside the menu
    if (navToggle) {
        navOverlay.classList.add('nav-overlay');
        document.body.appendChild(navOverlay);

        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-open');
            navOverlay.classList.toggle('active');
        });

        // Close the menu when clicking outside
        navOverlay.addEventListener('click', () => {
            navLinks.classList.remove('nav-open');
            navOverlay.classList.remove('active');
        });

        // Close the menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-open');
                navOverlay.classList.remove('active');
            });
        });
    }

    /* ================================
       Smooth Scrolling for Internal Links
    ================================ */
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header height
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ================================
       Scroll-to-Top Button
    ================================ 
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scrollToTopBtn';
    scrollTopBtn.innerHTML = '↑';
    document.body.appendChild(scrollTopBtn);

    scrollTopBtn.style.position = 'fixed';
    scrollTopBtn.style.bottom = '40px';
    scrollTopBtn.style.right = '40px';
    scrollTopBtn.style.padding = '10px 15px';
    scrollTopBtn.style.fontSize = '1.5rem';
    scrollTopBtn.style.backgroundColor = 'var(--primary-color)';
    scrollTopBtn.style.color = '#fff';
    scrollTopBtn.style.border = 'none';
    scrollTopBtn.style.borderRadius = '50%';
    scrollTopBtn.style.cursor = 'pointer';
    scrollTopBtn.style.display = 'none';
    scrollTopBtn.style.zIndex = '1000';
    scrollTopBtn.style.transition = 'opacity 0.3s';

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = 'block';
            scrollTopBtn.style.opacity = '1';
        } else {
            scrollTopBtn.style.opacity = '0';
            setTimeout(() => {
                scrollTopBtn.style.display = 'none';
            }, 300);
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }); */
	 

    /* ================================
       Hero Section Carousel
    ================================ */
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroSlides = [
            {
                image: '...\assets\images\Sculpt1.png',
                title: 'Welcome to Our Store',
                subtitle: 'Discover the best products here!'
            },
            {
                image: '../assets/images/Sculpt2.png',
                title: 'Summer Sale',
                subtitle: 'Up to 50% off on selected items.'
            },
            {
                image: '../assets/images/Sculpt3.png',
                title: 'New Arrivals',
                subtitle: 'Check out the latest products.'
            }
        ];

        let currentSlide = 0;

        const updateHero = () => {
            const slide = heroSlides[currentSlide];
            hero.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${slide.image}')`;
            const title = hero.querySelector('h2');
            const subtitle = hero.querySelector('p');
            if (title && subtitle) {
                title.textContent = slide.title;
                subtitle.textContent = slide.subtitle;
            }
        };

        // Initialize first slide
        updateHero();

        // Change slide every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % heroSlides.length;
            updateHero();
        }, 5000);
    }

    /* ================================
       Form Validation for Contact Form
    ================================ */
    const contactForm = document.querySelector('.contact-section form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            const name = contactForm.querySelector('input[name="name"]');
            const email = contactForm.querySelector('input[name="email"]');
            const message = contactForm.querySelector('textarea[name="message"]');
            let valid = true;

            // Simple validation
            if (!name.value.trim()) {
                valid = false;
                name.style.borderColor = 'red';
            } else {
                name.style.borderColor = '#ccc';
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailPattern.test(email.value)) {
                valid = false;
                email.style.borderColor = 'red';
            } else {
                email.style.borderColor = '#ccc';
            }

            if (!message.value.trim()) {
                valid = false;
                message.style.borderColor = 'red';
            } else {
                message.style.borderColor = '#ccc';
            }

            if (!valid) {
                e.preventDefault();
                alert('Please fill out the form correctly.');
            }
        });
    }

    /* ================================
       Product Modal for Detailed View
    ================================ */
    const buyButtons = document.querySelectorAll('.buy-button');
    if (buyButtons.length > 0) {
        const modal = document.createElement('div');
        modal.id = 'productModal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <img src="" alt="Product Image" class="modal-image">
                <h3 class="modal-title"></h3>
                <p class="modal-price"></p>
                <p class="modal-description"></p>
                <button class="modal-buy-button">Buy Now</button>
            </div>
        `;
        document.body.appendChild(modal);

        // Modal styles
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            #productModal {
                display: none;
                position: fixed;
                z-index: 2000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: auto;
                background-color: rgba(0, 0, 0, 0.5);
                justify-content: center;
                align-items: center;
            }
            #productModal .modal-content {
                background-color: #fff;
                padding: 20px;
                border-radius: 10px;
                width: 90%;
                max-width: 600px;
                position: relative;
                text-align: center;
            }
            #productModal .modal-close {
                position: absolute;
                top: 10px;
                right: 15px;
                font-size: 1.5rem;
                cursor: pointer;
            }
            #productModal .modal-image {
                width: 100%;
                height: auto;
                border-radius: 10px;
                margin-bottom: 20px;
            }
            #productModal .modal-buy-button {
                padding: 10px 20px;
                background-color: var(--primary-color);
                color: #fff;
                border: none;
                border-radius: 25px;
                cursor: pointer;
                transition: background-color 0.3s;
            }
            #productModal .modal-buy-button:hover {
                background-color: var(--accent-color);
            }
        `;
        document.head.appendChild(modalStyle);

        buyButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productCard = button.closest('.product-card');
                const imgSrc = productCard.querySelector('img').getAttribute('src');
                const title = productCard.querySelector('h3').textContent;
                const price = productCard.querySelector('p').textContent;
                const description = productCard.getAttribute('data-description') || 'No description available.';

                modal.querySelector('.modal-image').setAttribute('src', imgSrc);
                modal.querySelector('.modal-title').textContent = title;
                modal.querySelector('.modal-price').textContent = price;
                modal.querySelector('.modal-description').textContent = description;

                modal.style.display = 'flex';
            });
        });

        // Close modal functionality
        const modalClose = modal.querySelector('.modal-close');
        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    /* ================================
       Lazy Loading Images
    ================================ */
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '0px 0px 50px 0px',
        threshold: 0.01
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
});


// Navigation Toggle Functionality
document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav__toggle');
    const navList = document.querySelector('.nav__list');
    const navOverlay = document.createElement('div');
    navOverlay.classList.add('nav-overlay');
    document.body.appendChild(navOverlay);

    // Toggle navigation menu and overlay
    navToggle.addEventListener('click', function () {
        navList.classList.toggle('nav__list--open');
        navOverlay.classList.toggle('nav-overlay--active');
    });

    // Close navigation menu when clicking on the overlay
    navOverlay.addEventListener('click', function () {
        navList.classList.remove('nav__list--open');
        navOverlay.classList.remove('nav-overlay--active');
    });

    // Optional: Close navigation menu when a navigation link is clicked (for better UX)
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navList.classList.remove('nav__list--open');
            navOverlay.classList.remove('nav-overlay--active');
        });
    });
});

// Optional: Scroll-to-Top Button Functionality
// document.addEventListener('DOMContentLoaded', function () {
    // const scrollToTopBtn = document.querySelector('.scroll-to-top');

    // Show or hide the button based on scroll position
    // window.addEventListener('scroll', function () {
        // if (window.scrollY > 300) { // Adjust the scroll value as needed
            // scrollToTopBtn.classList.add('scroll-to-top--visible');
            // scrollToTopBtn.classList.remove('scroll-to-top--hidden');
        // } else {
            // scrollToTopBtn.classList.add('scroll-to-top--hidden');
            // scrollToTopBtn.classList.remove('scroll-to-top--visible');
        // }
    // });
    // Scroll smoothly to the top when the button is clicked
    // scrollToTopBtn.addEventListener('click', function () {
        // window.scrollTo({
            // top: 0,
            // behavior: 'smooth'
        // });
    // });
// });
//Notification bar summin
window.addEventListener('load', function() {
    var notificationBar = document.querySelector('.notification-bar');
    var content = document.querySelector('.notification-bar__content');

    // Get the actual widths of the container and the content
    var containerWidth = notificationBar.offsetWidth;
    var contentWidth = content.offsetWidth;

    // Update CSS variables with actual widths
    notificationBar.style.setProperty('--container-width', containerWidth + 'px');
    notificationBar.style.setProperty('--content-width', contentWidth + 'px');
});