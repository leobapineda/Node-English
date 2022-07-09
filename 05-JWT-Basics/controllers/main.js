var jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");
const dashboard = (req, res, next) => {
  // recibir token
  const authHeader = req.headers.authorization;

  // hacer algo si es incorrecto
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("no token was provided, go to hell", 401);
  }
  // hacer algo si es correcto
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const randomNumber = Math.random() * 100;
    res
      .status(200)
      .json({ msg: `hi ${decoded.username} your data is ${randomNumber}` });
    console.log(decoded);
  } catch (error) {
    console.log(error);
    next("can not access dashboard")
  }
};

const login = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomAPIError("must provide username and password", 404);
  }

  try {
    const token = jwt.sign({ username, password }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.status(200).json({ msg: "user created", token });
  } catch (error) {
    console.log(error);
    throw new CustomAPIError("must provide username and password", 404);
  }
};

module.exports = { dashboard, login };
