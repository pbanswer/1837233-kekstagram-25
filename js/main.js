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

const printRnd = getRandomIntInclusive(100,150);
printRnd();


// проверка длины строки

const checkStrLength = (string, maxLength) => string.length < maxLength;

const printLng = checkStrLength('Эта строка длиной 29 символов', 20);
printLng();
