const User = require("../models/user");
const Item = require("../models/item");
const axios = require("axios");

const single = async (req, res) => {
  try {
    const { medicine } = req.body;
    const resp = await axios.post(
      "http://localhost:5000/search",
      { name: medicine },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log(resp.data);
    return res.status(200).json({ result: resp.data });
  } catch (e) {
    return res.status(400).send({ msg: "Server Error" });
  }
};

const multiple = async (req, res) => {
  try {
    console.log(req.file);
    const resp = await axios.post(
      "http://localhost:5000/prescription",
      { filename: req.file.filename },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    //user code
    console.log(resp.data);
    return res.status(200).json({ fileResult: resp.data });
  } catch (e) {
    return res.status(400).send({ msg: "Server Error" });
  }
};

const upload = async (req, res) => {
  try {
    //console.log(req.file);
    
    const resp = await axios.post(
      "http://localhost:5000/prescription",
      { filename: req.file.filename },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    //user code
    console.log(resp.data);
    const fileResult = await Item.create({
      filename: req.file.originalname,
      drugs: resp.data.drugs,
      type: resp.data.type,
    });

    const user = await User.findById(req.user.userId);
    // console.log(user);
    user.prescriptions.unshift(fileResult);
    // console.log(user);
    await user.save();
    console.log(user);
    return res.status(200).json({ fileResult: [fileResult] });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ msg: "Server Error" });
  }
};

module.exports = { single, multiple, upload };
