import {
  getMovieGenres,
  getPopularMovies,
  getMoviesByTitle,
  getMovieById,
} from './transport.js';
import { createNode, createRatingClassName } from './utils';
import api from './api';

const noPosterSrc = './assets/img/no-poster.jpg';

const form = document.querySelector('.form');
const input = form.querySelector('.input');
const resetBtn = document.querySelector('.button-reset');
const submitBtn = document.querySelector('.button-submit');
const app = document.querySelector('.app');
const appTitle = app.querySelector('.app__title');
const films = app.querySelector('.film__items');

const genres = {};

showLoader();

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
      runFilmPage(query.id);
    } else if (query.search) {
      runSearchPage(query.search);
    } else {
      runIndexPage();
    }
  } else {
    runIndexPage();
  }

  input.focus();
});

// form
resetBtn.addEventListener('click', (e) => {
  e.preventDefault();
  clearInput();
  input.focus();
});
submitBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  if (input.value.trim()) {
    runSearchPage(input.value.trim());
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

// app routes
async function runIndexPage() {
  const res = await getPopularMovies();
  if (res.ok === true) {
    appTitle.textContent = 'Our recomendations:';
    const data = await res.json();
    renderFilmsList(data);
    hideLoader();
  } else {
    app.append(renderError());
    hideLoader();
  }
}
async function runSearchPage(title) {
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
    hideLoader();
  } else {
    app.append(renderError());
    hideLoader();
  }
}
async function runFilmPage(id) {
  const res = await getMovieById(id);
  if (res.ok === true) {
    const data = await res.json();
    const filmCard = createFilmInfo(data);
    app.append(filmCard);
    hideLoader();
  } else {
    app.append(renderError());
    hideLoader();
  }
}

// app components
function renderFilmsList(data) {
  const results = data.results;
  films.textContent = '';

  if (results && Array.isArray(results)) {
    results.forEach((film) => {
      const filmCard = createFilmCard(film);
      films.append(filmCard);
    });
  }
}
function createFilmCard(film) {
  const card = createNode('a', 'film__item');
  card.href = window.location.pathname + `?id=${film.id}`;
  // card.target = '_blank';

  // poster
  const cover = createNode('div', 'poster-overflow');
  const fig = createNode('figure', 'poster-wrapper');
  const img = createNode('img');
  img.alt = `${film.title} - film poster`;
  img.src = film.poster_path
    ? `${api.route.poster.w300}${film.poster_path}`
    : noPosterSrc;
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
function createFilmInfo(film) {
  let filmTitle = film.original_title;
  const filmYear = film.release_date && film.release_date.split('-')[0];
  const genres = film.genres.map((item) => item.name);

  const wrapper = createNode('div', 'film');

  // poster
  const fig = createNode('figure', 'poster-wrapper');
  const img = createNode('img');
  img.alt = `${film.title} - film poster`;
  img.src = film.poster_path
    ? `${api.route.poster.w500}${film.poster_path}`
    : noPosterSrc;
  fig.append(img);
  wrapper.append(fig);

  // title
  const titleWr = createNode('div', 'title-wrapper');
  const titleEl = createNode('h1', 'title');
  if (filmYear) {
    filmTitle = `${filmTitle} (${filmYear})`;
  }
  titleEl.textContent = filmTitle;
  if (film.tagline) {
    const taglineEl = createNode('p', 'tagline');
    taglineEl.textContent = film.tagline;
    titleWr.append(titleEl, taglineEl);
  } else {
    titleWr.append(titleEl);
  }
  wrapper.append(titleWr);

  // genres
  if (genres && genres.length) {
    const genresEl = createNode('p', 'genres');
    genresEl.textContent = genres.join(', ');
    wrapper.append(genresEl);
  }

  // overview
  if (film.overview) {
    const overviewEl = createNode('p', 'overview');
    overviewEl.textContent = film.overview;
    wrapper.append(overviewEl);
  }

  // rating
  const rateEl = createNode('p', 'rate');
  const voteAverateEl = createNode('span', 'vote-value');
  voteAverateEl.textContent = film.vote_average;
  const voteCountEl = createNode('span', 'vote-count');
  voteCountEl.textContent = film.vote_count;
  rateEl.append(voteAverateEl, voteCountEl);
  wrapper.append(rateEl);

  return wrapper;
}
function renderError() {
  const error = createNode('div', 'error');

  const errorTitle = createNode('h3');
  errorTitle.textContent = 'OOOPS!';

  const errorText1 = createNode('p');
  errorText1.textContent = 'The resource requested could not be found.';

  const errorText2 = createNode('p');
  const text2 = createNode('span');
  text2.textContent = 'Try later or go to ';
  const link = createNode('a');
  link.setAttribute('href', 'index.html');
  link.textContent = 'home page';
  errorText2.append(text2, link);

  error.append(errorTitle, errorText1, errorText2);
  return error;
}
function showLoader() {
  app.classList.add('loading');
}
function hideLoader() {
  app.classList.remove('loading');
}
