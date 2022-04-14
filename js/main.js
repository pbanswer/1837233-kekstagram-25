import './users-pic.js';
import './form.js';
import './image-modify.js';
import './server.js';
import './filters.js';
import './upload.js';
import {loadImages} from './server.js';
import {createUsersPic} from './users-pic.js';

loadImages().then(createUsersPic);
