import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCalendarThunk,
  altResultThunk,
  getDoseThunk,
  loadResultThunk,
  multiResultThunk,
  uploadFileThunk,
} from "./resultThunk";
import { toast } from "react-toastify";
import moment from "moment";

const initialState = {
  isLoading: false,
  result: null,
  fileResult: null,
  isFileLoading: false,
  alternatives: null,
  isAltLoading: false,
  multiResult: null,
  isMultiLoading: false,
  dose: null,
  isDoseLoading: false,
  list: [],

};

export const loadResult = createAsyncThunk(
  "result/loadResult",
  loadResultThunk
);
export const uploadFile = createAsyncThunk(
  "result/uploadFile",
  uploadFileThunk
);
export const altResult = createAsyncThunk("result/altResult", altResultThunk);
export const multiResult = createAsyncThunk(
  "result/multiResult",
  multiResultThunk
);
export const addToCalendar = createAsyncThunk("result/addToCalendar", addToCalendarThunk);
export const getDose = createAsyncThunk("result/getDose", getDoseThunk);
const userSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    setDate: (state, {payload}) => {
      console.log(payload)
      if(state.dose){
        const list = state.dose.filter(item => item.date === payload);
        if(list.length){
          state.list = list[0].list;
        }else{
          state.list = [];
        }
        }
       
    }
  },
  extraReducers: {
    [loadResult.pending]: (state) => {
      state.result = null;
      state.isLoading = true;
    },
    [loadResult.fulfilled]: (state, { payload }) => {
      const { result } = payload;
      state.isLoading = false;
      state.result = result;
      console.log(result);
    },
    [loadResult.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [uploadFile.pending]: (state) => {
      state.fileResult = null;
      state.isFileLoading = true;
    },
    [uploadFile.fulfilled]: (state, { payload }) => {
      const { fileResult } = payload;
      state.fileResult = fileResult;
      state.isFileLoading = false;
      console.log(fileResult);
    },
    [uploadFile.rejected]: (state) => {
      state.isFileLoading = false;
    },
    [altResult.pending]: (state) => {
      state.alternatives = null;
      state.isAltLoading = true;
    },
    [altResult.fulfilled]: (state, { payload }) => {
      const { result } = payload;
      state.isAltLoading = false;
      state.alternatives = result;
    },
    [altResult.rejected]: (state, { payload }) => {
      state.isAltLoading = false;
      //toast.error(payload);
    },
    [multiResult.pending]: (state) => {
      state.multiResult = null;
      state.isMultiLoading = true;
    },
    [multiResult.fulfilled]: (state, { payload }) => {
      const { result } = payload;
      state.isMultiLoading = false;
      state.multiResult = result;
      console.log(result);
    },
    [multiResult.rejected]: (state, { payload }) => {
      state.isMultiLoading = false;
      toast.error(payload);
    },
    [addToCalendar.pending]: (state) => {
      
    },
    [addToCalendar.fulfilled]: (state, { payload }) => {
      toast.success("successful");
    },
    [addToCalendar.rejected]: (state, { payload }) => {
      toast.error(payload);
    },
    [getDose.pending]: (state) => {
      state.isDoseLoading = true;
    },
    [getDose.fulfilled]: (state, {payload}) => {
      const { dose } = payload;
      state.isDoseLoading = false;
      state.dose = dose;
    },
    [getDose.rejected]: (state,{payload})=>{
      state.isDoseLoading = false;
      toast.error(payload);
    }
    
  },
});

export const { setDate } = userSlice.actions;
export default userSlice.reducer;
