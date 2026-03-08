/**
 * cursor.js
 * Custom cursor: dot, trailing ring, particle trail, cursor-text labels.
 *
 * Fixes applied:
 *   1. Cursor hidden (opacity:0) until mouse first enters the viewport
 *   2. Cursor fades out when mouse leaves the viewport
 *   3. Label text cleared reliably on mouseleave via event delegation
 *   4. Interactive elements queried after renderAll() so dynamic DOM is present
 */

export function initCursor() {
  const cursor      = document.querySelector('.custom-cursor');
  const cursorDot   = document.querySelector('.cursor-dot');
  const cursorTrail = document.querySelector('.cursor-trail');

  if (!cursor || !cursorDot || !cursorTrail) return;

  // Touch devices — don't run cursor at all
  if (window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = 0, mouseY = 0;
  let trailX  = 0, trailY  = 0;
  let active  = false;

  // ── Mouse enter/leave viewport ──────────────────────────
  document.addEventListener('mouseenter', () => {
    cursor.classList.add('is-active');
    active = true;
  });

  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('is-active');
    active = false;
  });

  // ── Dot follows cursor exactly ──────────────────────────
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';

    if (!active) {
      cursor.classList.add('is-active');
      active = true;
    }

    if (Math.random() < 0.18) spawnParticle(mouseX, mouseY);
  });

  // ── Trail follows with smooth lerp ─────────────────────
  function animateTrail() {
    trailX += (mouseX - trailX) * 0.1;
    trailY += (mouseY - trailY) * 0.1;
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top  = trailY + 'px';
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  // ── Cursor label map — class → label text ──────────────
  const LABEL_MAP = {
    'project-card':   'VIEW',
    'social-link':    'CONNECT',
    'nav-link':       'GO',
    'project-link':   'OPEN',
    'cert-card':      'CERT',
    'education-card': 'EDU',
    'resume-btn':     'PDF',
  };

  // ── Event delegation — handles dynamic DOM elements ────
  // Instead of querying all elements once and binding,
  // we use a single delegated listener on document.
  // This correctly handles elements injected by renderer.js.
  document.addEventListener('mouseover', (e) => {
    const el = e.target.closest(
      'a, button, .skill-item, .project-card, .social-link, .nav-link, ' +
      '.highlight-item, .cert-card, .education-card, .timeline-content'
    );

    if (!el) return;

    cursor.classList.add('cursor-hover');

    const labelEntry = Object.entries(LABEL_MAP)
      .find(([cls]) => el.classList.contains(cls));

    if (labelEntry) {
      cursor.classList.add('cursor-text');
      cursorTrail.textContent = labelEntry[1];
    }
  });

  document.addEventListener('mouseout', (e) => {
    const el = e.target.closest(
      'a, button, .skill-item, .project-card, .social-link, .nav-link, ' +
      '.highlight-item, .cert-card, .education-card, .timeline-content'
    );

    if (!el) return;

    // Only clear if we're leaving the element (not moving to a child)
    if (!el.contains(e.relatedTarget)) {
      cursor.classList.remove('cursor-hover', 'cursor-text');
      cursorTrail.textContent = '';
    }
  });
}

// ── Particle spawn ──────────────────────────────────────
function spawnParticle(x, y) {
  const p = document.createElement('div');
  p.className = 'cursor-particle';
  p.style.left = x + 'px';
  p.style.top  = y + 'px';
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 1000);
}