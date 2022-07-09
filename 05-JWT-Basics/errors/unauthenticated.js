const CustomAPIError = require("./custom-error");

// 401
class Unauthenticated extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = Unauthenticated;
