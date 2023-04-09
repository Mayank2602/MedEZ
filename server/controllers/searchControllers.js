const User = require("../models/user");
const Item = require("../models/item");
const axios = require("axios");

const single = async (req, res) => {
  try {
    const { medicine } = req.body;
    const { data } = await axios.post(
      "http://localhost:5000/search",
      { name: medicine },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log(data)
    const accuracy =
      data.sources.reduce((total, item) => {
        return total + item.accuracy;
      }, 0) / data.sources.length;
    const maxAccuracy = data.sources.reduce((maxi, item) => {
      return Math.max(maxi, item.accuracy);
    }, 0);
    const sources = data.sources.filter((item) => item.accuracy >= 20);
    data.sources = sources;
    if (maxAccuracy < 70) {
      data.accuracy = accuracy.toFixed(2);
    } else {
      data.accuracy = maxAccuracy.toFixed(2);
    }

    //console.log(data);
    return res.status(200).json({ result: data });
  } catch (e) {
    return res.status(400).send({ msg: "Server Error" });
  }
};

const multiple = async (req, res) => {
  try {
    const promises = [];
    const item = await Item.findById(req.body.itemId);
    item.drugs.forEach((drug) => {
      promises.push(
        axios.post(
          "http://localhost:5000/search",
          { name: drug },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
      );
    });
    const resp = await Promise.all(promises);
    const Data = resp.map((val) => val.data);
    const filtered = Data.map((data) => {
      const accuracy =
        data.sources.reduce((total, item) => {
          return total + item.accuracy;
        }, 0) / data.sources.length;
      const maxAccuracy = data.sources.reduce((maxi, item) => {
        return Math.max(maxi, item.accuracy);
      }, 0);
      const sources = data.sources.filter((item) => item.accuracy >= 20);
      data.sources = sources;
      if (maxAccuracy < 70) {
        data.accuracy = accuracy.toFixed(2);
      } else {
        data.accuracy = maxAccuracy.toFixed(2);
      }

      return data;
    });
    //user code
    //console.log(data);
    return res.status(200).json({ result: filtered });
  } catch (e) {
    return res.status(400).send({ msg: "Server Error" });
  }
};

const alter = async (req, res) => {
    try {
      const { name } = req.body;
      const { data } = await axios.post(
        "http://localhost:5000/alternatives",
        { name },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      //console.log(data)
  
      //console.log(data);
      return res.status(200).json({ result: data });
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

module.exports = { single, multiple, upload, alter};
