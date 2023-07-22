import { renderThumbnails } from './render-thumbnails.js';
import { getData } from '../utils/api.js';
import { initFilter, getFilteringData } from './filter.js';
import { initMessage } from '../utils/messages.js';

const DATA_URL = 'https://29.javascript.pages.academy/kekstagram/data';
const ERROR_TEXT = 'Ошибка загрузки данных.';
const STATE = 'error';

const onGetSuccess = (data) => {
  initFilter(data);
  renderThumbnails(getFilteringData(data));
};

const onGetError = () => {
  initMessage(STATE, ERROR_TEXT);
};

const initThumbnails = () => {
  getData(DATA_URL, onGetSuccess, onGetError);
};

export { initThumbnails };
