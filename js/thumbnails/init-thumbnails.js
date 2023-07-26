import { getData } from '../utils/api.js';
import { initFilter, renderFilteringPictures } from './filter.js';
import { initMessage } from '../utils/messages.js';

const DATA_URL = 'https://29.javascript.pages.academy/kekstagram/data';

const GetError = {
  CLASS: 'error',
  TEXT: 'Ошибка загрузки данных.',
};

const onGetSuccess = (data) => {
  initFilter(data);
  renderFilteringPictures(document.querySelector('.img-filters__button--active').id, data);
};

const onGetError = () => initMessage(GetError.CLASS, GetError.TEXT);

const initThumbnails = () => getData(DATA_URL, onGetSuccess, onGetError);

export { initThumbnails };
