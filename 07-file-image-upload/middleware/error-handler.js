const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  // crear un elemento que reciba todos mis errores, y cambie segun la info de mis errrores

  let customError = {
    msg: err.message || "Something went wrong try again later",
    statusCode: err.satusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  if(err.code === 11000) {
    customError.msg = "Product name already exists, try with another";
    customError.statusCode = StatusCodes.NON_AUTHORITATIVE_INFORMATION;
  }

  console.log(err);
  res.status(customError.statusCode).json({ msg: customError.msg });
  // res.status(customError.statusCode).json({err });


};

module.exports = errorHandlerMiddleware;
