import { Route, Routes } from "react-router-dom"
import { Cocktails } from "../components/cocktail/Cocktails"


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/cocktails" element={<Cocktails />} />
        </Routes>
    </>
}