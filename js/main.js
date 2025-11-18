/**
 * Nikhil Pise Portfolio - Main JavaScript
 * Optimized for performance, accessibility, and error handling
 */

'use strict';

/* ========================================
   CONFIGURATION & CONSTANTS
   ======================================== */

const CONFIG = {
    isDevelopment: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
    particlesEnabled: true,
    animationsEnabled: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    scrollThrottle: 16, // ~60fps
    mouseThrottle: 16,
};

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

/**
 * Throttle function to limit execution rate
 * @param {Function} func - Function to throttle
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            return func.apply(this, args);
        }
    };
}

/**
 * Debounce function to delay execution
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Safe DOM query with error handling
 * @param {string} selector - CSS selector
 * @param {Element} context - Context element (default: document)
 * @returns {Element|null} Found element or null
 */
function safeQuery(selector, context = document) {
    try {
        return context.querySelector(selector);
    } catch (error) {
        logError('Query selector failed', { selector, error });
        return null;
    }
}

/**
 * Safe DOM query all with error handling
 * @param {string} selector - CSS selector
 * @param {Element} context - Context element (default: document)
 * @returns {NodeList|Array} Found elements or empty array
 */
function safeQueryAll(selector, context = document) {
    try {
        return context.querySelectorAll(selector);
    } catch (error) {
        logError('Query selector all failed', { selector, error });
        return [];
    }
}

/**
 * Log error messages (development only)
 * @param {string} message - Error message
 * @param {Object} data - Additional data
 */
function logError(message, data = {}) {
    if (CONFIG.isDevelopment) {
        console.error(`[Portfolio Error] ${message}`, data);
    }
    // In production, you could send to error tracking service
    // Example: Sentry.captureException(new Error(message));
}

/**
 * Log info messages (development only)
 * @param {string} message - Info message
 * @param {Object} data - Additional data
 */
function logInfo(message, data = {}) {
    if (CONFIG.isDevelopment) {
        console.log(`[Portfolio Info] ${message}`, data);
    }
}

/* ========================================
   MOBILE MENU
   ======================================== */

class MobileMenu {
    constructor() {
        this.menuToggle = safeQuery('#menu-toggle');
        this.mobileMenu = safeQuery('#mobile-menu');
        this.isOpen = false;

        if (this.menuToggle && this.mobileMenu) {
            this.init();
        } else {
            logError('Mobile menu elements not found', {
                menuToggle: !!this.menuToggle,
                mobileMenu: !!this.mobileMenu
            });
        }
    }

    init() {
        // Add ARIA attributes
        this.menuToggle.setAttribute('aria-label', 'Toggle mobile menu');
        this.menuToggle.setAttribute('aria-expanded', 'false');
        this.menuToggle.setAttribute('aria-controls', 'mobile-menu');

        // Add event listener
        this.menuToggle.addEventListener('click', () => this.toggle());

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        logInfo('Mobile menu initialized');
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.mobileMenu.classList.remove('hidden');
        this.menuToggle.setAttribute('aria-expanded', 'true');
        this.isOpen = true;
        logInfo('Mobile menu opened');
    }

    close() {
        this.mobileMenu.classList.add('hidden');
        this.menuToggle.setAttribute('aria-expanded', 'false');
        this.isOpen = false;
        logInfo('Mobile menu closed');
    }
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */

class SmoothScroll {
    constructor() {
        this.links = safeQueryAll('a[href^="#"]');
        this.mobileMenu = safeQuery('#mobile-menu');

        if (this.links.length > 0) {
            this.init();
        }
    }

    init() {
        // Use event delegation for better performance
        document.addEventListener('click', (e) => {
            const anchor = e.target.closest('a[href^="#"]');

            if (!anchor) return;

            const href = anchor.getAttribute('href');
            if (!href || href === '#') return;

            const target = safeQuery(href);

            if (target) {
                e.preventDefault();
                this.scrollTo(target);

                // Close mobile menu if open
                if (this.mobileMenu && !this.mobileMenu.classList.contains('hidden')) {
                    this.mobileMenu.classList.add('hidden');
                }

                // Focus the target for accessibility
                target.setAttribute('tabindex', '-1');
                target.focus();
            }
        });

        logInfo('Smooth scroll initialized', { linkCount: this.links.length });
    }

    scrollTo(element) {
        try {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } catch (error) {
            // Fallback for older browsers
            element.scrollIntoView();
            logError('Smooth scroll failed, using fallback', { error });
        }
    }
}

/* ========================================
   PARTICLES BACKGROUND
   ======================================== */

class ParticlesBackground {
    constructor() {
        this.container = safeQuery('#particles-js');
        this.initialized = false;
    }

    init() {
        if (!this.container) {
            logError('Particles container not found');
            return;
        }

        if (!window.particlesJS) {
            logError('particlesJS library not loaded');
            return;
        }

        if (!CONFIG.particlesEnabled || !CONFIG.animationsEnabled) {
            logInfo('Particles disabled by configuration');
            return;
        }

        try {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: "#00dbde"
                    },
                    shape: {
                        type: "circle",
                        stroke: {
                            width: 0,
                            color: "#000000"
                        }
                    },
                    opacity: {
                        value: 0.3,
                        random: false,
                        anim: {
                            enable: false,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: false,
                            speed: 40,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#00dbde",
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "none",
                        random: false,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: {
                            enable: true,
                            mode: "grab"
                        },
                        onclick: {
                            enable: true,
                            mode: "push"
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            line_linked: {
                                opacity: 0.5
                            }
                        },
                        push: {
                            particles_nb: 4
                        }
                    }
                },
                retina_detect: true
            });

            this.initialized = true;
            logInfo('Particles initialized successfully');
        } catch (error) {
            logError('Failed to initialize particles', { error });
        }
    }
}

/* ========================================
   SCROLL REVEAL ANIMATION
   ======================================== */

class ScrollReveal {
    constructor() {
        this.elements = safeQueryAll('.card-hover, .book, .timeline-item');
        this.observer = null;

        if (this.elements.length > 0 && CONFIG.animationsEnabled) {
            this.init();
        }
    }

    init() {
        // Use Intersection Observer for better performance
        const options = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        try {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        // Optionally unobserve after revealing
                        // this.observer.unobserve(entry.target);
                    } else {
                        // Remove class when scrolling back up for re-animation
                        entry.target.classList.remove('revealed');
                    }
                });
            }, options);

            // Add reveal class and observe each element
            this.elements.forEach(element => {
                element.classList.add('reveal');
                this.observer.observe(element);
            });

            logInfo('Scroll reveal initialized', { elementCount: this.elements.length });
        } catch (error) {
            logError('IntersectionObserver not supported, using fallback', { error });
            this.fallbackInit();
        }
    }

    fallbackInit() {
        // Fallback for browsers without IntersectionObserver
        const checkVisibility = () => {
            this.elements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight - 100;

                if (isVisible) {
                    element.classList.add('revealed');
                } else {
                    element.classList.remove('revealed');
                }
            });
        };

        // Throttle scroll event
        const throttledCheck = throttle(checkVisibility, CONFIG.scrollThrottle);
        window.addEventListener('scroll', throttledCheck, { passive: true });

        // Initial check
        checkVisibility();
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

/* ========================================
   3D CARD TILT EFFECT
   ======================================== */

class CardTilt {
    constructor() {
        this.cards = safeQueryAll('.card-hover');

        if (this.cards.length > 0 && CONFIG.animationsEnabled) {
            this.init();
        }
    }

    init() {
        this.cards.forEach(card => {
            // Use throttled mousemove for performance
            const handleMouseMove = throttle((e) => {
                this.tilt(card, e);
            }, CONFIG.mouseThrottle);

            const handleTouchMove = throttle((e) => {
                if (e.touches.length > 0) {
                    this.tilt(card, e.touches[0]);
                }
            }, CONFIG.mouseThrottle);

            // Mouse events
            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'none';
            });
            card.addEventListener('mouseleave', () => {
                this.resetTilt(card);
            });

            // Touch events for mobile
            card.addEventListener('touchmove', handleTouchMove, { passive: true });
            card.addEventListener('touchend', () => {
                this.resetTilt(card);
            });
        });

        logInfo('Card tilt initialized', { cardCount: this.cards.length });
    }

    tilt(card, event) {
        // Use clientX/Y instead of pageX/Y for correct calculation with scroll
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate rotation based on distance from center
        const xAxis = (centerY - event.clientY) / 25;
        const yAxis = (event.clientX - centerX) / 25;

        // Use requestAnimationFrame for smooth updates
        requestAnimationFrame(() => {
            card.style.transform = `rotateX(${xAxis}deg) rotateY(${yAxis}deg)`;
        });
    }

    resetTilt(card) {
        card.style.transition = 'all 0.5s ease';
        requestAnimationFrame(() => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    }
}

/* ========================================
   FLIP CARD ACCESSIBILITY
   ======================================== */

class FlipCard {
    constructor() {
        this.containers = safeQueryAll('.flip-container');

        if (this.containers.length > 0) {
            this.init();
        }
    }

    init() {
        this.containers.forEach(container => {
            // Make keyboard accessible
            container.setAttribute('tabindex', '0');
            container.setAttribute('role', 'button');
            container.setAttribute('aria-label', 'Flip card to see profile photo');

            // Toggle on click/tap for mobile
            container.addEventListener('click', () => {
                container.classList.toggle('flipped');
            });

            // Toggle on Enter/Space for keyboard users
            container.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    container.classList.toggle('flipped');
                }
            });
        });

        logInfo('Flip cards initialized', { cardCount: this.containers.length });
    }
}

/* ========================================
   GLOBAL ERROR HANDLING
   ======================================== */

function initGlobalErrorHandling() {
    // Catch unhandled errors
    window.addEventListener('error', (event) => {
        logError('Unhandled error', {
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            error: event.error
        });
    });

    // Catch unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
        logError('Unhandled promise rejection', {
            reason: event.reason
        });
    });

    logInfo('Global error handling initialized');
}

/* ========================================
   CDN FALLBACK DETECTION
   ======================================== */

function checkDependencies() {
    const dependencies = {
        particlesJS: typeof window.particlesJS !== 'undefined',
        gsap: typeof window.gsap !== 'undefined'
    };

    Object.entries(dependencies).forEach(([name, loaded]) => {
        if (!loaded) {
            logError(`Dependency not loaded: ${name}`);
        }
    });

    return dependencies;
}

/* ========================================
   PERFORMANCE MONITORING
   ======================================== */

function monitorPerformance() {
    if (!CONFIG.isDevelopment) return;

    // Check if Performance API is available
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const timing = window.performance.timing;
                const loadTime = timing.loadEventEnd - timing.navigationStart;
                const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;

                logInfo('Performance metrics', {
                    totalLoadTime: `${loadTime}ms`,
                    domReady: `${domReady}ms`,
                    dns: `${timing.domainLookupEnd - timing.domainLookupStart}ms`,
                    tcp: `${timing.connectEnd - timing.connectStart}ms`,
                    request: `${timing.responseEnd - timing.requestStart}ms`,
                    domParsing: `${timing.domInteractive - timing.responseEnd}ms`
                });
            }, 0);
        });
    }

    // Log memory usage if available
    if (performance.memory) {
        setInterval(() => {
            logInfo('Memory usage', {
                used: `${Math.round(performance.memory.usedJSHeapSize / 1048576)}MB`,
                total: `${Math.round(performance.memory.totalJSHeapSize / 1048576)}MB`,
                limit: `${Math.round(performance.memory.jsHeapSizeLimit / 1048576)}MB`
            });
        }, 30000); // Every 30 seconds
    }
}

/* ========================================
   INITIALIZATION
   ======================================== */

// Store instances for cleanup
const instances = {};

function init() {
    try {
        logInfo('Initializing portfolio', { config: CONFIG });

        // Initialize global error handling first
        initGlobalErrorHandling();

        // Check dependencies
        const deps = checkDependencies();

        // Initialize components
        instances.mobileMenu = new MobileMenu();
        instances.smoothScroll = new SmoothScroll();
        instances.scrollReveal = new ScrollReveal();
        instances.cardTilt = new CardTilt();
        instances.flipCard = new FlipCard();

        // Initialize particles only if dependency is loaded
        if (deps.particlesJS) {
            instances.particles = new ParticlesBackground();
            instances.particles.init();
        }

        // Monitor performance in development
        monitorPerformance();

        logInfo('Portfolio initialization complete');
    } catch (error) {
        logError('Initialization failed', { error });
    }
}

// Cleanup function for SPA scenarios
function cleanup() {
    if (instances.scrollReveal && instances.scrollReveal.destroy) {
        instances.scrollReveal.destroy();
    }
    logInfo('Cleanup complete');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // DOM is already ready
    init();
}

// Expose cleanup function globally
window.portfolioCleanup = cleanup;

// Handle page visibility changes to pause animations when tab is hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        logInfo('Page hidden, pausing animations');
        // You could pause particles here if needed
    } else {
        logInfo('Page visible, resuming animations');
    }
});
