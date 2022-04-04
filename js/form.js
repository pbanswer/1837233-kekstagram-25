// валидация формы

const form = document.querySelector('.img-upload__form');
const hashtags = form.querySelector('.text__hashtags');

const pristine = new window.Pristine( form, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});


//проверка на повтор хэштега
const checkDuplicate = (tags) => {
  const duplicates = [];
  const tempArray = tags.sort();
  for (let i = 0; i < tempArray.length; i++) {
    if (tempArray[i + 1] === tempArray[i]) {
      duplicates.push(tempArray[i]);
    }
  }
  //console.log(duplicates);
  if (duplicates.length >= 1) {
    //console.log(`здесь значение дубликатов: ${  duplicates.length}`);
    return false;
  } else {
    return true;
  }
};

// проверка хэштега
const checkHTag = () => {
  const tags = form.querySelector('.text__hashtags');
  const val = tags.value;
  //console.log(val);
  const arr = val.split(' ');
  //console.log(val);
  //console.log(`это массив:  ${ arr}`);
  const checkResult = checkDuplicate(arr);
  //console.log(`это вывод checkDup: ${   checkResult}`);
  if (checkResult === true) {
    if (arr.length > 5) {
      //console.log('Не более 5ти тегов');
      return false;
    } else {
      arr.forEach((element) => {
        const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/i;
        //console.log(re.test(element));
        if ( re.test(element)) {
          return true;
        } else {
          return false;
        }
      });
    }
  } else {
    return false;
  }
};

pristine.addValidator(hashtags, checkHTag, 'Хэштег состоит из букв и чисел,  от 2 до 20 символов, начинается с решётки, максимум 5 хэштегов, без повторений', 1 , true);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});


// открытие|закрытие формы

const inputUploadFile = document.querySelector('#upload-file');
const imageEditForm = document.querySelector('.img-upload__overlay');
const formButtonCancel = document.querySelector('.img-upload__cancel');
const documentBody = document.querySelector('body');

inputUploadFile.addEventListener('change', () => {
  imageEditForm.classList.remove('hidden');
  documentBody.classList.add('modal-open');
});


formButtonCancel.addEventListener('click', () => {
  imageEditForm.classList.add('hidden');
  documentBody.classList.remove('modal-open');
  //console.log('клик');
});
