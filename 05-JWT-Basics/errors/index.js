// inport all the errors here

const CustomAPIError = require("../errors/custom-error")
const Unauthenticated  = require("../errors/unauthenticated")
const Badrequests  = require("../errors/badrequests")

module.exports = {CustomAPIError, Unauthenticated, Badrequests}