import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { newestCocktails } from "../../managers/CocktailManager"
import { getLiquors } from "../../managers/IngredientManager"
import "./Cocktails.css"

export const CocktailFeed = () => {
        const [cocktails, setCocktails] = useState([])
        const navigate = useNavigate()
    
        useEffect(() => {
            newestCocktails().then(setCocktails)
        }, [])
    

    
    
    
    
        return <div className = "cocktail_feed">
               
            {
                cocktails.map(cocktail => {
                    return <div className = "cocktail-item" key = {cocktail.id}>
                            <h3> <Link to = {`/cocktails/${cocktail.id}`}>{cocktail.name}</Link></h3>
                            <img className = "cocktail-image" src= {cocktail.image}/>
                        
                        </div>
                })
            }
        </div>
            
    }