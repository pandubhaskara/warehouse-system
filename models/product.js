const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  stock: {
    type: Number,
    require: true,
  },  
  price: {
    type: Number,
    require: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
    index: true,
  },
});

module.exports = Product = mongoose.model("product", productSchema);
