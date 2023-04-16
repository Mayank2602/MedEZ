const User = require("../models/user");
const Item = require("../models/item");
const Dose = require("../models/dose");
const axios = require("axios");
const moment = require('moment');
const { google } = require("googleapis");

const getdose = async (req, res) => {
  try {
    
    const userId = req.user.userId;
    const dose = await Dose.find({userId});
    return res.status(200).json({ dose });
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
    console.log(req.body)
    const user = await User.findById(userId);
    const date = moment(startDate).format('YYYY-MM-DD');
    let st = (new Date(date)).getTime();
    for(let i = 1; i <= count ; i++)
    {
        
        const d = await Dose.findOne({$and:[{
          date:st
        },{userId}]});
        if(d){
          d.list.push(`Take ${medicine} ${dose} for ${doseFreq} times`)
          await d.save();
        }
        else{
          await Dose.create({
            date: st,
            userId,
            list:[`Take ${medicine} ${dose} for ${doseFreq} times`]
          })
        }
        st+=86400000*dayFreq;   
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
          date,
          timeZone: "Asia/Kolkata",
        },
        end: {
          date,
          timeZone: 'Asia/Kolkata'
        }
      
      },
    });
   // console.log(resp);
    //user code
    return res.status(200).json({ msg:'Added to Calendar' });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ msg: "Server Error" });
  }
};

module.exports = { getdose, submit };
