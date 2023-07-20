import { isEscapeKey } from '../utils/util.js';


// const createMessage = (value) => {
//   const message = document.createElement('section');

//   message.classList.add(value);
//   message.append(document.createElement('div'));

//   const innerContainer = message.querySelector('div');
//   innerContainer.classList.add(`${value}__inner`);
//   innerContainer.append(document.createElement('h2'));
//   innerContainer.append(document.createElement('button'));

//   const header = innerContainer.querySelector('h2');
//   header.classList.add(`${value}__title`);
//   header.textContent = HEADER_TEXT[value];

//   const button = innerContainer.querySelector('button');
//   button.classList.add(`${value}__button`);
//   button.type = 'button';
//   button.textContent = BUTTON_TEXT[value];

//   document.body.append(message);

// };

const createMessage = (value, headerText, btnState, btnText) => {
  const newMessage = `<section class="${value}">
  <div class="${value}__inner">
    <h2 class="${value}__title">${headerText}</h2>
    ${btnState ? `<button type="button" class="${value}__button">${btnText}</button>` : ''}
  </div>
</section>`;

  document.body.insertAdjacentHTML('beforeend', newMessage);
};

const deleteDocumentHandlers = () => {
  document.removeEventListener('keydown', onPopupKeydown);
  document.removeEventListener('click', popupCancelHandler);
};

const popupClose = () => {
  if (document.querySelector('.success')) {
    document.querySelector('.success').remove();
    deleteDocumentHandlers();
    return;
  }
  document.querySelector('.error').remove();
  deleteDocumentHandlers();
};

const checkCursorPosition = (evt) => {
  if (evt.target === document.querySelector('.success') || evt.target === document.querySelector('.error')) {
    popupClose();
  }
};

const popupCancelButtonHandler = () => popupClose();

function popupCancelHandler(evt) {
  checkCursorPosition(evt);
}

function onPopupKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    popupClose();
  }
}

function getHandler(value) {
  document.querySelector(`.${value}__button`).addEventListener('click', popupCancelButtonHandler);
  document.addEventListener('click', popupCancelHandler);
  document.addEventListener('keydown', onPopupKeydown);
}

const initMessage = (value, headerText, btnState, btnText = '') => {
  createMessage(value, headerText, btnState, btnText);
  getHandler(value);
};

export { initMessage, createMessage };
