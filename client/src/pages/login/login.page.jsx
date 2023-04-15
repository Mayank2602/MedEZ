import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loginUser } from "../../features/user/userSlice";
import { setOption } from "../../features/navitem/navitemSlice";
import { useGoogleLogin } from "@react-oauth/google";
import { Grid } from "@mui/material";
const sidelogin = './images/sidelogin.svg';


export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((store) => store.user.token);
  //const access_token = useSelector((store) => store.user.access_token);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      dispatch(loginUser({code:codeResponse.code}))
    },
    flow:'auth-code',
    scope: 'openid email profile https://www.googleapis.com/auth/calendar',
    access_type: 'offline',
  });

  
  useEffect(() => {
    if (token) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    }
    dispatch(setOption("Login"));
    // eslint-disable-next-line
  }, [token]);

  // const handleLogin = (data) => {
  //   console.log({
  //     username: data.name,
  //     email: data.email,
  //   });
  //   const userObj = {
  //     username: data.name,
  //     email: data.email,
  //   };
  //   if (!userObj.email || !userObj.username) return;
  //   dispatch(loginUser(userObj));
  // };

  return (
   
      
        
        <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
        <div style={{display:'flex',justifyContent:'center'}}>
          <button onClick={() => login()} className="login-with-google-btn">Sign in with Google </button>
        </div>
          
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            src={sidelogin}
            alt='sideImage'
            style={{ width: "100%", height: "auto" }}
          ></img>
        </Grid>
      </Grid>
      
   
  );
}
