/* ========================================
   A4 CELEBRATION - COMPLETE JAVASCRIPT
   Black & Golden Theme | Fully Animated
   ======================================== */

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== PRELOADER ==========
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hide');
                setTimeout(() => preloader.style.display = 'none', 500);
            }, 1500);
        });
    }
    
    // ========== NAVBAR SCROLL EFFECT ==========
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ========== MOBILE NAVIGATION TOGGLE ==========
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
    
    // ========== ACTIVE NAVIGATION LINK ==========
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href && (currentPath === href || 
            (currentPath === '/' || currentPath === '/index.html') && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // ========== LOGIN/SIGNUP POPUP ==========
    const loginTrigger = document.querySelectorAll('.login-trigger');
    const authPopup = document.getElementById('authPopup');
    const popupClose = document.querySelector('.auth-popup-close');
    const popupOverlay = document.querySelector('.auth-popup-overlay');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const authForms = document.querySelectorAll('.auth-form');
    
    function openPopup() {
        if (authPopup) authPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closePopup() {
        if (authPopup) authPopup.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    loginTrigger.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            openPopup();
        });
    });
    
    if (popupClose) popupClose.addEventListener('click', closePopup);
    if (popupOverlay) popupOverlay.addEventListener('click', closePopup);
    
    // Tab switching in popup
    if (tabBtns.length) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const tab = btn.dataset.tab;
                authForms.forEach(form => form.classList.remove('active'));
                if (tab === 'login') {
                    document.getElementById('loginFormPopup').classList.add('active');
                } else {
                    document.getElementById('signupFormPopup').classList.add('active');
                }
            });
        });
    }
    
    // Login functionality
    const loginBtn = document.getElementById('popupLoginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            const email = document.getElementById('popupLoginEmail').value;
            const password = document.getElementById('popupLoginPassword').value;
            if (email && password) {
                alert('Login successful! Welcome back to A4 Celebration.');
                closePopup();
                document.getElementById('popupLoginEmail').value = '';
                document.getElementById('popupLoginPassword').value = '';
            } else {
                alert('Please enter email and password.');
            }
        });
    }
    
    // Signup functionality
    const signupBtn = document.getElementById('popupSignupBtn');
    if (signupBtn) {
        signupBtn.addEventListener('click', () => {
            const name = document.getElementById('popupSignupName').value;
            const email = document.getElementById('popupSignupEmail').value;
            const phone = document.getElementById('popupSignupPhone').value;
            const password = document.getElementById('popupSignupPassword').value;
            const confirm = document.getElementById('popupSignupConfirm').value;
            
            if (name && email && phone && password) {
                if (password === confirm) {
                    alert(`Welcome ${name}! Account created successfully.`);
                    closePopup();
                    document.querySelectorAll('#signupFormPopup input').forEach(inp => inp.value = '');
                } else {
                    alert('Passwords do not match!');
                }
            } else {
                alert('Please fill all fields.');
            }
        });
    }
    
    // ========== GSAP ANIMATIONS ==========
    
    // Hero Text Animation
    gsap.from('.hero-badge', {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: 'back.out(1.7)'
    });
    
    gsap.from('.hero-text h1', {
        duration: 1.2,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.3
    });
    
    gsap.from('.tagline, .description', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        delay: 0.6
    });
    
    gsap.from('.hero-buttons .btn-primary, .hero-buttons .btn-outline', {
        duration: 0.6,
        scale: 0,
        opacity: 0,
        stagger: 0.2,
        delay: 1,
        ease: 'back.out(1.2)'
    });
    
    gsap.from('.stat', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        delay: 1.3
    });
    
    // ========== COUNTER ANIMATION ==========
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    let counted = false;
    
    function animateNumbers() {
        if (counted) return;
        
        statNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            if (isNaN(target)) return;
            
            let current = 0;
            const increment = target / 50;
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    if (target === 5.0) {
                        counter.innerText = current.toFixed(1);
                    } else {
                        counter.innerText = Math.floor(current);
                    }
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
        counted = true;
    }
    
    // Trigger counter when stats are in view
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(statsSection);
    }
    
    // ========== SCROLL REVEAL ANIMATIONS ==========
    const animateElements = document.querySelectorAll('.service-card, .gallery-item, .info-item, .stat-circle');
    
    animateElements.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });
    
    // ========== SERVICE CARDS HOVER ANIMATION (GSAP) ==========
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { duration: 0.3, y: -10, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { duration: 0.3, y: 0, ease: 'power2.out' });
        });
    });
    
    // ========== GALLERY SLIDER INITIALIZATION ==========
    if (typeof Swiper !== 'undefined') {
        const gallerySlider = document.querySelector('.gallery-slider');
        if (gallerySlider) {
            new Swiper('.gallery-slider', {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                breakpoints: {
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                }
            });
        }
    }
    
    // ========== REVIEWS SCROLL ANIMATION ==========
    const reviewsScroll = document.querySelector('.reviews-scroll');
    if (reviewsScroll) {
        // Duplicate reviews for seamless scrolling
        const reviews = reviewsScroll.innerHTML;
        reviewsScroll.innerHTML = reviews + reviews;
    }
    
    // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ========== BACK TO TOP BUTTON ==========
    const backBtn = document.createElement('div');
    backBtn.className = 'back-to-top';
    backBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        background: var(--gold);
        color: var(--black);
        width: 45px;
        height: 45px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 99;
        font-size: 20px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(backBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backBtn.style.opacity = '1';
            backBtn.style.visibility = 'visible';
        } else {
            backBtn.style.opacity = '0';
            backBtn.style.visibility = 'hidden';
        }
    });
    
    backBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // ========== FORM SUBMISSION HANDLER ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you! We will contact you within 24 hours.');
            this.reset();
        });
    }
    
    // ========== WHATSAPP CLICK TRACKING ==========
    const whatsappBtn = document.querySelector('.whatsapp-float');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            console.log('WhatsApp clicked - A4 Celebration');
        });
    }
    
    // ========== PARALLAX EFFECT ON HERO ==========
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = scrolled * 0.3 + 'px';
        });
    }
    
    // ========== TYPEWRITER EFFECT FOR TAGLINE (OPTIONAL) ==========
    const taglineElement = document.querySelector('.tagline');
    if (taglineElement && taglineElement.innerText === 'Making Your Moments Memorable') {
        const originalText = taglineElement.innerText;
        taglineElement.innerText = '';
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                taglineElement.innerText += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        }
        setTimeout(typeWriter, 1500);
    }
    
    // ========== PREVENT FORM SUBMIT ON ENTER ==========
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
            }
        });
    });
    
    // ========== CONSOLE LOG ==========
    console.log('A4 Celebration - Fully Loaded! 🎉✨');
});