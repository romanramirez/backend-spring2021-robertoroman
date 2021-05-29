'use strict';

// Variable staging 
const fs = require('fs'); // File system module
let objectArray = []; // Empty array to later fill with JSON object
const dsFunctions = require('./datasetfunctions.js')

// JSON Check/Create 

if (fs.existsSync('dataset.json')) {
    // Read JSON file
    let jsonSave = fs.readFileSync('dataset.json', 'utf-8');
    // Parse into object
    let convertedObject = JSON.parse(jsonSave);
    // Get the array in the object and store it in objectArray
    objectArray = convertedObject.dataset;
} else {
    // Reading in dataset
    let dataset = fs.readFileSync('filmlocations.csv', 'utf-8');
    // Split dataset string into array so each entry is an array element 
    // Ex: Basic Instinct, 1992, 'Steinhart Aquarium', etc
    let lineArray = dataset.split('\n');

    // Now we split each array element by commas.
    // Expected outcome is: Title, release year, locations, etc.
    let dataHeadings = lineArray[0].split(',');

    // Loop through each of the arrays in lineArray and run them through convertEntry(), returns an object, immediately pass them into objectArray
    for (let i = 0; i < lineArray.length; i++) {
        const element = lineArray[i];
        objectArray.push(convertEntry(lineArray[i], dataHeadings));
    }

    // Removes the first and last entries that are not film location data
    objectArray.pop();
    objectArray.shift();

    
    

    // Create an object so we can save it to JSON
    let objectToSave = {
        dataset: objectArray
    }


   // Convert objectToSave to string so we can parse into JSON
    let stringToSave = JSON.stringify(objectToSave);

    // Finally, save the JSON string to a file
    // Ex: fs.writeFileSync(writelocation.json, whattowrite, char encoding)
    fs.writeFileSync('dataset.json', stringToSave, "utf-8");
}

