import {Dispatch, SetStateAction} from "react";

export type InputDataType = {
    key: number
    placeholder: string
    value: string
    name: string
    focus: boolean
}
export type ModalType ={
    modal: boolean
    setModal: Dispatch<SetStateAction<boolean>>
}
export type SellValueType = {
    sellValue: {
        [key: string]: number | null
    }
    setSellValue: Dispatch<SetStateAction<{[key: string]: number | null} | null>>
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
}
export type ShowSellModalType = {
    showSellModal: boolean
    setShowSellModal: Dispatch<SetStateAction<boolean>>
}
