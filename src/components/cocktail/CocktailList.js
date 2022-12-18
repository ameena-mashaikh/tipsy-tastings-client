import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getCocktails } from "../../managers/CocktailManager"
import { getLiquors } from "../../managers/IngredientManager"
import "./Cocktails.css"

export const CocktailList = () => {
        const [cocktails, setCocktails] = useState([])
        const navigate = useNavigate()
        const [liquors, setLiquors] = useState([])
    
        useEffect(() => {
            getCocktails().then(setCocktails)
        }, [])
    
        useEffect(() => {
            getLiquors().then(setLiquors)
        }, [])
        // const updatePostList = () => {
        //     getPostsByAuthor().then(setPosts)
        // }
    
        // useEffect(()=> {
        //     updatePostList()
        // }, [])
    
    
    
    
        return <div className = "cocktail_list">
                <select className = "liquors_dropdown">
                    <option value = "0"> Select Liquor</option>
                    {
                        liquors.map(liquor => {
                            return <option  key = {liquor.id} 
                            value = {liquor.id}> {liquor.label}</option>
                        })
                    }

                </select>
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