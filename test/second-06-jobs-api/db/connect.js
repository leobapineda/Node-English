const mongoose = require("mongoose")

const connectDB = async (URI) => {
  return await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = connectDB