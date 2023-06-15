const fs = require("fs");

exports.writeRecord = (newRecord) => {
  let rawData;
  try {
    rawData = fs.readFileSync("../new-record.json");
  } catch (error) {
    throw error;
  }
  const records = JSON.parse(rawData);
  records.push(newRecord);

  try {
    fs.writeFileSync("../new-record.json", JSON.stringify(records));
  } catch (error) {
    throw error;
  }
};
