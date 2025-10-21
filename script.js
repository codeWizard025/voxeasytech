// Advanced Mobile Navigation Toggle with smooth animations
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');

// Enhanced hamburger animation
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu?.classList.toggle('active');
    
    // Add blur effect to background when menu is open
    if (navMenu?.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        document.body.style.overflow = '';
        navbar.style.background = 'rgba(255, 255, 255, 0.05)';
    }
});

// Close mobile menu when clicking on a link with stagger animation
document.querySelectorAll('.nav-link').forEach((link, index) => {
    link.addEventListener('click', () => {
        setTimeout(() => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.style.overflow = '';
        }, index * 50); // Stagger the closing animation
    });
});

// Enhanced smooth scrolling with easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Skip smooth scroll for modal buttons
        if (this.id === 'openDemoModal' || this.id === 'heroDemoBtn' || this.classList.contains('demo-btn')) {
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
            const targetPosition = target.offsetTop - navHeight - 20;
            
            // Custom smooth scroll with easing
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1000;
            let start = null;
            
            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
            
            function easeInOutCubic(t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t*t + b;
                t -= 2;
                return c/2*(t*t*t + 2) + b;
            }
            
            requestAnimationFrame(animation);
        }
    });
});

// Advanced navbar with scroll effects
let lastScrollTop = 0;
const navbarScrollThreshold = 100;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    // Navbar background and shadow changes
    if (scrollTop > navbarScrollThreshold) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
    
    // Hide/show navbar on scroll using classes instead of inline styles
    if (scrollTop > lastScrollTop && scrollTop > navbarScrollThreshold) {
        // Scrolling down
        navbar.classList.add('navbar-hidden');
    } else {
        // Scrolling up
        navbar.classList.remove('navbar-hidden');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, { passive: true });

// Enhanced animated counters with easing
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach((counter, index) => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const duration = 2000 + (index * 200); // Stagger animation
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = target * easeOutQuart;
            
            // Format the number based on the target
            if (target >= 10) {
                counter.textContent = Math.floor(current);
            } else {
                counter.textContent = current.toFixed(1);
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        // Add slight delay for stagger effect
        setTimeout(() => {
            requestAnimationFrame(updateCounter);
        }, index * 100);
    });
}

// Advanced Intersection Observer with stagger animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add stagger animation to child elements
            const children = entry.target.querySelectorAll('.problem-card, .advantage-card, .feature-card, .stat-item');
            
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * 150);
            });
            
            // Animate the section itself
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Trigger counter animation when outcomes section comes into view
            if (entry.target.id === 'outcomes') {
                setTimeout(() => animateCounters(), 500);
            }
            
            // Unobserve after animation
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections for scroll animations with initial setup
document.querySelectorAll('section').forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(60px)';
    section.style.transition = 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Set up child elements for stagger animation
    const children = section.querySelectorAll('.problem-card, .advantage-card, .feature-card, .stat-item, .step-card, .outcome-card, .highlight-card, .credential-item, .security-item, .pricing-card');
    children.forEach(child => {
        child.style.opacity = '0';
        child.style.transform = 'translateY(40px)';
        child.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    observer.observe(section);
});

// Form submission
document.getElementById('demoForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    
    // Simple validation
    if (!data.name || !data.email || !data.organization) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Update button state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
        // TODO: Replace this URL with your Google Apps Script web app URL
        const scriptURL = 'https://script.google.com/macros/s/AKfycbynkW3ZcW9Dw8JfbLOdViQLs-Z9Wn4yRBbFlyMpcL48iGfYWSX-BYaU5WKUzzZgq-y7Tg/exec';
        
        // Send data to Google Sheets
        const response = await fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        // Success - reset form and show notification
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        showSuccessNotification();
        
        // Scroll to top to see notification
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        console.log('Form submitted successfully:', data);
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting the form. Please try again.');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Advanced Interactive Elements and Micro-interactions
document.addEventListener('DOMContentLoaded', () => {
    // Enhanced hover effects with magnetic attraction
    const cards = document.querySelectorAll('.problem-card, .advantage-card, .feature-card, .solution-card, .hero-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            card.style.transform = 'translateY(-12px) scale(1.02)';
            card.style.boxShadow = '0 32px 80px rgba(0, 0, 0, 0.12)';
            card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', (e) => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.04)';
        });
        
        // Magnetic effect - card follows mouse slightly
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            card.style.transform = `translateY(-12px) scale(1.02) rotateX(${y * 0.05}deg) rotateY(${x * 0.05}deg)`;
        });
    });
    
    // Enhanced category icons with ripple effect
    const categoryIcons = document.querySelectorAll('.icon');
    categoryIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = icon.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(0, 0, 0, 0.1);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            icon.style.position = 'relative';
            icon.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
            
            // Icon animation
            icon.style.transform = 'scale(0.9)';
            icon.style.background = 'rgba(0, 0, 0, 0.08)';
            
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
                icon.style.background = 'rgba(0, 0, 0, 0.03)';
            }, 150);
        });
    });
    
    // Advanced parallax with multiple layers
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        const heroVisual = document.querySelector('.hero-visual');
        
        if (hero && scrolled < hero.offsetHeight) {
            // Different parallax speeds for depth
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
            }
            if (heroVisual) {
                heroVisual.style.transform = `translateY(${scrolled * 0.1}px) scale(${1 + scrolled * 0.0001})`;
            }
            
            // Parallax for background elements
            hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
    
    // Typing effect disabled for now to prevent HTML display issues
    // const heroTitle = document.querySelector('.hero-title');
    // if (heroTitle) {
    //     // Typing animation code here
    // }
    
    // Add loading animation
    const loadingOverlay = document.createElement('div');
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #e8f4fd;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    const loader = document.createElement('div');
    loader.style.cssText = `
        width: 50px;
        height: 50px;
        border: 3px solid rgba(102, 126, 234, 0.3);
        border-top: 3px solid #667eea;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    loadingOverlay.appendChild(loader);
    document.body.appendChild(loadingOverlay);
    
    // Hide loading overlay after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(loadingOverlay);
            }, 500);
        }, 1000);
    });
});

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active navigation link
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-link.active {
        color: #000000 !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(navStyle);

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        // Easter egg activated
        const logo = document.querySelector('.logo-icon');
        if (logo) {
            logo.style.animation = 'spin 2s linear infinite';
            setTimeout(() => {
                logo.style.animation = '';
            }, 4000);
        }
        
        // Show a fun message
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 2rem;
            border-radius: 20px;
            text-align: center;
            z-index: 10000;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        `;
        message.innerHTML = `
            <h3>🎉 Easter Egg Found!</h3>
            <p>You discovered the VoxEasy secret! 🚀</p>
            <small>Thanks for exploring our website thoroughly!</small>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.opacity = '0';
            message.style.transform = 'translate(-50%, -50%) scale(0.8)';
            setTimeout(() => {
                document.body.removeChild(message);
            }, 500);
        }, 3000);
        
        konamiCode = [];
    }
});

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add smooth reveal animations for elements
const revealElements = document.querySelectorAll('.problem-card, .advantage-card, .feature-card, .stat-item');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// Success Notification Function
const successNotification = document.getElementById('successNotification');

function showSuccessNotification() {
    successNotification.classList.add('show');
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        successNotification.classList.remove('show');
    }, 5000);
}

// Image Preview Modal Functionality
const imageModal = document.getElementById('imageModal');
const heroImage = document.getElementById('heroImage');
const imageModalClose = imageModal?.querySelector('.modal-close');
const imageModalOverlay = imageModal?.querySelector('.modal-overlay');

// Function to enter fullscreen
const enterFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen().catch(err => {
            console.log('Error attempting to enable fullscreen:', err);
        });
    } else if (elem.webkitRequestFullscreen) { // Safari
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE11
        elem.msRequestFullscreen();
    }
};

// Function to exit fullscreen
const exitFullscreen = () => {
    if (document.exitFullscreen) {
        document.exitFullscreen().catch(err => {
            console.log('Error attempting to exit fullscreen:', err);
        });
    } else if (document.webkitExitFullscreen) { // Safari
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE11
        document.msExitFullscreen();
    }
};

// Create loading overlay for modal transition
const createModalLoader = () => {
    const loaderOverlay = document.createElement('div');
    loaderOverlay.id = 'modalLoader';
    loaderOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #cfeaff 0%, #f3f3f4 100%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 10002;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 60px;
        height: 60px;
        border: 4px solid rgba(102, 126, 234, 0.2);
        border-top: 4px solid #667eea;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        margin-bottom: 1.5rem;
    `;
    
    const loadingText = document.createElement('div');
    loadingText.textContent = 'Entering VoxEasy...';
    loadingText.style.cssText = `
        font-family: 'Inter', sans-serif;
        font-size: 1.2rem;
        color: #667eea;
        font-weight: 600;
        letter-spacing: 0.05em;
    `;
    
    loaderOverlay.appendChild(spinner);
    loaderOverlay.appendChild(loadingText);
    document.body.appendChild(loaderOverlay);
    
    return loaderOverlay;
};

// Function to open image modal with loading effect
const openImageModal = () => {
    if (imageModal) {
        // Create and show loader
        const loader = createModalLoader();
        
        // Fade in loader
        setTimeout(() => {
            loader.style.opacity = '1';
        }, 10);
        
        // Enter fullscreen mode
        enterFullscreen();
        
        // Show modal after brief loading period
        setTimeout(() => {
            imageModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Fade out loader
            loader.style.opacity = '0';
            setTimeout(() => {
                if (loader.parentNode) {
                    document.body.removeChild(loader);
                }
            }, 300);
        }, 800);
    }
};

// Open image modal when hero image is clicked
heroImage?.addEventListener('click', openImageModal);

// Also make the preview hint clickable
const previewHint = document.querySelector('.preview-hint');
previewHint?.addEventListener('click', openImageModal);

// Close image modal
const closeImageModal = () => {
    if (imageModal) {
        // Remove any existing loader if present
        const existingLoader = document.getElementById('modalLoader');
        if (existingLoader && existingLoader.parentNode) {
            document.body.removeChild(existingLoader);
        }
        
        imageModal.classList.remove('active');
        document.body.style.overflow = '';
        // Exit fullscreen mode
        exitFullscreen();
    }
};

imageModalClose?.addEventListener('click', closeImageModal);
imageModalOverlay?.addEventListener('click', closeImageModal);

// Close image modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageModal && imageModal.classList.contains('active')) {
        closeImageModal();
    }
});

// Handle fullscreen change events (when user exits fullscreen manually with ESC or F11)
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && imageModal && imageModal.classList.contains('active')) {
        // Remove any existing loader if present
        const existingLoader = document.getElementById('modalLoader');
        if (existingLoader && existingLoader.parentNode) {
            document.body.removeChild(existingLoader);
        }
        // User exited fullscreen manually, close the modal
        imageModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});
document.addEventListener('webkitfullscreenchange', () => {
    if (!document.webkitFullscreenElement && imageModal && imageModal.classList.contains('active')) {
        // Remove any existing loader if present
        const existingLoader = document.getElementById('modalLoader');
        if (existingLoader && existingLoader.parentNode) {
            document.body.removeChild(existingLoader);
        }
        imageModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Demo Modal Functionality
const demoModal = document.getElementById('demoModal');
const openDemoModalBtn = document.getElementById('openDemoModal');
const heroDemoBtn = document.getElementById('heroDemoBtn');
const modalClose = demoModal?.querySelector('.modal-close');
const modalOverlay = demoModal?.querySelector('.modal-overlay');

// Function to open modal
const openModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (demoModal) {
        demoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

// Open modal from nav button
openDemoModalBtn?.addEventListener('click', openModal);

// Open modal from hero button
heroDemoBtn?.addEventListener('click', openModal);

// Close modal
const closeModal = () => {
    if (demoModal) {
        demoModal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

modalClose?.addEventListener('click', closeModal);
modalOverlay?.addEventListener('click', closeModal);

// Close demo modal on Escape key (also check it's not the image modal)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && demoModal && demoModal.classList.contains('active') && 
        (!imageModal || !imageModal.classList.contains('active'))) {
        closeModal();
    }
});

// Handle modal form submission
document.getElementById('modalDemoForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    
    // Simple validation
    if (!data.name || !data.email || !data.organization) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Update button state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
        // TODO: Replace this URL with your Google Apps Script web app URL
        const scriptURL = 'https://script.google.com/macros/s/AKfycbynkW3ZcW9Dw8JfbLOdViQLs-Z9Wn4yRBbFlyMpcL48iGfYWSX-BYaU5WKUzzZgq-y7Tg/exec';
        
        // Send data to Google Sheets
        const response = await fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        // Success - reset form and show notification
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        closeModal();
        showSuccessNotification();
        
        console.log('Form submitted successfully:', data);
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting the form. Please try again.');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

