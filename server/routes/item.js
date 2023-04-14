const express = require('express');
const router = express.Router();
const { start,submit } = require("../controllers/itemControllers");
const isLogin = require("../middleware/isLogin");

router.route("/start").get(start);
router.route("/submit").get(isLogin,submit);
module.exports = router;