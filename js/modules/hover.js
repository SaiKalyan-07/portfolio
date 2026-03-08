/**
 * hover.js
 * 3D perspective tilt and simple hover effects.
 * Separated from animation modules because these are interaction
 * effects, not scroll-triggered entrance animations.
 */

export function initHoverEffects() {
  init3DTilt('.skill-item',    { rotateDiv: 8,  translateZ: 20, translateY: -8  });
  init3DTilt('.project-card',  { rotateDiv: 12, translateZ: 30, translateY: -15 });
  initSimpleHover('.cert-card',       'translateY(-10px) rotateX(5deg) scale(1.02)',  '0 20px 40px rgba(0,255,136,0.15)');
  initSimpleHover('.education-card',  'translateY(-10px) rotateX(5deg) scale(1.02)',  '0 20px 40px rgba(0,255,136,0.15)');
  initSimpleHover('.timeline-content','translateX(15px) scale(1.02)',                 '');
}

/**
 * Full 3D perspective tilt on mousemove.
 */
function init3DTilt(selector, { rotateDiv, translateZ, translateY }) {
  document.querySelectorAll(selector).forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotX = (y - rect.height / 2) / rotateDiv;
      const rotY = (rect.width / 2 - x) / rotateDiv;
      el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(${translateZ}px) translateY(${translateY}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      el.style.boxShadow = '';
    });
  });
}

/**
 * Simple enter/leave hover — no mousemove tracking needed.
 */
function initSimpleHover(selector, transformValue, shadowValue) {
  document.querySelectorAll(selector).forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.transform  = transformValue;
      if (shadowValue) el.style.boxShadow = shadowValue;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform  = '';
      el.style.boxShadow  = '';
    });
  });
}