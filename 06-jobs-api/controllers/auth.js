require("dotenv").config();
const userModel = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("../errors/index");
const register = async (req, res) => {
  try {
    const User = await userModel.create(req.body);
    const { _id: userId, name: userName } = User;
    const token = User.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: userName }, token });
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("provide email and password");
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("invalid credentials user null");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  console.log(isPasswordCorrect);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("invalid credentials !compare");
  }
  const token = await user.createJWT();
  res.status(401).json({ user: { name: user.name }, token });
};

module.exports = { register, login };
