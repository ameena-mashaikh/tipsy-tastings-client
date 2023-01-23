import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getLiquors, getLiqueurs, getStapleIngredients } from "../../managers/IngredientManager"
import { getCategories } from "../../managers/CategoryManager"
import "./CocktailPostDetails.css"
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
                                    defaultChecked = {selectedLiquors.has(liquor.id)}
                                    checked = {selectedLiquors.has(liquor.id)}
                                    onChange={(event) => {
                                        const copy = new Set(selectedLiquors)
                                        if (copy.has(liquor.id))
                                        {
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
                        <ul>
                            <label>
                                <input
                                    type = "checkbox"
                                    key = {`liqueur--${liqueur.id}`}
                                    value = {currentCocktail?.liqueurs?.id}
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
                    <div> 
                        <button className="form_upload_button" onClick={(evt) => showWidget(evt)}>Upload Image</button>
                        <div>Image Preview: </div>
                        <img src={currentCocktail.image} width="100px"/>
                    </div>
                    </div>
                    <div>
                        <label className = "new_cocktail_recipe">Recipe: </label>
                        <input 
                            id = "recipe"
                            onChange={changeCocktailState}
                            value = {currentCocktail.recipe}
                            type = 'textarea'  className = "new_cocktail_recipe"/>
                    </div>
                    <div>
                        <label className = "new_cocktail_caption">Post Caption: </label>
                        <input 
                            id = "caption"
                            value = {cocktailPost?.caption}
                            onChange={changeCocktailPostState}
                            type = 'textarea' className = "new_cocktail_caption"
                            
                            
                            />
                    </div>
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
                                .then((updatedCocktail) =>{

                                    const cocktailPostObj = {
                                        id: cocktailPost.id,
                                        cocktailId: updateCocktail.id,
                                        caption: cocktailPost.caption
                                    }
                                    updateCocktailPost(cocktailPostObj)
                                    .then(() => navigate('/my_cocktails'))
                                 })       


                                    // }
                                    // )
                            }}
                        > Update Cocktail Post</button>
                        <button onClick = {() => {navigate(`/my_cocktails/${cocktailId}`)}}>Cancel</button>

                    </div>
                    
                        
                </div>
        </form>            
    )
}
                        





