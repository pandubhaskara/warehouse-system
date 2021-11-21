const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost/warehoueseapi",
      {}
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
