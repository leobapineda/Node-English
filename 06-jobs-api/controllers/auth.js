const userModel = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const newUser = await userModel.create({
    name,
    email,
    password: hashPassword,
  });
  console.log(newUser);
  res.status(StatusCodes.CREATED).json({ newUser });
};

const login = async (req, res) => {
  res.status(201).send("login");
};

module.exports = { register, login };
