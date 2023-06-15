const express = require("express");
const {
  getAll,
  addNewRecord,
  getRecord,
  getNewRecords,
  updateRecord,
  deleteRecord,
} = require("../controller/vegetable-controller");
const vegetableRouter = express.Router();

vegetableRouter.get("/", getAll);
vegetableRouter.post("/", addNewRecord);
vegetableRouter.get("/new-records", getNewRecords);
vegetableRouter.get("/:recordId", getRecord);
vegetableRouter.post("/:recordId", updateRecord);
vegetableRouter.delete("/:recordId", deleteRecord);
module.exports = vegetableRouter;
