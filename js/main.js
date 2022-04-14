//import './data.js';
import './users-pic.js';
import './form.js';
import './image-modify.js';
import './server.js';
import './filters.js';
import './upload.js';
import {loadImages} from './server.js';
import {createUsersPic} from './users-pic.js';

// const loadImages = createLoader(createUsersPic, raiseDownloadError);
/* const userPicsContainer = document.querySelector('.pictures')
loadImages().then((pictures) => {
    userPicsContainer.appendChild(createUsersPic(pictures));
}) */
// console.log();
loadImages().then(createUsersPic);
