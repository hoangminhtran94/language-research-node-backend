const fs = require("fs");
const { readCSV, csvToRawString } = require("./read-csv");
const filePath = "./new-record.csv";

/**

Utility function to write a record to a CSV file.
@author Minh Hoang Tran - 041016957
@param {Object} newRecord - The new record to be written.
@throws {Error} - Throws an error if the file write operation fails.
*/
exports.writeRecord = async (newRecord) => {
  const exitingRecords = fs.readFileSync(filePath, "utf-8");
  const newData = [
    newRecord.UUID,
    newRecord.REF_DATE,
    newRecord.GEO,
    newRecord.DGUID,
    newRecord.type_of_product,
    newRecord.type_of_storage,
    newRecord.UOM,
    newRecord.UOM_ID,
    newRecord.SCALAR_FACTOR,
    newRecord.SCALAR_ID,
    newRecord.VECTOR,
    newRecord.COORDINATE,
    newRecord.VALUE,
    newRecord.STATUS,
    newRecord.SYMBOL,
    newRecord.TERMINATED,
    newRecord.DECIMALS,
  ];
  const updatedRecords = exitingRecords + "\n" + newData.join(",");
  try {
    fs.writeFileSync(filePath, updatedRecords);
  } catch (error) {
    throw error;
  }
};

/**

Utility function to retrieve all records from a CSV file.
@author Minh Hoang Tran - 041016957
@returns {Array} - Returns an array of records.
@throws {Error} - Throws an error if the file read operation fails.
*/
exports.getRecords = async () => {
  let records;
  try {
    records = await readCSV(filePath);
  } catch (error) {
    throw error;
  }
  return records;
};

/**
Utility function to retrieve a specific record by its UUID from a CSV file.
@author Minh Hoang Tran - 041016957
@param {string} UUID - The UUID of the record to retrieve.
@returns {Object|null} - Returns the found record object or null if not found.
@throws {Error} - Throws an error if the file read operation fails.
*/
exports.getARecord = async (UUID) => {
  let records;
  try {
    records = await readCSV(filePath);
  } catch (error) {
    throw error;
  }
  return records.find((record) => record.UUID === UUID);
};

/**

Utility function to update a specific record in a CSV file.
@author Minh Hoang Tran - 041016957
@param {string} UUID - The UUID of the record to update.
@param {Object} newData - The updated data for the record.
@throws {Error} - Throws an error if the file write operation fails.
*/
exports.updateARecord = async (UUID, newData) => {
  const rawData = await csvToRawString(filePath);
  let index = rawData.findIndex((row) => row.includes(UUID));
  const updatedRecord = [
    newData.UUID,
    newData.REF_DATE,
    newData.GEO,
    newData.DGUID,
    newData.type_of_product,
    newData.type_of_storage,
    newData.UOM,
    newData.UOM_ID,
    newData.SCALAR_FACTOR,
    newData.SCALAR_ID,
    newData.VECTOR,
    newData.COORDINATE,
    newData.VALUE,
    newData.STATUS,
    newData.SYMBOL,
    newData.TERMINATED,
    newData.DECIMALS,
  ];
  rawData[index] = updatedRecord.join(",");
  const updatedData = rawData.join("\n");
  try {
    fs.writeFileSync(filePath, updatedData);
  } catch (error) {
    throw error;
  }
};

/**

Utility function to delete a specific record from a CSV file.
@author Minh Hoang Tran - 041016957
@param {string} UUID - The UUID of the record to delete.
@throws {Error} - Throws an error if the file write operation fails.
*/
exports.deleteARecord = async (UUID) => {
  const rawData = await csvToRawString(filePath);
  let index = rawData.findIndex((row) => row.includes(UUID));
  rawData.splice(index, 1);
  const updatedData = rawData.join("\n");
  try {
    fs.writeFileSync(filePath, updatedData);
  } catch (error) {
    throw error;
  }
};
