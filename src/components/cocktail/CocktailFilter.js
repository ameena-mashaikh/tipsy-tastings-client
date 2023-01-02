// import { useState, useEffect } from "react"
// import { getLiquors } from "../../managers/IngredientManager"


// export const CocktailFilter = ({filteredCocktailFunction}) => {
    
//     const [liquors, setLiquors] = useState([])
//     useEffect(() => {
//         getLiquors().then(setLiquors)
//     }, [])

//     return  <select className = "liquors_dropdown"
//     onChange = {(event) => filteredCocktailFunction(parseInt(event.target.value))}>
//     <option value = "0"> Select Liquor</option>
//     {
//         liquors.map(liquor => {
//             return <option  key = {liquor.id} 
//             value = {liquor.id}> {liquor.label}</option>
//         })
//     }

//     </select>
// }