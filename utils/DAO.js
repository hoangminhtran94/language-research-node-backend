/**
 * @file DAO Functions for interacting with the database using Prisma.
 * @module DAO
 * @description This module contains functions to perform CRUD operations on the vegetableRecord model in the database using Prisma. All functions are asynchronous and return Promises.
 * @author Minh Hoang Tran
 * @studentNumber 041016957
 */

const prisma = require("../utils/db");

/**
 * Writes a new vegetable record to the database.
 * @async
 * @function writeRecord
 * @param {object} newRecord - The new vegetable record to be added to the database.
 * @returns {Promise<object>} - A Promise that resolves to the newly created vegetable record in the database.
 * @throws {Error} - If an error occurs during the database operation.
 * @author Minh Hoang Tran
 * @studentNumber 041016957
 */
exports.writeRecord = async (newRecord) => {
  try {
    return await prisma.vegetableRecord.create({ data: { ...newRecord } });
  } catch (error) {
    throw error;
  }
};

/**
 * Retrieves all vegetable records from the database.
 * @async
 * @function getRecords
 * @returns {Promise<Array<object>>} - A Promise that resolves to an array containing all vegetable records in the database, ordered by REF_DATE in descending order.
 * @throws {Error} - If an error occurs during the database operation.
 * @author Minh Hoang Tran
 * @studentNumber 041016957
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
 * Retrieves a specific vegetable record from the database based on its UUID.
 * @async
 * @function getARecord
 * @param {string} UUID - The UUID of the vegetable record to retrieve.
 * @returns {Promise<object>} - A Promise that resolves to the vegetable record with the specified UUID.
 * @throws {Error} - If the vegetable record with the specified UUID is not found in the database.
 * @author Minh Hoang Tran
 * @studentNumber 041016957
 */
exports.getARecord = async (UUID) => {
  return prisma.vegetableRecord.findFirstOrThrow({ where: { UUID } });
};

/**
 * Updates a specific vegetable record in the database based on its UUID.
 * @async
 * @function updateARecord
 * @param {string} UUID - The UUID of the vegetable record to update.
 * @param {object} newData - The updated data to be applied to the vegetable record.
 * @returns {Promise<void>} - A Promise that resolves when the update is completed.
 * @throws {Error} - If an error occurs during the database operation.
 * @author Minh Hoang Tran
 * @studentNumber 041016957
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
 * Deletes a specific vegetable record from the database based on its UUID.
 * @async
 * @function deleteARecord
 * @param {string} UUID - The UUID of the vegetable record to delete.
 * @returns {Promise<void>} - A Promise that resolves when the record is deleted.
 * @throws {Error} - If an error occurs during the database operation.
 * @author Minh Hoang Tran
 * @studentNumber 041016957
 */
exports.deleteARecord = async (UUID) => {
  try {
    await prisma.vegetableRecord.delete({ where: { UUID } });
  } catch (error) {
    throw error;
  }
};
