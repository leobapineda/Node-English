const { CustomError } = require("../errors/index");
const errorHanlder = (err, req, res, next) => {
  const customError = {
    message: err.message || "something went wrong",
    statusCode: err.statusCode || 500,
  };

  console.log(err)
  res.status(customError.statusCode).json({ msg: customError.message });
  // res.status(customError.statusCode).json({ err});
};

module.exports = errorHanlder;


// when the id is not the length that the programs gives, if i remove or add more values to the job id