export const getCocktailPostsByMixologist = () => {
    return fetch("http://localhost:8000/cocktails?mycocktails", {
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("tt_token")}`
        }
    })
        .then(response => response.json())
}

export const getCocktailPosts = () => {
    return fetch("http://localhost:8000/cocktailposts", {
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("tt_token")}`
        }
    })
        .then(response => response.json())
}

export const getCocktailPostById = (id) => {
    return fetch(`http://localhost:8000/cocktailposts/${id}`, {
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("tt_token")}`
        }
    })
        .then(response => response.json())
}

export const createCocktailPost = (newCocktailPostObject) => {
    return fetch("http://localhost:8000/cocktailposts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("tt_token")}`

        },
        body: JSON.stringify(newCocktailPostObject)
    })
        .then(res => res.json())
}


export const updateCocktailPost = (cocktailPostObj) => {
    return fetch(`http://localhost:8000/cocktailposts/${cocktailPostObj.id}`, {
        method: "PUT",    
        headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("tt_token")}`
            },
            body: JSON.stringify(cocktailPostObj)
         })
}
