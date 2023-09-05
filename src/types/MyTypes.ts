import {Dispatch, SetStateAction} from "react";
import {AlertColor} from "@mui/material";

export type InputDataType = {
    key: number
    placeholder: string
    value: string
    name: string
    focus: boolean
}

export type TableDataType = {
    address?: string
    category?: string
    creationDate?: string
    key?: number
    lastSale?: string
    price?: string | number
    productName?: string
    remains?: number | string
    store?: string
    weight?: string
} & InputDataType

export type SellValue={
    remains?: string | number
    lastSale?: string | number
} | null
export interface IsellValue{
    sellValue: SellValue
    setSellValue: Dispatch<SetStateAction<SellValue | null >>
}
export interface IUser{
    address: string
    companyname: string
    email: string
    firstname: string
    id: number
    lastname: string
    password: string
}
export interface IErrors {
    email: string
    password: string
}

export interface IInputs {
    name: string
    label: string
    defaultValue?: string
    type: string
    classname: string
}
export interface ISnackBar {
    isOpen: boolean,
    alert: {
        action: null,
        text: {
            created: string,
            edited: {
                product: string,
                profile: string,
                password: string
            },
            sold: string,
            deleted: string},
        severity: {
            error:  AlertColor,
            warning:  AlertColor,
            info:  AlertColor,
            success:  AlertColor
        }
    }
}

export interface IErrorsAndValues{
    address?: string
    companyname?: string
    email?: string
    firstname?: string
    lastname?: string
    oldpassword?: string
    password?: string
    confirmpassword?: string
}

