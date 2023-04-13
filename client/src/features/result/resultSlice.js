import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  altResultThunk,
  loadResultThunk,
  multiResultThunk,
  uploadFileThunk,
} from "./resultThunk";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  result: null,
  fileResult: null,
  isFileLoading: false,
  alternatives: null,
  isAltLoading: false,
  multiResult: null,
  isMultiLoading: false,
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
const userSlice = createSlice({
  name: "result",
  initialState,
  reducers: {},
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
      state.resultFile = null;
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
  },
});

//export const {  } = userSlice.actions;
export default userSlice.reducer;
