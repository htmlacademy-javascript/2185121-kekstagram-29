import { createCards } from './data.js';

const template = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const container = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();
const data = createCards();

const createThumbnail = (picture) => {
  const newThumbnail = template.cloneNode(true);
  const image = newThumbnail.querySelector('.picture__img');
  image.src = picture.url;
  image.alt = picture.description;
  newThumbnail.querySelector('.picture__likes').textContent = picture.likes;
  newThumbnail.querySelector('.picture__comments').textContent = picture.comments.length;

  return newThumbnail;
};

const renderThumbnails = () => {
  data.forEach((picture) => fragment.append(createThumbnail(picture)));
  container.append(fragment);
};

export { renderThumbnails, data };
