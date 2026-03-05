document.addEventListener('DOMContentLoaded', function() {
    // Custom Cursor Implementation
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorTrail = document.querySelector('.cursor-trail');

    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';

        if (Math.random() < 0.2) {
            createParticleTrail(mouseX, mouseY);
        }
    });

    function createParticleTrail(x, y) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 3px;
            height: 3px;
            background: rgba(0, 255, 136, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${x}px;
            top: ${y}px;
            animation: particleFade 1s ease-out forwards;
        `;
        document.body.appendChild(particle);
        setTimeout(() => { if (particle.parentNode) particle.remove(); }, 1000);
    }

    if (!document.getElementById('particle-style')) {
        const particleStyle = document.createElement('style');
        particleStyle.id = 'particle-style';
        particleStyle.textContent = `
            @keyframes particleFade {
                0% { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(0) translateY(-20px); }
            }
        `;
        document.head.appendChild(particleStyle);
    }

    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';
        requestAnimationFrame(animateTrail);
    }
    animateTrail();

    const interactiveElements = document.querySelectorAll('a, button, .skill-item, .project-card, .social-link, .nav-link, .highlight-item, .cert-card, .education-card, .timeline-content');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');

            if (element.classList.contains('project-card')) {
                cursor.classList.add('cursor-text');
                cursorTrail.textContent = 'VIEW';
            } else if (element.classList.contains('social-link')) {
                cursor.classList.add('cursor-text');
                cursorTrail.textContent = 'CONNECT';
            } else if (element.classList.contains('nav-link')) {
                cursor.classList.add('cursor-text');
                cursorTrail.textContent = 'GO';
            } else if (element.classList.contains('project-link')) {
                cursor.classList.add('cursor-text');
                cursorTrail.textContent = 'OPEN';
            } else if (element.classList.contains('cert-card')) {
                cursor.classList.add('cursor-text');
                cursorTrail.textContent = 'CERT';
            } else if (element.classList.contains('education-card')) {
                cursor.classList.add('cursor-text');
                cursorTrail.textContent = 'EDU';
            } else if (element.classList.contains('resume-btn')) {
                cursor.classList.add('cursor-text');
                cursorTrail.textContent = 'PDF';
            }
        });

        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover', 'cursor-text');
            cursorTrail.textContent = '';
        });

        if (element.tagName === 'BUTTON' || element.tagName === 'A') {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                const distance = Math.sqrt(x * x + y * y);
                const maxDistance = 40;
                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    element.style.transform = `translate(${x * force * 0.2}px, ${y * force * 0.2}px)`;
                }
            });
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        }
    });

    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            border-radius: 50%;
            background: rgba(0, 255, 136, 0.4);
            pointer-events: none;
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${e.clientX - 15}px;
            top: ${e.clientY - 15}px;
            width: 30px;
            height: 30px;
            z-index: 9999;
            box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
        `;
        document.body.appendChild(ripple);
        setTimeout(() => { if (ripple.parentNode) ripple.remove(); }, 600);
    });

    if (!document.getElementById('ripple-style')) {
        const rippleStyle = document.createElement('style');
        rippleStyle.id = 'ripple-style';
        rippleStyle.textContent = `@keyframes ripple { to { transform: scale(4); opacity: 0; } }`;
        document.head.appendChild(rippleStyle);
    }

    // Smooth scroll
    function smoothScrollTo(targetId) {
        const element = document.querySelector(targetId);
        if (element) {
            const navHeight = document.querySelector('.navbar')?.offsetHeight || 80;
            window.scrollTo({ top: Math.max(0, element.offsetTop - navHeight - 20), behavior: 'smooth' });
            return true;
        }
        return false;
    }

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('nav-link') || e.target.closest('.nav-link')) {
            e.preventDefault();
            e.stopPropagation();
            const navLink = e.target.classList.contains('nav-link') ? e.target : e.target.closest('.nav-link');
            const href = navLink.getAttribute('href');
            if (href && href.startsWith('#')) {
                smoothScrollTo(href);
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                navLink.classList.add('active');
            }
        }

        if (e.target.classList.contains('cta-btn') || e.target.closest('#view-work-btn')) {
            e.preventDefault();
            smoothScrollTo('#projects');
        }

        if (e.target.classList.contains('project-link') || e.target.closest('.project-link')) {
            e.preventDefault();
            e.stopPropagation();
            const projectLink = e.target.classList.contains('project-link') ? e.target : e.target.closest('.project-link');
            const href = projectLink.getAttribute('href');
            if (href) {
                projectLink.style.transform = 'scale(0.95)';
                setTimeout(() => { projectLink.style.transform = ''; }, 150);
                window.open(href, '_blank');
            }
        }

        if (e.target.classList.contains('social-link') || e.target.closest('.social-link')) {
            e.preventDefault();
            e.stopPropagation();
            const socialLink = e.target.classList.contains('social-link') ? e.target : e.target.closest('.social-link');
            const href = socialLink.getAttribute('href');
            if (href) {
                socialLink.style.transform = 'scale(0.9) rotateZ(-10deg)';
                setTimeout(() => { socialLink.style.transform = ''; }, 200);
                if (href.startsWith('mailto:')) {
                    window.location.href = href;
                } else {
                    window.open(href, '_blank');
                }
            }
        }
    });

    // Navbar scroll behavior
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', throttle(() => {
        const currentScrollY = window.scrollY;
        navbar.style.transform = (currentScrollY > lastScrollY && currentScrollY > 100)
            ? 'translateY(-100%)' : 'translateY(0)';
        lastScrollY = currentScrollY;

        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${section.getAttribute('id')}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, 16));

    // Intersection Observer
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.id === 'about') animateAboutSection();
                else if (entry.target.id === 'education') animateEducationSection();
                else if (entry.target.id === 'certifications') animateCertificationsSection();
                else if (entry.target.classList.contains('skill-category')) animateSkillItems(entry.target);
                else if (entry.target.classList.contains('project-card')) animateProjectCard(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.section-header, .skill-category, .project-card, .timeline-item, .contact-info, .contact-form');
    const sections = document.querySelectorAll('#about, #education, #certifications');

    animatedElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(element);
    });

    sections.forEach(section => observer.observe(section));

    // ── About Section Animation ──────────────────────────────────────────────
    // BUG 7 FIX: Do NOT use typewriterEffect on .typewriter-text because it
    // calls element.textContent = '' which destroys child HTML elements (spans).
    // Instead we simply ensure the element fades in via its CSS animation,
    // which is already defined as @keyframes typewriterFade { to { opacity: 1 } }.
    function animateAboutSection() {
        // Staggered slide-in for highlight items
        const highlights = document.querySelectorAll('.highlight-item');
        highlights.forEach((item, index) => {
            if (!item.dataset.animated) {
                item.dataset.animated = 'true';
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 200);
            }
        });
    }

    // ── Education Section Animation ──────────────────────────────────────────
    function animateEducationSection() {
        const educationCards = document.querySelectorAll('.education-card');
        educationCards.forEach((card, index) => {
            if (!card.dataset.animated) {
                card.dataset.animated = 'true';
                setTimeout(() => { card.classList.add('visible'); }, index * 300);
            }
        });

        setTimeout(() => {
            // BUG FIX: Read data-target for CGPA (7.4, not 7.5)
            const cgpaCounter = document.querySelector('.cgpa-counter');
            if (cgpaCounter && !cgpaCounter.dataset.animated) {
                cgpaCounter.dataset.animated = 'true';
                animateCounter(cgpaCounter, 0, parseFloat(cgpaCounter.dataset.target), 2000, 1);
            }

            const scoreCounters = document.querySelectorAll('.score-counter');
            scoreCounters.forEach((counter, index) => {
                if (!counter.dataset.animated) {
                    counter.dataset.animated = 'true';
                    const target = parseFloat(counter.dataset.target);
                    setTimeout(() => { animateCounter(counter, 0, target, 1500, 0); }, index * 500);
                }
            });
        }, 1000);

        setTimeout(() => {
            const progressBars = document.querySelectorAll('.progress-fill');
            progressBars.forEach((bar, index) => {
                if (!bar.dataset.animated) {
                    bar.dataset.animated = 'true';
                    setTimeout(() => {
                        bar.classList.add('animated');
                        if (bar.classList.contains('hsc-progress')) {
                            bar.style.width = '94%';
                        } else if (bar.classList.contains('sslc-progress')) {
                            bar.style.width = '82.8%';
                        } else {
                            bar.style.width = '74%'; // CGPA 7.4/10
                        }
                    }, index * 300);
                }
            });
        }, 1500);
    }

    // ── Certifications Section Animation ─────────────────────────────────────
    function animateCertificationsSection() {
        const certCards = document.querySelectorAll('.cert-card');
        certCards.forEach((card, index) => {
            if (!card.dataset.animated) {
                card.dataset.animated = 'true';
                setTimeout(() => { card.classList.add('visible'); }, index * 150);
            }
        });

        setTimeout(() => { showAchievementPopup(); }, certCards.length * 150 + 1000);
    }

    function showAchievementPopup() {
        const popup = document.querySelector('.cert-achievement-popup');
        if (popup && !popup.dataset.shown) {
            popup.dataset.shown = 'true';
            popup.classList.add('show');
            setTimeout(() => { popup.classList.remove('show'); }, 3000);
        }
    }

    // Counter animation
    function animateCounter(element, start, end, duration, decimals = 0) {
        const startTime = Date.now();
        const range = end - start;

        function updateCounter() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentValue = start + (range * easeOutCubic);

            element.textContent = decimals > 0
                ? currentValue.toFixed(decimals)
                : Math.floor(currentValue).toString();

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = decimals > 0 ? end.toFixed(decimals) : end.toString();
            }
        }
        updateCounter();
    }

    // Skill item animations
    function animateSkillItems(category) {
        const skillItems = category.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateY(0) scale(1)';
                item.style.opacity = '1';
            }, index * 100);
        });
    }

    // 3D hover for skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-8px) translateZ(20px) rotateX(10deg)';
            item.style.boxShadow = '0 15px 30px rgba(0, 255, 136, 0.2)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
            item.style.boxShadow = '';
        });

        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = (y - rect.height / 2) / 8;
            const rotateY = (rect.width / 2 - x) / 8;
            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) translateY(-8px)`;
        });
    });

    // 3D hover for project cards
    function animateProjectCard(card) {
        card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        card.style.opacity = '1';
    }

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) rotateX(8deg) rotateY(5deg) translateZ(30px)';
            card.style.boxShadow = '0 25px 50px rgba(0, 255, 136, 0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = (y - rect.height / 2) / 12;
            const rotateY = (rect.width / 2 - x) / 12;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px) translateY(-15px)`;
        });
    });

    // Cert and education card hover
    const certCards = document.querySelectorAll('.cert-card');
    const educationCards = document.querySelectorAll('.education-card');

    [...certCards, ...educationCards].forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) rotateX(5deg) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 255, 136, 0.15)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });

    // Timeline hover
    const timelineItems = document.querySelectorAll('.timeline-content');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => { item.style.transform = 'translateX(15px) scale(1.02)'; });
        item.addEventListener('mouseleave', () => { item.style.transform = ''; });
    });

    // Parallax for floating icons
    window.addEventListener('scroll', throttle(() => {
        const scrollY = window.scrollY;
        const floatingIcons = document.querySelectorAll('.floating-icon');
        const aboutElements = document.querySelectorAll('.floating-element');
        [...floatingIcons, ...aboutElements].forEach((icon, index) => {
            const speed = 0.3 + (index * 0.1);
            icon.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * 0.05 * (index + 1)}deg)`;
        });
    }, 16));

    // Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.querySelector('#name').value;
            const email = contactForm.querySelector('#email').value;
            const subject = contactForm.querySelector('#subject').value;
            const message = contactForm.querySelector('#message').value;

            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'linear-gradient(45deg, #00ff88, #00cc6a)';
                submitBtn.style.opacity = '1';

                contactForm.querySelectorAll('input, textarea').forEach(input => {
                    input.value = '';
                });

                showNotification("Message sent! I'll get back to you soon.", 'success');

                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.disabled = false;
                    submitBtn.style.background = 'linear-gradient(45deg, #00ff88, rgba(0, 255, 136, 0.8))';
                }, 3000);
            }, 2000);
        });

        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('focus', () => {
                input.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.3)';
            });
            input.addEventListener('blur', () => {
                input.style.boxShadow = '';
            });
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const bgColor = type === 'success' ? 'linear-gradient(45deg, #00ff88, #00cc6a)'
                      : type === 'error'   ? 'linear-gradient(45deg, #ff4444, #cc3333)'
                      : 'linear-gradient(45deg, #00ff88, rgba(0, 255, 136, 0.8))';
        const borderColor = type === 'error' ? '#ff4444' : '#00ff88';
        const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';

        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: -350px;
            background: ${bgColor};
            color: #0a0a0a;
            padding: 16px 20px;
            border-radius: 10px;
            font-weight: 600;
            z-index: 10000;
            transition: all 0.4s ease;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            max-width: 320px;
            font-size: 14px;
            border: 2px solid ${borderColor};
            cursor: pointer;
        `;
        notification.innerHTML = `${icon} ${message}`;
        document.body.appendChild(notification);

        requestAnimationFrame(() => { notification.style.right = '20px'; });

        const autoRemove = setTimeout(() => {
            notification.style.right = '-350px';
            setTimeout(() => { if (notification.parentNode) notification.remove(); }, 400);
        }, 4000);

        notification.addEventListener('click', () => {
            clearTimeout(autoRemove);
            notification.style.right = '-350px';
            setTimeout(() => { if (notification.parentNode) notification.remove(); }, 400);
        });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Hero greeting typewriter (safe — no child HTML elements in .greeting span)
    const heroGreeting = document.querySelector('.hero-title .greeting');
    if (heroGreeting) {
        setTimeout(() => { typeWriter(heroGreeting, "Hello, I'm Sai Kalyan", 100); }, 1000);
    }

    function typeWriter(element, text, speed = 80) {
        element.textContent = '';
        element.style.opacity = '1';
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed + Math.random() * 40);
            }
        }
        type();
    }

    // Performance: throttle
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ── Profile Image — BUG 1 + BUG 2 FIX ───────────────────────────────────
    // BUG 2 FIX: handleImageError was called in onerror HTML attribute but never
    // defined. The onerror attribute has been removed from index.html entirely.
    // Image load/error handling is done exclusively here via JS event listeners.
    // BUG 1 FIX: Path corrected to assets/profile.jpg in index.html.
    const profilePhoto = document.querySelector('.profile-photo');
    const profileImage = document.getElementById('profile-img');
    const profileFallback = document.getElementById('profile-fallback');

    if (profilePhoto && profileImage && profileFallback) {
        profileFallback.style.display = 'none';

        profileImage.addEventListener('load', () => {
            profileImage.style.opacity = '0';
            profileImage.style.transform = 'scale(0.8)';
            profileFallback.style.display = 'none';
            setTimeout(() => {
                profileImage.style.transition = 'all 0.8s ease';
                profileImage.style.opacity = '1';
                profileImage.style.transform = 'scale(1)';
            }, 100);
        });

        profileImage.addEventListener('error', () => {
            profileImage.style.display = 'none';
            profileFallback.style.display = 'flex';
            profileFallback.style.animation = 'fadeInUp 0.8s ease forwards';
        });

        // Handle already-cached images
        if (profileImage.complete && profileImage.naturalHeight !== 0) {
            profileImage.dispatchEvent(new Event('load'));
        } else if (profileImage.complete && profileImage.naturalHeight === 0) {
            profileImage.dispatchEvent(new Event('error'));
        }

        profilePhoto.addEventListener('mouseenter', () => {
            profilePhoto.style.transform = 'scale(1.05) rotateY(10deg)';
            profilePhoto.style.boxShadow = '0 30px 60px rgba(0, 255, 136, 0.4), inset 0 0 40px rgba(0, 255, 136, 0.2)';
        });

        profilePhoto.addEventListener('mouseleave', () => {
            profilePhoto.style.transform = '';
            profilePhoto.style.boxShadow = '';
        });
    }

    console.log('🚀 Sai Kalyan Portfolio loaded successfully!');
    console.log('⚛️  React.js | Node.js | Full-Stack Engineer');
    console.log('📧 skravikumar2004@gmail.com | 📱 +91 7305467190');
    console.log('🌐 Chennai, India');
});