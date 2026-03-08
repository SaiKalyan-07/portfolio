/**
 * contact.js
 * Contact form handling.
 *
 * TODO: Replace submitContactForm() body with a real email service.
 * Options: Formspree (formspree.io), EmailJS (emailjs.com), Netlify Forms.
 * Only this one function needs to change — no other file is affected.
 */

import { isValidEmail } from '../utils.js';

export function initContact() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', handleSubmit);

  // Focus glow on inputs
  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', () => {
      input.style.boxShadow = '0 0 20px rgba(0,255,136,0.3)';
    });
    input.addEventListener('blur', () => {
      input.style.boxShadow = '';
    });
  });
}

function handleSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;

  const name    = form.querySelector('#name').value.trim();
  const email   = form.querySelector('#email').value.trim();
  const subject = form.querySelector('#subject').value.trim();
  const message = form.querySelector('#message').value.trim();

  if (!name || !email || !subject || !message) {
    showNotification('Please fill in all fields', 'error');
    return;
  }
  if (!isValidEmail(email)) {
    showNotification('Please enter a valid email address', 'error');
    return;
  }

  submitContactForm(form, { name, email, subject, message });
}

/**
 * TODO: Replace the setTimeout simulation with a real email service call.
 * e.g. for Formspree:
 *   const res = await fetch('https://formspree.io/f/YOUR_ID', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(data),
 *   });
 *   if (res.ok) { ... show success ... }
 */
async function submitContactForm(form, data) {
  const btn = form.querySelector('.submit-btn');
  const originalHTML = btn.innerHTML;

  btn.innerHTML  = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled   = true;
  btn.style.opacity = '0.7';

  // — Simulated send (replace this block with real API call) —
  await new Promise(resolve => setTimeout(resolve, 2000));
  // ——————————————————————————————————————————————————————————

  btn.innerHTML  = '<i class="fas fa-check"></i> Message Sent!';
  btn.style.background = 'linear-gradient(45deg, #00ff88, #00cc6a)';
  btn.style.opacity    = '1';

  form.querySelectorAll('input, textarea').forEach(f => { f.value = ''; });
  showNotification("Message sent! I'll get back to you soon.", 'success');

  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.disabled  = false;
    btn.style.background = '';
  }, 3000);
}

function showNotification(message, type = 'info') {
  const bgColor = {
    success: 'linear-gradient(45deg, #00ff88, #00cc6a)',
    error:   'linear-gradient(45deg, #ff4444, #cc3333)',
    info:    'linear-gradient(45deg, #00ff88, rgba(0,255,136,0.8))',
  }[type];

  const icon = { success: '✅', error: '❌', info: 'ℹ️' }[type];

  const n = document.createElement('div');
  n.className = 'notification';
  n.dataset.type = type;
  n.innerHTML = `${icon} ${message}`;
  document.body.appendChild(n);

  // Slide in
  requestAnimationFrame(() => n.classList.add('is-visible'));

  const remove = () => {
    n.classList.remove('is-visible');
    setTimeout(() => n.remove(), 400);
  };

  const timer = setTimeout(remove, 4000);
  n.addEventListener('click', () => { clearTimeout(timer); remove(); });
}