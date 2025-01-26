const wordsNode = document.querySelector('.words');
let pNode;

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const speech = new SpeechRecognition();

speech.interimResults = true;
speech.lang = 'en-US';

const renderNewParagraph = () => {
  pNode = document.createElement('p');
  wordsNode.appendChild(pNode);
};

const renderSpeechResults = (results) => {
  pNode.textContent = [...results]
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join('');
};

renderNewParagraph();

speech.addEventListener('result', (evt) => {
  renderSpeechResults(evt.results);

  if (evt.results[0].isFinal) {
    renderNewParagraph();
  }
});

speech.addEventListener('end', speech.start);

speech.start();
