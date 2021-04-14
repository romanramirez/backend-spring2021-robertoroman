'use strict';

// Express module staging
const express = require('express');
const path = require('path');

// Express variable staging
const app = express();
const port = 3000;

// Express Port
app.listen(port);
console.log('Server is listening on port 3000...');

// Serving Static Files

// Using our imported 'path' module, we can use .join() to tell express where to find our directory ('public)
app.use(express.static(path.join(__dirname, 'public')));

// // Static Route
// app.all('/', (req, res) => {
//   res.sendFile(path.join(__dirname + './app.js'));
// });
