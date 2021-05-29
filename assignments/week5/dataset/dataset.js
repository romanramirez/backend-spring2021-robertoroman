'use strict';

// Variable & Module Staging
const fs = require('fs'); // filesystem node module
let dataset = fs.readFileSync('dataset.csv', 'utf-8'); // Reading in our from dataset.csv using fs.readFileSync
let lineArray = dataset.split('\n'); // Splitting our dataset by new lines ('\n')
let dataHeadings = lineArray[0].split(','); // Splitting the first position of our newly split dataset by comma
let objectArray = []; // Creating empty array to later store converted data objects

for (let i = 0; i < lineArray.length; i++) {
  // Looping through the dataset...
  objectArray.push(convertEntry(lineArray[i], dataHeadings)); // ...and pushing each new converted entry to objectArray
}

/*

convertEntry()

Function that takes in two parameters: ('entry', 'titles').

It is called by our for-loop and lineArray[i] is 'entry' parameter, and dataHeadings is 'titles' parameter.

It takes 'entry', calls quoteFix on it which finds double quotes and fixes them, and stores it into dataArray

For each title, it will call an anonymous function that also takes in two parameters (arrayElement, i) and checks if they're in the ignoredIndexes. If included, it will return immediately. 

If NOT included, it will create a property (assigning it to dataObject as arrayElement) by creating a key-value pair consisting of the titles (titles.forEach) and dataArray (which is really just quoteFix(entry)) of that particular iteration (i).

converts a string of data and an array of titles, into an object with those titles and values from the string.
*/

function convertEntry(entry, titles) {
  // Calls quoteFix which will "fix" our string if it has double quotes in it, we get an array of values in return.
  let dataObject = {};
  let dataArray = quoteFix(entry);
  let ignoredIndexes = [0, 5, 6, 9, 10, 12, 13, 19, 20, 23, 24, 25, 26];

  titles.forEach(function (arrayElement, i) {
    if (ignoredIndexes.includes(i)) {
      return;
    }

    // assign the data array value, to the title array key.
    dataObject[arrayElement] = dataArray[i];
  });

  // return the completely built object.
  return dataObject;
}

// Removes the first and last entries from dataset array.
objectArray.pop(); // Removes last entry
objectArray.shift(); //Removes first entry

// object to hold all 
let resultsObject = {};

let supplementRegex = /[sS]upplement/m; // Regular expression used to find 'supplement' or 'Supplement' in entries and skipping

// This loops through objectArray and finds duplicates.
for (let i = 0; i < objectArray.length; i++) {
  // rename current object to variable.
  let entryObject = objectArray[i];

  //... Check if the object has the word Supplement in it...
  if (supplementRegex.test(entryObject['Report Type Description'])) {
    //... if it does, skip to next object.
    continue;
  }

  // Renaming current object values to variables
  let resolutionName = entryObject['Resolution'];
  let subcategoryName = entryObject['Incident Category'];

  // Check if there is an object that represents a Resolution...
  if (resultsObject.hasOwnProperty(resolutionName)) {
    //... If it does, check if it that Resolution object has a property of the current object's subcategory...
    if (resultsObject[resolutionName].hasOwnProperty(subcategoryName)) {
      //... If subcategory property does exist, add a 1 to it.
      resultsObject[resolutionName][subcategoryName] += 1;
    } else {
      //... If subcategory property does NOT exist, assign it a 1.
      resultsObject[resolutionName][subcategoryName] = 1;
    }
  } else {
    //... If there is not Resolution object by that name, then create an object for it.
    resultsObject[resolutionName] = {};
    // And also create a property for this object with the current object's subcategory and assign a 1.
    resultsObject[resolutionName][subcategoryName] = 1;
  }
}

console.log(
  'What is the most common and least common type of incident that are open/active?'
);

for (let resolution in resultsObject) {
  let openHighest = 0;
  let openHighestName = '';
  let openLowest = null;
  let openLowestName = '';

  console.log('\n' + resolution.toUpperCase());

  for (let property in resultsObject[resolution]) {
    let tally = resultsObject[resolution][property];

    if (openLowest === null) {
      openLowest = tally;
      openLowestName = property;
    }

    if (tally < openLowest) {
      openLowest = tally;
      openLowestName = property;
    }

    if (tally > openHighest) {
      openHighest = tally;
      openHighestName = property;
    }
  }

  console.log('The highest is: ', openHighestName, ': ', openHighest);
  console.log('The lowest is: ', openLowestName, ': ', openLowest);

  for (let property in resultsObject[resolution]) {
    let tally = resultsObject[resolution][property];

    if (openHighest === tally && openHighestName !== property) {
      console.log('Also the highest is: ', property, ': ', tally);
    }

    if (openLowest === tally && openLowestName !== property) {
      console.log('Also the lowest is: ', property, ': ', tally);
    }
  }
}

// QUESTION 1: END

// QUESTION 2: What day of the week is (on average) the most active? What hour (on average) for the week is the most active?

// Incident Time and Incident Day of Week.

let dayCounter = {
  Sunday: 0,
  Monday: 0,
  Tuesday: 0,
  Wednesday: 0,
  Thursday: 0,
  Friday: 0,
  Saturday: 0,
};

let hourCounter = [];

objectArray.forEach(function (entry) {
  let hour = parseInt(entry['Incident Time'].split(':')[0]);

  if (hourCounter[hour] === undefined) {
    hourCounter[hour] = 1;
  } else {
    hourCounter[hour]++;
  }

  switch (entry['Incident Day of Week']) {
    case 'Sunday':
      dayCounter.Sunday++;
      break;
    case 'Monday':
      dayCounter.Monday++;
      break;
    case 'Tuesday':
      dayCounter.Tuesday++;
      break;
    case 'Wednesday':
      dayCounter.Wednesday++;
      break;
    case 'Thursday':
      dayCounter.Thursday++;
      break;
    case 'Friday':
      dayCounter.Friday++;
      break;
    case 'Saturday':
      dayCounter.Saturday++;
  }
});

let highestCount = 0;
let highestDay;

for (let day in dayCounter) {
  if (dayCounter[day] > highestCount) {
    highestCount = dayCounter[day];
    highestDay = day;
  }
}

console.log('The day with the most activity is ' + highestDay);

let highestHour = Math.max(...hourCounter);
let highestIndex = hourCounter.indexOf(highestHour);

if (highestIndex >= 12) {
  console.log(
    'The most active hour of the day is ' +
      (highestIndex === 12 ? '12' : highestIndex - 12) +
      'PM.'
  );
} else {
  console.log(
    'The most active hour of the day is ' +
      (highestIndex === 0 ? '12' : highestIndex) +
      'AM.'
  );
}

// QUESTION 2: END

// QUESTION 3: Which neighborhood is the most active and least active? Supervisor district? (with and without supplements)

let resultsQuestion3 = {};
let resultsQuestion3District = {};

for (let i = 0; i < objectArray.length; i++) {
  let entry = objectArray[i];

  if (resultsQuestion3.hasOwnProperty(entry['Analysis Neighborhood'])) {
    resultsQuestion3[entry['Analysis Neighborhood']] += 1;
  } else {
    resultsQuestion3[entry['Analysis Neighborhood']] = 1;
  }

  if (resultsQuestion3District.hasOwnProperty(entry['Supervisor District'])) {
    resultsQuestion3District[entry['Supervisor District']] += 1;
  } else {
    resultsQuestion3District[entry['Supervisor District']] = 1;
  }
}

let highestNeighborhoodCount = 0;
let highestNeighborhoodName;

for (let neighborhood in resultsQuestion3) {
  if (resultsQuestion3[neighborhood] > highestNeighborhoodCount) {
    highestNeighborhoodCount = resultsQuestion3[neighborhood];
    highestNeighborhoodName = neighborhood;
  }
}

let highestDistrict = 0;
let highestDistrictName;

for (let district in resultsQuestion3District) {
  if (resultsQuestion3District[district] > highestDistrict) {
    highestDistrict = resultsQuestion3District[district];
    highestDistrictName = district;
  }
}

console.log(
  `The neighborhood with the highest activity is ${highestNeighborhoodName} with ${highestNeighborhoodCount} entries.`
);
console.log(
  `The district with the highest activity is ${highestDistrictName} with ${highestDistrict} entries.`
);

// QUESTION 3: END

// QUESTION 4: How many open/active vs closed? Per Year? Per Month?

let activeClose = {};

for (let i = 0; i < objectArray.length; i++) {
  let entry = objectArray[i];
  const date = objectArray[i]['Incident Date'];
  const year = date.split('/')[0];

  if (!activeClose.hasOwnProperty(year)) {
    activeClose[year] = {};
  }

  if (activeClose[year].hasOwnProperty(entry['Resolution'])) {
    activeClose[year][entry['Resolution']] += 1;
  } else {
    activeClose[year][entry['Resolution']] = 1;
  }
}

for (let year in activeClose) {
  console.log(
    `For the year ${year}, we had ${activeClose[year]['Open or Active']} for Open or Active, and ${activeClose[year]['Cite or Arrest Adult']} for Cite or Arrest.`
  );
}

// Question 5: What street has the most activity?

let streets = {};

for (let i = 0; i < objectArray.length; i++) {
  let entry = objectArray[i];
  let streetArray = entry['Intersection'].split('\\');
  streetArray = streetArray.map(function (street) {
    return stripSpace(street);
  });

  for (let i = 0; i < streetArray.length; i++) {
    let street = streetArray[i];

    // or if it starts with UNAMED
    if (street === '' || street.includes('UNNAMED')) {
      continue;
    }

    if (streets.hasOwnProperty(street)) {
      streets[street] += 1;
    } else {
      console.log(street);
      streets[street] = 1;
    }
  }
}

let highestStreetCount;
let highestStreetName;

for (let street in streets) {
  if (highestStreetCount === undefined) {
    highestStreetCount = streets[street];
  }

  if (streets[street] < highestStreetCount) {
    highestStreetCount = streets[street];
    highestStreetName = street;
  }
}

console.log(
  `The street with the most police activity is ${highestStreetName} with a total of ${highestStreetCount} incidents.`
);

console.log(streets['MISSION ST']);

// Question 5: END

function stripSpace(text) {
  text = text.replace(/^ /g, '');
  text = text.replace(/ $/g, '');
  return text;
}

// Searches for a double quote, if found, fixes the value and returns the corrected values, otherwise returns the array of values.
function quoteFix(entry) {
  // Regex pattern for detecting a double quote.
  let regex = /"/m;
  // Tests the string for a double quote.
  let results = regex.test(entry);

  //
  if (results) {
    // If double quote found...

    // Split string into array by commas.
    let entryArray = entry.split(',');
    // Create array to send with proper values.
    let entryWithoutQuotes = [];
    // This value should hold the index of the ending quote value if found. Otherwise kept at -1.
    let closingQuoteIndex = -1;

    // Goes through each value of the array...
    for (let i = 0; i < entryArray.length; i++) {
      // If value with ending quote found, jump to the index after it.
      if (i <= closingQuoteIndex) {
        // set index of array to value after value with ending quote.
        i = closingQuoteIndex;
        // reset the value
        closingQuoteIndex = -1;

        continue;
      }

      // Grab the individual string of the array.
      let value = entryArray[i];

      // Test if this string STARTS with a double quote.
      if (value[0] === '"') {
        // If double quote found, add the this string value to completeString, which should hold the fixed value in the end of scope.
        let completeString = value + ',';

        // Run a loop looking for values ahead of the value that starts with a double quote.
        for (let j = i + 1; j < entryArray.length; j++) {
          // Grab the string.
          let endingValue = entryArray[j];

          // Check if the string ends with a double quote.
          if (endingValue[endingValue.length - 1] === '"') {
            // completeString += endingValue;

            // If it does, add it to completeString.
            completeString = completeString + endingValue;
            // Assign j, where we found the closing double quote.
            closingQuoteIndex = j;
            // Break the loop as we found the closing double quote.
            break;
          } else {
            // Add the array element to the completeString.
            completeString = completeString + endingValue + ',';
          }
        }
        entryWithoutQuotes.push(removeQuotes(completeString));
      } else {
        entryWithoutQuotes.push(value);
      }
    }

    return entryWithoutQuotes;
  } else {
    return entry.split(',');
  }
}

function removeQuotes(text) {
  let textArray = text.split('');
  textArray.pop();
  textArray.shift();
  return textArray.join('');
}
