/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/sass/main.scss":
/*!****************************!*\
  !*** ./src/sass/main.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://memory-game/./src/sass/main.scss?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sass_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/sass/main.scss */ \"./src/sass/main.scss\");\n/* harmony import */ var _scripts_memory_game_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/scripts/memory-game.js */ \"./src/scripts/memory-game.js\");\n\r\n\r\n\n\n//# sourceURL=webpack://memory-game/./src/index.js?");

/***/ }),

/***/ "./src/scripts/memory-game.js":
/*!************************************!*\
  !*** ./src/scripts/memory-game.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/scripts/utils.js\");\n\r\n\r\nconst board = document.querySelector('.game-board');\r\nconst level = document.querySelector('.level-container');\r\nconst levelTitle = level.querySelector('.level-title');\r\nconst resetButton = document.querySelector('.game-button__reset');\r\n// timer\r\nconst timerSection = document.querySelector('.game-timer');\r\nconst minutes = timerSection.querySelector('.minutes');\r\nconst seconds = timerSection.querySelector('.seconds');\r\n// result\r\nconst gameResult = document.querySelector('.game-result');\r\nconst resultCount = gameResult.querySelector('.click-count');\r\n\r\nlet cards = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getStorage)(levelTitle.dataset.level);\r\nlet isMenuOpen = false;\r\nlet storage = [];\r\n\r\nconst images = {\r\n  easy: {\r\n    0: `url('./assets/img/cards/farm/0.png')`,\r\n    1: `url('./assets/img/cards/farm/1.png')`,\r\n    2: `url('./assets/img/cards/farm/2.png')`,\r\n    3: `url('./assets/img/cards/farm/3.png')`,\r\n    4: `url('./assets/img/cards/farm/4.png')`,\r\n    5: `url('./assets/img/cards/farm/5.png')`,\r\n    6: `url('./assets/img/cards/farm/6.png')`,\r\n    7: `url('./assets/img/cards/farm/7.png')`,\r\n    8: `url('./assets/img/cards/farm/8.png')`,\r\n    9: `url('./assets/img/cards/farm/9.png')`,\r\n    10: `url('./assets/img/cards/farm/10.png')`,\r\n    11: `url('./assets/img/cards/farm/11.png')`,\r\n    12: `url('./assets/img/cards/farm/12.png')`,\r\n    13: `url('./assets/img/cards/farm/13.png')`,\r\n    14: `url('./assets/img/cards/farm/14.png')`,\r\n  },\r\n  hard: {\r\n    0: `url('./assets/img/cards/hiragana/0.png')`,\r\n    1: `url('./assets/img/cards/hiragana/1.png')`,\r\n    2: `url('./assets/img/cards/hiragana/2.png')`,\r\n    3: `url('./assets/img/cards/hiragana/3.png')`,\r\n    4: `url('./assets/img/cards/hiragana/4.png')`,\r\n    5: `url('./assets/img/cards/hiragana/5.png')`,\r\n    6: `url('./assets/img/cards/hiragana/6.png')`,\r\n    7: `url('./assets/img/cards/hiragana/7.png')`,\r\n    8: `url('./assets/img/cards/hiragana/8.png')`,\r\n    9: `url('./assets/img/cards/hiragana/9.png')`,\r\n    10: `url('./assets/img/cards/hiragana/10.png')`,\r\n    11: `url('./assets/img/cards/hiragana/11.png')`,\r\n    12: `url('./assets/img/cards/hiragana/12.png')`,\r\n    13: `url('./assets/img/cards/hiragana/13.png')`,\r\n    14: `url('./assets/img/cards/hiragana/14.png')`,\r\n  },\r\n};\r\nconst imagesLength = 15;\r\nconst maxCards = 30;\r\nlet control = {\r\n  timer: 0,\r\n  isPlaying: false,\r\n  imageInGame: [],\r\n  cardPairs: {},\r\n  click: 0,\r\n  level: '',\r\n};\r\nlet refreshTimer;\r\nlet target1, target2;\r\n\r\nstartGame();\r\nresetButton.addEventListener('click', startGame);\r\n\r\n// game level\r\nlevel.addEventListener('click', (e) => {\r\n  const target = e.target;\r\n  level.classList.toggle('active');\r\n\r\n  if (!isMenuOpen) {\r\n    isMenuOpen = true;\r\n    document.addEventListener('click', listenLevelClick);\r\n  } else {\r\n    isMenuOpen = false;\r\n    document.removeEventListener('click', listenLevelClick);\r\n    levelTitle.textContent = target.textContent;\r\n    levelTitle.dataset.level = target.dataset.level;\r\n    startGame();\r\n  }\r\n});\r\n\r\nfunction startGame() {\r\n  gameResult.classList.remove('finished');\r\n  board.textContent = '';\r\n  control = {\r\n    isPlaying: false,\r\n    imageInGame: [],\r\n    cardPairs: {},\r\n    click: 0,\r\n    level: levelTitle.dataset.level,\r\n  };\r\n  resetTimer();\r\n  resultCount.textContent = control.click;\r\n  board.classList.add('disabled');\r\n\r\n  // insert cards in game board\r\n  for (let i = 0; i < maxCards; i++) {\r\n    const card = createCard(i);\r\n    board.append(card);\r\n  }\r\n\r\n  // update cards in DOM\r\n  cards = document.querySelectorAll('.card');\r\n\r\n  // update cards color\r\n  for (let i = 0; i < Math.ceil(maxCards / 2); i++) {\r\n    const bg = getRandomImage(images[control.level]);\r\n    generateRandomPair(bg);\r\n  }\r\n\r\n  cards.forEach((card, idx) => {\r\n    setTimeout(() => {\r\n      card.classList.add('animated');\r\n    }, idx * 10);\r\n  });\r\n  setTimeout(() => {\r\n    board.classList.remove('disabled');\r\n  }, 1000);\r\n\r\n  // click on card\r\n  board.addEventListener('click', boardGameClick);\r\n}\r\n\r\nfunction boardGameClick(e) {\r\n  if (e.target.classList.contains('card__face_front')) {\r\n    if (!control.isPlaying) {\r\n      startTimer();\r\n    }\r\n\r\n    control.isPlaying = true;\r\n    const target = e.target.closest('.card');\r\n    target.classList.add('flip');\r\n    resultCount.textContent = ++control.click;\r\n\r\n    if (control.click % 2 === 1) {\r\n      target1 = target;\r\n      target2 = null;\r\n    }\r\n    if (control.click % 2 === 0) {\r\n      target2 = target;\r\n      if (!isPair(target1.dataset.count, target2.dataset.count)) {\r\n        board.classList.add('disabled');\r\n        setTimeout(() => {\r\n          cards.forEach((card) => {\r\n            if (!card.classList.contains('flip-fixed')) {\r\n              card.classList.remove('flip');\r\n            }\r\n          });\r\n        }, 800);\r\n        setTimeout(() => {\r\n          target1 = null;\r\n          target2 = null;\r\n          board.classList.remove('disabled');\r\n        }, 1000);\r\n      } else {\r\n        target1.classList.add('flip-fixed');\r\n        target2.classList.add('flip-fixed');\r\n        delete control.cardPairs[target1.dataset.count];\r\n        delete control.cardPairs[target2.dataset.count];\r\n        target1 = null;\r\n        target2 = null;\r\n\r\n        if (Object.values(control.cardPairs).length === 0) {\r\n          finishGame();\r\n        }\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\nfunction finishGame() {\r\n  gameResult.classList.add('finished');\r\n  saveResult(control.click, control.timer, control.level);\r\n  clearInterval(refreshTimer);\r\n}\r\n\r\nfunction createCard(idx) {\r\n  const card = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createEl)('div', 'card');\r\n  const cardFront = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createEl)('div', 'card__face', 'card__face_front');\r\n  const cardBack = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createEl)('div', 'card__face', 'card__face_back');\r\n\r\n  card.append(cardFront);\r\n  card.append(cardBack);\r\n  card.dataset.count = idx;\r\n\r\n  return card;\r\n}\r\n\r\nfunction generateRandomPair(bg) {\r\n  const index1 = generateUniqueKey();\r\n  const index2 = generateUniqueKey();\r\n  control.cardPairs[index1] = index2;\r\n  control.cardPairs[index2] = index1;\r\n\r\n  insertBg(index1, bg);\r\n  insertBg(index2, bg);\r\n}\r\n\r\nfunction generateUniqueKey() {\r\n  let key = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getRandomNumber)(0, maxCards - 1);\r\n  while (Object.keys(control.cardPairs).includes(key.toString())) {\r\n    key = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getRandomNumber)(0, maxCards - 1);\r\n  }\r\n  control.cardPairs[key] = null;\r\n  return key;\r\n}\r\n\r\nfunction insertBg(idx, bg) {\r\n  const back = cards[idx].querySelector('.card__face_back');\r\n  back.style.backgroundImage = bg;\r\n}\r\n\r\nfunction isPair(key1, key2) {\r\n  if (control.cardPairs[key1] == key2) {\r\n    return true;\r\n  }\r\n}\r\n\r\nfunction getRandomImage(images) {\r\n  let key = Math.floor(Math.random() * imagesLength);\r\n  while (control.imageInGame.includes(key)) {\r\n    key = Math.floor(Math.random() * imagesLength);\r\n  }\r\n  control.imageInGame.push(key);\r\n  return images[key];\r\n}\r\n\r\nfunction listenLevelClick(e) {\r\n  if (!e.target.dataset.level) {\r\n    isMenuOpen = false;\r\n    level.classList.remove('active');\r\n    document.removeEventListener('click', listenLevelClick);\r\n  }\r\n}\r\n\r\n// timer\r\nfunction startTimer() {\r\n  refreshTimer = setInterval(() => {\r\n    control.timer++;\r\n\r\n    const [m, s] = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.convertTimer)(control.timer);\r\n    minutes.textContent = m;\r\n    seconds.textContent = s;\r\n  }, 1000);\r\n}\r\n\r\nfunction resetTimer() {\r\n  control.timer = 0;\r\n  clearInterval(refreshTimer);\r\n  minutes.textContent = '00';\r\n  seconds.textContent = '00';\r\n}\r\n\r\n// save to storage\r\nfunction saveResult(c, t, l) {\r\n  storage = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getStorage)(l);\r\n  storage.push([c, t]);\r\n  const sortedStorage = storage.sort((a, b) => {\r\n    if (a[0] > b[0]) {\r\n      return 1;\r\n    } else if (a[0] == b[0] && a[1] > b[1]) {\r\n      return 1;\r\n    }\r\n    return -1;\r\n  });\r\n\r\n  localStorage.setItem(\r\n    `memoryGame_${l}`,\r\n    JSON.stringify(sortedStorage.slice(0, 10))\r\n  );\r\n}\r\n\n\n//# sourceURL=webpack://memory-game/./src/scripts/memory-game.js?");

/***/ }),

/***/ "./src/scripts/utils.js":
/*!******************************!*\
  !*** ./src/scripts/utils.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createEl\": () => (/* binding */ createEl),\n/* harmony export */   \"convertTimer\": () => (/* binding */ convertTimer),\n/* harmony export */   \"getRandomNumber\": () => (/* binding */ getRandomNumber),\n/* harmony export */   \"getStorage\": () => (/* binding */ getStorage)\n/* harmony export */ });\nconst createEl = (tag, ...classNames) => {\r\n  const el = document.createElement(tag);\r\n  classNames.forEach((className) => el.classList.add(className));\r\n  return el;\r\n};\r\n\r\nconst convertTimer = (timer) => {\r\n  const m = Math.floor(timer / 60);\r\n  const s = timer - m * 60;\r\n\r\n  const _m = `${Math.floor(m / 10)}${Math.floor(m % 10)}`;\r\n  const _s = `${Math.floor(s / 10)}${Math.floor(s % 10)}`;\r\n\r\n  return [_m, _s];\r\n};\r\n\r\nconst getRandomNumber = (min, max) => {\r\n  return Math.round(Math.random() * (max - min) + min);\r\n};\r\n\r\nconst getStorage = (level) => {\r\n  return JSON.parse(localStorage.getItem(`memoryGame_${level}`)) || [];\r\n};\r\n\n\n//# sourceURL=webpack://memory-game/./src/scripts/utils.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;