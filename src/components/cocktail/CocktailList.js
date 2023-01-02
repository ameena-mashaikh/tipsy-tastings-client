import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getCocktails } from "../../managers/CocktailManager"
import { getLiquors } from "../../managers/IngredientManager"
import "./Cocktails.css"

export const CocktailList = () => {
        const [cocktails, setCocktails] = useState([])
        const navigate = useNavigate()
        const [liquors, setLiquors] = useState([])
        const [filterCocktail, setFilterCocktail] = useState([])
        const [selectedLiquor, updateSelectedLiquor] = useState('')
    
        useEffect(() => {
            getCocktails().then(setCocktails)
        }, [])
    
        useEffect(() => {
            getLiquors().then(setLiquors)
        }, [])

        // useEffect(() => {
        //     getCocktails().then(setFilterCocktail)
        // }, [])


        useEffect(() => {


            const searchedCocktails = cocktails.filter((ct) => 
            {
                if(selectedLiquor!==0){
                    retirct?.liquors?.id === selectedLiquor
                }
            })
            setFilterCocktail(searchedCocktails)
        }, [updateSelectedLiquor])
    
    


    
        return <div className = "cocktail_list">
                <select className = "liquors_dropdown"
                    onChange = {(event) => updateSelectedLiquor(parseInt(event.target.value))}>
                    <option value = "0"> Select Liquor</option>
                    {
                        liquors.map(liquor => {
                            return <option  key = {liquor.id} 
                            value = {liquor.id}> {liquor.label}</option>
                        })
                    }

                </select>
            {
                filterCocktail.map(cocktail => {
                    return <div className = "cocktail-item" key = {cocktail.id}>
                            <h3> <Link to = {`/cocktails/${cocktail.id}`}>{cocktail.name}</Link></h3>
                            <img className = "cocktail-image" src= {cocktail.image}/>
                        
                        </div>
                })
            }
        </div>
            
    }