
// https://learn.javascript.ru/task/random-int-min-max
const getRandomIntFromRange = function(from, to) {

  if (from < 0 || from >= to) {
    const errorNumbers = 'Введите корректные данные';
    return errorNumbers;
  }

  const random = from + Math.random() * (to + 1 - from);
  return Math.floor(random);
};


const getMaxCommentLenght = function(commentText, maxLength) {
  if (commentText.length <= maxLength) {
    return true;
  }

  return false;
};

getRandomIntFromRange(4, 15);
getMaxCommentLenght('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in.', 140);


function getRandomPositiveInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}


const SIMILAR_POST_COUNT = 25;

const DESCRIPTION_TEXTS = [
  'Описание фотографии - 1',
  'Описание фотографии - 2',
  'Описание фотографии - 3',
  'Описание фотографии - 4',
  'Описание фотографии - 5',
  'Описание фотографии - 6',
  'Описание фотографии - 7',
  'Описание фотографии - 8',
  'Описание фотографии - 9',
  'Описание фотографии - 10',
  'Описание фотографии - 11',
  'Описание фотографии - 12',
  'Описание фотографии - 13',
  'Описание фотографии - 14',
  'Описание фотографии - 15',
  'Описание фотографии - 16',
  'Описание фотографии - 17',
  'Описание фотографии - 18',
  'Описание фотографии - 19',
  'Описание фотографии - 20',
  'Описание фотографии - 21',
  'Описание фотографии - 22',
  'Описание фотографии - 23',
  'Описание фотографии - 24',
  'Описание фотографии - 25',
];

const USER_NAMES = [
  'Андрей',
  'Артем',
  'Иван',
  'Александр',
  'Алексей',
  'Богдан',
  'Павел',
  'Евгений',
  'Денис',
  'Анатолий',
  'Михаил',
  'Григорий',
  'Антон',
  'Аркадий',
  'Артур',
  'Борис',
  'Вадим',
  'Василий',
  'Виталий',
  'Геннадий',
  'Григорий',
  'Дмитрий',
  'Егор',
  'Игорь',
  'Леонид',
];

const USER_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

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

similarPosts();
