const board = document.querySelector('.game-board');
const resetButton = document.querySelector('.game-button__reset');
let cards = [];
const timerSection = document.querySelector('.game-timer');
const title = timerSection.querySelector('.game-title');
const hours = timerSection.querySelector('.hours');
const minutes = timerSection.querySelector('.minutes');
const seconds = timerSection.querySelector('.seconds');

const palette = {
  0: 'red',
  1: 'orange',
  2: 'yellow',
  3: 'green',
  4: 'blue',
  5: 'purple',
};
const paletteLength = Object.keys(palette).length;
const maxCards = 10;
let control = {
  timer: 0,
  isPlaying: false,
  cardsInGame: [],
  clickedPair: [],
};
let refreshTimer;

startGame();
resetButton.addEventListener('click', startGame);

function startGame() {
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
  for (let i = 0; i < maxCards / 2; i++) {
    const color = getRandomColor();
    colorRandomCard(color);
    colorRandomCard(color);
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
        control.clickedPair[0].style.backgroundColor ===
        control.clickedPair[1].style.backgroundColor
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

function colorRandomCard(color) {
  let item = getRandomNumber(0, maxCards - 1);
  while (control.cardsInGame.includes(item)) {
    item = getRandomNumber(0, maxCards - 1);
  }
  control.cardsInGame.push(item);
  cards[item].style.backgroundColor = color;
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  const key = Math.floor(Math.random() * paletteLength);
  return palette[key];
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
