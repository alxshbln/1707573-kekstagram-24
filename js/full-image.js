import '/js/data.js';

const popup = document.querySelector('.big-picture');

const clearPopupData = () => {
  const socialCommentsCount = document.querySelector('.social__comment-count');
  const commentsLoader = document.querySelector('.comments-loader');
  socialCommentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  const commentsBlock = document.querySelector('.social__comments');
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


const createComment = function (message, link) {
  const textEl = document.createElement('p');
  textEl.textContent = message;
  textEl.classList.add('social__text');

  const userAvatar = document.createElement('img');
  userAvatar.src = link;
  userAvatar.classList.add('social__picture');

  const li = document.createElement('li');
  li.appendChild(userAvatar);
  li.appendChild(textEl);
  li.classList.add('social__comment');

  return li;
};


const showPopup = function (post) {
  popup.classList.remove('hidden');

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
  post.comments.forEach((item) => {
    socialComments.appendChild( createComment(item.message, item.avatar) );
  });

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


export { watchClickThumbnail };
