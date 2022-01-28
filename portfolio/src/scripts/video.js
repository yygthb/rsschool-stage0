const videoContainer = document.querySelector('.player');
const video = videoContainer.querySelector('.player__video');
video.volume = 0.5;

// controls
const mainBtn = videoContainer.querySelector('.button-play__main');
const playerBtn = videoContainer.querySelector('.button-play');
const volBtn = videoContainer.querySelector('.button-volume');
const progress = videoContainer.querySelector('.player__progress');
const progressBar = videoContainer.querySelector('.progress__filled');
const volume = videoContainer.querySelector('.player__volume');
const volumeBar = videoContainer.querySelector('.volume__filled');
const volumeThumb = videoContainer.querySelector('.volume__thumb');

// events
let drag;
let grap;

//
video.addEventListener('ended', stopVideo);
mainBtn.addEventListener('click', startVideo);
playerBtn.addEventListener('click', toggleVideo);
volBtn.addEventListener('click', toggleVolume);
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
volume.addEventListener('change', (e) => {
  updateVol(e.target.value);
});

let progression;
let volumeSaved = 50;

function startVideo() {
  videoContainer.classList.add('active');
  video.play();
  updateProgress();
  progression = window.setInterval(updateProgress, 200);
}

function stopVideo() {
  videoContainer.classList.remove('active');
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

function toggleVolume() {
  if (video.volume > 0) {
    volumeSaved = video.volume;
    updateVol(0);
  } else {
    updateVol(volumeSaved);
  }
}

function updateProgress() {
  const progress = video.currentTime / video.duration;
  progressBar.style.flexBasis = Math.floor(progress * 1000) / 10 + '%';
}

function updateCurrentPos(e) {
  const { left, width } = progress.getBoundingClientRect();
  const newProgress = (e.clientX - left) / width;
  progressBar.style.flexBasis = Math.floor(newProgress * 1000) / 10 + '%';
  video.currentTime = newProgress * video.duration;
  startVideo();
}

function updateVol(v) {
  if (v > 0) {
    volBtn.classList.remove('muted');
  } else {
    volBtn.classList.add('muted');
  }
  volumeBar.style.width = `${v * 100}%`;
  volumeThumb.style.left = `calc(${v * 100}% - 7px)`;
  video.volume = v;
}
