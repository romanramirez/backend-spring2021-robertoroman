// 'use strict';

const fs = require('fs');

// console.log('You are currently running ' + process.platform);

const arguments = process.argv;

let filename = arguments[3];
let action = arguments[2];
let contents = arguments[4];

// User does not define file name
if (action === undefined) {
  console.log(
    `Welcome to my file reader! Please provide the file name you want to use after the command.
    
    Example: 
      To ead an existing file: node filereader.js read myfile.txt
      To write a new file: node filereader.js write myfile.txt
      To update an existing file: node filereader.js update myfile.txt
      To delete an existing file: node filereader.js delete myfile.txt
    `
  );
  // If no command entered, end program
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
    console.log('Finished writing the file: ' + filename);
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
  if (fs.existsSync(filename)) {
    if (contents === 'true') {
      fs.unlinkSync(filename);
      console.log(
        `The dark deed is done. ${filename} has been successfully deleted.`
      );
    } else {
      console.log(
        `Are you sure you want to delete this file? Please run command again with the word 'true' at the very end.`
      );
    }
  } else {
    console.log(
      'There is no file with that name, please double check your argument!'
    );
  }
} else if (action === 'copy') {
  if (fs.existsSync(filename)) {
    console.log('Copying your file...');
    fs.copyFileSync(filename, contents, 0);
  } else if (!fs.existsSync(filename)) {
    console.log(
      'The file you are trying to copy does not exist. Please check file name or create this file.'
    );
  }
} else {
  console.log(
    'There is no action by that name! Please check your spelling. The available actions for this script are: read, write, update, delete, and copy.'
  );
}

// console.log(fileContents);
