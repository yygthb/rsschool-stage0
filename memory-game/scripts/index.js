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
  cardsInGame: [],
  clickedPair: [],
};
let refreshTimer;

startGame();
resetButton.addEventListener('click', startGame);

// game level
level.addEventListener('click', (e) => {
  const target = e.target;
  level.classList.toggle('active');

  if (!isMenuOpen) {
    isMenuOpen = true;
    document.addEventListener('click', listenClick);
  } else {
    isMenuOpen = false;
    document.removeEventListener('click', listenClick);
    levelTitle.textContent = target.textContent;
    levelTitle.dataset.level = target.dataset.level;
    startGame();
  }
});

function startGame() {
  const level = levelTitle.dataset.level;
  title.textContent = 'Timer';
  timerSection.classList.remove('finished');
  board.textContent = '';
  control = {
    isPlaying: false,
    cardsInGame: [],
    clickedPair: [],
  };
  resetTimer();

  // -----------------------------------------------------------
  // insert cards in game board
  for (let i = 0; i < maxCards; i++) {
    const card = createCard(i);
    board.append(card);
  }

  // -----------------------------------------------------------
  // update cards in DOM
  cards = document.querySelectorAll('.card.reversed');

  // -----------------------------------------------------------
  // update cards color
  for (let i = 0; i < Math.ceil(maxCards / 2); i++) {
    const bg = getRandomImage(images[level]);
    coverRandomCard(bg);
    coverRandomCard(bg);
  }

  // -----------------------------------------------------------
  // click on card
  board.addEventListener('click', boardGameClick);
}

function boardGameClick(e) {
  const target = e.target;

  if (target.matches('.card.reversed')) {
    if (!control.isPlaying) {
      startTimer();
    }
    control.isPlaying = true;
    target.classList.remove('reversed');

    if (control.clickedPair.length === 0) {
      control.clickedPair.push(target);
    } else if (control.clickedPair.length === 1) {
      control.clickedPair.push(target);
      // fix similar cards
      if (
        control.clickedPair[0].style.backgroundImage ===
        control.clickedPair[1].style.backgroundImage
      ) {
        control.clickedPair.forEach((card) => {
          card.classList.add('fixed');
          const count = +card.dataset.count;
          control.cardsInGame = control.cardsInGame.filter(
            (item) => item !== count
          );
        });
        if (control.cardsInGame.length === 0) {
          finishGame();
        }
        control.clickedPair = [];
      } else {
        // reverse wrong cards in 0.5s
        board.classList.add('disabled');
        setTimeout(() => {
          control.clickedPair.forEach((card) => {
            if (!card.classList.contains('fixed')) {
              card.classList.add('reversed');
            }
          });
          control.clickedPair = [];
          board.classList.remove('disabled');
        }, 500);
      }
    }
  }
}

function finishGame() {
  timerSection.classList.add('finished');
  title.textContent = 'Result';
  stopTimer();
}

function createCard(name) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.classList.add('reversed');
  card.dataset.count = name;

  return card;
}

function coverRandomCard(bg) {
  let item = getRandomNumber(0, maxCards - 1);
  while (control.cardsInGame.includes(item)) {
    item = getRandomNumber(0, maxCards - 1);
  }
  control.cardsInGame.push(item);
  cards[item].style.backgroundImage = bg;
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomImage(images) {
  const key = Math.floor(Math.random() * imagesLength);
  return images[key];
}

function listenClick(e) {
  if (!e.target.dataset.level) {
    isMenuOpen = false;
    level.classList.remove('active');
    document.removeEventListener('click', listenClick);
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
