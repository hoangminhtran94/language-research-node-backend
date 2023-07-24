/**
 * @author Minh Hoang Tran
 * @studentNumber 041016957
 * @module DAOUnitTest
 * @description This test script contains unit tests for the DAO functions that interact with the database using Prisma. The functions being tested are writeRecord, getRecords, getARecord, updateARecord, and deleteARecord.
 */

// Import the function to be tested
const { writeRecord } = require("../utils/DAO");

// Import the Prisma client (you need to adjust the path according to your project structure)
const prisma = require("../utils/db");

// Mock the prisma.vegetableRecord.create function
jest.mock("../utils/db", () => ({
  vegetableRecord: {
    create: jest.fn(),
  },
}));

/**
 * Unit tests for the writeRecord function.
 */
describe("Write new record - Minh Hoang Tran", () => {
  afterEach(() => {
    prisma.vegetableRecord.create.mockClear();
  });

  it("should create a new record with the given data", async () => {
    // Test data for the new record
    const newRecord = {
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

    // Mock the resolved value of prisma.vegetableRecord.create
    prisma.vegetableRecord.create.mockResolvedValue({
      ...newRecord,
      UUID: "2",
    });

    // Call the writeRecord function
    const result = await writeRecord(newRecord);

    // Assertions
    expect(prisma.vegetableRecord.create).toHaveBeenCalledWith({
      data: { ...newRecord },
    });
    expect(result).toEqual({ ...newRecord, UUID: "2" });
  });
});
