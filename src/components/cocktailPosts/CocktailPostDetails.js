import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getCocktailById, deleteCocktail } from "../../managers/CocktailManager"
import "./CocktailPostDetails.css"

export const CocktailPostDetails = () => {
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
                    <div className = "cocktail-caption">
                        <b>Caption: </b>
                        {cocktail?.post_cocktail.map((post) => {return post?.caption})}
                    </div>
                    <p><Link to = {`/cocktails/${cocktailId}`}>Click Here for the Recipe!</Link></p>
                    <button onClick = {() => {navigate(`/my_cocktails/edit/${cocktailId}`)}}>Edit Cocktail</button>
                    <button onClick = {() => {
                        const cocktailDelete = {
                            id: cocktail.id
                        }
                        deleteCocktail(cocktailDelete)
                        .then(() => navigate("/my_cocktails"))                   
                    }}>
                        Delete Cocktail</button>


                </div>
            </div>
            
    }