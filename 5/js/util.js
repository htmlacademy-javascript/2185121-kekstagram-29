const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const getRandomArrayElement = (elements) => elements[getRandomNumber (0, elements.length - 1)];

export {getRandomNumber, getRandomArrayElement};
