import data from './i18n';

const textElements = document.querySelectorAll('[data-i18n]');
const lang = document.querySelector('.lang');

let activeLang = localStorage.getItem('portfolioLang') || 'ru';
changeLang(activeLang);

lang.addEventListener('click', (e) => {
  if (e.target.classList.contains('lang-input')) {
    const newLang = e.target.id;

    if (activeLang !== newLang) {
      changeLang(newLang);
    }
  }
});

function changeLang(lang) {
  localStorage.setItem('portfolioLang', lang);
  document.querySelector(`.lang-input#${lang}`).checked = true;

  activeLang = lang;

  textElements.forEach((el) => {
    el.textContent = data[lang][el.dataset.i18n];
  });
}
