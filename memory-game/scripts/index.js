const board = document.querySelector('.game-board');
const resetButton = document.querySelector('.game-button__reset');
let cards = [];
const timerEl = document.querySelector('.game-timer');
const hours = timerEl.querySelector('.hours');
const minutes = timerEl.querySelector('.minutes');
const seconds = timerEl.querySelector('.seconds');

const palette = {
  0: 'red',
  1: 'orange',
  2: 'yellow',
  3: 'green',
  4: 'blue',
  5: 'purple',
};
const maxCards = 20 - 1; // start = 0
const paletteLength = Object.keys(palette).length;
let cardsInGame = [];
let clickCount = 0;
let clickTargets = [];
let isPlaying = false;
let timer = 0;
let refreshTimer;

startGame();
resetButton.addEventListener('click', startGame);

// -----------------------------------------------------------
// set to cards random colors

function startGame() {
  resetTimer();
  cardsInGame = [];
  clickCount = 0;
  clickTargets = [];
  isPlaying = false;
  board.textContent = '';

  // -----------------------------------------------------------
  // insert cards in game board
  for (let i = 0; i <= maxCards; i++) {
    const card = createCard(i);
    board.append(card);
  }

  // -----------------------------------------------------------
  // update cards in DOM
  cards = document.querySelectorAll('.card.reversed');

  // -----------------------------------------------------------
  // update cards color
  for (let i = 0; i <= maxCards / 2; i++) {
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
    if (!isPlaying) {
      startTimer();
    }

    isPlaying = true;
    clickCount++;
    target.classList.remove('reversed');

    if (clickCount === 1) {
      clickTargets[0] = target;
    }
    if (clickCount === 2) {
      clickTargets[1] = target;

      // fix similar cards
      if (
        clickTargets[0].style.backgroundColor ===
        clickTargets[1].style.backgroundColor
      ) {
        clickTargets.forEach((card) => {
          card.classList.add('fixed');
          const count = +card.dataset.count;
          cardsInGame = cardsInGame.filter((item) => item !== count);
        });
        if (cardsInGame.length === 0) {
          stopTimer();
        }
        clickCount = 0;
      } else {
        // reverse choosed cards in 0.5s
        setTimeout(() => {
          clickTargets.forEach((card) => {
            if (!card.classList.contains('fixed')) {
              card.classList.add('reversed');
            }
          });
          clickCount = 0;
        }, 500);
      }
    }
  }
}

function createCard(name) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.classList.add('reversed');
  card.textContent = name + 1;
  card.dataset.count = name;

  return card;
}

function colorRandomCard(color) {
  let item = getRandomNumber(0, maxCards);
  while (cardsInGame.includes(item)) {
    item = getRandomNumber(0, maxCards);
  }
  cardsInGame.push(item);
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
    timer++;
    updateTimer();
  }, 1000);
}

function stopTimer() {
  clearInterval(refreshTimer);
}

function resetTimer() {
  timer = 0;
  clearInterval(refreshTimer);
  hours.textContent = '0';
  minutes.textContent = '00';
  seconds.textContent = '00';
}

function updateTimer() {
  const h = Math.floor(timer / 3600);
  const m = Math.floor((timer - h * 3600) / 60);
  const s = timer - h * 3600 - m * 60;

  hours.textContent = h;
  minutes.textContent = `${Math.floor(m / 10)}${Math.floor(m % 10)}`;
  seconds.textContent = `${Math.floor(s / 10)}${Math.floor(s % 10)}`;
}
