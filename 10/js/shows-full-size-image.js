import { isEscapeKey } from './util.js';

const COMMENT_COUNTER = 5;

const bigPictureContainer = document.querySelector('.big-picture');
const buttonClose = document.querySelector('.big-picture__cancel');
const container = document.querySelector('.pictures');
const commentsCount = document.querySelector('.social__comment-count');
const bigPictureImage = document.querySelector('.big-picture__img img');
const bigPictureDescription = document.querySelector('.social__caption');
const bigPictureLikes = document.querySelector('.likes-count');
const commentsContainer = document.querySelector('.social__comments');
const commentsTemplate = document.querySelector('.social__comment');
const commentsLoaderButton = document.querySelector('.comments-loader');

let showingComments = 0;
let comments;

const fillCommentsCounter = () => {
  commentsCount.innerHTML = `${showingComments} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const setButtonState = () => {
  if (showingComments >= comments.length) {
    commentsLoaderButton.classList.add('hidden');
    return;
  }
  commentsLoaderButton.classList.remove('hidden');
};

const createComment = (element) => {
  const newComment = commentsTemplate.cloneNode(true);
  const image = newComment.querySelector('.social__picture');
  image.src = element.avatar;
  image.alt = element.name;
  newComment.querySelector('.social__text').textContent = element.message;

  return newComment;
};

const renderComments = () => {
  const fragment = document.createDocumentFragment();
  const currentComments = comments.slice(showingComments, showingComments + COMMENT_COUNTER);
  showingComments = Math.min(showingComments + COMMENT_COUNTER, comments.length);
  currentComments.forEach((comment) => fragment.append(createComment(comment)));
  commentsContainer.append(fragment);
  setButtonState();
  fillCommentsCounter();
};

const fillUserModal = (data) => {
  bigPictureDescription.textContent = data.description;
  bigPictureImage.src = data.url;
  bigPictureLikes.textContent = data.likes;
  renderComments();
};

const openUserModal = () => {
  bigPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  buttonClose.addEventListener('click', onButtonCloseClick);
  commentsLoaderButton.addEventListener('click', onCommentsLoaderButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeUserModal = () => {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  buttonClose.removeEventListener('click', onButtonCloseClick);
  commentsLoaderButton.removeEventListener('click', onCommentsLoaderButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  showingComments = 0;
};

//функции обработчиков
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !evt.target.closest('.social__footer-text')) {
    evt.preventDefault();
    closeUserModal();
  }
}

function onCommentsLoaderButtonClick(evt) {
  evt.preventDefault();
  renderComments();
}

function onButtonCloseClick(evt) {
  evt.preventDefault();
  closeUserModal();
}

//Функция создания большой картинки и проверка что есть на странице контейнер,чтоб код не ломался
const showFullSizeImage = (data) => {
  if (!container) {
    return;
  }
  commentsContainer.textContent = '';
  comments = data.comments;
  fillUserModal(data);

  openUserModal();
};

export { showFullSizeImage };
