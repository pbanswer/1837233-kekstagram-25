

const scaleUpButton = document.querySelector('.scale__control--bigger');
const scaleDownButton = document.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');
const imagePreviewWrap = document.querySelector('.img-upload__preview');
const imagePreview = imagePreviewWrap.querySelector('img');
const radioList = document.querySelector('.effects__list');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__value');
const effectNone = document.querySelector('.effects__preview--none');

//изменение масштаба изображения

scaleUpButton.addEventListener('click', () => {
  let scaleVal = Number.parseInt(scaleValue.value)
  if (scaleVal <= 75 && scaleVal >= 25) {
    scaleValue.value = scaleVal + 25 + '%';
    setImageScale(Number.parseInt(scaleValue.value))
  }
})

scaleDownButton.addEventListener('click', () => {
  let scaleVal = Number.parseInt(scaleValue.value)
  if (scaleVal <= 100 && scaleVal > 25) {
    scaleValue.value = scaleVal - 25 + '%';
    setImageScale(Number.parseInt(scaleValue.value))
  }
})

const setImageScale = (val) => {
  imagePreview.style.transform = `scale(${val/100})`
}

// смена эффектов

radioList.addEventListener('change', (evt) => {
  const buttonEffect = evt.target.value;
  const classToAdd = `effects__preview--${buttonEffect}`
  if (evt.target.checked) {
    if (imagePreview.classList.length > 0 ) {
      const classToRemove = imagePreview.classList[0];
      imagePreview.classList.remove(classToRemove);
    }
    sliderContainer.classList.remove('visually-hidden');
    setsliderContainerHidden(evt);
    imagePreview.classList.add(classToAdd);
  };
});

const setsliderContainerHidden = (param) => {
  if (param.target.value == 'none') {
    sliderContainer.classList.add('visually-hidden');
  };
}

// слайдер

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});
