const vidWrap = document.querySelector('.player');
const video = vidWrap.querySelector('.player__video');

// controls
const mainBtn = vidWrap.querySelector('.play-button');
const playerBtn = vidWrap.querySelector('.player__button');
const progress = vidWrap.querySelector('.player__progress');
const progressBar = vidWrap.querySelector('.progress__filled');

// events
let drag;
let grap;

//
mainBtn.addEventListener('click', startVideo);
playerBtn.addEventListener('click', toggleVideo);
progress.addEventListener('mouseover', function () {
  drag = true;
});
progress.addEventListener('mouseout', function () {
  drag = false;
  grap = false;
});
progress.addEventListener('mousedown', function () {
  grap = drag;
});
progress.addEventListener('mouseup', function () {
  grap = false;
});
progress.addEventListener('click', updateCurrentPos);
progress.addEventListener('mousemove', function (e) {
  if (drag && grap) {
    updateCurrentPos(e);
  }
});

let progression;

function startVideo() {
  vidWrap.classList.add('active');
  video.play();
  updateProgress();
  progression = window.setInterval(updateProgress, 200);
}

function stopVideo() {
  vidWrap.classList.remove('active');
  video.pause();
  clearInterval(progression);
}

function toggleVideo() {
  if (video.paused) {
    startVideo();
  } else {
    stopVideo();
  }
}

function updateProgress() {
  var progress = video.currentTime / video.duration;
  progressBar.style.flexBasis = Math.floor(progress * 1000) / 10 + '%';
}

function updateCurrentPos(e) {
  // offset of the progress bar / video wrapper width
  const { left, width } = progress.getBoundingClientRect();
  var newProgress = (e.clientX - left) / width;
  progressBar.style.flexBasis = Math.floor(newProgress * 1000) / 10 + '%';
  video.currentTime = newProgress * video.duration;
  startVideo();
}
