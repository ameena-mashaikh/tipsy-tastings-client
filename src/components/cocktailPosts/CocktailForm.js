import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getLiquors, getLiqueurs, getStapleIngredients } from "../../managers/IngredientManager"
import "./CocktailPosts.css"

export const CocktailPostForm = () => {
    const [liquors, setLiquors] = useState([])
    const [liqueurs, setLiqueurs] = useState([])
    const [stapleIngredients, setStapleIngredients] = useState([])
    
    
    useEffect(() => {
        getLiquors().then(setLiquors)
    }, [])
        
    useEffect(() => {
        getLiqueurs().then(setLiqueurs)
    }, [])

    useEffect(() => {
        getStapleIngredients().then(setStapleIngredients)
    }, [])


    
    
    
        return (
        <form className="cocktailPostForm">
            <div className = "ingredient_list">
                <div className = "liquor_select">
                    <select
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
                    </select>
                </div>
            </div>
        </form>            
    )
}