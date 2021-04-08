// Express Server

'use strict';

const express = require('express');

// Run the express package
const app = express();

// Allows our Express server to understand HTTP requests
const http = require('http').Server(app);

// use body parser to convert POST data to proper JS datatypes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Specifies port to use
const port = 3000; // Most commmon development port is 8080

// tells our http server app where to listen for connections (port = 3000)
http.listen(port);
console.log(
  `Running Express server on ${[port]}. Use CTRL + C to stop server.`
);

const winningNumber = Math.floor(Math.random() * 10 + 1);
console.log(winningNumber);

// Setting up Express routes when smoeone types 'http://localhost:3000 (getting your server to serve up a webpage)
app.use('/', express.static('public_html/')); // our first static route
app.use('/secretwebsite', express.static('public_html/secret'));

// POST routes
// An http request is a message using http protocol.

// Request handling
app.post('/submitNumber', function (request, response) {
  let dataFromFrontEnd = request.body;

  let userNumber = parseInt(dataFromFrontEnd.numberGuess);

  let responseObject = {
    message: 'Stop bothering us, please.',
  };

  if (Number.isNaN(userNumber)) {
    responseObject.message = 'Sorry, this number is invalid.';
  } else if (winningNumber === userNumber) {
    responseObject.message = 'Congratulations! You win.';
  } else {
    responseObject.message = 'Sorry, that was not a match.';
  }

  console.log('Our visitor says: ' + userNumber);

  response.send(responseObject);
});
