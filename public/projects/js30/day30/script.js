const speech = new SpeechSynthesisUtterance();

const voicesDropdownNode = document.querySelector('[name="voice"]');
const rateRangeNode = document.querySelector('[name="rate"]');
const pitchRangeNode = document.querySelector('[name="pitch"]');
const speakButtonNode = document.querySelector('#speak');
const stopButtonNode = document.querySelector('#stop');
const textNode = document.querySelector('[name="text"]');

let voices = [];

const setVoice = () => {
  speech.voice = voices.find(
    (voice) => voice.name === voicesDropdownNode.value
  );
};

const setSpeechOption = (option, value) => {
  speech[option] = value;
};

const setInitialSpeechOptions = () => {
  [rateRangeNode, pitchRangeNode, textNode].forEach(({ name, value }) => {
    setSpeechOption(name, value);
  });
};

const renderVoiceOptions = () => {
  voicesDropdownNode.innerHTML = voices
    .filter(({ lang }) => lang.includes('en') || lang.includes('ru'))
    .map(
      ({ lang, name }) =>
        `<option value="${name}" ${
          name.toLowerCase().includes('female') ? 'selected' : ''
        }>${name} (${lang})</option>`
    )
    .join('');
};

const initiateVoices = (evt) => {
  voices = evt.target.getVoices();

  renderVoiceOptions();
  setVoice();
};

const startSpeaking = () => {
  speechSynthesis.speak(speech);
};

const stopSpeaking = () => {
  speechSynthesis.cancel();
};

const handleSpeechSynthesis = (evt) => {
  initiateVoices(evt);
};

const handleVoicesDropdownChange = () => {
  stopSpeaking();
  setVoice();
  startSpeaking();
};

const handlePitchRangeChange = (evt) => {
  stopSpeaking();
  setSpeechOption(evt.target.name, evt.target.value);
  startSpeaking();
};

const handleRateRangeChange = (evt) => {
  stopSpeaking();
  setSpeechOption(evt.target.name, evt.target.value);
  startSpeaking();
};

const handleTextChange = () => {
  stopSpeaking();
  setSpeechOption(textNode.name, textNode.value);
  startSpeaking();
};

const handleSpeakButtonClick = () => {
  stopSpeaking();
  startSpeaking();
};

const handleStopButtonClick = () => {
  stopSpeaking();
};

setInitialSpeechOptions();

speechSynthesis.addEventListener('voiceschanged', handleSpeechSynthesis);

voicesDropdownNode.addEventListener('change', handleVoicesDropdownChange);

pitchRangeNode.addEventListener('change', handlePitchRangeChange);
rateRangeNode.addEventListener('change', handleRateRangeChange);
textNode.addEventListener('change', handleTextChange);

speakButtonNode.addEventListener('click', handleSpeakButtonClick);
stopButtonNode.addEventListener('click', handleStopButtonClick);
