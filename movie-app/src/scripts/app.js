import { getMovieGenres, getPopularMovies, getMoviesByTitle } from './api.js';

const posterRoute = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2';

const form = document.querySelector('.form');
const input = form.querySelector('.input');
const resetBtn = document.querySelector('.button-reset');
const submitBtn = document.querySelector('.button-submit');
const app = document.querySelector('.app');
const appTitle = app.querySelector('.app__title');
const films = app.querySelector('.films');

const genres = {};

// form listeners
resetBtn.addEventListener('click', (e) => {
  e.preventDefault();
  clearInput();
  input.focus();
});

submitBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  console.log(input.value);

  // input validation
  if (input.value.trim()) {
    console.log(`input.value: "${input.value}"`);
    // render films
    const res = await getMoviesByTitle(input.value);
    if (res.ok === true) {
      const data = await res.json();
      appTitle.textContent = `Results for "${input.value}":`;
      renderMovies(data);
    }
  }
});

input.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    submitBtn.click();
  }
});

function clearInput() {
  input.value = '';
}

// app
window.addEventListener('load', async (e) => {
  e.preventDefault();
  console.log('movie app');

  // save genres
  const g = await getMovieGenres();
  if (g.ok === true) {
    const data = await g.json();
    data.genres.forEach((item) => {
      genres[item.id] = item.name;
    });
  }

  // render films
  const res = await getPopularMovies();
  if (res.ok === true) {
    const data = await res.json();
    renderMovies(data);
  }

  input.focus();
});

function renderMovies(data) {
  const results = data.results;
  films.textContent = '';

  if (results && Array.isArray(results)) {
    console.log(results);
    results
      .filter((film) => film.adult === false)
      .splice(0, 12)
      .forEach((film) => {
        const el = createFilmCard(film);
        films.append(el);
      });
  }
}

// className example: 'block block__element block__element_mod'
function createNode(tag, className) {
  const el = document.createElement(tag);
  if (className) {
    const classNames = className.split(' ');
    classNames.forEach((cn) => el.classList.add(cn));
  }
  return el;
}

function createFilmCard(film) {
  const card = createNode('div', 'film');

  // poster
  const cover = createNode('div', 'poster-overflow');
  const fig = createNode('figure', 'poster-wrapper');
  const img = createNode('img');
  img.alt = `${film.title} - film poster`;
  img.src = `${posterRoute}${film.poster_path}`;
  fig.append(img);
  cover.append(fig);
  card.append(cover);

  // title
  const titleText = createNode('span', 'text');
  const title = createNode('h3', 'title');
  title.title = film.title;
  titleText.textContent = film.title;
  title.append(titleText);
  card.append(title);

  // info
  const info = createNode('p', 'info');
  const year = createNode('span', 'info__year');
  year.textContent = film.release_date.split('-')[0];
  const genre = createNode('span', 'info__genre');
  genre.textContent = genres[film.genre_ids[0]] || '';
  info.append(year, genre);
  card.append(info);

  // rating
  const rate = createNode('p', 'rating');
  const v = film.vote_average || 0;
  rate.classList.add(v > 7.5 ? 'rating__high' : 'rating__low');
  rate.textContent = v;
  card.append(rate);

  return card;
}
