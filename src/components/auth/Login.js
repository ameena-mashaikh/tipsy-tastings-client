import React, { useRef , useState} from "react"
import { Link, useNavigate} from "react-router-dom"
import { loginUser } from "../../managers/AuthManager"
import "./Login.css"


export const Login = ({setToken}) => {
    const username = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const navigate = useNavigate()
    const [isUnsuccessful, setisUnsuccessful] = useState(false)


    const handleLogin = (e) => {
        e.preventDefault()


        const user = {
            username: username.current.value,
            password: password.current.value
        }   
        loginUser(user)
            .then(res => {
                if ("valid" in res && res.valid) {
                    setToken(res.token)
                    navigate("/") 
                   
                }
                else {
                    setisUnsuccessful(true)
                }
            })
    }

    return (<>
            
            <div className = 'login-div'>
            <img className = "login-image" src= './images/header.jpg'/>
            <div className = 'login-info'>

        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Username or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <section className = 'login-section'>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1 className = 'form-header'>Tipsy Tastings</h1>
                    <h2>Please sign in</h2>
                    <fieldset className="login-fieldset">
                        <label htmlFor="inputUsername"> Username </label>
                        <input ref={username} type="username" id="username" className="form-control" placeholder="Username" required autoFocus />
                    </fieldset>
                    <fieldset className="login-fieldset">
                        <label htmlFor="inputPassword"> Password </label>
                        <input ref={password} type="password" id="password" className="form-control" placeholder="Password" required />
                    </fieldset >
                    {/* <fieldset style={{
                        textAlign: "center"
                    }}> */}
                        <button className="btn btn-1 btn-sep icon-send" type="submit">Sign In</button>
                    {/* </fieldset> */}
                </form>
            </section>
            {
                isUnsuccessful ?             
                <div>Username or password was not valid.</div>
                : ''
            }
        </main>
        </div>
        <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
            </div>
        </>
    )
}
