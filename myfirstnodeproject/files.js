const fs = require('fs');

// Holds the terminal's command's arguments. THESE ARE NOT FUNCTION ARGUMENTS.
process.argv;

console.log(process.argv);

// CRUD: Create, Read, Update, Delete
// Any CRUD operations WILL NOT ask for permission to create/delete files.

// Create a file using Node FS module.
// REPLACES existing files with same name, deleting old content.
fs.writeFileSync('new_file.txt', 'Hello World!', 'utf-8');

let myCode = `
console.log("How are you doing?");

console.log(100 * 100);
`;

// argument order: filename, contents, character set.
fs.writeFileSync('javascriptcode.js', myCode, 'utf-8');

console.log('Finished creating files');

// Read Files with Node FS.

// argument order: filename, character set.
let fileContents = fs.readFileSync('new_file.txt', 'utf-8');

console.log(fileContents);

let essayContents = fs.readFileSync('really important essay.txt', 'utf-8');

// Code to detect how many words are in essayContents.
let essayArray = essayContents.split(' ');
console.log(`The essay has ${essayArray.length} words in it!`);

// Reads the file booleans.js hoping that it will read it as an actual boolean.
let tryingToReadDatatypes = fs.readFileSync('booleans.js', 'utf-8');
// Unfortunately, anything external to JavaScript will automatically be imported as a string!
console.log(typeof tryingToReadDatatypes);
