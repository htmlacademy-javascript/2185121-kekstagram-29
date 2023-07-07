import { isEscapeKey } from './util.js';
import { data } from './render-thumbnails.js';

const bigPictureContainer = document.querySelector('.big-picture');
const buttonClose = bigPictureContainer.querySelector('.big-picture__cancel');
const container = document.querySelector('.pictures');
const bodyContainer = document.querySelector('body');
const commentsCount = bigPictureContainer.querySelector('.social__comment-count');
const bigPictureImage = bigPictureContainer.querySelector('.big-picture__img img');
const bigPictureDescription = bigPictureContainer.querySelector('.social__caption');
const bigPictureLikes = bigPictureContainer.querySelector('.likes-count');
const commentsContainer = bigPictureContainer.querySelector('.social__comments');
const commentsTemplate = commentsContainer.querySelector('.social__comment');
const commentsLoaderButton = bigPictureContainer.querySelector('.comments-loader');

let indexNumber = 0;
let commentsNumberCounter;

const createComment = (element) => {
  const newComment = commentsTemplate.cloneNode(true);
  const image = newComment.querySelector('.social__picture');
  const text = newComment.querySelector('.social__text');
  image.src = element.avatar;
  image.alt = element.name;
  text.textContent = element.message;
  newComment.classList.add('hidden');
  commentsContainer.append(newComment);
};

const createBigPicture = () => {
  const currentDataElement = data[indexNumber];
  bigPictureDescription.textContent = currentDataElement.description;
  bigPictureImage.src = currentDataElement.url;
  bigPictureLikes.textContent = currentDataElement.likes;
};

const createComments = () => {
  commentsContainer.textContent = '';
  const commentsArray = data[indexNumber].comments;
  commentsArray.forEach((element) => createComment(element));
};

//Проверка на сколько коментариев
const checkQuantityComments = () => {
  const commentsList = commentsContainer.querySelectorAll('.social__comment');
  if (commentsList.length - commentsNumberCounter <= 0) {
    commentsList.forEach((value) => {
      value.classList.remove('hidden');
    });
    commentsCount.innerHTML = `${commentsList.length} из <span class="comments-count">${commentsList.length}</span> комментариев`;
    commentsLoaderButton.classList.add('hidden');
  } else {
    for (let i = 0; i < commentsNumberCounter; i++) {
      commentsList[i].classList.remove('hidden');
    }
    commentsCount.innerHTML = `${commentsNumberCounter} из <span class="comments-count">${commentsList.length}</span> комментариев`;
    commentsNumberCounter += 5;
  }
};


const openUserModal = () => {
  createBigPicture();
  createComments();
  commentsNumberCounter = 5;
  checkQuantityComments();
  commentsLoaderButton.addEventListener('click', checkQuantityComments);
  bigPictureContainer.classList.remove('hidden');
  bodyContainer.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeUserModal = () => {
  bigPictureContainer.classList.add('hidden');
  bodyContainer.classList.remove('modal-open');
  commentsLoaderButton.removeEventListener('click', checkQuantityComments);
  commentsLoaderButton.classList.remove('hidden');
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
