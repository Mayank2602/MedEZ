import customFetch from "../../utils/axios";
import authHeader from "../../utils/userAuthHeader";
import axios from "axios";
export const loadResultThunk = async (medicineName, thunkAPI) => {
  try {
    //const user = thunkAPI.getState().user.user
    //console.log(medicineName)
    const resp = await customFetch.post("/api/search/single", medicineName, authHeader(thunkAPI));
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const uploadFileThunk = async(file, thunkAPI) => {
    try{
        const resp = await axios.post("/api/search/upload",file,
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
                authorization: `Bearer ${thunkAPI.getState().user.token}`,
            }
        });
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
}


export const altResultThunk = async (medicineName, thunkAPI) => {
  try {
    //const user = thunkAPI.getState().user.user
    console.log(medicineName)
    const resp = await customFetch.post("/api/search/alter", medicineName, authHeader(thunkAPI));
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};


export const multiResultThunk = async (medicineName, thunkAPI) => {
  try {
    //const user = thunkAPI.getState().user.user
    //console.log(medicineName)
    const resp = await customFetch.post("/api/search/multiple", medicineName, authHeader(thunkAPI));
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const addToCalendarThunk = async (_, thunkAPI) => {
  try {
    //const user = thunkAPI.getState().user.user
    //console.log(medicineName)
    const resp = await customFetch.get("/api/item/submit", authHeader(thunkAPI));
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};