const fs = require("fs");
const { readCSV, csvToRawString } = require("./read-csv");

const filePath = "./new-record.csv";
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

exports.getRecords = () => {
  let records;
  try {
    records = readCSV(filePath);
  } catch (error) {
    throw error;
  }
  return records;
};

exports.getARecord = async (UUID) => {
  let records;
  try {
    records = await readCSV(filePath);
  } catch (error) {
    throw error;
  }
  return records.find((record) => record.UUID === UUID);
};

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
