/**
 * parallax.js
 * Scroll-based parallax transform on floating decorative icons.
 */

import { throttle } from '../utils.js';

export function initParallax() {
  window.addEventListener('scroll', throttle(() => {
    const scrollY = window.scrollY;
    const icons = document.querySelectorAll('.floating-icon, .floating-element');
    icons.forEach((icon, i) => {
      const speed = 0.3 + i * 0.1;
      icon.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * 0.05 * (i + 1)}deg)`;
    });
  }, 16));
}