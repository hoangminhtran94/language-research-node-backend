const fs = require("fs");
const VegetableRecord = require("../models/vegetable-record");
exports.writeRecord = (newRecord) => {
  let rawData;
  try {
    rawData = fs.readFileSync("./new-record.json");
  } catch (error) {
    throw error;
  }
  const records = JSON.parse(rawData);
  records.push(newRecord);

  try {
    fs.writeFileSync("./new-record.json", JSON.stringify(records));
  } catch (error) {
    throw error;
  }
};

exports.getRecords = () => {
  let rawData;
  try {
    rawData = fs.readFileSync("./new-record.json");
  } catch (error) {
    throw error;
  }
  const records = JSON.parse(rawData);
  return records;
};

exports.getARecord = (UUID) => {
  let rawData;
  try {
    rawData = fs.readFileSync("./new-record.json");
  } catch (error) {
    throw error;
  }
  const records = JSON.parse(rawData);

  return records.find((record) => record.UUID === UUID);
};

exports.updateARecord = (UUID, newData) => {
  let rawData;
  try {
    rawData = fs.readFileSync("./new-record.json");
  } catch (error) {
    throw error;
  }
  const records = JSON.parse(rawData);

  const currentRecord = records.find((record) => record.UUID === UUID);
  const currentRecordIndex = records.findIndex(
    (record) => record.UUID === UUID
  );
  if (!currentRecord) {
    throw new Error("Not found!");
  }
  const updatedRecord = new VegetableRecord({ ...currentRecord, ...newData });
  records[currentRecordIndex] = updatedRecord;
  try {
    fs.writeFileSync("./new-record.json", JSON.stringify(records));
  } catch (error) {
    throw error;
  }
  return updatedRecord;
};

exports.deleteARecord = (UUID) => {
  let rawData;
  try {
    rawData = fs.readFileSync("./new-record.json");
  } catch (error) {
    throw error;
  }
  const records = JSON.parse(rawData);

  const currentRecordIndex = records.findIndex(
    (record) => record.UUID === UUID
  );
  if (currentRecordIndex < 0) {
    throw new Error("Not found!");
  }
  records.splice(currentRecordIndex, 1);
  try {
    fs.writeFileSync("./new-record.json", JSON.stringify(records));
  } catch (error) {
    throw error;
  }
};
