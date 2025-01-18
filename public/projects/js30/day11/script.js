const playerNode = document.querySelector('.player');
const videoNode = playerNode.querySelector('.viewer');
const playNode = playerNode.querySelector('.toggle');
const progressNode = playerNode.querySelector('.progress');
const progressBarNode = playerNode.querySelector('.progress__filled');
const skipButtonNodes = playerNode.querySelectorAll('[data-skip]');
const sliderNodes = playerNode.querySelectorAll('.player__slider');

const togglePlay = () => videoNode[videoNode.paused ? 'play' : 'pause']();

const toggleButton = () => {
  playNode.textContent = videoNode.paused ? '►' : '❚❚';
  playNode.blur();
};

const rewind = (time) => {
  videoNode.currentTime += parseFloat(time);
};

const handleSpacebarKeydown = (evt) => {
  if (evt.code === 'Space') {
    togglePlay();
  }
};

const handleArrowKeydown = (arrowKeyCode, time) => {
  return (evt) => {
    if (evt.code === arrowKeyCode) {
      evt.preventDefault();
      rewind(time);
    }
  };
};

const handleTimeUpdate = () => {
  const percent = (videoNode.currentTime / videoNode.duration) * 100;
  progressBarNode.style.flexBasis = `${percent}%`;
};

const handleRangeChange = (evt) => {
  videoNode[evt.target.name] = evt.target.value;
};

const scrub = (evt) => {
  const scrubTime =
    (evt.offsetX / progressNode.offsetWidth) * videoNode.duration;
  videoNode.currentTime = scrubTime;
};

window.addEventListener('keydown', handleSpacebarKeydown);
window.addEventListener(
  'keydown',
  handleArrowKeydown('ArrowLeft', skipButtonNodes[0].dataset.skip)
);
window.addEventListener(
  'keydown',
  handleArrowKeydown('ArrowRight', skipButtonNodes[1].dataset.skip)
);

videoNode.addEventListener('click', () => togglePlay());
videoNode.addEventListener('play', () => toggleButton());
videoNode.addEventListener('pause', () => toggleButton());
videoNode.addEventListener('timeupdate', handleTimeUpdate);

playNode.addEventListener('click', () => togglePlay());

skipButtonNodes.forEach((buttonNode) =>
  buttonNode.addEventListener('click', () => {
    rewind(buttonNode.dataset.skip);
    buttonNode.blur();
  })
);

sliderNodes.forEach((sliderNode) => {
  sliderNode.addEventListener('input', handleRangeChange.bind());
});

let mousedown = false;
progressNode.addEventListener('click', (evt) => scrub(evt));
progressNode.addEventListener('mousemove', (evt) => mousedown && scrub(evt));
progressNode.addEventListener('mousedown', () => (mousedown = true));
progressNode.addEventListener('mouseup', () => (mousedown = false));
