const { deleteRecord } = require("../controller/vegetable-controller");
const { getARecord, deleteARecord } = require("../utils/DAO");

/**
 * Mocks the "getARecord" and "deleteARecord" functions from "../utils/DAO" module.
 * @author Minh Hoang Tran - 041016957
 */
jest.mock("../utils/DAO", () => ({
  getARecord: jest.fn(),
  deleteARecord: jest.fn(),
}));

/**
 * Test suite for the "deleteRecord" function.
 * @author Minh Hoang Tran - 041016957
 */
describe("Testing deleteRecord - Programmed by Minh Hoang Tran", () => {
  /**
   * Test case: should remove a record from the sequential data structure.
   */
  it("should remove a record from the sequential data structure - Programmed by Minh Hoang Tran", async () => {
    /**
     * Valid record ID to be used in the test.
     * @type {string}
     *@author Minh Hoang Tran - 041016957
     */
    const recordId = "123456";

    // Mock the getARecord function to return a record
    getARecord.mockResolvedValueOnce({ id: recordId });

    // Mock the deleteARecord function to do nothing
    deleteARecord.mockImplementationOnce(() => {});

    /**
     * Mock request object.
     * @type {Object}
     * @author Minh Hoang Tran - 041016957
     */
    const req = { params: { recordId } };

    /**
     * Mock response object with required functions.
     * @type {Object}
     * @author Minh Hoang Tran - 041016957
     */
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    /**
     * Mock "next" function.
     */
    const next = jest.fn();

    // Invoke the deleteRecord function
    await deleteRecord(req, res, next);

    // Assert function calls and response
    expect(getARecord).toHaveBeenCalledWith(recordId);
    expect(deleteARecord).toHaveBeenCalledWith(recordId);
    expect(res.json).toHaveBeenCalledWith({ message: "Success" });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.status().json).toHaveBeenCalledWith({ message: "Success" });
    expect(next).not.toHaveBeenCalled();
  });

  /**
   * Test case: should return an error if the record is not found.
   */
  it("should return an error if the record is not found - Programmed by Minh Hoang Tran", async () => {
    /**
     * Non-existent record ID to be used in the test.
     * @type {string}
     * @author Minh Hoang Tran - 041016957
     */
    const recordId = "123456";

    // Mock the getARecord function to return null
    getARecord.mockResolvedValueOnce(null);

    /**
     * Mock request object.
     * @type {Object}
     * @author Minh Hoang Tran - 041016957
     */
    const req = { params: { recordId } };

    /**
     * Empty response object.
     * @type {Object}
     * @author Minh Hoang Tran - 041016957
     */
    const res = {};

    /**
     * Mock "next" function.
     */
    const next = jest.fn();

    // Invoke the deleteRecord function
    await deleteRecord(req, res, next);

    // Assert function calls
    expect(getARecord).toHaveBeenCalledWith(recordId);
    expect(next).toHaveBeenCalledWith(new Error("Not found"));
  });
});
