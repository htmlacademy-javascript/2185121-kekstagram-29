import { renderThumbnails } from './render-thumbnails.js';

const filters = document.querySelector('.img-filters');
const imgFiltersForm = document.querySelector('.img-filters__form');
const container = document.querySelector('.pictures');

const getFilteringData = (data) => {
  // return data.slice('').sort((a, b) => a.comments.length - b.comments.length);
  return data;
};

const initFilter = (data) => {
  filters.classList.remove('img-filters--inactive');

  imgFiltersForm.addEventListener('click', (evt) => {
    if (evt.target.closest('.img-filters__button')) {
      container.querySelectorAll('.picture').forEach((image) => image.remove());
      renderThumbnails(getFilteringData(data));
    }
  });
};

export { initFilter, getFilteringData };
