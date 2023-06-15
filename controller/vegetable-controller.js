const { readCSV } = require("../utils/read-csv");

exports.getAll = async (req, res, next) => {
  const data = await readCSV("./32100260.csv");
  return res.json(data).status(201);
};
