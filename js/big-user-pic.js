const bigUserPic = document.querySelector('.big-picture');
const bigPicImg = bigUserPic.querySelector('.big-picture__img');
const bigPicLikes = bigUserPic.querySelector('.likes-count');
const bigPicComments = bigUserPic.querySelector('.comments-count');
const commentsList = bigUserPic.querySelector('.social__comments');


const openBigPic = (pictures) => {

  bigUserPic.classList.remove('hidden');

  bigPicImg.querySelector('img').src = pictures.url;
  bigPicLikes.textContent = pictures.likes;
  bigPicComments.textContent = pictures.comments.length;


  const commentFragment = document.createDocumentFragment();
  commentsList.innerHTML = '';

  pictures.comments.forEach((comment) => {

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

  bigUserPic.querySelector('.social__caption').textContent = pictures.description;
  bigUserPic.querySelector('.social__comment-count').classList.add('hidden');
  bigUserPic.querySelector('.comments-loader').classList.add('hidden');
  document.body.classList.add('modal-open');

  const closeButton = document.querySelector('.big-picture__cancel');
  closeButton.addEventListener('click', () => {
    bigUserPic.classList.add('hidden');
  });

  window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      bigUserPic.classList.add('hidden');
    }
  });

};

export {openBigPic};
