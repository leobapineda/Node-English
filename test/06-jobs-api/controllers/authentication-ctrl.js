require("express-async-errors");
const userModel = require("../model/user-schema");
const { BadRequest, CustomError } = require("../errors/index");

const register = async (req, res) => {
  const User = await userModel.create(req.body);
  res.status(200).json({ User });
  
};

const login = (req, res) => {
  res.status(200).json({ msg: "login" });
};

module.exports = { register, login };
