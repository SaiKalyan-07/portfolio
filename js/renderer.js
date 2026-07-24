/**
 * renderer.js
 * Reads data from portfolio.js and builds DOM for every dynamic section.
 */

import {
  PERSONAL,
  ABOUT,
  LOCATION,
  SKILLS,
  PROJECTS,
  EXPERIENCE,
  EDUCATION,
  CERTIFICATIONS,
} from './data/portfolio.js';

const S = {
  card:        'rounded-xl border border-accent/10 relative overflow-hidden transition-all duration-300',
  cardBg:      'background:linear-gradient(135deg,#1a1a1a,#222222)',
  accentText:  'text-shadow:0 0 10px rgba(0,255,136,0.5)',
  accentGlow:  'text-shadow:0 0 5px rgba(0,255,136,0.3)',
  techTag:     'px-3 py-1 rounded-full text-xs text-accent border border-accent/20 bg-accent/10',
  projectLink: 'project-link flex items-center gap-2 text-accent text-sm transition-all duration-300 hover:-translate-y-0.5',
};

export function renderAll() {
  renderPersonal();
  renderAbout();
  renderLocation();
  renderSkills();
  renderProjects();
  renderExperience();
  renderEducation();
  renderCertifications();
  renderContact();
  renderFooter();
}

function renderPersonal() {
  const { name, resume, profileImg, initials, status } = PERSONAL;

  q('#nav-logo-name')?.replaceChildren(document.createTextNode(name));

  q('#hero-name-text')?.replaceChildren(document.createTextNode(name));
  q('#hero-status-text')?.replaceChildren(document.createTextNode(status));
  q('#hero-resume-btn')?.setAttribute('href', resume);

  const img = q('#profile-img');
  if (img) img.src = profileImg;
  q('#profile-fallback span')?.replaceChildren(document.createTextNode(initials));
}

// ── About ──────────────────────────────────────────────────────────────────────
function renderAbout() {
  q('#about-overview')?.replaceChildren(document.createTextNode(ABOUT.overview));
}

// ── Location & Availability ───────────────────────────────────────────────────
function renderLocation() {
  q('#location-country')?.replaceChildren(document.createTextNode(LOCATION.country));
  q('#location-status')?.replaceChildren(document.createTextNode(LOCATION.status));
}

// ── Skills ─────────────────────────────────────────────────────────────────────
function renderSkills() {
  const mount = q('#mount-skills');
  if (!mount) return;

  mount.innerHTML = SKILLS.map(category => {
    const count = String(category.items.length).padStart(2, '0');
    return `
    <div class="skill-category-card">
      <div class="skill-category-header">
        <div class="skill-category-badge" style="--cat-color:${category.color}">
          <span class="skill-category-dot"></span>
          <span class="skill-category-name">${category.category.toUpperCase()}</span>
        </div>
        <span class="skill-category-count">${count}</span>
      </div>
      <div class="skill-items-row">
        ${category.items.map(item => `
          <span class="skill-pill">
            ${iconMarkup(item)}${item.label}
          </span>
        `).join('')}
      </div>
    </div>
  `;
  }).join('');
}

function iconMarkup(item) {
  if (item.type === 'devicon') {
    return `<i class="devicon-skill-icon ${item.icon}"></i>`;
  }
  if (item.type === 'simpleicon') {
    return `<img class="simpleicon-skill-icon" src="https://cdn.simpleicons.org/${item.icon}/${item.color}" alt="${item.label}">`;
  }
  if (item.type === 'local') {
    return `<img class="local-skill-icon" src="${item.icon}" alt="${item.label}">`;
  }
  if (item.type === 'fa') {
    return `<i class="fa-skill-icon ${item.icon}"></i>`;
  }
  return '';
}
function renderProjects() {
  const mount = q('#mount-projects');
  if (!mount) return;

  mount.innerHTML = PROJECTS.map(p => `
    <div class="project-card fade-in" data-project="${p.id}">
      <h3 class="project-title">${p.title}</h3>
      <ul class="project-bullets">
        ${p.bullets.map(b => `<li>${b}</li>`).join('')}
      </ul>
      <div class="project-tech">
        ${p.tech.map(t => `<span class="project-tag">${t}</span>`).join('')}
      </div>
      ${p.links && p.links.length ? `
      <div class="project-links">
        ${p.links.map(l => `
          <a href="${l.url}" target="_blank" rel="noopener noreferrer" class="project-link">
            <i class="fab fa-github"></i>
            <span>${l.label}</span>
          </a>
        `).join('')}
      </div>` : ''}
    </div>
  `).join('');
}

function renderExperience() {
  const mount = q('#mount-experience');
  if (!mount) return;

  mount.innerHTML = EXPERIENCE.map(job => `
    <div class="experience-card fade-in">
      <div class="exp-edu-header">
        <div class="exp-edu-logo-badge">
          <img src="${job.logo}" alt="${job.company} logo">
        </div>
        <div>
          <h3 class="experience-role">${job.role}</h3>
          <h4 class="experience-company">${job.company}</h4>
          <span class="exp-edu-meta">${job.period} &middot; ${job.location}</span>
        </div>
      </div>
      <ul class="experience-bullets">
        ${job.bullets.map(b => `<li>${b}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}

function renderEducation() {
  const mount = q('#mount-education');
  if (!mount) return;

  mount.innerHTML = EDUCATION.map(edu => `
    <div class="education-row fade-in">
      <div class="exp-edu-logo-badge exp-edu-logo-badge--sm">
        <img src="${edu.logo}" alt="${edu.institution} logo">
      </div>
      <div class="education-row-main">
        <h3 class="education-degree">${edu.degree}</h3>
        <h4 class="education-institution">${edu.institution}</h4>
      </div>
      <div class="education-row-meta">
        <span class="exp-edu-meta">${edu.period}</span>
        <span class="education-score">${edu.scoreText}</span>
      </div>
    </div>
  `).join('');
}

function renderCertifications() {
  const mount = q('#mount-certifications');
  if (!mount) return;

  mount.innerHTML = CERTIFICATIONS.map((cert, i) => {
    const delay = (0.1 + i * 0.1).toFixed(1);
    return `
      <div class="cert-card cert-fly-in flex items-center gap-4 p-5 ${S.card} duration-[800ms]
                  hover:-translate-y-2.5 hover:scale-[1.05] hover:border-accent/30
                  hover:shadow-[0_20px_40px_rgba(0,255,136,0.15)]"
           style="${S.cardBg};--delay:${delay}s;animation:flyIn 1s cubic-bezier(0.175,0.885,0.32,1.275) ${delay}s forwards;opacity:0;"
           data-direction="${cert.direction}">
        <div class="cert-icon relative w-[60px] h-[60px] flex items-center justify-center
                    rounded-full border-2 border-accent/20 text-[1.6rem] text-accent z-[1]"
             style="background:radial-gradient(circle,rgba(0,255,136,0.08),transparent);
                    text-shadow:0 0 8px rgba(0,255,136,0.5);animation:certIconPulse 3s ease-in-out infinite;">
          <i class="${cert.icon}"></i>
          <div class="cert-glow absolute -inset-[3px] rounded-full -z-[1]"
               style="background:conic-gradient(rgba(0,255,136,0.5),transparent,rgba(0,255,136,0.5));
                      animation:certGlow 4s linear infinite;"></div>
        </div>
        <div class="cert-content flex-1 relative z-[1]">
          <h3 class="text-text-primary text-base font-medium mb-2 leading-snug" style="min-height:2.5rem;">${cert.title}</h3>
          <p class="text-accent text-xs mb-1" style="${S.accentGlow}">${cert.issuer}</p>
          <span class="cert-date text-text-muted text-xs">${cert.year}</span>
        </div>
        <div class="cert-badge absolute top-3 right-3 w-[30px] h-[30px] rounded-full flex items-center justify-center"
             style="background:radial-gradient(circle,#00ff88,rgba(0,255,136,0.3));
                    box-shadow:0 0 15px rgba(0,255,136,0.5);animation:badgePulse 2s ease-in-out infinite;">
          <div class="badge-shine absolute inset-0 rounded-full"
               style="background:linear-gradient(45deg,transparent,rgba(255,255,255,0.4),transparent);
                      animation:badgeShine 3s ease-in-out infinite;"></div>
        </div>
      </div>
    `;
  }).join('');
}

function renderContact() {
  const mount = q('#mount-contact-links');
  if (mount) {
    const links = [
      { label: 'LinkedIn', url: PERSONAL.linkedin },
      { label: 'GitHub',   url: PERSONAL.github },
      { label: 'Email',    url: `mailto:${PERSONAL.email}` },
    ];
    mount.innerHTML = links.map(l => `
      <a href="${l.url}" ${l.label !== 'Email' ? 'target="_blank" rel="noopener noreferrer"' : ''} class="contact-link-item">
        <span>${l.label}</span>
        <i class="fas fa-arrow-up-right-from-square contact-link-arrow"></i>
      </a>
    `).join('');
  }
  q('#contact-cta-btn')?.setAttribute('href', `mailto:${PERSONAL.email}`);
  q('#contact-email-text')?.replaceChildren(document.createTextNode(PERSONAL.email));
}

function renderFooter() {
  q('#footer-watermark')?.replaceChildren(document.createTextNode(PERSONAL.fullName));

  const year = new Date().getFullYear();
  q('#footer-copyright')?.replaceChildren(document.createTextNode(`© ${year} ${PERSONAL.fullName}`));

  q('#footer-location')?.replaceChildren(document.createTextNode(PERSONAL.location.toUpperCase()));
  q('#footer-location-2')?.replaceChildren(document.createTextNode(PERSONAL.location));
}

function q(selector) {
  return document.querySelector(selector);
}