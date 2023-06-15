const errorHandler = (error, req, res, next) => {
  if (error) {
    console.log(error);
    return res
      .json({ error: "Something wrong happened, please try again" })
      .status(500);
  }
  next();
};

module.exports = errorHandler;
