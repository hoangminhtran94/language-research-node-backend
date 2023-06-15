/**
 * Student name: Minh Hoang Tran
 * 041016957
 * Assignment 1
 */

/**
 * Import fs package from node
 */
const fs = require("fs");
const express = require("express");

const app = express();

/**
 * Use nodejs file system to read the csv file
 * * Student name: Minh Hoang Tran
 */
fs.readFile("./32100260.csv", "utf8", (err, contents) => {
  /**
   * If failed to read the file, log the error and return
   */
  if (err) {
    console.error(err);
    return;
  }
  /**
   * Create an array to store all record data
   */

  const finalData = [];

  /**
   * reate an array of strings by split the contents by the special value "\n"  (new line)
   */
  const rows = contents.split("\n");

  /**
   * splice the first row from rows, which contains table labels. Remove the `"` and split the string into
   * an array of string using ","
   */
  const labels = rows.splice(0, 1)[0].replace(/"/g, "").split(",");

  /**
   * Loop through all the row data, remove the `"` and split value data using ","
   */
  rows.forEach((rawRowData) => {
    /**
     *  Remove the `"`  in raw data
     */
    const rowData = rawRowData.replace(/"/g, "");
    /**
     *  split raw string into an array of string using ","
     */
    const cells = rowData.split(",");

    /**
     *  Create an empty record data object
     */
    let dataObject = {};

    /**
     * Loop through all cells, for each cell, pick an label from the label array and match with the value of the cell using
     * Javascript spread operator
     *  Student name: Minh Hoang Tran
     */
    cells.forEach((cell, index) => {
      dataObject = { ...dataObject, [labels[index]]: cell };
    });

    /**
     * Push the record data into the record list
     */
    finalData.push(dataObject);
  });
  /**
   * Display the result in the terminal
   */
  console.log(finalData);
  console.log("Deleloped by Minh Hoang Tran");
});

/**
 * Student name: Minh Hoang Tran
 * 041016957
 * Assignment 1
 */
app.listen(3600);
