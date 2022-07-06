require("dotenv").config()
const connectDB = require("./db/connect")
const jsonProducts = require("./products.json")
const Product = require("./models/products")

const start = async () => {
  try {
    console.log("connecting...");

    await connectDB(process.env.MONGO_URI)
    console.log("connected to mongoDB");
    // await Product.deleteMany()
    await Product.create(jsonProducts)
    console.log("product created")
    process.exit(0)
  }
  catch(err) {
    console.log(err)
    process.exit(1)
  }
  
}

start()