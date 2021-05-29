'use strict';

const fs = require('fs');

// Creating our empty json file.
fs.writeFileSync('myJSON.json', '', 'utf-8');

// We want to create this object and write to our myJSON.json
let myObject = {
  aString: 'This is a string',
  aNUmber: 100,
  anObject: {
    anotherNumber: 1,
    anotherString: 'hi',
  },
  aBoolean: true,
};

// Here we stringify myObject and then store it in a variable
let convertedObject = JSON.stringify(myObject);
console.log(convertedObject);

// Writing JSON file by passing our variable into writeFileSync()
fs.writeFileSync('myJSON.json', convertedObject, 'utf-8');

// Reading JSON file
let fileContents = fs.readFileSync('myJSON.json', 'utf-8');

// This lets us read JSON files
let readObject = JSON.parse(fileContents);

console.log(typeof readObject);

console.log(readObject);
