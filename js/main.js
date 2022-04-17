import './users-pic.js';
import './form.js';
import './image-modify.js';
import './server.js';
import './filters.js';
import './upload.js';
import {loadImages} from './server.js';
import {createUsersPic} from './users-pic.js';
const filtersElement = document.querySelector('.img-filters');

loadImages().then((pictures) => {
  createUsersPic(pictures);
  filtersElement.classList.remove('img-filters--inactive');
});
