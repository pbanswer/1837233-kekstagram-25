// валидация формы

const form = document.querySelector('.img-upload__form');
const hashtags = form.querySelector('.text__hashtags');
const KEYTAP = 'Escape';

const pristine = new window.Pristine(form, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});


const checkDuplicate = (tags) => {
  const duplicates = [];
  const sortedTags = tags.sort();
  for (let i = 0; i < sortedTags.length; i++) {
    if (sortedTags[i + 1] === sortedTags[i]) {
      duplicates.push(sortedTags[i]);
    }
  }
  return duplicates.length >= 1;
};

const checkHashTag = () => {
  const tagsInput = form.querySelector('.text__hashtags');
  const tags = tagsInput.value.split(' ');

  if (checkDuplicate(tags)) {
    return false;
  }

  if (tags.length > 5) {
    return false;
  }

  for (let i = 0; i < tags.length; i++) {
    const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/i;
    if (!re.test(tags[i])) {
      return false;
    }
  }

  return true;
};

pristine.addValidator(
  hashtags,
  checkHashTag,
  '- Хэштег состоит из букв и чисел, от 2 до 20 символов <br>- начинается с решётки, максимум 5 хэштегов, без повторений <br>- комментарий не более 140 символов'
);

form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

const inputUploadFile = document.querySelector('#upload-file');
const imageEditForm = document.querySelector('.img-upload__overlay');
const formButtonCancel = document.querySelector('.img-upload__cancel');
const documentBody = document.querySelector('body');
const commentField = document.querySelector('.text__description');


const onInputChange = () => {
  imageEditForm.classList.remove('hidden');
  documentBody.classList.add('modal-open');
};

inputUploadFile.addEventListener('change', onInputChange);

const onCloseButton = () => {
  imageEditForm.classList.add('hidden');
  documentBody.classList.remove('modal-open');
};

function onEscKeydown(evt) {
  if ((evt.key === KEYTAP) && (evt.target !== hashtags) && (evt.target !== commentField)) {
    imageEditForm.classList.add('hidden');
    documentBody.classList.remove('modal-open');
  }
}

formButtonCancel.addEventListener('click', onCloseButton);
window.addEventListener('keydown', onEscKeydown );
