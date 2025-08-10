// Mobile menu + smooth anchor scrolling + footer year
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

// Smooth anchor scrolling & close mobile menu
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      if (nav) nav.classList.remove('open');
      if (toggle) toggle.setAttribute('aria-expanded','false');
    }
  });
});

// Mobile menu
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
