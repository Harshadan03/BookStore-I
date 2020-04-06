import React, { Fragment, useState } from 'react'
import Menu from './Menu'
import { Link, Redirect } from 'react-router-dom'
import { signin, authenticate, isAuthenticated } from '../auth'


const Login = () => {

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        redirectToReferrer: false
    })

    const { email, password, error, loading, redirectToReferrer } = values


    //this is HIGHER ORDER FUNCTION: a function returnning another function
    const handleChange = name => event => {
        setValues({
            ...values,
            error: false,
            [name]: event.target.value
        })
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({ ...values, error: false, loading: true })
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                }
                else {

                    authenticate(data, () => {
                        setValues({
                            ...values,
                            redirectToReferrer: true
                        })
                    })
                }
            })
    }


    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? "" : 'none' }}>
            {error}
        </div>
    )

    const showLoading = () => loading && (
        <div className="alert alert-info">
            <h2>Loading.......</h2>
        </div>
    )

    const { user } = isAuthenticated()

    const redirectUser = () => {
        if (redirectToReferrer && isAuthenticated()) {
            return <Redirect to="/" />
        }
    }

    const showLoginPage = () => (
        <div className="body">
            <Menu />
            {showError()}
            {showLoading()}
            <h1>Login</h1>
            <div className="login-page">
                <div className="form">
                    <form className="login-form" >
                        <p>Email</p>
                        <input type="email" onChange={handleChange('email')} value={email} placeholder="Email" required />
                        <p>Password</p>
                        <input type="Password" onChange={handleChange('password')} value={password} placeholder="Password" required />
                        <button onClick={clickSubmit} style={{ backgroundColor: "#CC801E" }}>Login</button>
                        <p className="message">Not Registered?<Link to="/register" > Sign up </Link></p>
                    </form>
                </div>
            </div>

        </div>
    )

    return (
        <Fragment>

            {showLoginPage()}
            {redirectUser()}
        </Fragment>
    )
}

export default Login