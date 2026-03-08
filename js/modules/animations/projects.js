/**
 * animations/projects.js
 * Project card entrance reset (cards start hidden via .fade-in,
 * observer adds .is-visible which transitions them in).
 */

export function animateProjectCard(card) {
  card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
  card.style.opacity   = '1';
}