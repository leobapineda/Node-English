const mongoose = require("mongoose")

const connectDB = async (URI) => {
  return await mongoose.connect(URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
  });
}

module.exports = connectDB