const speedBarNode = document.querySelector('.speed-bar');
const videoNode = document.querySelector('.flex');

const MIN_SPEED = 0.4;
const MAX_SPEED = 4;

const handleMouseMove = (evt) => {
  const mouseXPercent = evt.pageX / window.innerWidth;
  const speedBarWidth = `${(mouseXPercent * 100).toFixed(2)}%`;
  const playbackRate = mouseXPercent * (MAX_SPEED - MIN_SPEED) + MIN_SPEED;

  speedBarNode.style.width = speedBarWidth;
  speedBarNode.textContent = playbackRate.toFixed(2) + '×';
  videoNode.playbackRate = playbackRate;
};

document.addEventListener('mousemove', handleMouseMove);
