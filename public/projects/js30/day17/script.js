const bands = [
  'The Plot in You',
  'The Devil Wears Prada',
  'Pierce the Veil',
  'Norma Jean',
  'The Bled',
  'Say Anything',
  'The Midway State',
  'We Came as Romans',
  'Counterparts',
  'Oh, Sleeper',
  'A Skylit Drive',
  'Anywhere But Here',
  'An Old Dog'
];

const clearString = (el) => el.replace(/^(a |an |the )/i, '').trim();

const sortedBands = [...bands].sort((a, b) =>
  clearString(a).localeCompare(clearString(b))
);

document.querySelector('#bands').innerHTML = sortedBands
  .map((band) => `<li>${band}</li>`)
  .join('');
