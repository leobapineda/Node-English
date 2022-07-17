require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const connectDB = require("./db/connect");
const authRouter = require("./routes/authentication-route");
const jobRouter = require("./routes/jobs-route");
const jwtAuth = require("./middleware/auth")
const {notFound} = require("./errors/index")
app.use(express.json());
// errors
const errorHanlder = require("./middleware/error-handler")

app.use("/v1/auth/", authRouter);
app.use("/v1/job/", jwtAuth, jobRouter);

app.use(errorHanlder);
app.use(notFound);

const start = async () => {
  try {
    console.log("connecting to mongodb");
    await connectDB(process.env.MONGO_URI);
    console.log("connected");
    app.listen(port, () => {
      console.log("app listening on port " + port);
    });
  } catch (err) {
    console.log("i am catch");
    console.log(err);
  }
};
start();
