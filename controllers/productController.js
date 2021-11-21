const product = require("../models/product");
const stock = require("../models/stock");

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
      const data = await product.find(body);
      if (data.length == 0) {
        return res.status(500).json({
          status: "failed",
          message: "there is no data",
        });
      }
      return res.status(200).json({
        status: "success",
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
  readOne: async (req, res) => {
    const id = req.params.id;
    try {
      const data = await product.findById(id).populate("category", ["name"]);
      return res.status(200).json({
        status: "success",
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
  update: async (req, res) => {
    const body = req.body;
    const name = req.params.id;
    try {
      const updateProduct = await product
        .findOneAndUpdate({ name: name }, body, { returnOriginal: false })
        .populate("category", ["name"]);
      return res.status(200).json({
        status: "success",
        data: updateProduct,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "internal server error",
      });
    }
  },
  addStock: async (req, res) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const productName = await product.findById(id);
      const data = await stock.create({
        name: productName.name,
        stock: body.stock,
        status: "in",
      });
      const oldStock = productName.stock;

      const filter = { name: productName.name };
      const stocks = { stock: parseInt(oldStock) + parseInt(body.stock) };

      let doc = await product.findOneAndUpdate(filter, stocks);
      doc = await product.findOne(filter);
      return res.status(200).json({
        status: "success",
        data: data,
        doc,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "internal server error",
      });
    }
  },
  deleteStock: async (req, res) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const productName = await product.findById(id);
      const data = await stock.create({
        name: productName.name,
        stock: body.stock,
        status: "out",
      });
      const oldStock = productName.stock;
      const filter = { name: productName.name };
      const stocks = { stock: parseInt(oldStock) - parseInt(body.stock) };
      let doc = await product.findOneAndUpdate(filter, stocks);
      doc = await product.findOne(filter);
      return res.status(200).json({
        status: "success",
        data: data,
        doc,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "internal server error",
      });
    }
  },
  delete: async (req, res) => {
    const id = req.params.id;
    try {
      const deleteProduct = await product.deleteOne({ name: id });
      if (!deleteProduct.deletedCount) {
        return res.status(404).json({
          status: "failed",
          message: "the data not found",
        });
      }
      return res.status(400).json({
        status: "success",
        message: "data deleted successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "error",
        message: "internal server error",
      });
    }
  },
  history: async (req, res) => {
    const body = req.body;
    try {
      const data = await stock.find(body);
      if (data.length == 0) {
        return res.status(500).json({
          status: "failed",
          message: "there is no data",
        });
      }
      return res.status(200).json({
        status: "success",
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
};
