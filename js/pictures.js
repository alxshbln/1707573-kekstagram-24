import '/js/data.js';
import {similarPosts} from '/js/utils.js';

const showUsersPictures = function () {
  const picturesContainer = document.querySelector('.pictures');
  const templateFragment = document.querySelector('#picture').content;
  const template = templateFragment.querySelector('.picture');

  const similarPictures = similarPosts();
  const fragment = document.createDocumentFragment();

  similarPictures.forEach(({url, likes, comments, id}) => {
    const pictureElement = template.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.setAttribute('data-id', id);
    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);

  return similarPictures;
};

export {showUsersPictures};
