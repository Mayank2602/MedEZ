import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadResultThunk } from "./resultThunk";
import { toast } from "react-toastify";


const initialState = {
  isLoading: false,
  result: null,
};


export const loadResult = createAsyncThunk("result/loadResult", loadResultThunk);

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
   
  },
});

//export const {  } = userSlice.actions;
export default userSlice.reducer;
