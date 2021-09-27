
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
