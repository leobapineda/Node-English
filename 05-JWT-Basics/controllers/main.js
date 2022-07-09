var jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");
const dashboard = (req, res) => {
  // hacer algo si es correcto
  const randomNumber = Math.random() * 100;
  res.status(200).json({ msg: `hi ${req.user.username} your data is ${randomNumber}` });
  
};

const login = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomAPIError("must provide username and password", 404);
  }

  try {
    const id = new Date().getDate()
    const token = jwt.sign({ username, password, id }, process.env.JWT_SECRET, {expiresIn: "30d"});
    res.status(200).json({ msg: "user created", token });
  } catch (error) {
    console.log(error);
    throw new CustomAPIError("must provide username and password", 404);
  }
};

module.exports = { dashboard, login };
