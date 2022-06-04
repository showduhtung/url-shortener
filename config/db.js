const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
