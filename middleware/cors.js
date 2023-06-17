/**

Middleware function to handle CORS (Cross-Origin Resource Sharing) headers.
@param {Object} req - The request object.
@param {Object} res - The response object.
@param {Function} next - The next middleware function.
*/
const corsHandler = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
};

module.exports = corsHandler;
