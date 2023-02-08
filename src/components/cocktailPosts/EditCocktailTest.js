import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import Select from "react-select"
import { getLiquors, getLiqueurs, getStapleIngredients, getSyrups } from "../../managers/IngredientManager"
import { getCategories } from "../../managers/CategoryManager"
import "./CocktailEditForm.css"
import { updateCocktail, getCocktailById} from "../../managers/CocktailManager"
import { updateCocktailPost, getCocktailPostById, getCocktailPosts } from "../../managers/CocktailPostManager"



export const CocktailEditTest = () => {
    const [liquors, setLiquors] = useState([])
    const [liqueurs, setLiqueurs] = useState([])
    const [stapleIngredients, setStapleIngredients] = useState([])
    const [syrups, setSyrups] = useState([])


    const [categories, setCategories] = useState([])
    const [chosenCategory, setChosenCategory] = useState(0)

    const [selectedLiquors, updateSelectedLiquors] = useState([])
    const [selectedLiqueurs, updateSelectedLiqueurs] = useState([])
    const [selectedStapleIngredients, updateSelectedStapleIngredients] = useState([])
    const [selectedSyrups, updateSelectedSyrups] = useState([])

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
        staple_ingredients: [],
        syrups: []
    })

    const [cocktailPost, setCocktailPost] = useState(
        {
            id:0,
            cocktailId: 0,
            caption: ''
        }
    )




    useEffect(() => {
        getCocktailById(cocktailId)
        .then((data)=>{
            setCurrentCocktail(data)
            const oldSelectedLiquors = [...data.liquors]
            const oldSelectedLiqueurs = [...data.liqueurs]
            const oldSelectedStaples = [...data.staple_ingredients]
            
            // const oldSelectedSyrups = [...data.syrups]


        updateSelectedLiquors(oldSelectedLiquors.map((liq) => ({
            value: liq.id,
            label: liq.label
                }
            ))
        )
        updateSelectedLiqueurs(oldSelectedLiqueurs.map((liq) => ({
            value: liq.id,
            label: liq.name
                }
            ))
        )
        updateSelectedStapleIngredients(oldSelectedStaples.map((staple) => ({
            value: staple.id,
            label: staple.name
                }
            ))
        )

        // updateSelectedSyrups(oldSelectedSyrups.map((syrup) => ({
        //     value: syrup.id,
        //     label: syrup.name
        //         }
        //     ))
        // )
        for (const post of data.post_cocktail) {
                getCocktailPostById(post.id).then(setCocktailPost)
            }
        })
    }, [cocktailId])


    
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
        getStapleIngredients().then(setStapleIngredients)
    }, [])

    useEffect(() => {
        getSyrups().then(setSyrups)
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

    const changeCocktailPostState= (domEvent) => {
        const copy = {...cocktailPost}
        const modify = domEvent.target.id
        copy[modify] = domEvent.target.value
        setCocktailPost(copy)
    }


    const showWidget = (event) => {
        event.preventDefault()
    
        let widget = window.cloudinary.createUploadWidget(
            { 
            cloudName: `dnilbxkjf`,
            uploadPreset: `tipsy_uploads`,
            folder: 'tipsytastings',
            cropping: true,
            croppingCoordinatesMode: 'custom',
            showSkipCropButton: false
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
            value={selectedLiquors}
            isSearchable = {true}
            onChange = {(newValue, actionMeta) => {
                updateSelectedLiquors(newValue)
            }}
            />
    }
    
    const LiqueurDropdown = () => {
        return <Select
        className = 'liqueur-dropdown'
        placeholder = "Select Liquors"
        options ={
            liqueurs.map((liqueur) => {
                return {
                    label: liqueur.name,
                    value: liqueur.id
                }
            })
        }
        isMulti
        value={selectedLiqueurs}
        isSearchable = {true}
        onChange = {(newValue, actionMeta) => {
            updateSelectedLiqueurs(newValue)
        }}
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
        value={selectedStapleIngredients}
        isSearchable = {true}
        onChange = {(newValue, actionMeta) => {
            updateSelectedStapleIngredients(newValue)
        }}
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
        value={selectedSyrups}
        isSearchable = {true}
        onChange = {(newValue, actionMeta) => {
            updateSelectedSyrups(newValue)
        }}
        />
    }



    
    
    return (
        <form className="cocktailPostForm">
            <h3 className = "new_cocktail_header">Edit {currentCocktail.name} Cocktail</h3>
                <div className = "new_cocktail">
                    <div className = 'cocktail_name'>
                    <input onChange={changeCocktailState}
                        type="text" id = 'name' value = {currentCocktail.name}
                        required autoFocus className="form-control"/>
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
                    {/* <div className="select-category">
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
                    </div> */}
                    <div className="new_cocktail_recipe">
                        <textarea 
                            id = "recipe"
                            onChange={changeCocktailState}
                            value = {currentCocktail.recipe}
                            type = 'textarea'  className = "new-recipe-input"
                            placeholder = 'Enter the Measurements and Recipe!'/>
                    </div>
                    <div className="cocktail_caption">
                        <textarea 
                            id = "caption"
                            value = {cocktailPost?.caption}
                            onChange={changeCocktailPostState}
                            type = 'textarea' className = "new-cocktail-caption"
                            placeholder = 'Add a caption to your cocktail and share your thoughts!'
                            
                            />
                    </div>
                    <div> 
                        <div className = 'form-img-upload'> 
                            <button className="form_upload_button" onClick={(evt) => showWidget(evt)}>Upload Image</button>
                        </div>
                        <div className = 'img-preview-label'>Image Preview: </div>
                        <div className = 'preview-img-div'>
                            <img src={currentCocktail.image} width="100px"
                                className = 'uploaded-img-preview'/>
                        </div>
                    </div>
                    
                    <div className = 'update_cocktail'>
                        <button type ="submit" className = "update-btn"
                            onClick={evt => {
                                // Prevent form from being submitted
                                evt.preventDefault()
            
                                const updateCocktailObj = {
                                    id: currentCocktail.id, 
                                    name: currentCocktail.name,
                                    category: parseInt(chosenCategory),
                                    recipe: currentCocktail.recipe,
                                    image: currentCocktail.image,
                                    liquors: selectedLiquors.map((liq) => liq.value),
                                    liqueurs: selectedLiqueurs.map((liq) => liq.value),
                                    staple_ingredients: selectedStapleIngredients.map((staple) => staple.value),
                                    syrups: selectedSyrups.map((syrup) => syrup.value)
                                }
            
                                // Send POST request to your API
                                updateCocktail(updateCocktailObj)
                                .then((updatedCocktail) =>{

                                    const cocktailPostObj = {
                                        id: cocktailPost.id,
                                        cocktailId: updateCocktail.id,
                                        caption: cocktailPost.caption
                                    }
                                    updateCocktailPost(cocktailPostObj)
                                    .then(() => navigate('/my_cocktails'))
                                 })       

                            }}
                        > Update Cocktail Post</button>
                        <button onClick = {() => {navigate('/my_cocktails')}} className = 'cancel-btn'>Cancel</button>

                    </div>
                    
                        
                </div>
        </form>            
    )
}
                        





