const express = require('express');
const router = express.Router();
const { submit, getdose } = require("../controllers/itemControllers");
const isLogin = require("../middleware/isLogin");

router.route("/getdose").get(isLogin,getdose);
router.route("/submit").post(isLogin,submit);
module.exports = router;