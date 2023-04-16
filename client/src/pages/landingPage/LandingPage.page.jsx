import { Button, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOption } from "../../features/navitem/navitemSlice";
import { useNavigate } from "react-router-dom";
const sideimg = "./images/sideimg.svg";
const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setOption("none"));
  }, []);
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <h1 style={{ fontFamily: "consolas" }}>Welcome To MedEZ</h1>
          <h2 style={{ fontFamily: "consolas" }}>
            An ez tool to compare prices and track dosage of medicines
          </h2>
          <div className='intro-block'>
            <div className='monitor'>
              <svg
                version='1.1'
                id='Layer_1'
                xmlns='http://www.w3.org/2000/svg'
                xmlnsXlink='http://www.w3.org/1999/xlink'
                x='0px'
                y='0px'
                viewBox='0 0 500 200'
                style={{ enableBackground: "new 0 0 500 200" }}
                xmlSpace='preserve'
              >
                <g>
                  <polyline
                    className='ekg'
                    points='486.6,113.8 328.2,113.8 310.3,132.3 296,70.7 246.8,127.4 241.6,120.2 233.9,166.4 227,27.6 
							213.2,118.3 211.8,112.3 205.1,126.1 198.2,108.5 194.1,124.4 184.5,92.9 174.1,113 4.3,113 	'
                  />
                </g>
              </svg>
            </div>
            <Button className="btn" fullWidth variant="contained" onClick={() => navigate('/login')}>Let's Start</Button>
          </div>
          
        </Grid>
        <Grid item xs={12} md={7}>
          <img
            src={sideimg}
            alt='sideImage'
            style={{ width: "100%", height: "auto" }}
          ></img>
        </Grid>
      </Grid>
    </>
  );
};

export default LandingPage;
