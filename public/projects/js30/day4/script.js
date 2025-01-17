// Get your shorts on - this is an array workout!
// ## Array Cardio Day 1

// Some data we can work with

const inventors = [
  { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
  { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
  { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
  { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
  { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
  { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
  { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
  { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
  { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
  { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
  { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
  { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
];

const boulevards = [
  'City walls of Paris',
  'Thiers wall',
  'Wall of Charles V',
  'Wall of Philip II Augustus',
  'City gates of Paris',
  "Haussmann's renovation of Paris",
  'Boulevards of the Marshals',
  'Boulevard Auguste-Blanqui',
  'Boulevard Barbès',
  'Boulevard Beaumarchais',
  "Boulevard de l'Amiral-Bruix",
  'Boulevard Mortier',
  'Boulevard Poniatowski',
  'Boulevard Soult',
  'Boulevard des Capucines',
  'Boulevard de la Chapelle',
  'Boulevard de Clichy',
  'Boulevard du Crime',
  "Boulevard du Général-d'Armée-Jean-Simon",
  'Boulevard Haussmann',
  "Boulevard de l'Hôpital",
  'Boulevard des Italiens',
  'Boulevard Lefebvre',
  'Boulevard de la Madeleine',
  'Boulevard de Magenta',
  'Boulevard Malesherbes',
  'Boulevard Marguerite-de-Rochechouart',
  'Boulevard Montmartre',
  'Boulevard du Montparnasse',
  'Boulevard Raspail',
  'Boulevard Richard-Lenoir',
  'Boulevard Saint-Germain',
  'Boulevard Saint-Michel',
  'Boulevard de Sébastopol',
  'Boulevard de Strasbourg',
  'Boulevard du Temple',
  'Boulevard Voltaire',
  'Boulevard Hippolyte-Marquès'
];

const people = [
  'Bernhard, Sandra',
  'Bethea, Erin',
  'Becker, Carl',
  'Bentsen, Lloyd',
  'Beckett, Samuel',
  'Blake, William',
  'Berger, Ric',
  'Beddoes, Mick',
  'Beethoven, Ludwig',
  'Belloc, Hilaire',
  'Begin, Menachem',
  'Bellow, Saul',
  'Benchley, Robert',
  'Blair, Robert',
  'Benenson, Peter',
  'Benjamin, Walter',
  'Berlin, Irving',
  'Benn, Tony',
  'Benson, Leana',
  'Bent, Silas',
  'Berle, Milton',
  'Berry, Halle',
  'Biko, Steve',
  'Beck, Glenn',
  'Bergman, Ingmar',
  'Black, Elk',
  'Berio, Luciano',
  'Berne, Eric',
  'Berra, Yogi',
  'Berry, Wendell',
  'Bevan, Aneurin',
  'Ben-Gurion, David',
  'Bevel, Ken',
  'Biden, Joseph',
  'Bennington, Chester',
  'Bierce, Ambrose',
  'Billings, Josh',
  'Birrell, Augustine',
  'Blair, Tony',
  'Beecher, Henry',
  'Biondo, Frank'
];

const vehicles = [
  'car',
  'car',
  'truck',
  'truck',
  'bike',
  'walk',
  'car',
  'van',
  'bike',
  'walk',
  'car',
  'van',
  'car',
  'truck'
];

console.groupCollapsed('Initial data');
console.log('Inventors:', inventors);
console.log('Boulevards:', boulevards);
console.log('People:', people);
console.log('Vehicles:', vehicles);
console.groupEnd();

// Array.prototype.filter()
// 1. Filter the list of inventors for those who were born in the 1500's

console.groupCollapsed(
  "1. Filter the list of inventors for those who were born in the 1500's"
);
console.table(
  inventors.filter((inventor) => inventor.year >= 1500 && inventor.year < 1600)
);
console.groupEnd();

// Array.prototype.map()
// 2. Give us an array of the inventors first and last names

console.groupCollapsed(
  '2. Give us an array of the inventors first and last names'
);
console.table(
  inventors.map((inventor) => `${inventor.first} ${inventor.last}`)
);
console.groupEnd();

// Array.prototype.sort()
// 3. Sort the inventors by birthdate, oldest to youngest

console.groupCollapsed(
  '3. Sort the inventors by birthdate, oldest to youngest'
);
console.table([...inventors].sort((a, b) => b.year - a.year));
console.groupEnd();

// Array.prototype.reduce()
// 4. How many years did all the inventors live all together?

console.groupCollapsed(
  '4. How many years did all the inventors live all together?'
);
console.log(
  inventors.reduce((acc, investor) => acc + investor.passed - investor.year, 0)
);
console.groupEnd();

// 5. Sort the inventors by years lived

console.groupCollapsed('5. Sort the inventors by years lived');
console.table(
  [...inventors].sort((a, b) => a.passed - a.year - (b.passed - b.year))
);
console.groupEnd();

// 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name

console.groupCollapsed(
  "6. Create a list of Boulevards in Paris that contain 'de' anywhere in the name"
);
console.table(
  boulevards.filter((boulevard) => boulevard.toLowerCase().includes('de'))
);
console.groupEnd();

// 7. sort Exercise
// Sort the people alphabetically by first name
console.groupCollapsed('7. Sort the people alphabetically by first name');
console.table(
  [...people].sort((a, b) => {
    const firstNameA = a.split(', ')[1];
    const firstNameB = b.split(', ')[1];

    return firstNameA.localeCompare(firstNameB);
  })
);
console.groupEnd();

// 8. Reduce Exercise
// Sum up the instances of each of these
console.groupCollapsed('8. Sum up the instances of each of vehicles');
console.table(
  vehicles.reduce((result, vehicle) => {
    if (!result[vehicle]) {
      result[vehicle] = 0;
    }

    result[vehicle]++;

    return result;
  }, {})
);
console.groupEnd();
