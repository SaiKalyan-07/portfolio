/**
 * typewriter.js
 * Looping typewriter effect on the hero role line.
 * Cycles through ROLE_PHRASES forever: type, pause, delete, next.
 *
 * Owns the #hero-role-typed span completely — no static text,
 * no CSS animation on that span (would fight this).
 */

import { ROLE_PHRASES } from '../data/portfolio.js';

const TYPE_SPEED   = 65;
const DELETE_SPEED = 35;
const PAUSE_AFTER_TYPE = 1400;
const PAUSE_AFTER_DELETE = 220;

export function initTypewriter() {
  const el = document.querySelector('#hero-role-typed');
  if (!el) {
    console.warn('[typewriter] #hero-role-typed not found');
    return;
  }
  if (!ROLE_PHRASES || !ROLE_PHRASES.length) {
    console.warn('[typewriter] ROLE_PHRASES is empty');
    return;
  }

  let phraseIndex = 0;
  let charIndex   = 0;
  let deleting    = false;

  function tick() {
    const full = ROLE_PHRASES[phraseIndex];

    if (!deleting) {
      charIndex++;
      if (charIndex > full.length) {
        deleting = true;
        setTimeout(tick, PAUSE_AFTER_TYPE);
        return;
      }
      el.textContent = full.slice(0, charIndex);
      setTimeout(tick, TYPE_SPEED + Math.random() * 35);
    } else {
      charIndex--;
      if (charIndex < 0) {
        deleting = false;
        charIndex = 0;
        phraseIndex = (phraseIndex + 1) % ROLE_PHRASES.length;
        setTimeout(tick, PAUSE_AFTER_DELETE);
        return;
      }
      el.textContent = full.slice(0, charIndex);
      setTimeout(tick, DELETE_SPEED);
    }
  }

  tick();
}