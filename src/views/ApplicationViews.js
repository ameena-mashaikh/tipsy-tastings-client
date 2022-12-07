import { Route, Routes } from "react-router-dom"
import { Cocktails } from "../components/cocktail/Cocktails"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"

export const ApplicationViews = ({token, setToken}) => {
    return <>
        <Routes>
            <Route path="/login" element={<Login  setToken={setToken} />} />
            <Route path="/register" element={<Register  setToken={setToken} />} />
            <Route element={<Authorized  setToken={token} />}>
                
                <Route path="/cocktails" element={<Cocktails />} />
            </Route>
        </Routes>
    </>
}