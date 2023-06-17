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
vegetableRouter.get("/", getAll);
vegetableRouter.use(formParser.none()).post("/", addNewRecord);
vegetableRouter.get("/:recordId", getRecord);
vegetableRouter.post("/:recordId", updateRecord);
vegetableRouter.delete("/:recordId", deleteRecord);
module.exports = vegetableRouter;
