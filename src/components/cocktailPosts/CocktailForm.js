import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import Select from "react-select"

import { getLiquors, getLiqueurs, getStapleIngredients } from "../../managers/IngredientManager"
import { getCategories } from "../../managers/CategoryManager"
import "./CocktailForm.css"
import { createCocktail } from "../../managers/CocktailManager"
import { createCocktailLiqueur, createCocktailLiquor, createCocktailStapleIngredient } from "../../managers/CocktailIngredientManager"
import { createCocktailPost } from "../../managers/CocktailPostManager"

export const CocktailPostForm = () => {
    const [liquors, setLiquors] = useState([])
    const [liqueurs, setLiqueurs] = useState([])
    const [stapleIngredients, setStapleIngredients] = useState([])
    const [categories, setCategories] = useState([])
    const [showLiquors, setShowLiquors] = useState(false)
    const [showLiqueurs, setShowLiqueurs] = useState(false)
    const [showStapleIngredients, setShowStapleIngredients] = useState(false)

    const navigate = useNavigate()


    const [selectedLiquors, updateSelectedLiquors] = useState(new Set())
    const [selectedLiqueurs, updateSelectedLiqueurs] = useState(new Set())
    const [selectedStapleIngredients, updateSelectedStapleIngredients] = useState(new Set())

    const [currentCocktail, setCurrentCocktail] = useState({
        name: '',
        category: 0,
        recipe: "",
        image: "",
        createdByMixologist: 0
    })



    
    const [currentCocktailPost, setCurrentCocktailPost] = useState({
        cocktailId: 0,
        caption: ''
    })
    
    
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


    const changeCocktailState= (domEvent) => {
        const copy = {...currentCocktail}
        copy[domEvent.target.id] = domEvent.target.value
        setCurrentCocktail(copy)
    }

    const showWidget = (event) => {
        event.preventDefault()
    
        let widget = window.cloudinary.createUploadWidget(
            { 
            cloudName: `dnilbxkjf`,
            uploadPreset: `tipsy_uploads`,
            cropping: true,
            croppingCoordinatesMode: 'custom',
            showSkipCropButton: false,
            folder: 'tipsytastings'
            },
        (error, result) => {
          if (!error && result && result.event === "success") { 
            console.log(result.info.url)
            const copy = structuredClone(currentCocktail)
            copy.image = result.info.url
            setCurrentCocktail(copy)
        }})
        widget.open()
    }

    const LiquorCheckboxes = () => {
        let html = []
        liquors.map((liquor) => {
            if (showLiquors) {
                html.push(
                    <div className = "liquor__checkboxes" key = {`liquor--${liquor.id}`}>
                        <ul className = "liquor__list">
                            <label>
                                <input
                                    className = "liquor__check"
                                    type = "checkbox"
                                    key = {`liquor--${liquor.id}`}
                                    value = {parseInt(liquor.id)}
                                    onChange={(event) => {
                                        const copy = new Set(selectedLiquors)
                                        if (copy.has(liquor.id)){
                                            copy.delete(liquor.id)
                                        }
                                        else {
                                            copy.add(liquor.id)
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
                        <ul className = "liqueur__list">
                            <label className = "liqueur__label">
                                <input
                                    type = "checkbox"
                                    key = {`liqueur--${liqueur.id}`}
                                    value = {parseInt(liqueur.id)}
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
            <h1 className = "new_cocktail_header">New Cocktail Post</h1>
                <div className = "new_cocktail">
                    <label className = "new_cocktail_label">Cocktail Name: </label>
                    <input onChange={changeCocktailState}
                        type="text" id = 'name' 
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
                                <div className="liquor__boxes">{LiquorCheckboxes()}</div>
                        </div>





                        <div className = "liqueur_select">
                            <button onClick={(event) => 
                                {
                                    event.preventDefault()
                                    setShowLiqueurs(true)
                                }
                            }>
                                Add Liqueurs</button>
                                <div className="liqueur__boxes">{LiqueurCheckboxes()}</div>
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
                            onChange={changeCocktailState}
                            required autoFocus
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
                        <button className="form_upload_button" onClick={(evt) => showWidget(evt)}>Upload Image</button>
                        <div>Image Preview: </div>
                        <img src={currentCocktail.image} width="100px"/>
                    </div>
                    <div>
                        <label className = "new_cocktail_recipe">Recipe: </label>
                        <input 
                            id = "recipe"
                            onChange={changeCocktailState}
                            type = 'textarea'  className = "new_cocktail_recipe"/>
                    </div>
                    <div>
                        <label className = "new_cocktail_caption">Post Caption: </label>
                        <input 
                            onChange={changeCocktailState}
                            id = "caption"
                            type = 'textarea' className = "new_cocktail_caption"/>
                    </div>
                    <div>
                        <button type ="submit" className = "submit_cocktail"
                            onClick={evt => {
                                // Prevent form from being submitted
                                evt.preventDefault()
            
                                const cocktailObj = {
                                    name: currentCocktail.name,
                                    category: parseInt(currentCocktail.category),
                                    recipe: currentCocktail.recipe,
                                    image: currentCocktail.image,
                                    created_by_mixologist: currentCocktail.createdByMixologist
                                }
            
                                // Send POST request to your API
                                createCocktail(cocktailObj)
                                    .then((newCreatedCocktail) => {
                                        const liquorArray = Array.from(selectedLiquors)
                                        liquorArray.map((liquorId) => {
                                            const liquorObjToPost = {
                                                cocktail: newCreatedCocktail.id,
                                                liquor: liquorId
                                            }
                                            createCocktailLiquor(liquorObjToPost)
                                            .then(() => navigate("/my_cocktails"))
                                        })

                                        const liqueurArray = Array.from(selectedLiqueurs)
                                        liqueurArray.map((liqueurId) => {
                                            const liqueurObjToPost = {
                                                cocktail: newCreatedCocktail.id,
                                                liqueur: liqueurId
                                            }
                                            createCocktailLiqueur(liqueurObjToPost)
                                            .then(() => navigate("/my_cocktails"))
                                        })

                                        const stapleIngredientsArray = Array.from(selectedStapleIngredients)
                                        stapleIngredientsArray.map((stapleId) => {
                                            const StapleIngredientObjToPost = {
                                                cocktail: newCreatedCocktail.id,
                                                staple_ingredient: stapleId
                                            }
                                            createCocktailStapleIngredient(StapleIngredientObjToPost)
                                            .then(() => navigate("/my_cocktails"))
                                        })

                                        const cocktailPostObj = {
                                            cocktail: newCreatedCocktail.id,
                                            caption: currentCocktail.caption
                                        }
                                        createCocktailPost(cocktailPostObj)
                                        .then(() => navigate('/my_cocktails'))
                                        


                                    }
                                    )
                            }}
                        > Create Cocktail Post</button>
                    </div>
                    
                        
                </div>
        </form>            
    )
}
                        





