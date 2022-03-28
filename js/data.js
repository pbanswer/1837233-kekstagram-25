import './util.js';
import {getRandomArrayElement} from './util.js';
import {getRandomIntInclusive} from './util.js';
import {getArray} from './util.js';
import {createUsersPic} from './users-pic.js';
// случайное число из диапазона
// код взят с https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// и немного изменен
// логи для моего понимания))


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


const arrIds =  getArray(25);
const arrUrl =  getArray(25);
const arrCommentId =  getArray(99999);
const OBJECT_COUNT = 4;


const createObject = () => {
  const createComment = () => ([{
    id: arrCommentId.shift(),
    avatar: `img/avatar-${  getRandomIntInclusive(0,6)  }.svg`,
    message: getRandomArrayElement(MESSAGE),
    name: getRandomArrayElement(NAME),
  }]);
  const randomInt = getRandomIntInclusive(0,10);
  const similarComments = () => Array.from({length: randomInt}, createComment);

  return {
    id: arrIds.shift(),
    url: `photos/${ arrUrl.shift()  }.jpg`,
    description: getRandomArrayElement(DESCRIPTION),
    likes: getRandomIntInclusive(15,200),
    comments: similarComments(),
  };
};

//const createSimilarObjects = () => Array.from({length: OBJECT_COUNT}, createObject);
//createSimilarObjects();
//console.log(similarObjects());

//const userPicsContainer = document.querySelector('.pictures');
//userPicsContainer.appendChild(createUsersPic(createSimilarObjects()));
//console.log(createUsersPic(createSimilarObjects()));


const createSimilarObjects = () => Array.from({length: OBJECT_COUNT}, createObject);
const value = createSimilarObjects();
console.log(value);

const userPicsContainer = document.querySelector('.pictures');
userPicsContainer.appendChild(createUsersPic(value));
