/* =========================================================
   1) Header / Navigation
   ========================================================= */

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


/* =========================================================
   2) 
   ========================================================= */

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

const saved = localStorage.getItem(THEME_KEY);
applyTheme(saved ? saved : 'light');

modeToggle?.addEventListener('change', () => {
  const next = modeToggle.checked ? 'dark' : 'light';
  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
  const isDark = document.documentElement.classList.contains('dark') ||
                 document.body.classList.contains('dark') ||
                 document.documentElement.dataset.theme === 'dark';
  setAboutGifForTheme(isDark);
});


// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Reduced motion: stop autoplay completely
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  [lightVid, darkVid].forEach(v => v?.pause());
}


// Place near your theme code
const aboutGif = document.getElementById('about-gif');

function setAboutGifForTheme(isDark) {
  if (!aboutGif) return;
  const lightSrc = aboutGif.dataset.light || 'pinwheel.gif';
  const darkSrc  = aboutGif.dataset.dark  || 'pinwheel-dark.gif';
  aboutGif.src = isDark ? darkSrc : lightSrc;
}

// 1) run once on load (adjust selector to match how you mark dark mode)
setAboutGifForTheme(
  document.documentElement.classList.contains('dark') ||
  document.body.classList.contains('dark') ||
  document.documentElement.dataset.theme === 'dark'
);







const form = document.getElementById('contact-form');
const statusEl = document.getElementById('contact-status');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusEl.hidden = false;
    statusEl.textContent = 'Sending…';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });

      if (res.ok) {
        form.reset();
        statusEl.textContent = 'Thanks! Your message has been sent.';
      } else {
        statusEl.textContent = 'Something went wrong. Please try again.';
      }
    } catch (_) {
      statusEl.textContent = 'Network error. Please try again.';
    }
  });
}
