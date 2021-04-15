'use strict';

// Express module staging
const express = require('express');
const path = require('path');
const fs = require('fs');

// Express variable staging
const app = express();
const port = 3000;

// Express Port
app.listen(port);
console.log('Server is listening on port 3000...');

let tasks;
let taskFileName = 'tasks.json';

// Prepare JSON tasks file
if (fs.existsSync('tasks.json')) {
  let fileContents = fs.readFileSync('tasks.json', 'utf-8');
  tasks = JSON.parse(fileContents);
} else {
  // Create our task object structure
  tasks -= {
    incompleted: [],
    completed: [],
    deleted: [],
  };
  // Write our tasks to the taskFile
  fs.writeFileSync(taskFileName, JSON.stringify(tasks), 'utf-8');
}

// Body Parser
app.use(express.json({ strict: false }));
app.use(express.urlencoded({ extended: false }));

// Serving Static Files

// Using our imported 'path' module, we can use .join() to tell express where to find our directory ('public)
app.use(express.static(path.join(__dirname, 'public')));

// New route for our task object
app.post('/add-task', function (req, res) {
  let taskData = req.body;
  let taskObject = new task.Task(
    taskData.text,
    taskData.priority,
    taskData.dueDate
  );
  console.log(taskObject);
});

function saveFile() {
  let json = JSON.stringify(tasks, 'utf-8');
  fs.writeFileSync(taskFileName, json, 'utf-8');
}

app.post('/get-tasks', function (req, res) {
  let responseObject = {
    incompleted: tasks.incompleted,
  };
});

// // Static Route
// app.all('/', (req, res) => {
//   res.sendFile(path.join(__dirname + './app.js'));
// });
