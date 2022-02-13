const sliderToggles = document.querySelectorAll('.content__slider');
const sliderButton = document.querySelectorAll('.content__slider-button');
const sliderContainers = document.querySelectorAll('.content__slider-container');
const sliderItems = document.querySelectorAll('.content__slider-item');

function paintSliderToggles(i, sliderContainer) {
  sliderContainer.querySelectorAll('.content__slider-button').forEach(function(item, ind) {
    if (i === ind) {
      if (item.classList.contains('content__slider-button_type_light')) {
        item.classList.remove('content__slider-button_type_light');
      }
      if (!item.classList.contains('content__slider-button_type_dark')) {
        item.classList.add('content__slider-button_type_dark');
      }
    } else {
      if (item.classList.contains('content__slider-button_type_dark')) {
        item.classList.remove('content__slider-button_type_dark');
      }
      if (!item.classList.contains('content__slider-button_type_light')) {
        item.classList.add('content__slider-button_type_light');
      }
    }
  })
  if (sliderButton[i].classList.contains('content__slider-button_type_light')) {
    sliderButton[i].classList.remove('content__slider-button_type_light');
  }
  if (!sliderButton[i].classList.contains('content__slider-button_type_dark')) {
    sliderButton[i].classList.add('content__slider-button_type_dark');
  }
}

function openMobileVersion () {
  sliderToggles.forEach(function(item) {
    if (item.classList.contains('content__visibility')) {
      item.classList.remove('content__visibility');
    }
  })
  sliderContainers.forEach(function(item) {
    const sliderItems = item.querySelectorAll('.content__slider-item');
    for (let index = 1; index < sliderItems.length; index++) {
      sliderItems[index].classList.add('content__visibility');
    }
    paintSliderToggles(0, item);
  })
}

function openDesktopVersion () {
  sliderToggles.forEach(function(item) {
    if (!item.classList.contains('content__visibility')) {
      item.classList.add('content__visibility');
    }
  })
  document.querySelectorAll('.content__slider-item').forEach(function(item) {
    if (item.classList.contains('content__visibility')) {
      item.classList.remove('content__visibility');
    }
  })
}

//определяется true/false мобильной версии, чтобы при нахождении в мобильной версии
//и изменении ширины окна не сбивался выбор слайдеров
let mobileVersion = false;
if (window.matchMedia("(max-width: 730px)").matches) {
  openMobileVersion();
  mobileVersion = true;
}
window.onresize = function (ev) {
  if (window.matchMedia("(max-width: 730px)").matches) {
    if (mobileVersion === false) {
      openMobileVersion();
      mobileVersion = true;
    }
  } else {
    if (mobileVersion === true) {
      openDesktopVersion();
      mobileVersion = false;
    }
  }
}
//

sliderButton.forEach(function(button, i) {
  button.addEventListener('click', function () {
    const sliderContainer = button.closest('.content__slider-container');
    // скрываем все слайдеры текущего контейнера
    sliderContainer.querySelectorAll('.content__slider-item').forEach(function(item, i) {
      if (!item.classList.contains('content__visibility')) {
        item.classList.add('content__visibility');
      }
    })
    // показываем активный слайдер
    if (sliderItems[i].classList.contains('content__visibility')) {
      sliderItems[i].classList.remove('content__visibility');
    }
  // закрашиваем активный переключатель слайдера темным, а неактивный светлым
    paintSliderToggles(i, sliderContainer);
  })
})
