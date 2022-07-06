const asyncWraper = (callback) => {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      next(error); //with next we pass the error to the next middleware, that why it must be the last app.use
    }
  };
};

module.exports = asyncWraper;
