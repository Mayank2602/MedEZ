import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadResultThunk, uploadFileThunk } from "./resultThunk";
import { toast } from "react-toastify";


const initialState = {
  isLoading: false,
  result: null,
  fileResult : null,
  isFileLoading: false,
};


export const loadResult = createAsyncThunk("result/loadResult", loadResultThunk);
export const uploadFile = createAsyncThunk("result/uploadFile", uploadFileThunk)
const userSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
   
  },
  extraReducers: {
    [loadResult.pending]: (state) => {
        state.result = null;
        state.isLoading = true;
    },
    [loadResult.fulfilled]: (state, {payload}) => {
        const { result } = payload;
        state.isLoading = false;
        state.result = result;
    },
    [loadResult.rejected]: (state, {payload}) => {
        state.isLoading = false;
        toast.error(payload);
    },
    [uploadFile.pending]: (state) => {
        state.resultFile = null;
        state.isFileLoading = true;
    },
    [uploadFile.fulfilled]:(state, {payload}) => {
        const {fileResult} = payload;
        state.fileResult = fileResult;
        state.isFileLoading = false;
        toast.success(fileResult)
    },
    [uploadFile.rejected]: (state) => {
        state.isFileLoading = false;
    }
   
  },
});

//export const {  } = userSlice.actions;
export default userSlice.reducer;
