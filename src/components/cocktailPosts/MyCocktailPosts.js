import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getCocktailsByMixologist } from "../../managers/CocktailManager"
import "./MyCocktailPosts.css"


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
    
    
    
    
        return <div className = "my-cocktails-page">
            <header className = 'my-cocktails-header'><h2> My Cocktails </h2>
            <button className = "new-cocktail" onClick = {() => {navigate(`/new_cocktail`)}}>Add A New Cocktail Creation</button></header>
            <div className = 'all-my-cocktails'>
            {
                cocktails.map(cocktail => {
                    return <>
                            <img className = "my-cocktail-image" src= {cocktail.image} key = {cocktail.id}/>
                        </>
                })
            }
        </div>
        </div>
            
    }