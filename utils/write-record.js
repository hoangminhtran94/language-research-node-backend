const fs = require("fs");

exports.writeRecord = (newRecord) => {
  const rawData = fs.readFileSync("../new-record.json");
  const records = JSON.parse(rawData);
  records.push(newRecord);
  fs.writeFileSync("../new-record.json", JSON.stringify(records));
};
