//import './data.js';
import './users-pic.js';
import './form.js';
import './image-modify.js';
import './server.js';
import {createLoader} from './server.js';
import {createUsersPic} from './users-pic.js';
import {raiseDownloadError} from './server.js';

const loadImages = createLoader(createUsersPic, raiseDownloadError);
loadImages();
