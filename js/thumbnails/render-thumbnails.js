import { showFullSizeImage } from './shows-full-size-image.js';

const template = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const container = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

const createThumbnail = (picture) => {
  const newThumbnail = template.cloneNode(true);
  const image = newThumbnail.querySelector('.picture__img');
  image.src = picture.url;
  image.alt = picture.description;
  newThumbnail.querySelector('.picture__likes').textContent = picture.likes;
  newThumbnail.querySelector('.picture__comments').textContent = picture.comments.length;

  newThumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    showFullSizeImage(picture);
  });

  return newThumbnail;
};

const renderThumbnails = (data) => {
  data.forEach((picture) => fragment.append(createThumbnail(picture)));
  container.append(fragment);
};

export { renderThumbnails };
