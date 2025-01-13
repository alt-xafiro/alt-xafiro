// ## Array Cardio Day 2

const people = [
  { name: 'Wes', year: 1988 },
  { name: 'Kait', year: 1986 },
  { name: 'Irv', year: 1970 },
  { name: 'Lux', year: 2015 }
];

const comments = [
  { text: 'Love this!', id: 523423 },
  { text: 'Super good', id: 823423 },
  { text: 'You are the best', id: 2039842 },
  { text: 'Ramen is my fav food ever', id: 123523 },
  { text: 'Nice Nice Nice!', id: 542328 }
];

console.groupCollapsed('Initial data');
console.log('People:', people);
console.log('Comments:', comments);
console.groupEnd();

// Some and Every Checks
// Array.prototype.some() // is at least one person 19 or older?
// Array.prototype.every() // is everyone 19 or older?

console.groupCollapsed('Some and Every Checks');

const isAdult = (person) => new Date().getFullYear() - person.year >= 19;

console.log('Is at least one person 19 or older?', people.some(isAdult));
console.log('Is everyone 19 or older?', people.every(isAdult));

console.groupEnd();

// Array.prototype.find()
// Find is like filter, but instead returns just the one you are looking for
// find the comment with the ID of 823423

console.groupCollapsed('Find the comment');
console.log(
  'The comment with the ID of 823423:',
  `"${comments.find(({ id }) => id === 823423).text}"`
);
console.groupEnd();

// Array.prototype.findIndex()
// Find the comment with this ID
// delete the comment with the ID of 823423

console.groupCollapsed('Delete the comment');

const updatedComments = [...comments];
updatedComments.splice(
  comments.findIndex(({ id }) => id === 823423),
  1
);

console.log('Comments:', updatedComments);

console.groupEnd();
