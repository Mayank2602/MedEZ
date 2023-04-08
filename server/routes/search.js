const express = require('express');
const router = express.Router();
const { single, multiple } = require("../controllers/searchControllers");
const isLogin = require("../middleware/isLogin");

router.route("/single").post(isLogin,single);
router.route("/multiple").post(isLogin,multiple);
module.exports = router;