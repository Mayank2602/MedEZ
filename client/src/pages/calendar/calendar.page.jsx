import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCalendar,
  getDose,
  setDate,
} from "../../features/result/resultSlice";
import { setOption } from "../../features/navitem/navitemSlice";
import { default as Cal } from "react-calendar";
import { TextField, Stack } from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import "react-calendar/dist/Calendar.css";
import { Loader } from "../../components";
import moment from "moment";

const Calendar = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(new Date());
  const [medicine, setMedicine] = useState("");
  const [dose, setDose] = useState("");
  const [doseFreq, setdoseFreq] = useState(0);
  const [dayFreq, setdayFreq] = useState(0);
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(Date.now());
  const list = useSelector((store) => store.result.list);
  const isDoseLoading = useSelector((store) => store.result.isDoseLoading);

  const onChange = (v, e) => {
    setValue(v);
    dispatch(setDate(new Date(moment(v).format("YYYY-MM-DD")).getTime()));
    console.log(v);
  };
  const handleStart = (e) => {
    setStart(new Date(e));
  };
  const handleSubmit = () => {
    const date = new Date(start);
    const obj = {
      medicine,
      dose,
      doseFreq,
      dayFreq,
      count,
      startDate: date,
    };

    setMedicine("");
    setDose("");
    setdoseFreq(0);
    setdayFreq(0);
    setCount(0);
    //console.log(obj)
    dispatch(addToCalendar(obj)).then(() =>
      dispatch(getDose()).then(() =>
        dispatch(
          setDate(new Date(moment(value).format("YYYY-MM-DD")).getTime())
        )
      )
    );
  };

  useEffect(() => {
    dispatch(setOption("Calendar"));
    dispatch(getDose()).then(() =>
      dispatch(setDate(new Date(moment(value).format("YYYY-MM-DD")).getTime()))
    );
  }, []);
  return (
    <>
      <h1 style={{ fontFamily: "Consolas" }}>Calendar</h1>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <Stack spacing={2} direction='column'>
            <TextField
              id='standard-basic1'
              label='Medicine'
              value={medicine}
              onChange={(e) => setMedicine(e.target.value)}
              variant='standard'
            />
            <TextField
              id='standard-basic2'
              label='Dosage Amount'
              value={dose}
              onChange={(e) => setDose(e.target.value)}
              variant='standard'
            />
            <TextField
              id='standard-basic3'
              type='number'
              value={doseFreq}
              label='Frequency per day'
              onChange={(e) => setdoseFreq(e.target.value)}
              variant='standard'
            />
            <TextField
              id='standard-basic4'
              type='number'
              value={dayFreq}
              label='Gap in days'
              onChange={(e) => setdayFreq(e.target.value)}
              variant='standard'
            />
            <TextField
              id='standard-basic5'
              type='number'
              value={count}
              label='Count of days'
              onChange={(e) => setCount(e.target.value)}
              variant='standard'
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["MobileDatePicker"]}>
                <DemoItem label='Start Date'>
                  <MobileDatePicker
                    value={dayjs(start)}
                    onChange={handleStart}
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
            <Button variant='contained' onClick={handleSubmit}>
              Add to Calendar
            </Button>
          </Stack>
        </Grid>
        <Grid item md={6}>
          {!isDoseLoading ? (
            <>
              {" "}
              <Cal onChange={onChange} value={value} />
              <h3 style={{ fontFamily: "consolas", marginTop: "1rem" }}>
                Dosage
              </h3>
              {list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </>
          ) : (
            <Loader />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Calendar;
