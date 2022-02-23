"use strict";
// взято с https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// логи для моего понимания))

function getRandomIntInclusive(min, max) {
  if ((min < max) && (min >= 0)) {
    let randomNumber = Math.random();
    let randomNumberFloor = Math.floor(Math.random())
    let result = Math.floor(randomNumber * (max - min + 1)) + min;
    console.log(randomNumberFloor);
    console.log(randomNumber);
    return result;
  }
  else {
    console.log('Максимальное значение диапазона меньше минимального или минимальное значение диапазона меньше нуля')
  }
}

let printRnd = getRandomIntInclusive(100,150)
console.log(printRnd)


// проверка длины строки

let stringLength = function (string, maxLength) {
  if (string.length > maxLength) {
    console.log('Превышает')
    return false;
  } else {
    console.log('Прокатило')
    return true;
  }
}

let printLng = stringLength('Это строка длиной 29 символов', 20)
console.log(printLng)
