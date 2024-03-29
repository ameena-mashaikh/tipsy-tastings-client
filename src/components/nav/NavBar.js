import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"



export const NavBar = ({ token, setToken }) => {
  const navigate = useNavigate()
  const navbar = useRef()
  const hamburger = useRef()

  const showMobileNavbar = () => {
    hamburger.current.classList.toggle('is-active')
    navbar.current.classList.toggle('is-active')
  }

  return (
    <nav className="navbar is-success mb-3" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={showMobileNavbar} ref={hamburger}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className="navbar-menu" ref={navbar}>
        <div className="navbar-start">
        {/* <img className = "header-logo" src = './images/logo.png'/> */}
          {
            token
            ?<>
            <h1 className =  "logo-header"><Link className = "homepage-link"to = "/"> Tipsy Tastings 🍸︎</Link></h1> 
              <div className = "navbar-all-items">

                <Link to="/my_feed" className="navbar-item">My Feed</Link>
                <Link to="/explore_cocktails" className="navbar-item">Explore Cocktails</Link>
                <Link to="/my_cocktails" className="navbar-item">My Cocktails</Link>
                {/* <Link to="/profile" className="navbar-item">Profile </Link> */}
                
              </div>
              </>
              :
              ""
          }
                        {
                token
                  ?
                  <button className="button is-outlined" onClick={() => {
                    setToken('')
                    navigate('/login')
                  }}>Logout</button>
                  :
                  <>
                    {/* <Link to="/register" className="button is-link">Register</Link>
                    <Link to="/login" className="button is-outlined">Login</Link> */}
                  </>
              }
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {/* {
                token
                  ?
                  <button className="button is-outlined" onClick={() => {
                    setToken('')
                    navigate('/login')
                  }}>Logout</button>
                  :
                  <>
                    <Link to="/register" className="button is-link">Register</Link>
                    <Link to="/login" className="button is-outlined">Login</Link>
                  </>
              } */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
