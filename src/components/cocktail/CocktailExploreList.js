import { useEffect, useState, useCallback, useRef } from "react"
import { getCocktails, getCocktailById } from "../../managers/CocktailManager"
import { getCocktailLiquors } from "../../managers/CocktailIngredientManager"
import { getLiquors } from "../../managers/IngredientManager"
import "./CocktailExploreList.css"

export const CocktailList = () => {
        const [cocktails, setCocktails] = useState([])
        const [cocktailLiquors, setCocktailLiquors] = useState([])
        const [liquors, setLiquors] = useState([])
        const [filterCocktail, setFilterCocktail] = useState([])
        const [selectedLiquor, updateSelectedLiquor] = useState('')
        const [cocktailId, updateCocktailId] = useState('')
        const [currentCocktail, updateCurrentCocktail] = useState()
        
        const[showOverlay, setShowOverlay] = useState(false)
        const firstUpdate = useRef(true)

        useEffect(() => {
            getCocktails().then(setCocktails)
        }, [])
    
        useEffect(() => {
            getLiquors().then(setLiquors)
        }, [])
        
        useEffect(() => {
            if(firstUpdate.current) {
                firstUpdate.current = false
            }
            if(cocktailId === ''){
                updateCurrentCocktail()
            }
            else {
                getCocktailById(cocktailId).then(updateCurrentCocktail)
            }

        }, [cocktailId])


        useEffect(() => {
            getCocktailLiquors().then(setCocktailLiquors)
        }, [])

        useEffect(() => {
            const selectionFilter = cocktailLiquors.filter((cocktailLiq) => {return cocktailLiq?.liquor?.id === selectedLiquor })
          setFilterCocktail(selectionFilter)
        }, [selectedLiquor])

        

    const handleLiquorChange = (event) => {
        updateSelectedLiquor(parseInt(event.target.value))
        }

    const handleCocktailChange = (event) => {
        setShowOverlay(true)
        updateCocktailId(event.target.id)
    }

    const handleOverlay = (event) => {
        setShowOverlay(false)
        updateCocktailId(0)
    }

    const cocktailList = () => {
        let html = []
        if(selectedLiquor === 0 || selectedLiquor === "") {
            html.push(cocktails.map(cocktail => {
                return <div className = "explore-cocktail-item" key = {cocktail?.id}>
                        <h3 className = 'explore-cocktail-name'> {cocktail?.name}</h3>
                        <img className = "explore-cocktail-image" src= {cocktail?.image} id = {cocktail?.id}
                        onClick = {() => {return setShowOverlay(true), updateCocktailId(parseInt(cocktail?.id))}}
                        />
                    </div>
                        

            })
            )
        }
       else {
            html.push(filterCocktail.map(ct => {
                return <div className = "explore-cocktail-item" key = {ct?.cocktail?.id}>
                        <h3> {ct?.cocktail?.name}</h3>
                        <img className = "explore-cocktail-image" src= {ct?.cocktail?.image}
                            onClick = {() => {return setShowOverlay(true), updateCocktailId(parseInt(ct?.cocktail?.id))}}
                        />
                    </div>
            })
        )}

        return html
    }

    
    const currentCocktailIngredients = () => {
        let html =[]

        if(currentCocktail?.liquors.length > 0) {
            html.push(<b>Liquors Needed:</b>)
            html.push(currentCocktail?.liquors.map(liquor => {
                return <div key = {liquor.id}><li>{liquor.label}</li></div>
            }))
        }
        
        if(currentCocktail?.liqueurs.length > 0) {
            html.push(<b>Liqueurs Needed:</b>)
            html.push(currentCocktail?.liqueurs.map(liqueur => {
                return <div key = {liqueur.id}><li>{liqueur.name}</li></div>
            }))}

        if(currentCocktail?.staple_ingredients.length > 0){
            html.push(<b>Staple Ingredients Needed:</b>)
            html.push(currentCocktail?.staple_ingredients.map(staple => {
                return <div key = {staple.id}><li>{staple.name}</li></div>
                
            }))
        }
        //! Syrups
        // if(currentCocktail?.syrups.length > 0){
        //     html.push(<b>Syrups Needed:</b>)
        //     html.push(currentCocktail?.syrups.map(syrup => {
        //         return <div key = {syrup.id}><li>{syrup.name}</li></div>
                
        //     }))
        // }

        return html
    }


    const cocktailOverlay = () => {
        let html = []
        if (showOverlay) {
            html.push(
                <div className = 'explore-overlay'>
                    <section className = "explore-overlay-section">
                        <header className = 'explore-overlay-header'> 
                            <h2 className = 'explore-name-overlay'>{currentCocktail?.name}</h2>
                            <button className = "explore-close" onClick = {() => { return setShowOverlay(false), updateCocktailId('')}}> X </button> 
                        </header>
                        <section className = 'overlay-middle'>
                            <img className = "overlay-img" src = {currentCocktail?.image} />
                        <div className = 'overlay-details'> <div className = 'overlay-ingredients'>{currentCocktailIngredients()}</div>
                               <div><b>Recipe:</b></div> <div className = 'overlay-recipe'>{currentCocktail?.recipe}</div>
                        </div>
                        </section>
                        <footer className = 'overlay-footer'>Created By: {currentCocktail?.created_by_mixologist?.user?.username}</footer>
                    </section>
                </div>
            )
        }

        return html
    }
    

    
        return <>
            <div className = "cocktail_list">
                <div className = 'explore-header-select'>
                <h2 className = 'explore-header'>🍸︎ Discover New Cocktails 🍸︎ </h2>
                <select className = "liquors-dropdown"
                    onChange = {handleLiquorChange}>
                    <option value = "0"> Select Liquor</option>
                    {
                        liquors.map(liquor => {
                            return <option  key = {liquor.id} 
                            value = {liquor.id}> {liquor.label}</option>
                        })
                    }

                </select>
                </div>
                <div className = "cocktail_items">
            {
                cocktailList()                
            }   
            {
                cocktailOverlay()

            }
            </div>
        </div>
        </>
    }