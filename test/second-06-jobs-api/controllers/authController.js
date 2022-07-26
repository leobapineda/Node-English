require("dotenv").config();
require("express-async-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userSchema = require("../models/UserModel");

const register = async (req, res) => {
  await userSchema.init();
  const createUser = await userSchema.create({ ...req.body });
  
  const { _id: userId, name } = await createUser;
  const token = await createUser.createToken({ name, userId });
  res.status(200).json({ user: createUser, token });
  // token creado, ahora tengo que guardarlo en la cabecera, 
  // al registrarse se inicia secion, entonces debo guardar el token en algun lado

};

const login = (req, res) => {
  res.send("login page");
  // crear token
};

module.exports = { register, login };
// generate token and save it
//
