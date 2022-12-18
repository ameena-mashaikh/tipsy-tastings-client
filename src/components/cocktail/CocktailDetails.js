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
                    <div className = "mixologist_cocktail_list">
                        <div className = "cocktail-detail-item">
                            <h3> {cocktail?.name}</h3>
                            <img className = "cocktail-image" src= {cocktail?.image}/>
                            <div className = "cocktail-ingredients">
                                <b>Liquors Needed:</b>
                                {cocktail?.liquors.map(liquor => {
                                    return <div>{liquor.label}</div>
                                })}

                                <b>Liqueurs Needed:</b>
                                {cocktail?.liqueurs.map(liqueur => {
                                    return <div>{liqueur.name}</div>
                                })}

                                <b>Staple Ingredients Needed:</b>
                                {cocktail?.staple_ingredients.map(staple => {
                                    return <div>{staple.name}</div>
                                })}
                            </div>
                            <div className = "cocktail-recipe"> <b>Recipe:</b> {cocktail?.recipe}</div>
                            <div className = "cocktail-creator"><b>Created By: </b>{cocktail?.created_by_mixologist?.user?.username}</div>
                </div>
            </div>
                </div>
            </div>
            
    }