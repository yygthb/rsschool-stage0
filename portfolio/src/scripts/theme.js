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
