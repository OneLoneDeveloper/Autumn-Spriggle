// Lightbox logic
(function () {
  const images = document.querySelectorAll('.card-media img');
  if (!images.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.hidden = true;

  const overlayImg = document.createElement('img');
  overlayImg.className = 'lightbox-image';
  overlay.appendChild(overlayImg);

  const closeBtn = document.createElement('button');
  closeBtn.className = 'lightbox-close';
  closeBtn.setAttribute('aria-label', 'Close image');
  closeBtn.innerHTML = '&times;';
  overlay.appendChild(closeBtn);

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
  closeBtn.addEventListener('click', closeOverlay);
  document.body.appendChild(overlay);

  const openOverlay = (img) => {
    overlayImg.src = img.src;
    overlay.hidden = false;
    document.addEventListener('keydown', onKeydown);
  };

  images.forEach((img) => {
    img.addEventListener('click', () => openOverlay(img));
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openOverlay(img);
      }
    });
  });
})();