const express = require("express");
const router = express.Router();
const product = require("../controllers/productController");
const multer = require("multer");
const upload = multer();

router.post("/", upload.any(), product.create);
router.get("/", upload.any(), product.readAll);
router.post("/stock/in/:id", upload.any(), product.addStock)
router.post("/stock/out/:id", upload.any(), product.deleteStock)
// router.get("/:id", product.readOne);
router.put("/:id", upload.any(), product.update);
router.delete("/:id", product.delete);

module.exports = router;
