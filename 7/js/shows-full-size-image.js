import { isEscapeKey } from './util.js';
import { data } from './render-thumbnails.js';
const bigPictureContainer = document.querySelector('.big-picture');
const buttonClose = bigPictureContainer.querySelector('.big-picture__cancel');
const container = document.querySelector('.pictures');
const bodyContainer = document.querySelector('body');
// const commentsCount = bigPictureContainer.querySelector('.social__comment-count');
// const commentsLoader = bigPictureContainer.querySelector('.comments-loader');
const bigPictureImage = bigPictureContainer.querySelector('.big-picture__img img');
const bigPictureDescription = bigPictureContainer.querySelector('.social__caption');
const bigPictureLikes = bigPictureContainer.querySelector('.likes-count');
const bigPictureCommentsCount = bigPictureContainer.querySelector('.comments-count');
const commentsList = bigPictureContainer.querySelector('.social__comments');
const commentsTemplate = commentsList.querySelector('.social__comment');

let indexNumber = 0;

const createComment = (element) => {
  const newComment = commentsTemplate.cloneNode(true);
  const image = newComment.querySelector('.social__picture');
  const text = newComment.querySelector('.social__text');
  image.src = element.avatar;
  image.alt = element.name;
  text.textContent = element.message;
  commentsList.append(newComment);
};

const createComments = () => {
  commentsList.textContent = '';
  const commentsArray = data[indexNumber].comments;
  commentsArray.forEach((element) => createComment(element));
};

const createBigPicture = () => {
  const currentDataElement = data[indexNumber];
  bigPictureDescription.textContent = currentDataElement.description;
  bigPictureImage.src = currentDataElement.url;
  bigPictureLikes.textContent = currentDataElement.likes;
  bigPictureCommentsCount.textContent = currentDataElement.comments.length;
};


const openUserModal = () => {
  createBigPicture();
  createComments();
  bigPictureContainer.classList.remove('hidden');
  bodyContainer.classList.add('modal-open');
  // commentsCount.classList.add('hidden');
  // commentsLoader.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeUserModal = () => {
  bigPictureContainer.classList.add('hidden');
  bodyContainer.classList.remove('modal-open');
  // commentsCount.classList.remove('hidden');
  // commentsLoader.classList.remove('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
}

buttonClose.addEventListener('click', () => {
  closeUserModal();
});

// обработчик событий клика на миниатюры
const onThumbnailsClick = (evt) => {
  const pictureList = document.querySelectorAll('.picture');
  if (evt.target.closest('.picture')) {
    const clickedElement = evt.target.closest('.picture');
    indexNumber = Array.prototype.indexOf.call(pictureList, clickedElement);
    openUserModal();
  }
};

container.addEventListener('click', onThumbnailsClick);
