const moongose = require("mongodb");

const connectDB = (uri) => {
  return moongose.connect(uri, {useUnifiedTopology: true, });
};

module.exports = connectDB;
