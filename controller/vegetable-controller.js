const { readCSV } = require("../utils/read-csv");
const VegetableRecord = require("./../models/vegetable-record");

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
};
