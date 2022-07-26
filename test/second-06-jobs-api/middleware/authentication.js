require("dotenv").config();
require("express-async-errors");
const jwt = require("jsonwebtoken");
const authenticationMiddleware = async (req, res, next) => {
  const tokenBearer = await req.headers.authorization;
  if (tokenBearer && tokenBearer.startsWith("Bearer")) {
    const token = tokenBearer.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const { userId, name: userName } = decoded;
    req.user = { userId, userName };
    next();
  }
};

module.exports = authenticationMiddleware;
