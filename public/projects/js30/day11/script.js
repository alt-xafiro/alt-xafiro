//
//  There's a lot to improve, but I don't want to spend too much time
//  on a one-time player, especially since the provided markup and styles are,
//  let's just say, not perfect.
//
//  I've dug into the Video API, got the point, and that's enough for me.
//

const playerNode = document.querySelector('.player');
const videoNode = playerNode.querySelector('.viewer');
const playNode = playerNode.querySelector('.toggle');
const progressNode = playerNode.querySelector('.progress');
const progressBarNode = playerNode.querySelector('.progress__filled');
const bufferBarNode = playerNode.querySelector('.progress__buffered');
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

const handleBuffering = () => {
  const bufferEnd = videoNode.buffered.end(videoNode.buffered.length - 1);

  if (videoNode.duration > 0) {
    bufferBarNode.style.width = `${(bufferEnd / videoNode.duration) * 100}%`;
  }
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
videoNode.addEventListener('progress', handleBuffering);

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
