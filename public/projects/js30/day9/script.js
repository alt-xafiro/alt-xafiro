const dogs = [
  { name: 'Snickers', age: 2 },
  { name: 'Hugo', age: 8 }
];

// Regular
console.log('Hello!');

// Interpolated
console.log('Hello! I am a %s string!', '🍆');

// Styled
console.log(
  '%cI am some great text',
  `font-size: 50px;
  color: white;
  background: pink;
  text-shadow: 3px 3px 2px purple`
);

// Warning
console.warn('OH NOOO');

// Error
console.error('Shit!');

// Info
console.info('Crocodiles eat 3-4 people per year');

// Testing
const p = document.querySelector('p');

console.assert(p.classList.contains('ouch'), 'That is wrong!');

// Clearing
// console.clear();

// Viewing DOM Elements
console.log(p);
console.dir(p);

// Grouping together
dogs.forEach((dog) => {
  console.groupCollapsed(`${dog.name}`);
  console.log(`This is ${dog.name}`);
  console.log(`${dog.name} is ${dog.age} years old`);
  console.log(`${dog.name} is ${dog.age * 7} dog years old`);
  console.groupEnd(`${dog.name}`);
});

// Counting
console.count('Wes');
console.count('Wes');
console.count('Steve');
console.count('Steve');
console.count('Wes');
console.count('Steve');
console.count('Wes');
console.count('Steve');
console.count('Steve');
console.count('Steve');
console.count('Steve');
console.count('Steve');

// Timing
console.time('Fetching data');
fetch('https://catfact.ninja/fact')
  .then((data) => data.json())
  .then((data) => {
    console.timeEnd('Fetching data');
    console.log(data);
  });

// Table
console.table(dogs);
