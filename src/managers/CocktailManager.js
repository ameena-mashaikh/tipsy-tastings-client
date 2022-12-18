export const getCocktailsByMixologist = () => {
    return fetch("http://localhost:8000/cocktails?mycocktails", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("tt_token")}`
        }
    })
        .then(response => response.json())
}

export const getCocktails = () => {
    return fetch("http://localhost:8000/cocktails", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("tt_token")}`
        }
    })
        .then(response => response.json())
}

export const getCocktailById = (id) => {
    return fetch(`http://localhost:8000/cocktails/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("tt_token")}`
        }
    })
        .then(response => response.json())
}

export const createCocktail = (newCocktailObject) => {
    return fetch("http://localhost:8000/cocktails", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("tt_token")}`

        },
        body: JSON.stringify(newCocktailObject)
    })
        .then(res => res.json())
}

export const updateCocktail = (cocktailObj) => {
    return fetch(`http://localhost:8000/cocktails/${cocktailObj.id}`, {
        method: "PUT",    
        headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("tt_token")}`
            },
            body: JSON.stringify(cocktailObj)
         })
}

export const deleteCocktail = (cocktail) => {
    return fetch(`http://localhost:8000/cocktails/${cocktail.id}`, {
        method: "DELETE",    
        headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("tt_token")}`
            },
         })
}

export const newestCocktails = (cocktail) => {
    return fetch("http://localhost:8000/cocktails?feed", {
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("tt_token")}`
        }
    })
        .then(response => response.json())
}