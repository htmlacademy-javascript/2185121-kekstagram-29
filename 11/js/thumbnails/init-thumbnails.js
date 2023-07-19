import { renderThumbnails } from './render-thumbnails.js';
import { getData } from '../utils/api.js';
import { initFilter, getFilteringData } from './filter.js';

const DATA_URL = 'https://29.javascript.pages.academy/kekstagram/data';
const ERROR_GET_DATA = 'Ошибка загрузки данных. Попробуйте перезагрузить страницую';
const DELAY = 3000;

const onGetSuccess = (data) => {
  initFilter(data);
  renderThumbnails(getFilteringData(data));
};

const onGetError = () => {
  const errorMessage = document.createElement('div');
  errorMessage.classList.add('get-error');
  errorMessage.textContent = ERROR_GET_DATA;
  document.body.append(errorMessage);

  setTimeout(() => {
    errorMessage.remove();
  }, DELAY);
};

const initThumbnails = () => {
  getData(DATA_URL, onGetSuccess, onGetError);
};

export { initThumbnails };
