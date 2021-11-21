const express = require("express");
const router = express.Router();
const product = require("./product");
const category = require("./category")

router.get("/",(req,res)=>{
    res.status(200).send({
        status: "success",
        message:"API is online"
    })
})
router.use("/category", category)
router.use("/product", product);

module.exports = router;
