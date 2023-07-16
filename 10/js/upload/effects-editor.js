const EFFECTS = {
  chrome: {
    name: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    name: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    name: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    name: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    name: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  },
  default: {
    name: 'none',
    min: 1,
    max: 1,
    step: 1,
    unit: ''
  }
};

const imagePreview = document.querySelector('.img-upload__preview');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
const effectSaturation = document.querySelector('.effect-level__value');

let currentName;
let currentUnit;

const setContainerState = (value) => {
  if (value === 'none') {
    sliderContainer.classList.add('hidden');
    imagePreview.style.filter = 'none';
    return;
  }
  sliderContainer.classList.remove('hidden');
};

//инициализация слайдера
const initEffects = (value) => {
  const { min, max, step, name, unit } = EFFECTS[value] || EFFECTS.default;

  currentName = name;
  currentUnit = unit;

  setContainerState(value);

  noUiSlider.create(slider, {
    range: {
      min,
      max
    },
    step,
    start: max,
    connect: 'lower'
  });

  slider.noUiSlider.on('update', () => {
    const saturation = slider.noUiSlider.get();
    imagePreview.style.filter = `${currentName}(${saturation}${currentUnit})`;
    effectSaturation.value = saturation;
  });
};

//обновление эффектов слайдера
const updateEffects = (value) => {
  setContainerState(value);
  if (value === 'none') {
    return;
  }

  const { min, max, step, name, unit } = EFFECTS[value] || EFFECTS.default;

  currentName = name;
  currentUnit = unit;

  slider.noUiSlider.updateOptions({
    range: {
      min,
      max
    },
    step,
    start: max,
  });
};

export { initEffects, updateEffects };
