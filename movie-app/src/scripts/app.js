import {
  getMovieGenres,
  getPopularMovies,
  getMoviesByTitle,
  getMovieById,
} from './transport.js';
import { createNode, createRatingClassName } from './utils';
import api from './api';

const posterRoute = api.route.poster;

const form = document.querySelector('.form');
const input = form.querySelector('.input');
const resetBtn = document.querySelector('.button-reset');
const submitBtn = document.querySelector('.button-submit');
const app = document.querySelector('.app');
const appTitle = app.querySelector('.app__title');
const films = app.querySelector('.films');

const genres = {};

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

  // routes
  const search = window.location.search;
  if (search && search[0] === '?') {
    const query = {};
    const queryArr = search.slice(1, search.length).split('&');
    for (let item of queryArr) {
      const queryArr = item.split('=');
      query[queryArr[0]] = queryArr[1];
    }

    if (query.id) {
      filmPage(query.id);
    } else if (query.search) {
      searchPage(query.search);
    } else {
      indexPage();
    }
  } else {
    indexPage();
  }

  input.focus();
});

// input
resetBtn.addEventListener('click', (e) => {
  e.preventDefault();
  clearInput();
  input.focus();
});
submitBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  if (input.value.trim()) {
    searchPage(input.value.trim());
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

// app pages
async function indexPage() {
  const res = await getPopularMovies();
  if (res.ok === true) {
    appTitle.textContent = 'Our recomendations:';
    const data = await res.json();
    renderFilmsList(data);
  }
}
async function searchPage(title) {
  const res = await getMoviesByTitle(title);
  if (res.ok === true) {
    const data = await res.json();
    window.history.replaceState(
      {},
      '',
      window.location.pathname + `?search=${title}`
    );
    appTitle.textContent = `Results for "${title.replace(/%20/g, ' ')}":`;
    renderFilmsList(data);
  }
}
async function filmPage(id) {
  const res = await getMovieById(id);
  if (res.ok === true) {
    const data = await res.json();

    appTitle.textContent = data.title;
    // renderFilmInfo(data);
  }
}

// app components
function renderFilmsList(data) {
  const results = data.results;
  films.textContent = '';

  if (results && Array.isArray(results)) {
    // console.log(results);
    results.forEach((film) => {
      const el = createFilmCard(film);
      films.append(el);
    });
  }
}
function createFilmCard(film) {
  const card = createNode('a', 'film');
  card.href = window.location.pathname + `?id=${film.id}`;
  // card.target = '_blank';

  // poster
  const cover = createNode('div', 'poster-overflow');
  const fig = createNode('figure', 'poster-wrapper');
  const img = createNode('img');
  img.alt = `${film.title} - film poster`;
  img.src = film.poster_path
    ? `${posterRoute}${film.poster_path}`
    : './assets/img/no-poster.jpg';
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
  rate.classList.add(createRatingClassName(v));
  rate.textContent = v;
  card.append(rate);

  return card;
}
