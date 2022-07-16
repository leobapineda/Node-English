require("express-async-errors");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const userModel = require("../model/user-schema");
const { BadRequest, CustomError } = require("../errors/index");

const register = async (req, res) => {
  const User = await userModel.create(req.body);
  const token = await User.createToken()
  const { _id: UserId, name: UserName } = User;
  res.status(200).json({ UserId, UserName, token });
};

const login = (req, res) => {
  res.status(200).json({ msg: "login" });
};

module.exports = { register, login };
