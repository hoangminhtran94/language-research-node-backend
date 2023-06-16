const fs = require("fs");
exports.readCSV = async (filepath) => {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(filepath, "utf8", (err, contents) => {
      /**
       * If failed to read the file, log the error and return
       */
      if (err) {
        console.error(err);
        return resolve(null);
      }
      /**
       * Create an array to store all record data
       */

      const finalData = [];

      /**
       * reate an array of strings by split the contents by the special value "\n"  (new line)
       */
      const rows = contents.split("\n");

      /**
       * splice the first row from rows, which contains table labels. Remove the `"` and split the string into
       * an array of string using ","
       */
      const deletedlabels = rows.splice(0, 1);
      const labels = [
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
      /**
       * Loop through all the row data, remove the `"` and split value data using ","
       */
      rows.forEach((rawRowData) => {
        /**
         *  Remove the `"`  in raw data
         */
        const rowData = rawRowData.replace(/"/g, "");
        /**
         *  split raw string into an array of string using ","
         */
        const cells = rowData.split(",");

        /**
         *  Create an empty record data object
         */
        let dataObject = {};

        /**
         * Loop through all cells, for each cell, pick an label from the label array and match with the value of the cell using
         * Javascript spread operator
         *  Student name: Minh Hoang Tran
         */
        cells.forEach((cell, index) => {
          dataObject = { ...dataObject, [labels[index]]: cell };
        });

        /**
         * Push the record data into the record list
         */
        finalData.push(dataObject);
      });
      /**
       * Display the result in the terminal
       */
      console.log("Deleloped by Minh Hoang Tran");
      resolve(finalData);
    });
  });

  return await promise;
};
