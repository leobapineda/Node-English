const userModel = require("../models/User");

const register = async (req, res) => {
  const { user, pass } = req.body;
  if(!user || !pass) {
    return res.status(401).json({msg:"must provide user and pass"});
  }
  try {
    console.log("try block")
    const {user:userName, pass: passWord} = await userModel.create({user, pass})
    res.status(200).json({userName, passWord});
    console.log("ok")
  } catch (err) {
    console.log(err);
    res.status(401).json({msg:err});
    console.log("error")

  }
};

const login = async (req, res) => {
  res.send("login");
};

module.exports = { register, login };
