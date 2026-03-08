/**
 * animations/education.js
 * Card reveals, CGPA/score counters, progress bar fills.
 */

import { animateCounter } from '../../utils.js';

export function animateEducationSection() {
  // Card reveals
  document.querySelectorAll('.education-card').forEach((card, i) => {
    if (card.dataset.animated) return;
    card.dataset.animated = 'true';
    setTimeout(() => card.classList.add('is-visible'), i * 300);
  });

  // Counters — start after cards begin appearing
  setTimeout(() => {
    const cgpa = document.querySelector('.cgpa-counter');
    if (cgpa && !cgpa.dataset.animated) {
      cgpa.dataset.animated = 'true';
      animateCounter(cgpa, 0, parseFloat(cgpa.dataset.target), 2000, 1);
    }

    document.querySelectorAll('.score-counter').forEach((counter, i) => {
      if (counter.dataset.animated) return;
      counter.dataset.animated = 'true';
      setTimeout(() => {
        animateCounter(counter, 0, parseFloat(counter.dataset.target), 1500, 0);
      }, i * 500);
    });
  }, 1000);

  // Progress bars
  setTimeout(() => {
    document.querySelectorAll('.progress-fill').forEach((bar, i) => {
      if (bar.dataset.animated) return;
      bar.dataset.animated = 'true';
      setTimeout(() => {
        bar.classList.add('animated');
        if (bar.classList.contains('hsc-progress'))  bar.style.width = '94%';
        else if (bar.classList.contains('sslc-progress')) bar.style.width = '82.8%';
        else bar.style.width = '74%'; // CGPA 7.4 / 10
      }, i * 300);
    });
  }, 1500);
}