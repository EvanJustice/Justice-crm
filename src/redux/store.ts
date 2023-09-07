import { configureStore } from "@reduxjs/toolkit";
import tableDataReducer from "./tableDataSlice.js";
import authSliceReducer from "./authSlice";
import usersSlice from "./usersSlice.js";
import snackBarSlice from "./snackBarSlice";

export const store = configureStore({
    reducer: {
        tableData: tableDataReducer,
        auth: authSliceReducer,
        users: usersSlice,
        snackBar: snackBarSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


