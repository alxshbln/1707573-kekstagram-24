import '/js/data.js';

const popup = document.querySelector('.big-picture');
const commentsLoader = document.querySelector('.social__comments-loader');
const commentsBlock = document.querySelector('.social__comments');
const commentsCountBlock = document.querySelector('.social__comment-count');


const setCommentsCount = (visibleCount) => {
  const blockActiveCount = commentsCountBlock.querySelector('.comments-visible-count');
  blockActiveCount.innerText = visibleCount;
};

const COMMENTS_PART_COUNT = 5;

const clearPopupData = () => {
  commentsBlock.innerHTML = '';
};

const closePopup = (callback) => {
  popup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  clearPopupData();

  document.removeEventListener('keydown', callback);
};


const handleKeyDown = (evt) => {

  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup(handleKeyDown);
  }
};

const modalCloseElement = document.querySelector('#picture-cancel');
modalCloseElement.addEventListener('click', () => {
  closePopup();
});

const createComment = function (message, link, name, isVisible) {
  const textEl = document.createElement('p');
  textEl.textContent = message;
  textEl.classList.add('social__text');

  const userAvatar = document.createElement('img');
  userAvatar.src = link;
  userAvatar.classList.add('social__picture');
  userAvatar.alt = name || '';

  const li = document.createElement('li');
  li.appendChild(userAvatar);
  li.appendChild(textEl);
  li.classList.add('social__comment');

  if (!isVisible) {
    li.style.display = 'none';
  }

  return li;
};

const showPopup = function (post) {
  popup.classList.remove('hidden');
  commentsBlock.innerHTML = '';

  const bigPictureImg = popup.querySelector('.big-picture__img img');
  const likesCount = popup.querySelector('.likes-count');
  const commentsCount = popup.querySelector('.comments-count');
  const socialComments = popup.querySelector('.social__comments');
  const socialCaption = popup.querySelector('.social__caption');

  bigPictureImg.src = post.url;
  likesCount.textContent = post.likes;
  commentsCount.textContent = post.comments.length;
  socialCaption.textContent = post.description;

  socialComments.innerHtml = '';
  post.comments.forEach((item, index) => {
    socialComments.appendChild( createComment(item.message, item.avatar, item.name, index < COMMENTS_PART_COUNT ) );
  });

  const startCommentsCountValue = post.comments.length < COMMENTS_PART_COUNT
    ? post.comments.length
    : COMMENTS_PART_COUNT;

  setCommentsCount(startCommentsCountValue);

  commentsLoader.style.display = startCommentsCountValue >= COMMENTS_PART_COUNT ? 'block' : 'none';

  document.body.classList.add('modal-open');

  document.addEventListener('keydown', handleKeyDown);
};


const watchClickThumbnail = function (posts) {
  const picturesContainer = document.querySelector('.pictures');

  picturesContainer.addEventListener('click', (evt) => {
    if (!evt.target.matches('img[class="picture__img"]')) {
      return;
    }

    const postId = +(evt.target.parentElement.getAttribute('data-id'));
    const post = posts.find((item) => item.id === postId);
    showPopup(post);
  });
};


const handleShowMoreClick = () => {
  const commentsList = commentsBlock.querySelectorAll('li');

  let nextCommentsCount = 0;
  let index = 0;

  for (const comment of commentsList) {
    if (nextCommentsCount >= COMMENTS_PART_COUNT) {
      setCommentsCount(index);
      return;
    }


    if (comment.style.display !== 'none') {
      index++;
      continue;
    }

    comment.style.display = 'flex';
    nextCommentsCount++;
    index++;
  }

  setCommentsCount(index);

  if (index >= commentsList.length - COMMENTS_PART_COUNT) {
    commentsLoader.style.display = 'none';
  }


};

commentsLoader.addEventListener('click', handleShowMoreClick);

export { watchClickThumbnail };
