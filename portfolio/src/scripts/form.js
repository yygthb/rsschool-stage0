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
