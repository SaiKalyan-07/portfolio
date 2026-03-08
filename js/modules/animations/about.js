/**
 * animations/about.js
 * Staggered reveal of .highlight-item elements.
 */

export function animateAboutSection() {
  document.querySelectorAll('.highlight-item').forEach((item, i) => {
    if (item.dataset.animated) return;
    item.dataset.animated = 'true';
    setTimeout(() => item.classList.add('is-visible'), i * 200);
  });
}