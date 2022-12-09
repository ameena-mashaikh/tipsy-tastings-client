import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getCocktails } from "../../managers/CocktailManager"
import "./Cocktails.css"

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
    
    
    
    
        return <div className = "cocktail_list">
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