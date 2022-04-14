import { openBigPic } from './big-user-pic.js';
const userPicsContainer = document.querySelector('.pictures');

const createUsersPic = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture, i) => {
    const template = document.querySelector('#picture').content;
    const templateElement = template.querySelector('.picture');

    const templateCopy = templateElement.cloneNode(true);
    templateCopy.classList.add(`picture-${ i + 1 }`);

    templateCopy.querySelector('.picture__img').src = picture.url;
    templateCopy.querySelector('.picture__comments').textContent = picture.comments.length;
    templateCopy.querySelector('.picture__likes').textContent = picture.likes;

    templateCopy.addEventListener('click', () => {
      openBigPic(picture);
    });
    fragment.appendChild(templateCopy);
  });
  userPicsContainer.appendChild(fragment);
};

export {createUsersPic};
