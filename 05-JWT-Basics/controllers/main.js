var jwt = require("jsonwebtoken");
const {Badrequests} = require("../errors/index")

const {
  ReasonPhrases,
  StatusCodes,
} = require("http-status-codes");

const dashboard = (req, res) => {
  // hacer algo si es correcto
  const randomNumber = Math.random() * 100;
  res
    .status(StatusCodes.OK)
    .json({ msg: `hi ${req.user.username} your data is ${randomNumber}` });
};

const login = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new Badrequests(ReasonPhrases.BAD_REQUEST);
  }

  try {
    const id = new Date().getDate();
    const token = jwt.sign({ username, password, id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    // res.status(StatusCodes.OK).json({ msg: "user created", token });
    res.status(StatusCodes.CREATED).json({ msg: ReasonPhrases.CREATED, token });
  } catch (error) {
    console.log(error);
    throw new Badrequests(ReasonPhrases.BAD_REQUEST);
  }
};

module.exports = { dashboard, login };
