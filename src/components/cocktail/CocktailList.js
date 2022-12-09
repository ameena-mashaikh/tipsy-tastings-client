import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getCocktails } from "../../managers/CocktailManager"

export const CocktailList = () => {
        const [cocktails, setCocktails] = useState([])
        const navigate = useNavigate()
    
    
        useEffect(() => {
            getCocktails().then(setCocktails)
        }, [])
    
        // const updatePostList = () => {
        //     getPostsByAuthor().then(setPosts)
        // }
    
        // useEffect(()=> {
        //     updatePostList()
        // }, [])
    
    
    
    
        return <div className = "mixologist_cocktail_list">
            {
                cocktails.map(cocktail => {
                    return <div className = "cocktail-item">
                            <h3> <Link>{cocktail.name}</Link></h3>
                            <img className = "cocktail-image" src= {cocktail.image}/>
                        
                        </div>
                })
            }
        </div>
            
    }