import {bindSliderEvents, removeSliderEvents} from './image-modify.js';
import {raiseUploadError} from './server.js';
import {raiseUploadSuccess} from './server.js';

const KEY_TAP = 'Escape';
const MAX_TAGS_LENGTH = 5;
const MAX_COMMENT_LENGTH = 140;
const form = document.querySelector('.img-upload__form');
const hashtags = form.querySelector('.text__hashtags');
const comments = form.querySelector('.text__description');
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
  for (let i = 0; i < tags.length; i++) {
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
  '- Хэштег состоит из букв и чисел, от 2 до 20 символов <br>- начинается с решётки, максимум 5 хэштегов, без повторений'
);

pristine.addValidator(
  comments,
  (value) => value.length <= MAX_COMMENT_LENGTH,
  '- комментарий не более 140 символов'
);


const inputUploadFile = document.querySelector('#upload-file');
const imageEditForm = document.querySelector('.img-upload__overlay');
const formButtonCancel = document.querySelector('.img-upload__cancel');
const documentBody = document.querySelector('body');
const commentField = document.querySelector('.text__description');

const setDefaultImageSettings = () => {
  imagePreview.style.filter = 'none';
  imagePreview.style.transform = 'scale(1)';
  slider.classList.add('visually-hidden');
};

const closeForm = () => {
  removeSliderEvents();
  setDefaultImageSettings();

  imageEditForm.classList.add('hidden');
  documentBody.classList.remove('modal-open');

  form.reset();
  pristine.reset();
  scaleValue.value = '100%';

  formButtonCancel.removeEventListener('click', onCloseButton);
  window.removeEventListener('keydown', onEscKeydown);
  form.removeEventListener('submit', onSubmit);
};

const closeSuccessMessage = () => {
  const messageSuccess = document.querySelector('.success');
  document.body.removeChild(messageSuccess);
  window.removeEventListener('keydown', onEscMessageSuccess);
};

function onEscMessageSuccess(evt) {
  if (evt.key === KEY_TAP) {
    closeSuccessMessage();
  }
}

const onCloseMessageSuccess = () => {
  closeSuccessMessage();
};


const closeErrorMessage = () => {
  const messageError = document.querySelector('.error');
  document.body.removeChild(messageError);
  window.removeEventListener('keydown', onEscMessageError);
  window.addEventListener('keydown', onEscKeydown);
};

function onEscMessageError(evt) {
  if (evt.key === KEY_TAP) {
    closeErrorMessage();
  }
}

const onCloseMessageError = () => {
  closeErrorMessage();
};

const showSuccessMessage = () => {
  closeForm();
  document.body.appendChild(raiseUploadSuccess());
  document.querySelector('.success__button').addEventListener('click', onCloseMessageSuccess);
  window.addEventListener('keydown', onEscMessageSuccess);
};

const showErrorMessage = () => {
  document.body.appendChild(raiseUploadError());
  document.querySelector('.error__button').addEventListener('click', onCloseMessageError);
  window.addEventListener('keydown', onEscMessageError);
  window.removeEventListener('keydown', onEscKeydown);
};

function onSubmit(evt) {
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
          showSuccessMessage();
        } else {
          showErrorMessage();
        }
      })
      .catch(showErrorMessage);
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

function onCloseButton() {
  closeForm();
}

function onEscKeydown(evt) {
  if ((evt.key === KEY_TAP) && (evt.target !== hashtags) && (evt.target !== commentField)) {
    closeForm();
  }
}

inputUploadFile.addEventListener('change', onInputChange);
