const template = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const container = document.querySelector('.pictures');

const createThumbnail = ({url, description, likes, comments}) => {
  const newThumbnail = template.cloneNode(true);
  const image = newThumbnail.querySelector('.picture__img');
  image.src = url;
  image.alt = description;
  newThumbnail.querySelector('.picture__likes').textContent = likes;
  newThumbnail.querySelector('.picture__comments').textContent = comments.length;

  return newThumbnail;
};

const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => fragment.append(createThumbnail(picture)));
  container.append(fragment);
};

export {renderThumbnails};
