import { createUsersPic } from './users-pic.js';
import {loadImages} from './server.js';
import {debounce} from './util.js';
import {shuffleArray} from './util.js';
const RERENDER_DELAY = 500;
const RANDOM_PICTURES_COUNT = 10;
const filtersElement = document.querySelector('.img-filters');
const filterButtonsContainer = document.querySelector('.img-filters__form');
const buttonDefault = document.querySelector('#filter-default');
const buttonRandom = document.querySelector('#filter-random');
const buttonDiscussed = document.querySelector('#filter-discussed');

const cleanPictures = () => {
  const pics = document.querySelectorAll('.pictures a');
  pics.forEach((picture) => {
    picture.remove();
  });
};

const compare = (a, b) => b.comments.length - a.comments.length;

const onWindowLoad = () => {
  filtersElement.classList.remove('img-filters--inactive');
  window.removeEventListener('load', onWindowLoad);
};

window.addEventListener('load', onWindowLoad);


const checkButtonClass = (evt) => {
  const selectedButton = document.querySelector('.img-filters__button--active');
  if (selectedButton !== evt.target) {
    selectedButton.classList.remove('img-filters__button--active');
  }

  if (!evt.target.classList.contains('img-filters__button--active')) {
    evt.target.classList.add('img-filters__button--active');
  }
};

const applyFilter = debounce((evt) => {
  if (evt.target === buttonDefault) {
    loadImages().then((pictures) => {
      cleanPictures();
      createUsersPic(pictures);
    });

  } else if (evt.target === buttonRandom) {
    cleanPictures();
    loadImages().then((pictures) => {
      const sortedPictures = shuffleArray(pictures.slice());
      createUsersPic(sortedPictures.slice(0, RANDOM_PICTURES_COUNT));
    });

  } else if (evt.target === buttonDiscussed) {
    cleanPictures();
    loadImages().then((pictures) => {
      const sortedPictures = pictures.slice();
      sortedPictures.sort(compare);
      createUsersPic(sortedPictures);
    });
  }
}, RERENDER_DELAY);

filterButtonsContainer.addEventListener('click', (evt) => {
  checkButtonClass(evt);
  applyFilter(evt);
});
