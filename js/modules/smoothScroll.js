/**
 * smoothScroll.js
 * Handles all in-page anchor navigation and the "View My Work" CTA.
 */

export function initSmoothScroll() {
  // Back to top
  document.getElementById('back-to-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.addEventListener('click', (e) => {
    // Nav links + footer quick links
    const navLink = e.target.closest('.nav-link, .mobile-link, .footer-nav-link');
    if (navLink) {
      const href = navLink.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        e.stopPropagation();
        scrollToSection(href);
        // Active state is handled by navbar.js scroll listener
        // but we also set it immediately on click for instant feedback
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        navLink.classList.add('active');
      }
    }

    // "View My Work" CTA button
    if (e.target.closest('#view-work-btn')) {
      e.preventDefault();
      scrollToSection('#projects');
    }

    // Project links — open in new tab
    const projectLink = e.target.closest('.project-link');
    if (projectLink) {
      e.preventDefault();
      e.stopPropagation();
      const href = projectLink.getAttribute('href');
      if (href) {
        projectLink.style.transform = 'scale(0.95)';
        setTimeout(() => { projectLink.style.transform = ''; }, 150);
        window.open(href, '_blank', 'noopener noreferrer');
      }
    }

    // Social links
    const socialLink = e.target.closest('.social-link');
    if (socialLink) {
      e.preventDefault();
      e.stopPropagation();
      const href = socialLink.getAttribute('href');
      if (href) {
        socialLink.style.transform = 'scale(0.9) rotateZ(-10deg)';
        setTimeout(() => { socialLink.style.transform = ''; }, 200);
        if (href.startsWith('mailto:')) {
          window.location.href = href;
        } else {
          window.open(href, '_blank', 'noopener noreferrer');
        }
      }
    }
  });
}

function scrollToSection(targetId) {
  const el = document.querySelector(targetId);
  if (!el) return;
  const navHeight = document.querySelector('.navbar')?.offsetHeight || 80;
  window.scrollTo({
    top: Math.max(0, el.offsetTop - navHeight - 20),
    behavior: 'smooth',
  });
}