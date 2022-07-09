const CustomAPIError = require("./custom-error");

const { StatusCodes } = require("http-status-codes");

class Badrequests extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = Badrequests;
