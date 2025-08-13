'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // --- Modal / image gallery code ---
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const captionText = document.getElementById('modalCaption');
  const closeBtn = document.querySelector('.close');

  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      modal.style.display = 'block';
      modalImg.src = img.src;
      captionText.textContent = img.alt || '';
    });
  });

  document.querySelectorAll('.gallery-item-artists img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      modal.style.display = 'block';
      modalImg.src = img.src;
      captionText.textContent = img.alt || '';
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
  });
});
