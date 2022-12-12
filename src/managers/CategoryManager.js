export const getCategories = () => {
    return fetch("http://localhost:8000/categories", {
        method: "GET",    
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("tt_token")}`

        }
    })
        .then(response => response.json())
}



export const getCategoryById = (id) => {
    return fetch(`http://localhost:8000/categories/${id}`, {
        method: "GET",    
        headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("tt_token")}`
            }
     })
        .then(response => response.json())
    }
