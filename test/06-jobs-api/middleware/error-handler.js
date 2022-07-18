const { StatusCodes } = require("http-status-codes");

const errorHanlder = (err, req, res, next) => {
  const customError = {
    message: err.message || "something went wrong",
    statusCode: err.statusCode || 500,
  };

  // duplicate email
  if (err.code === 11000) {
    (customError.message = "Can not use this email, try another"),
      (customError.statusCode = StatusCodes.NOT_ACCEPTABLE);
  }

  // id longer or shorter than accepted
  if (err.name === "CastError") {
    (customError.message = `Id ${err.value} is not valid`),
      (customError.statusCode = StatusCodes.NON_AUTHORITATIVE_INFORMATION);
  }
  console.log(err);
  res.status(customError.statusCode).json({ msg: customError.message });
};

module.exports = errorHanlder;
