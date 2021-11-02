const userFileInput = document.querySelector('#upload-file');
const imageEditForm = document.querySelector('.img-upload__overlay');
const btnClose = document.querySelector('#upload-cancel');
const inputHashtag = document.querySelector('.text__hashtags');
const inputComment = document.querySelector('.text__description');

const MAX_COMMENT_LENGTH = 140;
const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;


const closePopup = (callback) => {
  if (document.activeElement === inputComment) {
    return;
  }
  imageEditForm.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', callback);
};

const handleKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup(handleKeyDown);
  }
};

const handleCloseButtonClick = (evt) => {
  evt.preventDefault();
  closePopup(handleKeyDown);
};

btnClose.addEventListener('click', handleCloseButtonClick);
document.addEventListener('keydown', handleKeyDown);

userFileInput.addEventListener('change', () => {
  imageEditForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', handleKeyDown);
});

const validateHashtags = (val) => {
  const tagArray = val.split(' ').filter((item) => !!item);
  let errorString = '';
  for (const tagName of tagArray) {
    if (!tagName.trim().match(re)) {
      errorString = 'Неправильный формат тега';
    }
  }
  if (!errorString && tagArray.length > 5) {
    errorString = 'Максимум 5 хештегов';
  }
  inputHashtag.setCustomValidity(errorString);
  inputHashtag.reportValidity();
  return !errorString;
};

const handleHashtagInput = (evt) => {
  if (!evt.target.value) {
    return;
  }
  validateHashtags(evt.target.value);
};


const validateComment = (val) => {
  let errorString = '';
  if (val.length > 140) {
    errorString = `Длина комментария не должна превышать ${MAX_COMMENT_LENGTH} символов`;
  }
  inputComment.setCustomValidity(errorString);
  inputComment.reportValidity();
  return !errorString;
};


const handleCommentInput = (evt) => {
  if (!evt.target.value) {
    return;
  }
  validateComment(evt.target.value);
};

inputHashtag.addEventListener('input', handleHashtagInput);

inputComment.addEventListener('input', handleCommentInput);

imageEditForm.addEventListener('submit', (evt) => {
  evt.preventDefault;
  const hashtagValue = inputHashtag.target.value;
  const commentValue = inputComment.target.value;

  let hasError = false;

  hasError = !validateHashtags(hashtagValue);
  hasError = !validateComment(commentValue);

  if (hasError) {
    return;
  }

  imageEditForm.submit();
});
