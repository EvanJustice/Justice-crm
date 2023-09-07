import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: boolean = JSON.parse(localStorage.getItem('auth') ?? 'false')

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        toggleAuth: (state, action: PayloadAction<boolean>) => {
                const flipState: boolean = !action.payload
                localStorage.setItem('auth', JSON.stringify(flipState))
                return !action.payload
        }
    }
})

export default authSlice.reducer
export const { toggleAuth} = authSlice.actions;