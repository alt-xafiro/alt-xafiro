//
//   I didn't write any code in this file.
//   This day of the challenge is just theory with no practice.
//
// =============================================================================

const divs = document.querySelectorAll('div');
const button = document.querySelector('button');

function logText() {
  console.log(this.classList.value);
  // e.stopPropagation(); // stop bubbling!
  // console.log(this);
}

divs.forEach((div) =>
  div.addEventListener('click', logText, {
    capture: false,
    once: true
  })
);

button.addEventListener(
  'click',
  () => {
    console.log('Click!!!');
  },
  {
    once: true
  }
);
