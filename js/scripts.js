// Particle.js background initialization
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.toggle('hidden');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Parallax scrolling effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercent = scrollTop / (document.documentElement.scrollHeight - window.innerHeight);
        
        // Parallax for floating elements
        document.querySelectorAll('.floating').forEach((el, index) => {
            const speed = 0.5 + (index * 0.1);
            el.style.transform = `translateY(${scrollTop * speed}px)`;
        });
        
        lastScrollTop = scrollTop;
    });

    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.remove('hidden');
                scrollToTopBtn.classList.add('opacity-100');
            } else {
                scrollToTopBtn.classList.add('hidden');
                scrollToTopBtn.classList.remove('opacity-100');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Loading animation
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }
    
    // Initialize particles if the element exists
    if (document.getElementById('particles-js') && typeof particlesJS !== 'undefined') {
        const particleColor = getComputedStyle(document.documentElement).getPropertyValue('--gradient-start').trim() || '#00dbde';
        
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": particleColor
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": particleColor,
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.5
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.card-hover, .book, .timeline-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animated elements
    document.querySelectorAll('.card-hover, .book, .timeline-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    // Run once on load
    animateOnScroll();
    
    // Then on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // 3D card tilt effect
    const cards = document.querySelectorAll('.card-hover');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xAxis = (rect.width / 2 - x) / 25;
            const yAxis = (rect.height / 2 - y) / 25;
            card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'all 0.5s ease';
            card.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
    });
    
    // GitHub API Integration
    fetchGitHubStats();
    
    // Update visitor count
    updateVisitorCount();
    
    // Contact Form Handler with Web3Forms
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // Inject access key dynamically (obfuscated)
        const accessKey = atob('MmU5ODI4ZmQtYTkxMy00NmM1LWFjZWItMWRhMWNhMzg3NTZm');
        
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Prepare form data and inject access key
            const formData = new FormData(contactForm);
            formData.append('access_key', accessKey);
            
            try {
                // Send to Web3Forms
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.success) {
                    // Show success message
                    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    // Show error message
                    showNotification('Failed to send message. Please try again or email me directly.', 'error');
                    console.error('Form submission error:', data);
                }
            } catch (error) {
                // Show error message
                showNotification('Failed to send message. Please try again or email me directly.', 'error');
                console.error('Form submission error:', error);
            } finally {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // Intersection Observer for reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.card-hover, .timeline-item').forEach(el => {
        observer.observe(el);
    });
});

// GitHub Stats Fetcher
async function fetchGitHubStats() {
    const username = 'N1KH1LT0X1N';
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();
        
        // Update stats if elements exist
        const statsContainer = document.getElementById('github-stats');
        if (statsContainer && data) {
            statsContainer.innerHTML = `
                <div class="grid grid-cols-3 gap-4 text-center">
                    <div class="bg-gray-800/50 rounded-lg p-4">
                        <div class="text-2xl font-bold text-cyan-400">${data.public_repos || 0}</div>
                        <div class="text-sm text-gray-400">Repositories</div>
                    </div>
                    <div class="bg-gray-800/50 rounded-lg p-4">
                        <div class="text-2xl font-bold text-purple-400">${data.followers || 0}</div>
                        <div class="text-sm text-gray-400">Followers</div>
                    </div>
                    <div class="bg-gray-800/50 rounded-lg p-4">
                        <div class="text-2xl font-bold text-green-400">${data.following || 0}</div>
                        <div class="text-sm text-gray-400">Following</div>
                    </div>
                </div>
            `;
        }
        
        // Fetch repository stats for projects
        const repoResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
        const repos = await repoResponse.json();
        
        if (Array.isArray(repos)) {
            repos.forEach((repo, index) => {
                const repoStat = document.getElementById(`repo-stats-${index}`);
                if (repoStat) {
                    repoStat.innerHTML = `
                        <div class="flex items-center gap-3 text-xs text-gray-400 mt-2">
                            <span class="flex items-center"><i class="fas fa-star text-yellow-400 mr-1"></i>${repo.stargazers_count}</span>
                            <span class="flex items-center"><i class="fas fa-code-branch text-blue-400 mr-1"></i>${repo.forks_count}</span>
                            <span class="flex items-center"><i class="fas fa-eye text-green-400 mr-1"></i>${repo.watchers_count}</span>
                        </div>
                    `;
                }
            });
        }
    } catch (error) {
        console.log('GitHub API rate limit or error:', error);
    }
}

// Simple visitor counter using localStorage
function updateVisitorCount() {
    const visitorCountEl = document.getElementById('visitor-count');
    if (visitorCountEl) {
        let count = localStorage.getItem('visitorCount') || 0;
        count = parseInt(count) + 1;
        localStorage.setItem('visitorCount', count);
        visitorCountEl.textContent = count;
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    let bgColor = 'bg-blue-500';
    if (type === 'success') bgColor = 'bg-green-500';
    if (type === 'error') bgColor = 'bg-red-500';
    
    notification.className = `fixed top-20 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 ${bgColor} text-white`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
