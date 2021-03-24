// This is an initializing file for our node project

// This brings in lodash as a module
const _ = require("lodash");

// This is the js way of random number generators
let jsRandom = Math.floor(Math.random() * 100 + 1);

let_Random = _.random(1, 100);

console.log(let_Random);

console.log('Nodemon is working!');