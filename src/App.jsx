import {SignUp} from "./components/SignUp";
import {Routes, Route} from "react-router-dom";
import {SignIn} from "./components/SignIn/index.js";
export const App = () => {
    return (
        <>
            <Routes>
                <Route path="/register" element={<SignUp />} />
                <Route path="/login" element={<SignIn />} />
            </Routes>
        </>
    )
}