const jwt = require("jsonwebtoken");

const CustomAPIError = require("../errors/custom-error");

const dashboard = (req, res) => {
  // jwt.verify(token, process.env.JWT_SECRET, [options, callback])

  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("no token provided", 401);
  }

  const token = authHeader.split(" ")[1];
  console.log(token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded); // bar
    const number = Math.random() * 100;
    res
      .status(200)
      .json({ msg: `hi ${decoded.username}, your number is ${number}` });
  } catch (error) {
    console.log(error);
    throw new CustomAPIError("not authorize to access dashboard", 401);
  }
};

const login = (req, res, next) => {
  const { password, username } = req.body;
  if (!username || !password) {
    throw new CustomAPIError("must provide username and password", 404);
  }

  try {
    const id = new Date().getDate();
    console.log("login");
    // const token = jwt.sign(payload, secretOrPrivateKey, [options, callback])
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.status(200).json({ msg: "username created", token });
  } catch (error) {
    console.log(error);
    next("catch error");
  }
};

module.exports = {
  dashboard,
  login,
};
