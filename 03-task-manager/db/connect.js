const mongoose = require("mongoose")

const connectDB = (uri) => {
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
  })
}

module.exports = connectDB