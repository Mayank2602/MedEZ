import customFetch from "../../utils/axios";
import authHeader from "../../utils/userAuthHeader";

export const registerUserThunk = async (user, thunkAPI) => {
  try {
    //const user = thunkAPI.getState().user.user
    const resp = await customFetch.post("http://localhost:8080/api/auth/register", user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const loginUserThunk = async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post("http://localhost:8080/api/auth/login", user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const loadUserThunk = async(_, thunkAPI) => {
    try{
        const resp = await customFetch.get("http://localhost:8080/api/auth", authHeader(thunkAPI));
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
}



