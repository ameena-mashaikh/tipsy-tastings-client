import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getCocktailsByMixologist } from "../../managers/CocktailManager"

export const MyCocktailPosts = () => {
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
    
    
    
    
        return <div className = "mixologist_cocktails">
            {
                cocktails.map(cocktail => {
                    return <div className = "cocktail-item" key = {cocktail.id}>
                            <Link to = {`/my_cocktails/${cocktail.id}`}><img className = "cocktail-image" src= {cocktail.image}/></Link>
                        </div>
                })
            }
            <button className = "new_cocktail" onClick = {() => {navigate(`/new_cocktail`)}}>Add A New Cocktail</button>
        </div>
            
    }