import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getLiquors, getLiqueurs, getStapleIngredients } from "../../managers/IngredientManager"
import { getCategories } from "../../managers/CategoryManager"
import "./CocktailPosts.css"
import { updateCocktail, getCocktailById} from "../../managers/CocktailManager"
import { updateCocktailLiqueur, updateCocktailLiquor, updateCocktailStapleIngredient, getAllCocktailLiquor, deleteCocktailLiquor, createCocktailLiquor } from "../../managers/CocktailngredientManager"
import { updateCocktailPost, getCocktailPostById, getCocktailPosts } from "../../managers/CocktailPostManager"



export const CocktailEdit = () => {
    const [liquors, setLiquors] = useState([])
    const [liqueurs, setLiqueurs] = useState([])
    const [stapleIngredients, setStapleIngredients] = useState([])


    const [categories, setCategories] = useState([])
    const [chosenCategory, setChosenCategory] = useState(0)

    const [showLiquors, setShowLiquors] = useState(false)
    const [showLiqueurs, setShowLiqueurs] = useState(false)
    const [showStapleIngredients, setShowStapleIngredients] = useState(false)

    const [selectedLiquors, updateSelectedLiquors] = useState(new Set())
    const [selectedLiqueurs, updateSelectedLiqueurs] = useState(new Set())
    const [selectedStapleIngredients, updateSelectedStapleIngredients] = useState(new Set())

    const [currentCocktailLiquors, updateCurrentCocktailLiquors] =useState([])
    const navigate = useNavigate()
    const {cocktailId} = useParams()


    

    const [currentCocktail, setCurrentCocktail] = useState({
        id:0,
        name: '',
        category: 0,
        recipe: "",
        image: "",
        liquors: [],
        liqueurs: [],
        staple_ingredients: []
    })

    const [currentCocktailPost, setCurrentCocktailPost] = useState({
        id:0,
        cocktail: 0,
        caption: ''
    })




    useEffect(() => {
        getCocktailById(cocktailId)
        .then((data)=>{
            setCurrentCocktail(data)
            const oldSelectedLiquors = new Set()
            const oldSelectedLiqueurs = new Set()
            const oldSelectedStaples = new Set()

            for (const liquor of data.liquors) {
                oldSelectedLiquors.add(liquor.id)
            }
            updateSelectedLiquors(oldSelectedLiquors)
            
            for (const liqueur of data.liqueurs) {
                oldSelectedLiqueurs.add(liqueur.id)
            }
            updateSelectedLiqueurs(oldSelectedLiqueurs)

            for (const staple of data.staple_ingredients) {
                oldSelectedStaples.add(staple.id)  
            }
            updateSelectedStapleIngredients(oldSelectedStaples)

        })
    }, [cocktailId])

    useEffect(() => {
        getAllCocktailLiquor(cocktailId)
        .then((data) => {
            updateCurrentCocktailLiquors(data)
        })
    },[cocktailId])
    

    
    useEffect(() => {
        getLiquors().then(setLiquors)
    }, [])
        
    useEffect(() => {
        getLiqueurs().then(setLiqueurs)
    }, [])

    useEffect(() => {
        getStapleIngredients().then(setStapleIngredients)
    }, [])

    useEffect(() => {
        getCategories().then(setCategories)
    }, [])

    useEffect(() => {
        setChosenCategory(currentCocktail.category.id)
        }, [currentCocktail])




    const changeCocktailState= (domEvent) => {
        const copy = {...currentCocktail}
        const modify = domEvent.target.id
        copy[modify] = domEvent.target.value
        setCurrentCocktail(copy)
    }

    // const changeCocktailPostState= (domEvent) => {
    //     const copy = {...currentCocktailPost}
    //     const modify = domEvent.target.id
    //     copy[modify] = domEvent.target.value
    //     setCurrentCocktailPost(copy)
    // }

    const LiquorCheckboxes = () => {
        let html = []
        liquors.map((liquor) => {
            if (showLiquors) {
                html.push(
                    <div className = "liquor_checkboxes" key = {`liquor--${liquor.id}`}>
                        <ul>
                            <label>
                                <input
                                    type = "checkbox"
                                    key = {`liquor--${liquor.id}`}
                                    // checked = {selectedLiquors.has(liquor.id)}
                                    // defaultChecked = {
                                    //     currentCocktail.liquors.find(liq => liq.id === liquor.id) ? true : false
                                    // }
                                    defaultChecked = {selectedLiquors.has(liquor.id)}
                                    checked = {selectedLiquors.has(liquor.id)}
                                    onChange={(event) => {
                                        const copy = new Set(selectedLiquors)
                                        if (copy.has(liquor.id))
                                        {
                                             copy.delete(liquor.id)
                                        //     currentCocktailLiquors.map((liq) => {
                                        //         if (liq.liquor.id === liquor.id) {
                                        //             return deleteCocktailLiquor(liq.id)
                                        //         }
                                        //         // else {
                                        //         //     const newLiq = {
                                        //         //         cocktail: currentCocktail.id, 
                                        //         //         liquor: liquor.id
                                        //         //     }
                                        //         //     return createCocktailLiquor(newLiq)
                                        //         // }
                                               
                                            
                                        //   }
                                        //   )                                                

                                        }
                                        else {
                                            copy.add(liquor.id)
                                            // currentCocktailLiquors.map((liq) => {
                                            //     if ((liq.liquor.id !== liquor.id )|| (liq.liquor == [])) {
                                            //         const newLiq = {
                                            //             cocktail: currentCocktail.id, 
                                            //             liquor: liquor.id
                                            //         }
                                            //         return createCocktailLiquor(newLiq)
                                            //     }
                                            // })
                                        }
                                        
                                        updateSelectedLiquors(copy)
                                    }
                                    }
                                />
                                {liquor.label}
                            </label>
                        </ul>
                    </div>
                )   
            }

            else {
                <div></div>
            }
        })
        return html
    }


    const LiqueurCheckboxes = () => {
        let html = []
        liqueurs.map((liqueur) => {
            if (showLiqueurs) {
                html.push(
                    <div className = "liqueur_checkboxes" key = {`liqueur--${liqueur.id}`}>
                        <ul>
                            <label>
                                <input
                                    type = "checkbox"
                                    key = {`liqueur--${liqueur.id}`}
                                    value = {currentCocktail?.liqueurs?.id}
                                    // checked = {selectedLiqueurs.has(liqueur.id)}
                                    // defaultChecked = {
                                    //     currentCocktail.liqueurs.find(liq => liq.id === liqueur.id) ? true : false
                                    // }

                                    defaultChecked = {selectedLiqueurs.has(liqueur.id)}
                                    checked = {selectedLiqueurs.has(liqueur.id)}

                                    onChange={(event) => {
                                        const copy = new Set(selectedLiqueurs)
                                        if (copy.has(liqueur.id)){
                                            copy.delete(liqueur.id)
                                        }
                                        else {
                                            copy.add(liqueur.id)
                                        }
                                        
                                        updateSelectedLiqueurs(copy)
                                    }
                                    }
                                />
                                {liqueur.name}
                            </label>
                        </ul>
                    </div>
                )   
            }

            else {
                <div></div>
            }
        })
        return html
    }

    const StapleIngredientCheckboxes = () => {
        let html = []
        stapleIngredients.map((staple) => {
            if (showStapleIngredients) {
                html.push(
                    <div className = "staples_checkboxes" key = {`stapleIngredients--${staple.id}`}>
                        <ul>
                            <label>
                                <input
                                    type = "checkbox"
                                    key = {`stapleIngredients--${staple.id}`}
                                    value = {parseInt(staple.id)}
                                    // checked = {selectedStapleIngredients.has(staple.id)}
                                    // defaultChecked = {
                                    //     currentCocktail.staple_ingredients.find(stap => stap.id === staple.id) ? true : false
                                    // }
                                    defaultChecked = {selectedStapleIngredients.has(staple.id)}
                                    checked = {selectedStapleIngredients.has(staple.id)}
                                    onChange={(event) => {
                                        const copy = new Set(selectedStapleIngredients)
                                        if (copy.has(staple.id)){
                                            copy.delete(staple.id)
                                        }
                                        else {
                                            copy.add(staple.id)
                                        }
                                        
                                        updateSelectedStapleIngredients(copy)
                                    }
                                    }
                                />
                                {staple.name}
                            </label>
                        </ul>
                    </div>
                )   
            }

            else {
                <div></div>
            }
        })
        return html
    }



    
    
    return (
        <form className="cocktailPostForm">
            <h3 className = "new_cocktail_header">Edit Cocktail Post</h3>
                <div className = "new__cocktail">
                    <label className = "new_cocktail_label">Cocktail Name: </label>
                    <input onChange={changeCocktailState}
                        type="text" id = 'name' value = {currentCocktail.name}
                        required autoFocus className="form-control"/>

                    <div className = "ingredient_list">
                        <div className = "liquor_select">
                            <button onClick={(event) => 
                                {
                                    event.preventDefault()
                                    setShowLiquors(true)
                                }
                            }>
                                Add Liquors</button>
                                {LiquorCheckboxes()}
                        </div>

                        <div className = "liqueur_select">
                            <button onClick={(event) => 
                                {
                                    event.preventDefault()
                                    setShowLiqueurs(true)
                                }
                            }>
                                Add Liqueurs</button>
                                {LiqueurCheckboxes()}
                        </div>

                        <div className = "staple_ingredients_select">
                            <button onClick={(event) => 
                                {
                                    event.preventDefault()
                                    setShowStapleIngredients(true)
                                }
                            }>
                                Add Staple Ingredients</button>
                                {StapleIngredientCheckboxes()}
                        </div>
                        
                    </div>
                    
                    <label className = "new_cocktail_category"> Category: </label>
                    <select
                            required autoFocus
                            value={chosenCategory}
                            onChange={event => setChosenCategory(event.target.value)}
                            id = "category"
                            className = "form-control">
                                <option value = "0"> Select Category</option>
                            {
                                categories.map(category => {
                                    return <option  key = {category.id} value = {category.id}> {category.label}</option>
                                })
                            }
                    </select>
                    <div> 
                        <label className = "new_cocktail_image">Cocktail Image URL</label>
                        <input 
                            id = "image"
                            onChange={changeCocktailState}
                            value = {currentCocktail.image}
                            type = 'text' className = "new_cocktail_image"/>
                    </div>
                    <div>
                        <label className = "new_cocktail_recipe">Recipe: </label>
                        <input 
                            id = "recipe"
                            onChange={changeCocktailState}
                            value = {currentCocktail.recipe}
                            type = 'textarea'  className = "new_cocktail_recipe"/>
                    </div>
                    {/* <div>
                        <label className = "new_cocktail_caption">Post Caption: </label>
                        <input 
                            id = "caption"
                            value = {currentCocktailPost?.caption}
                            onChange={event => setWrittenCaption(event.target.value)}
                            type = 'textarea' className = "new_cocktail_caption"
                            
                            
                            />
                    </div> */}
                    <div>
                        <button type ="submit" className = "submit_cocktail"
                            onClick={evt => {
                                // Prevent form from being submitted
                                evt.preventDefault()
            
                                const updateCocktailObj = {
                                    id: currentCocktail.id, 
                                    name: currentCocktail.name,
                                    category: parseInt(chosenCategory),
                                    recipe: currentCocktail.recipe,
                                    image: currentCocktail.image,
                                    liquors: Array.from(selectedLiquors),
                                    liqueurs: Array.from(selectedLiqueurs),
                                    staple_ingredients: Array.from(selectedStapleIngredients)
                                        
                                }
            
                                // Send POST request to your API
                                updateCocktail(updateCocktailObj)
                                .then(() => navigate("/my_cocktails"))
                                    // .then((newlyUpdatedCocktail) => {
                                    //     const liquorArray = Array.from(selectedLiquors)
                                    //     const promiseLiquorArray = liquorArray.map((liquorId) => {
                                    //         const updatedLiquorObj = {
                                    //             id: currentCocktailLiquors.map((liquor) =>{return liquor.id}),
                                    //             cocktail: newlyUpdatedCocktail.id,
                                    //             liquor: liquorId
                                    //         }
                                    //         updateCocktailLiquor(updatedLiquorObj)
                                    //         .then(() => navigate("/my_cocktails"))
                                            
                                    //     })

                                    //     const liqueurArray = Array.from(selectedLiqueurs)
                                    //     const promiseLiqueurArray = liqueurArray.map((liqueurId) => {
                                    //         const updatedLiquorObj = {
                                                
                                    //             cocktail: newlyUpdatedCocktail.id,
                                    //             liqueur: liqueurId
                                    //         } 
                                    //         updateCocktailLiqueur(updatedLiquorObj)
                                    //         .then(() => navigate("/my_cocktails"))
                                            
                                    //     })

                                    //     const stapleIngredientsArray = Array.from(selectedStapleIngredients)
                                    //     const promiseStapleIngredientsArray = stapleIngredientsArray.map((stapleId) => {
                                    //         const updatedStapleIngredientObj = {
                                    //             cocktail: newlyUpdatedCocktail.id,
                                    //             staple_ingredient: stapleId
                                    //         }
                                    //         updateCocktailStapleIngredient(updatedStapleIngredientObj)
                                    //         .then(() => navigate("/my_cocktails"))
                                    //     })

                                    //     // const cocktailPostObj = {
                                    //     //     cocktail: newlyUpdatedCocktail.id,
                                    //     //     caption: writtenCaption
                                    //     // }
                                    //     // updateCocktailPost(cocktailPostObj)
                                    //     // .then(() => navigate('/my_cocktails'))
                                        


                                    // }
                                    // )
                            }}
                        > Update Cocktail Post</button>
                    </div>
                    
                        
                </div>
        </form>            
    )
}
                        





