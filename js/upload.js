const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const inputFile = document.querySelector('.img-upload__start input[type=file]');
const previewImage = document.querySelector('.img-upload__preview img');

inputFile.addEventListener('change', () => {
  const file = inputFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    previewImage.src = URL.createObjectURL(file);
  }
});

