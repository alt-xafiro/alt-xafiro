let countdownTimer;

const timerControlsNode = document.querySelector('.timer__controls');
const timerDisplayNode = document.querySelector('.display__time-left');
const wrappingTimeNode = document.querySelector('.display__end-time');
const customTimeFormNode = document.customForm;

const renderTimer = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  const result = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  document.title = result;
  timerDisplayNode.textContent = result;
};

const renderWrappingTime = (time) => {
  const date = new Date(time);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  wrappingTimeNode.textContent = `Wrapping up at ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
};

const setTimer = (seconds) => {
  clearInterval(countdownTimer);

  const nowDate = Date.now();
  const wrappingDate = nowDate + seconds * 1000;

  renderTimer(seconds);
  renderWrappingTime(wrappingDate);

  countdownTimer = setInterval(() => {
    const secondsLeft = Math.round((wrappingDate - Date.now()) / 1000);

    if (secondsLeft < 0) {
      clearInterval(countdownTimer);
      return;
    }

    renderTimer(secondsLeft);
  }, 1000);
};

const handleButtonClick = (evt) => {
  if (
    evt.target.tagName !== 'BUTTON' ||
    !evt.target.classList.contains('timer__button')
  ) {
    return;
  }

  const seconds = parseInt(evt.target.dataset.time);

  setTimer(seconds);
};

const handleCustomTimeSubmit = (evt) => {
  evt.preventDefault();

  const minutes = customTimeFormNode.minutes.value;

  setTimer(minutes * 60);

  customTimeFormNode.reset();
};

timerControlsNode.addEventListener('click', handleButtonClick, true);

customTimeFormNode.addEventListener('submit', handleCustomTimeSubmit);
