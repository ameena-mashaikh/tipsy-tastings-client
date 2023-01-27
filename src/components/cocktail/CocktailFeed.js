import { useEffect, useState, useCallback, useRef} from "react"
import { newestCocktails, getCocktailById } from "../../managers/CocktailManager"
import { getLiquors } from "../../managers/IngredientManager"
import "./CocktailFeed.css"

export const CocktailFeed = () => {

    const [cocktails, setCocktails] = useState([])
    const [cocktailId, updateCocktailId] = useState('')
    const [currentCocktail, updateCurrentCocktail] = useState()

    const[showOverlay, setShowOverlay] = useState(false)
    const firstUpdate = useRef(true)

    useEffect(() => {
        newestCocktails().then(setCocktails)
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
                        <footer className = 'overlay-footer'>Created By: {currentCocktail?.created_by_mixologist?.user?.username}</footer>
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





    return <div className = "cocktail-feed">
            <h1 className = 'feed-header'> 🍸︎ Recently Added Cocktails 🍸︎</h1>
        {
            cocktails.map(cocktail => {
                return <div className = "cocktail-feed-item" key = {cocktail.id}>
                        {/* <h3> <Link to = {`/cocktails/${cocktail.id}`}>{cocktail.name}</Link></h3> */}
                            <div className = 'cocktail-post-img'> 
                            <img className = "cocktail-feed-image" src= {cocktail.image}
                                onClick = {() => {return setShowOverlay(true), updateCocktailId(parseInt(cocktail?.id))}}
                            />
                        </div>
                            <p className = "cocktail-feed-caption">{cocktail?.post_cocktail[0]?.caption}</p>
                        </div>
            })
        }
        {
            cocktailOverlay()
        }
    </div>
        
}