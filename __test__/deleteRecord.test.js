const { deleteRecord } = require("../controller/vegetable-controller");
const { getARecord, deleteARecord } = require("../utils/query-record");

/**
 * Mocks the "getARecord" and "deleteARecord" functions from "../utils/query-record" module.
 * @author Minh Hoang Tran
 */
jest.mock("../utils/query-record", () => ({
  getARecord: jest.fn(),
  deleteARecord: jest.fn(),
}));

/**
 * Test suite for the "deleteRecord" function.
 * @author Minh Hoang Tran
 */
describe("deleteRecord", () => {
  /**
   * Test case: should remove a record from the sequential data structure.
   */
  it("should remove a record from the sequential data structure", async () => {
    /**
     * Valid record ID to be used in the test.
     * @type {string}
     * @author Minh Hoang Tran
     */
    const recordId = "123456";

    // Mock the getARecord function to return a record
    getARecord.mockResolvedValueOnce({ id: recordId });

    // Mock the deleteARecord function to do nothing
    deleteARecord.mockImplementationOnce(() => {});

    /**
     * Mock request object.
     * @type {Object}
     * @author Minh Hoang Tran
     */
    const req = { params: { recordId } };

    /**
     * Mock response object with required functions.
     * @type {Object}
     * @author Minh Hoang Tran
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
  it("should return an error if the record is not found", async () => {
    /**
     * Non-existent record ID to be used in the test.
     * @type {string}
     * @author Minh Hoang Tran
     */
    const recordId = "123456";

    // Mock the getARecord function to return null
    getARecord.mockResolvedValueOnce(null);

    /**
     * Mock request object.
     * @type {Object}
     * @author Minh Hoang Tran
     */
    const req = { params: { recordId } };

    /**
     * Empty response object.
     * @type {Object}
     * @author Minh Hoang Tran
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
