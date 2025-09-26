/*
==============================================
* Irmish Rizwan - Portfolio Website
* Author: Irmish Rizwan
* Version: 1.0
==============================================
*/

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Preloader
    setTimeout(function() {
        document.querySelector('.preloader')?.classList.add('loaded');
        setTimeout(function() {
            document.querySelector('.preloader')?.remove();
        }, 1000);
    }, 1000);

    // Sticky Navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });

    // Smooth scrolling for navbar links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu when clicking a link
            if (document.querySelector('.navbar-collapse.show')) {
                document.querySelector('.navbar-toggler').click();
            }
        });
    });

    // Typing animation
    const typingText = document.querySelector('.typing-text');
    const words = ['Web Developer', 'UI/UX Designer', 'Frontend Developer', 'Creative Coder'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;

    function type() {
        const currentWord = words[wordIndex];
        const speed = isDeleting ? 80 : 150;
        
        if (!isDeleting && charIndex <= currentWord.length) {
            typingText.textContent = currentWord.substring(0, charIndex);
            charIndex++;
        }
        
        if (isDeleting && charIndex >= 0) {
            typingText.textContent = currentWord.substring(0, charIndex);
            charIndex--;
        }
        
        if (charIndex === currentWord.length) {
            isEnd = true;
            isDeleting = true;
            setTimeout(() => {
                type();
            }, 1500);
            return;
        }
        
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
        
        setTimeout(type, isEnd ? 500 : speed);
        isEnd = false;
    }

    if (typingText) {
        setTimeout(type, 1000);
    }

    // Animate progress bars
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const value = bar.getAttribute('aria-valuenow');
            bar.style.width = value + '%';
        });
    }

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    const projectCards = document.querySelectorAll('.project-card');

    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                element.classList.add('show');
            }
        });
        
        projectCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < triggerBottom) {
                setTimeout(() => {
                    card.classList.add('show');
                }, 200 * Array.from(projectCards).indexOf(card));
            }
        });
        
        // Animate progress bars when skills section is in view
        const skillsSection = document.querySelector('.skills-section');
        if (skillsSection) {
            const skillsSectionTop = skillsSection.getBoundingClientRect().top;
            if (skillsSectionTop < triggerBottom) {
                animateProgressBars();
            }
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on initial load

    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                // In a real application, you would send the form data to a server here
                // For demo purposes, we'll just show the success message
                document.querySelector('.form-message').style.display = 'block';
                contactForm.reset();
                
                // Hide the success message after 5 seconds
                setTimeout(() => {
                    document.querySelector('.form-message').style.display = 'none';
                }, 5000);
            }
        });
    }

    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 100) {
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

    // Initialize floating particles animation
    initFloatingParticles();
});

// Floating particles animation
function initFloatingParticles() {
    const particlesContainer = document.querySelector('.floating-particles');
    if (!particlesContainer) return;
    
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size between 5px and 15px
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random opacity between 0.1 and 0.5
        particle.style.opacity = Math.random() * 0.4 + 0.1;
        
        // Random animation duration between 15s and 30s
        const duration = Math.random() * 15 + 15;
        particle.style.animation = `floatParticle ${duration}s linear infinite`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 10}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Add CSS for particles
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .particle {
            position: absolute;
            border-radius: 50%;
            background: linear-gradient(to right, var(--color-light-pink), var(--color-lavender));
            pointer-events: none;
        }
        
        @keyframes floatParticle {
            0% {
                transform: translate(0, 0) rotate(0deg);
            }
            25% {
                transform: translate(50px, -50px) rotate(90deg);
            }
            50% {
                transform: translate(100px, 0) rotate(180deg);
            }
            75% {
                transform: translate(50px, 50px) rotate(270deg);
            }
            100% {
                transform: translate(0, 0) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
});

// Add preloader HTML
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="spinner"></div>';
    document.body.prepend(preloader);
});