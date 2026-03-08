/**
 * renderer.js
 * Reads data from portfolio.js and builds DOM for every dynamic section.
 *
 * Each render function targets a mount point in index.html:
 *   <div id="mount-highlights">   ← About section highlights
 *   <div id="mount-skills">       ← Skills grid
 *   <div id="mount-projects">     ← Projects grid
 *   <div id="mount-experience">   ← Timeline
 *   <div id="mount-education">    ← Education cards
 *   <div id="mount-certifications"> ← Cert cards
 *   <div id="mount-contact-info"> ← Contact details
 *
 * HTML in index.html shrinks to structural shell only.
 * All content lives in js/data/portfolio.js.
 */

import {
  PERSONAL,
  HIGHLIGHTS,
  SKILLS,
  PROJECTS,
  EXPERIENCE,
  EDUCATION,
  CERTIFICATIONS,
} from './data/portfolio.js';

// ── Shared style constants ────────────────────────────────────────────────────
// These are Tailwind utility strings reused across multiple templates.
// Defining them here avoids repeating long strings and makes updates
// a single-line change.
const S = {
  card:        'rounded-xl border border-accent/10 relative overflow-hidden transition-all duration-300',
  cardBg:      'background:linear-gradient(135deg,#1a1a1a,#222222)',
  accentText:  'text-shadow:0 0 10px rgba(0,255,136,0.5)',
  accentGlow:  'text-shadow:0 0 5px rgba(0,255,136,0.3)',
  techTag:     'px-3 py-1 rounded-full text-xs text-accent border border-accent/20 bg-accent/10',
  projectLink: 'project-link flex items-center gap-2 text-accent text-sm transition-all duration-300 hover:-translate-y-0.5',
};

// ── Entry point ───────────────────────────────────────────────────────────────
export function renderAll() {
  renderPersonal();
  renderHighlights();
  renderSkills();
  renderProjects();
  renderExperience();
  renderEducation();
  renderCertifications();
  renderContactInfo();
}

// ── Personal (hero text, nav logo, footer) ────────────────────────────────────
function renderPersonal() {
  const { name, role, subtitle, description, resume, profileImg, initials } = PERSONAL;

  // Nav logo
  q('#nav-logo-name')?.replaceChildren(document.createTextNode(name));

  // Hero
  q('#hero-role')?.replaceChildren(document.createTextNode(role));
  q('#hero-subtitle')?.replaceChildren(document.createTextNode(subtitle));
  q('#hero-description')?.replaceChildren(document.createTextNode(description));
  q('#hero-resume-btn')?.setAttribute('href', resume);

  // Profile image
  const img = q('#profile-img');
  if (img) img.src = profileImg;
  q('#profile-fallback span')?.replaceChildren(document.createTextNode(initials));

  // Footer — col 1: identity
  q('#footer-name')?.replaceChildren(document.createTextNode(name));
  q('#footer-role')?.replaceChildren(document.createTextNode(PERSONAL.role));
  q('#footer-status')?.replaceChildren(document.createTextNode(PERSONAL.status));
  q('#footer-resume')?.setAttribute('href', PERSONAL.resume);

  // Footer — col 1: social icons
  q('#footer-linkedin')?.setAttribute('href', PERSONAL.linkedin);
  q('#footer-github')?.setAttribute('href', PERSONAL.github);
  q('#footer-email-icon')?.setAttribute('href', `mailto:${PERSONAL.email}`);

  // Footer — col 3: contact details
  q('#footer-email')?.setAttribute('href', `mailto:${PERSONAL.email}`);
  q('#footer-email-text')?.replaceChildren(document.createTextNode(PERSONAL.email));
  q('#footer-phone')?.replaceChildren(document.createTextNode(PERSONAL.phone));
  q('#footer-location')?.replaceChildren(document.createTextNode(PERSONAL.location));
  q('#footer-linkedin-text')?.setAttribute('href', PERSONAL.linkedin);
  q('#footer-github-text')?.setAttribute('href', PERSONAL.github);
}

// ── About highlights ──────────────────────────────────────────────────────────
function renderHighlights() {
  const mount = q('#mount-highlights');
  if (!mount) return;

  mount.innerHTML = HIGHLIGHTS.map((h, i) => `
    <div class="highlight-item fade-in flex flex-col gap-3 p-5 rounded-xl
                border border-accent/10 bg-accent/5 transition-all duration-300
                hover:-translate-y-1.5 hover:bg-accent/8
                hover:border-accent/30 hover:shadow-[0_10px_24px_rgba(0,255,136,0.1)]"
         style="--delay:${0.15 + i * 0.08}s">
      <div class="flex items-center gap-3">
        <div class="highlight-icon w-[38px] h-[38px] flex items-center justify-center
                    bg-accent/10 rounded-xl border border-accent/20 shrink-0">
          <i class="${h.icon} text-accent text-sm" style="${S.accentText}"></i>
        </div>
        <p class="text-text-primary text-sm leading-snug">${h.text}</p>
      </div>
      <span class="text-accent/60 text-xs font-medium tracking-wide pl-[50px]">${h.sub}</span>
    </div>
  `).join('');
}

// ── Skills grid ───────────────────────────────────────────────────────────────
function renderSkills() {
  const mount = q('#mount-skills');
  if (!mount) return;

  mount.innerHTML = SKILLS.map(category => `
    <div class="skill-category fade-in p-6 ${S.card}
                hover:-translate-y-2.5 hover:shadow-[0_20px_40px_rgba(0,255,136,0.1)]
                hover:border-accent/30"
         style="${S.cardBg};transform-style:preserve-3d;align-self:start;">
      <h3 class="text-accent text-xl font-semibold mb-5 relative z-[1]" style="${S.accentText}">
        ${category.category}
      </h3>
      <div class="skill-items grid gap-3" style="grid-template-columns:repeat(auto-fit,minmax(120px,1fr));">
        ${category.items.map(item => {
          let iconEl;
          if (item.type === 'svg') {
            iconEl = `<span class="devicon-skill-icon" style="display:flex;align-items:center;justify-content:center;">${item.icon}</span>`;
          } else if (item.type === 'devicon') {
            iconEl = `<i class="devicon-skill-icon ${item.icon}"></i>`;
          } else {
            iconEl = `<i class="fa-skill-icon ${item.icon}"></i>`;
          }
          return `
          <div class="skill-item flex flex-col items-center p-4 rounded-xl bg-accent/5
                      transition-all duration-300 cursor-none relative overflow-hidden"
               data-skill="${item.label}">
            ${iconEl}
            <span class="text-xs text-text-primary text-center mt-2">${item.label}</span>
          </div>`;
        }).join('')}
      </div>
    </div>
  `).join('');
}

// ── Projects grid ─────────────────────────────────────────────────────────────
function renderProjects() {
  const mount = q('#mount-projects');
  if (!mount) return;

  mount.innerHTML = PROJECTS.map(p => `
    <div class="project-card fade-in ${S.card} duration-500 cursor-none"
         style="${S.cardBg};transform-style:preserve-3d;" data-project="${p.id}">
      <div class="project-image h-[200px] flex items-center justify-center relative overflow-hidden"
           style="background:linear-gradient(135deg,rgba(0,255,136,0.1),rgba(0,255,136,0.05));">
        <div class="text-[4rem] text-accent opacity-70" style="${S.accentText}">
          <i class="${p.icon}"></i>
        </div>
      </div>
      <div class="project-content p-6 relative z-[1]">
        <h3 class="text-xl font-semibold text-text-primary mb-3" style="${S.accentGlow}">${p.title}</h3>
        <p class="text-text-muted leading-relaxed mb-5">${p.description}</p>
        <div class="project-tech flex flex-wrap gap-2 mb-5">
          ${p.tech.map(t => `<span class="${S.techTag}" style="box-shadow:0 0 5px rgba(0,255,136,0.2);">${t}</span>`).join('')}
        </div>
        <div class="project-links flex gap-4">
          ${p.links.map(l => `
            <a href="${l.url}" target="_blank" rel="noopener noreferrer"
               class="${S.projectLink}" style="${S.accentGlow}">
              <i class="fab fa-github"></i>
              <span>${l.label}</span>
            </a>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// ── Experience timeline ───────────────────────────────────────────────────────
function renderExperience() {
  const mount = q('#mount-experience');
  if (!mount) return;

  mount.innerHTML = EXPERIENCE.map(job => `
    <div class="timeline-item fade-in relative mb-8 pl-[80px]">
      <div class="timeline-marker absolute left-5 top-0 w-5 h-5 rounded-full border-4 z-[2]"
           style="background:#00ff88;border-color:#0a0a0a;animation:pulse 2s infinite;box-shadow:0 0 20px rgba(0,255,136,0.5);"></div>
      <div class="timeline-content p-6 ${S.card} duration-300
                  hover:translate-x-2.5 hover:border-accent/30
                  hover:shadow-[0_10px_30px_rgba(0,255,136,0.1)]"
           style="${S.cardBg};">
        <h3 class="text-accent text-xl font-semibold mb-2 relative z-[1]" style="${S.accentText}">${job.role}</h3>
        <h4 class="text-text-primary mb-3 relative z-[1]">${job.company}</h4>
        <span class="text-text-muted text-sm block mb-2 relative z-[1]">${job.period}</span>
        <span class="text-text-muted text-sm block mb-3 relative z-[1]">${job.location}</span>
        <ul class="list-none p-0 relative z-[1]">
          ${job.bullets.map(b => `
            <li class="relative pl-5 mb-2 text-text-muted leading-relaxed
                       before:content-['▸'] before:absolute before:left-0 before:text-accent">
              ${b}
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `).join('');
}

// ── Education cards ───────────────────────────────────────────────────────────
function renderEducation() {
  const mount = q('#mount-education');
  if (!mount) return;

  mount.innerHTML = EDUCATION.map((edu, i) => {
    const delay  = (i * 0.3).toFixed(1);
    const isGrad = edu.iconClass === 'graduation-cap';
    const iconAnim = isGrad
      ? 'animation:graduationFloat 4s ease-in-out infinite;'
      : 'animation:iconFloat 3s ease-in-out infinite alternate;';
    const scoreDisplay = edu.scoreMax
      ? `${edu.scoreLabel}: <span class="${edu.scoreClass} text-accent font-bold text-base"
           style="${S.accentText}" data-target="${edu.score}">0${edu.decimals ? '.0' : ''}</span>/${edu.scoreMax}`
      : `${edu.scoreLabel}: <span class="${edu.scoreClass} text-accent font-bold text-base"
           style="${S.accentText}" data-target="${edu.score}">0</span>%`;
    const barClass = edu.barClass ? ` ${edu.barClass}` : '';

    return `
      <div class="education-card flip-card flex items-center gap-5 p-6 ${S.card} duration-300
                  hover:-translate-y-2 hover:scale-[1.02] hover:border-accent/30
                  hover:shadow-[0_15px_30px_rgba(0,255,136,0.15)]"
           style="${S.cardBg};animation:flipIn 0.8s ease ${delay}s forwards;opacity:0;--delay:${delay}s;">
        <div class="education-icon ${edu.iconClass} relative w-20 h-20 flex items-center
                    justify-center shrink-0 rounded-full border-[3px] border-accent/30 text-[2.5rem] text-accent"
             style="background:radial-gradient(circle,rgba(0,255,136,0.1),transparent);
                    text-shadow:0 0 15px rgba(0,255,136,0.5);${iconAnim}">
          <i class="${edu.icon} block"></i>
          <div class="icon-glow absolute -inset-[5px] rounded-full opacity-60 -z-[1]"
               style="background:conic-gradient(#00ff88,transparent,#00ff88);animation:rotate 4s linear infinite;"></div>
        </div>
        <div class="education-details flex-1 relative z-[1]">
          <h3 class="text-text-primary text-lg font-medium mb-2">${edu.degree}</h3>
          <h4 class="text-accent mb-2" style="text-shadow:0 0 8px rgba(0,255,136,0.3);">${edu.institution}</h4>
          <span class="text-text-muted text-sm block mb-3">${edu.period}</span>
          <div class="education-grade p-3 rounded-xl border border-accent/20 mt-3"
               style="background:rgba(0,255,136,0.05);">
            <span class="text-text-primary text-sm">${scoreDisplay}</span>
            <div class="grade-progress w-full h-2 rounded mt-2 overflow-hidden relative"
                 style="background:rgba(0,255,136,0.1);">
              <div class="progress-fill${barClass} h-full rounded w-0 transition-all duration-[2s] ease-in-out relative"
                   style="background:linear-gradient(90deg,#00ff88,rgba(0,255,136,0.6));
                          box-shadow:0 0 10px rgba(0,255,136,0.5);"
                   data-width="${edu.barWidth}"></div>
            </div>
          </div>
        </div>
        <div class="education-particles absolute inset-0 pointer-events-none overflow-hidden"></div>
      </div>
    `;
  }).join('');
}

// ── Certifications grid ───────────────────────────────────────────────────────
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

// ── Contact info ──────────────────────────────────────────────────────────────
function renderContactInfo() {
  const mount = q('#mount-contact-info');
  if (!mount) return;

  const items = [
    { icon: 'fas fa-envelope',        text: PERSONAL.email },
    { icon: 'fas fa-phone',           text: PERSONAL.phone },
    { icon: 'fas fa-map-marker-alt',  text: PERSONAL.location },
    { icon: 'fas fa-briefcase',       text: PERSONAL.status },
  ];

  mount.innerHTML = items.map(item => `
    <div class="contact-item flex items-center gap-4 mb-4 transition-transform duration-300 hover:translate-x-1.5">
      <i class="${item.icon} text-accent text-lg min-w-5" style="${S.accentText}"></i>
      <span class="text-text-primary">${item.text}</span>
    </div>
  `).join('');
}

// ── Utility ───────────────────────────────────────────────────────────────────
function q(selector) {
  return document.querySelector(selector);
}