/**
VegetableRecord class representing a vegetable record.
*/
class VegetableRecord {
  DGUID = "";
  type_of_storage = "Cold and common storage";
  UOM = "Tonnes";
  UOM_ID = 288;
  SCALAR_FACTOR = "units";
  SCALAR_ID = 0;
  STATUS = "";
  SYMBOL = "";
  TERMINATED = "";
  DECIMALS = 0;
  /**
  
  Creates a new instance of VegetableRecord.
  @param {Object} data - The data object containing the record properties.
  @author Minh Hoang Tran - 041016957
  */
  constructor({ GEO, type_of_product, VECTOR, COORDINATE, VALUE, REF_DATE }) {
    this.REF_DATE = REF_DATE;
    this.GEO = GEO;
    this.type_of_product = type_of_product;
    this.VECTOR = VECTOR.startsWith("v") ? VECTOR : "v" + VECTOR;
    this.COORDINATE = COORDINATE;
    this.VALUE = VALUE;
  }
}

module.exports = VegetableRecord;
