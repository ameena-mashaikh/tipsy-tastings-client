export const getCocktailLiquors = () => {
    return fetch("http://localhost:8000/cocktailliquors", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("tt_token")}`
        }
    })
        .then(response => response.json())
}

export const getCocktailLiqueurs = () => {
    return fetch("http://localhost:8000/cocktailliqueurs", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("tt_token")}`
        }
    })
        .then(response => response.json())
}

export const getCocktailStapleIngredients = () => {
    return fetch(`http://localhost:8000/cocktailstapleingredients`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("tt_token")}`
        }
    })
        .then(response => response.json())
}


export const createCocktailLiquor = (newCocktailLiquorObject) => {
    return fetch("http://localhost:8000/cocktailliquors", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("tt_token")}`

        },
        body: JSON.stringify(newCocktailLiquorObject)
    })
        .then(res => res.json())
}

export const createCocktailLiqueur = (newCocktailLiqueurObject) => {
    return fetch("http://localhost:8000/cocktailliqueurs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("tt_token")}`

        },
        body: JSON.stringify(newCocktailLiqueurObject)
    })
        .then(res => res.json())
}

export const createCocktailStapleIngredient = (newCocktailStapleObject) => {
    return fetch("http://localhost:8000/cocktailstapleingredients", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("tt_token")}`

        },
        body: JSON.stringify(newCocktailStapleObject)
    })
        .then(res => res.json())
}


export const updateCocktailLiquor = (cocktailLiquorObj) => {
    return fetch(`http://localhost:8000/cocktailliquors/${cocktailLiquorObj.id}`, {
        method: "PUT",    
        headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("tt_token")}`
            },
            body: JSON.stringify(cocktailLiquorObj)
         })
}

export const updateCocktailLiqueur = (cocktailLiqueurObj) => {
    return fetch(`http://localhost:8000/cocktailliqueurs/${cocktailLiqueurObj.id}`, {
        method: "PUT",    
        headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("tt_token")}`
            },
            body: JSON.stringify(cocktailLiqueurObj)
         })
}

export const updateCocktailStapleIngredient = (cocktailStapleObj) => {
    return fetch(`http://localhost:8000/cocktailstapleingredients/${cocktailStapleObj.id}`, {
        method: "PUT",    
        headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("tt_token")}`
            },
            body: JSON.stringify(cocktailStapleObj)
         })
}


export const getCocktailLiquorById = (id) => {
    return fetch(`http://localhost:8000/cocktailliquors/${id}`, {
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("tt_token")}`
        }
    })
        .then(response => response.json())
}

export const getCocktailLiqueurById = (id) => {
    return fetch(`http://localhost:8000/cocktailliqueurs/${id}`, {
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("tt_token")}`
        }
    })
        .then(response => response.json())
}

export const getCocktailStapleIngredientById = (id) => {
    return fetch(`http://localhost:8000/cocktailstapleingredients/${id}`, {
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("tt_token")}`
        }
    })
        .then(response => response.json())
}

export const getAllCocktailLiquor = (id) => {
    return fetch (`http://localhost:8000/cocktailliquors?cocktail=${id}`,{
    headers:{
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("tt_token")}`
    }
    })
    .then(response => response.json())
}

export const getAllCocktailLiqueur = (id) => {
    return fetch (`http://localhost:8000/cocktailliqueurs?cocktail=${id}`,{
    headers:{
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("tt_token")}`
    }
    })
    .then(response => response.json())
}

export const getAllCocktailStapleIngredient = (id) => {
    return fetch (`http://localhost:8000/stapleingredients?cocktail=${id}`,{
    headers:{
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("tt_token")}`
    }
    })
    .then(response => response.json())
}

export const deleteCocktailLiquor = (id) => {
    return fetch(`http://localhost:8000/cocktailliquors/${id}`, {
        method: "DELETE",    
        headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("tt_token")}`
            },
            })
}

export const deleteCocktailLiqueur = (id) => {
    return fetch(`http://localhost:8000/cocktailliqueurs/${id}`, {
        method: "DELETE",    
        headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("tt_token")}`
            },
            })
}

export const deleteCocktailStapleIngredient = (id) => {
    return fetch(`http://localhost:8000/cocktailstapleingredients/${id}`, {
        method: "DELETE",    
        headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("tt_token")}`
            },
            })
}