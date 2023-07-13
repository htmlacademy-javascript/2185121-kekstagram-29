import { isEscapeKey } from './util.js';
import { initScale, resetScale } from './scale.js';
import { initEffects,updateEffects } from './effects-editor.js';

const uploadInput = document.querySelector('.img-upload__input');
const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const effectsList = document.querySelector('.effects__list');
const currentEffectValue = effectsList.querySelector('input:checked').value;

const onEffectsListChange = (evt) => updateEffects(evt.target.value);

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeUploadForm = () => {
  uploadForm.reset();
  resetScale();
  updateEffects(currentEffectValue);
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const uploadInputChangeHandler = () => openUploadForm();

const uploadFormSubmitHandler = (evt) => {
  evt.preventDefault();
};

const imgUploadCancelClickHandler = () => closeUploadForm();

const isInput = (evt) => evt.target.closest('.text__hashtags') || evt.target.closest('.text__description');

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isInput(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
}

const initUploadForm = () => {
  initScale();
  initEffects(currentEffectValue);
  effectsList.addEventListener('change', onEffectsListChange);
  uploadInput.addEventListener('change', uploadInputChangeHandler);
  uploadForm.addEventListener('submit', uploadFormSubmitHandler);
  imgUploadCancel.addEventListener('click', imgUploadCancelClickHandler);
};

export { initUploadForm };
