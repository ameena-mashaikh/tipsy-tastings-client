import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import Select from "react-select"
import { getLiquors, getLiqueurs, getStapleIngredients } from "../../managers/IngredientManager"
import { getCategories } from "../../managers/CategoryManager"
import "./CocktailPosts.css"

export const CocktailPostForm = () => {
    const [liquors, setLiquors] = useState([])
    const [liqueurs, setLiqueurs] = useState([])
    const [stapleIngredients, setStapleIngredients] = useState([])
    const [categories, setCategories] = useState([])
    const [showLiquorForm, setShowLiquorForm] = useState(false)
    const [index, setIndex] = useState(0)

    const [cocktail, newCocktail] = useState({
        name: '',
        category: 0,
        recipe: "",
        image: "",
        createdByMixologist: 0,
        liquors: 0,
        liqueurs: 0,
        liqueurs: 0
    })


    const [cocktailLiquor, newCocktailLiquor] = useState({
        cocktailId: 0,
        liquorId: 0,
        quantity: 0
    })

    
    const [cocktailPost, newCocktailPost] = useState({
        cocktailId: 0,
        caption: '',
        mixologist: 0
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


    const loadMore = () => {
        setIndex(index+1)
    }


    const LiquorSelect = () => {
        if (showLiquorForm){
            return  (<div className = "liquor_input">
                <input type = "number" className = "liquor_quantity" placeholder="0" step = ".25"/>
                <label>oz</label>
                <Select
                placeholder = "Select Liquors"
                className = "liquor_select"
                options ={
                    liquors.map((liquor) => {
                        return {
                            label: liquor.label,
                            value: liquor.id
                        }
                    })
                }
                isSearchable = {true}
            />
            <button>Add Liquor to Cocktail</button></div>)}
        else{
            return <div></div>
        }
    }



    
    
    return (
        <form className="cocktailPostForm">
            <h3 className = "new_cocktail_header">New Cocktail Post</h3>
                <div className = "new__cocktail">
                    <label className = "new_cocktail_label">Cocktail Name: </label>
                    <input type = 'text' className = "new_cocktail_input"/>
                    <div className = "ingredient_list">
                        <button onClick={(event) => 
                            {
                                event.preventDefault()
                                setShowLiquorForm(true)
                                loadMore()
                            }
                        }>Add New Liquor</button>
                        {LiquorSelect()}</div>
                    
                    <label className = "new_cocktail_category"> Category: </label>
                    <select
                            required autoFocus
                            className = "form-control"
                            value = {categories.id}>
                                <option value = "0"> Select Category</option>
                            {
                                categories.map(category => {
                                    return <option  key = {category.id} value = {category.id}> {category.label}</option>
                                })
                            }
                    </select>
                    <div> 
                        <label className = "new_cocktail_image">Cocktail Image URL</label>
                        <input type = 'text' className = "new_cocktail_image"/>
                    </div>
                    <div>
                        <label className = "new_cocktail_recipe">Recipe: </label>
                        <input type = 'textarea' className = "new_cocktail_recipe"/>
                    </div>
                    <div>
                        <label className = "new_cocktail_caption">Post Caption: </label>
                        <input type = 'textarea' className = "new_cocktail_caption"/>
                    </div>
                    <div>
                        <button className = "submit_cocktail"> Create Cocktail Post</button>
                    </div>
                    
                        
                </div>
        </form>            
    )
}
                        








                        {/* <select
                            required autoFocus
                            className = "form-control"
                            value = {liquors.id}
                            // onChange = {(event) => {
                            //     const valueParse = (event.target.value)
                            //     liquors.map(liquor => {
    
                            //     })
                            // }}
                            >
                            <option value = "0">Select Liquors</option>
                            {
                                liquors.map(liquor => {
                                    return <option key = {liquor.id} value = {liquor.id}> {liquor.name}</option>
                                })
                            }
                        </select> */}


//! SELECT for liquors, liqueurs, and staples
                    {/*<div><input className = "recipe" placeholder="recipe"></input></div>
                 <div className = "liquor_select">
                    <button> Add Liquor</button>
                    <Select
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
                    />
                </div>
                <div className = "liqueur_select"> 
                <Select
                        placeholder = "Select Liqueurs"
                        isMulti
                        options ={
                            liqueurs.map((liqueur) => {
                                return {
                                    label: liqueur.name,
                                    value: liqueur.id
                                }
                            })
                        }
                        />
                        
                </div>
                <div className = "staple_ingredient_select"> 
                <Select
                        placeholder = "Select Staple Ingredients"
                        isMulti
                        options ={
                            stapleIngredients.map((staple) => {
                                return {
                                    label: staple.name,
                                    value: staple.id
                                }
                            })
                        }
                        />
                        
                </div> */}