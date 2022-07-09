const CustomAPIError = require("./custom-error");
const { StatusCodes } = require("http-status-codes");

// 401
class Unauthenticated extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = Unauthenticated;
