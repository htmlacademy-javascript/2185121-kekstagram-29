import { isEscapeKey } from '../utils/util.js';
import { initScale, resetScale } from './scale.js';
import { initEffects } from './effects-editor.js';
import { initValidator, validatePristine, resetPristine } from './validation.js';
import { sendData } from '../utils/api.js';
import { initMessage } from './messages.js';

const DATA_URL = 'https://29.javascript.pages.academy/kekstagram';

const MESSAGE_STATUS = {
  success: 'success',
  error: 'error'
};

const uploadInput = document.querySelector('.img-upload__input');
const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const effectsList = document.querySelector('.img-upload__effects');
const currentEffectValue = effectsList.querySelector('input:checked').value;
const submitButton = document.querySelector('.img-upload__submit');

const onEffectsListChange = (evt) => initEffects(evt.target.value);


const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeUploadForm = () => {
  uploadForm.reset();
  resetScale();
  resetPristine();
  initEffects(currentEffectValue);
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const uploadInputChangeHandler = () => openUploadForm();

const uploadSuccess = () => {
  initMessage(MESSAGE_STATUS.success);
  closeUploadForm();
};

const uploadError = () => {
  initMessage(MESSAGE_STATUS.error);
};

const uploadFormSubmitHandler = async (evt) => {
  evt.preventDefault();
  if (validatePristine()) {
    submitButton.disabled = true;
    await sendData(DATA_URL, new FormData(evt.target), uploadSuccess, uploadError);
    submitButton.disabled = false;
  }
};

const imgUploadCancelClickHandler = () => closeUploadForm();

const isInput = (evt) => evt.target.closest('.text__hashtags') || evt.target.closest('.text__description');
const isPopup = () => Boolean(document.querySelector('.success')) || Boolean(document.querySelector('.error'));
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isInput(evt) && !isPopup()) {
    evt.preventDefault();
    closeUploadForm();
  }
}

const initUploadForm = () => {
  initValidator();
  initScale();
  initEffects(currentEffectValue);
  effectsList.addEventListener('change', onEffectsListChange);
  uploadInput.addEventListener('change', uploadInputChangeHandler);
  uploadForm.addEventListener('submit', uploadFormSubmitHandler);
  imgUploadCancel.addEventListener('click', imgUploadCancelClickHandler);
};

export { initUploadForm };
