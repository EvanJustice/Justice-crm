import {SignUp} from "./components/SignUp";
import {SignIn} from "./components/SignIn/index.js";
import {Layout} from "./components/Layout/Layout.jsx";
import {MySales} from "./components/MySales/MySales.jsx";
import {Cabinet} from "./components/Cabinet/Cabinet.jsx";
import {MyProducts} from "./components/MyProducts/MyProducts.jsx";
import {MainPage} from "./components/MainPage/MainPage.jsx";
import { Routes, Route} from "react-router-dom";

export const App = () => {

    return (
        <>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<MainPage />} />
                    <Route path="/cabinet" element={<Cabinet />} />
                    <Route path="/sales" element={<MySales />} />
                    <Route path="/products" element={<MyProducts />} />
                    <Route path="/register" element={<SignUp />} />
                    <Route path="/login" element={<SignIn />} />
                </Route>
            </Routes>
        </>
    )
}