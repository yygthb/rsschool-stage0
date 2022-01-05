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
