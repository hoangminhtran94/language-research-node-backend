const express = require("express");
const multer = require("multer");
const formParser = multer();
const {
  getAll,
  addNewRecord,
  getRecord,
  updateRecord,
  deleteRecord,
} = require("../controller/vegetable-controller");

const vegetableRouter = express.Router();
/**
Router to handle requests related to vegetable records.
@author Minh Hoang Tran - 041016957
*/
// Get all records
vegetableRouter.get("/", getAll);
// Add a new record
vegetableRouter.use(formParser.none()).post("/", addNewRecord);
// Get a specific record
vegetableRouter.get("/:recordId", getRecord);
// Update a specific record
vegetableRouter.post("/:recordId", updateRecord);
// Delete a specific record
vegetableRouter.delete("/:recordId", deleteRecord);

module.exports = vegetableRouter;
