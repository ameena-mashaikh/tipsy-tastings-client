import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getCocktailsByMixologist } from "../../managers/CocktailManager"

export const MyCocktails = () => {
        const [cocktails, setCocktails] = useState([])
        const navigate = useNavigate()
    
    
        useEffect(() => {
            getCocktailsByMixologist().then(setCocktails)
        }, [])
    
        // const updatePostList = () => {
        //     getPostsByAuthor().then(setPosts)
        // }
    
        // useEffect(()=> {
        //     updatePostList()
        // }, [])
    
    
    
    
        return <div className = "mixologist_cocktail_list">
            
        </div>
            
    }