const express = require("express");
const { getAll } = require("../controller/vegetable-controller");
const vegetableRouter = express.Router();

vegetableRouter.get("/", getAll);

module.exports = vegetableRouter;
