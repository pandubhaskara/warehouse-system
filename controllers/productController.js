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
        const data= await product.find(body)
        if(data.length==0){
          return res.status(500).json({
            status: "failed",
            message : "there is no data"
          })
        }
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
  readOne: async (req, res) => {
    const id = req.params.id
    try {
        const data= await product.findById(id).populate('category', ["name"])
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
  update: async (req, res) => {
    const body = req.body;
    const name = req.params.id
    try {
        const updateProduct = await product.findOneAndUpdate({name:name}, 
            body, {returnOriginal:false}).populate("category", ["name"]);
        return res.status(200).json({
            status :'success',
            data : updateProduct
        })
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "error",
        message: "internal server error",
      });
    }
  },
  delete: async (req, res) => {
    const id = req.params.id;
    try {
        const deleteProduct = await product.deleteOne({name:id})
        if(!deleteProduct.deletedCount){
            return res.status(404).json({
                status :"failed",
                message : "the data not found"
            })
        }return res.status(400).json({
            status: "success",
            message:"data deleted successfully"
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
