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
  constructor({
    UUID,
    GEO,
    type_of_product,
    VECTOR,
    COORDINATE,
    VALUE,
    REF_DATE,
  }) {
    this.REF_DATE = REF_DATE;
    this.UUID = UUID;
    this.GEO = GEO;
    this.type_of_product = type_of_product;
    this.VECTOR = VECTOR.startsWith("v") ? VECTOR : "v" + VECTOR;
    this.COORDINATE = COORDINATE;
    this.VALUE = VALUE;
  }
}

module.exports = VegetableRecord;
