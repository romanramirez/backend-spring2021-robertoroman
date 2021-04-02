const fs = require("fs");

class task {
    constructor(text, priority, dueDate) {
        this.text = text;
        this.dueDate = dueDate;
        this.dateCreated = new Date();
        this.priority = priority;
        this.dateCompleted = null;
    }
}

fs.writeFileSync('tasks.txt');


let taskArray = [];

// 
let action = process.argv[2];
let text = process.argv[3];
let priority = process.argv[4];

if (action === 'add') {
    taskArray.push(new task(text, priority))
    console.log('You have added this task');
} 


console.log(taskArray);