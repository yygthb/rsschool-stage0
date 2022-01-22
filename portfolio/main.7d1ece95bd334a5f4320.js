/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/sass/main.scss":
/*!****************************!*\
  !*** ./src/sass/main.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://portfolio/./src/sass/main.scss?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sass_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sass/main.scss */ \"./src/sass/main.scss\");\n/* harmony import */ var _scripts_form_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/form.js */ \"./src/scripts/form.js\");\n/* harmony import */ var _scripts_form_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scripts_form_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _scripts_review_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/review.js */ \"./src/scripts/review.js\");\n/* harmony import */ var _scripts_review_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_scripts_review_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _scripts_mobile_menu_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scripts/mobile-menu.js */ \"./src/scripts/mobile-menu.js\");\n/* harmony import */ var _scripts_mobile_menu_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_scripts_mobile_menu_js__WEBPACK_IMPORTED_MODULE_3__);\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://portfolio/./src/index.js?");

/***/ }),

/***/ "./src/scripts/form.js":
/*!*****************************!*\
  !*** ./src/scripts/form.js ***!
  \*****************************/
/***/ (() => {

eval("const form = document.querySelector('.contacts-form');\r\nconst actionButton = form.querySelector('.button');\r\nconst inputs = document.querySelectorAll('.form-input');\r\n\r\ninputs.forEach((input) => {\r\n  input.addEventListener('keypress', (e) => {\r\n    if (e.key === 'Enter') {\r\n      e.preventDefault();\r\n    }\r\n  });\r\n});\r\n\r\nactionButton.addEventListener('click', (e) => {\r\n  e.preventDefault();\r\n});\r\n\n\n//# sourceURL=webpack://portfolio/./src/scripts/form.js?");

/***/ }),

/***/ "./src/scripts/mobile-menu.js":
/*!************************************!*\
  !*** ./src/scripts/mobile-menu.js ***!
  \************************************/
/***/ (() => {

eval("// burger\r\nconst body = document.querySelector('body');\r\nconst burger = document.querySelector('.burger');\r\nconst menu = document.querySelector('.nav');\r\nconst overlay = document.querySelector('.overlay');\r\nconst closeMenuEl = document.querySelectorAll('[data-close]');\r\n\r\nburger.addEventListener('click', () => {\r\n  burger.classList.toggle('open');\r\n  overlay.classList.toggle('open');\r\n  menu.classList.toggle('open');\r\n  body.classList.toggle('lock');\r\n});\r\ncloseMenuEl.forEach((item) => {\r\n  item.addEventListener('click', closeMenu);\r\n});\r\n\r\nfunction closeMenu(e) {\r\n  if (\r\n    e.target.dataset.close === 'menu' ||\r\n    e.target.classList.contains('nav-link')\r\n  ) {\r\n    burger.classList.remove('open');\r\n    overlay.classList.remove('open');\r\n    menu.classList.remove('open');\r\n    body.classList.remove('lock');\r\n  }\r\n}\r\n\r\n// hide mobile menu animation when page has been loaded\r\nwindow.addEventListener('load', () => {\r\n  setTimeout(() => {\r\n    menu.style.display = 'block';\r\n  }, 300);\r\n});\r\n\n\n//# sourceURL=webpack://portfolio/./src/scripts/mobile-menu.js?");

/***/ }),

/***/ "./src/scripts/review.js":
/*!*******************************!*\
  !*** ./src/scripts/review.js ***!
  \*******************************/
/***/ (() => {

eval("console.group('portfolio#1');\r\nconsole.log(`Оценка своей работы \"portfolio#1 - Фиксированная вёрстка\" (110)\r\n\r\n  ||  1. Вёрстка валидная +10\r\n  ||    - для проверки использовал сервис https://validator.w3.org/\r\n  ||  \r\n  ||  2. Вёрстка семантическая +20\r\n  ||    - <header>, <main>, <footer> +2\r\n  ||    - шесть элементов <section> (по количеству секций) +2\r\n  ||    - один заголовок <h1> +2\r\n  ||    - пять заголовков <h2> +2\r\n  ||    - один элемент <nav> (панель навигации) +2\r\n  ||    - два списка ul > li > a  +2\r\n  ||    - десять кнопок <button> +2\r\n  ||    - два инпута: <input type=\"email\"> и <input type=\"tel\"> +2\r\n  ||    - один элемент <textarea> +2\r\n  ||    - три атрибута placeholder +2\r\n  ||   \r\n  ||  3. Вёрстка соответствует макету +48\r\n  ||    - проверил с PixelPerfect\r\n  ||   \r\n  ||  4. Требования к css + 12\r\n  ||    - для построения сетки используются флексы +2\r\n  ||    - при уменьшении масштаба страницы браузера вёрстка размещается по центру +2\r\n  ||    - фоновый цвет тянется на всю ширину страницы +2\r\n  ||    - иконки добавлены в формате .svg +2\r\n  ||    - изображения добавлены в формате .jpg +2\r\n  ||    - есть favicon +2\r\n  ||   \r\n  ||  5. Интерактивность, реализуемая через css +20\r\n  ||    - плавная прокрутка по якорям +5\r\n  ||    - ссылки в футере ведут на мой гитхаб и на страницу курса +5\r\n  ||    - изменение цвета и(или) фона текста/элементов при навереднии +5\r\n  ||    - плавное изменение внешнего вида элемента при наведении и клике не влияющее на соседние элементы +5\r\n\r\n`);\r\nconsole.groupEnd();\r\n\r\nconsole.group('portfolio#2');\r\nconsole.log(`Оценка своей работы \"portfolio#2 - Адаптивная вёрстка\" (75)\r\n\r\n  ||  1. Вёрстка соответствует макету. Ширина экрана 768px +48\r\n  ||  \r\n  ||  2. При любой ширине экрана не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15\r\n  ||   \r\n  ||  3. На ширине экрана 768рх и меньше реализовано адаптивное меню +22\r\n  ||    - при ширине страницы 768рх панель навигации скрывается, появляется бургер-иконка +2\r\n  ||    - при нажатии на бургер-иконку справа плавно появляется адаптивное меню, бургер-иконка изменяется на крестик +4\r\n  ||    - высота адаптивного меню занимает всю высоту экрана. При ширине экрана 768-620рх вёрстка меню соответствует макету, когда экран становится уже, меню занимает всю ширину экрана +4\r\n  ||    - при нажатии на крестик адаптивное меню плавно скрывается уезжая за правую часть экрана, крестик превращается в бургер-иконку +4\r\n  ||    - бургер-иконка, которая при клике превращается в крестик, создана при помощи css-анимаций без использования изображений +2\r\n  ||    - ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +2\r\n  ||    - при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, крестик превращается в бургер-иконку +4\r\n\r\n`);\r\nconsole.groupEnd();\r\n\n\n//# sourceURL=webpack://portfolio/./src/scripts/review.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;