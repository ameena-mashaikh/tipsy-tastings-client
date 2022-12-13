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