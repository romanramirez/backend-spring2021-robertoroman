'use strict';

// Array Find Function
let quizFind = (x, y) => {
  if (Array.isArray(x) && x.includes(y)) {
    console.log(x.indexOf(y), y);
  } else if (!Array.isArray(x)) {
    // This conducts a check to ensure input is an array
    console.error('This is an invalid input! Please enter an array to search.');
  } else {
    // Output when y is not found in x
    console.warn('-1, captain. We did not the droids you are looking for.');
  }
};

// Lotto Number Generator
function numberLotto() {
  let randomArrayLength = 5;
  let randomArray = [];
  for (let i = 0; i < randomArrayLength; i++) {
    randomArray.push(Math.floor(Math.random() * 58 + 1));
  }
  randomArray.push(Math.floor(Math.random() * 38 + 1)); // This creates the powerball number
  return randomArray;
}

console.log(numberLotto());
