import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../../managers/AuthManager"
import "./Register.css"

export const Register = () => {
    const firstName = useRef()
    const lastName = useRef()
    const username = useRef()
    const bio = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": username.current.value,
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "bio": bio.current.value,
                "password": password.current.value
            }

            registerUser(newUser)
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("tt_token", res.token)
                        navigate("/my_cocktails")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <>
            <div className = 'login-div'>
            <img className = "login-image" src= './images/header.jpg'/>
            <div className = 'login-info'>
            <main className = "register-main" style={{ textAlign: "center" }}>
            
            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>
            <section className = 'register-section'>
            <form className="form--register" onSubmit={handleRegister}>
                <div className = 'register-form'>

                <h1 className = 'form-header'>Tipsy Tastings</h1>
                <h2> Register an Account</h2>
                <fieldset>
                    <label htmlFor="firstName"> First Name: </label>
                    <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name: </label>
                    <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputUsername">Username: </label>
                    <input ref={username} type="text" name="username" className="form-control" placeholder="Username" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password: </label>
                    <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password: </label>
                    <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Tell Us About Yourself: </label>
                    <textarea ref={bio} className="bio" placeholder="Let other mixologists know a little bit about you..." />
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn btn-1 btn-sep icon-send" type="submit">Register</button>
                </fieldset>
                </div>
            </form>
            </section>
            <section className="link--register">
                Already registered? <Link to="/login">Login</Link>
            </section>
            
        </main>
        </div>
        </div>
        </>
    )
}
