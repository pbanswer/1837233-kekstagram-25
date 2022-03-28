const bigUserPic = document.querySelector('.big-picture');
const bigPicImg = bigUserPic.querySelector('.big-picture__img');
const bigPicLikes = bigUserPic.querySelector('.likes-count');
const bigPicComments = bigUserPic.querySelector('.comments-count');
const commentsList = bigUserPic.querySelector('.social__comments');


const openBigPic = (pictures) => {

  const commentBlock = commentsList.querySelector('.social__comment');
  //const commentBlockImg = commentsList.querySelector('.social__picture');

  bigUserPic.classList.remove('hidden');

  bigPicImg.querySelector('img').src = pictures.url;
  bigPicLikes.textContent = pictures.likes;
  bigPicComments.textContent = pictures.comments.length;


  const commentFragment = document.createDocumentFragment();
  const comments = pictures.comments;
  console.log(comments);
  comments.forEach((comment, i) => {

    const template = document.querySelector('#comment-template').content;
    console.log(template)
    const templateElement = template.querySelector('.social__comment');
    const templateCopy = templateElement.cloneNode(true);

    templateCopy.classList.add(`social-comment-${ i + 1 }`);

    templateCopy.querySelector('.social__picture').src = comment[i].avatar;
    templateCopy.querySelector('.social__picture').alt = comment[i].name;
    templateCopy.querySelector('.social__text').textContent = comment[i].message;
    commentFragment.appendChild(templateCopy);
    console.log(commentFragment.appendChild(templateCopy))
  })

  bigUserPic.querySelector('.social__caption').textContent = pictures.description;

  bigUserPic.querySelector('.social__comment-count').classList.add('hidden');
  bigUserPic.querySelector('.comments-loader').classList.add('hidden');
  document.body.classList.add('modal-open');
  
  return commentFragment;
};

export {openBigPic};
