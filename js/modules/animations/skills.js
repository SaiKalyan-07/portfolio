/**
 * animations/skills.js
 * Staggered reveal of skill items within a category card.
 */

export function animateSkillItems(categoryEl) {
  categoryEl.querySelectorAll('.skill-item').forEach((item, i) => {
    setTimeout(() => {
      item.style.transform = 'translateY(0) scale(1)';
      item.style.opacity   = '1';
    }, i * 100);
  });
}