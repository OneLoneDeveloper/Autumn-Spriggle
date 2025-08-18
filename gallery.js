// Page-specific JS for the Full Gallery
(function () {
  // Populate footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme toggle (optional enhancement if your global script doesn't handle it)
  const html = document.documentElement;
  const toggle = document.getElementById('mode-toggle');
  if (toggle) {
    // Initialize checkbox state based on current theme
    toggle.checked = (html.getAttribute('data-theme') === 'dark');

    toggle.addEventListener('change', () => {
      const next = toggle.checked ? 'dark' : 'light';
      html.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch {}
    });

    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') {
        html.setAttribute('data-theme', saved);
        toggle.checked = (saved === 'dark');
      }
    } catch {}
  }

  // Lightbox: click an image to view full screen
  const images = document.querySelectorAll('.card-media img');
  if (!images.length) return;

  // Create a single overlay we reuse
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.hidden = true;

  const overlayImg = document.createElement('img');
  overlayImg.className = 'lightbox-image';
  overlay.appendChild(overlayImg);

  // Close on click or Escape
  const closeOverlay = () => {
    overlay.hidden = true;
    overlayImg.src = '';
    document.removeEventListener('keydown', onKeydown);
  };

  const onKeydown = (e) => {
    if (e.key === 'Escape') {
      closeOverlay();
    }
  };

  overlay.addEventListener('click', closeOverlay);
  document.body.appendChild(overlay);

  images.forEach((img) => {
    img.addEventListener('click', () => {
      overlayImg.src = img.src;
      overlay.hidden = false;
      document.addEventListener('keydown', onKeydown);
    });
  });
})();
