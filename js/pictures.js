import '/js/data.js';

const picturesContainer = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('.picture');

const showUsersPictures = function (arr) {
  const fragment = document.createDocumentFragment();

  arr.forEach(({url, likes, comments, id}) => {
    const pictureElement = template.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.setAttribute('data-id', id);
    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
};

const clearPopupData = () => {
  const socialCommentsCount = document.querySelector('.social__comment-count');
  const commentsLoader = document.querySelector('.comments-loader');
  socialCommentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  const commentsBlock = document.querySelector('.social__comments');
  commentsBlock.innerHTML = '';
};

export {
  showUsersPictures,
  clearPopupData
};
