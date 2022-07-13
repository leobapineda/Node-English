var jwt = require("jsonwebtoken");
const {
    CustomAPIError,
    UnauthenticatedError,
    NotFoundError,
    BadRequestError,
  } = require("../errors/index");

const authenticationMiddleware = async (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("token invalid")
  }
  try {
    const token = tokenHeader.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { userName, userId } = decoded;
    req.user = { userName, userId };
    next();
  } catch (err) {
    console.log(err);
    throw new UnauthenticatedError("token invalid catch err")
  }
};

module.exports = authenticationMiddleware;
