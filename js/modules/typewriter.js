/**
 * typewriter.js
 * Typewriter effect on the hero greeting.
 *
 * Owns the .greeting span completely:
 *   - HTML has no static text in that span
 *   - No CSS animation on that span (would fight this)
 *   - This module sets opacity, types, adds cursor blink
 */

export function initTypewriter() {
  const greeting = document.querySelector('.hero-title .greeting');
  if (!greeting) {
    console.warn('[typewriter] .hero-title .greeting not found');
    return;
  }

  // Wait for hero entrance animations to settle before typing starts
  setTimeout(() => typeWrite(greeting, "Hello, I'm Sai Kalyan", 85), 800);
}

function typeWrite(element, text, speed = 85) {
  element.textContent = '';
  element.style.opacity = '1';

  // Blinking cursor character appended during typing
  let i = 0;

  function type() {
    if (i < text.length) {
      element.textContent = text.slice(0, i + 1) + '|';
      i++;
      setTimeout(type, speed + Math.random() * 35);
    } else {
      // Typing done — blink cursor then remove it
      element.textContent = text;
      blinkCursor(element, text);
    }
  }

  type();
}

function blinkCursor(element, text) {
  let visible = true;
  let blinks  = 0;
  const MAX   = 6; // blink 6 times then disappear cleanly

  const interval = setInterval(() => {
    element.textContent = visible ? text + '|' : text;
    visible = !visible;
    blinks++;
    if (blinks >= MAX * 2) {
      clearInterval(interval);
      element.textContent = text;
    }
  }, 500);
}