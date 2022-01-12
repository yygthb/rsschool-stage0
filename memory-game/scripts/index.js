const board = document.querySelector('.game-board');
const resetButton = document.querySelector('.game-button__reset');
let cards = [];

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

startGame();
resetButton.addEventListener('click', startGame);

// -----------------------------------------------------------
// set to cards random colors

function startGame() {
  console.log('start game');
  cardsInGame = [];
  clickCount = 0;
  clickTargets = [];
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
    clickCount++;
    target.classList.remove('reversed');

    if (clickCount === 1) {
      clickTargets[0] = target;
    }
    if (clickCount === 2) {
      clickTargets[1] = target;
      if (
        clickTargets[0].style.backgroundColor ===
        clickTargets[1].style.backgroundColor
      ) {
        clickTargets.forEach((card) => {
          card.classList.add('fixed');
          const count = +card.dataset.count;
          cardsInGame = cardsInGame.filter((item) => item !== count);
        });
        clickCount = 0;
      } else {
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
