import {createSlice} from "@reduxjs/toolkit";
import {IUser} from "../types/MyTypes";


const initialState: IUser[] = JSON.parse(localStorage.getItem('users') ?? '[]') ?? []

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.push(
                {
                    id: (new Date).getTime(),
                    ...action.payload,
                    address: "Krylatskaya street, 15"
                }
            )
            localStorage.setItem('users', JSON.stringify(state))
        }
        }
})

export default usersSlice.reducer
export const { addUser } = usersSlice.actions;