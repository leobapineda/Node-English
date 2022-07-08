const CustomAPIError  = require("../errors/custom-error");

const dashboard = (req, res) => {
  const number = Math.random() * 100;
  res.status(200).json({ msg: `hi, your number is ${number}` });
};

const login = (req, res) => {
  const { pass, user } = req.body;
  if (!user || !pass) {
    throw new CustomAPIError("must provide user and pass", 404);
  }
  res.status(200).json(req.body);
};

module.exports = {
  dashboard,
  login,
};

// autentication
// autorizacion 

