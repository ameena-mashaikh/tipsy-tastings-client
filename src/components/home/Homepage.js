import "./Homepage.css"


export const Homepage = () => {
    return (
        <div className = "homepage"> 
            <section className = "header-section"><img className = "header-image" src= './images/header.jpg'/> </section>
                <h1 className = "header-title"> Discover Cocktails</h1>
                <p className = "header-caption"> A place to inspire your next cocktail, expand your palette, and share your creations!</p>
        </div>
    )
}