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


// Theme toggle + video sync
const modeToggle = document.getElementById('mode-toggle');
const rootEl     = document.documentElement;
const THEME_KEY  = 'theme';

const lightVid = document.querySelector('.hero-video--light');
const darkVid  = document.querySelector('.hero-video--dark');

function syncVideos(theme){
  const isDark = theme === 'dark';
  // Play the visible one, pause the hidden one (saves battery/CPU)
  if (isDark){
    darkVid?.play().catch(()=>{});
    lightVid?.pause();
  } else {
    lightVid?.play().catch(()=>{});
    darkVid?.pause();
  }
}

function applyTheme(theme){
  rootEl.setAttribute('data-theme', theme);
  if (modeToggle) modeToggle.checked = (theme === 'dark');
  syncVideos(theme);
}

// Default: saved choice, otherwise light (Sunset)
// If you want to respect system on first visit, swap the line below with the commented block.
const saved = localStorage.getItem(THEME_KEY);
applyTheme(saved ? saved : 'light');

// Respect system preference on first visit (optional)
// applyTheme(saved ? saved : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

modeToggle?.addEventListener('change', () => {
  const next = modeToggle.checked ? 'dark' : 'light';
  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
});

// Reduced motion: stop autoplay completely
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  [lightVid, darkVid].forEach(v => v?.pause());
}
