import galleryItems from './gallery-items.js';

const gallery = document.querySelector('ul.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const closeModalOverlay = document.querySelector('div.lightbox__overlay');
const lightboxImage = document.querySelector('img.lightbox__image');
const btnCloseModal = document.querySelector(
  'button[data-action="close-lightbox"]',
);
// создание разметки
galleryItems.map((el, index) => {
  gallery.innerHTML += `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${el.original}"
  >
    <img
      class="gallery__image"
      src="${el.preview}"
      data-source="${el.original}"
      alt="${el.description}"
      data-index="${index}"
    />
  </a>
</li>`;
});

gallery.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  let modalLink = e.target.dataset.source;
  lightbox.classList.add('is-open');
  lightboxImage.src = modalLink;
  lightboxImage.dataset.index = e.target.dataset.index;
  window.addEventListener('keydown', listenEvent);
});

btnCloseModal.addEventListener('click', closeModal);
closeModalOverlay.addEventListener('click', closeModal);

function listenEvent(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
  if (e.key === 'ArrowLeft') {
    ArrowLeft();
  }
  if (e.key === 'ArrowRight') {
    ArrowRight();
  }
}

function closeModal() {
  lightbox.classList.remove('is-open');
  lightboxImage.src = '';
  window.removeEventListener('keydown', listenEvent);
}

function SetSrcImage(step, index) {
  lightboxImage.dataset.index = `${index + step}`;
  lightboxImage.src = galleryItems[index + step].original;
}

function ArrowLeft() {
  let index = +lightboxImage.dataset.index;
  if (index === 0) {
    SetSrcImage(0, galleryItems.length - 1);
    return;
  }
  SetSrcImage(-1, index);
}

function ArrowRight() {
  let index = +lightboxImage.dataset.index;
  if (index === galleryItems.length - 1) {
    SetSrcImage(0, 0);
    return;
  }
  SetSrcImage(1, index);
}
