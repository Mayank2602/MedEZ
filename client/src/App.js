import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import Box from "@mui/material/Box";
import { ProtectedRoutes, Navbar, Footer } from "./components";
import { Login, Register, Dashboard, SharedLayout, LandingPage, Home } from "./pages";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Box sx={{ position: "relative", minHeight: "100vh" }}>
        <Navbar />
        <Box sx={{ paddingTop: "5em", paddingBottom: "4rem" }}>
        <Container maxWidth={false} sx={{ maxWidth: '85%' }}>
          <Routes>
            <Route exact path="/" element={<LandingPage/>} />
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/register" element={<Register />}></Route>
            <Route
              path="/"
              element={
                <ProtectedRoutes>
                  <SharedLayout />
                </ProtectedRoutes>
              }
            >
              {/* OTHER PROTECTED ROUTES */}
              <Route path="/home" element={<Home/>} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            {/* ERROR PAGE */}
            {/* <Route exact path="*" element={<Error />}></Route> */}
          </Routes>
          <ToastContainer position="top-center" />
          </Container>
        </Box>
        <Footer />
      </Box>
    </BrowserRouter>
  );
}

export default App;