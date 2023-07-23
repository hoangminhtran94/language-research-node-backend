// Import the function to be tested
const {
  writeRecord,
  getRecords,
  getARecord,
  updateARecord,
  deleteARecord,
} = require("../utils/DAO");

// Import the Prisma client (you need to adjust the path according to your project structure)
const prisma = require("../utils/db");
// Mock the prisma.vegetableRecord.create function
jest.mock("../utils/db", () => ({
  vegetableRecord: {
    findMany: jest.fn(),
    findFirstOrThrow: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("Write new record", () => {
  afterEach(() => {
    prisma.vegetableRecord.create.mockClear();
  });

  it("should create a new record with the given data", async () => {
    const newRecord = {
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

    prisma.vegetableRecord.create.mockResolvedValue({
      ...newRecord,
      UUID: "2",
    });

    const result = await writeRecord(newRecord);

    expect(prisma.vegetableRecord.create).toHaveBeenCalledWith({
      data: { ...newRecord },
    });
    expect(result).toEqual({ ...newRecord, UUID: "2" });
  });
});

describe("Get all records", () => {
  afterEach(() => {
    prisma.vegetableRecord.findMany.mockClear();
  });

  it("should retrieve records from the database", async () => {
    const sampleData = [
      {
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
      },
    ];

    prisma.vegetableRecord.findMany.mockResolvedValue(sampleData);

    const records = await getRecords();

    expect(prisma.vegetableRecord.findMany).toHaveBeenCalled();
    expect(records).toEqual(sampleData);
  });
});

describe("Get a record", () => {
  afterEach(() => {
    prisma.vegetableRecord.findFirstOrThrow.mockClear();
  });

  it("should retrieve a specific record by UUID", async () => {
    const UUID = "2";
    const recordData = {
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

    prisma.vegetableRecord.findFirstOrThrow.mockResolvedValue(recordData);

    const result = await getARecord(UUID);

    expect(prisma.vegetableRecord.findFirstOrThrow).toHaveBeenCalledWith({
      where: { UUID },
    });
    expect(result).toEqual(recordData);
  });
});

describe("Update a record", () => {
  afterEach(() => {
    prisma.vegetableRecord.update.mockClear();
  });

  it("should update a specific record in the database", async () => {
    const UUID = "2";
    const newData = {
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

    await updateARecord(UUID, newData);

    expect(prisma.vegetableRecord.update).toHaveBeenCalledWith({
      where: { UUID },
      data: { ...newData },
    });
  });
});

describe("Delete a record function", () => {
  afterEach(() => {
    prisma.vegetableRecord.delete.mockClear();
  });

  it("should delete a specific record from the database", async () => {
    const UUID = "2";
    await deleteARecord(UUID);
    expect(prisma.vegetableRecord.delete).toHaveBeenCalledWith({
      where: { UUID },
    });
  });
});
