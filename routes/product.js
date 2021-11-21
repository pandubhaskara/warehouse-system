const express = require("express");
const router = express.Router();
const product = require("../controllers/productController");
const multer  = require('multer')
const upload = multer()

router.post("/",  upload.any(), product.create);
router.get("/",  upload.any(), product.readAll);
// router.get("/:id", laptop.readOne);
// router.put("/:id", laptop.update);
// router.delete("/:id", laptop.delete);

module.exports = router;
