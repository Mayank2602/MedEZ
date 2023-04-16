const User = require("../models/user");
const Item = require("../models/item");
const Dose = require("../models/dose");
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
      process.env.REDIRECT_URI || "http://localhost:3000"
    );
    const userId = req.user.userId;
    const {medicine,dose,doseFreq,dayFreq,startDate,count}=req.body;
    const user = await User.findById(userId);
    const st = new Date(startDate);
    for(let i = 1; i <= count ; i++)
    {
        const d = await Dose.create()
    }
    const { tokens } = user;
    oauth2client.setCredentials(tokens);
    const calendar = google.calendar({ version: "v3", oauth2client });
    console.log("pass here");
    const resp = await calendar.events.insert({
      auth: oauth2client,
      calendarId: "primary",
      resource: {
        summary: medicine,
        description: `Take ${dose} for ${doseFreq} times`,
        recurrence:[
          `RRULE:FREQ=DAILY;INTERVAL=${dayFreq};COUNT=${count}`
        ],
        start: {
          date: startDate,
          timeZone: "Asia/Kolkata",
        },
        end: {
          date: startDate,
          timeZone: 'Asia/Kolkata'
        }
      
      },
    });
   // console.log(resp);
    //user code
    return res.status(200).json({ msg:'Added to Calendar' });
  } catch (e) {
    console.log(e.response.data);
    return res.status(400).send({ msg: "Server Error" });
  }
};

module.exports = { start, submit };
