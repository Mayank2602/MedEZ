const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { google } = require("googleapis");
const axios = require('axios');
const oauth2client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI || 'http://localhost:3000'
);
const loadUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).populate("prescriptions");
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
    const { code } = req.body;
    const { tokens } = await oauth2client.getToken(code);
    //console.log(tokens)
    const { access_token, refresh_token } =  tokens ;

    const {data} = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
        },
      }
    );
    const email = data.email;
    const username = data.name;

    const resp = await User.findOne({ email });
    if (resp) {
      if(refresh_token){
        resp.tokens = tokens;
        await resp.save();
      }
      const token = jwt.sign({ userId: resp._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
      });
      return res.status(200).json({
        token,
      });
    }

    const newUser = await User.create({
      username,
      email,
      tokens,
    });
    //console.log(newUser);
    // creating json web token to store in frontend
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });

    res.status(200).json({
      token,
    });
  } catch (error) {
    console.log(error)
    return res.status(400).send({ msg: "Server Error" });
  }
};

module.exports = { loadUser, register, login };
