const COMMENT_LENGTH_INVALID_TEXT = 'Текст коментария должен быть не больше 140 символов!';
const HASHTAG_INVALID_TEXT = 'У вас не валидный хэштег, попробуйте запись ...';
const HASHTAG_INVALID_COUNT_TEXT = 'Хэштегов не должно быть больше пяти';
const HASHTAG_INVALID_SAME_TEXT = 'Нельзя использовать один и тот же хэштег больше одного раза';

const HASHTAGS_MAX_COUNT = 5;
const COMMENTS_MAX_LENGTH = 140;
const HASHTAG_TEMPLATE = /^#[a-zа-яё0-9]{1,19}$/i;

const uploadForm = document.querySelector('.img-upload__form');
const textHashtag = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

const checkDescriptionLength = (value) => value.length <= COMMENTS_MAX_LENGTH;

const checkHashtagCorrect = (value) => {
  if (!value.length) {
    return true;
  }
  const hashtags = value.trim().split(' ');
  return hashtags.every((element) => (HASHTAG_TEMPLATE.test(element)));
};

const checkHashtagsCount = (value) => {
  const hashtags = value.trim().split(' ');
  return hashtags.length <= HASHTAGS_MAX_COUNT;
};

const checkHashtagsSame = (value) => {
  const hashtags = value.trim().toLowerCase().split(' ');
  return hashtags.length === new Set(hashtags).size;
};

const pristineValidate = () => pristine.validate();
const resetPristine = () => pristine.reset();

const initValidator = () => {
  pristine.addValidator(textDescription, checkDescriptionLength, COMMENT_LENGTH_INVALID_TEXT, 1, true);
  pristine.addValidator(textHashtag, checkHashtagCorrect, HASHTAG_INVALID_TEXT, 1, true);
  pristine.addValidator(textHashtag, checkHashtagsCount, HASHTAG_INVALID_COUNT_TEXT, 1, true);
  pristine.addValidator(textHashtag, checkHashtagsSame, HASHTAG_INVALID_SAME_TEXT, 1, true);
};

export { initValidator, pristineValidate, resetPristine };
