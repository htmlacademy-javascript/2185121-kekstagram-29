import { isEscapeKey } from '../utils/util.js';
import { initScale, resetScale } from './scale.js';
import { initEffects } from './effects-editor.js';
import { initValidator, validatePristine, resetPristine } from './validation.js';
import { sendData } from '../utils/api.js';
import { initMessage } from '../utils/messages.js';

const SEND_URL = 'https://29.javascript.pages.academy/kekstagram';

const SEND_SUCCESS = {
  class: 'success',
  text: 'Изображение успешно загружено',
  buttonText: 'Круто!'
};

const SEND_ERROR = {
  class: 'error',
  text: 'Ошибка загрузки файла',
  buttonText: 'Попробовать ещё раз'
};

const FILE_ERROR = {
  class: 'error',
  text: 'Недопустимое расширение для выбранного файла',
  buttonText: 'Понятно'
};

const EXTENSION_REGEXP = /.\.(jpg|png|jpeg|gif|webp)$/i;

const uploadInput = document.querySelector('.img-upload__input');
const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const effectsList = document.querySelector('.img-upload__effects');
const currentEffectValue = effectsList.querySelector('input:checked').value;
const submitButton = document.querySelector('.img-upload__submit');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectsPreviewImages = document.querySelectorAll('.effects__preview');

const effectsListChangeHandler = (evt) => initEffects(evt.target.value);


const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', documentKeydownHandler);
};

const closeUploadForm = () => {
  uploadForm.reset();
  resetScale();
  resetPristine();
  initEffects(currentEffectValue);
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', documentKeydownHandler);
};

const showImagePreview = (evt) => {
  const fileUrl = URL.createObjectURL(evt.target.files[0]);
  imagePreview.src = fileUrl;
  effectsPreviewImages.forEach((effect) => (effect.style.backgroundImage = `url(${fileUrl})`));
};

const uploadInputChangeHandler = (evt) => {
  if (evt.target.value.match(EXTENSION_REGEXP)) {
    openUploadForm();
    showImagePreview(evt);
    return;
  }
  initMessage(FILE_ERROR.class, FILE_ERROR.text, FILE_ERROR.buttonText);
};

const setButtonState = (state) => {
  submitButton.disabled = state;
};

// функции сообщений об ошибке/успехе
const uploadSuccess = () => {
  closeUploadForm();
  initMessage(SEND_SUCCESS.class, SEND_SUCCESS.text, SEND_SUCCESS.buttonText);
  setButtonState(false);
};

const uploadError = () => {
  initMessage(SEND_ERROR.class, SEND_ERROR.text, SEND_ERROR.buttonText);
  setButtonState(false);
};

//обработчик отправки формы
const uploadFormSubmitHandler = (evt) => {
  evt.preventDefault();
  if (validatePristine()) {
    setButtonState(true);
    sendData(SEND_URL, new FormData(evt.target), uploadSuccess, uploadError);
  }
};

const imgUploadCancelClickHandler = () => closeUploadForm();

const isInput = (evt) => evt.target.closest('.text__hashtags') || evt.target.closest('.text__description');

function documentKeydownHandler(evt) {
  if (isEscapeKey(evt) && !isInput(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
}

const initUploadForm = () => {
  initValidator();
  initScale();
  initEffects(currentEffectValue);
  effectsList.addEventListener('change', effectsListChangeHandler);
  uploadInput.addEventListener('change', uploadInputChangeHandler);
  uploadForm.addEventListener('submit', uploadFormSubmitHandler);
  imgUploadCancel.addEventListener('click', imgUploadCancelClickHandler);
};

export { initUploadForm };
