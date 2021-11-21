const product = require("../models/product");

module.exports = {
  create: async (req, res) => {
    const body = req.body;
    try {
      const data = await product.create(body);
      return res.status(201).json({
        status: "success",
        message: "data saved to the database success",
        data: data,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "error",
        message: "internal server error",
      });
    }
  },
  readAll: async (req, res) => {
    const body = req.body;
    try {
        const data= await product.find(body).populate('category')
        return res.status(200).json({
            status :'success',
            data : data
        })
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "error",
        message: "internal server error",
      });
    }
  },
};
