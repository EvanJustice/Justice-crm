import { configureStore } from "@reduxjs/toolkit";
import tableDataReducer from "./tableDataSlice.js";
import authSliceReducer from "./authSlice.js";
import usersSlice from "./usersSlice.js";
import snackBarSlice from "./snackBarSlice.js";





export const store = configureStore({
    reducer: {
        tableData: tableDataReducer,
        auth: authSliceReducer,
        users: usersSlice,
        snackBar: snackBarSlice,
    }
})




