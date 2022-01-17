export const createEl = (tag, ...classNames) => {
  const el = document.createElement(tag);
  classNames.forEach((className) => el.classList.add(className));
  return el;
};

export const convertTimer = (timer) => {
  const m = Math.floor(timer / 60);
  const s = timer - m * 60;

  const _m = `${Math.floor(m / 10)}${Math.floor(m % 10)}`;
  const _s = `${Math.floor(s / 10)}${Math.floor(s % 10)}`;

  return [_m, _s];
};

export const getRandomNumber = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

export const getStorage = (level) => {
  return JSON.parse(localStorage.getItem(`memoryGame_${level}`)) || [];
};
