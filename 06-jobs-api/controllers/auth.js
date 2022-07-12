require("dotenv").config();
const userModel = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const newUser = await userModel.create(req.body);
    const { _id: userId, name: userName } = newUser;
    const token = newUser.createJWT();
    res.status(StatusCodes.CREATED).json({ user:{name: userName}, token });
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
};

const login = async (req, res) => {
  res.status(201).send("login");
};

module.exports = { register, login };
