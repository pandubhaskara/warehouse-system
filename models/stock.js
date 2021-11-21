const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  stock: {
    type: Number,
    require: true,
  },
});

module.exports = Stock = mongoose.model("stock", stockSchema);
