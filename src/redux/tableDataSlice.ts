import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { productDate, fixDataValue } from './functions'
import {currentUser} from "../components/Cabinet";
import {SellValue, TableDataType} from "../types/MyTypes";

type InitStateType = {
    tableData: TableDataType[]
    dataEdit: TableDataType
    sellData: TableDataType[]
}

const initialState: InitStateType ={
    tableData: JSON.parse(localStorage.getItem('tableData') ?? "") ?? [],
    dataEdit: {} as TableDataType,
    sellData: JSON.parse(localStorage.getItem('sellData') ?? "") ?? []
}

const tableDataSlice = createSlice({
    name: 'tableData',
    initialState,
    reducers: {
        deleteRow: (state, action: PayloadAction<number | null>) => {
            state.tableData = state.tableData.filter((el) => el.key !== action.payload);
            localStorage.setItem("tableData", JSON.stringify(state.tableData));
            },

        addRow: (state= initialState, action: PayloadAction<TableDataType>) => {
             state?.tableData?.unshift({...action.payload,
                     key: (new Date).getTime(),
                     address: currentUser.address,
                     creationDate: productDate()
                 })
            localStorage.setItem("tableData", JSON.stringify(state.tableData));
        },

        takeTableData: (state , action: PayloadAction<TableDataType>) => {
            state.dataEdit = {...action.payload}
        },

        editRow: (state , action: PayloadAction<TableDataType>) => {
            state.tableData = state.tableData.map((item) => {
                if (item.key === state.dataEdit.key) {
                    return action.payload
                }
                return item
            })
            localStorage.setItem("tableData", JSON.stringify(state.tableData));
    },
        sellItem: (state, action: PayloadAction<SellValue>) => {
            state.tableData = state.tableData.map((item) => {
                if (item.key === state.dataEdit.key) {
                    if(action.payload!.remains && action.payload!.lastSale){
                        return {...item, remains: +state.dataEdit?.remains! - +action.payload!.remains,
                        lastSale: fixDataValue(action.payload!.lastSale as string)}
                    }
                }
                return item
                })

            const zeroFilter = state.tableData.filter((e)=> (+e.remains! > 0))
            const hasSellItem = state.sellData?.filter((el) => el?.key === state.dataEdit?.key);
            const tableSellFix = state.sellData?.map(item => {
                if (item?.key === state.dataEdit?.key) {
                    return {
                        ...state.dataEdit,
                        remains: Number(item?.remains) + Number(action.payload?.remains),
                        lastSale: fixDataValue(action.payload!.lastSale as string)}
                }
                return item;
            });

            state.tableData = zeroFilter.length ? state.tableData : zeroFilter
            state.sellData = hasSellItem?.length > 0
                ? tableSellFix
                : [{
                    ...state.dataEdit,
                    remains: `${action.payload!.remains}`,
                    lastSale: fixDataValue(action.payload?.lastSale as string)
                },
                    ...state.sellData
                ];
            localStorage.setItem("tableData", JSON.stringify(state.tableData));
            localStorage.setItem("sellData", JSON.stringify(state.sellData));
        }
    }
})


export default tableDataSlice.reducer
export const { deleteRow, addRow, takeTableData, editRow, sellItem} = tableDataSlice.actions