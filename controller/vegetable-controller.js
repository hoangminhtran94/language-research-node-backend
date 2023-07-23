const VegetableRecord = require("./../models/vegetable-record");
const { v4 } = require("uuid");
const {
  getRecords,
  writeRecord,
  getARecord,
  updateARecord,
  deleteARecord,
} = require("../utils/DAO");
const prisma = require("../utils/db");

/**
Controller function to get all vegetable records.
@author Minh Hoang Tran - 041016957
@param {Object} req - The request object.
@param {Object} res - The response object.
@param {Function} next - The next middleware function.
@returns {Object} - Returns a JSON response with the vegetable records and record length.
*/
exports.getAll = async (req, res, next) => {
  // Retrieve the requested page from the query parameter, defaulting to 1 if not provided
  let page = req.query?.page ? +req.query.page : 1;
  let records;
  try {
    // Get all vegetable records
    records = await getRecords();
  } catch (error) {
    // Handle errors by setting records to an empty array
    records = [];
  }

  if (records) {
    // If records are available, return a JSON response with a subset of records based on the requested page
    console.log(records[0]);
    return res.status(201).json({
      records: records.slice((page - 1) * 100, (page - 1) * 100 + 100),
      recordLength: records.length,
    });
  }

  // If no records are available, return an empty array and record length of 0
  return res.status(201).json({ records: [], recordLength: 0 });
};

/**

Controller function to add a new vegetable record.
@author Minh Hoang Tran - 041016957
@param {Object} req - The request object.
@param {Object} res - The response object.
@param {Function} next - The next middleware function.
@returns {Object} - Returns a JSON response with the newly added vegetable record.
*/
exports.addNewRecord = async (req, res, next) => {
  const data = req.body;
  let newRecord;
  try {
    // Create a new VegetableRecord instance with the provided data
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
    // If an error occurs while creating the new record, pass it to the error handling middleware
    return next(error);
  }

  try {
    // Write the new record to the data source
    await writeRecord(newRecord);
  } catch (error) {
    // If an error occurs while writing the record, pass it to the error handling middleware
    return next(error);
  }

  // Return a JSON response with the newly added record
  return res.status(201).json(newRecord);
};

/**

Controller function to get a specific vegetable record.
@author Minh Hoang Tran - 041016957
@param {Object} req - The request object.
@param {Object} res - The response object.
@param {Function} next - The next middleware function.
@returns {Object} - Returns a JSON response with the requested vegetable record.
*/
exports.getRecord = async (req, res, next) => {
  const { recordId } = req.params;
  let record;
  try {
    // Retrieve the requested record by its ID
    record = await getARecord(recordId);
  } catch (error) {
    // If an error occurs while retrieving the record, pass it to the error handling middleware
    return next(error);
  }
  // Return a JSON response with the requested record
  return res.status(201).json(record);
};

/**

Controller function to update a specific vegetable record.
@author Minh Hoang Tran - 041016957
@param {Object} req - The request object.
@param {Object} res - The response object.
@param {Function} next - The next middleware function.
@returns {Object} - Returns a JSON response with a success message.
*/
exports.updateRecord = async (req, res, next) => {
  const { recordId } = req.params;
  // Retrieve the current record by its ID
  let currentRecord = await getARecord(recordId);

  if (!currentRecord) {
    // If the current record is not found, pass an error to the error handling middleware
    return next(new Error("Not found"));
  }

  const newData = req.body;

  // Create an updated record with the provided data
  let updatedRecord = new VegetableRecord({
    REF_DATE: currentRecord.REF_DATE,
    GEO: newData.GEO,
    type_of_product: newData.type_of_product,
    VECTOR: newData.VECTOR,
    COORDINATE: newData.COORDINATE,
    VALUE: +newData.VALUE,
  });

  try {
    // Update the record in the data source
    await updateARecord(recordId, updatedRecord);
  } catch (error) {
    // If an error occurs while updating the record, pass it to the error handling middleware
    return next(error);
  }

  // Return a JSON response with a success message
  return res.status(201).json({ message: "Success" });
};

/**

Controller function to delete a specific vegetable record.
@author Minh Hoang Tran - 041016957
@param {Object} req - The request object.
@param {Object} res - The response object.
@param {Function} next - The next middleware function.
@returns {Object} - Returns a JSON response with a success message.
*/
exports.deleteRecord = async (req, res, next) => {
  const { recordId } = req.params;
  // Retrieve the current record by its ID
  let currentRecord = await getARecord(recordId);

  if (!currentRecord) {
    // If the current record is not found, pass an error to the error handling middleware
    return next(new Error("Not found"));
  }

  try {
    // Delete the record from the data source
    await deleteARecord(recordId);
  } catch (error) {
    // If an error occurs while deleting the record, pass it to the error handling middleware
    next(error);
  }

  // Return a JSON response with a success message
  return res.status(201).json({ message: "Success" });
};
