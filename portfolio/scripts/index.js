// scroll to section title
const header = document.querySelector('.header');
const navLinks = header.querySelectorAll('a[href*="#"]');

navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const sectionId = link.getAttribute('href').substr(1);

    const yOffset = -header.offsetHeight;
    const element = document.querySelector(`#${sectionId}`);
    const y =
      element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({
      top: y,
      behavior: 'smooth',
    });
  });
});

// form
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
