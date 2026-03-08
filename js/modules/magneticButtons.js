/**
 * magneticButtons.js
 * Subtle magnetic pull effect on <a> and <button> elements.
 */

export function initMagneticButtons() {
  const MAX_DISTANCE = 40;

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const distance = Math.sqrt(x * x + y * y);

      if (distance < MAX_DISTANCE) {
        const force = (MAX_DISTANCE - distance) / MAX_DISTANCE;
        el.style.transform = `translate(${x * force * 0.2}px, ${y * force * 0.2}px)`;
      }
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}