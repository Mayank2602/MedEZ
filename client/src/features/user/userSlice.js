import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUserThunk, loginUserThunk, loadUserThunk } from "./userThunk";
import { toast } from "react-toastify";

import {
  addTokenToLocalStorage,
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
} from "../../utils/localStorage";

const initialState = {
  isLoading: false,
  user: null,
  token: getTokenFromLocalStorage(),
};

export const registerUser = createAsyncThunk("user/registerUser", registerUserThunk);
export const loginUser = createAsyncThunk("user/loginUser", loginUserThunk);
export const loadUser = createAsyncThunk("user/loadUser", loadUserThunk);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      removeTokenFromLocalStorage();
      toast.success("Logout Successfull");
    },
   
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { token } = payload;
      state.isLoading = false;
      state.token=token;
      addTokenToLocalStorage(token);
      toast.success(`Registered Succcesfully`);
    },
    [registerUser.rejected]: (state, {payload}) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { token } = payload;
      state.isLoading = false;
      state.token=token;
      addTokenToLocalStorage(token);
      toast.success(`Logged In Successfully`);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [loadUser.pending]: (state) => {
        state.isLoading = true;
    },
    [loadUser.fulfilled]: (state, {payload}) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
    },
    [loadUser.rejected]: (state, {payload}) => {
        state.isLoading = false;
        toast.error(payload);
    },
   
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
