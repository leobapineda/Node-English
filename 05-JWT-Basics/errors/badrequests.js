const CustomAPIError = require("./custom-error");

class Badrequests extends CustomAPIError{
    constructor(message) {
        super(message);
        this.statusCode = 400
      }
}

module.exports = Badrequests