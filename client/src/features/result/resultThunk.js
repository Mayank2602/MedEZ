import customFetch from "../../utils/axios";
import authHeader from "../../utils/userAuthHeader";

export const loadResultThunk = async (medicineName, thunkAPI) => {
  try {
    //const user = thunkAPI.getState().user.user
    console.log(medicineName)
    const resp = await customFetch.post("/api/search/single", medicineName, authHeader(thunkAPI));
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

// export const loadResultThunk = async(_, thunkAPI) => {
//     try{
//         const resp = await customFetch.get("/api/search", authHeader(thunkAPI));
//         return resp.data;
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error.response.data.msg);
//     }
// }


