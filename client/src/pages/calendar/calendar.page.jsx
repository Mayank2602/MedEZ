import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCalendar } from "../../features/result/resultSlice";
import { setOption } from "../../features/navitem/navitemSlice";
import { default as Cal } from "react-calendar";
import { TextField, Stack } from "@mui/material";
import dayjs from "dayjs";
import moment from 'moment';
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import "react-calendar/dist/Calendar.css";
const Calendar = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setOption("Calendar"));
  }, []);
  const [value, setValue] = useState(new Date());
  const [medicine, setMedicine] = useState("");
  const [dose, setDose] = useState("");
  const [doseFreq, setdoseFreq] = useState(0);
  const [dayFreq, setdayFreq] = useState(0);
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(Date.now());
  const onChange = (v, e) => {
    setValue(v);
    console.log(v);
  };
  const handleStart = (e) => {
        setStart(new Date(e))
  }
  const handleSubmit = () => {
      const date = new Date(start)
      const obj = {
        medicine,
        dose,
        doseFreq,
        dayFreq,
        count,
        startDate: moment(date).format('YYYY-MM-DD')
      }
      //console.log(obj)
      dispatch(addToCalendar(obj));
  }
  return (
    <>
      <h1 style={{ fontFamily: "Consolas" }}>Calendar</h1>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <Stack spacing={2} direction='column'>
            <TextField
              id='standard-basic1'
              label='Medicine'
              onChange={(e) => setMedicine(e.target.value)}
              variant='standard'
            />
            <TextField
              id='standard-basic2'
              label='Dosage Amount'
              onChange={(e) => setDose(e.target.value)}
              variant='standard'
            />
            <TextField
              id='standard-basic3'
              type='number'
              label='Frequency per day'
              onChange={(e) => setdoseFreq(e.target.value)}
              variant='standard'
            />
            <TextField
              id='standard-basic4'
              type='number'
              label='Gap in days'
              onChange={(e) => setdayFreq(e.target.value)}
              variant='standard'
            />
            <TextField
              id='standard-basic5'
              type='number'
              label='Count of days'
              onChange={(e) => setCount(e.target.value)}
              variant='standard'
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["MobileDatePicker"]}>
                <DemoItem label='Start Date'>
                  <MobileDatePicker value={dayjs(start)} onChange={handleStart}/>
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
            <Button
              variant='contained'
              onClick={handleSubmit}
            >
              Add to Calendar
            </Button>
          </Stack>
        </Grid>
        <Grid item md={6}>
          <Cal onChange={onChange} value={value} />
        </Grid>
      </Grid>
    </>
  );
};

export default Calendar;
