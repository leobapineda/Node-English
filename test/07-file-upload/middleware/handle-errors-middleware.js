const handleErrorsMiddleware = (err, req, res, next) => {
  console.log(err);
  const customError = {
    message: err.message || "Oops, something whent wrong, try again later",
    statusCode: err.statusCode || 500,
  };

  if (err.code === 11000) {
    customError.message = "A product with this name already exists.";
    customError.statusCode = 409;
  }

  if (err.name === "ValidationError") {
    const all = Object.keys(err.errors).join(", ");
    customError.message = `Must provide ${all}`;
    customError.statusCode = 400;
  }
  res.status(customError.statusCode).json({ msg: customError.message });
};

module.exports = handleErrorsMiddleware;
