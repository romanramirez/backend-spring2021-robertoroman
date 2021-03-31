let arguments = process.argv;

// console.log(arguments);

let request = arguments[2];

if (request === 'hello') {
  console.log('hello there.');
} else if (request === 'weather') {
  console.log('Sorry. Internet is down.');
} else {
  console.log("I'm sorry, I don't understand your request.");
}
