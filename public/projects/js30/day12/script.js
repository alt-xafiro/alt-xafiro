const pressedKeys = [];
const password = 'cornify';

window.addEventListener('keydown', (evt) => {
  pressedKeys.push(evt.key);
  pressedKeys.splice(0, pressedKeys.length - password.length);

  if (pressedKeys.join('').includes(password)) {
    cornify_add();
  }
});
