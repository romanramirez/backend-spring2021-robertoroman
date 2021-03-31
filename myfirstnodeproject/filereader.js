// 'use strict';

const fs = require('fs');

const arguments = process.argv;

let filename = arguments[2];

if (filename === undefined) {
  console.log(
    'Welcome to my file reader! Please provide the file name you want to read after the command.'
  );

  return;
}

// read the file based on the argument in the command

let fileContents = fs.readFileSync(arguments[2], 'utf-8');

// Uses existsSync

if (fs.existsSync(filename)) {
  let fileContents = fs.readFileSync(filename, 'utf-8');
  console.log(fileContents);
} else {
  console.log('This file does not exist!');
}

// console.log(fileContents);
