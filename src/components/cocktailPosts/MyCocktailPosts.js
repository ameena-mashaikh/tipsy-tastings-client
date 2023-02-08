import { useEffect, useState, useRef } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getCocktailsByMixologist } from "../../managers/CocktailManager"
import { getCocktails, getCocktailById, deleteCocktail } from "../../managers/CocktailManager"
import "./MyCocktailPosts.css"


export const MyCocktailPosts = () => {

    const [cocktails, setCocktails] = useState([])
    const [cocktailId, updateCocktailId] = useState('')
    const [currentCocktail, updateCurrentCocktail] = useState()
    const[showOverlay, setShowOverlay] = useState(false)
    
    
    const firstUpdate = useRef(true)
    const navigate = useNavigate()


    useEffect(() => {
        getCocktailsByMixologist().then(setCocktails)
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

    const updateCocktailList = () => {
        getCocktailsByMixologist().then(setCocktails)
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
                        <section className = 'feed-overlay-middle'>
                            <img className = "overlay-img" src = {currentCocktail?.image} />
                        <div className = 'feed-overlay-details'> <div className = 'overlay-ingredients'>{currentCocktailIngredients()}</div>
                               <div><b>Recipe:</b></div> {currentCocktail?.recipe}
                        </div>
                        </section>
                        <footer className = 'overlay-footer'>
                            <div className = 'edit-delete-btns'>
                                <button className = "edit-cocktail-btn" onClick = {() => {navigate(`/my_cocktails/edit/${currentCocktail.id}`)}}> Edit Cocktail</button>
                                <button className = 'delete-cocktail-btn' 
                                    onClick = 
                                    {(event) => {
                                        event.preventDefault()
                                        setShowOverlay(false)
                                        const cocktailDelete = {
                                            id: currentCocktail.id
                                        }
                                        deleteCocktail(cocktailDelete)
                                        .then(updateCocktailList)  }}>
                                        Delete Cocktail
                                </button>                            
                            </div>
                        </footer>
                    </section>
                </div>
            )
        }

        return html
    }


    const currentCocktailIngredients = () => {
        let html =[]

        if(currentCocktail?.liquors.length > 0) {
            html.push(<b>Liquors Needed:</b>)
            html.push(currentCocktail?.liquors.map(liquor => {
                return <div className = 'explore-overlay-liquor' key = {liquor.id}><li>{liquor.label}</li></div>
            }))
        }
        
        if(currentCocktail?.liqueurs.length > 0) {
            html.push(<b>Liqueurs Needed:</b>)
            html.push(currentCocktail?.liqueurs.map(liqueur => {
                return <div className = 'explore-overlay-liqueur' key = {liqueur.id}><li>{liqueur.name}</li></div>
            }))}

        if(currentCocktail?.staple_ingredients.length > 0){
            html.push(<b>Staple Ingredients Needed:</b>)
            html.push(currentCocktail?.staple_ingredients.map(staple => {
                return <div className = 'explore-overlay-staple' key = {staple.id}><li>{staple.name}</li></div>
                
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



    return <div className = "my-cocktails-page">
        <header className = 'my-cocktails-header'><h2 className = 'cocktail-creations'> My Cocktail Creations </h2>
        <div className = 'new-cocktail-button-div'><button className = "new-cocktail-btn" onClick = {() => {navigate(`/new_cocktail`)}}> Add New Cocktail</button></div></header>
        <div className = 'all-my-cocktails'>
        {
            cocktails.map(cocktail => {
                return <>
                        <img className = "my-cocktail-image" src= {cocktail.image} key = {cocktail.id}
                            onClick = {() => {return setShowOverlay(true), updateCocktailId(parseInt(cocktail?.id))}}
                        />
                    </>
            })
        }
        {
            cocktailOverlay()
        }
    </div>
    </div>
        
}