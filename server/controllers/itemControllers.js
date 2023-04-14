const User = require("../models/user");
const Item = require("../models/item");
const axios = require("axios");
const { google } = require("googleapis");

const start = async (req, res) => {
  try {
    const data = await axios.get("http://localhost:5000/search?name=crocin", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    console.log(data.data);
    return res.status(200).json({ data: data.data });
  } catch (e) {
    return res.status(400).send({ msg: "Server Error" });
  }
};

const submit = async (req, res) => {
  try {
    const oauth2client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "http://localhost:3000"
    );
    const userId = req.user.userId;
    const user = await User.findById(userId);
    const { tokens } = user;
    oauth2client.setCredentials(tokens);
    const calendar = google.calendar({ version: "v3", oauth2client });
    console.log("pass here");
    const resp = await calendar.events.insert({
      auth: oauth2client,
      calendarId: "primary",
      resource: {
        summary: "Test event",
        description: "Google add event testing.",
        start: {
          dateTime: "2023-04-14T01:00:00-07:00",
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: "2023-04-15T05:00:00-07:00",
          timeZone: "Asia/Kolkata",
        },
      },
    });
   // console.log(resp);
    //user code
    return res.status(200).json({ user });
  } catch (e) {
    console.log(e.response.data);
    return res.status(400).send({ msg: "Server Error" });
  }
};

module.exports = { start, submit };
