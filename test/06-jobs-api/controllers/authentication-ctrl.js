require("express-async-errors");
const userModel = require("../model/user-schema");
const { BadRequest, CustomError } = require("../errors/index");

const register = async (req, res) => {
  console.log("register 1")
  const User = await userModel.create({});
  console.log("register 2")
  res.status(200).json({ User });
  console.log("register 3")
};

const login = (req, res) => {
  res.status(200).json({ msg: "login" });
};

module.exports = { register, login };
