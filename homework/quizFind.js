'use strict';

// Array Find Function

let quizFind = (x, y) => {
  // Takes in x as an array, y as value to search for
  if (Array.isArray(x) && x.includes(y)) {
    console.log(
      `The value ${y} is located at position ${x.indexOf(y)} of the array.` // logs position of the value and the value itself
    );
  } else if (!Array.isArray(x)) {
    // This conducts a check to ensure input is an array
    console.error(
      "Sorry Fox, can't let you do that. This is an invalid input! Please enter an array to search."
    );
  } else {
    // Output when y is not found in x
    console.warn('-1, captain. We did not the droids you are looking for.');
  }
};

// TESTS
// quizFind(['hello', 'world', 'this', 'is', 'a', 'function'], 'world'); // Test with strings
// quizFind([13, 45, 63, 4, 2], 4); // Test with numbers
// quizFind([true, false], true); // Test with booleans

// Quiz Lotto V.2

/* 
I used a Set to check whether length of array was same as Set size.
This allows us to only check against one value (the array length) instead of checking every value with a for-loop (better time complexity for larger arrays that may become unwieldy.) +1000 brain power. That's the theory, anyway.
*/

function quizLotto() {
  let arrLength = 5;
  let arr = [];
  let powerball = Math.trunc(Math.random() * 35) + 1;

  for (let i = 0; i < arrLength; i++) {
    // This creates our array of 5 random numbers
    arr.push(Math.trunc(Math.random() * (58 - 0 + 1)) + 1);
  }
  let result = false; // Establishes our boolean as false
  // Creates a Set with array elements, removing any duplicates
  const s = new Set(arr);
  // Compares the size of array and Set. If duplicates have been removed, arr.length won't match Set size and if block will run
  if (arr.length !== s.size) {
    result = true;
  }
  if (result) {
    quizLotto(); // If arr.length !== Set size, this runs lottoGen() again.
  } else {
    console.log(`Your lotto numbers are: ${arr}...`);
    arr.push(powerball); // This creates the powerball number and pushes to the end of the array
    console.log(`...And your powerball number is ${powerball}`);
    console.log(arr);
  }
}

// Running quizLotto function
quizLotto();
