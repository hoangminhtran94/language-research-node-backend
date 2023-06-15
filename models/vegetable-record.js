const { v4 } = require("uuid");
class VegetableRecord {
  UUID = v4();
  REF_DATE = new Date(Date.now()).toLocaleDateString();
  DGUID = "";
  type_of_storage = "Cold and common storage";
  UOM = "Tonnes";
  UOM_ID = 288;
  SCALAR_FACTOR = "unit";
  SCALAR_ID = 0;
  STATUS = "";
  SYMBOL = "";
  TERMINATED = "";
  DECIMALS = 0;
  constructor({ geo, typeOfProduct, vector, cordinate, value }) {
    this.GEO = geo;
    this.type_of_product = typeOfProduct;
    this.VECTOR = "v" + vector;
    this.COORDINATE = cordinate;
    this.VALUE = value;
  }
}

module.exports = VegetableRecord;
