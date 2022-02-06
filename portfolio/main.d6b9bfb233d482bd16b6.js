/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/sass/main.scss":
/*!****************************!*\
  !*** ./src/sass/main.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scripts/button.js":
/*!*******************************!*\
  !*** ./src/scripts/button.js ***!
  \*******************************/
/***/ (() => {

const radius = 200;
const particles = 50;

document.querySelectorAll('.button').forEach((particlesBtn) => {
  particlesBtn.addEventListener('click', function (e) {
    const t = e.target;
    removeParticles(t);

    for (let i = 0; i < particles; i++) {
      const c = document.createElement('span');
      c.classList.add('particle');
      c.style.top = e.layerY + 'px';
      c.style.left = e.layerX + 'px';
      t.append(c);
    }

    setTimeout(() => {
      const parts = t.querySelectorAll('.particle');
      parts.forEach((p) => {
        p.style.transform = `translate(${getRndInteger(
          -radius,
          radius
        )}px, ${getRndInteger(-radius, radius)}px)`;
      });
    }, 0);

    setTimeout(() => {
      removeParticles(particlesBtn);
    }, 480);
  });
});

function removeParticles(btn) {
  const parts = btn.querySelectorAll('.particle');
  if (parts && parts.length) {
    parts.forEach((p) => {
      btn.removeChild(p);
    });
  }
}

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};


/***/ }),

/***/ "./src/scripts/form.js":
/*!*****************************!*\
  !*** ./src/scripts/form.js ***!
  \*****************************/
/***/ (() => {

const form = document.querySelector('.contacts-form');
const actionButton = form.querySelector('.button');
const inputs = document.querySelectorAll('.form-input');

inputs.forEach((input) => {
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  });
});

actionButton.addEventListener('click', (e) => {
  e.preventDefault();
});


/***/ }),

/***/ "./src/scripts/i18n.js":
/*!*****************************!*\
  !*** ./src/scripts/i18n.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// prettier-ignore

const i18Obj = {
  'en': {
    'skills': 'Skills',
    'portfolio': 'Portfolio',
    'video': 'Video',
    'price': 'Price',
    'contacts': 'Contacts',
    'hero-title': 'Alexa Rise',
    'hero-info': 'Save sincere emotions, romantic feelings and happy moments of life together with professional photographer Alexa Rise',
    'hire': 'Hire me',
    'skill-title-1': 'Digital photography',
    'skill-text-1': 'High-quality photos in the studio and on the nature',
    'skill-title-2': 'Video shooting',
    'skill-text-2': 'Capture your moments so that they always stay with you',
    'skill-title-3': 'Rotouch',
    'skill-text-3': 'I strive to make photography surpass reality',
    'skill-title-4': 'Audio',
    'skill-text-4': 'Professional sounds recording for video, advertising, portfolio',
    'winter': 'Winter',
    'spring': 'Spring',
    'summer': 'Summer',
    'autumn': 'Autumn',
    'price-descripton-1-span-1': 'One location',
    'price-descripton-1-span-2': '120 photos in color',
    'price-descripton-1-span-3': '12 photos in retouch',
    'price-descripton-1-span-4': 'Readiness 2-3 weeks',
    'price-descripton-1-span-5': 'Make up, visage',
    'price-descripton-2-span-1': 'One or two locations',
    'price-descripton-2-span-2': '200 photos in color',
    'price-descripton-2-span-3': '20 photos in retouch',
    'price-descripton-2-span-4': 'Readiness 1-2 weeks',
    'price-descripton-2-span-5': 'Make up, visage',
    'price-descripton-3-span-1': 'Three locations or more',
    'price-descripton-3-span-2': '300 photos in color',
    'price-descripton-3-span-3': '50 photos in retouch',
    'price-descripton-3-span-4': 'Readiness 1 weeks',
    'price-descripton-3-span-5': 'Make up, visage, hairstyle',
    'order': 'Order shooting',
    'contact-me': 'Contact me',
    'send-message': 'Send message'
  },
  'ru' : {
    'skills': 'Навыки',
    'portfolio': 'Портфолио',
    'video': 'Видео',
    'price': 'Цены',
    'contacts': 'Контакты',
    'hero-title': 'Алекса Райс',
    'hero-info': 'Сохраните искренние эмоции, романтические переживания и счастливые моменты жизни вместе с профессиональным фотографом',
    'hire': 'Пригласить',
    'skill-title-1': 'Фотография',
    'skill-text-1': 'Высококачественные фото в студии и на природе',
    'skill-title-2': 'Видеосъемка',
    'skill-text-2': 'Запечатлите лучшие моменты, чтобы они всегда оставались с вами',
    'skill-title-3': 'Ретушь',
    'skill-text-3': 'Я стремлюсь к тому, чтобы фотография превосходила реальность',
    'skill-title-4': 'Звук',
    'skill-text-4': 'Профессиональная запись звука для видео, рекламы, портфолио',
    'winter': 'Зима',
    'spring': 'Весна',
    'summer': 'Лето',
    'autumn': 'Осень',
    'price-descripton-1-span-1': 'Одна локация',
    'price-descripton-1-span-2': '120 цветных фото',
    'price-descripton-1-span-3': '12 отретушированных фото',
    'price-descripton-1-span-4': 'Готовность через 2-3 недели',
    'price-descripton-1-span-5': 'Макияж, визаж',
    'price-descripton-2-span-1': 'Одна-две локации',
    'price-descripton-2-span-2': '200 цветных фото',
    'price-descripton-2-span-3': '20 отретушированных фото',
    'price-descripton-2-span-4': 'Готовность через 1-2 недели',
    'price-descripton-2-span-5': 'Макияж, визаж',
    'price-descripton-3-span-1': 'Три локации и больше',
    'price-descripton-3-span-2': '300 цветных фото',
    'price-descripton-3-span-3': '50 отретушированных фото',
    'price-descripton-3-span-4': 'Готовность через 1 неделю',
    'price-descripton-3-span-5': 'Макияж, визаж, прическа',
    'order': 'Заказать съемку',
    'contact-me': 'Свяжитесь со мной',
    'send-message': 'Отправить'
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (i18Obj);


/***/ }),

/***/ "./src/scripts/mobile-menu.js":
/*!************************************!*\
  !*** ./src/scripts/mobile-menu.js ***!
  \************************************/
/***/ (() => {

// burger
const body = document.querySelector('body');
const burger = document.querySelector('.burger');
const menu = document.querySelector('.nav');
const overlay = document.querySelector('.overlay');
const closeMenuEl = document.querySelectorAll('[data-close]');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  overlay.classList.toggle('open');
  menu.classList.toggle('open');
  body.classList.toggle('lock');
});
closeMenuEl.forEach((item) => {
  item.addEventListener('click', closeMenu);
});

function closeMenu(e) {
  if (
    e.target.dataset.close === 'menu' ||
    e.target.classList.contains('nav-link')
  ) {
    burger.classList.remove('open');
    overlay.classList.remove('open');
    menu.classList.remove('open');
    body.classList.remove('lock');
  }
}

// hide mobile menu animation when page has been loaded
window.addEventListener('load', () => {
  setTimeout(() => {
    menu.style.display = 'block';
  }, 300);
});


/***/ }),

/***/ "./src/scripts/portfolio.js":
/*!**********************************!*\
  !*** ./src/scripts/portfolio.js ***!
  \**********************************/
/***/ (() => {

// change portfolio gallery images on button click
const portfolio = document.querySelector('.portfolio');
const portfolioButtons = portfolio.querySelectorAll('.button');
const portfolioImages = portfolio.querySelectorAll('.portfolio-img');

portfolioButtons.forEach((button) => {
  button.addEventListener('click', setPortfolioGallery);
});

function setPortfolioGallery(e) {
  const clickedButton = e.target;
  setActiveButton(clickedButton);

  const season = clickedButton.dataset.season;
  portfolioImages.forEach((img) => {
    const arr = img.src.split('/');
    const imgName = arr[arr.length - 1];
    img.src = `./assets/img/portfolio/${season}/${imgName}`;
  });
}

function setActiveButton(target) {
  portfolioButtons.forEach((button) => {
    if (!button.classList.contains('button-inactive')) {
      button.classList.add('button-inactive');
    }
  });
  target.classList.remove('button-inactive');
}


/***/ }),

/***/ "./src/scripts/theme.js":
/*!******************************!*\
  !*** ./src/scripts/theme.js ***!
  \******************************/
/***/ (() => {

const body = document.querySelector('body');
const themeControl = document.querySelector('.theme-control');

let theme = localStorage.getItem('theme') || '';

if (theme === 'light') {
  body.classList.add('light-theme');
}

themeControl.addEventListener('click', (e) => {
  if (theme === 'light') {
    theme = 'dark';
    localStorage.setItem('theme', 'dark');
  } else {
    theme = 'light';
    localStorage.setItem('theme', 'light');
  }

  body.classList.toggle('light-theme');
});


/***/ }),

/***/ "./src/scripts/translate.js":
/*!**********************************!*\
  !*** ./src/scripts/translate.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./i18n */ "./src/scripts/i18n.js");


const textElements = document.querySelectorAll('[data-i18n]');
const lang = document.querySelector('.lang');

let activeLang = localStorage.getItem('portfolioLang') || 'ru';
changeLang(activeLang);

lang.addEventListener('click', (e) => {
  if (e.target.classList.contains('lang-input')) {
    const newLang = e.target.id;

    if (activeLang !== newLang) {
      changeLang(newLang);
    }
  }
});

function changeLang(lang) {
  localStorage.setItem('portfolioLang', lang);
  document.querySelector(`.lang-input#${lang}`).checked = true;

  activeLang = lang;

  textElements.forEach((el) => {
    el.textContent = _i18n__WEBPACK_IMPORTED_MODULE_0__["default"][lang][el.dataset.i18n];
  });
}


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
/* harmony import */ var _sass_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sass/main.scss */ "./src/sass/main.scss");
/* harmony import */ var _scripts_mobile_menu_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/mobile-menu.js */ "./src/scripts/mobile-menu.js");
/* harmony import */ var _scripts_mobile_menu_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scripts_mobile_menu_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _scripts_theme_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/theme.js */ "./src/scripts/theme.js");
/* harmony import */ var _scripts_theme_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_scripts_theme_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _scripts_translate_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scripts/translate.js */ "./src/scripts/translate.js");
/* harmony import */ var _scripts_form_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scripts/form.js */ "./src/scripts/form.js");
/* harmony import */ var _scripts_form_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_scripts_form_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _scripts_portfolio_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scripts/portfolio.js */ "./src/scripts/portfolio.js");
/* harmony import */ var _scripts_portfolio_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_scripts_portfolio_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _scripts_button_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./scripts/button.js */ "./src/scripts/button.js");
/* harmony import */ var _scripts_button_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_scripts_button_js__WEBPACK_IMPORTED_MODULE_6__);









})();

/******/ })()
;
//# sourceMappingURL=main.d6b9bfb233d482bd16b6.js.map