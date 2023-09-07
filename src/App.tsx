import {SignUp} from "./components/SignUp";
import {SignIn} from "./components/SignIn";
import {Layout} from "./components/Layout/Layout";
import {MySales} from "./components/MySales/MySales";
import {Cabinet} from "./components/Cabinet/Cabinet";
import {MyProducts} from "./components/MyProducts/MyProducts";
import {MainPage} from "./components/MainPage/MainPage";
import {Routes, Route, Navigate} from "react-router-dom";
import {ModalProduct} from "./components/ModalProduct/ModalProduct";
import React, {useEffect, useState} from "react";
import { useAppSelector } from "../hooks";
import {InputDataType, SellValue, TableDataType} from "./types/MyTypes";

const inputData = [
    {key: 1, placeholder: 'Store', value:'', name:'store', focus: false},
    {key: 2, placeholder: 'Price', value:'', name:'price', focus: false},
    {key: 3, placeholder: 'Product name', value:'', name:'productName', focus: false},
    {key: 4, placeholder: 'Product Category', value:'', name:'category', focus: false},
    {key: 5, placeholder: 'Quantity of goods', value:'', name:'remains', focus: false},
    {key: 6, placeholder: 'Weight/Volume of one item', value:'', name:'weight', focus: false}
]
export const App = () => {
    const[inputState, setInputState] = useState<TableDataType[] | InputDataType>(inputData)
    const [showModal, setShowModal] = useState<boolean>(false);
    const [sellValue, setSellValue] = useState<SellValue>(null);
    const auth = useAppSelector((state) => state.auth)

    useEffect(() => {
        localStorage.setItem('auth', JSON.stringify(auth))
    },[auth])

    return !auth ?
        <>
            <Routes>
                <Route path="/login" element={<SignIn  />} />
                <Route path="/register" element={<SignUp  />} />
                <Route path="*" element={<Navigate to='/register' replace />} />
            </Routes>
        </> : <>
            <Routes>
                <Route path='/' element={
                    <Layout
                        modal={showModal}
                        setModal={setShowModal}
                        data={inputState as InputDataType[]}
                    />
                }>
                    <Route index element={<MainPage  />} />
                    <Route path="/create" element={<ModalProduct modal={showModal} setModal={setShowModal}  data={inputData}/>} />
                    <Route path="/cabinet" element={<Cabinet />} />
                    <Route path="/sales" element={<MySales />} />
                    <Route path="/products" element={
                        <MyProducts
                            sellValue={sellValue}
                            setSellValue={setSellValue}
                            inputstate={inputState as TableDataType}
                        />
                    }/>
                    <Route path="*" element={<Navigate to='/' replace />} />
                </Route>
            </Routes>
        </>
}