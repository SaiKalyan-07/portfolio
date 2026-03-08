/**
 * observer.js
 * Central IntersectionObserver.
 * Adds .is-visible to scroll-reveal elements and delegates
 * section-specific animation to their own modules.
 */

import { animateAboutSection }          from './animations/about.js';
import { animateEducationSection }      from './animations/education.js';
import { animateCertificationsSection } from './animations/certifications.js';
import { animateSkillItems }            from './animations/skills.js';
import { animateProjectCard }           from './animations/projects.js';

export function initObserver() {
  const observer = new IntersectionObserver(onIntersect, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  // Generic scroll-reveal elements — includes about-intro paragraph
  const revealEls = document.querySelectorAll(
    '.section-header, .about-intro, .skill-category, .project-card, .timeline-item, .contact-info, .contact-form'
  );
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.05}s`;
    observer.observe(el);
  });

  // Section-level triggers
  document.querySelectorAll('#about, #education, #certifications').forEach(section => {
    observer.observe(section);
  });
}

function onIntersect(entries) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    el.classList.add('is-visible');

    // Section-specific handlers
    if (el.id === 'about')                               animateAboutSection();
    else if (el.id === 'education')                      animateEducationSection();
    else if (el.id === 'certifications')                 animateCertificationsSection();
    else if (el.classList.contains('skill-category'))    animateSkillItems(el);
    else if (el.classList.contains('project-card'))      animateProjectCard(el);
  });
}