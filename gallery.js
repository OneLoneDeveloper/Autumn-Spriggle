// Page-specific JS for the Full Gallery
(function () {

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
