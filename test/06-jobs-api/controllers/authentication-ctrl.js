require("express-async-errors");
const { StatusCodes } = require("http-status-codes");
const { BadRequest, Unauthorized } = require("../errors/index");
const userModel = require("../model/user-schema");
const register = async (req, res) => {
  const User = await userModel.create(req.body);
  const token = await User.createToken();
  const { _id: UserId, name: UserName } = User;
  res.status(StatusCodes.CREATED).json({ UserId, UserName, token });
};

const login = async (req, res) => {
  const { email, password: givenPassword } = req.body;
  if (!email || !givenPassword) {
    throw new BadRequest("Must provide email and password");
  }
  const User = await userModel.findOne({ email });
  if (!User) {
    throw new BadRequest(
      "The email you entered is not connected to an account."
    );
  }
  const isPassword = await User.passwordAuthentication(givenPassword);
  if (!isPassword) {
    throw new Unauthorized("The password you have entered is incorrect.");
  }
  const { name } = User;
  const token = await User.createToken();
  res.status(StatusCodes.OK).json({ name, msg: `Welcome ${name}`, token });
};

module.exports = { register, login };
