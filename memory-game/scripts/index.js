const board = document.querySelector('.board');

const palette = {
  0: 'purple',
  1: 'red',
  2: 'orange',
  3: 'green',
  4: 'blue',
};
const maxCards = 20 - 1; // start = 0
const paletteLength = Object.keys(palette).length;
const selectedCards = [];

// insert cards in game board
for (let i = 0; i <= maxCards; i++) {
  const card = createCard(i);
  board.append(card);
}

// set to cards random colors
const cards = document.querySelectorAll('.card');
console.log(cards);

for (let i = 0; i <= maxCards / 2; i++) {
  const color = getRandomColor();
  colorRandomCard(color);
  colorRandomCard(color);
}

function createCard(name) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.textContent = name + 1;

  return card;
}

function colorRandomCard(color) {
  let item = getRandomNumber(0, maxCards);
  console.log(item + 1);
  while (selectedCards.includes(item)) {
    item = getRandomNumber(0, maxCards);
  }
  selectedCards.push(item);
  cards[item].style.backgroundColor = color;
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  const key = Math.floor(Math.random() * paletteLength);
  return palette[key];
}
