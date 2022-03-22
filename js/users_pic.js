const createUsersPic = (pictures) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i <= pictures.length - 1; i++) {
    const template = document.querySelector('#picture').content;
    const templateElement = template.querySelector('.picture');

    const templateCopy = templateElement.cloneNode(true);
    templateCopy.classList.add('picture-' + (i + 1));

    templateCopy.querySelector('.picture__img').src = pictures[i].url;

    templateCopy.querySelector('.picture__comments').textContent = pictures[i].comments.length;

    templateCopy.querySelector('.picture__likes').textContent = pictures[i].likes;


    fragment.appendChild(templateCopy);
    console.log(fragment.appendChild(templateCopy));
  };

  return fragment;
};

export {createUsersPic};
