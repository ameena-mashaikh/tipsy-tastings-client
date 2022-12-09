import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getCocktailById } from "../../managers/CocktailManager"
import "./Cocktails.css"

export const CocktailDetails = () => {
        const {cocktailId} = useParams()
        const [cocktail, setCocktail] = useState()
        const navigate = useNavigate()
    
    
        useEffect(() => {
            getCocktailById(cocktailId).then(setCocktail)
        }, [cocktailId])
    

    
    
    
        return <div className = "mixologist_cocktail_list">
                <div className = "cocktail-detail-item">
                    <h3> {cocktail?.name}</h3>
                    <img className = "cocktail-image" src= {cocktail?.image}/>
                    <div className = "cocktail-recipe"> {cocktail?.recipe}</div>
                    <div className = "cocktail-creator">Created By: {cocktail?.created_by_mixologist?.user?.username}</div>
                </div>
            </div>
            
    }