import React, { Fragment, useState } from 'react'
import Menu from './Menu'
import { signup } from '../auth'
import { Link } from 'react-router-dom'



const Register = () => {


    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    })

    const { name, email, password, error, success } = values
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
        setValues({ ...values, error: false })
        signup({ name, email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                }
                else {
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true
                    })
                }
            })
    }


    const registerForm = () => (
        <div className="body">
            <Menu />
            <div className="login-page">
                <div className="form">
                    <form className="register-form">
                        <p>Name</p>
                        <input type="text" onChange={handleChange('name')} value={name} placeholder="name" required />
                        <p>Email</p>
                        <input type="email" onChange={handleChange('email')} value={email} placeholder="email" required />
                        <p>Password</p>
                        <input type="password" placeholder="password" onChange={handleChange('password')} value={password} required />

                        <button onClick={clickSubmit} >Register</button>

                        <p className="message">Already Registered?<Link to="/login">Login</Link></p>

                    </form>
                </div>
            </div>
        </div>
    )


    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? "" : 'none' }}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            New Account is created . Please <Link to="/login">Login</Link>
        </div>
    )



    return (
        <Fragment>
            {showError()}
            {showSuccess()}
            {registerForm()}
        </Fragment>
    )
}

export default Register