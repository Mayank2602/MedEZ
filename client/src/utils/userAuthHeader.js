const authHeader = (thunkAPI) => ({
 
  headers: {
    authorization: `Bearer ${thunkAPI.getState().user.token}`,
  },
});

export default authHeader;
