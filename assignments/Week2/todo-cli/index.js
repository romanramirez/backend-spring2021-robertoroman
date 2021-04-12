'use strict';

// Retrieves FS package from node
const fs = require('fs');

class task {
  constructor(text, priority, dueDate) {
    this.text = text;
    this.dueDate = dueDate;
    this.dateCreated = new Date();
    this.priority = priority;
    this.dateCompleted = null;
  }
}

// Here we read the tasks.json file and store it into fileContents
let fileContents = fs.readFileSync('tasks.json', 'utf-8');

// then we parse it and store it into previousTask
let previousTask = JSON.parse(fileContents);

// Our new value for taskArray now includes our last task!
let taskArray = previousTask.taskList;
let taskArrayCompleted = previousTask.tasksListComplete;

// Arguments (input by user from CLI)
let action = process.argv[2]; // x x action ...
// For add
let text = process.argv[3]; // x x x text ...
let priority = process.argv[4];

// Actions

// To ADD
if (action === 'add') {
  taskArray.push(new task(text, priority));
  console.log('You have added this task');
} else if (action === 'list') {
  let currentList = taskArray;
  let completed;

  if (text == 'completed' || text === 'completed') {
    currentList = taskArrayCompleted;
  }

  for (let i = 0; i < currentList.length; i++) {
    if (currentList[i].dateCompleted === null) {
      completed = 'No';
    } else {
      completed = 'Yes';
    }
    // To LIST
    let taskList = `
    ${i + 1}
    Priority: ${currentList[i].priority}
    Task: ${currentList[i].text}
    Due date: ${currentList[i].dueDate}
    Completed: ${completed} `;

    console.log(taskList);
  }
} else if (action === 'complete' || 'completed') {
  const taskNumber = parseInt(text) - 1;
  if (Number.isNaN(taskNumber)) {
    console.log('Sorry, but that is not a number. Please try again.');

    return;
  }

  let task = taskArray[taskNumber];
  taskArray.splice(taskNumber, 1);
  taskArrayCompleted.push(task);
} else if (action === 'delete' || 'remove') {
} else {
  console.log(
    'Welcome to Todo-CLI, to use this script, type an action and data at the end of the command.'
  );
}

// Stores our taskArray into variables
let objectToSave = {
  taskList: taskArray,
  taskListComplete: taskArrayCompleted,
};

// Stringifies objectToSave and reassigns it
objectToSave = JSON.stringify(objectToSave);

fs.writeFileSync('tasks.json', objectToSave, 'utf-8');
