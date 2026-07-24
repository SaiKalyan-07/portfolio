/**
 * interactions.js
 * Consolidated pointer-driven interaction system: custom cursor,
 * 3D tilt hover, simple hover, and magnetic button pull.
 * Replaces cursor.js, hover.js, and magneticButtons.js (all
 * three deleted — migration complete).
 *
 * .project-card intentionally has NO tilt, hover label, or
 * cursor-hover treatment as of the Projects section rebuild —
 * the card itself isn't a click target (only its internal
 * links are), and all hover/decorative-interaction decisions
 * are deferred to a dedicated pass across the whole site. See
 * the Deferred Interaction Decisions list.
 */

// ── Shared device guard ─────────────────────────────────────
const IS_COARSE_POINTER = window.matchMedia('(pointer: coarse)').matches;

// ── Tilt intensity presets ────────────────────────────────────
const TILT_PRESETS = {
  subtle: { rotateDiv: 8, translateZ: 20, translateY: -8 }, // .skill-item
};

const TILT_TARGETS = [
  { selector: '.skill-item', preset: TILT_PRESETS.subtle },
];

// ── Simple hover (enter/leave transform+shadow, no tracking) ─
const SIMPLE_HOVER_TARGETS = [
  {
    selector:  '.cert-card',
    transform: 'translateY(-10px) rotateX(5deg) scale(1.02)',
    shadow:    '0 20px 40px rgba(0,255,136,0.15)',
  },
];

// ── Magnetic pull constants ───────────────────────────────────
const MAGNETIC_MAX_DISTANCE = 40;
const MAGNETIC_STRENGTH = 0.2;

/**
 * Entry point. Replaces initCursor() + initHoverEffects() +
 * initMagneticButtons().
 */
export function initInteractions() {
  if (IS_COARSE_POINTER) return;

  setupCursor();
  setupTilt();
  setupSimpleHover();
  setupMagneticPull();
}

// ── Cursor: dot, trail, particle spawn, hover labels ─────────
function setupCursor() {
  const cursor      = document.querySelector('.custom-cursor');
  const cursorDot   = document.querySelector('.cursor-dot');
  const cursorTrail = document.querySelector('.cursor-trail');

  if (!cursor || !cursorDot || !cursorTrail) return;

  let mouseX = 0, mouseY = 0;
  let trailX  = 0, trailY  = 0;
  let active  = false;

  document.addEventListener('mouseenter', () => {
    cursor.classList.add('is-active');
    active = true;
  });

  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('is-active');
    active = false;
  });

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

  function animateTrail() {
    trailX += (mouseX - trailX) * 0.1;
    trailY += (mouseY - trailY) * 0.1;
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top  = trailY + 'px';
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  const LABEL_MAP = {
    'nav-link':       'GO',
    'project-link':   'OPEN',
    'cert-card':      'CERT',
    'resume-btn':     'PDF',
  };

  document.addEventListener('mouseover', (e) => {
    const el = e.target.closest(
      'a, button, .skill-item, .nav-link, ' +
      '.highlight-item, .cert-card'
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
      'a, button, .skill-item, .nav-link, ' +
      '.highlight-item, .cert-card'
    );

    if (!el) return;

    if (!el.contains(e.relatedTarget)) {
      cursor.classList.remove('cursor-hover', 'cursor-text');
      cursorTrail.textContent = '';
    }
  });
}

function spawnParticle(x, y) {
  const p = document.createElement('div');
  p.className = 'cursor-particle';
  p.style.left = x + 'px';
  p.style.top  = y + 'px';
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 1000);
}

// ── 3D tilt (delegated) ───────────────────────────────────────
function setupTilt() {
  document.addEventListener('mousemove', (e) => {
    for (const { selector, preset } of TILT_TARGETS) {
      const el = e.target.closest(selector);
      if (el) {
        applyTilt(el, e, preset);
        break;
      }
    }
  });

  document.addEventListener('mouseout', (e) => {
    for (const { selector } of TILT_TARGETS) {
      const el = e.target.closest(selector);
      if (el && !el.contains(e.relatedTarget)) {
        resetTilt(el);
      }
    }
  });
}

function applyTilt(el, e, { rotateDiv, translateZ, translateY }) {
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const rotX = (y - rect.height / 2) / rotateDiv;
  const rotY = (rect.width / 2 - x) / rotateDiv;
  el.style.transform =
    `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(${translateZ}px) translateY(${translateY}px)`;
}

function resetTilt(el) {
  el.style.transform = '';
  el.style.boxShadow = '';
}

// ── Simple hover (delegated) ──────────────────────────────────
function setupSimpleHover() {
  document.addEventListener('mouseover', (e) => {
    for (const { selector, transform, shadow } of SIMPLE_HOVER_TARGETS) {
      const el = e.target.closest(selector);
      if (el) {
        el.style.transform = transform;
        if (shadow) el.style.boxShadow = shadow;
        break;
      }
    }
  });

  document.addEventListener('mouseout', (e) => {
    for (const { selector } of SIMPLE_HOVER_TARGETS) {
      const el = e.target.closest(selector);
      if (el && !el.contains(e.relatedTarget)) {
        el.style.transform = '';
        el.style.boxShadow = '';
      }
    }
  });
}

// ── Magnetic pull (delegated) ─────────────────────────────────
function setupMagneticPull() {
  document.addEventListener('mousemove', (e) => {
    const el = e.target.closest('a, button');
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const distance = Math.sqrt(x * x + y * y);

    if (distance < MAGNETIC_MAX_DISTANCE) {
      const force = (MAGNETIC_MAX_DISTANCE - distance) / MAGNETIC_MAX_DISTANCE;
      el.style.transform = `translate(${x * force * MAGNETIC_STRENGTH}px, ${y * force * MAGNETIC_STRENGTH}px)`;
    }
  });

  document.addEventListener('mouseout', (e) => {
    const el = e.target.closest('a, button');
    if (el && !el.contains(e.relatedTarget)) {
      el.style.transform = '';
    }
  });
}