const VegetableRecord = require("./../models/vegetable-record");
const { v4 } = require("uuid");
const {
  getRecords,
  writeRecord,
  getARecord,
  updateARecord,
  deleteARecord,
} = require("../utils/query-record");

exports.getAll = async (req, res, next) => {
  let page = req.query?.page ? +req.query.page : 1;
  let records;
  try {
    records = await getRecords();
  } catch (error) {
    newdata = [];
  }

  if (records) {
    return res
      .json({
        records: records.slice((page - 1) * 100, (page - 1) * 100 + 100),
        recordLength: records.length,
      })
      .status(201);
  }
  return res.json({ records: [], recordLength: 0 });
};

exports.addNewRecord = async (req, res, next) => {
  const data = req.body;

  let newRecord;
  try {
    newRecord = new VegetableRecord({
      REF_DATE: new Date(Date.now()).toLocaleDateString(),
      UUID: v4(),
      GEO: data.GEO,
      type_of_product: data.type_of_product,
      VECTOR: data.VECTOR,
      COORDINATE: data.COORDINATE,
      VALUE: +data.VALUE,
    });
  } catch (error) {
    return next(error);
  }
  try {
    await writeRecord(newRecord);
  } catch (error) {
    return next(error);
  }
  return res.json(newRecord).status(201);
};

exports.getRecord = async (req, res, next) => {
  const { recordId } = req.params;
  let record;
  try {
    record = await getARecord(recordId);
  } catch (error) {
    return next(error);
  }

  return res.json(record).status(201);
};

exports.updateRecord = async (req, res, next) => {
  const { recordId } = req.params;
  let currentRecord = await getARecord(recordId);
  if (!currentRecord) {
    return next(new Error("Not found"));
  }

  const newData = req.body;
  let updatedRecord = new VegetableRecord({
    UUID: recordId,
    REF_DATE: currentRecord.REF_DATE,
    GEO: newData.GEO,
    type_of_product: newData.type_of_product,
    VECTOR: newData.VECTOR,
    COORDINATE: newData.COORDINATE,
    VALUE: +newData.VALUE,
  });
  try {
    await updateARecord(recordId, updatedRecord);
  } catch (error) {
    return next(error);
  }
  return res.json({ message: "Success" }).status(201);
};

exports.deleteRecord = async (req, res, next) => {
  const { recordId } = req.params;
  let currentRecord = await getARecord(recordId);
  if (!currentRecord) {
    return next(new Error("Not found"));
  }
  try {
    await deleteARecord(recordId);
  } catch (error) {
    next(error);
  }
  return res.json({ message: "Success" }).status(201);
};
