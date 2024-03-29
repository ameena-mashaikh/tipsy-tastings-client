import { Route, Routes } from "react-router-dom"
import { MyCocktailPosts } from "../components/cocktailPosts/MyCocktailPosts"
import { CocktailList } from "../components/cocktail/CocktailExploreList"
import { CocktailDetails } from "../components/cocktail/CocktailDetails"
import { CocktailPostDetails } from "../components/cocktailPosts/CocktailPostDetails"
import { CocktailPostForm } from "../components/cocktailPosts/CocktailForm"
import { CocktailEdit } from "../components/cocktailPosts/CocktailEdit"
import { Homepage } from "../components/home/Homepage"
import { CocktailFeed } from "../components/cocktail/CocktailFeed"
import { FormCocktailTest } from "../components/cocktailPosts/FormCocktailTest"
import { CocktailEditTest } from "../components/cocktailPosts/EditCocktailTest"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"

export const ApplicationViews = ({token, setToken}) => {
    return <>
        <Routes>
            <Route path="/login" element={<Login  setToken={setToken} />} />
            <Route path="/register" element={<Register  setToken={setToken} />} />
            <Route element={<Authorized  setToken={token} />}>
                <Route path="/" element={<Homepage />} />
                <Route path="/my_feed" element={<CocktailFeed />} />
                <Route path="/my_cocktails" element={<MyCocktailPosts />} />
                <Route path="/new_cocktail" element={<FormCocktailTest />} />
                <Route path="/explore_cocktails" element={<CocktailList />} />
                <Route path="/cocktails/:cocktailId" element={<CocktailDetails />} />
                <Route path="/my_cocktails/:cocktailId" element={<CocktailPostDetails />} />
                <Route path="/my_cocktails/edit/:cocktailId" element={<CocktailEditTest />} />


            </Route>
        </Routes>
    </>
}