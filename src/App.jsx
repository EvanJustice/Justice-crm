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

const inputData = [
    {key: 1, placeholder: 'Store', value:'', name:'store'},
    {key: 2, placeholder: 'Price', value:'', name:'price'},
    {key: 3, placeholder: 'Product name', value:'', name:'productName'},
    {key: 4, placeholder: 'Product Category', value:'', name:'category'},
    {key: 5, placeholder: 'Quantity of goods', value:'', name:'remains'},
    {key: 6, placeholder: 'Weight/Volume of one item', value:'', name:'weight'}
]

export const App = () => {
    const[inputState, setInputState] = useState(inputData)
    const [showModal, setShowModal] = useState(false);
    const [sellValue, setSellValue] = useState(null);
    const [auth, setAuth] = useState(false)
    useEffect(() => {
        localStorage.setItem('auth', JSON.stringify(auth))
    },[auth])

    return !auth ?
        <>
            <Routes>
                <Route path="/login" element={<SignIn auth={auth} setAuth={setAuth} />} />
                <Route path="/register" element={<SignUp auth={auth} setAuth={setAuth} />} />
                <Route path="*" element={<Navigate to='/register' replace />} />
            </Routes>
        </> : <>
            <Routes>
                <Route path='/' element={<Layout setAuth={setAuth}  modal={showModal} setModal={setShowModal} data={inputState} setData={setInputState} />}>
                    <Route index element={<MainPage />} />
                    <Route path="/create" element={<ModalProduct />} />
                    <Route path="/cabinet" element={<Cabinet />} />
                    <Route path="/sales" element={<MySales sellValue={sellValue} setSellValue={setSellValue} />} />
                    <Route path="/products" element={<MyProducts  sellValue={sellValue} setSellValue={setSellValue} inputstate={inputState}/>} />
                    <Route path="*" element={<Navigate to='/' replace />} />
                </Route>
            </Routes>
        </>
}