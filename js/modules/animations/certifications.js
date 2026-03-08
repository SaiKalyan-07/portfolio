/**
 * animations/certifications.js
 * Cert card staggered reveal + achievement popup.
 */

export function animateCertificationsSection() {
  const cards = document.querySelectorAll('.cert-card');

  cards.forEach((card, i) => {
    if (card.dataset.animated) return;
    card.dataset.animated = 'true';
    setTimeout(() => card.classList.add('is-visible'), i * 150);
  });

  // Show achievement popup after all cards have appeared
  setTimeout(showAchievementPopup, cards.length * 150 + 1000);
}

function showAchievementPopup() {
  const popup = document.querySelector('.cert-achievement-popup');
  if (!popup || popup.dataset.shown) return;
  popup.dataset.shown = 'true';
  popup.classList.add('show');
  setTimeout(() => popup.classList.remove('show'), 3000);
}