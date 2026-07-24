/**
 * observer.js
 * Central IntersectionObserver.
 * Adds .is-visible to scroll-reveal elements and delegates
 * section-specific animation to their own modules.
 */

import { animateAboutSection }          from './animations/about.js';
import { animateCertificationsSection } from './animations/certifications.js';
import { animateProjectCard }           from './animations/projects.js';

export function initObserver() {
  const observer = new IntersectionObserver(onIntersect, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  const revealEls = document.querySelectorAll(
    '.section-header, .about-card, .skills-card, .project-card, ' +
    '.experience-card, .education-row, .contact-body'
  );
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.05}s`;
    observer.observe(el);
  });

  // Section-level triggers
  document.querySelectorAll('#certifications').forEach(section => {
    observer.observe(section);
  });
}

function onIntersect(entries) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    el.classList.add('is-visible');

    // Section-specific handlers
    if (el.id === 'certifications')                      animateCertificationsSection();
    else if (el.classList.contains('project-card'))      animateProjectCard(el);
  });
}