/**
 * navbar.js
 * - Navbar stays always visible while scrolling (not hide/reveal —
 *   a deliberate choice for a single-page jump-nav site, see the
 *   Navigation section discussion). Gains a shadow + slightly
 *   condensed padding/logo size (via .navbar-scrolled, see nav.css)
 *   once scrolled past the hero.
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

  // ── Scroll: active link sync + shadow/condense on scroll ───
  window.addEventListener('scroll', throttle(() => {
    // Add shadow + condensed padding once scrolled past hero so
    // navbar reads clearly against the darker section backgrounds
    // below, and takes up marginally less space during scroll.
    if (window.scrollY > 80) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
    syncActiveLink();
  }, 16));

  // Reposition the active-link pill on resize — link positions
  // shift (e.g. crossing the md breakpoint, or font-size change
  // from the scroll-condense effect).
  window.addEventListener('resize', throttle(positionActivePill, 100));

  // Run once on init so the pill (and active state generally)
  // reflects "Home" immediately, rather than only appearing
  // after the first scroll event fires.
  syncActiveLink();

  function syncActiveLink() {
    const scrollPos = window.scrollY + 150;
    document.querySelectorAll('section[id]').forEach(section => {
      const top    = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        setActiveLink(`#${section.id}`);
        setActiveDot(`#${section.id}`);
      }
    });
  }

  function setActiveDot(href) {
    document.querySelectorAll('.scroll-dot').forEach(dot => {
      dot.classList.toggle('active', dot.dataset.target === href);
    });
  }

  function setActiveLink(href) {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === href);
    });
    positionActivePill();
  }

  // ── Active-link pill positioning ───────────────────────────
  function positionActivePill() {
    const menu = document.querySelector('.nav-menu');
    const pill = document.querySelector('.nav-active-pill');
    const activeLink = document.querySelector('.nav-link.active');

    if (!menu || !pill || !activeLink) return;

    // .nav-menu is hidden below the md breakpoint (mobile uses
    // the drawer instead) — offsetParent is null when an
    // element or an ancestor has display:none.
    if (menu.offsetParent === null) {
      pill.style.opacity = '0';
      return;
    }

    const menuRect = menu.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    pill.style.width     = `${linkRect.width}px`;
    pill.style.transform = `translateX(${linkRect.left - menuRect.left}px)`;
    pill.style.opacity   = '1';
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

  // ── Scroll indicator dots ───────────────────────────────────
  document.querySelectorAll('.scroll-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      document.querySelector(dot.dataset.target)?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}
