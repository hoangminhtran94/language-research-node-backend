const { readCSV } = require("../utils/read-csv");
const VegetableRecord = require("./../models/vegetable-record");
const {
  writeRecord,
  getARecord,
  updateARecord,
  deleteARecord,
} = require("../utils/query-record");

exports.getAll = async (req, res, next) => {
  const data = await readCSV("./32100260.csv");
  return res.json(data).status(201);
};

exports.addNewRecord = async (req, res, next) => {
  const data = req.body;
  let newRecord;
  try {
    newRecord = new VegetableRecord({
      geo: data.geo,
      typeOfProduct: data.typeOfProduct,
      vector: data.vector,
      cordinate: data.cordinate,
      value: +data.value,
    });
  } catch (error) {
    return next(error);
  }
  try {
    writeRecord(newRecord);
  } catch (error) {
    return next(error);
  }
  return res.json(newRecord).status(201);
};

exports.getNewRecords = async (req, res, next) => {
  const { recordId } = req.params;
  let record;
  try {
    record = getARecord(recordId);
  } catch (error) {
    return next(error);
  }
  return res.json(record);
};
