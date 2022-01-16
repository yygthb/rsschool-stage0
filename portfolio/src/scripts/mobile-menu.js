// burger
const body = document.querySelector('body');
const burger = document.querySelector('.burger');
const menu = document.querySelector('.nav');
const overlay = document.querySelector('.overlay');
const closeMenuEl = document.querySelectorAll('[data-close]');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  overlay.classList.toggle('open');
  menu.classList.toggle('open');
  body.classList.toggle('lock');
});
closeMenuEl.forEach((item) => {
  item.addEventListener('click', closeMenu);
});

function closeMenu(e) {
  if (
    e.target.dataset.close === 'menu' ||
    e.target.classList.contains('nav-link')
  ) {
    burger.classList.remove('open');
    overlay.classList.remove('open');
    menu.classList.remove('open');
    body.classList.remove('lock');
  }
}

// hide mobile menu animation when page has been loaded
window.addEventListener('load', () => {
  setTimeout(() => {
    menu.style.display = 'block';
  }, 300);
});
