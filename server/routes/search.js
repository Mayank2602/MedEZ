const express = require("express");
const router = express.Router();
const { single, multiple, upload, alter } = require("../controllers/searchControllers");
const isLogin = require("../middleware/isLogin");
const multer = require("multer");
const { uuid } = require("uuidv4");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); //important this is a direct path fron our current file to storage location
  },
  filename: (req, file, cb) => {

    const str = file.originalname;
    cb(null, "_" + uuid() + str.substring(str.lastIndexOf('.')));
  },
});
const uploadMulter = multer({ storage: fileStorageEngine });

router.route("/single").post(isLogin, single);
router.route("/multiple").post(isLogin, multiple);
router.route("/alter").post(isLogin, alter);
router.route("/upload").post(isLogin, uploadMulter.single("file"), upload);
module.exports = router;
