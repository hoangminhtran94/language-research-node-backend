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
const { readCSV } = require("./utils/read-csv");

readCSV("./32100260.csv").then((res) => console.log(res));
/**
 * Use nodejs file system to read the csv file
 * * Student name: Minh Hoang Tran
 */

/**
 * Student name: Minh Hoang Tran
 * 041016957
 * Assignment 1
 */
app.listen(3600);
