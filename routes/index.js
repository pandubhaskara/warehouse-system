const express = require("express");
const router = express.Router();
const product = require("./product");
const category = require("./category")

router.get("/",(req,res)=>{
    res.sendStatus(200)
})
router.use("/category", category)
router.use("/product", product);


module.exports = router;
