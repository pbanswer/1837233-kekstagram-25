const getRandomIntInclusive = (min, max) => {
  if ((min < max) && (min >= 0)) {
    const randomNumber = Math.random();
    const result = Math.floor(randomNumber * (max - min + 1)) + min;
    return result;
  }
};

// проверка длины строки

const checkStrLength = (string, maxLength) => string.length < maxLength;

const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length - 1)];

const getArray = (arrLength) => {
  const arr = [];
  for (let i = 0; i <= arrLength-1; i++) {
    arr[i] = i + 1;
  }
  //взято с learn.javascript
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };
  shuffle(arr);
  return arr;
};

export {getArray, getRandomIntInclusive, checkStrLength, getRandomArrayElement};
