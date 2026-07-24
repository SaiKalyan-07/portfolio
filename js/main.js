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
import { initRipple }          from './modules/ripple.js';
import { initNavbar }          from './modules/navbar.js';
import { initSmoothScroll }    from './modules/smoothScroll.js';
import { initParallax }        from './modules/parallax.js';
import { initObserver }        from './modules/observer.js';

import { initTypewriter }      from './modules/typewriter.js';
import { initProfileImage }    from './modules/profileImage.js';
// interactions.js replaces cursor.js, hover.js, and
// magneticButtons.js (all three deleted — migration complete).
import { initInteractions }    from './modules/interactions.js';

document.addEventListener('DOMContentLoaded', () => {
  // Must be first — all other modules query DOM that renderer creates
  renderAll();

  initRipple();
  initNavbar();
  initSmoothScroll();
  initParallax();
  initObserver();
  
  initTypewriter();
  initProfileImage();
  initInteractions(); // cursor + tilt/hover + magnetic pull

  console.log('🚀 Sai Kalyan Portfolio loaded');
  console.log('⚛️  React.js | Node.js | Full-Stack Engineer');
  console.log('📧 skravikumar2004@gmail.com | 📱 +91 7305467190');
});
