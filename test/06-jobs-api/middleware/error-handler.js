const { CustomError } = require("../errors/index");
const errorHanlder = (err, req, res, next) => {
  const customError = {
    message: err.message || "something went wrong",
    satusCode: err.satusCode || 500,
  };

  console.log("i am errorHandlerMiddleware");
  // res.status(customError.satusCode).json({ msg: customError.message });
  res.status(customError.satusCode).json({ err });
};

module.exports = errorHanlder;
