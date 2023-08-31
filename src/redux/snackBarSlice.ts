import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    alert: {
        action: null,
        text: {
            created: 'Товар создан!',
            edited: {
                product: 'Товар изменен!',
                profile: 'Профиль изменен!',
                password: 'Пароль изменен!'
            },
            sold: 'Товар продан!',
            deleted: 'Товар удалён!'
        },
        severity: {
            error: 'error',
            warning: 'warning',
            info: 'info',
            success: 'success'
        }
    },
}
const snackBarSlice = createSlice({
    name:'snackBar',
    initialState,
    reducers:{
        toggleOpen: (state) => {
            const a = (a) => !a
            return {...state,
                isOpen: a(state.isOpen)
            }
        },
        switchAction: (state, action) => {
            return {...state,
                alert: {
                ...state.alert, action: action.payload}
            }
        }
    }
})

export default snackBarSlice.reducer
export const { toggleOpen , switchAction} = snackBarSlice.actions
