require("dotenv").config();
require("express-async-errors");
const port = process.env.PORT || 3000;
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const jobRouter = require("./routes/jobs");
const authRouter = require("./routes/auth");

// extra security packages
const helmet = require("helmet");
var cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

const authenticationMiddleware = require("./middleware/authentication");
// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  })
);
app.use(express.json());
// extra packages
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticationMiddleware, jobRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    console.log("connecting to mongo");
    await connectDB(process.env.MONGO_URI);
    console.log("connected");
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
