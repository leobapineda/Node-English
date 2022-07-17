const jwt = require("jsonwebtoken");
require("express-async-errors");
const {BadRequest, CustomError, Unauthorized} = require("../errors/index")
const jwtAuth = async (req, res, next) => {
  // recive token from headers
  const BearerToken = req.headers.authorization;
  try {
    if (!BearerToken || !BearerToken.startsWith("Bearer ")) {
      throw new Unauthorized("Invalid token provided")
    }
    const token = BearerToken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SecretTokenKey);
    const { userName, userId } = decoded;
    req.user = { userName, userId };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = jwtAuth;
