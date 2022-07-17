const { CustomError } = require("../errors/index");
const errorHanlder = (err, req, res, next) => {
  const customError = {
    message: err.message || "something went wrong",
    statusCode: err.statusCode || 500,
  };

  console.log(err)
  res.status(customError.statusCode).json({ msg: customError.message });
};

module.exports = errorHanlder;
