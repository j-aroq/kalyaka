const sliderToggles = document.querySelectorAll('.content__slider');
const sliderButton = document.querySelectorAll('.content__slider-button');
const sliderContainers = document.querySelectorAll('.content__slider-container');

function paintSliderToggles(ind, sliderContainer) {
  sliderContainer.querySelectorAll('.content__slider-button').forEach(function(item, i) {
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

if (window.matchMedia("(max-width: 730px)").matches) {
  openMobileVersion();
}

window.onresize = function (ev) {
  if (window.matchMedia("(max-width: 730px)").matches) {
    openMobileVersion();
  } else {
    openDesktopVersion();
  }
}

let ind = -1;
sliderButton.forEach(function(button) {
  button.addEventListener('click', function () {
    //TODO переделать костыль
    if (button.classList.contains('content__slide-one')) {
      ind = 0;
    } else if (button.classList.contains('content__slide-two')) {
      ind = 1;
    } else if (button.classList.contains('content__slide-three')) {
      ind = 2;
    }
    const sliderContainer = button.closest('.content__slider-container');
    // показываем активный слайдер и скрываем неактивные
    sliderContainer.querySelectorAll('.content__slider-item').forEach(function(item, i) {
      if (i === ind) {
        if (item.classList.contains('content__visibility')) {
          item.classList.remove('content__visibility');
        }
      } else {
        if (!item.classList.contains('content__visibility')) {
          item.classList.add('content__visibility');
        }
      }
    })
    // закрашиваем активный переключатель слайдера темным, а неактивный светлым
    paintSliderToggles(ind, sliderContainer);
  })
})
