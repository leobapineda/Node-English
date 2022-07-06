const customError = (err, req, res, next) => {
  console.log("customError");
  console.log(err);
  res.status(500).json({ msg: "something went wrong, try again later" });
};

module.exports = customError;
