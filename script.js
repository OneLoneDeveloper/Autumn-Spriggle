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


// -------------------------
// Theme toggle + video sync
// -------------------------
const modeToggle = document.getElementById('mode-toggle');
const rootEl     = document.documentElement;
const THEME_KEY  = 'theme';

const lightVid = document.querySelector('.hero-video--light');
const darkVid  = document.querySelector('.hero-video--dark');

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getTheme() {
  return localStorage.getItem(THEME_KEY) || getSystemTheme();
}

function setTheme(theme, {persist = false} = {}) {
  rootEl.setAttribute('data-theme', theme);
  if (persist) localStorage.setItem(THEME_KEY, theme);
}

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

function setAboutGifForTheme(isDark) {
  const aboutGif = document.getElementById('about-gif');
  if (!aboutGif) return;
  const lightSrc = aboutGif.dataset.light || 'pinwheel.gif';
  const darkSrc  = aboutGif.dataset.dark  || 'pinwheel-dark.gif';
  if (aboutGif.src.endsWith(isDark ? darkSrc : lightSrc)) return; // avoid reload churn
  aboutGif.src = isDark ? darkSrc : lightSrc;
}

function syncThemeUIFromSource() {
  const theme = getTheme();
  // Apply theme to document
  setTheme(theme);
  // Sync toggle visual state (this is what fixes the back-button bug)
  if (modeToggle) modeToggle.checked = (theme === 'dark');
  // Sync any theme-coupled media/UI
  syncVideos(theme);
  setAboutGifForTheme(theme === 'dark');
}

// Initial apply (on first load)
syncThemeUIFromSource();

// User changes the toggle
modeToggle?.addEventListener('change', () => {
  const next = modeToggle.checked ? 'dark' : 'light';
  setTheme(next, { persist: true });
  syncVideos(next);
  setAboutGifForTheme(next === 'dark');
});

// Re-sync when the page is shown from BFCache (Back/Forward) or normal load
window.addEventListener('pageshow', () => {
  // If the user changed theme on another page, or OS theme changed, this keeps the UI accurate.
  syncThemeUIFromSource();
});

// Also react live if the OS theme changes *and* the user hasn't explicitly chosen a theme
const mql = window.matchMedia('(prefers-color-scheme: dark)');
mql.addEventListener?.('change', () => {
  if (!localStorage.getItem(THEME_KEY)) {
    syncThemeUIFromSource();
  }
});

// Reduced motion: stop autoplay completely
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  [lightVid, darkVid].forEach(v => v?.pause());
}


// -------------------------
// Contact form
// -------------------------
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('contact-status');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (statusEl) {
      statusEl.hidden = false;
      statusEl.textContent = 'Sending…';
    }

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });

      if (res.ok) {
        form.reset();
        if (statusEl) statusEl.textContent = 'Thanks! Your message has been sent.';
      } else {
        if (statusEl) statusEl.textContent = 'Something went wrong. Please try again.';
      }
    } catch (_) {
      if (statusEl) statusEl.textContent = 'Network error. Please try again.';
    }
  });
}


requestAnimationFrame(() => document.documentElement.classList.add('theme-ready'));