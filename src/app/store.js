import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./tableDataSlice.js";




export const store = configureStore({
    reducer: reducer,
})




