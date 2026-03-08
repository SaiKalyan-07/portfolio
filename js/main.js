/**
 * main.js
 * Entry point. Imports and initialises every module.
 * This is the only file referenced in index.html.
 *
 * Order matters:
 *   1. renderAll()   — builds all dynamic DOM from data/portfolio.js
 *   2. Everything else — queries the DOM that renderer just created
 */

import { renderAll }           from './renderer.js';
import { initCursor }          from './modules/cursor.js';
import { initMagneticButtons } from './modules/magneticButtons.js';
import { initRipple }          from './modules/ripple.js';
import { initNavbar }          from './modules/navbar.js';
import { initSmoothScroll }    from './modules/smoothScroll.js';
import { initParallax }        from './modules/parallax.js';
import { initHoverEffects }    from './modules/hover.js';
import { initObserver }        from './modules/observer.js';
import { initContact }         from './modules/contact.js';
import { initTypewriter }      from './modules/typewriter.js';
import { initProfileImage }    from './modules/profileImage.js';

document.addEventListener('DOMContentLoaded', () => {
  // Must be first — all other modules query DOM that renderer creates
  renderAll();

  initCursor();
  initMagneticButtons();
  initRipple();
  initNavbar();
  initSmoothScroll();
  initParallax();
  initHoverEffects();
  initObserver();
  initContact();
  initTypewriter();
  initProfileImage();

  console.log('🚀 Sai Kalyan Portfolio loaded');
  console.log('⚛️  React.js | Node.js | Full-Stack Engineer');
  console.log('📧 skravikumar2004@gmail.com | 📱 +91 7305467190');
});