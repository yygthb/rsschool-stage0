// className template: 'block block__element block__element_mod'
export const createNode = (tag, className) => {
  const el = document.createElement(tag);
  if (className) {
    const classNames = className.split(' ');
    classNames.forEach((cn) => el.classList.add(cn));
  }
  return el;
};

export const createRatingClassName = (rate) => {
  if (rate >= 7) {
    return 'rating__high';
  } else if (rate >= 5) {
    return 'rating__mid';
  }
  return 'rating__low';
};
