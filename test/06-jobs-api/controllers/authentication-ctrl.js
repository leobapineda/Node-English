require("express-async-errors");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const userModel = require("../model/user-schema");
const { BadRequest, CustomError } = require("../errors/index");

const register = async (req, res) => {
  const User = await userModel.create(req.body);
  const token = await User.createToken();
  const { _id: UserId, name: UserName } = User;
  res.status(200).json({ UserId, UserName, token });
};

const login = async (req, res) => {
  const { email, password: givenPassword } = req.body;
  if (!email || !givenPassword) {
    throw new BadRequest("provide email and password");
  }
  const User = await userModel.findOne({ email });
  if (!User) {
    throw new BadRequest("no user found");
  }
  const isPassword = await User.passwordAuthentication(givenPassword);
  if (!isPassword) {
    throw new BadRequest("wrong password");
  }
  const { name } = User;
  const token = await User.createToken();
  res.status(200).json({ name, msg: `welcome ${name}`, token });
};

module.exports = { register, login };
