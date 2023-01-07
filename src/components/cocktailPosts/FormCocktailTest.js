import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import Select from "react-select"

import { getLiquors, getLiqueurs, getStapleIngredients } from "../../managers/IngredientManager"
import { getCategories } from "../../managers/CategoryManager"
import "./CocktailPostDetails.css"
import { createCocktail } from "../../managers/CocktailManager"
import { createCocktailLiqueur, createCocktailLiquor, createCocktailStapleIngredient } from "../../managers/CocktailngredientManager"
import { createCocktailPost } from "../../managers/CocktailPostManager"

export const FormCocktailTest = () => {
    const [liquors, setLiquors] = useState([])
    const [liqueurs, setLiqueurs] = useState([])
    const [stapleIngredients, setStapleIngredients] = useState([])
    const [categories, setCategories] = useState([])    
    const navigate = useNavigate()


    const [selectedLiquors, updateSelectedLiquors] = useState([])
    const [selectedLiqueurs, updateSelectedLiqueurs] = useState([])
    const [selectedStapleIngredients, updateSelectedStapleIngredients] = useState([])

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

    const LiquorDropdown = () => {
        return <Select
        placeholder = "Select Liquors"
        options ={
            liquors.map((liquor) => {
                return {
                    label: liquor.label,
                    value: liquor.id
                }
            })
        }
        isMulti
        isSearchable = {true}
        defaultValue = {selectedLiquors}
        value = {liquors.id}
        onChange = {updateSelectedLiquors}
        />
    
    }
      
                    


    const LiqueurDropdown = () => {
        return <Select
        placeholder = "Select Liqueurs"
        options ={
            liqueurs.map((liqueur) => {
                return {
                    label: liqueur.name,
                    value: liqueur.id
                }
            })
        }
        isMulti
        isSearchable = {true}
        defaultValue = {selectedLiqueurs}
        value = {liqueurs.id}
        onChange = {updateSelectedLiqueurs}
        />
    
    }
      

    const StapleIngredientDropdown = () => {
        return <Select
        placeholder = "Select Staple Ingredients"
        options ={
            stapleIngredients.map((staple) => {
                return {
                    label: staple.name,
                    value: staple.id
                }
            })
        }
        isMulti
        isSearchable = {true}
        defaultValue = {selectedStapleIngredients}
        value = {stapleIngredients.id}
        onChange = {updateSelectedStapleIngredients}
        />
    }



    
    
    return (
        <form className="cocktailPostForm">
            <h3 className = "new_cocktail_header">New Cocktail Post</h3>
                <div className = "new__cocktail">
                    <label className = "new_cocktail_label">Cocktail Name: </label>
                    <input onChange={changeCocktailState}
                        type="text" id = 'name' 
                        required autoFocus className="form-control"/>

                    <div className = "ingredient_list">
                        <div className = "liquor_select">
                            {LiquorDropdown()}
                        </div>



                        <div className = "liqueur_select">
                            {LiqueurDropdown()}
                        </div>

                        

                        <div className = "staple_ingredients_select">
                            
                                {StapleIngredientDropdown()}
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
                                        selectedLiquors.map((liquorId) => {
                                            const liquorObjToPost = {
                                                cocktail: newCreatedCocktail.id,
                                                liquor: liquorId.value
                                            }
                                            createCocktailLiquor(liquorObjToPost)
                                            .then(() => navigate("/my_cocktails"))
                                        })

                                        
                                        selectedLiqueurs.map((liqueur) => {
                                            const liqueurObjToPost = {
                                                cocktail: newCreatedCocktail.id,
                                                liqueur: liqueur.value
                                            }
                                            createCocktailLiqueur(liqueurObjToPost)
                                            .then(() => navigate("/my_cocktails"))
                                        })

                                        selectedStapleIngredients.map((staple) => {
                                            const StapleIngredientObjToPost = {
                                                cocktail: newCreatedCocktail.id,
                                                staple_ingredient: staple.value
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
                        





