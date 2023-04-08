import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { accessToken, loginUser } from "../../features/user/userSlice";
import { setOption } from "../../features/navitem/navitemSlice";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
const theme = createTheme();

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((store) => store.user.token);
  const access_token = useSelector((store) => store.user.access_token);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      //console.log(tokenResponse);
      dispatch(accessToken(tokenResponse.access_token));
    },
  });

  useEffect(
    () => {
      if (access_token) {
        axios
          .get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
                Accept: "application/json",
              },
            }
          )
          .then((res) => {
            handleLogin(res.data);
          })
          .catch((err) => console.log(err));
      }
    },
    //eslint-disable-next-line
    [access_token]
  );
  useEffect(() => {
    if (token && access_token) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    }
    dispatch(setOption("Login"));
    // eslint-disable-next-line
  }, [token, access_token]);

  const handleLogin = (data) => {
    console.log({
      username: data.name,
      email: data.email,
    });
    const userObj = {
      username: data.name,
      email: data.email,
    };
    if (!userObj.email || !userObj.username) return;
    dispatch(loginUser(userObj));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div>
          <button onClick={() => login()} className="login-with-google-btn">Sign in with Google </button>
        </div>

        {/* <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Login
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              type='email'
              autoComplete='email'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
           
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='#' variant='body2'>
                  {"Don't have an account? Register"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box> */}
      </Container>
    </ThemeProvider>
  );
}
