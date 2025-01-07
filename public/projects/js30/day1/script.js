'use strict';

const keyCodes = {
  65: 'KeyA',
  83: 'KeyS',
  68: 'KeyD',
  70: 'KeyF',
  71: 'KeyG',
  72: 'KeyH',
  74: 'KeyJ',
  75: 'KeyK',
  76: 'KeyL'
};

class Drum {
  constructor(key) {
    this.keyNode = document.querySelector(`.key[data-key="${key}"]`);
    this.audioNode = document.querySelector(`audio[data-key="${key}"]`);

    this._animationClass = 'playing';
    this._animationDuration = Math.round(
      parseFloat(
        window
          .getComputedStyle(this.keyNode)
          .getPropertyValue('transition-duration')
      ) * 1000
    );
    this._animationTimer = null;
  }

  _sound() {
    this.audioNode.currentTime = 0;
    this.audioNode.play();
  }

  _animate() {
    this.keyNode.classList.add(this._animationClass);

    if (this._animationTimer) {
      clearTimeout(this._animationTimer);
    }

    this._animationTimer = setTimeout(() => {
      this.keyNode.classList.remove(this._animationClass);
    }, this._animationDuration);
  }

  play() {
    this._sound();
    this._animate();
  }

  addClickListener() {
    this.keyNode.addEventListener('click', (evt) => {
      evt.preventDefault();

      this.play();
    });
  }
}
const generateDrums = () => {
  const result = {};

  Object.keys(keyCodes).forEach((drumKey) => {
    result[keyCodes[drumKey]] = new Drum(drumKey);
    result[keyCodes[drumKey]].addClickListener();
  });

  return result;
};

const Drums = generateDrums();

const onKeydown = (evt) => {
  const keyCode = evt.code;

  if (Object.values(keyCodes).includes(keyCode)) {
    evt.preventDefault();

    Drums[keyCode].play();
  }
};

window.addEventListener('keydown', onKeydown);
