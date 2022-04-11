import {bindSliderEvents, removeSliderEvents} from './image-modify.js';

const KEY_TAP = 'Escape';
const MAX_TAGS_LENGTH = 5;
const form = document.querySelector('.img-upload__form');
const hashtags = form.querySelector('.text__hashtags');
const imagePreviewWrap = document.querySelector('.img-upload__preview');
const imagePreview = imagePreviewWrap.querySelector('img');
const slider = document.querySelector('.img-upload__effect-level');


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
  const arrayLowerCase = [];
  for(let i = 0; i < tags.length; i++) {
    arrayLowerCase.push(tags[i].toLowerCase());
  }
  const sortedTags = arrayLowerCase.sort();
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

  if (tags.length > MAX_TAGS_LENGTH) {
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


const inputUploadFile = document.querySelector('#upload-file');
const imageEditForm = document.querySelector('.img-upload__overlay');
const formButtonCancel = document.querySelector('.img-upload__cancel');
const documentBody = document.querySelector('body');
const commentField = document.querySelector('.text__description');

const onSubmit = (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
};

const onInputChange = () => {
  bindSliderEvents();

  imageEditForm.classList.remove('hidden');
  documentBody.classList.add('modal-open');

  form.addEventListener('submit', onSubmit);
  formButtonCancel.addEventListener('click', onCloseButton);
  window.addEventListener('keydown', onEscKeydown);
};

const closeForm = () => {
  removeSliderEvents();

  imageEditForm.classList.add('hidden');
  documentBody.classList.remove('modal-open');
  inputUploadFile.value = '';

  formButtonCancel.removeEventListener('click', onCloseButton);
  window.removeEventListener('keydown', onEscKeydown );
  form.removeEventListener('submit', onSubmit);
};

const setDefaultImageSettings = () => {
  imagePreview.style.filter = 'none';
  imagePreview.style.transform = 'scale(1)';
  slider.classList.add('visually-hidden');
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
