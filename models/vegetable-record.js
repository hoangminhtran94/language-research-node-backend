class VegetableRecord {
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
  constructor({ UUID, GEO, type_of_product, VECTOR, COORDINATE, VALUE }) {
    this.UUID = UUID;
    this.GEO = GEO;
    this.type_of_product = type_of_product;
    this.VECTOR = VECTOR.startsWith("v") ? VECTOR : "v" + VECTOR;
    this.COORDINATE = COORDINATE;
    this.VALUE = VALUE;
  }
}

module.exports = VegetableRecord;
