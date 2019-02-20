
export default {
  // This will help with some data formatting
  formatDecimals: num => {
    return num / 100;
  },
  // Function for cleaning GRO API data
  cleanGroApiData: function (dataObject) {
    // Regular Expression to split data at ,'s and newlines
    let regExp = new RegExp("[,\\n]", "g")
    // Variable for saving new object
    let newDataObject = {};
    // Looping through each key in api data object
    for (var key in dataObject) {
      newDataObject[key] = dataObject[key]
        // Splitting data at ,'s and newlines
        .split(regExp)
        // This filter will remove any empty strings. Data responds with 0 if no data, so this is good. Sometimes Split will return empty '' value and this filter will remove those as they are considered falsy
        .filter(x => x);
      // GMV Field needs extra formatting. Data comes from api like this "25598", but if downloaded into csv it would be "255.98"
      // Look for GMV key
      if (key === "gmv") {
        // Loop through every variable in GMV array
        for (let i = 0; i < newDataObject[key].length; i++) {
          // Format number if over 99, needs to be formatted with a decimal
          if (newDataObject[key][i] > 99) {
            newDataObject[key][i] = this.formatDecimals(newDataObject[key][i]);
          }
        }
      }
      // Remove first two elements in array as they are always just headers and not data
      newDataObject[key].splice(0, 2);
      // Format Data so that it goes into spreadsheet nicely
      // This means each new row of data will be inside of it's own array
      // I will go through each array and split it up into arrays
      let formatArray = [];
      // If i don't set length first, splicing array will change length
      let loopLength = newDataObject[key].length;
      for (let i = 0; i < loopLength; i += 2) {
        formatArray.push(newDataObject[key].splice(0, 2));
      }
      // Setting Object Key to Properly Formatted Array
      newDataObject[key] = formatArray;
    }

    // To properly format for JSON, object needs to be inside an array
    let jsonArray = [];
    // Add data to array
    jsonArray.push(newDataObject);
    // Return array
    return jsonArray;
  },
  formatGroResponseToCsv: data => {
    // Return String that mimics a .csv file
    // String starts with headers
    let csvString = 'Day,Listings,Impressions,ViewItems,SoldItems,GMV\n';
    // for loop length of data array
    for (let i = 0; i < data.gmv.length; i++) {
      // Each loop, concat in order data
      // Seperate each data poitn with coma
      // Day
      csvString = csvString.concat(`${data.gmv[i][0]},`);
      // Listings
      csvString = csvString.concat(`${data.list[i][1]},`);
      // Impressions
      csvString = csvString.concat(`${data.imp[i][1]},`);
      // ViewItems
      csvString = csvString.concat(`${data.vi[i][1]},`);
      // SoldItems
      csvString = csvString.concat(`${data.purchase[i][1]},`);
      // GMV
      csvString = csvString.concat(`${data.gmv[i][1]}`);
      // End each loop with new line character
      csvString = csvString.concat("\n");
    }
    return csvString;
  }
}
