/**
 * Student name: Minh Hoang Tran
 * 041016957
 * Assignment 2
 */

/**
 * Import fs package from node
 * @author Minh Hoang Tran - 041016957
 */
const express = require("express");
const corsHandler = require("./middleware/cors");
const errorHandler = require("./middleware/error-handler");
const checkRecordFile = require("./middleware/check-record-file");
const vegetableRouter = require("./routes/vegetable-route");
const bodyParser = require("body-parser");
const app = express();
// Set up CORS headers
app.use(corsHandler);
// Parse JSON bodies
app.use(bodyParser.json());
// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));
// Custom middleware to check if the record file exists
app.use(checkRecordFile);
// Mount the vegetableRouter at the "/api/vegetable" route
app.use("/api/vegetable", vegetableRouter);
// Error handling middleware
app.use(errorHandler);
// Start the server on port 3600
app.listen(3600);

/**
 * Student name: Minh Hoang Tran
 * 041016957
 * Assignment 2
 */
