const holeNodes = document.querySelectorAll('.hole');
const scoreBoardNode = document.querySelector('.score');
const moleNodes = document.querySelectorAll('.mole');
const startButtonNode = document.querySelector('.start');

let lastHoleNode;
let timeUp = false;
let score = 0;

const getRandomInteger = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const getRandomHoleNode = (nodes) => {
  const holeNode = nodes[Math.floor(Math.random() * nodes.length)];

  if (holeNode === lastHoleNode) {
    return getRandomHoleNode(nodes);
  }

  lastHoleNode = holeNode;

  return holeNode;
};

const peep = () => {
  const time = getRandomInteger(200, 1000);
  const holeNode = getRandomHoleNode(holeNodes);

  holeNode.classList.add('up');

  setTimeout(() => {
    holeNode.classList.remove('up');

    if (!timeUp) peep();
  }, time);
};

const setScore = (value) => {
  score = value;
  scoreBoardNode.textContent = score;
};

const resetGame = () => {
  setScore(0);
  timeUp = false;
};

const startGame = () => {
  startButtonNode.disabled = true;
  resetGame();

  peep();

  setTimeout(() => {
    startButtonNode.disabled = false;
    timeUp = true;
  }, 10000);
};

const handleMoleClick = (evt) => {
  evt.target.parentNode.classList.remove('up');
  setScore(score + 1);
};

moleNodes.forEach((mole) => mole.addEventListener('click', handleMoleClick));
startButtonNode.addEventListener('click', () => startGame());
