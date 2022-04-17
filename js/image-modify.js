const MAX_SCALE = 100;
const MIN_SCALE = 25;
const ADJUST_SCALE = 25;
const scaleUpButton = document.querySelector('.scale__control--bigger');
const scaleDownButton = document.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');
const imagePreviewWrap = document.querySelector('.img-upload__preview');
const imagePreview = imagePreviewWrap.querySelector('img');
const radioList = document.querySelector('.effects__list');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
const sliderInput = document.querySelector('.effect-level__value');
sliderInput.value = 100;

const setImageScale = (val) => {
  imagePreview.style.transform = `scale(${val/100})`;
};

const onScaleUpClick = () => {
  const scaleVal = Number.parseInt(scaleValue.value, 10);
  if (scaleVal < MAX_SCALE && scaleVal >= MIN_SCALE) {
    scaleValue.value = `${scaleVal + ADJUST_SCALE  }%`;
    setImageScale(Number.parseInt(scaleValue.value, 10));
  }
};

const onScaleDownClick = () => {
  const scaleVal = Number.parseInt(scaleValue.value, 10);
  if (scaleVal <= MAX_SCALE && scaleVal > MIN_SCALE) {
    scaleValue.value = `${scaleVal - ADJUST_SCALE  }%`;
    setImageScale(Number.parseInt(scaleValue.value, 10));
  }
};

const hideSliderContainer = (param) => {
  if (param.target.value === 'none') {
    sliderContainer.classList.add('visually-hidden');
  }
};

const setEffectValue = (buttonEffect) => {
  slider.noUiSlider.on('update', () => {
    sliderInput.value = slider.noUiSlider.get();
    if (buttonEffect === 'chrome') {
      imagePreview.style.filter = `grayscale(${sliderInput.value})`;
    } else if (buttonEffect === 'sepia') {
      imagePreview.style.filter = `sepia(${sliderInput.value})`;
    } else if (buttonEffect === 'marvin') {
      imagePreview.style.filter = `invert(${sliderInput.value}%)`;
    } else if (buttonEffect === 'phobos') {
      imagePreview.style.filter = `blur(${sliderInput.value}px)`;
    } else if (buttonEffect === 'heat') {
      imagePreview.style.filter = `brightness(${sliderInput.value})`;
    } else {
      imagePreview.style.filter = 'none';
    }
  });
};

const setImgEffect = (evt) => {
  if (evt.target.value === 'chrome') {
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  } else if (evt.target.value === 'sepia') {
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  } else if (evt.target.value === 'marvin') {
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
  } else if (evt.target.value === 'phobos') {
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  } else if (evt.target.value === 'heat') {
    slider.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  } else {
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  }
};

const onEffectChange = (evt) => {
  const buttonEffect = evt.target.value;
  const classToAdd = `effects__preview--${buttonEffect}`;
  if (evt.target.checked) {
    if (imagePreview.classList.length > 0 ) {
      const classToRemove = imagePreview.classList[0];
      imagePreview.classList.remove(classToRemove);
    }
    sliderContainer.classList.remove('visually-hidden');
    hideSliderContainer(evt);
    imagePreview.classList.add(classToAdd);
    setImgEffect(evt);
  }
  setEffectValue(buttonEffect);
};

const bindSliderEvents = () => {
  scaleUpButton.addEventListener('click', onScaleUpClick);
  scaleDownButton.addEventListener('click', onScaleDownClick);
  radioList.addEventListener('change', onEffectChange);

  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
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
};

const removeSliderEvents = () => {
  slider.noUiSlider.destroy();
  scaleUpButton.removeEventListener('click', onScaleUpClick);
  scaleDownButton.removeEventListener('click', onScaleDownClick);
  radioList.removeEventListener('change', onEffectChange);
};

export {bindSliderEvents, removeSliderEvents};
