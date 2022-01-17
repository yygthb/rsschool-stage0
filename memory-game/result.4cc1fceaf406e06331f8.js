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

/***/ "./src/scripts/results.js":
/*!********************************!*\
  !*** ./src/scripts/results.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/scripts/utils.js\");\n\r\n\r\nconst body = document.querySelector('body');\r\nconst level = document.querySelector('.level-container');\r\nconst levelTitle = level.querySelector('.level-title');\r\nconst resultButton = document.querySelector('.game-button__show-results');\r\nconst modal = document.querySelector('.overlay');\r\nconst resultList = document.querySelector('.results-list');\r\n\r\nlet storage = [];\r\n\r\nresultButton.addEventListener('click', () => {\r\n  storage = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getStorage)(levelTitle.dataset.level);\r\n  openModal();\r\n});\r\n\r\nfunction openModal() {\r\n  body.classList.add('lock');\r\n  modal.classList.add('open');\r\n  document.addEventListener('click', closeModal);\r\n  resultList.textContent = '';\r\n\r\n  for (let i = 1; i <= storage.length; i++) {\r\n    const item = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createEl)('li', 'results-item');\r\n    const [m, s] = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.convertTimer)(storage[i - 1][1]);\r\n    item.insertAdjacentHTML(\r\n      'afterbegin',\r\n      `<span>${i}: </span>${storage[i - 1][0]} clicks (in ${m}m ${s}s)`\r\n    );\r\n    resultList.append(item);\r\n  }\r\n}\r\n\r\nfunction closeModal(e) {\r\n  e.stopPropagation();\r\n\r\n  if (\r\n    e.target.classList.contains('overlay') ||\r\n    e.target.closest('.modal-close')\r\n  ) {\r\n    modal.classList.remove('open');\r\n    document.removeEventListener('click', closeModal);\r\n    body.classList.remove('lock');\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://memory-game/./src/scripts/results.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/results.js");
/******/ 	
/******/ })()
;