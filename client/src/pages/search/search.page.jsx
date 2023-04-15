import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOption } from "../../features/navitem/navitemSlice";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { loadResult, altResult } from "../../features/result/resultSlice";
import { Loader, ResultBox } from "../../components";

const Search = () => {
  const isLoading = useSelector((store) => store.result.isLoading);
  const result = useSelector((store) => store.result.result);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setOption("Search"));
    //eslint-disable-next-line
  }, []);

  const [textInput, setTextInput] = useState("");

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };
  const handleClick = (e) => {
    dispatch(loadResult({ medicine: textInput }));
    dispatch(altResult({name: textInput}));
  };
  return (
    <>
    <h1 style={{fontFamily:'consolas'}}>Search</h1>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            id='standard-basic'
            label='Medicine'
            variant='standard'
            value={textInput}
            onChange={handleTextInputChange}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            fullWidth
            onClick={handleClick}
            variant='contained'
            sx={{ backgroundColor: "teal", padding: "0.7rem" }}
          >
            Search
            <SearchIcon sx={{ marginLeft: "0.7rem" }} />
          </Button>
        </Grid>
      </Grid>
      <>
     
      {
        isLoading && !result ? <Loader/>:<ResultBox result={result}/>
      }
      </>
     


    </>
  );
};

export default Search;
