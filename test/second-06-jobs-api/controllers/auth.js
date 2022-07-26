require("express-async-errors");
const jobSchema = require("../models/User");

const register = async (req, res) => {
  const createUser = await jobSchema.create(req.body);
  res.status(200).json(createUser);
};

const login = (req, res) => {
  res.send("login page");
};

module.exports = { register, login };

