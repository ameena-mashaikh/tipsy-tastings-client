import { Route, Routes } from "react-router-dom"
import { MyCocktailPosts } from "../components/cocktailPosts/MyCocktailPosts"
import { CocktailList } from "../components/cocktail/CocktailList"
import { CocktailDetails } from "../components/cocktail/CocktailDetails"
import { CocktailPostDetails } from "../components/cocktailPosts/CocktailPostDetails"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"

export const ApplicationViews = ({token, setToken}) => {
    return <>
        <Routes>
            <Route path="/login" element={<Login  setToken={setToken} />} />
            <Route path="/register" element={<Register  setToken={setToken} />} />
            <Route element={<Authorized  setToken={token} />}>
                
                <Route path="/my_cocktails" element={<MyCocktailPosts />} />
                <Route path="/explore_cocktails" element={<CocktailList />} />
                <Route path="/cocktails/:cocktailId" element={<CocktailDetails />} />
                <Route path="/my_cocktails/:cocktailId" element={<CocktailPostDetails />} />

            </Route>
        </Routes>
    </>
}