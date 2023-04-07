const express = require('express');
const router = express.Router();
const { loadUser, register, login } = require("../controllers/authControllers");
const isLogin = require("../middleware/isLogin");

router.route("/").get(isLogin, loadUser);
router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;
