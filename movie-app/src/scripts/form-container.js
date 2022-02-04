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
