/**
 * Student name: Minh Hoang Tran
 * 041016957
 * Assignment 1
 */

/**
 * Import fs package from node
 */
const express = require("express");
const corsHandler = require("./middleware/cors");
const bodyParser = require("body-parser");
const app = express();

const vegetableRouter = require("./routes/vegetable-route");
app.use(corsHandler);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/vegetable", vegetableRouter);
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
