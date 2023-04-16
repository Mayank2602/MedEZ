import customFetch from "../../utils/axios";
import authHeader from "../../utils/userAuthHeader";
import axios from "axios";
export const loadResultThunk = async (medicineName, thunkAPI) => {
  try {
    //const user = thunkAPI.getState().user.user
    //console.log(medicineName)
    const resp = await customFetch.post(`${process.env.REACT_APP_HOSTNAME}/api/search/single`, medicineName, authHeader(thunkAPI));
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const uploadFileThunk = async(file, thunkAPI) => {
    try{
        const resp = await axios.post(`${process.env.REACT_APP_HOSTNAME}/api/search/upload`,file,
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
    const resp = await customFetch.post(`${process.env.REACT_APP_HOSTNAME}/api/search/alter`, medicineName, authHeader(thunkAPI));
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};


export const multiResultThunk = async (medicineName, thunkAPI) => {
  try {
    //const user = thunkAPI.getState().user.user
    //console.log(medicineName)
    const resp = await customFetch.post(`${process.env.REACT_APP_HOSTNAME}/api/search/multiple`, medicineName, authHeader(thunkAPI));
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const addToCalendarThunk = async (obj, thunkAPI) => {
  try {
    //const user = thunkAPI.getState().user.user
    //console.log(medicineName)
    const resp = await customFetch.post(`${process.env.REACT_APP_HOSTNAME}/api/item/submit`,obj, authHeader(thunkAPI));
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getDoseThunk =  async (_, thunkAPI) => {
  try {
    //const user = thunkAPI.getState().user.user
    //console.log(medicineName)
    const resp = await customFetch.get(`${process.env.REACT_APP_HOSTNAME}/api/item/getdose`, authHeader(thunkAPI));
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};