import { getRandomNumber, getRandomArrayElement } from './util.js';

const PHOTO_COUNT = 25;

const DESCRIPTIONS = [
  'Красиво',
  'и правда',
  'ну такое себе',
  'первая фотка',
  'LOL это уже не модно',
  'Когда к Дудю?',
  'Почему сервера падают в Июне? Потому что June=)',
  'не смешно?',
  'мне тоже, но надо делать',
  'А вообще смешно',
  'Ну понял , june типа джун, а там июнь)',
];

const NAMES = [
  'Никита',
  'Павел',
  'Лили',
  'Маршал',
  'Тэд',
  'Робин',
  'Барни',
  'Подожди-Подожди'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const Likes = {
  MIN: 15,
  MAX: 200
};

const Avatars = {
  MIN: 1,
  MAX: 6
};

const Comments = {
  MIN: 1,
  MAX: 30
};

let integerId = 1;
let commentsId = 1;

const createMessage = () => {
  const messages = Array.from({ length: getRandomNumber(1, 2) }, () => getRandomArrayElement(MESSAGES));
  return Array.from(new Set(messages)).join(' ');
};

const createComment = () => ({
  id: commentsId++,
  avatar: `img/avatar-${getRandomNumber(Avatars.MIN, Avatars.MAX)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES)
});

const createPicture = () => ({
  id: integerId,
  url: `photos/${integerId++}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomNumber(Likes.MIN, Likes.MAX),
  comments: Array.from({ length: getRandomNumber(Comments.MIN, Comments.MAX) }, createComment)
});

const createCards = () => Array.from({ length: PHOTO_COUNT }, createPicture);

export { createCards };
