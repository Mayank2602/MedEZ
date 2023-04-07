const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const loadUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    return res.status(200).json({ user });
  } catch (e) {
    return res.status(400).send({ msg: "Server Error" });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //checking for duplicate email
    const resp1 = await User.findOne({ email });
    if (resp1) return res.status(400).send({ msg: "Email already in use" });

    //   checking for duplicate username
    const resp2 = await User.findOne({ username });
    if (resp2) return res.status(400).send({ msg: "Username already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // creating json web token to store in frontend
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });

    res.status(200).json({
      token,
    });
  } catch (error) {
    return res.status(400).send({ msg: "Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const resp = await User.findOne({ email });
    if (!resp) {
      return res.status(400).send({ msg: "Invalid Credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, resp.password);
    if (!isPasswordCorrect) {
      return res.status(400).send({ msg: "Invalid Credentials" });
    }

    const token = jwt.sign({ userId: resp._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });
    res.status(200).json({
      token,
    });
  } catch (error) {
    return res.status(400).send({ msg: "Server Error" });
  }
};

module.exports = { loadUser, register, login };
