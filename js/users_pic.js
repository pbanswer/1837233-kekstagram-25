const otherUsersPic = () => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i <= array.length - 1; i++) {
    const template = document.querySelector('#picture').content;
    const templateElement = template.querySelector('.picture');

    const templateCopy = templateElement.cloneNode(true);
    templateCopy.classList.add('picture-' + (i + 1));

    templateCopy.querySelector('.picture__img').src = array[i].url;

    templateCopy.querySelector('.picture__comments').textContent = array[i].comments.length;

    templateCopy.querySelector('.picture__likes').textContent = array[i].likes;


    fragment.appendChild(templateCopy);
    //console.log(fragment.appendChild(templateCopy));
  };
  return fragment;
};

export {otherUsersPic};
