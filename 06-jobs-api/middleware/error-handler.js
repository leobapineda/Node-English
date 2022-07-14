const errorHandlerMiddleware = (err, req, res, next) => {
  const { StatusCodes } = require("http-status-codes");
  const CustomAPIError = require("../errors/custom-api");
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Somehting went wrong, try again later",
  };

  if (err.code || err.code == 11000) {
    customError.statusCode = 401;
    customError.msg = `${Object.keys(err.keyValue)} is not available `;
  }
  // if (err instanceof CustomAPIError) {
  //   res.status(err.statusCode).json({ msg: err.msg });
  // }

  console.log("i am errorHandlerMiddleware");
  res.status(customError.statusCode).json({ msg: customError.msg });
  // res.status(customError.statusCode).json({ err });
};

module.exports = errorHandlerMiddleware;
