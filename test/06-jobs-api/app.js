require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require("./db/connect");
const authRouter = require("./routes/authentication-route");
const jobRouter = require("./routes/jobs-route");
const jwtAuth = require("./middleware/auth");
// HANDLE ERRORS
const {BadRequest, CustomError, Unauthorized, notFound} = require("./errors/index");
const errorHanlder = require("./middleware/error-handler");
app.use(express.json());

app.use("/v1/auth/", authRouter);
app.use("/v1/job/", jwtAuth, jobRouter);

app.use(errorHanlder);
app.use(notFound);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("connected");
    app.listen(port, () => {
      console.log("app listening on port " + port);
    });
  } catch (err) {
    console.log(err)
    throw new BadRequest("connection failed, try again later")
  }
};
start();
