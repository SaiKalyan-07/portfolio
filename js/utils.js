/**
 * utils.js
 * Pure utility functions — no DOM dependencies.
 * Safe to import anywhere and easy to unit test.
 */

/**
 * Throttle a function to fire at most once per `limit` ms.
 * @param {Function} func
 * @param {number} limit - milliseconds
 * @returns {Function}
 */
export function throttle(func, limit) {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => { inThrottle = false; }, limit);
    }
  };
}

/**
 * Animate a numeric counter from start to end using easeOutCubic.
 * @param {HTMLElement} element - element whose textContent will be updated
 * @param {number} start
 * @param {number} end
 * @param {number} duration - ms
 * @param {number} decimals - decimal places to display
 */
export function animateCounter(element, start, end, duration, decimals = 0) {
  const startTime = Date.now();
  const range = end - start;

  function update() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOutCubic = 1 - Math.pow(1 - progress, 3);
    const current = start + range * easeOutCubic;

    element.textContent = decimals > 0
      ? current.toFixed(decimals)
      : Math.floor(current).toString();

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = decimals > 0
        ? end.toFixed(decimals)
        : end.toString();
    }
  }

  update();
}

/**
 * Validate a basic email address format.
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}