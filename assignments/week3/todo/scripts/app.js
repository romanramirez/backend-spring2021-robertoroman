// Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners, works because our function is hoisted
loadEventListeners();

// Loads our event listeners on submiting and runs addTask
function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task events
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter Task Event
  filter.addEventListener('keyup', filterTasks); // Sets an event listener for a key-up
}

// Get Tasks From Local Storage
function getTasks(e) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  // This essentially re-creates our task list from local storage
  tasks.forEach(function (task) {
    // Create li element
    const li = document.createElement('li');

    // Add class
    li.className = 'collection-item bolded';

    // Create text node and append to li
    // This appends our recently created list item to the list of tasks
    li.appendChild(document.createTextNode(task));

    // Create new link element
    const link = document.createElement('a');

    // Adding class to our link
    // secondary-content for materialize in order to have something to the right of list item (li)
    link.className = 'delete-item secondary-content';

    // Adding our icon HTML
    // We add the i class "fa fa-remove" for FontAwesome
    link.innerHTML = '<i class="fas fa-times-circle"></i>';
    // link.innerHTML = '<i class="fa fa-times"></i>';

    // Append link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
    return;
  }

  // Create li element
  const li = document.createElement('li');

  // Add class
  li.className = 'collection-item bolded';

  // Create text node and append to li
  // This appends our recently created list item to the list of tasks
  li.appendChild(document.createTextNode(taskInput.value));

  // Create new link element
  const link = document.createElement('a');

  // Adding class to our link
  // secondary-content for materialize in order to have something to the right of list item (li)
  link.className = 'delete-item secondary-content';

  // Adding our icon HTML
  // We add the i class "fa fa-remove" for FontAwesome
  link.innerHTML = '<i class="fas fa-times-circle"></i>';
  // link.innerHTML = '<i class="fa fa-times"></i>';

  // Append link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Implement in local storage
  storeTaskInLocalStorage(taskInput.value);

  // Clearing 'new task' input
  taskInput.value = '';

  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks; // Initializing 'tasks' variable
  if (localStorage.getItem('tasks') === null) {
    // If we have no tasks already stored in local storage, it sets tasks to an empty array
    tasks = [];
  } else {
    // Local storage can only hold strings, so we will need to parse as JSON
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  // This pushes our 'task' to the tasks array
  tasks.push(task);

  // This uses the .setItem() to create a key-value pair ('tasks', tasks) and gives it to the localStorage object in Javascript, or update it if it already exists
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  // This is essentally saying 'If the parent element of the element you clicked contains the class 'delete-item', then...
  if (e.target.parentElement.classList.contains('delete-item')) {
    // This utilizes the built-in confirm method of the Window object in the browser
    if (confirm('Are you sure?')) {
      // This is is calling the built-in DOM .remove() method on the parent element, of the parent element of our click target
      e.target.parentElement.parentElement.remove();
      // console.log('Element successfully removed!'); // Test log

      // Remove from Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement); // We pass in the actual li element
    }
  }
}

// Remove from Local Storage Function
function removeTaskFromLocalStorage(taskItem) {
  let tasks; // Initializing our tasks variable
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks Function
function clearTasks() {
  // While there is a first child in taskList, call the removeChild method on the firstChild of taskList
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear tasks from Local Storage
  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear(); // Calls the clear() method on built-in JS localStorage object
}

// Filter Tasks Function
function filterTasks(e) {
  const text = e.target.value.toLowerCase(); // This will give us what ever is being typed in

  // Here we use a .forEach loop because querySelectorAll returns a node list, not an array.

  // This is opposed to using getElementByClassName() which would return an HTML collection which we would have to convert to an array

  // We then place the callback function in our loop to apply our function to each element
  document.querySelectorAll('.collection-item').forEach(function (task) {
    // Setting 'item' variable to hold the textContent of the firstChild
    const item = task.firstChild.textContent;
    // if statement to check whether our typed text is in our task list
    // if 'item' (task.firstChild.textContent) matches an element in our task list (indexOf()) then it will NOT = -1
    // If it DOES return -1, then it was not found and the else block runs, hiding our tasks
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
