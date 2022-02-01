import {
  getMovieGenres,
  getPopularMovies,
  getMoviesByTitle,
  getMovieById,
} from './transport.js';

const posterRoute = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2';

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

  // console.log(window.location);

  const search = window.location.search;
  if (search) {
    const query = {};
    const queryArr = search.slice(1, search.length).split('&');
    for (let item of queryArr) {
      const queryArr = item.split('=');
      query[queryArr[0]] = queryArr[1];
    }

    const id = query[Object.keys(query).find((item) => item === 'id')];
    if (id) {
      // render filmPage
      console.log('film id: ', id);
      const res = await getMovieById(id);
      if (res.ok === true) {
        const data = await res.json();
        renderFilmInfo(data);
      }
    }
  } else {
    // render index
    const res = await getPopularMovies();
    if (res.ok === true) {
      const data = await res.json();
      renderMovies(data);
    }
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
  const v = input.value;
  console.log('v: ', v);

  // is input !== ""
  if (v.trim()) {
    // render films
    const res = await getMoviesByTitle(v);
    if (res.ok === true) {
      const data = await res.json();
      window.history.replaceState(
        {},
        '',
        window.location.pathname + `?search=titanic`
      );
      // window.location.search = `?search=test`;
      appTitle.textContent = `Results for "${v}":`;
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

// index page - render films collection
function renderMovies(data) {
  const results = data.results;
  films.textContent = '';

  if (results && Array.isArray(results)) {
    console.log(results);
    results
      // .splice(0, 12)
      .forEach((film) => {
        const el = createFilmCard(film);
        films.append(el);
      });
  }
}

function createNode(tag, className) {
  // className example: 'block block__element block__element_mod'
  const el = document.createElement(tag);
  if (className) {
    const classNames = className.split(' ');
    classNames.forEach((cn) => el.classList.add(cn));
  }
  return el;
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
  rate.classList.add(generateRatingClassName(v));
  rate.textContent = v;
  card.append(rate);

  return card;
}

function generateRatingClassName(rate) {
  if (rate >= 7.5) {
    return 'rating__high';
  } else if (rate >= 5) {
    return 'rating__mid';
  }
  return 'rating__low';
}

function renderFilmInfo(film) {
  appTitle.textContent = film.title;
  console.log(film);
}
