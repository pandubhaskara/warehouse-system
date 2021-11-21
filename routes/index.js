const express = require("express");
const router = express.Router();
const product = require("./product");
const category = require("./category")
const stock = require("../controllers/stockController")
const multer  = require('multer')
const upload = multer()

router.get("/",(req,res)=>{
    res.sendStatus(200)
})
router.use("/category", category)
router.use("/product", product);
router.put("/", upload.any(), stock.add)


module.exports = router;
