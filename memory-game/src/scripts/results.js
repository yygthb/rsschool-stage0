import { createEl, convertTimer, getStorage } from './utils';

const body = document.querySelector('body');
const level = document.querySelector('.level-container');
const levelTitle = level.querySelector('.level-title');
const resultButton = document.querySelector('.game-button__show-results');
const modal = document.querySelector('.overlay');
const resultList = document.querySelector('.results-list');

let storage = [];

resultButton.addEventListener('click', () => {
  storage = getStorage(levelTitle.dataset.level);
  openModal();
});

function openModal() {
  body.classList.add('lock');
  modal.classList.add('open');
  document.addEventListener('click', closeModal);
  resultList.textContent = '';

  for (let i = 1; i <= storage.length; i++) {
    const item = createEl('li', 'results-item');
    const [m, s] = convertTimer(storage[i - 1][1]);
    item.insertAdjacentHTML(
      'afterbegin',
      `<span>${i}: </span>${storage[i - 1][0]} clicks (in ${m}m ${s}s)`
    );
    resultList.append(item);
  }
}

function closeModal(e) {
  e.stopPropagation();

  if (
    e.target.classList.contains('overlay') ||
    e.target.closest('.modal-close')
  ) {
    modal.classList.remove('open');
    document.removeEventListener('click', closeModal);
    body.classList.remove('lock');
  }
}
