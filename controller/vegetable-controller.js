const { readCSV } = require("../utils/read-csv");
const VegetableRecord = require("./../models/vegetable-record");
const { writeRecord } = require("../utils/write-record");
exports.getAll = async (req, res, next) => {
  const data = await readCSV("./32100260.csv");
  return res.json(data).status(201);
};

exports.addNewRecord = async (req, res, next) => {
  const data = req.body;
  const newRecord = new VegetableRecord({
    geo: data.geo,
    typeOfProduct: data.typeOfProduct,
    vector: data,
    vector,
    cordinate: data.cordinate,
    value: data.value,
  });
  try {
    writeRecord(newRecord);
  } catch (error) {
    return next(error);
  }
  return res.json(newRecord).status(201);
};
