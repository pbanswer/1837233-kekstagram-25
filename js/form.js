import {bindSliderEvents, removeSliderEvents} from './image-modify.js';
import {raiseUploadError} from './server.js';
import {raiseUploadSuccess} from './server.js';

const KEY_TAP = 'Escape';
const MAX_TAGS_LENGTH = 5;
const form = document.querySelector('.img-upload__form');
const hashtags = form.querySelector('.text__hashtags');
const imagePreviewWrap = document.querySelector('.img-upload__preview');
const imagePreview = imagePreviewWrap.querySelector('img');
const slider = document.querySelector('.img-upload__effect-level');
const scaleValue = document.querySelector('.scale__control--value');


const pristine = new window.Pristine(form, {
  classTo: 'text__group',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'text__group',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

const checkDuplicate = (tags) => {
  const duplicates = [];
  const lowerCaseTags = [];
  for(let i = 0; i < tags.length; i++) {
    lowerCaseTags.push(tags[i].toLowerCase());
  }
  const sortedTags = lowerCaseTags.sort();
  for (let i = 0; i < sortedTags.length; i++) {
    if (sortedTags[i + 1] === sortedTags[i]) {
      duplicates.push(sortedTags[i]);
    }
  }
  return duplicates.length >= 1;
};

const checkHashTag = () => {
  const tagsInput = form.querySelector('.text__hashtags');
  const tags = tagsInput.value.split(' ').filter((tag) => tag);

  if (checkDuplicate(tags)) {
    return false;
  }

  if (tags.length > MAX_TAGS_LENGTH) {
    return false;
  }
  const emptyTags = [''];
  if (tags[0] === emptyTags[0] && tags.length === 1) {
    return true;
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


const inputUploadFile = document.querySelector('#upload-file');
const imageEditForm = document.querySelector('.img-upload__overlay');
const formButtonCancel = document.querySelector('.img-upload__cancel');
const documentBody = document.querySelector('body');
const commentField = document.querySelector('.text__description');

const closeForm = () => {
  removeSliderEvents();

  imageEditForm.classList.add('hidden');
  documentBody.classList.remove('modal-open');
  inputUploadFile.value = '';
  scaleValue.value = '100%';

  formButtonCancel.removeEventListener('click', onCloseButton);
  window.removeEventListener('keydown', onEscKeydown );
  form.removeEventListener('submit', onSubmit);
  form.reset();
  pristine.reset();
};

const closeMessageSuccess = () => {
  const messageSuccess = document.querySelector('.success');
  document.body.removeChild(messageSuccess);
  //window.removeEventListener('keydown', closeOnEscMessageError);
  //document.querySelector('.success__button').removeEventListener('click', closeMessageSuccess);
};

const closeOnEscMessageSuccess = (evt) => {
  if (evt.key === KEY_TAP) {
    const messageSuccess = document.querySelector('.success');
    document.body.removeChild(messageSuccess);
    //window.removeEventListener('keydown', closeOnEscMessageError);
  }
};

const closeMessageError = () => {
  const messageError = document.querySelector('.error');
  document.body.removeChild(messageError);
  //window.removeEventListener('keydown', closeOnEscMessageError);
  //document.querySelector('.error__button').removeEventListener('click', closeMessageError);
};

const closeOnEscMessageError = () => {
  const messageError = document.querySelector('.error');
  document.body.removeChild(messageError);
  window.removeEventListener('keydown', closeOnEscMessageError);
};

const setDefaultImageSettings = () => {
  imagePreview.style.filter = 'none';
  imagePreview.style.transform = 'scale(1)';
  slider.classList.add('visually-hidden');
};

function onSubmit (evt) {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {

    const formData = new FormData(evt.target);

    fetch(
      'https://25.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        if (response.ok) {
          setDefaultImageSettings();
          closeForm();
          document.body.appendChild(raiseUploadSuccess());
          document.querySelector('.success__button').addEventListener('click', closeMessageSuccess);
          window.addEventListener('keydown', closeOnEscMessageSuccess);

        } else {
          document.body.appendChild(raiseUploadError());
          document.querySelector('.error__button').addEventListener('click', closeMessageError);
          window.addEventListener('keydown', closeOnEscMessageError);
        }
      })
      .catch(() => {
        document.body.appendChild(raiseUploadError());
        document.querySelector('.error__button').addEventListener('click', closeMessageError);
        window.addEventListener('keydown', closeOnEscMessageError);
    });
  }
}

const onInputChange = () => {
  bindSliderEvents();

  imageEditForm.classList.remove('hidden');
  documentBody.classList.add('modal-open');

  form.addEventListener('submit', onSubmit);
  formButtonCancel.addEventListener('click', onCloseButton);
  window.addEventListener('keydown', onEscKeydown);
};

function onCloseButton () {
  closeForm();
  setDefaultImageSettings();
}

function onEscKeydown(evt) {
  if ((evt.key === KEY_TAP) && (evt.target !== hashtags) && (evt.target !== commentField)) {
    closeForm();
    setDefaultImageSettings();
  }
}

inputUploadFile.addEventListener('change', onInputChange);
