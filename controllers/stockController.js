const product = require("../models/product");
const stock = require("../models/stock");

module.exports = {
  add: async (req, res) => {
    const body = req.body;
    try {
      const stocks = await stock.create(body);
      const data = await product.findOneAndUpdate(
        { name: stocks.name },
        { stock: stocks.stock + stock },
        {new:true}, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }
        
            console.log(doc);
        });
      console.log(data.stock)
      return res.status(201).json({
        status: "success",
        message: "data saved to the database success",
        data: stocks,
        data,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "error",
        message: "internal server error",
      });
    }
  },
};
