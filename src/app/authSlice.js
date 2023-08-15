import {createSlice} from "@reduxjs/toolkit";


const initialState = JSON.parse(localStorage.getItem('auth') ?? 'false')

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        toggleAuth: (state, action) => {
                const flipState = !action.payload
                localStorage.setItem('auth', JSON.stringify(flipState))
                return !action.payload
        }
    }
})

export default authSlice.reducer
export const { toggleAuth} = authSlice.actions;