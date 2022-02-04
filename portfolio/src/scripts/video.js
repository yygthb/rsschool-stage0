const player = document.querySelector('.player');
const video = player.querySelector('.player__video');

// timer
const currentTime = player.querySelector('.currenttime');
const duration = player.querySelector('.duration');
video.onloadedmetadata = () => {
  updateTimerText(duration, video.duration);
  updateTimerText(currentTime, video.currentTime);
};

// controls video
const videoMainBtn = player.querySelector('.button-play__main');
const playBtn = player.querySelector('.button-play');
const progressBar = player.querySelector('.player__progress');
const progressBarFilled = player.querySelector('.progress__filled');

videoMainBtn.addEventListener('click', togglePlay);
playBtn.addEventListener('click', togglePlay);

video.addEventListener('timeupdate', updateTime);
video.addEventListener('ended', stopVideo);
progressBar.oninput = (e) => {
  updateProgress(e.target.value);
};

function togglePlay() {
  if (video.paused || video.ended) {
    startVideo();
  } else {
    stopVideo();
  }
}

function startVideo() {
  player.classList.add('active');
  video.play();
}

function stopVideo() {
  player.classList.remove('active');
  video.pause();
}

function updateTime() {
  const progress = video.currentTime / video.duration;
  progressBar.value = progress;
  progressBarFilled.style.width = Math.floor(progress * 1000) / 10 + '%';
  updateTimerText(currentTime, video.currentTime);
}

function updateProgress(v) {
  video.currentTime = v * video.duration;
  progressBar.value = v;
  progressBarFilled.style.width = `${v * 100}%`;
  updateTimerText(currentTime, video.currentTime);
}

// controls audio
video.volume = 0.1;
let volumeSaved = 10;

const volumeBtn = player.querySelector('.button-volume');
const volumeBar = player.querySelector('.player__volume');
const volumeBarFilled = player.querySelector('.volume__filled');
const volumeBarThumb = player.querySelector('.volume__thumb');

volumeBtn.addEventListener('click', toggleVolume);
volumeBar.oninput = (e) => {
  updateVol(e.target.value);
};

function toggleVolume() {
  if (video.volume > 0) {
    volumeSaved = video.volume;
    updateVol(0);
  } else {
    updateVol(volumeSaved);
  }
}

function updateVol(v) {
  if (v > 0) {
    volumeBtn.classList.remove('muted');
  } else {
    volumeBtn.classList.add('muted');
  }
  volumeBarFilled.style.width = `${v * 100}%`;
  volumeBarThumb.style.left = `calc(${v * 100}% - 7px)`;
  video.volume = v;
  volumeBar.value = v;
}

function updateTimerText(el, timer) {
  const [mD, sD] = convertTimer(Math.floor(timer));
  el.textContent = `${mD}:${sD}`;
}

function convertTimer(timer) {
  const m = Math.floor(timer / 60);
  const s = timer - m * 60;

  const _m = `${Math.floor(m / 10)}${Math.floor(m % 10)}`;
  const _s = `${Math.floor(s / 10)}${Math.floor(s % 10)}`;

  return [_m, _s];
}
