import { Link, useNavigate } from "react-router-dom"
// import "./NavBar.css"

export const NavBar = () => {

    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className = "nav-link" to="/cocktails"> List of Cocktails</Link>
            </li>
        </ul>
    )
}
