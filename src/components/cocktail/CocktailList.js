import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getCocktails } from "../../managers/CocktailManager"
import { getCocktailLiquors } from "../../managers/CocktailngredientManager"
import { getLiquors } from "../../managers/IngredientManager"
import "./Cocktails.css"

export const CocktailList = () => {
        const [cocktails, setCocktails] = useState([])
        const [cocktailLiquors, setCocktailLiquors] = useState([])
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
        


        useEffect(() => {
            getCocktailLiquors().then(setCocktailLiquors)
        }, [])

        useEffect(() => {
            const selectionFilter = cocktailLiquors.filter((cocktailLiq) => {return cocktailLiq?.liquor?.id === selectedLiquor })
          setFilterCocktail(selectionFilter)
        }, [selectedLiquor])

        //&& cocktails.filter((ct) =>{return ct?.id === cocktailLiq?.cocktail?.id})


    const handleLiquorChange = (event) => {
        updateSelectedLiquor(parseInt(event.target.value))
        }

    const cocktailList = () => {
        let html = []
        if(selectedLiquor === 0 || selectedLiquor === "") {
            html.push(cocktails.map(cocktail => {
                return <div className = "cocktail-item" key = {cocktail?.id}>
                        <h3> <Link to = {`/cocktails/${cocktail?.id}`}>{cocktail?.name}</Link></h3>
                        <img className = "cocktail-image" src= {cocktail?.image}/>
                    
                    </div>
            })
        )
        }
       else {
            html.push(filterCocktail.map(ct => {
                return <div className = "cocktail-item" key = {ct?.cocktail?.id}>
                        <h3> <Link to = {`/cocktails/${ct?.cocktail?.id}`}>{ct?.cocktail?.name}</Link></h3>
                        <img className = "cocktail-image" src= {ct?.cocktail?.image}/>
                    
                    </div>
            })
        )}

        return html
    }
    


    
        return <div className = "cocktail_list">
                <select className = "liquors_dropdown"
                    onChange = {handleLiquorChange}>
                    <option value = "0"> Select Liquor</option>
                    {
                        liquors.map(liquor => {
                            return <option  key = {liquor.id} 
                            value = {liquor.id}> {liquor.label}</option>
                        })
                    }

                </select>
            {
                // filterCocktail.map(ct => {
                //     return <div className = "cocktail-item" key = {ct?.cocktail?.id}>
                //             <h3> <Link to = {`/cocktails/${ct?.cocktail?.id}`}>{ct?.cocktail?.name}</Link></h3>
                //             <img className = "cocktail-image" src= {ct?.cocktail?.image}/>
                        
                //         </div>
                // })
                cocktailList()
            }
        </div>
            
    }