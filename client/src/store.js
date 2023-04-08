import {configureStore} from '@reduxjs/toolkit';
import navitemSlice from './features/navitem/navitemSlice';
import userSlice from "./features/user/userSlice";
import resultSlice from './features/result/resultSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        navitem: navitemSlice,
        result: resultSlice,
    }
});

export default store;