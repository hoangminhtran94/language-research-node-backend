const fs = require("fs");
const LABELS = [
  "UUID",
  "REF_DATE",
  "GEO",
  "DGUID",
  "type_of_product",
  "type_of_storage",
  "UOM",
  "UOM_ID",
  "SCALAR_FACTOR",
  "SCALAR_ID",
  "VECTOR",
  "COORDINATE",
  "VALUE",
  "STATUS",
  "SYMBOL",
  "TERMINATED",
  "DECIMALS",
];
const checkRecordFile = async (req, res, next) => {
  const filePath = "./new-record.csv";
  try {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        // File does not exist, create it
        fs.writeFile(filePath, LABELS.join(","), (err) => {
          if (err) {
            console.error("Error creating the file:", err);
            return;
          }
          console.log("File created: ./new-record.csv");
        });
      } else {
        // File exists
        console.log("File already exists: ./new-record.csv");
      }
    });
  } catch (error) {
    return next(error);
  }
  next();
};

module.exports = checkRecordFile;
