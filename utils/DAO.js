const fs = require("fs");
const prisma = require("../utils/db");
const { readCSV, csvToRawString } = require("./read-csv");
const filePath = "./new-record.csv";

/**

Utility function to write a record to a CSV file.
@author Minh Hoang Tran - 041016957
@param {Object} newRecord - The new record to be written.
@throws {Error} - Throws an error if the file write operation fails.
*/
exports.writeRecord = async (newRecord) => {
  /**
   * @author Minh Hoang Tran - 041016957
   */
  //join newData array to a string and combine the exsiting records with the new data

  try {
    await prisma.vegetableRecord.create({ data: { ...newRecord } });
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
    records = await prisma.vegetableRecord.findMany({
      orderBy: { REF_DATE: "desc" },
    });
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
  return prisma.vegetableRecord.findFirstOrThrow({ where: { UUID } });
};

/**

Utility function to update a specific record in a CSV file.
@author Minh Hoang Tran - 041016957
@param {string} UUID - The UUID of the record to update.
@param {Object} newData - The updated data for the record.
@throws {Error} - Throws an error if the file write operation fails.
*/
exports.updateARecord = async (UUID, newData) => {
  try {
    await prisma.vegetableRecord.update({
      where: { UUID },
      data: { ...newData },
    });
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
  try {
    await prisma.vegetableRecord.delete({ where: { UUID } });
  } catch (error) {
    throw error;
  }
};
