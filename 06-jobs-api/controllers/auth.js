require('dotenv').config()
const userModel = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
 try{
   const newUser = await userModel.create(req.body);
   const {_id:userId, name:userName} = newUser
   const token = jwt.sign({ userId, userName }, process.env.JWT_SECRET_KEY, { expiresIn: "30 days" });
  res.status(StatusCodes.CREATED).json({ name: newUser.findName(), token });
 }
 catch(err) {
  console.log(err)
  res.status(401).send(err);
 }
};

const login = async (req, res) => {
  res.status(201).send("login");
};

module.exports = { register, login };
