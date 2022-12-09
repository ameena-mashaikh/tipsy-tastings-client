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

