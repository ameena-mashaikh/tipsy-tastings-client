export const getLiquors = () => {
    return fetch("http://localhost:8000/liquors", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("tt_token")}`
        }
    })
        .then(response => response.json())
}

export const getLiqueurs = () => {
    return fetch("http://localhost:8000/liqueurs", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("tt_token")}`
        }
    })
        .then(response => response.json())
}

export const getStapleIngredients = () => {
    return fetch(`http://localhost:8000/stapleingredients`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("tt_token")}`
        }
    })
        .then(response => response.json())
}

