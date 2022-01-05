// scroll to section title
const header = document.querySelector('.header');
const navLinks = header.querySelectorAll('a[href*="#"]');

navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const sectionId = link.getAttribute('href').substr(1);

    const yOffset = -header.offsetHeight;
    const element = document.querySelector(`#${sectionId}`);
    const y =
      element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({
      top: y,
      behavior: 'smooth',
    });
  });
});

// form
const form = document.querySelector('.contacts-form');
const actionButton = form.querySelector('.button');
const inputs = document.querySelectorAll('.form-input');

inputs.forEach((input) => {
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  });
});

actionButton.addEventListener('click', (e) => {
  e.preventDefault();
});

// review
console.log(`
Оценка своей работы "portfolio#1 - Фиксированная вёрстка" (110)

||  1. Вёрстка валидная +10
||    - для проверки использовал сервис https://validator.w3.org/
||  
||  2. Вёрстка семантическая +20
||    - <header>, <main>, <footer> +2
||    - шесть элементов <section> (по количеству секций) +2
||    - один заголовок <h1> +2
||    - пять заголовков <h2> +2
||    - один элемент <nav> (панель навигации) +2
||    - два списка ul > li > a  +2
||    - десять кнопок <button> +2
||    - два инпута: <input type="email"> и <input type="tel"> +2
||    - один элемент <textarea> +2
||    - три атрибута placeholder +2
||   
||  3. Вёрстка соответствует макету +48
||    - проверил с PixelPerfect
||   
||  4. Требования к css + 12
||    - для построения сетки используются флексы +2
||    - при уменьшении масштаба страницы браузера вёрстка размещается по центру +2
||    - фоновый цвет тянется на всю ширину страницы +2
||    - иконки добавлены в формате .svg +2
||    - изображения добавлены в формате .jpg +2
||    - есть favicon +2
||   
||  5. Интерактивность, реализуемая через css +20
||    - плавная прокрутка по якорям +5
||    - ссылки в футере ведут на мой гитхаб и на страницу курса +5
||    - изменение цвета и(или) фона текста/элементов при навереднии +5
||    - плавное изменение внешнего вида элемента при наведении и клике не влияющее на соседние элементы +5


`);
