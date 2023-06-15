const express = require("express");
const { getAll, addNewRecord } = require("../controller/vegetable-controller");
const vegetableRouter = express.Router();

vegetableRouter.get("/", getAll);
vegetableRouter.post("/", addNewRecord);

module.exports = vegetableRouter;
