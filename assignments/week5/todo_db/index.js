// Variable staging
const sanitize = require('mongo-sanitize');
const mongoose = require('mongoose');
const express = require('express');
const fs = require('fs');
const task = require('./Task.js');
const credentials = require('./credentials.js');
const app = express();
const http = require('http').Server(app);
const port = 3000;
const char = 'utf-8';

http.listen(port);

console.log('Express server is now running on port ' + port);

// Mongoose Connect
mongoose.connect(credentials.dbURL, credentials.dbOptions, err => {
  if (err) {
    console.error(`Failed to connect to MongoDB: ${err}`);
  } else {
    console.log(`------ Successfully connected to MongoDB! ------`);
  }
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'We had a Mongo error'));
mongoose.Promise = global.Promise;

let Schema = mongoose.Schema;
let TaskSchema = Schema({
  text: String,
  priority: Number,
  dueDate: String,
  dateCreated: String,
  dateDeleted: String,
  dateCompleted: String,
});

TaskSchema.loadClass(task.Task);

let todoModel = new mongoose.model('tasks', TaskSchema);

// // Storing the task object and filename in variables.
// let tasks;
// let taskFileName = 'tasks.json';

// Body Parser (see documentation: https://github.com/expressjs/body-parser )
app.use(express.json({ strict: false }));
app.use(express.urlencoded({ extended: false }));

// Routes
// The default route for when a visitor requests the URL without a file path.
app.use('/', express.static('public_html/'));

// POST Handler for adding a new task.
app.post('/add-task', function (req, res) {
  let taskData = req.body;

  let newTask = new todoModel({
    dateCompleted: null,
    dateDeleted: null,
    dateCreated: new Date(),
  });

  newTask.setText(sanitize(taskData.text));
  newTask.setPriority(taskData.priority);
  newTask.setDueDate(taskData.dueDate);
  newTask.save(err => {
    if (err) {
      console.error('There has been an error in saving');
      res.sendStatus(500);
    } else {
      console.log('Save successful');
    }
  });

  res.sendStatus(200);

  newTask.save(err => {
    if (err) {
      console.error(`Something happened in MongoDB while saving: ${err}`);
      res.sendStatus(500);
    } else {
      console.log(`Save task successful! `);
      res.send({ error: null });
    }
  });

  // "Update" the json file.
  saveFile();

  // Send a response to the front-end.
  res.send({ error: null });
});

// POST Handler for getting all tasks.
app.post('/get-tasks', function (req, res) {
  // Build an object holding all the Task objects that passed the filter test.
  let responseObject = {};
  // Send responseObject back to the front-end.
  res.send(responseObject);
});

// POST Handler for completing a task.
app.post('/complete-task', function (req, res) {
  let id = req.body.id;

  todoModel.find({ _id: _id }, (error, results) => {
    if (error) {
      console.error(`There's been an error`);
    } else {
      results[0].markCompleted();
      results[0].save(error => {
        if (error) {
          console.error(`There's been an error`);
          res.sendStatus(500);
        } else {
          res.send({});
        }
      });
    }
  });

  saveFile();
  // Send a message to the front-end.
  res.send({});
});

// POST Handler for deleting a single task.
app.post('/delete-task', function (req, res) {
  let id = req.body.id;

  // Iterate through each element in task array. Find matching ID.
  for (let i = 0; i < tasks.incomplete.length; i++) {
    if (tasks.incomplete[i].id === id) {
      // If ID matches, then mark the Task Object as deleted.
      tasks.incomplete[i].markDeleted();
      break;
    }
  }
  // Send a message to front-end.
  res.send({});
});

// POST Handler for updating an existing task.
app.post('/update-task', function (req, res) {
  let id = req.body.id;
  let updates = req.body;

  todoModel.find({ _id: _id }, function (error, results) {
    if (error) {
      console.error('There has been an error.');
    } else {
      results[0].setText(sanitize(updates.text));
      results[0].setPriority(updates.priority);
      results[0].setDueDate(updates.dueDate);
      results[0].save(error => {
        if (error) {
          console.error(`There has been an error: ${error}`);
          res.sendStatus(500);
        } else {
          res.send({});
        }
      });
    }
  });
});
