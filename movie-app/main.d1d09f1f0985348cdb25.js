/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scripts/api.js":
/*!****************************!*\
  !*** ./src/scripts/api.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  url: 'https://api.themoviedb.org/3',
  key: 'd8b86d06da871cd459c43cc4589bd3a5',
  route: {
    title: '/search/movie',
    popular: '/movie/popular',
    movie: '/movie/',
    genres: '/genre/movie/list',
    poster: {
      original: 'https://image.tmdb.org/t/p/original',
      w500: 'http://image.tmdb.org/t/p/w500/',
      w300: 'http://image.tmdb.org/t/p/w300/',
    },
  },
});


/***/ }),

/***/ "./src/scripts/app.js":
/*!****************************!*\
  !*** ./src/scripts/app.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _transport_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transport.js */ "./src/scripts/transport.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/scripts/utils.js");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api */ "./src/scripts/api.js");




const noPosterSrc = './assets/img/no-poster.jpg';

const form = document.querySelector('.form');
const input = form.querySelector('.input');
const resetBtn = document.querySelector('.button-reset');
const submitBtn = document.querySelector('.button-submit');
const app = document.querySelector('.app');
const appContent = app.querySelector('.app-content');

const genres = {};

showLoader();

// app
window.addEventListener('load', async (e) => {
  e.preventDefault();

  // save genres
  const g = await (0,_transport_js__WEBPACK_IMPORTED_MODULE_0__.getMovieGenres)();
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
      runSearchPage(decodeURIComponent(query.search));
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
  const res = await (0,_transport_js__WEBPACK_IMPORTED_MODULE_0__.getPopularMovies)();
  if (res.ok === true) {
    const data = await res.json();
    renderFilmsList(data);
    hideLoader();
  } else {
    app.append(renderError());
    hideLoader();
  }
}
async function runSearchPage(title) {
  const res = await (0,_transport_js__WEBPACK_IMPORTED_MODULE_0__.getMoviesByTitle)(title);
  if (res.ok === true) {
    const data = await res.json();
    window.history.replaceState(
      {},
      '',
      window.location.pathname + `?search=${title}`
    );
    renderFilmsList(data, title);
    hideLoader();
  } else {
    app.append(renderError());
    hideLoader();
  }
}
async function runFilmPage(id) {
  const res = await (0,_transport_js__WEBPACK_IMPORTED_MODULE_0__.getMovieById)(id);
  if (res.ok === true) {
    const data = await res.json();
    const filmCard = createFilmInfo(data);
    appContent.append(filmCard);
    hideLoader();
  } else {
    appContent.append(renderError());
    hideLoader();
  }
}

// app components
function renderFilmsList(data, title) {
  resetContent();
  const appTitle = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNode)('h2', 'app__title');
  if (title) {
    appTitle.textContent = `Results for "${title.replace(/%20/g, ' ')}":`;
  } else {
    appTitle.textContent = 'Our recomendations:';
  }
  appContent.append(appTitle);

  const results = data.results;
  if (results && Array.isArray(results)) {
    const films = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNode)('div', 'film__items');
    results.forEach((film) => {
      const filmCard = createFilmCard(film);
      films.append(filmCard);
    });
    appContent.append(films);
  }
}
function createFilmCard(film) {
  const card = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNode)('a', 'film__item');
  card.href = window.location.pathname + `?id=${film.id}`;
  // card.target = '_blank';

  // poster
  const cover = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNode)('div', 'poster-overflow');
  const fig = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNode)('figure', 'poster-wrapper');
  const img = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNode)('img');
  img.alt = `${film.title} - film poster`;
  img.src = film.poster_path
    ? `${_api__WEBPACK_IMPORTED_MODULE_2__["default"].route.poster.w300}${film.poster_path}`
    : noPosterSrc;
  fig.append(img);
  cover.append(fig);
  card.append(cover);

  // title
  const titleText = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNode)('span', 'text');
  const title = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNode)('h3', 'title');
  title.title = film.title;
  titleText.textContent = film.title;
  title.append(titleText);
  card.append(title);

  // info
  const info = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNode)('p', 'info');
  const year = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNode)('span', 'info__year');
  year.textContent = film.release_date.split('-')[0];
  const genre = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNode)('span', 'info__genre');
  genre.textContent = genres[film.genre_ids[0]] || '';
  info.append(year, genre);
  card.append(info);

  // rating
  const rate = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNode)('p', 'rating');
  const v = film.vote_average || 0;
  rate.classList.add((0,_utils__WEBPACK_IMPORTED_MODULE_1__.createRatingClassName)(v));
  rate.textContent = v;
  card.append(rate);

  return card;
}
function createFilmInfo(film) {
  let filmTitle = film.original_title;
  const filmYear = film.release_date && film.release_date.split('-')[0];
  const genres = film.genres.map((item) => item.name);

  const wrapper = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNode)('div', 'film');

  // poster
  const fig = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNode)('figure', 'poster-wrapper');
  const img = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNode)('img');
  img.alt = `${film.title} - film poster`;
  img.src = film.poster_path
    ? `${_api__WEBPACK_IMPORTED_MODULE_2__["default"].route.poster.w500}${film.poster_path}`
    : noPosterSrc;
  fig.append(img);
  wrapper.append(fig);

  // title
  const titleWr = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNode)('div', 'title-wrapper');
  const titleEl = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNode)('h1', 'title');
  if (filmYear) {
    filmTitle = `${filmTitle} (${filmYear})`;
  }
  titleEl.textContent = filmTitle;
  if (film.tagline) {
    const taglineEl = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNode)('p', 'tagline');
    taglineEl.textContent = film.tagline;
    titleWr.append(titleEl, taglineEl);
  } else {
    titleWr.append(titleEl);
  }
  wrapper.append(titleWr);

  // genres
  if (genres && genres.length) {
    const genresEl = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNode)('p', 'genres');
    genresEl.textContent = genres.join(', ');
    wrapper.append(genresEl);
  }

  // overview
  if (film.overview) {
    const overviewEl = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNode)('p', 'overview');
    overviewEl.textContent = film.overview;
    wrapper.append(overviewEl);
  }

  // rating
  const rateEl = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNode)('p', 'rate');
  const voteAverateEl = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNode)('span', 'vote-value');
  voteAverateEl.textContent = film.vote_average;
  const voteCountEl = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNode)('span', 'vote-count');
  voteCountEl.textContent = film.vote_count;
  rateEl.append(voteAverateEl, voteCountEl);
  wrapper.append(rateEl);

  return wrapper;
}
function renderError() {
  const error = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNode)('div', 'error');

  const errorTitle = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNode)('h3');
  errorTitle.textContent = 'OOOPS!';

  const errorText1 = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNode)('p');
  errorText1.textContent = 'The resource requested could not be found.';

  const errorText2 = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNode)('p');
  const text2 = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNode)('span');
  text2.textContent = 'Try later or go to ';
  const link = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNode)('a');
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
function resetContent() {
  appContent.textContent = '';
}


/***/ }),

/***/ "./src/scripts/form-container.js":
/*!***************************************!*\
  !*** ./src/scripts/form-container.js ***!
  \***************************************/
/***/ (() => {

const formWr = document.querySelector('.form-wrapper');
const showFormBtn = formWr.querySelector('.show-form');

showFormBtn.addEventListener('click', (e) => {
  e.preventDefault();
  formWr.classList.add('open');

  const input = formWr.querySelector('input.input');
  if (input) {
    input.focus();
  }
});


/***/ }),

/***/ "./src/scripts/transport.js":
/*!**********************************!*\
  !*** ./src/scripts/transport.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getPopularMovies": () => (/* binding */ getPopularMovies),
/* harmony export */   "getMoviesByTitle": () => (/* binding */ getMoviesByTitle),
/* harmony export */   "getMovieById": () => (/* binding */ getMovieById),
/* harmony export */   "getMovieGenres": () => (/* binding */ getMovieGenres)
/* harmony export */ });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./src/scripts/api.js");


const getQueryString = (obj) => {
  return Object.keys(obj).reduce((str, item) => {
    return (str += `&${item}=${obj[item]}`);
  }, '');
};

const fetchApi = async (params = {}, route = _api__WEBPACK_IMPORTED_MODULE_0__["default"].popular) => {
  const queryParams = { language: 'en', ...params };
  const queryString = getQueryString(queryParams);

  const url = _api__WEBPACK_IMPORTED_MODULE_0__["default"].url + route + `?api_key=${_api__WEBPACK_IMPORTED_MODULE_0__["default"].key}` + queryString;

  try {
    const res = await fetch(url);
    return res;
  } catch (error) {
    console.log('fetchApi ERROR: ', error);
    return {
      ok: false,
      errorMsg: 'something gone wrong',
    };
  }
};

const getPopularMovies = async () => {
  return fetchApi({}, _api__WEBPACK_IMPORTED_MODULE_0__["default"].route.popular);
};

const getMoviesByTitle = async (title) => {
  const params = { query: title };
  return fetchApi(params, _api__WEBPACK_IMPORTED_MODULE_0__["default"].route.title);
};

const getMovieById = async (id) => {
  return fetchApi({}, _api__WEBPACK_IMPORTED_MODULE_0__["default"].route.movie + id);
};

const getMovieGenres = async () => {
  return fetchApi({}, _api__WEBPACK_IMPORTED_MODULE_0__["default"].route.genres);
};


/***/ }),

/***/ "./src/scripts/utils.js":
/*!******************************!*\
  !*** ./src/scripts/utils.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createNode": () => (/* binding */ createNode),
/* harmony export */   "createRatingClassName": () => (/* binding */ createRatingClassName)
/* harmony export */ });
// className template: 'block block__element block__element_mod'
const createNode = (tag, className) => {
  const el = document.createElement(tag);
  if (className) {
    const classNames = className.split(' ');
    classNames.forEach((cn) => el.classList.add(cn));
  }
  return el;
};

const createRatingClassName = (rate) => {
  if (rate >= 7) {
    return 'rating__high';
  } else if (rate >= 5) {
    return 'rating__mid';
  }
  return 'rating__low';
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/main.scss */ "./src/scss/main.scss");
/* harmony import */ var _scripts_app_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/app.js */ "./src/scripts/app.js");
/* harmony import */ var _scripts_form_container_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/form-container.js */ "./src/scripts/form-container.js");
/* harmony import */ var _scripts_form_container_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_scripts_form_container_js__WEBPACK_IMPORTED_MODULE_2__);





})();

/******/ })()
;
//# sourceMappingURL=main.d1d09f1f0985348cdb25.js.map