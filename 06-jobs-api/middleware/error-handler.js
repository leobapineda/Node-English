const errorHandlerMiddleware = (err, req, res, next) => {
  const { StatusCodes } = require("http-status-codes");
  const CustomAPIError = require("../errors/custom-api");
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Somehting went wrong, try again later",
  };

  if (err.code || err.code == 11000) {
    customError.statusCode = 401;
    customError.msg = `${Object.keys(err.keyValue)} is not available `;
  }

  if ((err.name === "ValidationError")) {
    // si tenemos un error de validacion entramos al objecto y convertimos los valores de errors en un array, eso nos permite hacer un map en ellos y devolver solo el mensage que remos con item.message, y luego para darle una mejor sintaxis lo podemos unir con una coma join(" , "), el resultado es;
    // si el usuario no da email: "msg": "Must provide email"
    // si el usuario no da password: "msg": "Must provide password"
    // si el usuario no da password ni email: "msg": "Must provide email , Must provide password"
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(" , ");
    customError.statusCode = 400;
  }
  // if (err instanceof CustomAPIError) {
  //   res.status(err.statusCode).json({ msg: err.msg });
  // }

  if ((err.name === "CastError")) {
  // return res.status(customError.statusCode).json(err);
  customError.msg = `no job found with id ${err.value}`
  customError.statusCode = 404
  }


  console.log("i am errorHandlerMiddleware");
  res.status(customError.statusCode).json({ msg: customError.msg });
  // res.status(customError.statusCode).json({ err });
};

module.exports = errorHandlerMiddleware;
