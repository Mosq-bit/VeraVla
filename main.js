function scrollDown() {
  window.scrollBy({
    top: window.innerHeight * 0.8, // Прокрутка на 80% высоты экрана
    behavior: 'smooth' // Плавная прокрутка
  });
}

// Элементы модального окна
  const modal = document.getElementById('modal');
  const modalClose = document.querySelector('.modal__close');
  
  // Функции для работы с модальным окном
  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
  }
  
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Разблокируем скролл
  }
  
  // Закрытие по клику на крестик
  modalClose.addEventListener('click', closeModal);
  
  // Закрытие по клику вне модального окна
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Закрытие по ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
  
  // Пример: открытие модалки при клике на кнопку (добавьте к вашей кнопке класс "js-open-modal")
  document.querySelectorAll('.js-open-modal').forEach(btn => {
    btn.addEventListener('click', openModal);
  });

document.addEventListener('DOMContentLoaded', function () {
  const accordionItems = document.querySelectorAll('.accordion-item');

  // Добавляем обработчики событий для каждого элемента аккордеона
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    const icon = item.querySelector('.accordion__icon-arrow');

    // Инициализация состояния
    content.style.maxHeight = '0';
    content.style.overflow = 'hidden';
    content.style.transition = 'max-height 0.4s ease, margin 0.4s ease, padding 0.4s ease';

    // Обработчик клика
    header.addEventListener('click', function () {
      // Закрываем все другие открытые элементы
      accordionItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.accordion-content');
          const otherIcon = otherItem.querySelector('.accordion__icon-arrow');
          otherContent.style.maxHeight = '0';
          otherContent.style.margin = '0';
          otherContent.style.padding = '0';
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
      });

      // Переключаем текущий элемент
      if (item.classList.contains('active')) {
        // Закрываем
        item.classList.remove('active');
        content.style.maxHeight = '0';
        content.style.margin = '0';
        content.style.padding = '0';
        if (icon) icon.style.transform = 'rotate(0deg)';
      } else {
        // Открываем
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.margin = '34px 0 60px';
        content.style.padding = '0 17px';
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });

  // Опционально: открыть первый элемент по умолчанию
  // if (accordionItems.length > 0) {
  //   accordionItems[0].querySelector('.accordion-header').click();
  // }
});

document.querySelector('.flip__container').addEventListener('click', function () {
  this.classList.toggle('flip__container--flipped');
});

document.addEventListener('DOMContentLoaded', function () {
  // Функция для инициализации слайдера
  function initSlider(sliderId, prevBtnId, nextBtnId, dotsId) {
    const slider = document.querySelector(sliderId);
    const slides = document.querySelectorAll(`${sliderId} .slide`);
    const dots = document.querySelectorAll(`${dotsId} .dot`);
    const prevBtn = document.querySelector(prevBtnId);
    const nextBtn = document.querySelector(nextBtnId);

    let currentIndex = 0;
    const slidesToShow = 3;
    let slideWidth = slides[0].offsetWidth + 20; // width + gap

    // Определяем количество точек в зависимости от количества слайдов
    const dotsCount = Math.ceil(slides.length / slidesToShow);

    // Обновляем точки, если нужно
    if (dots.length !== dotsCount) {
      const dotsContainer = document.querySelector(dotsId);
      dotsContainer.innerHTML = '';

      for (let i = 0; i < dotsCount; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
      }
    }

    const updatedDots = document.querySelectorAll(`${dotsId} .dot`);

    function updateSlider() {
      slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

      // Обновление точек
      updatedDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === Math.floor(currentIndex / slidesToShow));
      });

      // Блокировка кнопок, если достигнуты границы
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= slides.length - slidesToShow;
    }

    function nextSlide() {
      if (currentIndex < slides.length - slidesToShow) {
        currentIndex++;
        updateSlider();
      }
    }

    function prevSlide() {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    }

    // Навигация по точкам
    updatedDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index * slidesToShow;
        updateSlider();
      });
    });

    // Кнопки навигации
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Адаптация при ресайзе
    window.addEventListener('resize', function () {
      slideWidth = slides[0].offsetWidth + 20;
      updateSlider();
    });

    // Автопрокрутка (опционально)
    let slideInterval = setInterval(nextSlide, 5000);

    slider.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });

    slider.addEventListener('mouseleave', () => {
      slideInterval = setInterval(nextSlide, 5000);
    });

    // Инициализация
    updateSlider();
  }

  // Инициализация первого слайдера
  initSlider('#slider1', '#prev1', '#next1', '#dots1');

  // Инициализация второго слайдера
  initSlider('#slider2', '#prev2', '#next2', '#dots2');
});
 // Получаем кнопку и header
  const button = document.getElementById('scrollBtn');
  const header = document.getElementById('main-header');

  // Обработчик клика
  button.addEventListener('click', () => {
    // Прокрутка к header с плавным эффектом
    header.scrollIntoView({ behavior: 'smooth' });
  });