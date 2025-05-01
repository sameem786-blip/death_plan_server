const express = require("express");
const multer = require("multer");
const { uploadFile } = require("../controllers/fileUpload");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadFile);

module.exports = router;
