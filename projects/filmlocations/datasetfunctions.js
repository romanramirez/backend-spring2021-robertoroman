
// convertEntry is used to ocnvert our data string and array of headings into an object with those titles and valuse from the string.

////////////////// stripSpace ///////////////////

function stripSpace(text) {
    text = text.replace(/^ /g, '');
    text = text.replace(/ $/g, '');
    return text
}


////////////////// convertEntry ///////////////////
function convertEntry(entry, titles) {
    // Array holding fixed quote
    let dataArray = quoteFix(entry);

    // Empty object to later fill with fixed quotes
    let dataObject = {};

    titles.forEach(function(arrayElement, i) {

        dataObject[arrayElement] = dataArray[i];

        return dataObject;
    });
}

////////////////// quoteFix ///////////////////

function quoteFix(entry) {
    
    // Regex for detecting double quote
    let regex = /"/m;

    // Uses regex to test entry parameter
    // Remember that convertEntry is passing in 
    let testRegex = regex.test(element);

    if (testRegex) {

        // Remember that this if statement will only run if testRegex = true, which will be the case if testRegex finds an entry with a double quote

        // Splits string into an array by commas
        let entryArray = entry.split(',');

        // Create array to send with proper valuesf
        let entryWithoutQuotes = [];

        // This value should hold the index of the ending quote if found.
        let closingQuoteIndex = -1;
    }



}


////////////// Exporting /////////////////////

// We use module.exports to export our file aka make it available to the rest of our files

module.exports = {
    stripSpace,
    convertEntry
}