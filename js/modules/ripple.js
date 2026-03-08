/**
 * ripple.js
 * Spawns a CSS-animated ripple on every document click.
 * Uses a CSS class instead of inline cssText.
 */

export function initRipple() {
  document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = (e.clientX - 15) + 'px';
    ripple.style.top  = (e.clientY - 15) + 'px';
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
}