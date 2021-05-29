'use strict';

// Setting up our mongoose package
const mongoose = require('mongoose');

// Credentials and location for Mongo database
const databaseConnect =
  'mongodb+srv://romanramirez:Imgoingbackto505!@cluster0.0fgmd.mongodb.net/example_database?retryWrites=true&w=majority';

// Settings and Options for Mongoose
const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

// Connecting to MongoDB
mongoose.connect(databaseConnect, options, error => {
  if (error) {
    console.log("Something went wrong! They don't want to see you win.");
  } else {
    console.log(
      'Success! You are now entering MongoDB Atlas! \n *DJ Khaled voice* You smart. You loyal. You a genius.'
    );
  }
});

// Object representing the MongoDB connection.
let db = mongoose.connection;

// Send Mongo errors to the console.
db.on('error', console.error.bind(console, 'Oops. We had a Mongo error.'));

// Let mongoose have a copy of promise class
mongoose.Promise = global.Promise;

// Schemas Section
// Schema describes how our MongoDB documents should look like, including properties and values
// It is like a blueprint for how an object is supposed to be structured

let Schema = mongoose.Schema;

let ourSchema = new Schema({
  food: String,
  location: String,
});

// Model Section
// We need to attach to a Model,
let exampleModel = new mongoose.model('example_collections', ourSchema);

// Creating our first Document, we provide and object to fulfill schema requirements
let firstDocument = new exampleModel({
  food: 'Oatmeal',
  location: 'Mission St.',
});

// Saving our first Document, callback function checking for errors

firstDocument.save(function (error) {
  if (error) {
    console.log('failed to save document + error');
  } else {
    console.log('Your file has been saved. \nWin, win, win no matter what. 💯');
  }
});

// Searches the exampleModel with specified ID and updates that document with values provided in the second argument, provided as an object
exampleModel.findByIdAndUpdate(
  '6083126139a3e5e5222f7898',
  { location: 'Exelsior' },
  (error, results) => {
    if (error) {
      console.error();
      'Failed to update.' + error;
    } else {
      console.log('Successfully updated! Here is the old copy: ' + results);
    }
  }
);

exampleModel.findByIdAndDelete('6083126139a3e5e5222f7898', (error, results) => {
  if (error) {
    console.error('Failed to delete.' + err);
  } else {
    console.log('Successfully deleted the following!' + results);
  }
});

// Searches collection for matching documents based on the first argument of find(). Retuns matching documents in 

exampleModel.find({ food: 'Oatmeal' }, (error, results) => {
  if (error) {
    console.error('Failed to find: ' + error);
  } else {
    console.log('Found the following: ' + results);
  }
});

