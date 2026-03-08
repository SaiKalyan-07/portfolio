/**
 * navbar.js
 * - Hides navbar on scroll down, reveals on scroll up
 * - Syncs active nav link to current section
 * - Mobile hamburger menu toggle
 */

import { throttle } from '../utils.js';

export function initNavbar() {
  const navbar  = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!navbar) return;

  // ── Scroll: active link sync + shadow on scroll ────────────
  // Navbar always visible — portfolio needs constant nav access.
  navbar.style.transform = 'translateY(0)';

  window.addEventListener('scroll', throttle(() => {
    // Add shadow when scrolled past hero so navbar reads clearly
    // against the darker section backgrounds below
    if (window.scrollY > 80) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
    syncActiveLink();
  }, 16));

  function syncActiveLink() {
    const scrollPos = window.scrollY + 150;
    document.querySelectorAll('section[id]').forEach(section => {
      const top    = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        setActiveLink(`#${section.id}`);
      }
    });
  }

  function setActiveLink(href) {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === href);
    });
  }

  // ── Mobile hamburger ───────────────────────────────────────
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      // Prevent body scroll while menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close button (X) inside menu
    document.getElementById('mobile-menu-close')?.addEventListener('click', closeMobileMenu);

    // Close on link click
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close on backdrop click
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) closeMobileMenu();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        closeMobileMenu();
      }
    });
  }

  function closeMobileMenu() {
    mobileMenu?.classList.remove('is-open');
    hamburger?.classList.remove('is-open');
    hamburger?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
}