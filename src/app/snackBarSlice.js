import {createSlice} from "@reduxjs/toolkit";


const snackBarSlice = createSlice({
    name:'snackBar',
    initialState: false,
    reducers:{
        toggleOpen: (state) => {
            return !state
        }
    }
})

export default snackBarSlice.reducer
export const { toggleOpen } = snackBarSlice.actions
