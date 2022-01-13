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
    0: `url('../assets/img/farm/0.png')`,
    1: `url('../assets/img/farm/1.png')`,
    2: `url('../assets/img/farm/2.png')`,
    3: `url('../assets/img/farm/3.png')`,
    4: `url('../assets/img/farm/4.png')`,
    5: `url('../assets/img/farm/5.png')`,
    6: `url('../assets/img/farm/6.png')`,
    7: `url('../assets/img/farm/7.png')`,
    8: `url('../assets/img/farm/8.png')`,
    9: `url('../assets/img/farm/9.png')`,
    10: `url('../assets/img/farm/10.png')`,
    11: `url('../assets/img/farm/11.png')`,
    12: `url('../assets/img/farm/12.png')`,
    13: `url('../assets/img/farm/13.png')`,
    14: `url('../assets/img/farm/14.png')`,
  },
  hard: {
    0: `url('../assets/img/hiragana/0.png')`,
    1: `url('../assets/img/hiragana/1.png')`,
    2: `url('../assets/img/hiragana/2.png')`,
    3: `url('../assets/img/hiragana/3.png')`,
    4: `url('../assets/img/hiragana/4.png')`,
    5: `url('../assets/img/hiragana/5.png')`,
    6: `url('../assets/img/hiragana/6.png')`,
    7: `url('../assets/img/hiragana/7.png')`,
    8: `url('../assets/img/hiragana/8.png')`,
    9: `url('../assets/img/hiragana/9.png')`,
    10: `url('../assets/img/hiragana/10.png')`,
    11: `url('../assets/img/hiragana/11.png')`,
    12: `url('../assets/img/hiragana/12.png')`,
    13: `url('../assets/img/hiragana/13.png')`,
    14: `url('../assets/img/hiragana/14.png')`,
  },
};
const imagesLength = 15;
const maxCards = 30;
let control = {
  timer: 0,
  isPlaying: false,
  imageInGame: [],
  gamePairs: {},
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
    gamePairs: {},
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

    const [h, m, s] = convertTimer(control.timer);
    hours.textContent = h;
    minutes.textContent = m;
    seconds.textContent = s;
  }, 1000);
}

function resetTimer() {
  control.timer = 0;
  clearInterval(refreshTimer);
  hours.textContent = '0';
  minutes.textContent = '00';
  seconds.textContent = '00';
}

function convertTimer(timer) {
  const t = timer;
  const h = Math.floor(t / 3600);
  const m = Math.floor((t - h * 3600) / 60);
  const s = t - h * 3600 - m * 60;

  const _m = `${Math.floor(m / 10)}${Math.floor(m % 10)}`;
  const _s = `${Math.floor(s / 10)}${Math.floor(s % 10)}`;

  return [h, _m, _s];
}

// save to storage
function saveResult(c, t, l) {
  const storage = JSON.parse(localStorage.getItem(`memoryGame_${l}`)) || [];
  storage.push([c, t]);
  const sortedStorage = storage.sort((a, b) => {
    if (a[0] > b[0]) {
      return 1;
    } else if (a[0] == b[0] && a[1] > b[1]) {
      return 1;
    }
    return -1;
  });

  // const [h, m, s] = convertTimer(t);
  // console.log(`${c} clicks (in ${h}:${m}:${s})`);

  localStorage.setItem(
    `memoryGame_${l}`,
    JSON.stringify(sortedStorage.slice(0, 10))
  );
}
