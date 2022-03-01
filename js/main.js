// случайное число из диапазона
// код взят с https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// и немного изменен
// логи для моего понимания))

const getRandomIntInclusive = (min, max) => {
  if ((min < max) && (min >= 0)) {
    const randomNumber = Math.random();
    const result = Math.floor(randomNumber * (max - min + 1)) + min;
    return result;
  }
};

const printRnd = getRandomIntInclusive(1,5);

printRnd();


// проверка длины строки

const checkStrLength = (string, maxLength) => string.length < maxLength;

const printLng = checkStrLength('Эта строка длиной 29 символов', 20);
printLng();

const DESCRIPTION = [
  'Ужасно',
  'Плохо',
  'Пойдёт',
  'Хорошо',
  'Превосходно',
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
];

const NAME = [
  'Лёша',
  'Петя',
  'Вася',
  'Оля',
  'Лена',
  'Алиса',
];

const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length - 1)];

const getArray = (arrLength) => {
  const arr = [];
  for (let i = 0; i <= arrLength-1; i++) {
    arr[i] = i + 1;
  }
  //взято с learn.javascript
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  shuffle(arr);
  return arr;
};

const arrIds =  getArray(25);
const arrUrl =  getArray(25);
const arrCommentId =  getArray(99999);


const createObject = () => ({
  id: arrIds.shift(),
  url: `photos/${ arrUrl.shift()  }.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomIntInclusive(15,200),
  comments: {
    id: arrCommentId.shift(),
    avatar: `img/avatar-${  getRandomIntInclusive(0,6)  }.svg`,
    message: getRandomArrayElement(MESSAGE),
    name: getRandomArrayElement(NAME),
  },
});

const similarObjects = (objectCount) => Array.from({length: objectCount}, createObject);
similarObjects();
