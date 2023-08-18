import {SignUp} from "./components/SignUp";
import {SignIn} from "./components/SignIn/index.js";
import {Layout} from "./components/Layout/Layout.jsx";
import {MySales} from "./components/MySales/MySales.jsx";
import {Cabinet} from "./components/Cabinet/Cabinet.jsx";
import {MyProducts} from "./components/MyProducts/MyProducts.jsx";
import {MainPage} from "./components/MainPage/MainPage.jsx";
import {Routes, Route, Navigate} from "react-router-dom";
import {ModalProduct} from "./components/ModalProduct/ModalProduct.jsx";
import {useEffect, useState} from "react";
import { useSelector} from "react-redux";

const inputData = [
    {key: 1, placeholder: 'Store', value:'', name:'store', focus: false},
    {key: 2, placeholder: 'Price', value:'', name:'price', focus: false},
    {key: 3, placeholder: 'Product name', value:'', name:'productName', focus: false},
    {key: 4, placeholder: 'Product Category', value:'', name:'category', focus: false},
    {key: 5, placeholder: 'Quantity of goods', value:'', name:'remains'},
    {key: 6, placeholder: 'Weight/Volume of one item', value:'', name:'weight', focus: false}
]

export const App = () => {
    const[inputState, setInputState] = useState(inputData)
    const [showModal, setShowModal] = useState(false);
    const [sellValue, setSellValue] = useState(null);
    const auth = useSelector((state) => state.auth)

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
                <Route path='/' element={<Layout   modal={showModal} setModal={setShowModal} data={inputState} setData={setInputState} />}>
                    <Route index element={<MainPage  />} />
                    <Route path="/create" element={<ModalProduct />} />
                    <Route path="/cabinet" element={<Cabinet />} />
                    <Route path="/sales" element={<MySales sellValue={sellValue} setSellValue={setSellValue} />} />
                    <Route path="/products" element={<MyProducts  sellValue={sellValue} setSellValue={setSellValue} inputstate={inputState}/>} />
                    <Route path="*" element={<Navigate to='/' replace />} />
                </Route>
            </Routes>
        </>
}