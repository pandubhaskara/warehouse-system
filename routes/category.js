const express = require("express");
const router = express.Router();
const category = require("../controllers/categoryController");
const multer = require("multer");
const upload = multer();

router.get("/", category.readAll);
router.post("/", upload.any(), category.create);

module.exports = router;
