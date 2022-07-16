require("express-async-errors");
const bcrypt = require("bcryptjs");

const userModel = require("../model/user-schema");
const { BadRequest, CustomError } = require("../errors/index");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  // before creating the user, need to hash the password
  // const salt = bcrypt.genSaltSync(10);
  // const hashPassword = bcrypt.hashSync(password, salt);
  // crete user passing hash password
  // console.log(userModel)
  // const hashPassword = await userModel.hashPassword()
  // console.log(hashPassword)
  const User = await userModel.create({ name, email, password});
  res.status(200).json({ User });
};

const login = (req, res) => {
  res.status(200).json({ msg: "login" });
};

module.exports = { register, login };
