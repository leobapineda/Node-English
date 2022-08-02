const handleErrorsMiddleware = (err, req, res, next) => {
  const customError = {
    message: err.msg || "Oops, something whent wrong, try again later",
    statusCode: err.statusCode || 500,
  };

  if (err.code === 11000) {
    customError.message = "A product with this name already exists.";
    customError.statusCode = 409;
  }

  if (err.name === "ValidationError") {
    const all = Object.keys(err.errors);
    customError.message = `Must provide ${all}`;
    customError.statusCode = 400;
    console.log(all);
  }
  console.log(customError.message);
  res.status(customError.statusCode).json({ msg: customError.message });
    // res.status(customError.statusCode).json({ err });
};

module.exports = handleErrorsMiddleware;
