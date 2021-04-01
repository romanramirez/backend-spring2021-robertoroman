// 'use strict';

const fs = require('fs');

// console.log('You are currently running ' + process.platform);

const arguments = process.argv;

let filename = arguments[3];
let action = arguments[2];
let contents = arguments[4];

// User does not define file name
if (filename === undefined) {
  console.log(
    `Welcome to my file reader! Please provide the file name you want to use after the command.
    
    Example: 
      Read an existing file: node filereader.js read myfile.txt
      Write a new file: node filereader.js write myfile.txt
      Update an existing file: node filereader.js update myfile.txt
      Delete an existing file: node filereader.js delete myfile.txt
    `
  );

  return;
}

// CRUD loop
if (action === 'read') {
  console.log('Opening your file...');

  if (fs.existsSync(filename)) {
    // // Uses existsSync to check if file exists
    let fileContents = fs.readFileSync(filename, 'utf-8');
    console.log(fileContents);
  } else {
    console.log('This file does not exist!');
  }
  // let fileContents = fs.readFileSync(arguments[2], 'utf-8');
} else if (action === 'write') {
  // (user defined filename, whatever user wants to write, in utf-8)
  if (fs.existsSync(filename)) {
    console.log('This file already exists! Please use a different file name.');
    return;
  } else {
    console.log(`Writing a new file...`);
    fs.writeFileSync(filename, ' ', 'utf-8');
    console.log('Finised writing the file: ' + filename);
  }
} else if (action === 'update') {
  if (fs.existsSync(filename)) {
    fs.appendFileSync(filename, '\n' + contents, 'utf-8');
    console.log('File updated!');
  } else {
    console.log("This file doesn't exist! Creating new file...");
    fs.appendFileSync(filename, contents, 'utf-8');
  }
} else if (action === 'delete') {
} else {
}

// console.log(fileContents);
