const board = document.querySelector('.game-board');
const level = document.querySelector('.level-container');
const levelTitle = level.querySelector('.level-title');
const resetButton = document.querySelector('.game-button__reset');
let cards = [];
const timerSection = document.querySelector('.game-timer');
const title = timerSection.querySelector('.game-title');
const hours = timerSection.querySelector('.hours');
const minutes = timerSection.querySelector('.minutes');
const seconds = timerSection.querySelector('.seconds');
const gameResult = document.querySelector('.game-result');
const resultCount = gameResult.querySelector('.click-count');

let isMenuOpen = false;

const images = {
  easy: {
    0: `url('../assets/img/veg/0.png')`,
    1: `url('../assets/img/veg/1.png')`,
    2: `url('../assets/img/veg/2.png')`,
    3: `url('../assets/img/veg/3.png')`,
    4: `url('../assets/img/veg/4.png')`,
    5: `url('../assets/img/veg/5.png')`,
    6: `url('../assets/img/veg/6.png')`,
    7: `url('../assets/img/veg/7.png')`,
    8: `url('../assets/img/veg/8.png')`,
    9: `url('../assets/img/veg/9.png')`,
  },
  hard: {
    0: `url('../assets/img/alph/0.png')`,
    1: `url('../assets/img/alph/1.png')`,
    2: `url('../assets/img/alph/2.png')`,
    3: `url('../assets/img/alph/3.png')`,
    4: `url('../assets/img/alph/4.png')`,
    5: `url('../assets/img/alph/5.png')`,
    6: `url('../assets/img/alph/6.png')`,
    7: `url('../assets/img/alph/7.png')`,
    8: `url('../assets/img/alph/8.png')`,
    9: `url('../assets/img/alph/9.png')`,
  },
};
const imagesLength = 10;
const maxCards = 20;
let control = {
  timer: 0,
  isPlaying: false,
  imageInGame: [],
  gamePairs: {},
  click: 0,
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
  const level = levelTitle.dataset.level;
  gameResult.classList.remove('finished');
  board.textContent = '';
  control = {
    isPlaying: false,
    imageInGame: [],
    gamePairs: {},
    click: 0,
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
    const bg = getRandomImage(images[level]);
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
        delete control.gamePairs[target1.dataset.count];
        delete control.gamePairs[target2.dataset.count];
        target1 = null;
        target2 = null;

        if (Object.values(control.gamePairs).length === 0) {
          finishGame();
        }
      }
    }
  }
}

function finishGame() {
  gameResult.classList.add('finished');
  stopTimer();
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

function createEl(tag, ...classNames) {
  const el = document.createElement(tag);
  classNames.forEach((className) => el.classList.add(className));
  return el;
}

function generateRandomPair(bg) {
  const index1 = generateUniqueKey();
  const index2 = generateUniqueKey();
  control.gamePairs[index1] = index2;
  control.gamePairs[index2] = index1;

  insertBg(index1, bg);
  insertBg(index2, bg);
}

function generateUniqueKey() {
  let key = getRandomNumber(0, maxCards - 1);
  while (Object.keys(control.gamePairs).includes(key.toString())) {
    key = getRandomNumber(0, maxCards - 1);
  }
  control.gamePairs[key] = null;
  return key;
}

function insertBg(idx, bg) {
  const back = cards[idx].querySelector('.card__face_back');
  back.style.backgroundImage = bg;
}

function isPair(key1, key2) {
  if (control.gamePairs[key1] == key2) {
    return true;
  }
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
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
    updateTimer();
  }, 1000);
}

function stopTimer() {
  clearInterval(refreshTimer);
}

function resetTimer() {
  control.timer = 0;
  clearInterval(refreshTimer);
  hours.textContent = '0';
  minutes.textContent = '00';
  seconds.textContent = '00';
}

function updateTimer() {
  const t = control.timer;
  const h = Math.floor(t / 3600);
  const m = Math.floor((t - h * 3600) / 60);
  const s = t - h * 3600 - m * 60;

  hours.textContent = h;
  minutes.textContent = `${Math.floor(m / 10)}${Math.floor(m % 10)}`;
  seconds.textContent = `${Math.floor(s / 10)}${Math.floor(s % 10)}`;
}
