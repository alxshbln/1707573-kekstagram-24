import {SIMILAR_POST_COUNT, DESCRIPTION_TEXTS, USER_NAMES, USER_COMMENTS} from '/js/data.js';


function getRandomPositiveInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

const createArrayOrderedNumbers = (elements) => Array.from({length: elements}, (el1, el2) => el2 + 1);

const DESCRIPTION_IDS = createArrayOrderedNumbers(SIMILAR_POST_COUNT);
const PHOTO_NUMBERS = createArrayOrderedNumbers(SIMILAR_POST_COUNT);
const COMMENT_IDS = createArrayOrderedNumbers(10 * SIMILAR_POST_COUNT);

const getRandomArrayElement = (elements) => {
  const random = getRandomPositiveInteger (0, elements.length - 1);
  const result = elements[random];
  elements.splice(random, 1);
  return result;
};

const createComment = () => ({
  id: getRandomArrayElement(COMMENT_IDS),
  avatar: `img/avatar-${  getRandomPositiveInteger (1, 6)  }.svg`,
  message: USER_COMMENTS[getRandomPositiveInteger (0, USER_COMMENTS.length - 1)],
  name: USER_NAMES[getRandomPositiveInteger (0, USER_NAMES.length - 1)],
});

const createPost = () => ({
  id: getRandomArrayElement(DESCRIPTION_IDS),
  url: `photos/${  getRandomArrayElement(PHOTO_NUMBERS)  }.jpg`,
  description: getRandomArrayElement(DESCRIPTION_TEXTS),
  likes: getRandomPositiveInteger (15, 200),
  comments: Array.from({length: getRandomPositiveInteger(1, 6)}, createComment),
});

const similarPosts = () => {
  const result = Array.from({length: SIMILAR_POST_COUNT}, createPost);
  return result;
};

export {
  getRandomPositiveInteger,
  createArrayOrderedNumbers,
  DESCRIPTION_IDS,
  PHOTO_NUMBERS,
  COMMENT_IDS,
  getRandomArrayElement,
  createComment,
  createPost,
  similarPosts
};
