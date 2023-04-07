import { createSlice} from "@reduxjs/toolkit";

const initialState = {
  currentItem: "none"
};

const navitemSlice = createSlice({
  name: "navitem",
  initialState,
  reducers: {
    setOption: (state, {payload}) => {
        state.currentItem = payload;
    },
   
  },

});

export const { setOption } = navitemSlice.actions;
export default navitemSlice.reducer;
