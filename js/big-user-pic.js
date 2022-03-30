const bigUserPic = document.querySelector('.big-picture');
const bigPicImg = bigUserPic.querySelector('.big-picture__img');
const bigPicLikes = bigUserPic.querySelector('.likes-count');
const bigPicComments = bigUserPic.querySelector('.comments-count');
const commentsList = bigUserPic.querySelector('.social__comments');


const openBigPic = (picture) => {

  bigUserPic.classList.remove('hidden');

  bigPicImg.querySelector('img').src = picture.url;
  bigPicLikes.textContent = picture.likes;
  bigPicComments.textContent = picture.comments.length;


  const commentFragment = document.createDocumentFragment();
  commentsList.innerHTML = '';

  picture.comments.forEach((comment) => {

    const template = document.querySelector('#comment-template').content;
    const templateElement = template.querySelector('.social__comment');
    const templateCopy = templateElement.cloneNode(true);

    templateCopy.querySelector('.social__picture').src = comment.avatar;
    templateCopy.querySelector('.social__picture').alt = comment.name;
    templateCopy.querySelector('.social__text').textContent = comment.message;
    commentFragment.appendChild(templateCopy);
    //console.log(commentFragment.appendChild(templateCopy));
  });

  commentsList.appendChild(commentFragment);

  bigUserPic.querySelector('.social__caption').textContent = picture.description;
  bigUserPic.querySelector('.social__comment-count').classList.add('hidden');
  bigUserPic.querySelector('.comments-loader').classList.add('hidden');
  document.body.classList.add('modal-open');

  const closeButton = document.querySelector('.big-picture__cancel');

  const onCloseClick = () => {
    bigUserPic.classList.add('hidden');
    closeButton.removeEventListener('click', onCloseClick);
    window.removeEventListener('keydown', onEscKeydown);
  };

  const keyTap = 'Escape'

  function onEscKeydown (evt) {
    if (evt.key === keyTap) {
      bigUserPic.classList.add('hidden');
      closeButton.removeEventListener('click', onCloseClick);
      window.removeEventListener('keydown', onEscKeydown);
    }
  };

  closeButton.addEventListener('click', onCloseClick);
  window.addEventListener('keydown', onEscKeydown);
};

export {openBigPic};
