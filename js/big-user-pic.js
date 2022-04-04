const bigUserPic = document.querySelector('.big-picture');
const bigPicImg = bigUserPic.querySelector('.big-picture__img');
const bigPicLikes = bigUserPic.querySelector('.likes-count');
const bigPicComments = bigUserPic.querySelector('.comments-count');
const commentsList = bigUserPic.querySelector('.social__comments');
const commentsCount = bigUserPic.querySelector('.social__comment-count');
const moreCommentsButton = document.querySelector('.comments-loader');

const KEYTAP = 'Escape';


const openBigPic = (picture) => {
  let lastComment = 5;

  bigUserPic.classList.remove('hidden');

  bigPicImg.querySelector('img').src = picture.url;
  bigPicLikes.textContent = picture.likes;
  bigPicComments.textContent = picture.comments.length;


  const commentFragment = document.createDocumentFragment();
  commentsList.innerHTML = '';

  const template = document.querySelector('#comment-template').content;
  const templateElement = template.querySelector('.social__comment');

  if (picture.comments.length <= 5) {
    picture.comments.forEach((comment) => {
      const templateCopy = templateElement.cloneNode(true);
      lastComment = picture.comments.length;

      templateCopy.querySelector('.social__picture').src = comment.avatar;
      templateCopy.querySelector('.social__picture').alt = comment.name;
      templateCopy.querySelector('.social__text').textContent = comment.message;
      commentFragment.appendChild(templateCopy);
      bigUserPic.querySelector('.comments-loader').classList.add('hidden');
      //console.log(commentFragment.appendChild(templateCopy));
    });
  } else {
    for (let i = 0; i < lastComment; i++) {
      const templateCopy = templateElement.cloneNode(true);

      const comment = picture.comments;
      //console.log(comment[i]);
      templateCopy.querySelector('.social__picture').src = comment[i].avatar;
      templateCopy.querySelector('.social__picture').alt = comment[i].name;
      templateCopy.querySelector('.social__text').textContent = comment[i].message;
      commentFragment.appendChild(templateCopy);
      bigUserPic.querySelector('.comments-loader').classList.remove('hidden');
    }
  }

  commentsCount.textContent = `${ lastComment } из ${ bigPicComments.textContent }`;

  moreCommentsButton.addEventListener('click', () => {
    lastComment =+ 5;
    //console.log('click');
  });

  commentsList.appendChild(commentFragment);

  bigUserPic.querySelector('.social__caption').textContent = picture.description;
  //bigUserPic.querySelector('.social__comment-count').classList.add('hidden');
  //bigUserPic.querySelector('.comments-loader').classList.add('hidden');

  if (commentsList.children.length > 5) {
    bigUserPic.querySelector('.social__comment-count').classList.remove('hidden');
    bigUserPic.querySelector('.comments-loader').classList.remove('hidden');
  }
  //console.log(`здесь выводится кол-во комментариев${  commentsList.children.length}`);
  document.body.classList.add('modal-open');

  const closeButton = document.querySelector('.big-picture__cancel');

  const onCloseClick = () => {
    bigUserPic.classList.add('hidden');
    closeButton.removeEventListener('click', onCloseClick);
    window.removeEventListener('keydown', onEscKeydown);
  };

  function onEscKeydown (evt) {
    if (evt.key === KEYTAP) {
      bigUserPic.classList.add('hidden');
      closeButton.removeEventListener('click', onCloseClick);
      window.removeEventListener('keydown', onEscKeydown);
    }
  }

  closeButton.addEventListener('click', onCloseClick);
  window.addEventListener('keydown', onEscKeydown);
};

export {openBigPic};
