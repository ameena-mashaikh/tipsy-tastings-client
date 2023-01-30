import { useEffect, useState, useCallback, useRef } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import Select from "react-select"
import { getLiquors, getLiqueurs, getStapleIngredients, getSyrups } from "../../managers/IngredientManager"
import { getCategories } from "../../managers/CategoryManager"
import "./CocktailForm.css"
import { createCocktail } from "../../managers/CocktailManager"
import { createCocktailLiqueur, createCocktailLiquor, createCocktailStapleIngredient } from "../../managers/CocktailngredientManager"
import { createCocktailPost } from "../../managers/CocktailPostManager"

export const FormCocktailTest = () => {


    const [liquors, setLiquors] = useState([])
    const [liqueurs, setLiqueurs] = useState([])
    const [stapleIngredients, setStapleIngredients] = useState([])
    const [syrups, setSyrups] = useState([])
    const [categories, setCategories] = useState([])    
    const navigate = useNavigate()


    const [selectedLiquors, updateSelectedLiquors] = useState([])
    const [selectedLiqueurs, updateSelectedLiqueurs] = useState([])
    const [selectedStapleIngredients, updateSelectedStapleIngredients] = useState([])
    const [selectedSyrups, updateSelectedSyrups] = useState([])

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
        getSyrups().then(setSyrups)
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
        className = 'liquor-dropdown'
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
        maxMenuHeight = {300}
        />
    
    }
      
                    


    const LiqueurDropdown = () => {
        return <Select
        className = 'liqueur-dropdown'
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
        className = 'staple-dropdown'
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


    const SyrupDropdown = () => {
        return <Select
        className = 'syrup-dropdown'
        placeholder = "Select Syrups"
        options ={
            syrups.map((syrup) => {
                return {
                    label: syrup.name,
                    value: syrup.id
                }
            })
        }
        isMulti
        isSearchable = {true}
        defaultValue = {selectedSyrups}
        value = {selectedSyrups.id}
        onChange = {updateSelectedSyrups}
        />
    }

    
    
    return (
        <form className="cocktailPostForm">
            <h3 className = "new_cocktail_header">New Cocktail Post</h3>
                <div className = "new_cocktail">
                    <div className = 'cocktail_name'>
                        <input onChange={changeCocktailState}
                            type="text" id = 'name' 
                            required autoFocus 
                            className="form-control"
                            placeholder="Enter Cocktail Name"/>
                    </div>
                    <div className = "ingredient_list">

                        <div className = "liquor_select">
                            {LiquorDropdown()}
                        </div>


                        <div className = "liqueur_select">
                            {LiqueurDropdown()}
                        </div>


                        <div className = "staples_select">
                            {StapleIngredientDropdown()}
                        </div>


                        <div className = "syrups_select">
                                {SyrupDropdown()}
                        </div>
                        
                    </div>
                    <div className = 'select-category'>
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
                    </div>
                    
                    <div className = "new_cocktail_recipe">
                        <textarea 
                            className = 'new-recipe-input'
                            id = "recipe"
                            onChange={changeCocktailState}
                            type = 'textarea'  placeholder = 'Enter the Measurements and Recipe!'/>
                    </div>
                    <div>
                        <label className = "new_cocktail_caption">Post Caption: </label>
                        <textarea 
                            onChange={changeCocktailState}
                            id = "caption"
                            className = "new_cocktail_caption"/>
                    </div>
                    <div className = 'form-img-upload'> 
                        <button className="form_upload_button" onClick={(evt) => showWidget(evt)}>Upload Image</button>
                        Image Preview:
                        <img src={currentCocktail.image} width="100px"/>
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
                        





