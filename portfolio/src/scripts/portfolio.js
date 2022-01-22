// change portfolio gallery images on button click
const portfolio = document.querySelector('.portfolio');
const portfolioButtons = portfolio.querySelectorAll('.button');
const portfolioImages = portfolio.querySelectorAll('.portfolio-img');

portfolioButtons.forEach((button) => {
  button.addEventListener('click', setPortfolioGallery);
});

function setPortfolioGallery(e) {
  const clickedButton = e.target;
  setActiveButton(clickedButton);

  const season = clickedButton.dataset.season;
  portfolioImages.forEach((img) => {
    const arr = img.src.split('/');
    const imgName = arr[arr.length - 1];
    img.src = `./assets/img/portfolio/${season}/${imgName}`;
  });
}

function setActiveButton(target) {
  portfolioButtons.forEach((button) => {
    if (!button.classList.contains('button-inactive')) {
      button.classList.add('button-inactive');
    }
  });
  target.classList.remove('button-inactive');
}
