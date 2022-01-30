import { getMovieGenres, getPopularMovies } from './api.js';

const posterRoute = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2';

const form = document.querySelector('.form');
const input = form.querySelector('.input');
const resetBtn = document.querySelector('.button-reset');
const submitBtn = document.querySelector('.button-submit');
const app = document.querySelector('.app');
const films = app.querySelector('.films');

console.log('movie app');

let genres = {};

// form listeners
resetBtn.addEventListener('click', (e) => {
  e.preventDefault();
  clearInput();
  input.focus();
});

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(input.value);
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
});

function renderMovies(data) {
  const results = data.results;

  if (results && Array.isArray(results)) {
    console.log(results);
    // get 12 top popular films with poster
    results
      .filter((film) => film.poster_path && film.adult === false)
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
  const wrapper = createNode('div', 'film');
  // poster
  const cover = createNode('div', 'poster-overflow');
  const fig = createNode('figure', 'poster-wrapper');
  const img = createNode('img');
  img.src = `${posterRoute}${film.poster_path}`;
  fig.append(img);
  cover.append(fig);
  wrapper.append(cover);

  // title
  const title = createNode('h3', 'title');
  title.textContent = film.title;
  wrapper.append(title);

  // info
  const info = createNode('p', 'info');
  const year = createNode('span', 'info__year');
  year.textContent = film.release_date.split('-')[0];

  const genre = createNode('span', 'info__genre');
  genre.textContent = genres[film.genre_ids[0]] || '';
  info.append(year, genre);
  wrapper.append(info);

  // wrapper.textContent = `${film.original_title}`;
  return wrapper;
}
