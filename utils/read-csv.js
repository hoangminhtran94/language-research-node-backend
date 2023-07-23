const fs = require("fs");
/**
 * Utility function to read data from a CSV file.
 * @author Minh Hoang Tran - 041016957
 * @param {string} filepath - The path of the CSV file to read.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of record objects.
 * @throws {Error} - Throws an error if the file read operation fails.
 */
exports.readCSV = async (filepath) => {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(filepath, "utf8", (err, contents) => {
      // If failed to read the file, log the error and return null
      if (err) {
        return resolve(null);
      }
      // Create an array to store all record data
      const finalData = [];
      // Split the contents into an array of strings by the newline character (\n)
      const rows = contents.split("\n");
      // Remove the first row from rows, which contains table labels. Remove the double quotes and split the string into an array using comma (,)
      const removeInvisibleCharacters = (str) => {
        // Regular expression to match any invisible character (including line breaks and tabs)
        const invisibleCharRegex = /[\r\n\t\v\f\s]/g;

        // Use the replace() method to remove all invisible characters
        const cleanedString = str.replace(invisibleCharRegex, "");

        return cleanedString;
      };

      const labels = removeInvisibleCharacters(
        rows
          .splice(0, 1)[0]
          .replace(/"/g, "")
          .replace("Type of product", "type_of_product")
          .replace("Type of storage", "type_of_storage")
      ).split(",");
      // Check if there are no rows in the file
      if (rows.length === 0) {
        return resolve([]);
      }
      /**
       * @author Minh Hoang Tran - 041016957
       */
      // Process each row of data
      rows.forEach((rawRowData) => {
        // Remove the double quotes in the raw data
        const rowData = rawRowData.replace(/"/g, "");
        // Split the raw string into an array of strings using comma (,)
        const cells = rowData.split(",");
        // Create an empty record data object
        let dataObject = {};
        // Loop through each cell and map it to the corresponding label using the spread operator
        cells.forEach((cell, index) => {
          dataObject = { ...dataObject, [labels[index]]: cell };
        });
        // Push the record data into the finalData array
        finalData.push(dataObject);
      });

      // Display a message in the console
      console.log("Developed by Minh Hoang Tran");
      // Resolve the promise with the finalData array
      resolve(finalData.filter((data) => Object.keys(data).length >= 16));
    });
  });

  // Wait for the promise to resolve and return the result
  return await promise;
};
/**
 * Utility function to read the contents of a CSV file and return an array of raw string rows.
 * @author Minh Hoang Tran - 041016957
 * @param {string} filepath - The path of the CSV file to read.
 * @returns {Promise<Array<string>>} - A promise that resolves to an array of raw string rows.
 * @throws {Error} - Throws an error if the file read operation fails.
 */
exports.csvToRawString = async (filepath) => {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(filepath, "utf8", (err, contents) => {
      // If failed to read the file, log the error and return null
      if (err) {
        return resolve(null);
      }
      // Split the contents into an array of strings by the newline character (\n)
      const rows = contents.split("\n");
      // Resolve the promise with the array of raw string rows
      resolve(rows);
    });
  });

  // Wait for the promise to resolve and return the result
  return await promise;
};
