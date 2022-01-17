import { createEl, convertTimer, getRandomNumber, getStorage } from './utils';

const board = document.querySelector('.game-board');
const level = document.querySelector('.level-container');
const levelTitle = level.querySelector('.level-title');
const resetButton = document.querySelector('.game-button__reset');
// timer
const timerSection = document.querySelector('.game-timer');
const minutes = timerSection.querySelector('.minutes');
const seconds = timerSection.querySelector('.seconds');
// result
const gameResult = document.querySelector('.game-result');
const resultCount = gameResult.querySelector('.click-count');

let cards = getStorage(levelTitle.dataset.level);
let isMenuOpen = false;
let storage = [];

const images = {
  easy: {
    0: `url('./assets/img/cards/farm/0.png')`,
    1: `url('./assets/img/cards/farm/1.png')`,
    2: `url('./assets/img/cards/farm/2.png')`,
    3: `url('./assets/img/cards/farm/3.png')`,
    4: `url('./assets/img/cards/farm/4.png')`,
    5: `url('./assets/img/cards/farm/5.png')`,
    6: `url('./assets/img/cards/farm/6.png')`,
    7: `url('./assets/img/cards/farm/7.png')`,
    8: `url('./assets/img/cards/farm/8.png')`,
    9: `url('./assets/img/cards/farm/9.png')`,
    10: `url('./assets/img/cards/farm/10.png')`,
    11: `url('./assets/img/cards/farm/11.png')`,
    12: `url('./assets/img/cards/farm/12.png')`,
    13: `url('./assets/img/cards/farm/13.png')`,
    14: `url('./assets/img/cards/farm/14.png')`,
  },
  hard: {
    0: `url('./assets/img/cards/hiragana/0.png')`,
    1: `url('./assets/img/cards/hiragana/1.png')`,
    2: `url('./assets/img/cards/hiragana/2.png')`,
    3: `url('./assets/img/cards/hiragana/3.png')`,
    4: `url('./assets/img/cards/hiragana/4.png')`,
    5: `url('./assets/img/cards/hiragana/5.png')`,
    6: `url('./assets/img/cards/hiragana/6.png')`,
    7: `url('./assets/img/cards/hiragana/7.png')`,
    8: `url('./assets/img/cards/hiragana/8.png')`,
    9: `url('./assets/img/cards/hiragana/9.png')`,
    10: `url('./assets/img/cards/hiragana/10.png')`,
    11: `url('./assets/img/cards/hiragana/11.png')`,
    12: `url('./assets/img/cards/hiragana/12.png')`,
    13: `url('./assets/img/cards/hiragana/13.png')`,
    14: `url('./assets/img/cards/hiragana/14.png')`,
  },
};
const imagesLength = 15;
const maxCards = 30;
let control = {
  timer: 0,
  isPlaying: false,
  imageInGame: [],
  cardPairs: {},
  click: 0,
  level: '',
};
let refreshTimer;
let target1, target2;

startGame();
resetButton.addEventListener('click', startGame);

// game level
level.addEventListener('click', (e) => {
  const target = e.target;
  level.classList.toggle('active');

  if (!isMenuOpen) {
    isMenuOpen = true;
    document.addEventListener('click', listenLevelClick);
  } else {
    isMenuOpen = false;
    document.removeEventListener('click', listenLevelClick);
    levelTitle.textContent = target.textContent;
    levelTitle.dataset.level = target.dataset.level;
    startGame();
  }
});

function startGame() {
  gameResult.classList.remove('finished');
  board.textContent = '';
  control = {
    isPlaying: false,
    imageInGame: [],
    cardPairs: {},
    click: 0,
    level: levelTitle.dataset.level,
  };
  resetTimer();
  resultCount.textContent = control.click;

  // insert cards in game board
  for (let i = 0; i < maxCards; i++) {
    const card = createCard(i);
    board.append(card);
  }

  // update cards in DOM
  cards = document.querySelectorAll('.card');

  // update cards color
  for (let i = 0; i < Math.ceil(maxCards / 2); i++) {
    const bg = getRandomImage(images[control.level]);
    generateRandomPair(bg);
  }

  // click on card
  board.addEventListener('click', boardGameClick);
}

function boardGameClick(e) {
  if (e.target.classList.contains('card__face_front')) {
    if (!control.isPlaying) {
      startTimer();
    }

    control.isPlaying = true;
    const target = e.target.closest('.card');
    target.classList.add('flip');
    resultCount.textContent = ++control.click;

    if (control.click % 2 === 1) {
      target1 = target;
      target2 = null;
    }
    if (control.click % 2 === 0) {
      target2 = target;
      if (!isPair(target1.dataset.count, target2.dataset.count)) {
        board.classList.add('disabled');
        setTimeout(() => {
          cards.forEach((card) => {
            if (!card.classList.contains('flip-fixed')) {
              card.classList.remove('flip');
            }
          });
        }, 800);
        setTimeout(() => {
          target1 = null;
          target2 = null;
          board.classList.remove('disabled');
        }, 1000);
      } else {
        target1.classList.add('flip-fixed');
        target2.classList.add('flip-fixed');
        delete control.cardPairs[target1.dataset.count];
        delete control.cardPairs[target2.dataset.count];
        target1 = null;
        target2 = null;

        if (Object.values(control.cardPairs).length === 0) {
          finishGame();
        }
      }
    }
  }
}

function finishGame() {
  gameResult.classList.add('finished');
  saveResult(control.click, control.timer, control.level);
  clearInterval(refreshTimer);
}

function createCard(idx) {
  const card = createEl('div', 'card');
  const cardFront = createEl('div', 'card__face', 'card__face_front');
  const cardBack = createEl('div', 'card__face', 'card__face_back');

  card.append(cardFront);
  card.append(cardBack);
  card.dataset.count = idx;

  return card;
}

function generateRandomPair(bg) {
  const index1 = generateUniqueKey();
  const index2 = generateUniqueKey();
  control.cardPairs[index1] = index2;
  control.cardPairs[index2] = index1;

  insertBg(index1, bg);
  insertBg(index2, bg);
}

function generateUniqueKey() {
  let key = getRandomNumber(0, maxCards - 1);
  while (Object.keys(control.cardPairs).includes(key.toString())) {
    key = getRandomNumber(0, maxCards - 1);
  }
  control.cardPairs[key] = null;
  return key;
}

function insertBg(idx, bg) {
  const back = cards[idx].querySelector('.card__face_back');
  back.style.backgroundImage = bg;
}

function isPair(key1, key2) {
  if (control.cardPairs[key1] == key2) {
    return true;
  }
}

function getRandomImage(images) {
  let key = Math.floor(Math.random() * imagesLength);
  while (control.imageInGame.includes(key)) {
    key = Math.floor(Math.random() * imagesLength);
  }
  control.imageInGame.push(key);
  return images[key];
}

function listenLevelClick(e) {
  if (!e.target.dataset.level) {
    isMenuOpen = false;
    level.classList.remove('active');
    document.removeEventListener('click', listenLevelClick);
  }
}

// timer
function startTimer() {
  refreshTimer = setInterval(() => {
    control.timer++;

    const [m, s] = convertTimer(control.timer);
    minutes.textContent = m;
    seconds.textContent = s;
  }, 1000);
}

function resetTimer() {
  control.timer = 0;
  clearInterval(refreshTimer);
  minutes.textContent = '00';
  seconds.textContent = '00';
}

// save to storage
function saveResult(c, t, l) {
  storage = getStorage(l);
  storage.push([c, t]);
  const sortedStorage = storage.sort((a, b) => {
    if (a[0] > b[0]) {
      return 1;
    } else if (a[0] == b[0] && a[1] > b[1]) {
      return 1;
    }
    return -1;
  });

  localStorage.setItem(
    `memoryGame_${l}`,
    JSON.stringify(sortedStorage.slice(0, 10))
  );
}
