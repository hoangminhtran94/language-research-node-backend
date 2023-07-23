const { writeRecord } = require("../utils/DAO");
const { createMockContext } = require("../singleton");

let mockCtx;
let ctx;
beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx;
});

test("should create new record", async () => {
  const record = {
    UUID: "2",
    GEO: "British Columbia",
    type_of_product: "Vegetable",
    VECTOR: "v4567",
    COORDINATE: "1.2.4",
    VALUE: 70,
    REF_DATE: "7/23/2023",
    DGUID: "",
    type_of_storage: "Cold and common storage",
    UOM: "Tonnes",
    UOM_ID: 288,
    SCALAR_FACTOR: "units",
    SCALAR_ID: 0,
    STATUS: "",
    SYMBOL: "",
    TERMINATED: "",
    DECIMALS: 0,
  };

  mockCtx.prisma.vegetableRecord.create.mockResolvedValue(record);

  await expect(writeRecord(record, ctx)).resolves.toEqual(record);
});
