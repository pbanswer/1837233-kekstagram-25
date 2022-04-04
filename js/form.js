// валидация формы

const form = document.querySelector('.img-upload__form');
//new Pristine(form);

/* const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/
console.log(re.test('#11')); */



const pristine = new Pristine( form, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

function validateHTag (value) {
  return value.length >= 2 && value.length <= 20;
}

pristine.addValidator(
  form.querySelector('.text__hashtags'),
  validateHTag,
  'От 2 до 20 символов'
);

//проверка на повтор хэштега
const checkDuplicate = (tags) => {
  let duplicates = []
  const tempArray = tags.sort()
  for (let i = 0; i < tempArray.length; i++) {
    if (tempArray[i + 1] === tempArray[i]) {
      duplicates.push(tempArray[i])
    }
  }
  console.log(duplicates)
  if (duplicates.length > 1) {
    console.log(duplicates.length);
    return false
  } else {
    return true
  }
}

// проверка хэштега
const checkHTag = () => {
  const text = document.querySelector(".text__hashtags");
  const val = text.value;
  const arr = val.split(' ');
  console.log(val);
  console.log(arr);
  checkDuplicate(arr);
  console.log('это вывод checkDup: ' +  checkDuplicate(arr));
  if (arr.length > 5) {
    console.log('Не более 5ти тегов')
  } else {
      arr.forEach(element => {
        const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/i
        console.log(re.test(element))
      });
    }
}


//pristine.addValidator(form.querySelector('.text__hashtags'));


form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  checkHTag();
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
})


formButtonCancel.addEventListener('click', () => {
  imageEditForm.classList.add('hidden');
  documentBody.classList.remove('modal-open');
  console.log('клик');
})
