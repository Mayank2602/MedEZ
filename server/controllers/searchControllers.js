const User = require("../models/user");
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
    //user code
    return res.status(200).json({});
  } catch (e) {
    return res.status(400).send({ msg: "Server Error" });
  }
};

module.exports = { single, multiple };
