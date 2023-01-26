import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { newestCocktails } from "../../managers/CocktailManager"
import { getLiquors } from "../../managers/IngredientManager"
import "./CocktailFeed.css"

export const CocktailFeed = () => {
        const [cocktails, setCocktails] = useState([])
        const navigate = useNavigate()
    
        useEffect(() => {
            newestCocktails().then(setCocktails)
        }, [])
    

    
    
    
    
        return <div className = "cocktail-feed">
               <h1 className = 'feed-header'> 🍸︎ Recently Added Cocktails 🍸︎</h1>
            {
                cocktails.map(cocktail => {
                    return <div className = "cocktail-feed-item" key = {cocktail.id}>
                            {/* <h3> <Link to = {`/cocktails/${cocktail.id}`}>{cocktail.name}</Link></h3> */}
                             <div className = 'cocktail-post-img'> 
                                <img className = "cocktail-feed-image" src= {cocktail.image}/>
                            </div>
                                <p className = "cocktail-feed-caption">{cocktail?.post_cocktail[0]?.caption}</p>
                            </div>
                })
            }
        </div>
            
    }