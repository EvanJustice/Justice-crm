import {SignUp} from "./components/SignUp";
import {SignIn} from "./components/SignIn/index.js";
import {Layout} from "./components/Layout/Layout.jsx";
import {MySales} from "./components/MySales/MySales.jsx";
import {Cabinet} from "./components/Cabinet/Cabinet.jsx";
import {MyProducts} from "./components/MyProducts/MyProducts.jsx";
import {MainPage} from "./components/MainPage/MainPage.jsx";
import {Routes, Route, useLocation} from "react-router-dom";
import {ModalProduct} from "./components/ModalProduct/ModalProduct.jsx";
import {useState} from "react";

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
    const [tableData, setTableData] = useState([]);
    const [sellValue, setSellValue] = useState(null);
    const [sellData, setSellData] = useState([])

    const location = useLocation()

    return (
        <>
            <Routes>
                <Route path='/' element={<Layout tableData={tableData} setTableData={setTableData} modal={showModal} setModal={setShowModal} data={inputState} setData={setInputState} />}>
                    <Route index element={<MainPage />} />
                    <Route path="/create" element={<ModalProduct />} />
                    <Route path="/cabinet" element={<Cabinet />} />
                    <Route path="/sales" element={<MySales setSellData={setSellData} sellData={sellData} sellValue={sellValue} setSellValue={setSellValue} tableData={tableData} setTableData={setTableData}/>} />
                    <Route path="/products" element={<MyProducts sellData={sellData} setSellData={setSellData} sellValue={sellValue} setSellValue={setSellValue} tableData={tableData} setTable={setTableData} inputstate={inputState}/>} />
                </Route>
                <Route path="/register" element={<SignUp />} />
                <Route path="/login" element={<SignIn />} />
            </Routes>
        </>
    )
}