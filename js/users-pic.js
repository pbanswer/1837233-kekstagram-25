import { openBigPic } from "./big-user-pic.js";

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


    fragment.appendChild(templateCopy);
    //console.log(fragment.appendChild(templateCopy));

    fragment.appendChild(templateCopy).addEventListener('click', () => {
      openBigPic(picture);
    })
  });

  return fragment;
};

export {createUsersPic};
