const KEY_TAP = 'Escape';
const COMMENTS_PER_PAGE = 5;
const bigUserPic = document.querySelector('.big-picture');
const bigPicImg = bigUserPic.querySelector('.big-picture__img');
const bigPicLikes = bigUserPic.querySelector('.likes-count');
const bigPicComments = bigUserPic.querySelector('.comments-count');
const commentsList = bigUserPic.querySelector('.social__comments');
const commentsCount = bigUserPic.querySelector('.social__comment-count');
const moreCommentsButton = document.querySelector('.comments-loader');


const openBigPic = (picture) => {
  let shownCommentsCount = 0;
  bigUserPic.classList.remove('hidden');

  bigPicImg.querySelector('img').src = picture.url;
  bigPicLikes.textContent = picture.likes;
  bigPicComments.textContent = picture.comments.length;

  commentsList.innerHTML = '';

  const template = document.querySelector('#comment-template').content;
  const templateElement = template.querySelector('.social__comment');

  const showComments = () => {
    const count = shownCommentsCount + COMMENTS_PER_PAGE > picture.comments.length
      ? picture.comments.length
      : shownCommentsCount + COMMENTS_PER_PAGE;

    commentsCount.textContent = `${count} из ${picture.comments.length}`;
    if (count >= picture.comments.length) {
      moreCommentsButton.classList.add('hidden');
    }

    const commentFragment = document.createDocumentFragment();
    for (let i = shownCommentsCount; i < count; i++) {
      const templateCopy = templateElement.cloneNode(true);

      templateCopy.querySelector('.social__picture').src = picture.comments[i].avatar;
      templateCopy.querySelector('.social__picture').alt = picture.comments[i].name;
      templateCopy.querySelector('.social__text').textContent = picture.comments[i].message;
      commentFragment.appendChild(templateCopy);
    }

    commentsList.appendChild(commentFragment);
    shownCommentsCount += COMMENTS_PER_PAGE;
  };

  if (picture.comments.length <= 5) {
    commentsCount.classList.add('hidden');
    moreCommentsButton.classList.add('hidden');
  } else {
    commentsCount.classList.remove('hidden');
    moreCommentsButton.classList.remove('hidden');
  }
  showComments();
  const onMoreCommentsClick = () => showComments();
  moreCommentsButton.addEventListener('click', onMoreCommentsClick);

  bigUserPic.querySelector('.social__caption').textContent = picture.description;

  document.body.classList.add('modal-open');

  const closeButton = document.querySelector('.big-picture__cancel');

  const onCloseClick = () => {
    bigUserPic.classList.add('hidden');
    document.body.classList.remove('modal-open');
    moreCommentsButton.removeEventListener('click', onMoreCommentsClick);
    closeButton.removeEventListener('click', onCloseClick);
    window.removeEventListener('keydown', onEscKeydown);
  };

  function onEscKeydown(evt) {
    if (evt.key === KEY_TAP) {
      bigUserPic.classList.add('hidden');
      document.body.classList.remove('modal-open');
      moreCommentsButton.removeEventListener('click', onMoreCommentsClick);
      closeButton.removeEventListener('click', onCloseClick);
      window.removeEventListener('keydown', onEscKeydown);
    }
  }

  closeButton.addEventListener('click', onCloseClick);
  window.addEventListener('keydown', onEscKeydown);
};

export {openBigPic};
