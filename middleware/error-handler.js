/**
Middleware function to handle errors and send an error response.
@author Minh Hoang Tran - 041016957
@param {Error} error - The error object.
@param {Object} req - The request object.
@param {Object} res - The response object.
@param {Function} next - The next middleware function.
*/
const errorHandler = (error, req, res, next) => {
  if (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Something wrong happened, please try again" });
  }
  next();
};
module.exports = errorHandler;
